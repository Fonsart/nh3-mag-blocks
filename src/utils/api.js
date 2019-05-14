import { ENV } from '../env';
/**
 * Required headers for all requests.
 */
export const API_HEADERS = (() => {
  var defaultHeaders = new Headers();
  defaultHeaders.append("Authorization", `Bearer ${ENV.apiToken}`);
  return defaultHeaders;
})();
