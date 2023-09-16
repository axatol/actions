# get-ssm-parameter

Get and obscures an AWS SSM parameter

## Usage

```yaml
- uses: axatol/actions/get-ssm-parameter@release
  with:
    # Parameter path
    path: /path/to/parameter

    # AWS region
    region: ap-southeast-2

    # Name of environment variable to export the value
    env-name: TF_VAR_my_var
```

### Outputs

- `value`: Parameter value

## Examples

### Get a parameter

```yaml
- id: get-token
  uses: axatol/actions/get-ssm-parameter@release
  with:
    path: /infrastructure/github/token

- uses: actions/checkout@v3
  with:
    token: ${{ steps.get-token.outputs.value }}
```

### Export to environment

```yaml
- id: get-var
  uses: axatol/actions/get-ssm-parameter@release
  with:
    path: /infrastructure/terraform/api_key
    env-name: TF_VAR_api_key

- run: terraform plan
```
