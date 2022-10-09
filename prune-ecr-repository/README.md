# prune-ecr-repository

Removes all untagged images.

## Usage

```yaml
- uses: axatol/actions/prune-ecr-repository
  with:
    # AWS region
    # Defaults to us-east-1
    aws-region: ""

    # Access key id to interact with AWS ECR
    aws-access-key-id: ""

    # Secret access key to interact with AWS ECR
    aws-secret-access-key: ""

    # Name of repository to prune
    repository-name: ""
```

### Outputs

N/A

## Examples

### Remove untagged images

```yaml
- uses: axatol/actions/prune-ecr-repository
  with:
    aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
    aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
    repository-name: blah
```
