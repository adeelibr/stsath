var webpack = require('webpack');
var path = require('path');

config = {
  // the entry file for the bundle
  entry: [
    'script!jquery/dist/jquery.min.js',
    'script!bootstrap-sass/assets/javascripts/bootstrap.min.js',
    './client/src/app.jsx',
  ],
  externals: {
    jquery: 'jQuery',
  },
  plugins: [
    new webpack.ProvidePlugin({
      '$': 'jquery',
      'jQuery': 'jquery'
    })
  ],
  // the bundle file we will get in the result
  output: {
    path: path.join(__dirname, '/client/dist/js'),
    filename: 'app.js',
  },
  resolve: {
    root: __dirname,
    modulesDirectories: [
      'node_modules',
      './client/src/components',
      './client/src/api'
    ],
    extensions: ['', '.js', '.jsx']
  },
  module: {
    // apply loaders to files that meet given conditions
    loaders: [
      {
        test: /\.jsx?$/,
        include: path.join(__dirname, '/client/src'),
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'stage-0']
        }
      },
      {
        test: /\.css|scss$/,
        loader: 'style!css!sass'
      },
      {
        test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=application/font-woff'
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=application/octet-stream'
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file'
      },
      {
        test: /\.jpg|png$/,
        loader: 'file'
      },
    ]
  },
  devtool: 'source-map',
  // start Webpack in a watch mode, so Webpack will rebuild the bundle on changes
  watch: true
};

module.exports = config;
