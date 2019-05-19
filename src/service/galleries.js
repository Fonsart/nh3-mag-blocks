import { getApiHeaders, getPlatformUrl } from '../utils/api';

export const GALLERY_PATH = '/galleries';

const DEFAULT_INCLUDE = [ 'user' ];

/**
 * Fetch an NH3 gallery based on its slug value, including its user.
 * The platform on which the gallery is fetched is determined by the platform param.
 * All params value after the third one are used in the `include` GET param. If none provided, the defaults one are used.
 * **Note:** The accepted platform values are the one declared in the `src/env/*.json` file.
 * @param {String} slug The gallery slug
 * @param {String} platform The platform id (fr, it or rm)
 * @param {...Array} include The include to add to the request
 * @returns {Promise} A promise of a JSON representation of the fetched gallery
 */
export async function fetchGalleryBySlug(slug, platform, ...include) {
  include = include.length > 0 ? include : DEFAULT_INCLUDE;
  const apiUrl = getPlatformUrl(platform);
  let url = `${apiUrl}${GALLERY_PATH}?filter[slug]=${slug}&include=${include.join(',')}`;
  let result = await fetch(url, { headers: getApiHeaders(platform) });
  result = await result.json();
  return result.data[ 0 ];
}
