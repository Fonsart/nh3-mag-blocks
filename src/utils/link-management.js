import { __ } from '@wordpress/i18n';

import { ENV } from '../env';
import { conslog, fromUrl, escapeRegExp } from '../utils/misc';
import { fetchEntryByHash, ENTRY_PATH } from '../service/entries';
import { fetchGalleryBySlug, GALLERY_PATH } from '../service/galleries';
import { fetchUserById } from '../service/users';
import * as Links from '../models/resources';

const dataCache = {};

/**
 * Get the promise for the resource targeted by the given URL.
 * This promise could either be fetched from the cache or from the NH3 API.
 * @param {string} url The URL to get the promise for
 * @returns {Promise}
 */
export async function getLinkContentPromise(url) {
  // Return promise from cache if exists and not an error
  if (dataCache[ url ]) {
    return dataCache[ url ];
  }

  const data = { url };
  const urlProps = parseUrl(url);

  if (urlProps.type === Links.MEDIA_TYPE) {
    data.resource = await fetchEntryByHash(fromUrl(url), urlProps.platform, null, 'media', 'meta');
  } else if (urlProps.type === Links.GALLERY_TYPE) {
    data.resource = await fetchGalleryBySlug(fromUrl(url), urlProps.platform);
  } else {
    data.resource = {
      error: __('is not a valid URL')
    };
  }

  // If there is a resource that contains a user id, fetch this user
  if (data.resource && data.resource.user_id) {
    data.resource.user = await fetchUserById(data.resource.user_id, urlProps.platform);
  }

  // Set the promise in the cache only if there is a resource and it's not an error
  if (data.resource && !data.resource.error) {
    data.resource = filterResourceData(data.resource);
    data.resource.platform = urlProps.platform;
    dataCache[ url ] = data;
  }

  conslog('[Link Management - getLinkContentPromise]', data);

  return data;
}

/**
 * Parse the given URL in order to guess the type of resource and the platform it targets.
 * Returns an object with two properties, `type` and `platform` that contains those information.
 *
 * Example of returned object:
 * ```json
 * {
 *  "type": "media",
 *  "platform": "fr"
 * }
 * ```
 * Returns and empty object if the given URL does not match any known resource URL or platform URL.
 *
 * @param {string} url The URL to test
 * @returns {Object|null} A result object or `null` if the URL could not be parsed.
 */
export function parseUrl(url) {
  const result = {};

  // Guess platform
  for (const key in ENV.config) {
    // Skip platform testing if one already found
    if (!result.platform && ENV.config.hasOwnProperty(key)) {
      const pattern = new RegExp(`^${escapeRegExp(ENV.config[ key ].siteUrl)}`);
      if (pattern.test(url)) {
        result.platform = key;
      }
    }
  }

  // Only Guess type if platform has been found
  if (result.platform) {
    if (new RegExp(`${ENTRY_PATH}\/[a-zA-Z0-9]+$`).test(url)) {
      result.type = Links.MEDIA_TYPE;
    } else if (new RegExp(`${GALLERY_PATH}\/[a-z0-9]+(?:-[a-z0-9]+)*$`).test(url)) {
      result.type = Links.GALLERY_TYPE;
    }
  }

  return result;
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
  conslog('[Link Management - filterResourceData]', resourceData);
  if (resourceData.type === Links.STORY_TYPE) {
    return new Links.ResourceStory(resourceData);
    // If no media_type, let's assume it's a gallery
  } else if (!resourceData.media_type) {
    return new Links.ResourceGallery(resourceData);
  } else if (resourceData.media_type === Links.VIDEO_TYPE) {
    return new Links.ResourceVideo(resourceData);
  } else if (resourceData.media_type === Links.AUDIO_TYPE) {
    return new Links.ResourceAudio(resourceData);
  } else if (resourceData.media_type === Links.PHOTO_TYPE) {
    return new Links.ResourcePhoto(resourceData);
  }
}
