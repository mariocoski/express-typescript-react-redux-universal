const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const AssetsPlugin = require('assets-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const rootDir = process.cwd();
const srcDir  = path.join(rootDir, 'src');
const buildDir = path.join(rootDir, 'build');

const clientSrc    = path.join(srcDir, 'client');
const universalSrc = path.join(srcDir, 'universal');
const clientInclude = [clientSrc, universalSrc];

const vendor = [
  'react',
  'react-dom',
  'react-router',
  'react-router-redux',
  'react-redux',
  'redux',
  'history',
  'redux-thunk'
];

module.exports = {
  devtool: 'source-map',
  context: srcDir,
  entry: {
    app: [
      'babel-polyfill/dist/polyfill.js',
      './client/app.js'
    ],
    vendor
  },
  output: {
    filename: '[name]_[chunkhash].js',
    chunkFilename: '[name]_[chunkhash].js',
    path: buildDir,
    publicPath: '/static/'
  },
  resolve: {
    extensions: ['.js','.jsx'],
    modules: [srcDir, 'node_modules'],
    unsafeCache: true
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
        options: {
          babelrc: false,
          presets: ['react','es2015','stage-0'],
          plugins: ['syntax-dynamic-import']
        },
        include: clientInclude
      },
 
      {
         test: /\.css|less$/,
         include: clientInclude,
         loaders: ExtractTextPlugin.extract({
         fallback: 'style-loader',
         use: [
           {
             loader: 'css-loader',
             options: {
               root: srcDir,
               modules: true,
               importLoaders: 1,
               localIdentName: '[name]_[local]_[hash:base64:5]'
            }}
         ]})
      }
 
    ]
  },
  node: {
    dns: 'mock',
    net: 'mock'
  },
  plugins: [
   new webpack.NamedModulesPlugin(),
   new ExtractTextPlugin('[name].css'),
   new webpack.NormalModuleReplacementPlugin(/\.\.\/routes\/static/, '../routes/async'),
   new webpack.optimize.CommonsChunkPlugin({
     names: ['vendor', 'manifest'],
     minChunks: Infinity
   }),
   new webpack.optimize.AggressiveMergingPlugin(),
   /* minChunkSize should be 50000 for production apps
    * 10 is for this example */
   new webpack.optimize.MinChunkSizePlugin({minChunkSize: 10}),
   new webpack.optimize.UglifyJsPlugin({compressor: {warnings: false}, comments: /(?:)/}),
   new AssetsPlugin({path: buildDir, filename: 'assets.json'}),
  //  new webpack.NoEmitOnErrorsPlugin(),
   new webpack.DefinePlugin({
     '__CLIENT__': true,
     '__PRODUCTION__': true,
     'process.env.NODE_ENV': JSON.stringify('production')
   })
 ]
};
