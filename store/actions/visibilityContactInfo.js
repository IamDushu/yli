import { post } from "api";
import * as types from "./types.js";
import {
  CONTACT_INFO_GET_VISIBILITY,
  CONTACT_INFO_UPDATE_VISIBILITY,
} from "api/routes";
import { USER_API_URL } from "config";

export const getContactInfoVisibilityData = (data) => async (dispatch) => {
  try {
    const response = await post(
      { serviceURL: USER_API_URL },
      CONTACT_INFO_GET_VISIBILITY,
      false,
      data,
      false
    );
    if (response.status === 1) {
      return Promise.resolve(response);
    }
    return Promise.reject(response);
  } catch (error) {
    throw error;
  }
};

/******************** 
@purpose : Visibility for contact Information
@Parameter : { data, dispatch }
@Author : INIC
******************/
export const updateProfileVisibilityData = (data) => async (dispatch) => {
  try {
    const response = await post(
      { serviceURL: USER_API_URL },
      CONTACT_INFO_UPDATE_VISIBILITY,
      true,
      data,
      true
    );
    if (response.status === 1) {
      return Promise.resolve(response);
    }
    return Promise.reject(response);
  } catch (error) {
    throw error;
  }
};
