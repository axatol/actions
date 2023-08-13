# search-new-relic-entity-guid

Searches and finds the GUID for an entity in New Relic

## Usage

```yaml
- uses: axatol/actions/search-new-relic-entity-guid@release
  with:
    # Entity domain
    domain: APM

    # Entity type
    type: APPLICATION

    # Entity name
    name: foo

    # New Relic API key
    api_key: NRAK-xxx
```

### Outputs

- `guid`: First found entity GUID
- `count`: Count of matched entities

## Examples

```yaml
- uses: axatol/actions/search-new-relic-entity-guid@release
  with:
    name: foo
```
