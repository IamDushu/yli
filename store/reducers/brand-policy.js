import * as types from "@actions";

/******************* 
@purpose : Intital brand reducer data
@Author : INIC
******************/
const initialState = {
  brandInfo: "",
};

/******************* 
@purpose : Brand policy reducer
@Parameter : {brand_ini_data, action}
@Author : INIC
******************/
const brandPolicy = (brand_ini_data = initialState, action = {}) => {
  switch (action.type) {
    // Set brand information
    case types.SET_BRAND_INFO:
      return Object.assign({}, brand_ini_data, {
        brandInfo: action.data,
      });
    default:
      return brand_ini_data;
  }
};

export default brandPolicy;
