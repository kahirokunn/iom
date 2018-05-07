const path = require('path');
const rootPath = path.resolve(__dirname, '../')
const updateWebpackConfig = require('storybook-readme/env/vue/updateWebpackConfig');

// load the default config generator.
const genDefaultConfig = require('@storybook/vue/dist/server/config/defaults/webpack.config.js');

module.exports = (baseConfig, env) => {
  const config = genDefaultConfig(baseConfig, env);

  config.resolve.alias['@'] = rootPath
  config.resolve.alias['~'] = rootPath

  return updateWebpackConfig(config);
};
