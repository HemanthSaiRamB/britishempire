import { API } from "../../helpers/API";
import AsyncStorage from "@react-native-community/async-storage";
import Axios from "axios";

const getAccess = async () => {
  const userToken = await AsyncStorage.getItem("userToken");
  console.log(userToken);
  return JSON.parse(userToken);
};

export const getAccountDtls = async accountNo => {
  try {
    var body = {
      accountNo: accountNo
    };
    const res = await API.post("drop/accountDtlsDropDown", body, {
      headers: { Authorization: await AsyncStorage.getItem("userToken") }
    });
    return await res.data;
  } catch (e) {
    console.log("error", e);
  }
};

export const getApplianceType = async () => {
  try {
    const res = await API.post("drop/applncDropDown", [], {
      headers: { Authorization: await AsyncStorage.getItem("userToken") }
    });

    return await res.data;
  } catch (e) {
    console.log("error", e);
  }
};

export const getManufacturer = async applncId => {
  try {
    var body = {
      applncId: applncId
    };
    const res = await API.post("drop/manufDropDown", body, {
      headers: { Authorization: await AsyncStorage.getItem("userToken") }
    });
    return await res.data;
  } catch (e) {
    console.log("error");
  }
};

export const getModelNo = async manufId => {
  try {
    var body = {
      manufId: manufId
    };
    const res = await API.post("drop/modelNoDropDown", body, {
      headers: { Authorization: await AsyncStorage.getItem("userToken") }
    });
    console.log("data : ", res);
    return await res.data;
  } catch (e) {
    console.log("error");
  }
};

export const getSerialNo = async modelNoId => {
  try {
    var body = {
      modelNoId: modelNoId
    };
    const res = await API.post("drop/serialNoDropDown", body, {
      headers: { Authorization: await AsyncStorage.getItem("userToken") }
    });
    return await res.data;
  } catch (e) {
    console.log("error");
  }
};

export const getFilterSize = async () => {
  try {
    const res = await API.post("drop/airFilterSizeDropDown", [], {
      headers: { Authorization: await AsyncStorage.getItem("userToken") }
    });
    return await res.data;
  } catch (e) {
    console.log("error");
  }
};

export const getCapacity = async () => {
  try {
    const res = await API.post("drop/capacityDropDown", [], {
      headers: { Authorization: await AsyncStorage.getItem("userToken") }
    });
    return await res.data;
  } catch (e) {
    console.log("error");
  }
};

export const getcurrentLevel = async () => {
  try {
    const res = await API.post(`${baseurl}/drop/currentLevelDropDown`, [], {
      headers: { Authorization: await AsyncStorage.getItem("userToken") }
    });
    return await res.data;
  } catch (e) {
    console.log("error");
  }
};

export const submitTicket = async (data) => {
  try {
    console.log("RECEIVED DATA: ",data);
    let body = {
      ComprehensivePropaneInspection:{
      _id: "",
      ...data,
      date: "1"
    }
  };
    const res = await API.post("work/propane", body, {
      headers: { Authorization: await AsyncStorage.getItem("userToken") }
    });
    console.log(res);
    return await res.data;
  } catch (e) {
    console.log("error",e);
  }
}