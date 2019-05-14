import { API_HEADERS } from '../utils/api';

const USER_ENDPOINT = '/users';

export async function getUserById(userId) {
  let url = `${ENV.apiUrl}${USER_ENDPOINT}/${userId}?include=meta`;
  let result = await fetch(url, { headers: API_HEADERS });
  result = await result.json();
  return result.data[ 0 ];
}

export async function includeUserMeta(resource) {
  if (resource.user) {
    resource.user = await getUserById(resource.user.id);
  }
  return resource;
}
