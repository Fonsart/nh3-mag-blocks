import uniqWith from 'lodash.uniqwith';

import { ENV } from '../env';

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
 * Removes duplicates from the given array, but keeps all empty items.
 * (This function is used in the on-topic components)
 * @param {Array} array An array of links to filter
 * @returns {Array} The filtered array
 */
export function uniqLink(array) {
  return uniqWith(array, (a, b) => a === b && Boolean(a) && Boolean(b));
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
export function conslog(...args) {
  if (ENV.name === 'development') {
    console.log(...args);
  }
}
