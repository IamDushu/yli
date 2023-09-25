import * as types from "@actions";

/******************* 
@purpose : Intital communication reducer data
@Author : INIC
******************/
const initialState = {
  communication: {},
};

/******************* 
@purpose : communication reducer
@Parameter : {communication_ini_data, action}
@Author : INIC
******************/
const communication = (state = initialState, action = {}) => {
  switch (action.type) {
    case types.GET_COMMUNICATION:
      return Object.assign({}, state, {
        communication: action.data,
      });
    default:
      return state;
  }
};

export default communication;
