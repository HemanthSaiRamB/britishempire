import { store } from "./store";
import * as types from "./actionTypes";
export const masterReducer = (state = store, action) => {
  switch (action.type) {
    case types.PROPANE:
      return {
        ...state,
        propane: {
          ComprehensivePropaneInspection: {
            ...action.data
          }
        }
      };
    case types.OIL:
      return {
        ...state,
        oil: {
          ComprehensiveOilInspection: {
            ...action.data
          }
        }
      };
    case types.LOGIN_PENDING:
      return {
        ...state,
        LOGIN_STATUS: "PENDING"
      };
    case types.LOGIN_SUCCESS:
      return {
        ...state,
        LOGIN_STATUS: "SUCCESS",
        token: action.data
      };
    case types.LOGIN_FAILURE:
      return {
        ...state,
        LOGIN_STATUS: "FAILURE",
        msg: action.data
      };
    case types.REGISTER_PENDING:
      return {
        ...state,
        REGISTER_STATUS: "PENDING"
      };
    case types.REGISTER_SUCCESS:
      return {
        ...state,
        REGISTER_STATUS: "SUCCESS",
        token: action.data
      };
    case types.REGISTER_FAILURE:
      return {
        ...state,
        REGISTER_STATUS: "FAILURE",
        msg: action.data
      };
    default:
      return state;
  }
};
