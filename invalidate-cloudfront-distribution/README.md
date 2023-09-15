# invalidate-cloudfront-distribution

Invalidates the given paths for a CloudFront distribution.

## Usage

```yaml
- uses: axatol/actions/invalidate-cloudfront-distribution@release
  with:
    # ID of distribution to invalidate
    distribution-id: d11111

    # Paths to invalidate
    paths: "/foo"

    # AWS region
    aws-region: us-east-1

    # ARN of role to assume to handle invalidation
    invalidator-role-arn: arn:aws:iam:xxx::role/CloudFront-Invalidator-Role
```

### Outputs

N/A

## Examples

### Invalidate everything

```yaml
- uses: axatol/actions/invalidate-cloudfront-distribution@release
  with:
    distribution-id: d111
```

### Invalidate specific paths, assuming a role

```yaml
- uses: axatol/actions/invalidate-cloudfront-distribution@release
  with:
    distribution-id: d111
    paths: >-
      "/static/*"
      "/blog/*"
```
