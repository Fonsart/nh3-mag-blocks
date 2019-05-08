import { ENV } from '../env';

// Required headers for all requests.
const headers = (() => {
  var defaultHeaders = new Headers();
  defaultHeaders.append("Authorization", `Bearer ${ENV.apiToken}`);
  return defaultHeaders;
})();

const API_ENDPOINT = '/entries';

/**
 * Fetch an NH3 entry based on its hash value, including its media and its user.
 * @param {String} hash The entry hash
 * @returns {Promise} A promise of a JSON representation of the fetched entry
 */
export async function getEntryByHash(hash, mediaType = null) {
  let url = `${ENV.apiUrl}${API_ENDPOINT}?filter[hash_id]=${hash}&include=media,user`;
  if (mediaType !== null) {
    url = `${url}&filter[media_type]=${mediaType}`;
  }
  let result = await fetch(url, { headers });
  result = await result.json();
  return result.data[ 0 ];
}

/**
 * Fetch an NH3 entry based on the ID of its media, including its media and its user.
 * @param {Number} mediaId The entry's media ID
 * @returns {Promise} A promise of a JSON representation of the fetched entry
 */
export async function getEntryByMediaId(mediaId, mediaType = null) {
  let url = `${ENV.apiUrl}${API_ENDPOINT}?filter[media_id]=${mediaId}&include=media,user`;
  if (mediaType !== null) {
    url = `${url}&filter[media_type]=${mediaType}`;
  }
  let result = await fetch(url, { headers });
  result = await result.json();
  return result.data[ 0 ];
}
