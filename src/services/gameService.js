import { BASE_API_URL } from '../constants/apiConstants';

export const createGame = (formData) => {
  const api_url = `${BASE_API_URL}/api/create-game`;
  return fetch(api_url, {
    method: 'POST',
    body: JSON.stringify(formData),
    headers: {
      'Content-Type': 'application/json'
    },
  })
  .then(response => response.json())
  .catch((error) => {
    console.error('Error:', error);
  });
}


export const getGameByCode = (gameCode) => {
    const gameApiUrl = `${BASE_API_URL}/api/game/game-code/` + gameCode;
    return fetch(gameApiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    }).then(response => response.json());
  }


export const getGameResults = (gameId) => {
  const gameApiUrl = `${BASE_API_URL}/api/game/` + gameId + '/results';
  return fetch(gameApiUrl, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
  }).then(response => response.json());
}


export const getGameSummary = (gameId) => {
  const gameApiUrl = `${BASE_API_URL}/api/game/` + gameId + '/summary';
  return fetch(gameApiUrl, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
  }).then(response => response.json());
}