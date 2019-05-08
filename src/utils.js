import { ENV } from './env';

export const BASE_URL = "https://dev2.notrehistoire.ch/entries";

/**
 * Return a RegEx usable version of the given string parameter.
 * @param {String} string The string to escape
 * @return {String} The escaped string
 */
export function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}

/**
 * Test that the user provided URL is valid, comparing it with the BASE_URL.
 * @param {String} url The string to test
 * @param {String} [entryType='media'] The entry type for which the URL should be validated. Defaults to 'media'
 * @return {Boolean}
 */
export function validateEntryUrl(url, entryType = 'media') {
  let pattern;

  const mediaPattern = `^${escapeRegExp(BASE_URL)}\/[a-zA-Z0-9]+$`;

  if (entryType === 'media' ) {
    pattern = mediaPattern;
  }

  const format = new RegExp(pattern);
  return format.test(url);
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
