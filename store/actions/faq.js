import * as types from "./types.js";
import { get, post } from "../../api";
import {
  FAQ_DETAILS,
  GET_PROFESSIONAL_FIELD,
  GET_SINGLE_CERTIFICATE,
  SUBSCRIPTION_LISTING,
  USER_ROLES_ADD_UPDATE,
  USER_ROLES_LIST,
} from "./../../api/routes";
import { ADMIN_API_URL } from "config/index.js";
import { AUTH_API_URL } from "config/index.js";
import { USER_API_URL } from "config/index.js";

export const getFaq = (body) => async (dispatch) => {
  const res = await post(
    { serviceURL: ADMIN_API_URL },
    FAQ_DETAILS,
    false,
    body,
    true
  );

  if (res?.data) {
    dispatch(setFaqInfo(res.data));
    return Promise.resolve(res.data);
  }
  return Promise.reject(res);
};

export const getRoleInfo = (body) => async (dispatch) => {
  const res = await get(
    { serviceURL: USER_API_URL },
    GET_PROFESSIONAL_FIELD,
    false,
    body,
    true
  );

  if (res?.data) {
    dispatch(setRoleInfo(res));
    return Promise.resolve(res);
  }
  return Promise.reject(res);
};

export const addRoleInfo = (body) => async (dispatch) => {
  const res = await post(
    { serviceURL: USER_API_URL },
    USER_ROLES_ADD_UPDATE,
    false,
    body,
    true
  );
  if (res?.data) {
    dispatch(getRoleInfo({ page: 1, pagesize: 100 }));
    return Promise.resolve(res.data);
  }
  return Promise.reject(res);
};
/******************** 
@purpose : set faq Info
@Parameter : { }
@Author : INIC
******************/
export const setFaqInfo = (data) => ({
  type: types.SET_FAQ_INFO,
  data,
});
export const setRoleInfo = (data) => ({
  type: types.SET_ROLE_INFO,
  data,
});

export const getSubscriptionData = (body) => async (dispatch) => {
  const res = await get(
    { serviceURL: ADMIN_API_URL },
    SUBSCRIPTION_LISTING,
    false,
    body,
    true
  );

  if (res?.data) {
    dispatch(setSubscriptionInfo(res.data));
    return Promise.resolve(res.data);
  }
  return Promise.reject(res);
};
/******************** 
@purpose : set subcription Info
@Parameter : { }
@Author : INIC
******************/
export const setSubscriptionInfo = (data) => ({
  type: types.SET_SUBSCRIPTION_LISTING,
  data,
});

/********************************************************
 * Create Redux Action to delete user certification data
 * @author INIC
 * @param {string} id id of certification to delete
 * @param {Function} [cb] callback function
 * @returns {Promise}
 ********************************************************/

export const getCertificate = (body) => async (dispatch) => {
  const res = await post(
    { serviceURL: AUTH_API_URL },
    GET_SINGLE_CERTIFICATE,
    false,
    body,
    true
  );

  if (res?.data) {
    dispatch(setCertiData(res.data));
    return Promise.resolve(res.data);
  }
  return Promise.reject(res);
};

export const setCertiData = (data) => ({
  type: types.SET_CERTIFICATE_INFO,
  data,
});
