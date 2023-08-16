# send-discord-deployment-notification

Sends a Discord message via webhook

## Usage

```yaml
- uses: axatol/actions/send-discord-deployment-notification@release
  with:
    # Discord webhook url
    webhook-url: ""

    # One of "pending", "success", or "failed"
    status: "success"
```

### Outputs

N/A

## Examples

### Send a deployment pending notification

```yaml
- uses: axatol/actions/send-discord-deployment-notification@release
  with:
    webhook-url: ${{ secrets.DISCORD_WEBHOOK_URL }}
    status: pending
```

### Send a notification based on outcome

```yaml
- uses: axatol/actions/send-discord-deployment-notification@release
  with:
    webhook-url: ${{ secrets.DISCORD_WEBHOOK_URL }}
    status: ${{ steps.deploy.outcome }}
```
