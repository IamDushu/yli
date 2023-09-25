import * as types from "@actions";

/******************* 
@purpose : Intital about us reducer data
@Author : INIC
******************/
const initialState = {
  aboutUs: {},
  aboutTeacher: {},
  aboutInstitute: {},
  workwithus: {},
  availableSlots: [],
  cmsStatus: {},
};

/******************* 
@purpose : about us reducer
@Parameter : {testimonial_ini_data, action}
@Author : INIC
******************/
const aboutReducer = (aboutUs_ini_data = initialState, action = {}) => {
  switch (action.type) {
    // Set about us information
    case types.SET_ABOUTUS_INFO:
      return Object.assign({}, aboutUs_ini_data, {
        aboutUs: action.data,
      });
    case types.SET_WELCOME_ROOMS:
      return Object.assign({}, aboutUs_ini_data, {
        availableSlots: action.data,
      });
    case types.SET_ABOUTEACHER_INFO:
      return Object.assign({}, aboutUs_ini_data, {
        aboutTeacher: action.data,
      });
    case types.SET_ABOUT_INSTITUTE_INFO:
      return Object.assign({}, aboutUs_ini_data, {
        aboutInstitute: action.data,
      });
    case types.SET_WORKWITHUS_INFO:
      return Object.assign({}, aboutUs_ini_data, {
        workwithus: action.data,
      });
    case types.SET_CMS_STATUS_LIST:
      return Object.assign({}, aboutUs_ini_data, {
        cmsStatus: action.data,
      });
    default:
      return aboutUs_ini_data;
  }
};

export default aboutReducer;
