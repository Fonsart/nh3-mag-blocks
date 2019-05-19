import { getApiHeaders, getPlatformUrl } from '../utils/api';

export const ENTRY_PATH = '/entries';

const DEFAULT_INCLUDE = [ 'media', 'user', 'meta' ];

/**
 * Fetch an NH3 entry based on its hash value, including its media and its user.
 * The platform on which the entry is fetched is determined by the platform param.
 * If necessary, you can pas a mediaType value to filter the entry result.
 * All params value after the third one are used in the `include` GET param. If none provided, the defaults one are used.
 * **Note:** The accepted platform values are the one declared in the `src/env/*.json` file.
 * @param {String} hash The entry hash
 * @param {String} platform The platform id (fr, it or rm)
 * @param {String} mediaType The media type used for filtering the request
 * @param {...Array} include The include to add to the request
 * @returns {Promise} A promise of a JSON representation of the fetched entry
 */
export async function fetchEntryByHash(hash, platform, mediaType = null, ...include) {
  include = include.length > 0 ? include : DEFAULT_INCLUDE;
  const apiUrl = getPlatformUrl(platform);
  let url = `${apiUrl}${ENTRY_PATH}?filter[hash_id]=${hash}&include=${include.join(',')}`;
  if (mediaType !== null) {
    url = `${url}&filter[media_type]=${mediaType}`;
  }
  let result = await fetch(url, { headers: getApiHeaders(platform) });
  result = await result.json();
  return result.data[ 0 ];
}

/**
 * Fetch an NH3 entry based on the ID of its media, including its media and its user.
 * The platform on which the entry is fetched is determined by the platform param.
 * If necessary, you can pas a mediaType value to filter the entry result.
 * All params value after the third one are used in the `include` GET param. If none provided, the defaults one are used.
 * @param {Number} mediaId The entry's media ID
 * @param {String} platform The platform id (fr, it or rm)
 * @param {String} mediaType The media type used for filtering the request
 * @param {...Array} include The include to add to the request
 * @returns {Promise} A promise of a JSON representation of the fetched entry
 */
export async function fetchEntryByMediaId(mediaId, platform, mediaType = null, ...include) {
  include = include.length > 0 ? include : DEFAULT_INCLUDE;
  const apiUrl = getPlatformUrl(platform);
  let url = `${apiUrl}${ENTRY_PATH}?filter[media_id]=${mediaId}&include=${include.join(',')}`;
  if (mediaType !== null) {
    url = `${url}&filter[media_type]=${mediaType}`;
  }
  let result = await fetch(url, { headers: getApiHeaders(platform) });
  result = await result.json();
  return result.data[ 0 ];
}
