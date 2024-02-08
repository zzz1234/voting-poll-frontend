import { BASE_API_URL } from '../constants/apiConstants';

const api_url = `${BASE_API_URL}/api/add-choice`;

export const addChoice = (api_body) => {
  return fetch(api_url, {
    method: 'POST',
    body: JSON.stringify(api_body),
    headers: {
      'Content-Type': 'application/json'
    },
  })
  .then(response => response.json())
  .catch((error) => {
    console.error('Error:', error);
  });
}


export const getChoicesByGameId = (game_id) => {
  const choiceApiUrl = `${BASE_API_URL}/api/game/` + game_id + '/choices';
  return fetch(choiceApiUrl, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
  }).then(response => response.json());
}
