'use strict';

var path = require('path');
var HtmlwebpackPlugin = require('html-webpack-plugin');
var ROOT_PATH = path.resolve(__dirname);
var srcDir = path.resolve(ROOT_PATH, 'src');
var BUILD_PATH = path.resolve(ROOT_PATH, 'assets');
var pak = require('./package.json');
module.exports= {
  entry: {
    app: path.resolve(srcDir, 'app.js'),
    vendors:['react','react-dom']
  },
  output: {
    path: BUILD_PATH,
    filename: '[name].js' ,
    chunkFilename: 'js/[name].chunk.js'
  },
  devtool: 'eval-source-map',
  devServer: {
    historyApiFallback: true,
    hot: true,
    inline: true,
    progress: true
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        include: srcDir
      }
    ]
  },
  resolve: {
    extensions: ['', '.js','.jsx']
  },
  plugins: [
    new HtmlwebpackPlugin({
      title: pak.description,
      filename: 'index.html',
      inject: 'body',
      chunks: ['app','vendors'],
      template: './src/tmpl/main.html'
    })
  ]
};