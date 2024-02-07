import { BASE_API_URL } from '../constants/apiConstants';

export const getUserByEmail = (userEmail) => {
    const userApiUrl = `${BASE_API_URL}/api/user/user-email/` + userEmail;
    return fetch(userApiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    }).then(response => response.json());
  }


export const createUserByEmail = (userEmail) => {
    const userApiUrl = `${BASE_API_URL}/api/user`;
    return fetch(userApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({user_name: userEmail ,email: userEmail})
    }).then(response => response.json())
    .catch((error) => {
      console.error('Error:', error);
    });
  }


export function getorCreateUserByEmail(userEmail) {
  return getUserByEmail(userEmail)
  .then(user => {
    if (user && user.length > 0) {
      return user;
    } else {
      return createUserByEmail(userEmail);
    }
  });
}