import { BASE_API_URL } from '../constants/apiConstants';
import { getRequest, postRequest } from './baseService';

export const getUserByEmail = (userEmail) => {
    const userApiUrl = `${BASE_API_URL}/api/user/user-email/` + userEmail;
    return getRequest(userApiUrl)
    .then(response => response.json());
  }


export const createUserByEmail = (userEmail) => {
    const userApiUrl = `${BASE_API_URL}/api/user`;
    const formData = {user_name: userEmail ,email: userEmail}
    return postRequest(userApiUrl, formData)
    .then(response => response.json())
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


export const createUserByEmailAndPassword = (userEmail, password) => {
  const userApiUrl = `${BASE_API_URL}/api/signup`;
  const formData = {user: userEmail ,email: userEmail, password: password}
  return postRequest(userApiUrl, formData, false)
  .then(response => response.json())
  .catch((error) => {
    console.error('Error:', error);
  });
}


export const login = (userEmail, password) => {
  const userApiUrl = `${BASE_API_URL}/api/login`;
  const formData = {email: userEmail, password: password}
  return postRequest(userApiUrl, formData, false)
  .then(response =>  response.json())
  .then(data => {
      if (data && data.access) {
        localStorage.setItem('access_token', JSON.stringify(data.access));
        localStorage.setItem('refresh_token', JSON.stringify(data.refresh));
        return data;
      }
      else {
        console.log("Data not found");
      }
    })
  .catch((error) => {
    console.error('Error:', error);
  });
}


export const logout = () => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
  const userApiUrl = `${BASE_API_URL}/api/logout`;
  return getRequest(userApiUrl);
}
