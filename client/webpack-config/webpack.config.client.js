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
const ExtractPlugin = new ExtractTextPlugin({
  filename: '[name]_[chunkhash].css'
});
const vendor = [
  'prop-types',
  'react',
  'react-dom',
  'react-router',
  'react-router-redux',
  'react-redux',
  'react-responsive',
  'react-responsive-redux',
  'react-redux-toastr',
  'react-loadable',
  'redux',
  'history',
  'redux-thunk',
  'redux-form',
  'semantic-ui-react',
];

module.exports = {
  devtool: 'source-map',
  context: srcDir,
  entry: {
    app: [
      'babel-polyfill/dist/polyfill.js',
      './client/app.js',
      
    ],
    vendor,
    main: './scss/main.scss'
  },
  output: {
    filename: '[name]_[chunkhash].js',
    chunkFilename: '[name]_[chunkhash].js',
    path: buildDir,
    publicPath: '/static/'
  },
  resolve: {
    extensions: ['.js','.jsx','.scss','.sass'],
    modules: [srcDir, 'node_modules'],
    unsafeCache: true
  },
  module: {
    loaders: [
      {
        test: /\.sa|css$/,
        loader: ExtractPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader', 'sass-loader'
          ]
        }),
        include: path.resolve(srcDir, 'scss')
      },
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
          plugins: [
            'syntax-dynamic-import', 
            //to improve performance use (must be in that order):
            //https://www.youtube.com/watch?v=PnpfGy7q96U
            'transform-react-constant-elements',
            'transform-react-inline-elements'
          ],
          compact: false
        },
        include: clientInclude,
        exclude: /node_modules/,
        
      },
      
    ]
  },
  node: {
    dns: 'mock',
    net: 'mock'
  },
  plugins: [
    ExtractPlugin,
   new webpack.NamedModulesPlugin(),
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
   new webpack.NoEmitOnErrorsPlugin(),
   new webpack.DefinePlugin({
     '__CLIENT__': true,
     '__PRODUCTION__': true,
     'process.env.NODE_ENV': JSON.stringify('production')
   })
 ]
};
