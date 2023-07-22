# aws-ssm-get-parameter

Get and obscures an AWS SSM parameter

## Usage

```yaml
- uses: axatol/actions/aws-ssm-get-parameter@release
  with:
    # Parameter path
    path: /path/to/parameter
```

### Outputs

- `value`: Parameter value

## Examples

### Get a parameter

```yaml
- id: get-token
  uses: axatol/actions/aws-ssm-get-parameter@release
  with:
    path: /infrastructure/github/token

- uses: actions/checkout@v3
  with:
    token: ${{ steps.get-token.outputs.value }}
```
