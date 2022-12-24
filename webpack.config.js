const argv = require('webpack-nano/argv');
const { merge } = require('webpack-merge');
const commonConfig = require('./config/webpack.common');

const addons = (addonsArg) => {
  let addons = Array.isArray(addonsArg)
    ? addonsArg.filter((item) => item !== true)
    : [addonsArg].filter(Boolean);

  return addons.map((addonName) => require(`./config/addons/webpack.${addonName}.js`));
};

module.exports = () => {
  const { env, addons: addonsArg } = argv;
  process.env.NODE_ENV = env;
  const envConfig = require(`./config/webpack.${env}.js`);
  const mergedConfig = merge(commonConfig, envConfig, ...addons(addonsArg));
  return mergedConfig;
};
