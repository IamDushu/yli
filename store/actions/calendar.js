import { post, remove } from "@api";
import { USER_API_URL } from "@config";
import {
  ADD_UPDATE_CALENDAR_EVENT,
  GET_CALENDAR_EVENT_LIST,
  DELETE_CALENDAR_EVENT,
} from "api/routes";

import { SET_CALENDAR_EVENT_LIST, UPSERT_CALENDAR_EVENT, REMOVE_CALENDAR_EVENT, ADD_CALENDAR_EVENT } from '../actions';

/******************** 
@purpose : Used for requesting a role 
@Parameter : { data }
@Author : INIC
******************/
export const addUpdateEvents = async (data) => {
  try {
    const response = await post(
      { serviceURL: USER_API_URL },
      `${ADD_UPDATE_CALENDAR_EVENT}`,
      true,
      data,
      true
    );
    if (response.status === 1) {
      return response;
    }
    return false;
  } catch (error) { }
};

/******************** 
@purpose : Used for deleting a event 
@Parameter : { data }
@Author : INIC
******************/
export const deleteEvents = async (id) => {
  try {
    const response = await remove(
      { serviceURL: USER_API_URL },
      `${DELETE_CALENDAR_EVENT}${id}`,
      true,
      null,
      true
    );
    if (response.status === 1) {
      return true;
    }
    return false;
  } catch (error) { }
};

/******************** 
@purpose : Used for getting events 
@Parameter : { data }
@Author : INIC
******************/
export const getCalendarEvents = (data) => async (dispatch) => {
  try {
    const response = await post(
      { serviceURL: USER_API_URL },
      `${GET_CALENDAR_EVENT_LIST}`,
      false,
      data,
      true
    );
    if (response.status === 1) {
      dispatch(setEvents(response.data));
      return response.data;
    }
    return false;
  } catch (error) { }
};

export const setEvents = (data) => ({
  type: SET_CALENDAR_EVENT_LIST,
  payload: data,
});

export const updateEvents = (data) => ({
  type: UPSERT_CALENDAR_EVENT,
  payload: data,
});

export const removeEvents = (id) => ({
  type: REMOVE_CALENDAR_EVENT,
  payload: id,
});
