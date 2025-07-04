// craco.config.js
const path = require("path");

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      webpackConfig.resolve.alias = {
        ...webpackConfig.resolve.alias,
        // Force the “.js” extension for the RoughJS imports in Excalidraw’s CJS bundle
        "roughjs/bin/math":      path.resolve(__dirname, "node_modules/roughjs/bin/math.js"),
        "roughjs/bin/rough":     path.resolve(__dirname, "node_modules/roughjs/bin/rough.js"),
        "roughjs/bin/generator": path.resolve(__dirname, "node_modules/roughjs/bin/generator.js"),
      };
      return webpackConfig;
    },
  },
};
