const path = require('path');
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserWebpackPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = env => ({
  mode: env.NODE_ENV,
  devtool: "source-map",
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "restify.js",
    library: "Restify",
    libraryTarget: "umd",
    globalObject: "this",
    umdNamedDefine: true,
  },
  module: {
    rules: [
      {
        test: /.js$/,
        loader: "babel-loader"
      },
    ]
  },
  optimization: {
    minimize: env.NODE_ENV === 'production',
    minimizer: [
      new TerserWebpackPlugin({
        parallel: true,
        sourceMap: env.NODE_ENV === 'production',
        extractComments: env.NODE_ENV === 'production',
        terserOptions: {
          keep_classnames: true,
          keep_fnames: true,
        }
      })
    ],
  },
  plugins: [
    // new webpack.HotModuleReplacementPlugin(),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: "Restify",
      template: "./src/index.html",
    }),
  ],
  devServer: {
    hot: true,
    port: 8000,
    writeToDisk: true,
    contentBase: path.join(__dirname, "dist")
  },
})