const path = require('path');
const PROJECT_ROOT = path.resolve(__dirname, '../');

module.exports = {
  projectRoot: PROJECT_ROOT,
  outputPath: path.join(PROJECT_ROOT, 'dist/assets'),
  appEntry: path.join(PROJECT_ROOT, 'src'),
  appNodeModules: path.join(PROJECT_ROOT, 'node_modules'),
};
