import * as types from "@actions";

/******************* 
@purpose : Intital faq reducer data
@Author : INIC
******************/
const initialState = {
  faq: [],
  userRole: [],
  subscription: [],
  viewCertificate: {},
};

/******************* 
@purpose : faq reducer
@Parameter : {faq_ini_data, action}
@Author : INIC
******************/
const faqReducer = (faq_ini_data = initialState, action = {}) => {
  switch (action.type) {
    // Set faq information
    case types.SET_FAQ_INFO:
      return Object.assign({}, faq_ini_data, {
        faq: action.data,
      });
    case types.SET_ROLE_INFO:
      return Object.assign({}, faq_ini_data, {
        userRole: action.data,
      });
    case types.SET_SUBSCRIPTION_LISTING:
      return Object.assign({}, faq_ini_data, {
        subscription: action.data,
      });
    case types.SET_CERTIFICATE_INFO:
      return Object.assign({}, faq_ini_data, {
        viewCertificate: action.data,
      });
    default:
      return faq_ini_data;
  }
};

export default faqReducer;
