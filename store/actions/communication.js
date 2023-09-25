import { get, post } from "api";
import * as types from "./types.js";
import { NOTIFICATION_API_URL } from "config/index.js";
import {
  ADD_COMMUNICATION_MESSAGING,
  ADD_COMMUNICATION_NOTIFICATION,
  GET_MESSAGING,
} from "api/routes.js";

/******************** 
@purpose : Used for add communication messaging
@Parameter : { data, dispatch }
@Author : INIC
******************/
export const addCommunicationMessaging = (data) => async (dispatch) => {
  try {
    const response = await post(
      { serviceURL: NOTIFICATION_API_URL },
      ADD_COMMUNICATION_MESSAGING,
      false,
      data,
      true
    );
    if (response.status === 1) {
      return Promise.resolve(response);
    }
  } catch (error) {
    throw error;
  }
};

/******************** 
@purpose : Used for add communication NOTIFICATION
@Parameter : { data, dispatch }
@Author : INIC
******************/
export const addCommunicationNotification = (data) => async (dispatch) => {
  try {
    const response = await post(
      { serviceURL: NOTIFICATION_API_URL },
      ADD_COMMUNICATION_NOTIFICATION,
      false,
      data,
      true
    );
    if (response.status === 1) {
      return Promise.resolve(response);
    }
  } catch (error) {
    throw error;
  }
};
/******************** 
@purpose : Used for get communication 
@Parameter : { data, dispatch }
@Author : INIC
******************/
export const getCommunication = (data) => async (dispatch) => {
  try {
    const response = await get(
      { serviceURL: NOTIFICATION_API_URL },
      GET_MESSAGING,
      false,
      false
    );
    if (response.status === 1) {
      dispatch(setMessaing(response.data));
      return Promise.resolve(response);
    }
  } catch (error) {
    throw error;
  }
};

/******************* 
@purpose :  set Communication
@Parameter : {value}
@Author : INIC
******************/
export const setMessaing = (data) => ({
  type: types.GET_COMMUNICATION,
  data,
});
