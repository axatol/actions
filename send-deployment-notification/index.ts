import * as core from "@actions/core";
import * as http from "@actions/http-client";
import { context } from "@actions/github";

export type Status = "success" | "pending" | "failure";

export const destinations: Record<string, string> = {
  "discord.com": "discord",
  "hooks.slack.com": "slack",
  "": "unknown",
};

export const titles: Record<Status, string> = {
  success: "Deployment complete",
  pending: "Deployment pending review",
  failure: "Deployment failed",
};

export const decColors: Record<Status, number> = {
  success: 65280,
  pending: 16170496,
  failure: 16711680,
};

export const hexColors: Record<Status, string> = {
  success: "#00FF00",
  pending: "#F6BE00",
  failure: "#FF0000",
};

const run = async () => {
  const rawWebhookUrl = core.getInput("webhook-url", { required: true });
  const webhookUrl = new URL(rawWebhookUrl);
  const destination = destinations[webhookUrl.host] || "raw";

  const jobStatus = core.getInput("job-status", { required: true }) as Status;
  if (!["success", "pending", "failure"].includes(jobStatus)) {
    throw new Error("job-status must be one of success, pending, or failure");
  }

  const title = titles[jobStatus] ?? titles["pending"];
  const decColor = decColors[jobStatus] ?? decColors["pending"];
  const hexColor = hexColors[jobStatus] ?? hexColors["pending"];
  const repositoryUrl = `${context.serverUrl}/${context.repo.owner}/${context.repo.repo}`;
  const client = new http.HttpClient();
  const headers = { "Content-Type": "application/json" };

  switch (destination) {
    case "raw":
      await client.postJson(
        webhookUrl.toString(),
        {
          runConclusion: jobStatus,
          repositoryUrl,
          workflowRun: `${repositoryUrl}/actions/runs/${context.runId}`,
          deploymentHistory: `${repositoryUrl}/deployments/activity_log`,
        },
        headers
      );

    case "discord":
      await client.postJson(
        webhookUrl.toString(),
        {
          embeds: [
            {
              title,
              color: decColor,
              fields: [
                { name: "Run conclusion", value: jobStatus },
                { name: "Repo", value: context.repo },
                { name: "Event", value: context.eventName },
                { name: "Action", value: context.action },
              ],
            },
            {
              title: "Repository",
              color: decColor,
              url: repositoryUrl,
            },
            {
              title: "Workflow run",
              color: decColor,
              url: `${repositoryUrl}/actions/runs/${context.runId}`,
            },
            {
              title: "Deployment history",
              color: decColor,
              url: `${repositoryUrl}/deployments/activity_log`,
            },
          ],
        },
        headers
      );

    case "slack":
      await client.postJson(
        webhookUrl.toString(),
        {
          attachments: [
            {
              color: hexColor,
              blocks: [
                {
                  type: "section",
                  text: { type: "mrkdwn", text: title },
                },
                {
                  type: "section",
                  fields: [
                    { type: "mrkdwn", text: `*Run conclusion:*\n${jobStatus}` },
                    { type: "mrkdwn", text: `*Repo:*\n${context.repo}` },
                    { type: "mrkdwn", text: `*Event:*\n${context.eventName}` },
                    { type: "mrkdwn", text: `*Action:*\n${context.action}` },
                  ],
                },
                {
                  type: "actions",
                  elements: [
                    {
                      type: "button",
                      text: { type: "plain_text", text: "Repository" },
                      url: `${repositoryUrl}`,
                    },
                    {
                      type: "button",
                      text: { type: "plain_text", text: "Workflow run" },
                      url: `${repositoryUrl}/actions/runs/${context.runId}`,
                    },
                    {
                      type: "button",
                      text: { type: "plain_text", text: "Deployment history" },
                      url: `${repositoryUrl}/deployments/activity_log`,
                    },
                  ],
                },
                {
                  type: "context",
                  elements: [
                    {
                      type: "mrkdwn",
                      text: `Triggered by [${context.actor}](https://github.com/${context.actor})`,
                    },
                  ],
                },
              ],
            },
          ],
        },
        headers
      );

    default:
      throw new Error(`Unsupported format: ${destination}`);
  }
};

run().catch((error) => {
  core.setFailed(error);
});
