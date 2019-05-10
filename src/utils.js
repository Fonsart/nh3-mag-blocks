import { ENV } from './env';

export const BASE_SITE_URL = 'https://dev2.notrehistoire.ch';
export const MEDIA_BASE_URL = `${BASE_SITE_URL}/entries`;
export const GALLERY_BASE_URL = `${BASE_SITE_URL}/galleries`;

/**
 * Required headers for all requests.
 */
export const API_HEADERS = (() => {
  var defaultHeaders = new Headers();
  defaultHeaders.append("Authorization", `Bearer ${ENV.apiToken}`);
  return defaultHeaders;
})();

/**
 * Returns the id part of an NH3 URL
 * (which should be the last part of the given URL)
 * @param {string} url An NH3 URL
 * @returns {string} The resource id
 */
export function fromUrl(url) {
  return url.split('/').pop();
}

/**
 * Return a RegEx usable version of the given string parameter.
 * @param {String} string The string to escape
 * @return {String} The escaped string
 */
export function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}

/**
 * A wrapper around console.log that logs only in development environment
 * @param  {...any} args The values to print to the console
 */
export function print(...args) {
  if (ENV.name === 'development') {
    console.log(...args);
  }
}

/**
 * Analyzes the given URL against each expected URL.
 * Returns an object where each property is a boolean indicating if the URL is of the specified type:
 *
 * Example:
 * ```js
 * const URL = "https://dev2.notrehistoire.ch/entries/Testing"
 * const urlType = parseUrl(URL);
 * console.log(urlType.isMedia); // false
 * console.log(urlType.isGalleryUrl); // true
 * ```
 *
 * @param {string} url The URL to test
 * @returns {Object} A type object
 */
export function parseUrl(url) {
  return {
    isMedia: isMediaUrl(url),
    isGallery: isGalleryUrl(url)
  }
}

/**
 * Test that the given URL matches the expected format of a NH3 media URL.
 * @param {string} url The URL to test
 * @return {Boolean}
 */
export function isMediaUrl(url) {
  const pattern = new RegExp(`^${escapeRegExp(MEDIA_BASE_URL)}\/[a-zA-Z0-9]+$`);
  return pattern.test(url);
}

export function isGalleryUrl(url) {
  // Slug validation Regex courtesy of https://www.regextester.com/96861
  const pattern = new RegExp(`^${escapeRegExp(GALLERY_BASE_URL)}\/[a-z0-9]+(?:-[a-z0-9]+)*$`);
  return pattern.test(url);
}
