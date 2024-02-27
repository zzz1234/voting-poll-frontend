import { BASE_API_URL } from '../constants/apiConstants';
import { getRequest, postRequest } from './baseService';

export const createGame = (formData) => {
  const api_url = `${BASE_API_URL}/api/create-game`;
  return postRequest(api_url, formData, true)
  .then(response => response.json())
  .catch((error) => {
    console.error('Error:', error);
  });
}


export const getGameByCode = (gameCode) => {
    const gameApiUrl = `${BASE_API_URL}/api/game/game-code/` + gameCode;
    return getRequest(gameApiUrl)
    .then(response => response.json());
  }


export const getGameResults = (gameId) => {
  const gameApiUrl = `${BASE_API_URL}/api/game/` + gameId + '/results';
  return getRequest(gameApiUrl)
  .then(response => response.json());
}


export const getGameSummary = (gameId) => {
  const gameApiUrl = `${BASE_API_URL}/api/game/` + gameId + '/summary';
  return getRequest(gameApiUrl)
  .then(response => response.json());
}


export const getGameById = (gameId) => {
  const gameApiUrl = `${BASE_API_URL}/api/game/` + gameId;
  return getRequest(gameApiUrl)
  .then(response => response.json());
}