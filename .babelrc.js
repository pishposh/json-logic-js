module.exports = {
  presets: [
    ['@babel/preset-env', { "modules": false, "useBuiltIns": false, "loose": true }],
  ],
  plugins: [
    '@babel/plugin-proposal-export-default-from'
  ],
  env: {
    cjs: {
      presets: [
        ['@babel/preset-env', { "useBuiltIns": false, "loose": true, modules: 'commonjs' }],
      ],
      plugins: [
        '@babel/plugin-proposal-export-default-from'
      ]
    },
    mjs: {
      presets: [
        ['@babel/preset-env', { "modules": false, "useBuiltIns": false, "loose": true }],
      ],
      plugins: [
        '@babel/plugin-proposal-export-default-from'
      ]
    },
  },
};
