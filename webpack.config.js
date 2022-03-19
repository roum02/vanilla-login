const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: "./src/main.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      // {
      //   test: /\.css$/,
      //   use: [
      //     //{ loader: MiniCssExtractPlugin.loader },
      //     "style-loader",
      //     "css-loader",
      //   ],
      // },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          //"style-loader",
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
              url: true, // Enable/disable url() resolving.
            },
          },
          "sass-loader",
        ],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: ["file-loader"],
      },
      { test: /\.hbs$/, loader: "handlebars-loader" },
    ],
  },
  devServer: {
    port: 9000,
    historyApiFallback: true,
    hot: true,
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, "index.html"),
    }),
    new MiniCssExtractPlugin({
      filename: "main.css",
    }),
  ],
};
