const path = require('path');
const webpack = require('webpack');
const rootDir = process.cwd();
const srcDir  = path.join(rootDir, 'src');
const buildDir = path.join(rootDir, 'build');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
const clientSrc    = path.join(srcDir, 'client');
const universalSrc = path.join(srcDir, 'universal');
const clientInclude = [clientSrc, universalSrc];
const vendor = [
  'prop-types',
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
  var ExtractPlugin = new ExtractTextPlugin({
    filename: 'main.css',
    allChunks: true
  });
module.exports =
  {
  devtool: 'eval',
  context: srcDir,
  entry: {
    app: [
      'babel-polyfill/dist/polyfill.js',
      'react-hot-loader/patch',
      'webpack-hot-middleware/client?noInfo=false',
      './client/app.js'
    ],
    // main: [
    //   // 'babel-polyfill/dist/polyfill.js',
    //   'react-hot-loader/patch',
    //   'webpack-hot-middleware/client?noInfo=false',
    //   './scss/main.scss'
    // ]
  },
  output: {
    filename: '[name].js',
    chunkFilename: '[name]_[chunkhash].js',
    path: path.join(rootDir, 'build'),
    publicPath: '/static/'
  },
    resolve: {
      extensions: ['.js','.jsx', '.scss','.css', '.sass'],
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
          test: /\.sa|css$/,
          // loaders: [ 'style-loader','css-loader', 'sass-loader'],
         
          include: path.resolve(srcDir, 'scss'),
          exclude: clientInclude,
          // loader: ExtractPlugin.extract({
          //   use: [
          //     'css-loader', 'sass-loader'
          //   ]
          // })
          use: ['css-hot-loader'].concat(ExtractPlugin.extract({
            fallback: 'style-loader',
            use: ['css-loader','sass-loader']
          })),
        },
        { 
          test: /\.jsx?$/,
          loader: 'babel-loader',
          query: babelQuery,
          include: clientInclude
        },
      ]
    },
    plugins: [
         ExtractPlugin,
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
  