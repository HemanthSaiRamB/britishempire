import axios from 'axios';
import {BASE_URL} from 'react-native-dotenv';

export const GET = "GET";
export const POST = "POST";
export const DELETE = "DELETE";
export const PATCH = "PATCH";
export const PUT = "PUT";

// AUTH TOKEN
let LOGGED_USER = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type':'application/json'
  }
});


LOGGED_USER.interceptors.request.use(function (config) {
  console.log("Sending Request ::: ",config);
  return config;
});

// Add a response interceptor
LOGGED_USER.interceptors.response.use(
  function (response) {
    // Do something with response data
    console.log("Response ::: ",response);
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);


// NO - AUTH TOKEN.
let NON_USER = axios.create({
  baseURL: BASE_URL,

});


export {LOGGED_USER, NON_USER};
