const path = require('path');
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: "development",
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
}