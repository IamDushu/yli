const webpack = require("webpack");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const withImages = require("next-images");
const withPlugins = require("next-compose-plugins");

const config = {
  devIndicators: {
    buildActivity: false,
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback.fs = false;
    }

    return config;
  },
  optimization: {
    minimizer: [
      new CssMinimizerPlugin({}),
      new UglifyJsPlugin({
        cache: true,
        sourceMap: true,
        parallel: true,
      }),
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production"),
      },
    }),
    new webpack.optimize.AggressiveMergingPlugin(),
  ],
};
// const withBundleAnalyzer = require("@next/bundle-analyzer")({
//   enabled: true,
//   openAnalyzer: true,
// });

// module.exports = withPlugins(
//   [
//     [withBundleAnalyzer],
//     [
//       withImages,
//       {
//         cssLoaderOptions: {
//           url: false,
//         },
//         esModule: true,
//         productionBrowserSourceMaps: false,
//       },
//     ],
//   ],
//   config
// );
module.exports = withPlugins(
  [
    [
      withImages,
      {
        cssLoaderOptions: {
          url: false,
        },
        esModule: true,
        productionBrowserSourceMaps: false,
      },
    ],
  ],
  config
);
