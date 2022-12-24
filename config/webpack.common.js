const commonPaths = require('./common-paths');
const webpack = require('webpack');
const ForkTsCheckerWebpackPlugin = require('react-dev-utils/ForkTsCheckerWarningWebpackPlugin');
const babelConfig = require('../.babelrc.json');
const ESLintPlugin = require('eslint-webpack-plugin');
const eslintConfig = require('../.eslintrc.js');

const config = {
  context: commonPaths.projectRoot,
  output: {
    filename: '[name].js',
    path: commonPaths.outputPath,
  },
  infrastructureLogging: {
    level: 'none',
  },
  resolve: {
    alias: {
      app: commonPaths.appEntry,
    },
    fallback: {
      url: false,
    },
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      debug: true,
    }),
    new webpack.IgnorePlugin({
      resourceRegExp: /^\.\/locale$/,
      contextRegExp: /moment$/,
    }),
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(process.env),
    }),
    new ForkTsCheckerWebpackPlugin({
      async: true,
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new ESLintPlugin({
      baseConfig: eslintConfig,
      emitError: true,
      emitWarning: true,
      exclude: ['node_modules', 'dist', '__test__'],
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
      failOnError: true,
      failOnWarning: false,
      fixTypes: ['layout', 'problem', 'suggestion'],
      fix: true,
      useEslintrc: true,
    }),
  ],
  module: {
    noParse: /tangram\/dist\/tangram/,
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        include: commonPaths.appEntry,
        use: [
          {
            loader: 'babel-loader',
            options: babelConfig,
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: false,
              sourceMap: true,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  [
                    require("tailwindcss"),
                    require("autoprefixer")
                  ],
                ],
              },
            },
          },
        ],
      },
      {
        test: /\.(png|jpg|gif)/,
        use: 'url-loader?limit=8192',
      },
      {
        test: /\.(eot|woff|woff2|svg|ttf)([\?]?.*)$/,
        use: 'file-loader',
      },
      {
        test: /\.mjs$/,
        include: /node_modules/,
        type: 'javascript/auto',
      },
    ],
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      minSize: 0,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name(module) {
            // get the name. E.g. node_modules/packageName/not/this/part.js
            // or node_modules/packageName
            const packageName = module.context.match(/[\\/]node_modules\/\.pnpm[\\/](.*?)([\\/]|$)/)[1];
            // npm package names are URL-safe, but @ symbols can cause errors
            return `npm.${packageName.replaceAll('@', '')}`;
          },
        },
      },
    },
  },
};

module.exports = config;
