# setup-hugo

Finds, downloads, and adds Hugo to the runner temp dir from [Hugo's releases](https://github.com/gohugoio/hugo/releases)

## Usage

```yaml
- uses: axatol/actions/setup-hugo@release
  with:
    # Target release tag
    # Defaults to "latest"
    tag: "v0.111.3"

    # Target build architecture in hugo release asset name
    # Defaults to "linux-amd64"
    arch: "darwin-universal"
```

### Outputs

- `tag`: Latest release tag
- `download-url`: Latest release asset download url

## Examples

### Install latest version of Hugo

```yaml
- uses: axatol/actions/setup-hugo@release
```

### Install specific version of Hugo

```yaml
- uses: axatol/actions/setup-hugo@release
  with:
    tag: "v0.111.3"
```
