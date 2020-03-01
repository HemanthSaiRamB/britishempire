import { API } from "../../helpers/API";
import AsyncStorage from "@react-native-community/async-storage";
import Axios from "axios";
import EndPoint from "../../API/endpoints";
import { PROPANE, OIL } from "../actionTypes";
const getAccess = async () => {
  const userToken = await AsyncStorage.getItem("userToken");
  console.log(userToken);
  return JSON.parse(userToken);
};

export const getWorkOrder = async (type, state, id) => {
  try {
    let onlyEmp = {
      empId: await AsyncStorage.getItem("userId")
    };
    let withStatus = {
      status: state === 2 ? "completed" : state === 4 ? "todo" : "inpro"
    };

    let empStatus =
      (await AsyncStorage.getItem("userType")) === "emp"
        ? Object.assign(withStatus, onlyEmp)
        : withStatus;
    console.log("emp status", empStatus);
    var body =
      (await AsyncStorage.getItem("userType")) === "emp" ? onlyEmp : {};
    const res = await API.post(
      EndPoint.getWorkOrder + type,
      state === 1 ? body : withStatus,
      {
        headers: { Authorization: await AsyncStorage.getItem("userToken") }
      }
    );
    console.log("getWorkOrder", res.data);
    return await res.data;
  } catch (e) {
    console.log("error", e);
  }
};

export const getSingleWorkOrder = async (type, id) => {
  try {
    let body = {
      _id: id
    };
    const res = await API.post(EndPoint.getWorkOrder + type,body,
      {
        headers: { Authorization: await AsyncStorage.getItem("userToken") }
      }
    );
    console.log("getWorkOrder", res.data);
    return await res.data;
  } catch (e) {
    console.log("error", e);
  }
}

export const getAllEmployees = async type => {
  try {
    var body = {
      usertype: "emp",
      name: type
    };
    const res = await API.post(EndPoint.getAllEmployees, body, {
      headers: { Authorization: await AsyncStorage.getItem("userToken") }
    });
    console.log("getAllEmployees", res.data);
    return await res.data;
  } catch (e) {
    console.log("error", e);
  }
};

export const getCount = async _ => {
  try {
    const body = {
      empId: await AsyncStorage.getItem("userId")
    };
    const res = await API.post(
      EndPoint.dashboardCount,
      (await AsyncStorage.getItem("userType")) === "emp" ? body : {},
      {
        headers: { Authorization: await AsyncStorage.getItem("userToken") }
      }
    );
    console.log("getCountl", res.data);
    return await res.data;
  } catch (e) {
    console.log("error", e);
  }
};

export const getAccountDtls = async (accountNo, id) => {
  try {
    var body = {
      accountNo: accountNo
    };
    var bodyId = {
      cust_id: id
    };
    const res = await API.post(
      "drop/accountDtlsDropDown",
      accountNo !== null ? body : bodyId,
      {
        headers: { Authorization: await AsyncStorage.getItem("userToken") }
      }
    );
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

export const getEmpDetails = async empId => {
  try {
    var body = {
      _id: empId
    };
    const res = await API.post("drop/getEmpDetails", body, {
      headers: { Authorization: await AsyncStorage.getItem("userToken") }
    });
    return await res.data;
  } catch (e) {
    console.log("error");
  }
}

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
    const res = await API.post("drop/currentLevelDropDown", [], {
      headers: { Authorization: await AsyncStorage.getItem("userToken") }
    });
    return await res.data;
  } catch (e) {
    console.log("error");
  }
};

export const getNozzleNo = async () => {
  try {
    const res = await API.post("drop/nozzleNoDropDown", [], {
      headers: { Authorization: await AsyncStorage.getItem("userToken") }
    });
    return await res.data;
  } catch (e) {
    console.log("error");
  }
};

export const submitTicket = async (id, data) => {
  try {
    console.log("RECEIVED DATA: ", data);
    let body = {
      ComprehensivePropaneInspection: {
        ...data,
        date: "1"
      }
    };
    if (id != null) {
      body.ComprehensivePropaneInspection._id = id;
    }
    const res = await API.post("work/propane", body, {
      headers: { Authorization: await AsyncStorage.getItem("userToken") }
    });
    console.log(res);
    return await res.data;
  } catch (e) {
    console.log("error", e);
  }
};
