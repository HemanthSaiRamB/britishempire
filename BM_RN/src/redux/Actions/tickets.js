/* eslint-disable prettier/prettier */
import {API} from '../../helpers/API';
import AsyncStorage from '@react-native-community/async-storage';
import Axios from 'axios';

const getAccess = async () => {
  const userToken = await AsyncStorage.getItem('userToken');
  console.log(userToken);
  return JSON.parse(userToken);
};

export const getAccountDtls = async accountNo => {
  try {
    var body = {
      accountNo: accountNo,
    };
    const res = await API.post('drop/accountDtlsDropDown', body, {
      headers: {Authorization: await AsyncStorage.getItem('userToken')},
    });
    return await res.data;
  } catch (e) {
    console.log('error', e);
  }
};

export const getApplianceType = async () => {
  try {
    const res = await API.post('drop/applncDropDown',[],
        {headers: { 'Authorization' : await AsyncStorage.getItem('userToken')},
    });

    return await res.data;
  } catch (e) {
      console.log('error', e);
  }
};

export const getManufacturer = async (applncId) => {
  try {
      var body = {
          'applncId': applncId,
      };
    const res = await API.post('drop/manufDropDown',body,
        {headers: { 'Authorization' : await AsyncStorage.getItem('userToken')},
        });

      return await res.data;
    // console.log('\n 2)Manufacturer: Here\'s the list of Manufacturer', manuf);
    // getModelNo('5dd8ef3f1477bf539f230a11');
  } catch (e) {
      console.log('error');
  }
};

const getModelNo = async (manufId) => {
  try {
      var body = {
          'manufId': manufId,
      };
    const res = await axios.post(
        `${baseurl}/drop/modelNoDropDown`,body,
        {headers: { 'Authorization' : 'Bearer ' + token}}
    );

    const modelNo = res.data;

    console.log('\n 3)modelNos: Here\'s the list of modelNos', modelNo);
    getSerialNo('5dd8ef641477bf539f230a12');
  } catch (e) {
      console.log('error');
  }
};
