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
 * @return {Boolean}
 */
export function validateEntryUrl(url) {
  const format = new RegExp(`^${escapeRegExp(BASE_URL)}\/[a-zA-Z0-9]+$`);
  return format.test(url);
}
