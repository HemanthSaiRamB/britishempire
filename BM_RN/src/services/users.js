import { LOGGED_USER as API, POST } from "../API/api";

function loginAction(email, pswd) {
  return API.post("/users/login", {
    email: email,
    password: pswd
  });
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

export { loginAction, registerAction };
