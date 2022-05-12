const jsonImporter = require('node-sass-json-importer');
const path = require('path');

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    module: {
      rules: [
        {
          loader: 'babel-loader',
          test: /\.js$/,
          include: [
            path.join(__dirname, 'node_modules/react-native-storage'),
          ],
          exclude: /node_modules/,
          query: {
            cacheDirectory: true,
            presets: ['@babel/env', '@babel/react'],
            plugins: ['@babel/transform-runtime', '@babel/plugin-proposal-class-properties'],
          },
        },
        {
          test: /\.scss$/,
          use: ['style-loader',
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
              },
            },
            {
              loader: 'sass-loader',
              options: {
                importer: jsonImporter,
              },
            },
          ],
        },
      ],
    },
    resolve: {
      modules: ['src/', 'node_modules'],
      extensions: ['.jsx', '.js', '.json'],
      unsafeCache: true,
      alias: {
        assets: path.resolve(__dirname, '../src/assets'),
        styles: path.resolve(__dirname, '../src/assets/styles/styles.scss'),
        C4: path.resolve(__dirname, '../src/config/C4'),
        components: path.resolve(__dirname, '../src/components'),
        config: path.resolve(__dirname, '../src/config'),
        routers: path.resolve(__dirname, '../src/routers'),
        settings: path.resolve(__dirname, '../src/config/settings.json'),
        views: path.resolve(__dirname, '../src/views'),
        custom: path.resolve(__dirname, '../src/custom'),
      },
    },
  });
};
