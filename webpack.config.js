var webpack = require("webpack");
var css = require("css-loader");

var minify = [];
if (process.env.DEVELOPMENT !== 'true') {
  // minify in production
  minify = [ new webpack.optimize.UglifyJsPlugin({minimize: true}) ];
}

module.exports = {
  entry:"./src/js/app.jsx",
  output:{
    path: __dirname,
    filename: "./public/bundle.js"
  },
  plugins: minify,
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
