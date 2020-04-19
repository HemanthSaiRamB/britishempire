import axios from "axios";
// const BASE_URL = "https://d5ac3e21.ngrok.io/";
// const BASE_URL = "https://britishempire.herokuapp.com/";
const BASE_URL = "http://ec2-3-21-150-112.us-east-2.compute.amazonaws.com:5000";

export const API = axios.create({
  baseURL: BASE_URL,
  method: "GET",

  headers: {
    'Access-Control-Allow-Origin': '*',
  }
});
delete axios.defaults.headers.common["X-Requested-With"];
axios.defaults.headers.post['Content-Type'] ='application/x-www-form-urlencoded';

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
