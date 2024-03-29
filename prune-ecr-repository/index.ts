import * as core from "@actions/core";
import {
  ECRPUBLICClient,
  paginateDescribeImages,
  BatchDeleteImageCommand,
  ImageIdentifier,
  ImageDetail,
} from "@aws-sdk/client-ecr-public";

const imageStr = (id?: ImageIdentifier) => {
  const digest = id?.imageDigest ?? "unknown";
  const tag = id?.imageTag ?? "unknown";
  return `${digest}:${tag}`;
};

(async () => {
  const region = core.getInput("aws-region");
  const repositoryName = core
    .getInput("repository-name", { required: true })
    .replace(/^public\.ecr\.aws\/[a-z0-9-_]+\//i, "");

  const client = new ECRPUBLICClient({ region });

  const paginator = paginateDescribeImages({ client }, { repositoryName });

  const images: ImageDetail[] = [];
  for await (const page of paginator) {
    if (page.imageDetails) {
      images.push(...page.imageDetails);
    }
  }

  core.info(`✓ fetched ${images.length} images`);

  const dangling = images.filter(
    (image) => !image.imageTags || image.imageTags.length < 1
  );

  if (dangling.length < 1) {
    core.info(`✓ no images to remove`);
    return;
  }

  core.info(`ℹ︎ attempting to remove ${dangling.length} images`);

  const response = await client
    .send(new BatchDeleteImageCommand({ repositoryName, imageIds: dangling }))
    .catch((error) => {
      core.error(error);
      return null;
    });

  if (!response) {
    core.setFailed(`✗ failed to execute batch delete`);
    return;
  }

  core.summary
    .addHeading("ECR Cleanup Result")
    .addTable([
      [
        { data: "Status", header: true },
        { data: "Digest", header: true },
        { data: "Comment", header: true },
      ],
      ...(response.imageIds ?? []).map((id) => [
        "✓",
        `<pre>${imageStr(id)}</pre>`,
        "deleted",
      ]),
      ...(response.failures ?? []).map((id) => [
        "✗",
        `\`${imageStr(id.imageId)}\``,
        `${id.failureCode ?? "?"} - ${id.failureReason ?? "?"}`,
      ]),
    ])
    .write();

  if (response.failures && response.failures.length > 0) {
    core.setFailed(`✗ some images failed to delete`);
    return;
  }

  core.info(`✓ deleted ${response.imageIds?.length ?? 0} images`);
})();
