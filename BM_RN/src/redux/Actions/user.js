import * as types from '../actionTypes';
import AsyncStorage from '@react-native-community/async-storage';
import {navigate} from '../../helpers/navigation';
import {API} from '../../helpers/API';
const LOGIN = (email, pswd) =>
  API.post('users/login', {
    email: email,
    password: pswd,
  });
export const loginAction = (email = '', pswd = '', error) => {
  // return dispatch => {
  // dispatch(LOGIN_PENDING());
  LOGIN(email, pswd)
    .then(async res => {
      console.log(res);
      res
        ? res.data
          ? res.data.success === true
            ? loginAct(res.data.token, res.data.usertype, res.data.id)
            : []
          : []
        : [];
    })
    .catch(_err => {
      error('Enter valid credentials');
      // console.log(_err);
      // dispatch(LOGIN_FAILURE('Fill All fields'));
    });
  // };
};
export let logoutAction = async () => {
  await AsyncStorage.clear();
  navigate('Auth', {});
};
let loginAct = async (text,type,id) => {
  await AsyncStorage.setItem('userToken', text);
  await AsyncStorage.setItem('userType', type);
  await AsyncStorage.setItem('userId', id);
  navigate('App', {'type': type});
};
export const registerAction = (data, error) => {
  register(data)
    .then(res => {
      if (res.data.success) {
        navigate('Login', {msg: 'Login To access your account'});
      }
      console.log(res.data);
    })
    .catch(_err => {
      error(_err);
      console.log('err', _err);
    });
};
const register = data => API.post('users/register', data);
