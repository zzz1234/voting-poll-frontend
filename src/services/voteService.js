import { BASE_API_URL } from '../constants/apiConstants';
import { getRequest, postRequest } from './baseService';

export const VoteService = (api_body) => {
  const api_url = `${BASE_API_URL}/api/vote`;
  return postRequest(api_url, api_body)
  .then(response => {
    if (response.status === 400) {
      console.log(response);
      throw new Error(response.json());
    }
    return response.json()
  })
  .catch((error) => {
    console.error('Error:', error);
  });
}


export const alreadyVotedService = (user_id, game_id) => {
  const api_url = `${BASE_API_URL}/api/vote/${game_id}/user/${user_id}`;
  return getRequest(api_url)
  .then(response => response.json())
  .then(data => {
    if (data.length === 0) {
      console.log(data)
      return false
    }
    return true
  })
  .catch((error) => {
    console.error('Error:', error);
  });
}