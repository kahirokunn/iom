const path = require('path');
const merge = require('webpack-merge');
const rootPath = path.resolve(__dirname, '../')
const updateWebpackConfig = require('storybook-readme/env/vue/updateWebpackConfig');

module.exports = (baseConfig, env, defaultConfig) => {
  return merge(defaultConfig, {
    resolve: {
      alias: {
        '@': rootPath,
        '~': rootPath,
        '~assets': `${rootPath}/assets`,
      },
    },
  });
};
