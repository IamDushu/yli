import {
  ADD_UPDATE_CERTIFICATION,
  ADD_UPDATE_USERDETAILS,
  CERTIFICATION_DELETE,
  CERTIFICATION_LIST,
  UPDATE_USER_DETAILS,
} from "../../api/routes";
import { AUTH_API_URL, USER_API_URL } from "../../config";
import store from "store"; // Access redux store data
import {
  ADD_CURRENT_USER_CERTIFICATION,
  UPDATE_CURRENT_USER_CERTIFICATION,
} from "./index";
import {
  DELETE_CURRENT_USER_CERTIFICATION,
  GET_CERTIFICATION_LIST,
} from "./types";
import { post, get, remove } from "../../api";
import { removeDetail, updateDataList } from "../utils/experience";
import { OPERATION_TYPE } from "../../utils";

/********************************************************
 * Create Redux Action to add user certification data
 * @author YLIWAY
 * @param {Object} payload certification data
 * @param {Function} [cb] callback function
 * @returns {Promise}
 ********************************************************/
export const addCertification = (payload, cb) => async (dispatch) => {
  const response = await post(
    { serviceURL: USER_API_URL },
    ADD_UPDATE_CERTIFICATION,
    true,
    {
      certification: payload,
    },
    true
  );
  if (response.status === 1) {
    dispatch({ type: ADD_CURRENT_USER_CERTIFICATION, payload });
    if (typeof cb === "function") cb();

    return Promise.resolve(response.data);
  } else {
    return Promise.reject(response);
  }
};

/******************** 
@purpose : Used for Certification list
@Parameter : {data}
@Author : YLIWAY
******************/
export const setCertificationList = (data) => async (dispatch) => {
  dispatch({
    type: GET_CERTIFICATION_LIST,
    payload: data,
  });
};

/******************** 
@purpose : Used for Certification list
@Parameter : {}
@Author : YLIWAY
******************/
export const getCertificationList =
  ({ userId }) =>
  async (dispatch) => {
    try {
      const response = await get(
        { serviceURL: USER_API_URL },
        `${CERTIFICATION_LIST}/?userId=${userId}`,
        false,
        true
      );

      if (response.status === 1) {
        dispatch(setCertificationList(response?.data));
        return Promise.resolve(response.data);
      }
      return Promise.reject(response);
    } catch (error) {
      throw error;
    }
  };

/********************************************************
 * Create Redux Action to update user certification data
 * @author INIC
 * @param {Object} payload certification data
 * @param {Function} [cb] callback function
 * @returns {Promise}
 ********************************************************/
export const updateCertification = (payload, id, cb) => async (dispatch) => {
  const response = await post(
    { serviceURL: USER_API_URL },
    ADD_UPDATE_CERTIFICATION,
    true,
    {
      certification: payload,
      id,
    },
    true
  );
  if (response.status === 1) {
    dispatch({ type: UPDATE_CURRENT_USER_CERTIFICATION, payload });
    if (typeof cb === "function") cb();

    return Promise.resolve(response.data);
  } else {
    return Promise.reject(response);
  }
};

/********************************************************
 * Create Redux Action to delete user certification data
 * @author INIC
 * @param {string} id id of certification to delete
 * @param {Function} [cb] callback function
 * @returns {Promise}
 ********************************************************/
export const deleteCertification = (id, cb) => async (dispatch) => {
  const { data } = store.getState().certification;
  const updatedDataList = removeDetail(data, id);

  const response = await remove(
    { serviceURL: USER_API_URL },
    CERTIFICATION_DELETE + `/${id}`,
    true,
    { operationType: OPERATION_TYPE.DELETE, certificate: updatedDataList },
    true
  );
  if (response.status === 1) {
    dispatch({ type: DELETE_CURRENT_USER_CERTIFICATION, payload: id });
    if (typeof cb === "function") cb();

    return Promise.resolve(response.status);
  } else {
    return Promise.reject(response);
  }
};
