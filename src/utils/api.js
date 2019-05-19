import { ENV } from '../env';
/**
 * Required headers for all requests.
 * The requested apiToken is retrieved from the env.json file,
 * for the given platformId.
 * @param {String} platformId The targeted platform
 * @returns {Headers}
 */
export function getApiHeaders(platformId) {
  var defaultHeaders = new Headers();
  defaultHeaders.append("Authorization", `Bearer ${ENV.config[platformId].apiToken}`);
  return defaultHeaders;
}

/**
 * Returns the apiUrl for the given platform.
 * This URL is formed of the siteUrl and the apiPath fetched from the ENV file.
 * @param {String} platformId The targeted platform
 * @returns {String}
 */
export function getPlatformUrl(platformId) {
  if (!ENV.config.hasOwnProperty(platformId)) {
    throw new TypeError(`No ${platform} defined in the src/env/${ENV.name}.json file`);
  }
  return `${ENV.config[platformId].siteUrl}${ENV.config[platformId].apiPath}`;
}
