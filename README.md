# Hello world javascript action

This action gets the latest version of a package published on the Github Package Repository

## Inputs

### `accessToken`

**Required** Github Access Token

### `name`

**Required** The name of the package to check.

### `owner`

**Required** Owner of repo to check

### `repo`

**Required** Name of repo to check

## Outputs

### `version`

The version of the package.

## Example usage

```yaml
name: Check latest published package version
uses: actions/autsys/package-version@v0.1.0
with:
  id: check
  accessToken: ${{ secrets.GITHUB_TOKEN }}
  owner: autsys
  repo: mono
  name: package-name
```
