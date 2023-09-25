import * as types from "./types.js";
import { get, post } from "../../api";
import {
  ABOUT_INSTITUTE,
  ABOUT_TEACHER,
  ABOUT_US,
  AVAILABLE_SLOTS,
  BOOK_SLOTS,
  CMS_LIST_STATUS,
  GET_OTHER_PROFILE,
  WORK_WITH_US,
} from "./../../api/routes";
import { ADMIN_API_URL } from "config/index.js";
import { USER_API_URL } from "config/index.js";
import { showMessageNotification } from "utils/functions.js";

export const aboutUsInfo = (data) => async (dispatch) => {
  const res = await get(
    { serviceURL: ADMIN_API_URL },
    `${ABOUT_US}?cmsType=${data.cmsType}&language=${data.language}`,
    false,
    "",
    true
  );

  if (res) {
    dispatch(aboutUsData(res.data));
    return Promise.resolve(res.data);
  }
  return Promise.reject(res);
};

/******************** 
@purpose : set about us Info
@Parameter : { }
@Author : INIC
******************/
export const aboutUsData = (data) => ({
  type: types.SET_ABOUTUS_INFO,
  data,
});

export const workWithUsInfo = () => async (dispatch) => {
  const res = await get(
    { serviceURL: ADMIN_API_URL },
    WORK_WITH_US,
    false,
    "",
    true
  );

  if (res) {
    dispatch(workWithUsData(res.data));
    return Promise.resolve(res.data);
  }
  return Promise.reject(res);
};

/******************** 
@purpose : set about us Info
@Parameter : { }
@Author : INIC
******************/
export const workWithUsData = (data) => ({
  type: types.SET_WORKWITHUS_INFO,
  data,
});

export const getOtherProfileInfo = (id) => async () => {
  const res = await get(
    { serviceURL: USER_API_URL },
    GET_OTHER_PROFILE + id,
    false,
    "",
    true
  );

  if (res) {
    return Promise.resolve(res.data);
  }
  return Promise.reject(res);
};

export const aboutTeacherInfo = (id) => async (dispatch) => {
  const res = await get(
    { serviceURL: USER_API_URL },
    ABOUT_TEACHER + id,
    false,
    "",
    true
  );

  if (res) {
    dispatch(aboutTeacherData(res.data));
    return Promise.resolve(res.data);
  }
  return Promise.reject(res);
};

/******************** 
@purpose : set about us Info
@Parameter : { }
@Author : INIC
******************/
export const aboutTeacherData = (data) => ({
  type: types.SET_ABOUTEACHER_INFO,
  data,
});

export const getInstituteInfo = (id) => async (dispatch) => {
  const res = await get(
    { serviceURL: USER_API_URL },
    ABOUT_INSTITUTE + id,
    false,
    "",
    true
  );

  if (res) {
    dispatch(setInstituteInfo(res.data));
    return Promise.resolve(res.data);
  }
  return Promise.reject(res);
};

/******************** 
@purpose : set about us Info
@Parameter : { }
@Author : INIC
******************/
export const setInstituteInfo = (data) => ({
  type: types.SET_ABOUT_INSTITUTE_INFO,
  data,
});
/******************** 
@purpose : get welcome details
@Parameter : { }
@Author : INIC
******************/
export const getWelcomeDetails = () => async (dispatch) => {
  const res = await get(
    { serviceURL: USER_API_URL },
    AVAILABLE_SLOTS,
    false,
    "",
    true
  );

  if (res) {
    dispatch(setWelcomeDetails(res.data));
    return Promise.resolve(res.data);
  }
  return Promise.reject(res);
};

/******************** 
@purpose : set welcome details
@Parameter : { }
@Author : INIC
******************/
export const setWelcomeDetails = (data) => ({
  type: types.SET_WELCOME_ROOMS,
  data,
});

/******************** 
@purpose : get book slots
@Parameter : { }
@Author : INIC
******************/
export const bookSlotDetails = (body) => async (dispatch) => {
  const res = await post(
    { serviceURL: USER_API_URL },
    BOOK_SLOTS,
    false,
    body,
    true
  );

  if (res) {
    showMessageNotification(res.message);
    return Promise.resolve(res.data);
  }
  return Promise.reject(res);
};

/******************** 
@purpose : get welcome details
@Parameter : { }
@Author : INIC
******************/
export const cmsListStatus = (body) => async (dispatch) => {
  const res = await post(
    { serviceURL: ADMIN_API_URL },
    CMS_LIST_STATUS,
    false,
    body,
    true
  );

  if (res) {
    dispatch(setCmsListStatus(res.data));
    return Promise.resolve(res.data);
  }
  return Promise.reject(res);
};

/******************** 
@purpose : set welcome details
@Parameter : { }
@Author : INIC
******************/
export const setCmsListStatus = (data) => ({
  type: types.SET_CMS_STATUS_LIST,
  data,
});
