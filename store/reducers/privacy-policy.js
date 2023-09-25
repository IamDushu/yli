import * as types from "@actions";

/******************* 
@purpose : Intital privacy policy reducer data
@Author : INIC
******************/
const initialState = {
  privacyInfo: "",
};

/******************* 
@purpose : privacy policy reducer
@Parameter : {privacy_ini_data, action}
@Author : INIC
******************/
const privacyPolicy = (privacy_ini_data = initialState, action = {}) => {
  switch (action.type) {
    // Set testimonial information
    case types.SET_PRIVACY_INFO:
      return Object.assign({}, privacy_ini_data, {
        privacyInfo: action.data,
      });
    default:
      return privacy_ini_data;
  }
};

export default privacyPolicy;
