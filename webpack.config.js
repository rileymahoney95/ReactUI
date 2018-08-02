
const path = require("path");
const webpack = require('webpack');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const BrowserSyncPlugin = require("browser-sync-webpack-plugin");
const dotenv = require("dotenv").config();


const BrowserSync = new BrowserSyncPlugin({
  proxy: "localhost:4200",
  port: 4201,
  notify: false,
  browser: "google chrome",
  host: "localhost.homedepot.com",
  open: "external"
});

module.exports = {
  entry: ["babel-polyfill", "./src/index.js"],
  output: {
    filename: "bundle.js",
    path: path.join(__dirname, "public")
  },
  devServer: {
    before(app) {
      app.get("/config", (req, res) => {
        res.send(process.env.config);
      });
    },
    historyApiFallback: true,
    allowedHosts: ["homedepot.com"],
    contentBase: path.join(__dirname, "public"),
    port: 4200
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ["babel-loader"]
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: ["css-loader", "sass-loader"]
        })
      },
      {
        test: /\.(csv|ico)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              publicPath: 'public/'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "src/index.html",
      favicon: 'src/resources/favicon.ico'
    }),
    new ExtractTextPlugin({
      filename: "app.css"
    }),
    BrowserSync,
    new webpack.DefinePlugin({
      'process.env': dotenv.parsed
    })
  ]
};
