import { PLAN_JOIN, PLAN_LIST, UNSUBSCRIBE_PLAN } from "../../api/routes";
import { PAYMENT_API_URL } from "../../config";
import { SET_PLAN_DATA } from "./types";
import { get, post } from "../../api";
import { UPDATE_CURRENT_USER_INFO } from ".";
import { getUserProfileData } from "./user";
import { showMessageNotification } from "utils";

/********************************************************
 * Create Redux Action to set plans data
 * @author INIC
 * @param {Function} [cb] callback function
 * @returns {Promise}
 ********************************************************/
export const setPlans = (cb) => async (dispatch) => {
  const response = await get(
    { serviceURL: PAYMENT_API_URL },
    PLAN_LIST,
    false,
    {},
    true
  );
  if (response.status === 1) {
    dispatch({ type: SET_PLAN_DATA, payload: response.data });
    if (typeof cb === "function") cb();

    return Promise.resolve(response.data);
  } else {
    return Promise.reject(response);
  }
};
/********************************************************
 * Create Redux Action to join plans
 * @author INIC
 * @param {Object} payload language data
 * @param {Function} [cb] callback function
 * @returns {Promise}
 ********************************************************/
export const joinPlan = (payload, cb) => async (dispatch) => {
  const response = await post(
    { serviceURL: PAYMENT_API_URL },
    PLAN_JOIN,
    true,
    payload,
    true
  );
  if (response.status === 1) {
    dispatch({
      type: UPDATE_CURRENT_USER_INFO,
      payload: { credits: response?.data?.credits },
    });
    dispatch(getUserProfileData());
    if (typeof cb === "function") cb();
    return Promise.resolve(response.data);
  } else {
    return Promise.reject(response);
  }
};

/******************** 
@purpose : Used for Unsubscribe plans
@Parameter : { dispatch }
@Author : INIC
******************/
export const unSubscibePlan = () => async (dispatch) => {
  try {
    const response = await get(
      { serviceURL: PAYMENT_API_URL },
      UNSUBSCRIBE_PLAN,
      false,
      {},
      true
    );
    if (response) {
      dispatch(getUserProfileData());
      showMessageNotification(response?.message);
    }
  } catch (error) {
    throw error;
  }
};
