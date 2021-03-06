var webpack = require('webpack');
var ignoreFiles = new webpack.IgnorePlugin(/\.\/jquery-last.js$/);
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js');

var srcPath = './src/';

var buildPath = './dist/';

module.exports = {
  entry: {
    Owl: srcPath + 'Owl.js',
    vendor: ['./lib/zepto', './lib/template']
  },
  output: {
    path: buildPath,
    filename: '[name].js'
  },

  plugins: [
      commonsPlugin,
      new webpack.ProvidePlugin({
            $: '../lib/zepto'
      }),
      //new ExtractTextPlugin("style.css")
    ],
  
  
  module: {
    loaders: [
      //.css 文件使用 style-loader 和 css-loader 来处理
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
