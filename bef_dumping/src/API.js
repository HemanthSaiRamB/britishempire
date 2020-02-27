import axios from "axios";
const BASE_URL = "https://britishempire.herokuapp.com/";

export const API = axios.create({
  baseURL: BASE_URL,
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    crossdomain: true,
    "Access-Control-Allow-Credentials":true,
    "Access-Control-Allow-Methods":"POST, OPTIONS",
    "Access-Control-Allow-Headers": "X-requested-with, Content-Type"
  }
});
delete axios.defaults.headers.common["X-Requested-With"];
API.interceptors.response.use(
  response => {
    console.log(response);
    return response;
  },
  error => {
    // console.log(error);
    return Promise.reject(error);
  }
);
