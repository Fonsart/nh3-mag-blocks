import { ENV } from '../env';
import { API_HEADERS } from '../utils/api';

const ENTRY_ENDPOINT = '/entries';

const DEFAULT_INCLUDE = [ 'media', 'user', 'meta' ];

/**
 * Fetch an NH3 entry based on its hash value, including its media and its user.
 * @param {String} hash The entry hash
 * @returns {Promise} A promise of a JSON representation of the fetched entry
 */
export async function getEntryByHash(hash, mediaType = null, ...include) {
  include = include.length > 0 ? include : DEFAULT_INCLUDE;
  let url = `${ENV.apiUrl}${ENTRY_ENDPOINT}?filter[hash_id]=${hash}&include=${include.join(',')}`;
  if (mediaType !== null) {
    url = `${url}&filter[media_type]=${mediaType}`;
  }
  let result = await fetch(url, { headers: API_HEADERS });
  result = await result.json();
  return result.data[ 0 ];
}

/**
 * Fetch an NH3 entry based on the ID of its media, including its media and its user.
 * @param {Number} mediaId The entry's media ID
 * @returns {Promise} A promise of a JSON representation of the fetched entry
 */
export async function getEntryByMediaId(mediaId, mediaType = null, ...include) {
  include = include.length > 0 ? include : DEFAULT_INCLUDE;
  let url = `${ENV.apiUrl}${ENTRY_ENDPOINT}?filter[media_id]=${mediaId}&include=${include.join(',')}`;
  if (mediaType !== null) {
    url = `${url}&filter[media_type]=${mediaType}`;
  }
  let result = await fetch(url, { headers: API_HEADERS });
  result = await result.json();
  return result.data[ 0 ];
}
