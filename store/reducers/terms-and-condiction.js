import * as types from "@actions";

/******************* 
@purpose : Intital terms and condiction reducer data
@Author : INIC
******************/
const initialState = {
  termsInfo: "",
};

/******************* 
@purpose : terms and condiction reducer
@Parameter : {terms_ini_data, action}
@Author : INIC
******************/
const termscondiction = (terms_ini_data = initialState, action = {}) => {
  switch (action.type) {
    // Set terms and condiction
    case types.SET_TERMS_INFO:
      return Object.assign({}, terms_ini_data, {
        termsInfo: action.data,
      });
    default:
      return terms_ini_data;
  }
};

export default termscondiction;
