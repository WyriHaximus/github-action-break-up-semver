# Break up SemVer

Break up a semver into chunks

## Options

This action supports the following option.

### version

The semver valid version to be broken up in pieces.

* *Required*: `Yes`
* *Type*: `String`
* *Example*: `1.2.3`

## Outputs

This action outputs the following outputs:
* `major`: `1`
* `v_major`: `v1`
* `minor`: `2`
* `patch`: `3`
* `major_minor`: `1.2`
* `v_major_minor`: `v1.2`
* `major_minor_patch`: `1.2.3`
* `v_major_minor_patch`: `v1.2.3`

## Example

This example is a slimmed down version how I'm using this action 

```yaml
name: Create Release
env:
  MILESTONE: ${{ github.event.milestone.title }}
on:
  milestone:
    types:
      - closed
jobs:
  generate-version-strategy:
    name: Generate Version Strategy
    needs:
      - wait-for-status-checks
    runs-on: ubuntu-latest
    outputs:
      docker_versions: ${{ steps.generate-version-strategy.outputs.docker_versions }}
      tag_versions: ${{ steps.generate-version-strategy.outputs.tag_versions }}
    steps:
      - uses: actions/checkout@v1
      - uses: WyriHaximus/github-action-break-up-semver@master
        id: breakupsemver
        with:
          version: ${{ env.MILESTONE }}
      - id: generate-version-strategy
        name: Generate Versions
        env:
          MAJOR: ${{ steps.breakupsemver.outputs.v_major }}
          MAJOR_MINOR: ${{ steps.breakupsemver.outputs.v_major_minor }}
          MAJOR_MINOR_PATCH: ${{ steps.breakupsemver.outputs.v_major_minor_patch }}
        run: |
          echo "::set-output name=docker_versions::[\"${MAJOR}\",\"${MAJOR_MINOR}\",\"${MAJOR_MINOR_PATCH}\"]"
  tag-docker-image:
    name: Tag Docker image for version ${{ matrix.version }}
    needs:
      - generate-version-strategy
    strategy:
      fail-fast: false
      matrix:
        version: ${{ fromJson(needs.generate-version-strategy.outputs.docker_versions) }}
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - run: |
          printf "FROM %s" $(echo "ghcr.io/${GITHUB_REPOSITORY}:sha-${GITHUB_SHA}" | tr '[:upper:]' '[:lower:]') >> Dockerfile.tag
          docker build --no-cache -f Dockerfile.tag -t $(echo "ghcr.io/${GITHUB_REPOSITORY}:${{ matrix.version }}" | tr '[:upper:]' '[:lower:]') .
```

## License ##

Copyright 2023 [Cees-Jan Kiewiet](http://wyrihaximus.net/)

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.
