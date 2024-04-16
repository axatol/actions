import * as core from "@actions/core";
import * as http from "@actions/http-client";
import { context } from "@actions/github";

const statuses = ["success", "pending", "failure"] as const;
type Status = (typeof statuses)[number];

const formats = ["slack", "discord", "raw"] as const;
type Format = (typeof formats)[number];

const destinations: Record<string, string> = {
  "discord.com": "discord",
  "hooks.slack.com": "slack",
};

const titles: Record<Status, string> = {
  success: "Deployment complete",
  pending: "Deployment pending review",
  failure: "Deployment failed",
};

const colors: Record<Status, { dec: number; hex: string }> = {
  success: { dec: 65280, hex: "#00FF00" },
  pending: { dec: 16170496, hex: "#F6BE00" },
  failure: { dec: 16711680, hex: "#FF0000" },
};

const getInputs = () => {
  const rawWebhookUrl = core.getInput("webhook-url", { required: true });
  const webhookUrl = new URL(rawWebhookUrl);
  const destination = destinations[webhookUrl.host];
  const payloadFormat = core.getInput("payload-format") || destination || "raw";
  const jobStatus = core.getInput("job-status", { required: true });

  const params = {
    webhookUrl,
    payloadFormat: payloadFormat as Format,
    jobStatus: jobStatus as Status,
  };

  if (!formats.includes(params.payloadFormat)) {
    throw new Error("payload-format must be one of ");
  }

  if (!statuses.includes(params.jobStatus)) {
    throw new Error("job-status must be one of success, pending, or failure");
  }

  return params;
};

const buildPayload = (
  payloadFormat: string,
  jobStatus: string,
  repositoryUrl: string,
  title: string,
  color: (typeof colors)[Status]
): any => {
  switch (payloadFormat) {
    case "raw":
      return {
        runConclusion: jobStatus,
        repositoryUrl,
        workflowRun: `${repositoryUrl}/actions/runs/${context.runId}`,
        deploymentHistory: `${repositoryUrl}/deployments/activity_log`,
      };

    case "discord":
      return {
        embeds: [
          {
            title,
            url: `${repositoryUrl}/actions/runs/${context.runId}`,
            color: color.dec,
            fields: [
              { name: "Run conclusion", value: jobStatus },
              { name: "Repo", value: context.repo },
              { name: "Event", value: context.eventName },
              { name: "Action", value: context.action },
              {
                name: "Triggered by",
                value: `[${context.actor}](https://github.com/${context.actor})`,
              },
              {
                name: "Links",
                value: [
                  `[*Repository*](${repositoryUrl})`,
                  `[*Deployment history*](${repositoryUrl}/deployments/activity_log)`,
                ].join(" :heavy_minus_sign: "),
              },
            ],
            footer: {
              text: `Triggered by [${context.actor}](https://github.com/${context.actor})`,
            },
          },
        ],
      };

    case "slack":
      return {
        attachments: [
          {
            color: color.hex,
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
      };

    default:
      throw new Error(`unexpected payload format: ${payloadFormat}`);
  }
};

const run = async () => {
  const { webhookUrl, payloadFormat, jobStatus } = getInputs();

  const title = titles[jobStatus] ?? titles["pending"];
  const color = colors[jobStatus] ?? colors["pending"];
  const repositoryUrl = `${context.serverUrl}/${context.repo.owner}/${context.repo.repo}`;
  const client = new http.HttpClient();
  const headers = { "Content-Type": "application/json" };

  core.info(
    `payload parameters: ${JSON.stringify({
      payloadFormat,
      jobStatus,
      repositoryUrl,
      title,
      color,
    })}`
  );

  const payload = buildPayload(
    payloadFormat,
    jobStatus,
    repositoryUrl,
    title,
    color
  );

  core.info(`delivering ${payloadFormat} payload: ${JSON.stringify(payload)}`);
  try {
    const response = await client.post(
      webhookUrl.toString(),
      JSON.stringify(payload),
      headers
    );

    core.info(
      `response: ${response.message.statusCode} - ${response.message.statusMessage}`
    );
    core.info(`response body: ${await response.readBody()}`);
  } catch (error: any) {
    core.setFailed(error);
  }
};

run().catch(core.setFailed);
