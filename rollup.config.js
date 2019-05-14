const babel = require('rollup-plugin-babel');
const resolve = require('rollup-plugin-node-resolve');
const { terser } = require('rollup-plugin-terser');
const optimize = require('rollup-plugin-optimize-js');
const filesize = require('rollup-plugin-filesize');

module.exports = [{
  input: 'src/index.js',
  plugins: [
    resolve(),
    babel(),
    filesize({ showMinifiedSize: false }),
  ],
  output: {
    file: 'dist/jsonLogic.js',
    format: 'umd',
    name: 'jsonLogic',
    exports: 'default',
    sourcemap: true,
  }
}, {
  input: 'src/index.js',
  plugins: [
    resolve(),
    babel(),
    terser(),
    optimize(),
    filesize({ showMinifiedSize: false }),
  ],
  output: {
    file: 'dist/jsonLogic.min.js',
    format: 'umd',
    name: 'jsonLogic',
    exports: 'default',
    sourcemap: true,
  }
}];
