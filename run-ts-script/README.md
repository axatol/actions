# run-ts-script

Run a TypeScript action, ala `actions/github-script`.

Includes the following libraries in the runtime scope:

- `fetch` - `node-fetch`
- `core` - `@actions/core`
- `exec` - `@actions/exec`
- `github` - `@actions/github`
- `glob` - `@actions/glob`
- `io` - `@actions/io`

## Usage

```yaml
- uses: axatol/actions/run-ts-script@release
  with:
    # The script to run
    script: ""
    # Path to the script to run
    script-filename: ""
```

### Outputs

- `script`: Raw JSON output of the script step if any

## Examples

### Run an inline script

```yaml
- uses: axatol/actions/run-ts-script@release
  with:
    script: |
```
