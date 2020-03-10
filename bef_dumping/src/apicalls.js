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
