const path =  require('path');
const webpack =  require('webpack');

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
        test: /\.jsx?$/,
        loader: 'babel-loader',
        include: serverInclude,
        exclude: /node_modules/,
        query: {
          plugins: [
            //to improve performance use (must be in that order):
             //https://www.youtube.com/watch?v=PnpfGy7q96U
             'transform-react-constant-elements',
             'transform-react-inline-elements'
          ],
          compact: false
        }
      }

    ]
  }
};
