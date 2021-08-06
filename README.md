# Query Published Package Version

This action gets the latest version of a package published on the Github Package Repository. It uses the Github GraphQL API to perform a query that pulls the packages from a given repository using the `name`, `owner`, `repo` fields then returns the latest version to `version`.

If no package is found, then `0` is returned.

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

The latest version of the package.

## Example usage

```yaml
name: Check latest published package version
uses: actions/autsys/package-version@v1.0.0
with:
  id: check
  accessToken: ${{ secrets.GITHUB_TOKEN }}
  name: package-name
  owner: autsys
  repo: mono
```
