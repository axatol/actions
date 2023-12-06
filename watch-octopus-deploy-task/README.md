# watch-octopus-deploy-task

Streams logs from an Octopus Deploy server task.

## Usage

```yaml
- uses: axatol/actions/watch-octopus-deploy-task@release
  with:
    # Octopus Deploy server url
    server-url: https://example.octopus.app

    # Octopus Deploy api key
    api-key: API-GUEST

    # Octopus Deploy access token
    access-token: eyXXX

    # ID of the server task in Octopus Deploy
    task-ids: ServerTask-123,ServerTask-456
```

### Outputs

N/A

## Examples

### Create, deploy, and watch a release

```yaml
- uses: OctopusDeploy/login@v1
  with:
    server: http://example.octopus.app
    service_account_id: some-random-uuid

- id: release
  uses: OctopusDeploy/create-release-action@v3
  with:
    space: Default
    project: Test Project

- id: deploy
  uses: OctopusDeploy/deploy-release-action@v3
  with:
    space: Default
    project: Test Project
    environments: Development
    release_number: ${{ steps.release.outputs.release_number }}

- uses: ./watch-octopus-deploy-task
  with:
    task-ids: ${{ join(fromJson(steps.deploy.outputs.server_tasks).*.serverTaskId) }}
```
