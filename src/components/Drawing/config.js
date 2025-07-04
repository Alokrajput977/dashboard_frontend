// craco.config.js
const path = require("path");

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      webpackConfig.resolve.alias = {
        ...webpackConfig.resolve.alias,
        // point the CJS imports at the real .js files
        "roughjs/bin/math":   path.resolve(__dirname, "node_modules/roughjs/bin/math.js"),
        "roughjs/bin/rough":  path.resolve(__dirname, "node_modules/roughjs/bin/rough.js"),
      };
      return webpackConfig;
    },
  },
};
