/* eslint-disable no-console */
// require('babel-register')();
// require('babel-polyfill')

import  { serverConfig, clientConfig } from './config';
load();

function load() {
  const fullEnv = readAndLog('ENV_VERSION_NAME');
  const env = readAndLog('ENV_NAME') || readAndLog('h_ENV') || readAndLog('NODE_ENV') || 'dev';

  global.HConfig = serverConfig || {};
  global.clientConfigs = clientConfig || {}
  global.serverConfigs = serverConfig || {}
  //HConfig.FULL_ENV = serverConfig;

  HConfig.ENV = env;
  console.log("====*****clientConfig*****======")
  console.log(clientConfig)
  console.log("====*****serverConfig*****======")
  console.log(serverConfig)
  //console.log(`{ "MnConfig": ${JSON.stringify(MnConfig)} }`);
}

function readAndLog(key) {
  const value = process.env[key];
  console.log(`{ ${JSON.stringify(key)}: ${JSON.stringify(value)} }`);
  return value;
}

