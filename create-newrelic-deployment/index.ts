import * as core from "@actions/core";
import * as http from "@actions/http-client";
import * as github from "@actions/github";

const query = `
mutation(deployment: ChangeTrackingDeploymentInput!) {
  changeTrackingCreateDeployment(deployment: !deployment) {
    changelog
    commit
    deepLink
    deploymentId
    deploymentType
    description
    entityGuid
    groupId
    timestamp
    user
    version
  }
}
`;

const fallbackVersion = (commit: string) => {
  const now = new Date();
  return [now.getFullYear(), now.getUTCMonth(), commit].join(".");
};

const run = async () => {
  const name = core.getInput("name");
  const apiKey = core.getInput("api-key", { required: true });
  const entityGuid = core.getInput("guid");
  const commit = core.getInput("commit") || github.context.sha;
  const version = core.getInput("version") || fallbackVersion(commit);
  const deploymentType = core.getInput("deployment-type") ?? "BASIC";
  const deepLink = [
    github.context.serverUrl,
    github.context.repo.owner,
    github.context.repo.repo,
    "actions/runs",
    github.context.runId,
  ].join("/");

  const payload = {
    query: query.replace(/\s+/g, " ").trim(),
    variables: {
      name,
      entityGuid,
      deepLink,
      commit,
      version,
      deploymentType,
    },
  };

  core.info(`executing mutation: ${JSON.stringify(payload)}`);

  const client = new http.HttpClient();
  const response = await client.post(
    "https://api.newrelic.com/graphql",
    JSON.stringify(payload),
    { "API-Key": apiKey }
  );

  const { statusCode, statusMessage } = response.message;
  core.info(`result: ${statusCode} - ${statusMessage}`);
  const body = await response.readBody();
  core.info(`response: ${body}`);
  // core.setOutput("deployment-id", JSON.parse(body));
};

run().catch(core.setFailed);
