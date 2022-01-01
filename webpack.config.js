const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
module.exports = {
  entry: "./src/index.ts",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        // use: ["style-loader", "css-loader"],
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.png$/,
        use: ["file-loader"],
      },
      {
        test: /[\.js]$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: ["ts-loader"],
      },
    ],
  },
  resolve: {
    modules: [path.join(__dirname, "src"), "node_modules"],
    extensions: [".ts", ".js"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html",
    }),
    new MiniCssExtractPlugin({
      filename: "common.css",
    }),
    new CleanWebpackPlugin(),
  ],

  devServer: {
    static: {
      directory: path.resolve(__dirname, "dist"),
    },
    port: 3000,
  },
};
