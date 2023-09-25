import { post } from "api/index.js";
import {
  NOTIFICATION_DELETE,
  NOTIFICATION_LIST,
  NOTIFICATION_READ,
  NOTIFICATION_TURN_OFF,
} from "api/routes.js";
import { NOTIFICATION_API_URL } from "config/index.js";
import * as types from "./types.js";

/******************** 
@purpose : set notification data
@Parameter : { }
@Author : INIC
******************/
export const setNotificationData = (data) => ({
  type: types.SET_NOTIFICATION_LIST,
  data,
});

/******************** 
@purpose : Used for get notifications list
@Parameter : { data, dispatch }
@Author : INIC
******************/
export const getNotificationsList = (data) => async (dispatch) => {
  try {
    const response = await post(
      { serviceURL: NOTIFICATION_API_URL },
      NOTIFICATION_LIST,
      false,
      data,
      true
    );
    if (response.status === 1) {
      dispatch({
        type: types.SET_NOTIFICATION_LIST,
        payload: response.data,
      });
    }
  } catch (error) {}
};

/******************** 
@purpose : Used for mark as all read notifications list
@Parameter : { data, dispatch }
@Author : INIC
******************/
export const markasallRead = () => async (dispatch) => {
  try {
    const response = await post(
      { serviceURL: NOTIFICATION_API_URL },
      NOTIFICATION_DELETE,
      false,
      { markAllAsRead: true },
      true
    );
    if (response.status === 1) {
      dispatch(
        getNotificationsList({
          page: 1,
          pagesize: 20,
        })
      );
    }
  } catch (error) {}
};

/******************** 
@purpose : Used remove notifications list
@Parameter : { data, dispatch }
@Author : INIC
******************/
export const removeNotifications = (data) => async (dispatch) => {
  try {
    const response = await post(
      { serviceURL: NOTIFICATION_API_URL },
      NOTIFICATION_DELETE,
      false,
      data,
      true
    );
    if (response.status === 1) {
      dispatch(getNotificationsList({
        page:1,
        pagesize:20
      }));
    }
  } catch (error) {}
};

/******************** 
@purpose : Used turn off notification
@Parameter : { data, dispatch }
@Author : INIC
******************/
export const turnOffNotifications = (data) => async (dispatch) => {
  try {
    const response = await post(
      { serviceURL: NOTIFICATION_API_URL },
      NOTIFICATION_TURN_OFF,
      false,
      data,
      true
    );
    if (response.status === 1) {
      dispatch(getNotificationsList({
        page:1,
        pagesize:20
      }));
    }
  } catch (error) {}
};

/******************** 
@purpose : Used to read notifications list
@Parameter : { data, dispatch }
@Author : INIC
******************/
export const readNotifications = (data) => async (dispatch) => {
  try {
    const response = await post(
      { serviceURL: NOTIFICATION_API_URL },
      NOTIFICATION_READ,
      false,
      data,
      true
    );
    if (response.status === 1) {
      dispatch(getNotificationsList({
        page:1,
        pagesize:20
      }));
    }
  } catch (error) {}
};
