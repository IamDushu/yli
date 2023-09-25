import { UPDATE_USER_DETAILS } from "../../api/routes";
import { AUTH_API_URL } from "../../config";
import store from "store"; // Access redux store data
import {
  ADD_CURRENT_USER_LANGUAGE,
  UPDATE_CURRENT_USER_LANGUAGE,
} from "./index";
import { DELETE_CURRENT_USER_LANGUAGE } from "./types";
import { post } from "../../api";
import { removeDetail, updateDataList } from "../utils/experience";
import { OPERATION_TYPE } from "../../utils";

/********************************************************
 * Create Redux Action to add user language data
 * @author INIC
 * @param {Object} payload language data
 * @param {Function} [cb] callback function
 * @returns {Promise}
 ********************************************************/
export const addLanguage = (payload, cb) => async (dispatch) => {
  const newLanguage = { ...payload };
  const { data } = store.getState().language;
  data.forEach((item) => {
    if (item && item.level) {
      item.proficiency =
        item.level === "Intermediate"
          ? item.level
          : item.level === "Elementary"
          ? Beginner
          : item.level === "Mother Tongue"
          ? "Advanced"
          : "";
      delete item?.level;
    }
  });

  const response = await post(
    { serviceURL: AUTH_API_URL },
    UPDATE_USER_DETAILS,
    true,
    {
      operationType: OPERATION_TYPE.ADD,
      languageSkills: [...data, newLanguage],
    },
    true
  );
  if (response.status === 1) {
    dispatch({ type: ADD_CURRENT_USER_LANGUAGE, payload: newLanguage });
    if (typeof cb === "function") cb();

    return Promise.resolve(response.data);
  } else {
    return Promise.reject(response);
  }
};

/********************************************************
 * Create Redux Action to update user language data
 * @author INIC
 * @param {Object} payload language data
 * @param {Function} [cb] callback function
 * @returns {Promise}
 ********************************************************/
export const updateLanguage = (payload, cb) => async (dispatch) => {
  const { data } = store.getState().language;
  const updatedDataList = updateDataList(data, payload);

  const response = await post(
    { serviceURL: AUTH_API_URL },
    UPDATE_USER_DETAILS,
    true,
    { operationType: OPERATION_TYPE.UPDATE, languageSkills: updatedDataList },
    true
  );
  if (response.status === 1) {
    dispatch({ type: UPDATE_CURRENT_USER_LANGUAGE, payload });
    if (typeof cb === "function") cb();

    return Promise.resolve(response.data);
  } else {
    return Promise.reject(response);
  }
};

/********************************************************
 * Create Redux Action to delete user language data
 * @author INIC
 * @param {string} id id of language to delete
 * @param {Function} [cb] callback function
 * @returns {Promise}
 ********************************************************/
export const deleteLanguage = (id, cb) => async (dispatch) => {
  const { data } = store.getState().language;
  const updatedDataList = removeDetail(data, id);

  const response = await post(
    { serviceURL: AUTH_API_URL },
    UPDATE_USER_DETAILS,
    true,
    { operationType: OPERATION_TYPE.DELETE, languageSkills: updatedDataList },
    true
  );
  if (response.status === 1) {
    dispatch({ type: DELETE_CURRENT_USER_LANGUAGE, payload: id });
    if (typeof cb === "function") cb();

    return Promise.resolve(response.status);
  } else {
    return Promise.reject(response);
  }
};
