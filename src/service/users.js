import { ENV } from '../env';
import { API_HEADERS } from '../utils/api';

const USER_ENDPOINT = '/users';

export async function getUserById(userId) {
  let url = `${ENV.apiUrl}${USER_ENDPOINT}/${userId}?include=meta`;
  let result = await fetch(url, { headers: API_HEADERS });
  result = await result.json();
  return result.data;
}

export async function withUser(apiResponse) {
  apiResponse.user = await getUserById(apiResponse.user_id);
  return apiResponse;
}
