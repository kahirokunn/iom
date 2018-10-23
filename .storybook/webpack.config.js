const path = require('path');
const merge = require('webpack-merge');
const rootPath = path.resolve(__dirname, '../')

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
