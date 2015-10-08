var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js');

var srcPath = './public/src/';
var srcJsPath = srcPath + 'js/';
var srcCssPath = srcPath + 'css/';
var srcImgPath = srcPath + 'img/';

var bulidPath = './public/assets/';
var buildJsPath = bulidPath + 'js/';
var buildCssPath = bulidPath + 'css/';
var buildImgPath = bulidPath + 'img/';

module.exports = {
  entry: {
    app: srcJsPath + 'app.js',

  },
  output: {
    path: bulidPath,
    filename: '[name].bundle.js'
  },

  plugins: [
      commonsPlugin,
      new ExtractTextPlugin("style.css")
    ],

  module: {
    loaders: [
      //.css 文件使用 style-loader 和 css-loader 来处理
      //{ test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader") },
      { test: /\.css$/, loader: 'style-loader!css-loader' },
      //.js 文件使用 jsx-loader 来编译处理
      { test: /\.js$/, loader: 'jsx-loader?harmony' },
      //.scss 文件使用 style-loader、css-loader 和 sass-loader 来编译处理
      { test: /\.scss$/, loader: 'style!css!scss?sourceMap'},
      //图片文件使用 url-loader 来处理，小于8kb的直接转为base64
      { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'}
    ],
  }
};
