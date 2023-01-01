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

This example will get the supported PHP version from `composer.json` and run tests of all those version:

```yaml
name: CI

on:
  push:
  pull_request:

jobs:
  supported-versions-matrix:
    name: Supported Versions Matrix
    runs-on: ubuntu-latest
    outputs:
      extensions: ${{ steps.supported-versions-matrix.outputs.extensions }}
      version: ${{ steps.supported-versions-matrix.outputs.version }}
    steps:
      - uses: actions/checkout@v3
      - id: supported-versions-matrix
        uses: WyriHaximus/github-action-composer-php-versions-in-range@v1
  tests:
    name: PHP ${{ matrix.php }} Latest
    runs-on: ubuntu-latest
    needs:
      - supported-versions-matrix
    strategy:
      matrix:
        php: ${{ fromJson(needs.supported-versions-matrix.outputs.version) }}
    steps:
      - name: Checkout code
        uses: actions/checkout@v3
      - name: Setup PHP
        uses: shivammathur/setup-php@v2
        with:
          php-version: ${{ matrix.php }}
          tools: composer
          coverage: none
          extensions: ${{ join(fromJson(needs.supported-versions-matrix.outputs.extensions), ',') }}
      - name: Install dependencies
        uses: ramsey/composer-install@v2
      - name: Execute tests
        run: composer test
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
