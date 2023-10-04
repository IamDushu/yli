import * as types from "@actions";

/******************* 
@purpose : Intital cookies reducer data
@Author : INIC
******************/
const initialState = {
  startedDetails: "",
};

/******************* 
@purpose : Cookies policy reducer
@Parameter : {cookies_ini_data, action}
@Author : INIC
******************/
const startedDetails = (started_ini_data = initialState, action = {}) => {
  switch (action.type) {
    // Set Cookies information
    case types.SET_STARTED_DETAILS:
      return Object.assign({}, started_ini_data, {
        startedDetails: action.data,
      });
    default:
      return started_ini_data;
  }
};

export default startedDetails;
