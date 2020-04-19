import axios from "axios";
const BASE_URL = "http://ec2-3-21-150-112.us-east-2.compute.amazonaws.com:5000";
// const BASE_URL = "https://743ccba7.ngrok.io";

export const API = axios.create({
  baseURL: BASE_URL,
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
});
API.interceptors.request.use(
  function(config) {
    console.log(config);
    return config;
  },
  function(error) {
    return Promise.reject(error);
  }
);

API.interceptors.response.use(
  (response) => {
    console.log(response);
    return response;
  },
  (error) => {
    // console.log(error);
    return Promise.reject(error);
  }
);
