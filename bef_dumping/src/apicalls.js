import { API } from './API';

export const getAccountDtls = async (accountNo) => {
  try {
    var body = {
      accountNo: accountNo
    };
    const res = await API.post("drop/accountDtlsDropDown",
      body,
    );
    return await res.data;
  } catch (e) {
    console.log("error", e);
  }
};


export const addAccountDtls = async (data) => {
  try {
    const res = await API.post("dump/accountDtls",
      data,
    );
    return await res.data;
  } catch (e) {
    console.log("error", e);
  }
};

export const addAppTypeDtls = async (data,route) => {
  try {
    const res = await API.post("dump/"+route,
      data,
    );
    return await res.data;
  } catch (e) {
    console.log("error", e);
  }
};

export const getDropDetails = async (data,route) => {
  try {
    const res = await API.post("drop/"+route,
    data
    );
    return await res.data;
  } catch (e) {
    console.log("error", e);
  }
};
