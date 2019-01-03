export default {
  LOG_LEVEL: process.env.LOG_LEVEL,
  NODE_ENV: process.env.NODE_ENV,
  TRACE: process.env.TRACE,
  HOSTNAME: process.env.HOSTNAME,
};

export function getHost(defaultHost) {
  const ROUTE53_URL = process.env.ANCHOR_ROUTE53_URL;
  if (ROUTE53_URL) {
    return ROUTE53_URL;
  }
  return defaultHost;
}
