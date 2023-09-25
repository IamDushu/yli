import * as types from "@actions";

/******************* 
@purpose : Intital cookies reducer data
@Author : INIC
******************/
const initialState = {
  cookiesInfo: "",
};

/******************* 
@purpose : Cookies policy reducer
@Parameter : {cookies_ini_data, action}
@Author : INIC
******************/
const cookiesPolicy = (cookies_ini_data = initialState, action = {}) => {
  switch (action.type) {
    // Set Cookies information
    case types.SET_COOKIES_INFO:
      return Object.assign({}, cookies_ini_data, {
        cookiesInfo: action.data,
      });
    default:
      return cookies_ini_data;
  }
};

export default cookiesPolicy;
