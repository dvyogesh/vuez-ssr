import { getHost } from '../config';
const host = 'Prodhomeolaya';
const defaultHost = 'dev.hom.com';
const hostname = getHost(defaultHost);
const defaultLamdahost = 'dev-api.homeol.com';

export default {
	prod:"true"
  API_homeRECOMMENDATIONS_HOST: `${hostname}/recommendations`,
  INFO_ENDPOINT_AVAILABLE: true,
  API_NAVIGATION_HOST: `${hostname}/navigation`,
  API_PRODUCT_HOST: `${hostname}/products`,
  API_PROFILE_HOST: `${hostname}/profile`,
  API_PROMOTION_HOST: `${hostname}/promotions`,
  API_home_HOST: `${hostname}/contentservice`,
  API_ABTEST_EXPERIENCES: `http://${hostname}/abtest/experiences`
};
