const CompressionPlugin = require('compression-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const SentryPlugin = require('@sentry/webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const jsonImporter = require('node-sass-json-importer');
const path = require('path');
const webpack = require('webpack');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const { long } = require('git-rev-sync');

const customSettings = require('./src/config/custom.json');

const production = (plugin, mode) => [
  ...(mode === 'production' ? [plugin] : []),
];

const development = (plugin, mode) => [
  ...(mode === 'development' ? [plugin] : []),
];

module.exports = (env, argv) => ({
  entry: ['core-js/stable', 'regenerator-runtime/runtime', './src/app.js'],
  output: {
    filename: '[name].bundle.js',
    path: path.join(__dirname, 'public'),
  },
  mode: (argv && argv.mode) || 'development',
  module: {
    rules: [
      {
        loader: 'babel-loader',
        test: /\.js$/,
        exclude: /node_modules(?!\/@fortawesome)/,
        query: {
          cacheDirectory: true,
          presets: ['@babel/env', '@babel/react'],
          plugins: ['@babel/plugin-transform-runtime'],
        },
      },
      {
        test: /\.s?css$/,
        exclude: '/node_modules/',
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              minimize: true,
              importLoaders: 1,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              precision: 10,
              minimize: true,
              importer: jsonImporter,
            },
          },
        ],
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader?name=public/images/[name].[hash].[ext]',
            options: {
              limit: 8000, // Convert images < 8kb to base64 strings
              name: 'images/[hash]-[name].[ext]',
            },
          },
        ],
      },
      {
        test: /\.js?$/,
        include: [path.join(__dirname, 'node_modules/react-native-storage')],
        loader: 'babel-loader',
        query: {
          cacheDirectory: true,
          presets: ['@babel/env', '@babel/react'],
          plugins: [
            '@babel/transform-runtime',
            '@babel/plugin-syntax-dynamic-import',
          ],
        },
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'babel-loader',
          },
          {
            loader: 'react-svg-loader',
            options: {
              jsx: false, // true outputs JSX tags
            },
          },
        ],
      },
      {
        test: /\.(eot|otf|ttf|woff|woff2)$/,
        loader: 'file-loader?name=fonts/[name].[hash].[ext]',
      },
    ],
  },
  resolve: {
    modules: ['src/', 'node_modules'],
    extensions: ['.jsx', '.js', '.json'],
    unsafeCache: true,
    alias: {
      assets: path.resolve(__dirname, 'src', 'assets'),
      C4: path.resolve(__dirname, 'src', 'config/C4'),
      components: path.resolve(__dirname, 'src', 'components'),
      config: path.resolve(__dirname, 'src', 'config'),
      routers: path.resolve(__dirname, 'src', 'routers'),
      settings: path.resolve(__dirname, 'src', 'config/settings.json'),
      views: path.resolve(__dirname, 'src', 'views'),
      custom: path.resolve(__dirname, 'src', 'custom'),
    },
  },
  devtool:
    argv && argv.mode === 'production' ? 'source-map' : 'eval-source-map',
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    disableHostCheck: true,
    historyApiFallback: true,
    hot: true,
    inline: true,
    port: (!argv && 6060) || 8080,
    publicPath: '/',
    stats: {
      usedExports: true,
    },
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify((argv && argv.mode) || 'development'),
      },
    }),
    new HtmlWebpackPlugin({
      hash: true,
      rev: argv && argv.mode === 'production' ? long() : null,
      filename: 'index.html',
      template: './public/index.ejs',
      alwaysWriteToDisk: true,
      templateParameters: { ...customSettings },
    }),
    new HtmlWebpackHarddiskPlugin(),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
    }),
    new UglifyJsPlugin({
      test: /\.js($|\?)/i,
      include: /\.\//,
      cache: true,
      sourceMap: true,
      uglifyOptions: {
        ecma: 8,
        mangle: true,
        toplevel: false,
        compress: true,
        keep_classnames: false,
        keep_fnames: false,
        output: {
          comments: false,
          beautify: false,
        },
      },
    }),
    new webpack.HotModuleReplacementPlugin(),
    ...development(
      new BundleAnalyzerPlugin({
        openAnalyzer: false,
      }),
      argv && argv.mode && !argv.port,
    ),
    ...production(
      new SentryPlugin({
        release: long(),
        include: './public',
        ignore: ['node_modules', 'webpack.config.js', 'outdated'],
        ignoreFile: '.sentrycliignore',
      }),
      argv && argv.mode,
    ),
    ...production(
      new webpack.optimize.OccurrenceOrderPlugin(),
      argv && argv.mode,
    ),
    ...production(new webpack.optimize.LimitChunkCountPlugin(
      { maxChunks: 1 },
      argv && argv.mode,
    )),
    ...production(
      argv &&
        argv.mode &&
        new CompressionPlugin({
          filename: '[path].br[query]',
          algorithm: 'brotliCompress',
          test: /\.(js|css|html|svg)$/,
          compressionOptions: { level: 11 },
          threshold: 0,
          minRatio: 0.8,
          deleteOriginalAssets: false,
        }),
      argv && argv.mode,
    ),
  ],
});
