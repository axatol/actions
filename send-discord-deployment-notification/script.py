import requests

# inputs
webhook_url = "${{ inputs.webhook-url }}"
status = "${{ inputs.status }}"

# github context
job_status = "${{ job.status }}"
run_id = "${{ github.run_id }}"
repository_url = "${{ github.event.repository.html_url }}"

titles = {
  "success": "Deployment complete",
  "pending": "Deployment pending review",
  "failure": "Deployment failed",
}

title = titles.get(status, titles["pending"])

colors = {
  "success": 65280,
  "pending": 16170496,
  "failure": 16711680,
}

color = colors.get(status, colors["pending"])

requests.post(
  webhook_url,
  json={
    "embeds": [{
      "title": title,
      "type": "rich",
      "color": color,
      "description": "\n".join([
        f"Run conclusion: {job_status}",
        f"- [Repository]({repository_url})",
        f"- [Workflow run]({repository_url}/actions/runs/{run_id})",
        f"- [Deployment history]({repository_url}/deployments/activity_log)",
      ]),
    }]
  },
)
