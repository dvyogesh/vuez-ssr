const merge = require('lodash/merge');

function optionalRequire(envPath) {
  let config;
  try { config = require(`${envPath}`);} catch (e) { config = {}; }
  return config;
}

export function loadConfig(context) {
  const env = process.env.ENV_NAME || process.env.HOM_ENV || 'dev';

  const baseConfig = optionalRequire('./config').default || {};
  const baseContextConfig = optionalRequire(`./config-${context}`).default || {};
  const envConfig = optionalRequire(`./${env}/config`).default || {};
  const envContextConfig = optionalRequire(`./${env}/config-${context}`).default || {};
  const config = merge({}, baseConfig, baseContextConfig, envConfig, envContextConfig);

  // Hack to mirror API_PRODUCT_HOST into API_RECOMMENDATION_HOST until static config is removed
  //config.API_RECOMMENDATIONS_HOST = config.API_PRODUCT_HOST;

  return config;
}

export const serverConfig = loadConfig('server');
export const clientConfig = loadConfig('client');
