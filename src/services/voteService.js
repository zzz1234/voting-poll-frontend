
const api_url = 'http://localhost:8000/api/vote';

export const VoteService = (api_body) => {
  return fetch(api_url, {
    method: 'POST',
    body: JSON.stringify(api_body),
    headers: {
      'Content-Type': 'application/json'
    },
  })
  .then(response => {
    if (response.status === 400) {
      throw new Error(response.json());
    }
    return response.json()
  })
  .catch((error) => {
    console.error('Error:', error);
  });
}


export const alreadyVotedService = (user_id, game_id) => {
  return fetch(api_url + '/' + game_id + '/user/' + user_id, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
  })
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