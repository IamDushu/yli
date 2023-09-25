import {
  ACCOUNT_ACCESS_SEND_OTP,
  ACCOUNT_ACCESS_VERIFY_OTP,
  ACCOUNT_CHANGE_ACCESS,
  ACCOUNT_CHANGE_PASSWORD,
  ACCOUNT_CHANGE_PREFERENCE_OTP,
  ACCOUNT_SETTINGS_CLOSE,
  ACCOUNT_SETTINGS_SUSPEND,
  ADD_TAG,
  CARD_LIST,
  EDIT_PROFILE_INTRO,
  GET_USER_PREFERENCE,
  LI_ROLES,
  REMOVE_CARD,
  CHANGE_LANGUAGE,
} from "../../api/routes";
import { PAYMENT_API_URL, USER_API_URL } from "../../config";
import { ADD_CARDS, SET_LI_ROLES, SUSPEND_ACCOUNT } from "./types";
import { get, post } from "../../api";
import {
  CLEAR_STATE,
  CLOSE_ACCOUNT,
  SET_NUMBERS,
  SET_PREFERENCES,
  UPDATE_CURRENT_USER_INFO,
} from ".";
import { showMessageNotification } from "utils";

/********************************************************
 * Create Redux Action to add or edit user profile description
 * @author INIC
 * @param {Object} payload experience data
 * @param {Function} [cb] callback function
 * @returns {Promise}
 ********************************************************/
export const updateUserIntro = (payload, cb) => async (dispatch) => {
  const response = await post(
    { serviceURL: USER_API_URL },
    EDIT_PROFILE_INTRO,
    true,
    payload,
    true,
    { key: 'chat' }
  );
  if (response.status === 1) {
    dispatch({ type: UPDATE_CURRENT_USER_INFO, payload });
    if (typeof cb === "function") cb();
    return Promise.resolve(response.data);
  } else {
    return Promise.reject(response);
  }
};

/********************************************************
 * Create Redux Action to add or edit user profile description
 * @author INIC
 * @param {Object} payload experience data
 * @param {Function} [cb] callback function
 * @returns {Promise}
 ********************************************************/
export const getUserPreferences = (cb) => async (dispatch) => {
  const response = await get(
    { serviceURL: USER_API_URL },
    GET_USER_PREFERENCE,
    false,
    {},
    true
  );
  if (response.status === 1) {
    dispatch({ type: SET_PREFERENCES, payload: response.data });
    if (typeof cb === "function") cb();
    return Promise.resolve(response.data);
  } else {
    return Promise.reject(response);
  }
};

/********************************************************
 * Create Redux Action to suspend user account
 * @author INIC
 * @param {Function} [cb] callback function
 * @returns {Function}
 ********************************************************/
export const suspendAccount = (cb) => async (dispatch) => {
  const response = await post(
    { serviceURL: USER_API_URL },
    ACCOUNT_SETTINGS_SUSPEND,
    true,
    {},
    true
  );
  if (response.status === 1) {
    dispatch({
      type: SUSPEND_ACCOUNT,
      payload: { isSuspended: response.data.isSuspended },
    });
    dispatch({ type: CLEAR_STATE });
    if (typeof cb === "function") cb();

    return Promise.resolve(response.data);
  } else {
    return Promise.reject(response);
  }
};

/********************************************************
 * Create Redux Action to close user account
 * @author INIC
 * @param {Function} [cb] callback function
 * @returns {Function}
 ********************************************************/
export const permanentlyCloseAccount = (cb) => async (dispatch) => {
  const response = await post(
    { serviceURL: USER_API_URL },
    ACCOUNT_SETTINGS_CLOSE,
    true,
    {},
    true,
    { key: "chat" }
  );
  if (response.status === 1) {
    dispatch({ type: CLOSE_ACCOUNT, payload: { isDeleted: true } });
    dispatch({ type: CLEAR_STATE });
    if (typeof cb === "function") cb();

    return Promise.resolve(response.data);
  } else {
    return Promise.reject(response);
  }
};

/********************************************************
 * Create Redux Action to change user password
 * @author INIC
 * @param {Function} [cb] callback function
 * @returns {Function}
 ********************************************************/
export const changePassword = (payload, cb) => async (dispatch) => {
  const response = await post(
    { serviceURL: USER_API_URL },
    ACCOUNT_CHANGE_PASSWORD,
    true,
    payload,
    true
  );
  if (response.status === 1) {
    if (typeof cb === "function") cb();
    return Promise.resolve(response.data);
  } else {
    return Promise.reject(response);
  }
};

/********************************************************
 * Create Redux Action to change user password
 * @author INIC
 * @param {Function} [cb] callback function
 * @returns {Function}
 ********************************************************/
export const sendOTP = (payload, cb) => async (dispatch) => {
  const response = await post(
    { serviceURL: USER_API_URL },
    ACCOUNT_ACCESS_SEND_OTP,
    true,
    payload,
    true
  );
  if (response.status === 1) {
    if (typeof cb === "function") cb();
    return Promise.resolve(response.data);
  } else {
    return Promise.reject(response);
  }
};

/********************************************************
 * Create Redux Action to change user password
 * @author INIC
 * @param {Function} [cb] callback function
 * @returns {Function}
 ********************************************************/
export const setNumbers = (payload) => ({ type: SET_NUMBERS, payload });

/********************************************************
 * Create Redux Action to change user password
 * @author INIC
 * @param {Function} [cb] callback function
 * @returns {Function}
 ********************************************************/
export const verifyChangeNumberOTP = (payload, cb) => async (dispatch) => {
  const response = await post(
    { serviceURL: USER_API_URL },
    ACCOUNT_ACCESS_VERIFY_OTP,
    true,
    payload,
    true
  );
  if (response.status === 1) {
    if (typeof cb === "function") cb();
    return Promise.resolve(response.data);
  } else {
    return Promise.reject(response);
  }
};

/********************************************************
 * Create Redux Action to change user password
 * @author INIC
 * @param {Function} [cb] callback function
 * @returns {Function}
 ********************************************************/
export const changeAccountAccess = (payload, cb) => async (dispatch) => {
  const response = await post(
    { serviceURL: USER_API_URL },
    ACCOUNT_CHANGE_ACCESS,
    true,
    payload,
    true
  );
  if (response.status === 1) {
    dispatch({ type: UPDATE_CURRENT_USER_INFO, payload });
    if (typeof cb === "function") cb();
    return Promise.resolve(response.data);
  } else {
    return Promise.reject(response);
  }
};

/********************************************************
 * Create Redux Action to change user password
 * @author INIC
 * @param {Function} [cb] callback function
 * @returns {Function}
 ********************************************************/
export const changePreferences = (payload, cb) => async (dispatch) => {
  const response = await post(
    { serviceURL: USER_API_URL },
    ACCOUNT_CHANGE_PREFERENCE_OTP,
    true,
    payload,
    true
  );
  if (response.status === 1) {
    dispatch({ type: SET_PREFERENCES, payload: response.data });
    if (typeof cb === "function") cb();
    return Promise.resolve(response.data);
  } else {
    return Promise.reject(response);
  }
};

/********************************************************
 * To change language preference of user
 * @author INIC
 * @returns {Function}
 ********************************************************/
export const changeLanguagePreference =
  (payload, userInfo) => async (dispatch) => {
    const response = await post(
      { serviceURL: USER_API_URL },
      CHANGE_LANGUAGE,
      false,
      payload,
      true
    );
    if (response.status === 1) {
      let otherSettings = {};

      if (
        userInfo["otherSettings"] !== undefined &&
        userInfo["otherSettings"] !== null
      ) {
        otherSettings = userInfo["otherSettings"];
      }

      otherSettings["language"] = payload.language;

      dispatch({ type: UPDATE_CURRENT_USER_INFO, payload: { otherSettings } });

      // showMessageNotification(response.message);
      return Promise.resolve(response);
    }
  };

/********************************************************
 * Create Redux Action to create learning institute
 * @author INIC
 * @returns {Function}
 ********************************************************/
export const addTagsPreferences = (payload) => async (dispatch) => {
  const response = await post(
    { serviceURL: USER_API_URL },
    ADD_TAG,
    false,
    payload,
    true
  );
  if (response.status === 1) {
    showMessageNotification(response.message);
    return Promise.resolve(response);
  } else {
    showMessageNotification(response.message);
  }
};

export const deleteCard = (payload) => async (dispatch) => {
  const response = await post(
    { serviceURL: PAYMENT_API_URL },
    REMOVE_CARD,
    false,
    payload,
    true
  );
  if (response.status === 1) {
    // showMessageNotification(response.message);
    return Promise.resolve(response);
  }
};

export const cardListing = () => async (dispatch) => {
  try {
    const response = await get(
      { serviceURL: PAYMENT_API_URL },
      CARD_LIST,
      false,
      {},
      true
    );
    if (response.status === 1) {
      dispatch({ type: ADD_CARDS, payload: response.data });
      return Promise.resolve(response);
    }
  } catch (error) {
    throw error;
  }
};

/********************************************************
 * Create Redux Action to add or edit user profile description
 * @author INIC
 * @param {Object} payload experience data
 * @param {Function} [data] callback function
 * @returns {Promise}
 ********************************************************/
export const getLIRolesList = (data) => async (dispatch) => {
  const response = await get(
    { serviceURL: USER_API_URL },
    LI_ROLES,
    false,
    {},
    true
  );
  if (response.status === 1) {
    dispatch({ type: SET_LI_ROLES, payload: response.data });
    return Promise.resolve(response.data);
  } else {
    return Promise.reject(response);
  }
};
