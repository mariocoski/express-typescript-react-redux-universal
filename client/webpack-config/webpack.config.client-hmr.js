const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const rootDir = process.cwd();
const srcDir  = path.join(rootDir, 'src');
const buildDir = path.join(rootDir, 'build');

const clientSrc    = path.join(srcDir, 'client');
const universalSrc = path.join(srcDir, 'universal');
const clientInclude = [clientSrc, universalSrc];

const vendor = [
  // 'prop-types',
  'react',
  'react-dom',
  'react-router',
  'react-router-redux',
  'react-redux',
  'redux',
  'history',
  'redux-thunk'
];
const babelQuery = {
    "presets": [
      "react",
      ["es2015", { "modules": false }],
      "stage-0"
    ],
    "plugins": [
      "transform-decorators-legacy",
      "react-hot-loader/babel"
    ]
  };

module.exports = {
  devtool: 'eval',
  context: srcDir,
  entry: {
    app: [
      'babel-polyfill/dist/polyfill.js',
      'react-hot-loader/patch',
      'webpack-hot-middleware/client?noInfo=false',
      './client/app.js'
    ]
  },
  output: {
    filename: 'app.js',
    chunkFilename: '[name]_[chunkhash].js',
    path: path.join(rootDir, 'build'),
    publicPath: '/static/'
  },
    resolve: {
      extensions: ['.js','.jsx'],
      modules: [srcDir, 'node_modules']
    },
    module: {
      loaders: [
        {
          test: /\.(png|j|jpeg|gif|svg|woff|woff2)$/,
          use: {
            loader: 'url-loader',
            options: {
              limit: 10000
            }
          }
        },
        { 
          test: /\.jsx?$/,
          loader: 'babel-loader',
          query: babelQuery,
          include: clientInclude
        },
        {
          test: /\.css$/,
          include: clientInclude,
          use: [
            {loader: 'style-loader'},
            {loader: 'css-loader',
            options: {
              root: srcDir,
              modules: true,
              importLoaders: 1,
              localIdentName: '[name]_[local]_[hash:base64:5]'
            }}
         ]
        }
      ]
    },
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.DefinePlugin({
          '__CLIENT__': true,
          '__PRODUCTION__': false,
          'process.env.NODE_ENV': JSON.stringify('development')
        }),
    ],
  };
  