import axios from 'axios';
const BASE_URL = 'https://britishempire.herokuapp.com';

export const API = axios.create({
  baseURL: BASE_URL,
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  },
});
API.interceptors.response.use(
  response => {
    console.log(response);
    return response;
  },
  error => {
    // console.log(error);
    return Promise.reject(error);
  },
);
