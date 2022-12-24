const commonPaths = require('./common-paths');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { WebpackPluginServe: Serve } = require('webpack-plugin-serve');
const dontenv = require('dotenv');

dontenv.config();

const port = process.env.PORT || 3001;

const serverVars = ['name'];
// Add needed plugins here
const htmlPluginParams = {
  serverVars: serverVars,
  config: {},
  filename: 'index.html',
  alwaysWriteToDisk: true,
};

const config = {
  mode: 'development',
  entry: {
    app: ['webpack-plugin-serve/client', `${commonPaths.appEntry}/index`],
  },
  output: {
    publicPath: '/',
  },
  stats: {
    errorDetails: true,
    assets: false,
    colors: true,
  },
  cache: true,
  devtool: 'cheap-module-source-map',
  plugins: [
    new HtmlWebpackPlugin({
      templateParameters: htmlPluginParams,
      template: 'src/index.ejs',
    }),
    new Serve({
      historyFallback: {
        htmlAcceptHeaders: ['text/html', '*/*'],
        rewrites: [],
      },
      liveReload: false,
      hmr: "refresh-on-failure",
      host: 'localhost',
      port: port,
      open: true,
      static: commonPaths.outputPath,
      status: true,
      progress: 'minimal',
      waitForBuild: true,
    }),
  ],
  watch: true,
};

module.exports = config;
