import * as core from "@actions/core";
import * as github from "@actions/github";

export default function ({}) {
  const diffOutput = process.env.DIFF_OUTPUT;
  if (!diffOutput) {
    core.setFailed("no diff output to summarise");
    process.exit();
  }

  const githubToken = process.env.GITHUB_TOKEN;
  if (!githubToken) {
    core.setFailed("no github token available");
    process.exit();
  }

  const lines = diffOutput.split(/\n/g);
  const added = lines.filter((line) => line.startsWith("[+]")).length;
  const modified = lines.filter((line) => line.startsWith("[~]")).length;
  const removed = lines.filter((line) => line.startsWith("[-]")).length;
  const total = added + modified + removed;
  core.setOutput("has-changes", total > 0 ? "yes" : "no");

  console.log({ added, modified, removed, total });
  core.startGroup("CDK diff output");
  console.log(diffOutput);
  core.endGroup();

  if (!github.context.issue.number) {
    core.info("no target to comment on");
    process.exit();
  }

  const body = `
#### CDK Diff Summary
Added: ${added}
Modified: ${modified}
Removed: ${removed}
Total: ${total}

<details>
<summary>Diff output</summary>

\`\`\`\n
${diffOutput.trim()}
\`\`\`

</details>

*${[
    `Pusher: @${github.context.actor}`,
    `Action: \`${github.context.eventName}\``,
    `Workflow: \`${github.context.workflow}\``,
  ].join(", ")}*
`.trim();

  if (github.context.issue?.number) {
    const octokit = github.getOctokit(githubToken);
    octokit.rest.issues.createComment({
      owner: github.context.repo.owner,
      repo: github.context.repo.repo,
      issue_number: github.context.issue.number,
      body,
    });
  }
}
