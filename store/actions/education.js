import {
  ADD_UPDATE_EDUCATION,
  ADD_UPDATE_USERDETAILS,
  EDUCATION_DELETE,
  EDUCATION_LIST,
  UPDATE_USER_DETAILS,
} from "../../api/routes";
import { AUTH_API_URL, USER_API_URL } from "../../config";
import store from "store"; // Access redux store data
import {
  SET_CURRENT_USER_EDUCATION,
  ADD_CURRENT_USER_EDUCATION,
  UPDATE_CURRENT_USER_EDUCATION,
} from "./index";
import { DELETE_CURRENT_USER_EDUCATION, GET_EDUCATION_LIST } from "./types";
import { removeDetail, updateDataList } from "../utils/experience";
import { post, get, remove } from "../../api";
import { OPERATION_TYPE } from "../../utils";

/********************************************************
 * Create Redux Action to set user profile education data
 * @author INIC
 * @param {Array} payload education data
 * @returns {{type: String, payload: Array}}
 ********************************************************/
export const setEducation = (payload) => ({
  type: SET_CURRENT_USER_EDUCATION,
  payload,
});

/********************************************************
 * Create Redux Action to add user education data
 * @author INIC
 * @param {Object} payload education data
 * @param {Function} [cb] callback function
 * @returns {Promise}
 ********************************************************/
export const addEducation = (payload, cb) => async (dispatch) => {
  const response = await post(
    { serviceURL: USER_API_URL },
    ADD_UPDATE_EDUCATION,
    true,
    {
      education: payload,
    },
    true
  );
  if (response.status === 1) {
    dispatch({ type: ADD_CURRENT_USER_EDUCATION, payload });
    if (typeof cb === "function") cb();

    return Promise.resolve(response.data);
  } else {
    return Promise.reject(response);
  }
};

/******************** 
@purpose : Used for Education list
@Parameter : {data}
@Author : INIC
******************/
export const setEducationList = (data) => async (dispatch) => {
  dispatch({
    type: GET_EDUCATION_LIST,
    payload: data,
  });
};

/******************** 
@purpose : Used for Education list
@Parameter : {}
@Author : INIC
******************/
export const getEducationList =
  ({ userId }) =>
  async (dispatch) => {
    try {
      const response = await get(
        { serviceURL: USER_API_URL },
        `${EDUCATION_LIST}/?userId=${userId}`,
        false,
        true
      );

      if (response.status === 1) {
        dispatch(setEducationList(response?.data));
        return Promise.resolve(response.data);
      }
      return Promise.reject(response);
    } catch (error) {
      throw error;
    }
  };

/********************************************************
 * Create Redux Action to update user education data
 * @author INIC
 * @param {Object} payload education data
 * @param {Function} [cb] callback function
 * @returns {Promise}
 ********************************************************/
export const updateEducation = (payload, id, cb) => async (dispatch) => {
  const response = await post(
    { serviceURL: USER_API_URL },
    ADD_UPDATE_EDUCATION,
    true,
    {
      education: payload,
      id,
    },
    true
  );
  if (response.status === 1) {
    dispatch({ type: UPDATE_CURRENT_USER_EDUCATION, payload });
    if (typeof cb === "function") cb();

    return Promise.resolve(response.data);
  } else {
    return Promise.reject(response);
  }
};

/********************************************************
 * Create Redux Action to delete user education data
 * @author INIC
 * @param {string} id id of education to delete
 * @param {Function} [cb] callback function
 * @returns {Promise}
 ********************************************************/
export const deleteEducation = (id, cb) => async (dispatch) => {
  const { data } = store.getState().education;
  const updatedDataList = removeDetail(data, id);

  const response = await remove(
    { serviceURL: USER_API_URL },
    EDUCATION_DELETE + `/${id}`,
    true,
    { operationType: OPERATION_TYPE.DELETE, educationDetails: updatedDataList },
    true
  );
  if (response.status === 1) {
    dispatch({ type: DELETE_CURRENT_USER_EDUCATION, payload: id });
    if (typeof cb === "function") cb();

    return Promise.resolve(response.status);
  } else {
    return Promise.reject(response);
  }
};
