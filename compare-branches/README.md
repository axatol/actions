# compare-branches

Compares the differences between two branches. Must be executed in the context of a git repository

## Usage

```yaml
- uses: axatol/actions/compare-branches@release
  with:
    # The name of the remote to fetch from
    remote-name: origin

    # The branch that the changes are based on
    base-ref: main

    # The branch that contains the proposed changes
    head-ref: feature

    # The type of diff; "base" for "..." or "tip" for "..".
    # "base" means diff from when base and head intersect (beginning of head).
    # "tip" means diff from the latest commit of head.
    diff-type: tip

    # Filter to apply to resultant files and directories
    filter-regex: ".*"
```

### Outputs

- `directories` - A JSON encoded array of directories containing changes
- `files` - A JSON encoded array of files that have been changed

## Examples

### List Terraform root directories that contain changes

```yaml
jobs:
  diff:
    runs-on: ubuntu-latest
    outputs:
      directories: ${{ steps.roots.outputs.directories }}
    steps:
      - uses: actions/checkout@v4
      - id: roots
        uses: axatol/actions/compare-branches@release
        with: { filter-regex: "**/*.tf" }

  apply:
    needs: diff
    runs-on: ubuntu-latest
    strategy:
      matrix:
        directory: ${{ fromJson(needs.diff.outputs.directories) }}
    defaults:
      run:
        working-directory: ${{ matrix.directory }}
    steps:
      - uses: actions/checkout@v4
      - run: terraform plan -out=tfplan
      - run: terraform apply tfplan
```
