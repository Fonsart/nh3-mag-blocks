import { __ } from '@wordpress/i18n';

import { fromUrl, escapeRegExp } from '../utils/misc';
import { getEntryByHash } from '../service/entries';
import { getGalleryBySlug } from '../service/galleries';
import { Resource } from '../models/resource';

export const BASE_SITE_URL = 'https://dev2.notrehistoire.ch';
export const MEDIA_BASE_URL = `${BASE_SITE_URL}/entries`;
export const GALLERY_BASE_URL = `${BASE_SITE_URL}/galleries`;

const dataCache = {};

/**
 * Get the promise for the resource targeted by the given URL.
 * This promise could either be fetched from the cache or from the NH3 API.
 * @param {string} url The URL to get the promise for
 * @returns {Promise}
 */
export async function getLinkContentPromise(url) {
  // Return promise from cache if exists and not an error
  if (dataCache[ url ] && !dataCache[ url ].result.error) {
    return dataCache[ url ];
  }

  const data = { url };
  const urlType = parseUrl(url);
  // Get the promise based on the url
  if (urlType.isMedia) {
    data.result = await getEntryByHash(fromUrl(url))
  } else if (urlType.isGallery) {
    data.result = await getGalleryBySlug(fromUrl(url))
  } else {
    data.result = {
      error: __('Invalid URL')
    };
  }

  data.result = filterResourceData(data.result);

  // Set the promise in the cache
  dataCache[ url ] = data;
  return data;
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
  return testPattern('media', url);
}

/**
 * Test that the given URL matches the expected format of a NH3 gallery URL.
 * @param {string} url The URL to test
 * @return {Boolean}
 */
export function isGalleryUrl(url) {
  return testPattern('gallery', url);
}

/**
 * Creates a new Resource object with the given resourceData.
 * If no resourceData, returns null.
 * If resourceData contains an error property, it's returned as it is.
 * @see /src/models/resource.js
 * @param {Object} resourceData An NH3 API response object
 * @returns {Resource|Object|null}
 */
function filterResourceData(resourceData) {
  if (!resourceData) {
    return null;
    // Return the resource if it's an error
  } else if (resourceData.error) {
    return resourceData;
    // If no media_type, let's assume it's a gallery
  } else if (!resourceData.media_type) {
    return new Resource(resourceData.title, resourceData.cover ? resourceData.cover.url : null, resourceData.user, __('Gallery'));
  } else if (resourceData.media_type === 'video') {
    return new Resource(resourceData.title, resourceData.media.thumbnail_url, resourceData.user, __('Video'));
  } else if (resourceData.media_type === 'audio') {
    return new Resource(resourceData.title, resourceData.cover_url, resourceData.user, __('Audio'));
  } else if (resourceData.media_type === 'photo') {
    return new Resource(resourceData.title, resourceData.media.thumbnail_url, resourceData.user, __('Photo'));
  }
}

/**
 * Test an url against a pattern.
 * Add a new property to the internal `patterns` object if needed.
 * @param {string} name Name of the pattern to use
 * @param {string} url Url to test
 * @returns {Boolean}
 */
function testPattern(name, url) {
  const patterns = {
    media: `^${escapeRegExp(MEDIA_BASE_URL)}\/[a-zA-Z0-9]+$`,
    gallery: `^${escapeRegExp(GALLERY_BASE_URL)}\/[a-z0-9]+(?:-[a-z0-9]+)*$`
  };

  if (patterns[ name ]) {
    const pattern = new RegExp(patterns[ name ]);
    return pattern.test(url);
  }
}
