import axios from 'axios';
const BASE_URL = 'https://britishempire.herokuapp.com/';
import * as types from '../actionTypes';
import AsyncStorage from '@react-native-community/async-storage';
import {navigate} from '../../helpers/navigation';
const API = axios.create({
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
    console.log(error);
    return Promise.reject(error);
  },
);
const LOGIN = (email, pswd) =>
  API.post('users/login', {
    email: email,
    password: pswd,
  });
export const loginAction = (email = '', pswd = '') => {
  return dispatch => {
    dispatch(LOGIN_PENDING());
    LOGIN(email, pswd)
      .then(async res => {
        console.log(res);
        res
          ? res.data
            ? res.data.success === true
              ? dispatch(LOGIN_SUCCESS(res.data))
              : []
            : []
          : [];
      })
      .then(_err => {
        dispatch(LOGIN_FAILURE('Fill All fields'));
      });
  };
};
let loginAct = async text => {
  await AsyncStorage.setItem('userToken', text);
  navigate('App', {});
};
const LOGIN_PENDING = _ => ({
  type: types.LOGIN_PENDING,
});
const LOGIN_SUCCESS = data => {
  loginAct(data.token);
  return {
    type: types.LOGIN_SUCCESS,
    data,
  };
};
const LOGIN_FAILURE = data => ({
  type: types.LOGIN_FAILURE,
  data,
});
export const registerAction = data => {
  return API.post('users/register', data);
};
