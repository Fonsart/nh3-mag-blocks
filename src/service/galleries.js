import { ENV } from '../env';

const GALLERY_ENDPOINT = '/galleries';

export async function getGalleryBySlug(slug) {
  let url = `${ENV.apiUrl}${GALLERY_ENDPOINT}?filter[slug]=${slug}&include=user`;
  let result = await fetch(url, { headers: API_HEADERS });
  console.log(result);
  result = await result.json();
  return result.data[ 0 ];
}
