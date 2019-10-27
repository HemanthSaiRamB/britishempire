import * as types from "../actionTypes";
import {loginAction, registerAction, logoutAction} from '../../services/users';
import Storage from './../../app/storage';
function Login(user, pswd) {
  return (dispatch, store) => {
      dispatch(LOGIN_PENDING());
      loginAction(user, pswd)
      .then(res => {
        console.log("ACTon login ::::: ", res);
          dispatch(LOGIN_SUCCESS(res.data));
      })
      .catch((err,status) => {
          dispatch(LOGIN_FAILURE('USER NOT FOUND'));
      }); 
  };
}

function Logout(){
  return (dispatch, store) => {
    logoutAction()
    .then(res => {
      dispatch(LOGOUT());
    })
    .catch(()=> {
      dispatch(SOMETHING_WRONG('UNABLE TO LOGOUT'));
    })
  }
}
let SOMETHING_WRONG = data => ({
  type: types.SOMETHING_WRONG,
  data
});
let LOGIN_SUCCESS = data => {
  if(data.success){
    Storage.setUser(data.token)
  }
  return ({
  type: types.LOGIN_SUCCESS,
  data});

};

let LOGIN_PENDING = _ => ({
  type: types.LOGIN_PENDING
});

let LOGIN_FAILURE = detail => ({
  type: types.LOGIN_FAILURE,
  detail
});

function register(name,
  age,
  mobile,
  email,
  pswd,
  cnfpswd,
  gender,
  userType){
  return (dispatch, store) => {
    dispatch(REGISTER_PENDING());
    registerAction(name,
      age,
      mobile,
      email,
      pswd,
      cnfpswd,
      gender,
      userType)
      .then(res => {
        res ? res.data ? dispatch(REGISTER_SUCCESS(res.data.msg)) : [] : [];
    })
    .catch((err,status) => {
      // console.log('RES ::: ',err.response);
      err ? err.response ? err.response.data ? dispatch(REGISTER_FAILURE(err.response.data.name)) : [] : [] : [];
    });
  }
}

let REGISTER_SUCCESS = data => ({
  type: types.REGISTER_SUCCESS,
  data
});

let REGISTER_PENDING = _ => ({
  type: types.REGISTER_PENDING
});

let REGISTER_FAILURE = detail => ({
  type: types.REGISTER_FAILURE,
  detail
});

export let LOGOUT = _ => ({
  type: 'LOGOUT'
});

export let RESET = _ => ({
  type: 'RESET'
});
export { Login as LoginAct, register as RegisterAct, Logout };
