import AsyncStorage from '@react-native-community/async-storage';
const AUTH_TOKEN = "USER";

class Storage {
  static _getStorageValue = async _ => {
    var value = "";
    await AsyncStorage.getItem(AUTH_TOKEN)
    .then(res => {
      console.log("DATAAAA : ", res);
      value = res;
    })
    .catch(err => {
      value = err;
    });
    return value;
  }
  static getUser() { 
    let data = Storage._getStorageValue();
    console.log("Async Data : ",data);

    return data !== null ? true : false;
  }

  static setUser(val) {
    AsyncStorage.setItem(AUTH_TOKEN, JSON.stringify(val));
  }
  static resetUser() {
    AsyncStorage.removeItem(AUTH_TOKEN);
  }
}

export default Storage;
