import { LOGGED_USER as API, POST } from "../API/api";
import { StackActions, NavigationActions } from 'react-navigation';

import Storage from './../app/storage';
function loginAction(email, pswd) {
  console.log("LOGIN Data ::::: ", email, pswd);
  return API.post("/users/login", {
    "email": email,
    "password": pswd
  });
}

export const resetAction = StackActions.reset({
  index: 0,
  actions: [NavigationActions.navigate({ routeName: 'Login' })],
});

function logoutAction(){
 Storage.resetUser();
  // return API.post("/users/logout");
}
function registerAction(
  name,
  age,
  mobile,
  email,
  pswd,
  cnfpswd,
  gender,
  userType
) {
  return API.post("/users/register", {
      "name": name,
      "age": age,
      "gender": gender,
      "mobilenumber": mobile,
      "email": email,
      "password": pswd,
      "cnfpwd": cnfpswd,
      "usertype": userType
  });
}

export { loginAction, registerAction, logoutAction };
