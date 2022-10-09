# build-push

Builds and pushes a docker image, optionally tagging the previous image.

## Usage

```yaml
- uses: axatol/actions/build-push@release
  with:
    # Registry
    registry: ""

    # Repository
    repository: ""

    # Next tag
    # Defaults to 'latest'
    next-tag: ""

    # Previous tag
    # Defaults to 'previous'
    previous-tag: ""

    # Whether or not to tag previous image
    # Defaults to 'true'
    tag-previous: ""
```

### Outputs

N/A

## Examples

### Build and push current and new image

```yaml
- uses: axatol/actions/build-push@release
  with:
    registry: public.ecr.aws/axatol
    repository: foo

  # builds and pushes BOTH public.ecr.aws/axatol/foo:latest AND public.ecr.aws/axatol/foo:previous
```

### Build and push only new image

```yaml
- uses: axatol/actions/build-push@release
  with:
    registry: public.ecr.aws/axatol
    repository: foo
    tag-previous: "false"

  # builds and pushes ONLY public.ecr.aws/axatol/foo:latest
```
