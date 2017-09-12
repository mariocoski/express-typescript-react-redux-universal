const path =  require('path');
const webpack =  require('webpack');
const ExtractTextPlugin =  require('extract-text-webpack-plugin');

const rootDir = process.cwd();
const srcDir  = path.join(rootDir, 'src');
const build = path.join(rootDir, 'build');
const universal = path.join(srcDir, 'universal');
const server = path.join(srcDir, 'server');

const serverInclude = [server, universal];

module.exports = {
  context: srcDir,
  entry: {
    prerender: './universal/routes/Routes.js'
  },
  target: 'node',
  output: {
    path: build,
    chunkFilename: '[name]_[chunkhash].js',
    filename: '[name].js',
    libraryTarget: 'commonjs2',
    publicPath: '/static/'
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [srcDir, 'node_modules']
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new ExtractTextPlugin('[name].css'),
    new webpack.optimize.UglifyJsPlugin({compressor: {warnings: false}}),
    new webpack.optimize.LimitChunkCountPlugin({maxChunks: 1}),
    new webpack.DefinePlugin({
      '__CLIENT__': false,
      '__PRODUCTION__': true,
      'process.env.NODE_ENV': JSON.stringify('production')
    })
  ],
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
        test: /\.css$/,
        include: serverInclude,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                root: srcDir,
                modules: true,
                importLoaders: 1,
                localIdentName: '[name]_[local]_[hash:base64:5]'
              }
            }
          ]})
      },

      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        include: serverInclude
      }

    ]
  }
};
