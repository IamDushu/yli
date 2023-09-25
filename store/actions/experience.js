import {
  ADD_COMPANY_TO_LIST,
  ADD_ORGANISATION,
  ADD_UPDATE_EXPERIENCE,
  DELETE_EXPERIENCE,
  EXPERIENCE_LIST,
  LEARNING_INSTITUTE_LIST,
  ORGANIZATION_LIST,
  UPDATE_USER_DETAILS,
  USER_COMPANY_LIST,
} from "../../api/routes";
import { AUTH_API_URL, USER_API_URL } from "../../config";
import store from "store"; // Access redux store data
import {
  SET_CURRENT_USER_EXPERIENCE,
  UNSET_CURRENT_USER_EXPERIENCE,
  ADD_CURRENT_USER_EXPERIENCE,
  UPDATE_CURRENT_USER_EXPERIENCE,
} from "./index";
import {
  DELETE_CURRENT_USER_EXPERIENCE,
  GET_EXPERIENCE_LIST,
  GET_LERNING_INSTITUTE_LIST,
  GET_USER_COMPANY_LIST,
  GET_USER_ORGANIZATION_LIST,
} from "./types";
import { removeDetail, updateDataList } from "../utils/experience";
import { get, post, remove } from "../../api";
import { OPERATION_TYPE } from "../../utils";

/********************************************************
 * Create Redux Action to set user profile experience data
 * @author INIC
 * @param {Array} payload experience data
 * @returns {{type: String, payload: Array}}
 ********************************************************/
export const setExperience = (payload) => ({
  type: SET_CURRENT_USER_EXPERIENCE,
  payload,
});

/********************************************************
 * Create Redux Action to unset user profile experience data
 * @author INIC
 * @returns {{type: String}}
 ********************************************************/
export const unsetExperience = () => ({ type: UNSET_CURRENT_USER_EXPERIENCE });

/********************************************************
 * Create Redux Action to add user experience data
 * @author INIC
 * @param {Object} payload experience data
 * @param {Function} [cb] callback function
 * @returns {Promise}
 ********************************************************/
export const addExperience = (payload, cb) => async (dispatch) => {
  const response = await post(
    { serviceURL: USER_API_URL },
    ADD_UPDATE_EXPERIENCE,
    true,
    {
      experience: payload,
    },
    true
  );
  if (response.status === 1) {
    dispatch({ type: ADD_CURRENT_USER_EXPERIENCE, payload });
    if (typeof cb === "function") cb();

    return Promise.resolve(response.data);
  } else {
    return Promise.reject(response);
  }
};

/********************************************************
 * Create Redux Action to update user experience data
 * @author INIC
 * @param {Object} payload experience data
 * @param {Function} [cb] callback function
 * @returns {Promise}
 ********************************************************/
export const updateExperience = (payload, id, cb) => async (dispatch) => {
  const response = await post(
    { serviceURL: USER_API_URL },
    ADD_UPDATE_EXPERIENCE,
    true,
    {
      id,
      experience: payload,
    },
    true
  );
  if (response.status === 1) {
    dispatch({ type: UPDATE_CURRENT_USER_EXPERIENCE, payload });
    if (typeof cb === "function") cb();

    return Promise.resolve(response.data);
  } else {
    return Promise.reject(response);
  }
};

/********************************************************
 * Create Redux Action to delete user experience data
 * @author INIC
 * @param {string} id id of experience to delete
 * @param {Function} [cb] callback function
 * @returns {Promise}
 ********************************************************/
export const deleteExperience = (id, cb) => async (dispatch) => {
  const { data } = store.getState().experience;
  const updatedDataList = removeDetail(data, id);

  const response = await post(
    { serviceURL: AUTH_API_URL },
    UPDATE_USER_DETAILS,
    true,
    { operationType: OPERATION_TYPE.DELETE, experience: updatedDataList },
    true
  );
  if (response.status === 1) {
    dispatch({ type: DELETE_CURRENT_USER_EXPERIENCE, payload: id });
    if (typeof cb === "function") cb();

    return Promise.resolve(response.status);
  } else {
    return Promise.reject(response);
  }
};

/******************** 
@purpose : Used for get Learning Institute List
@Parameter : {}
@Author : INIC
******************/
export const getLearningInstituteList = () => async (dispatch) => {
  try {
    const response = await get(
      { serviceURL: USER_API_URL },
      LEARNING_INSTITUTE_LIST,
      false,
      true
    );

    if (response.status === 1) {
      return dispatch(setLearningInstituteList(response?.data?.rows));
    } else {
      return dispatch(setLearningInstituteList([]));
    }
  } catch (error) {
    throw error;
  }
};

/******************** 
@purpose : Used for set Learning Institute List
@Parameter : {}
@Author : INIC
******************/
export const setLearningInstituteList = (data) => async (dispatch) => {
  dispatch({
    type: GET_LERNING_INSTITUTE_LIST,
    payload: data,
  });
};

/******************** 
@purpose : Used for get company List
@Parameter : {}
@Author : INIC
******************/
export const getUserCompanyList = () => async (dispatch) => {
  try {
    const response = await get(
      { serviceURL: USER_API_URL },
      USER_COMPANY_LIST,
      false,
      true
    );

    if (response.status === 1) {
      return dispatch(setUserCompanyList(response?.data));
    } else {
      return dispatch(setUserCompanyList([]));
    }
  } catch (error) {
    throw error;
  }
};

/******************** 
@purpose : Used for set company List
@Parameter : {data}
@Author : INIC
******************/
export const setUserCompanyList = (data) => async (dispatch) => {
  dispatch({
    type: GET_USER_COMPANY_LIST,
    payload: data,
  });
};
/******************** 
@purpose : Used for add company to list
@Parameter : {body}
@Author : INIC
******************/
export const addUserCompany = (body) => async (dispatch) => {
  const res = await post(
    { serviceURL: USER_API_URL },
    ADD_COMPANY_TO_LIST,
    false,
    body,
    true
  );
  if (res?.data) {
    dispatch(getUserCompanyList());
    return Promise.resolve(res.data);
  }
  return Promise.reject(res);
};

/******************** 
@purpose : Used for get company List
@Parameter : {}
@Author : INIC
******************/
export const getOrganizationList = () => async (dispatch) => {
  try {
    const response = await get(
      { serviceURL: USER_API_URL },
      ORGANIZATION_LIST,
      false,
      true
    );

    if (response.status === 1) {
      return dispatch(setOrganizationList(response?.data));
    } else {
      return dispatch(setOrganizationList([]));
    }
  } catch (error) {
    throw error;
  }
};

/*
 @Purpose : add organisation 
 @Author : YLIWAY
*/

export const addOrganisation = async (payload)=> {
  try {
    const response = await post(
      { serviceURL: USER_API_URL },
      ADD_ORGANISATION,
      false,
      payload,
      true
    );

    if (response.status === 1) {
      return Promise.resolve(response.data);
    } else {
      return Promise.reject();
    }
  } catch (error) {
    throw error;
  }
};




/******************** 
@purpose : Used for set company List
@Parameter : {data}
@Author : INIC
******************/
export const setOrganizationList = (data) => async (dispatch) => {
  dispatch({
    type: GET_USER_ORGANIZATION_LIST,
    payload: data,
  });
};

/******************** 
@purpose : Used for Experience list
@Parameter : {}
@Author : INIC
******************/
export const getExperienceList =
  ({ userId }) =>
  async (dispatch) => {
    try {
      const response = await get(
        { serviceURL: USER_API_URL },
        `${EXPERIENCE_LIST}/?userId=${userId}`,
        false,
        true
      );

      if (response.status === 1) {
        dispatch(setExperienceList(response?.data));
        return Promise.resolve(response.data);
      }
      return Promise.reject(response);
    } catch (error) {
      throw error;
    }
  };

/******************** 
@purpose : Used for Experience list
@Parameter : {data}
@Author : INIC
******************/
export const setExperienceList = (data) => async (dispatch) => {
  dispatch({
    type: GET_EXPERIENCE_LIST,
    payload: data,
  });
};

export const deleteExperienceItem = (id, cb) => async (dispatch) => {
  try {
    const response = await remove(
      { serviceURL: USER_API_URL },
      DELETE_EXPERIENCE + id,
      false,
      true
    );

    if (response.status === 1) {
      if (cb) cb();
      return Promise.resolve(response);
    }
    return Promise.reject(response);
  } catch (error) {
    throw error;
  }
};
