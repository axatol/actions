# increment-semver

Increments a semantic version formatted string by the selected field.

## Usage

```yaml
- uses: axatol/actions/increment-semver
  with:
    # String in the format `major.minor.patch`
    # optionally with a label, e.g. `-pre-release`
    version: ""

    # Determines which field to increment.
    # One of "major", "minor", or "patch".
    # Defaults to "patch"
    field: ""
```

## Examples

### Increment a version patch field

```yaml
- uses: axatol/actions/increment-semver
  id: next
  with:
    version: 1.0.0

- run: |
    echo "${{ steps.next.outputs.next-version }}"

  # prints "1.0.1"
```

### Increment a version major field

```yaml
- uses: axatol/actions/increment-semver
  id: next
  with:
    version: 1.0.0
    field: major

- run: |
    echo "${{ steps.next.outputs.next-version }}"

  # prints "2.0.0"
```
