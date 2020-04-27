const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  mode: "production",
  entry: ["@babel/polyfill", "./src/index.js"],
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
      {
        test: /\.(less)$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "less-loader",
        ],
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
    new MiniCssExtractPlugin({
      // make css into a link url
      filename: "assets/css/[name].[contenthash].css",
    }),
  ],
  optimization: {
    minimizer: [
      new OptimizeCssAssetsPlugin(), // Minimize CSS in production
      new TerserPlugin({
        cache: true,
        extractComments: false,
        exclude: [/\.min\.js$/gi],
        parallel: true, // recommended to increase build time
        sourceMap: true,
        terserOptions: {
          ecma: 5, // to es5
          mangle: true,
          compress: true,
        },
      }),
    ],
  },
};
