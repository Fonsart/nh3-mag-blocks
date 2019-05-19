import { getApiHeaders, getPlatformUrl } from '../utils/api';

export const USER_PATH = '/users';

/**
 * Fetch an NH3 user based on its id, including its media.
 * The platform on which the user is fetched is determined by the platform param.
 * **Note:** The accepted platform values are the one declared in the `src/env/*.json` file.
 * @param {String} hash The entry hash
 * @param {String} platform The platform id (fr, it or rm)
 * @returns {Promise} A promise of a JSON representation of the fetched user
 */
export async function fetchUserById(userId, platform) {
  const apiUrl = getPlatformUrl(platform);
  let url = `${apiUrl}${USER_PATH}/${userId}?include=meta`;
  let result = await fetch(url, { headers: getApiHeaders(platform) });
  result = await result.json();
  return result.data;
}
