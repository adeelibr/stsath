var webpack = require('webpack');
var path = require('path');

config = {
  entry: [
    'script!jquery/dist/jquery.min.js',
    './client/app.jsx',
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
  output: {
    path: __dirname + '/public',
    filename: 'bundle.js'
  },
  resolve: {
    root: __dirname,
    modulesDirectories: [
      'node_modules',
      './client/components',
      './client/api'
    ],
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [
      {
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'stage-0']
        },
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/
      }
    ]
  },
  // sassLoader: {
  //   includePaths: [
  //     path.resolve(__dirname, 'node_modules/foundation-sites/scss')
  //   ]
  // },
  devtool: 'source-map'
};

module.exports = config;
