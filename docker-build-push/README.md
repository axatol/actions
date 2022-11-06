# build-push

Builds and pushes a docker image, optionally tagging the previous image.

## Usage

```yaml
- uses: axatol/actions/docker-build-push@release
  with:
    # Image to work with
    image: "foo"

    # Next tag
    # Defaults to 'latest'
    next-tag: ""

    # Previous tag
    # Defaults to 'previous'
    previous-tag: ""

    # Whether or not to tag previous image
    # Defaults to 'true'
    tag-previous: ""

    # Whether or not to use the previous image as cache
    # Defaults to 'true'
    use-cache: ""

    # Additional arguments to pass to build command
    # Defaults to ''
    build-args:

    # Docker build context
    # Defaults to '.'
    build-context: "."

    # Do not push anything
    # Defaults to 'false'
    dry-run: ""
```

### Outputs

N/A

## Examples

### Build and push current and new image

```yaml
- uses: axatol/actions/docker-build-push@release
  with:
    image: public.ecr.aws/axatol/foo

  # builds and pushes BOTH public.ecr.aws/axatol/foo:latest AND public.ecr.aws/axatol/foo:previous
```

### Build and push only new image

```yaml
- uses: axatol/actions/docker-build-push@release
  with:
    image: public.ecr.aws/axatol/foo
    tag-previous: "false"

  # builds and pushes ONLY public.ecr.aws/axatol/foo:latest
```

### Sanity check a build

```yaml
- uses: axatol/actions/docker-build-push@release
  with:
    image: public.ecr.aws/axatol/foo
    dry-run: "true"

  # only builds, does not push anything
```
