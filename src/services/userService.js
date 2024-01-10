
export const getUserByEmail = (userEmail) => {
    const userApiUrl = 'http://localhost:8000/api/user/user-email/' + userEmail;
    return fetch(userApiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    }).then(response => response.json());
  }