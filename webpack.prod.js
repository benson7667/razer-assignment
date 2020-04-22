const webpack = require("webpack");
const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: "production",
  entry: "./src/index.js",
  output: {
    filename: "[name].[contenthash].js",
    path: path.resolve(__dirname, "./dist"),
    publicPath: "/",
  },
  resolve: {
    extensions: [".json", ".js", ".jsx"],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
      {
        test: /\.(png|jpe?g|svg|gif)$/,
        loader: "file-loader",
        options: {
          name: "assets/images/[name].[contenthash].[ext]",
        },
      },
      {
        test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
        loader: "file-loader",
        options: {
          name: "assets/fonts/[name].[contenthash].[ext]",
        },
      },
      {
        test: /\.(css)$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: "Razer Assignment",
      description: "This is an assignment given by Razer Inc",
      template: "./src/index.html",
    }),
    // new webpack.DefinePlugin({
    //   "process.env.NODE_ENV": JSON.stringify(
    //     process.env.NODE_ENV || "production"
    //   ),
    //   "process.env.BUILD_ENV": JSON.stringify(
    //     process.env.BUILD_ENV || "development"
    //   ),
    // }),
    new MiniCssExtractPlugin({
      filename: "assets/css/[name].[contenthash].css",
    }),
  ],
  //   optimization: {
  //     minimizer: [
  //       new OptimizeCssAssetsPlugin(), // Minimize CSS in production
  //       new UglifyJsPlugin(), // Minimize JS in production
  //     ],
  //   },
};
