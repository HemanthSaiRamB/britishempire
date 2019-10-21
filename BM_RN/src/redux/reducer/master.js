import * as INIT_STATE from './../store';
import * as types from '../actionTypes';

const master = (store = INIT_STATE, action) => {
  switch (action.type) {
    case types.LOGIN_SUCCESS:
      return {
        type: action.type,
        detail: action.data
      }
    case types.LOGIN_FAILURE:
      return {
        type: action.type,
        detail: action.detail
      }
    case types.LOGIN_PENDING:
      return {
        ...store,
        type: action.type
      }
    case types.REGISTER_PENDING:
      return {
        ...store,
        type: action.type
      }
    case types.REGISTER_SUCCESS:
      return {
        type: action.type,
        detail: action.data
      }
    case types.REGISTER_FAILURE:
        return {
          type: action.type,
          detail: action.detail
        }
    default:
      return store;
  }
};

export default master;
