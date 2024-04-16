# create-new-relic-deployment

Searches and finds the GUID for an entity in New Relic

## Usage

```yaml
- uses: axatol/actions/create-new-relic-deployment@release
  with:
    # Application name, used to find GUID if not provided
    name: "huisheng"

    # New Relic api key
    api-key: "NRAK-xxx"

    # New Relic entity GUID
    guid: "Mzc2N..."

    # Commit SHA
    commit: "123abc..."

    # Release version
    version: "v0.0.1"

    # Deployment type
    deployment-type: "ROLLING"
```

### Outputs

- `deployment-id`: ID of created deployment

## Examples

```yaml
- uses: axatol/actions/create-new-relic-deployment@release
  with:
    name: foo
```
