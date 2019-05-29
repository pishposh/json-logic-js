#!/bin/bash

# rugged UMD bundle targeting ES5, with sourcemap            - dist/abra.js
# rugged UMD bundle targeting ES5, minified, with sourcemap  - dist/abra.min.js
# browser global bundle targeting ES5, minified              - dist/abra.global.js
#
# CJS files targeting ES5 [lib/*.js]                         - lib/*.js [pkg.main: lib/main]
# ESM files targeting ES5 [lib/*.mjs]                        - lib/*.mjs [pkg.main: lib/main.mjs]
#
# original source                                            - src/*.js

set -euo pipefail

rm -rf lib dist lib-esm

# UMD bundles and browser global bundle:
npx rollup --config

# CJS files targeting ES5:
BABEL_ENV=cjs npx babel src --out-dir lib

# ESM files targeting ES5:
# build to lib-esm, rename to .mjs extension and move to lib:
BABEL_ENV=mjs npx babel src --out-dir lib-esm
find lib-esm -depth -name '*.js' -exec /bin/sh -c 'f="${1%.js}.mjs" && f="lib${f#lib-esm}" && mv "$1" $f' _ {} \;
rm -rf lib-esm
