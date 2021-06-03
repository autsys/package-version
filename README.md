# Hello world javascript action

This action gets the latest version of a package published on the Github Package Repository

## Inputs

### `accessToken`

**Required** Github Access Token

### `name`

**Required** The name of the package to check.

### `owner`

**Required** Owner of repo to check

## Outputs

### `version`

The version of the package.

## Example usage

uses: actions/@autsys/package-version@v0.0.1
with:
name: '@autsys/package'
