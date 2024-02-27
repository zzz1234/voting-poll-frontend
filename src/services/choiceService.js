import { BASE_API_URL } from '../constants/apiConstants';
import { getRequest, postRequest } from './baseService';

export const addChoice = (api_body) => {
  const api_url = `${BASE_API_URL}/api/add-choice`;
  return postRequest(api_url, api_body)
  .then(response => response.json())
  .catch((error) => {
    console.error('Error:', error);
  });
}


export const getChoicesByGameId = (game_id) => {
  const choiceApiUrl = `${BASE_API_URL}/api/game/` + game_id + '/choices';
  return getRequest(choiceApiUrl)
  .then(response => response.json());
}
