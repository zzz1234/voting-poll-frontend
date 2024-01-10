
const api_url = 'http://localhost:8000/api/add-choice';

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