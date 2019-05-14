import { ENV } from '../env';
import { API_HEADERS } from '../utils/api';

const GALLERY_ENDPOINT = '/galleries';

/**
 * Fetch an NH3 gallery based on its slug value, including its user.
 * @param {String} slug The gallery slug
 * @returns {Promise} A promise of a JSON representation of the fetched gallery
 */
export async function getGalleryBySlug(slug, ...include) {
  let url = `${ENV.apiUrl}${GALLERY_ENDPOINT}?filter[slug]=${slug}&include=user`;
  if (include.length > 0) {
    url = `${url}&include=${include.join(',')}`
  }
  let result = await fetch(url, { headers: API_HEADERS });
  result = await result.json();
  return result.data[ 0 ];
}
