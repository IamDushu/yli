import * as types from "@actions";

/******************* 
@purpose : Intital testimonial reducer data
@Author : INIC
******************/
const initialState = {
  testimonialInfo: "",
  feedbackData: [],
};

/******************* 
@purpose : testimonial reducer
@Parameter : {testimonial_ini_data, action}
@Author : INIC
******************/
const testimonial = (testimonial_ini_data = initialState, action = {}) => {
  switch (action.type) {
    // Set testimonial information
    case types.SET_TESTIMONIAL_INFO:
      return Object.assign({}, testimonial_ini_data, {
        testimonialInfo: action.data,
      });
    case types.SET_STUDENT_FEEDBACK:
      return Object.assign({}, testimonial_ini_data, {
        feedbackData: action.data,
      });
    default:
      return testimonial_ini_data;
  }
};

export default testimonial;
