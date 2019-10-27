import AsyncStorage from '@react-native-community/async-storage';
const AUTH_TOKEN = "USER";

class Storage {
  static getUser() {
    let data = AsyncStorage.getItem(AUTH_TOKEN);
    console.log("DATA :: ", data);
    return data === null;
  }

  static setUser(val) {
    AsyncStorage.setItem(AUTH_TOKEN, JSON.stringify(val));
  }
  static resetUser() {
    AsyncStorage.removeItem(AUTH_TOKEN);
  }
}

export default Storage;
