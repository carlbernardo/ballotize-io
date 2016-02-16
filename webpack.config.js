var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: [
    './client/app/react-index.js'
  ],
  output: {
    path: __dirname + '/client/app/dist/',
    filename: 'bundle.js'
  },
  debug: true,
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.js$/,
        include: path.join(__dirname, 'client'),
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015']
        }
      },
      {
        test: /\.scss$/,
        loaders: ["style", "css", "sass"]
      },
      {
        test:/\.(png|jpg)$/,
        loader: 'url?limit=25000'
      }
    ]
  }
};
