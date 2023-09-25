import * as types from "./types.js";
import { post } from "../../api";
import { STUDENT_FEEDBACK, TESTIMONIAL_DETAILS } from "./../../api/routes";
import { ADMIN_API_URL } from "config/index.js";
import { USER_API_URL } from "config/index.js";

export const getTestimonialInfo = (body) => async (dispatch) => {
  const res = await post(
    { serviceURL: ADMIN_API_URL },
    TESTIMONIAL_DETAILS,
    false,
    body,
    true
  );

  if (res?.data) {
    dispatch(setTestimonialInfo(res.data));
    return Promise.resolve(res.data);
  }
  return Promise.reject(res);
};
/******************** 
@purpose : set Testmonial Info
@Parameter : { }
@Author : INIC
******************/
export const setTestimonialInfo = (data) => ({
  type: types.SET_TESTIMONIAL_INFO,
  data,
});

export const getStudentInfo = (body) => async (dispatch) => {
  const res = await post(
    { serviceURL: USER_API_URL },
    STUDENT_FEEDBACK,
    false,
    body,
    true
  );

  if (res?.data) {
    dispatch(setStudentInfo(res.data));
    return Promise.resolve(res.data);
  }
  return Promise.reject(res);
};
/******************** 
@purpose : set Testmonial Info
@Parameter : { }
@Author : INIC
******************/
export const setStudentInfo = (data) => ({
  type: types.SET_STUDENT_FEEDBACK,
  data,
});
