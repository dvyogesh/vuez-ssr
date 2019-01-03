var path = require("path");
var webpack = require("webpack");
var merge = require("webpack-merge");
var baseWebpackConfig = require("./webpack.config");
//var webpackClientConfig = require("./webpack-client.config");

var webpackConfig = merge(baseWebpackConfig, {
  target: "node",
  entry: {
    app: "./src/entry-server.js"
  },
  devtool: false,
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "server.bundle.js",
    libraryTarget: "commonjs2"
  },
  resolve: {
    extensions: ["*", ".js", ".vue", ".json"]
  },
  externals: Object.keys(require("./package.json").dependencies),
  plugins: [
    new webpack.DefinePlugin({
      "process.env": "production"
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ]
});



module.exports = webpackConfig;
