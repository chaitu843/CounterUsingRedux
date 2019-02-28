const HtmlWebpackPlugin = require('html-webpack-plugin');
const m = process.argv[2];

module.exports = {
  entry: `./public/js/index.js`,
  devtool: "cheap-eval-source-map",
  output: {
    path: __dirname + '/dist',
    filename: 'bundle.js'
  },
  module: {
    rules: [
      { test: /\.js$/, use: 'babel-loader', exclude: "/node_modules/" },
      { test: /\.css$/, use: ['style-loader','css-loader'], exclude: "/node_modules/" },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({template: __dirname+ '/public/index.html'})
  ]
};