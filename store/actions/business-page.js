import { post, get } from "@api";
import { USER_API_URL } from "@config";
import {
  GET_PLATFORM,
  GET_TOPIC_LIST,
  ROLE_REQUEST,
  ROLE_REQUEST_STATUS,
} from "api/routes";
import { ADMIN_API_URL } from "config";
import * as types from "./types.js";

/******************** 
@purpose : Used for requesting a role 
@Parameter : { data }
@Author : INIC
******************/
export const requestRole = async (data) => {
  try {
    const response = await post(
      { serviceURL: USER_API_URL },
      `${ROLE_REQUEST}/`,
      true,
      data,
      true
    );
    if (response.status === 1) {
      return true;
    }
    return false;
  } catch (error) {}
};

/******************** 
@purpose : Used for checking request status
@Parameter : { data }
@Author : INIC
******************/
export const requestStatus = async (data) => {
  try {
    const response = await post(
      { serviceURL: USER_API_URL },
      `${ROLE_REQUEST_STATUS}/`,
      false,
      data,
      true
    );

    if (response.status === 1) {
      return response.data.alreadyRequested;
    }
    return false;
  } catch (error) {}
};

/******************** 
@purpose : Used for get topic
@Parameter : {  }
@Author : INIC
******************/
export const getTopic = () => async (dispatch) => {
  try {
    const response = await get(
      { serviceURL: ADMIN_API_URL },
      GET_TOPIC_LIST,
      false,
      true
    );
    if (response.status === 1) {
      return dispatch({
        type: types.GET_TOPIC,
        payload: response.data.rows,
      });
    }
  } catch (error) {
    throw error;
  }
};

/******************** 
@purpose : Used for fetching platform
@Parameter : { data }
@Author : INIC
******************/
export const fetchPlatform = async (data) => {
  try {
    const response = await post(
      { serviceURL: USER_API_URL },
      GET_PLATFORM,
      false,
      data,
      true
    );

    if (response.status === 1) {
      return response;
    }
    return false;
  } catch (error) {}
};
