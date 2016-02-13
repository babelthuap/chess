var webpack = require("webpack");
var css = require("css-loader");

module.exports = {
  entry:"./src/js/app.jsx",
  output:{
    path: __dirname,
    filename: "./public/bundle.js"
  },
  plugins: [
    // uncomment for minification
    new webpack.optimize.UglifyJsPlugin({minimize: true})
  ],
  module:{
    loaders:[{
      test: /\.jsx?$/,
      exclude: [/node_modules/, /bower_components/],
      loader: 'babel-loader',
      query: {
        presets: ['react', 'es2015']
      }
    }, {
      test: /\.css$/,
      loader: "style!css"
    }]
  }
};
