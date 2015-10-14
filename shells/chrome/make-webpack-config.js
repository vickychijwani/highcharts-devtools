var path = require('path');
var webpack = require('webpack');

function makeWebpackConfig(options) {

  var config = {
    entry: {
      'content-script': './js/content-script.js',
      'background': './js/background.js',
      'panel': './js/panel.js',
      'backend': '../../backend/backend.js'
    },

    output: {
      path: './build',
      filename: '[name].min.js'
    },

    resolve: {
      modulesDirectories: ['node_modules', './src'],
      extensions: ['', '.js', '.jsx']
    },

    plugins: [],

    module: {
      loaders: [{
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ['react-hot-loader', 'babel-loader?stage=0']
      }, {
        test: /\.css$/, // Only .css files
        loader: 'style!css' // Run both loaders
      }]
    },

  };

  if (options.sourcemaps) {
    config.devtool = 'eval';
  }

  if (options.minify) {
    config.plugins.push(new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }));
    config.plugins.push(webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    }));
  }

  if (options.debug) {
    config.debug = true;
  }

  if (options.devServer) {
    config.publicPath = '/js/';
  }

  return config;

}

module.exports = makeWebpackConfig;
