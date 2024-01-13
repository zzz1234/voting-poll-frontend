
export const createGame = (formData) => {
  const api_url = 'http://localhost:8000/api/create-game';
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
    const gameApiUrl = 'http://localhost:8000/api/game/game-code/' + gameCode;
    return fetch(gameApiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    }).then(response => response.json());
  }
  