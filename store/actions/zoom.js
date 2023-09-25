import { post, remove } from "api";
import { GET_ZOOM_DETAILS } from "api/routes.js";
import { USER_API_URL } from "config/index.js";
import * as types from "./types.js";

/******************** 
@purpose : Used for zoom
@Parameter : { data, dispatch }
@Author : INIC
******************/
export const getZoomDetails = (data) => async (dispatch) => {
  try {
    const response = await post(
      { serviceURL: USER_API_URL },
      GET_ZOOM_DETAILS,
      false,
      data,
      true
    );
    if (response.status === 1) {
      return dispatch({
        type: types.GET_ZOOM_DATA,
        payload: response.data,
      });
    }
  } catch (error) {
    throw error;
  }
};

/******************** 
@purpose : Used for set Zoom Data Clear
@Parameter : { data }
@Author : INIC
******************/
export const setZoomDataClear = () => ({
  type: types.SET_ZOOM_DATA_CLEAR,
});

/******************** 
@purpose : Used for get mediaStream
@Parameter : { data }
@Author : INIC
******************/
export const getMediaStream = (data) => ({
  type: types.GET_MEDIA_DATA,
  data,
});

/******************** 
@purpose : Used for zoom
@Parameter : { data, dispatch }
@Author : INIC
******************/
export const getZoomClientData = (data) => (dispatch) => {
  return dispatch({ type: types.GET_ZOOM_CLIENT_DATA, data });
};

/******************** 
@purpose : Used for zoom chat
@Parameter : { data, dispatch }
@Author : INIC
******************/
export const getZoomChat = (data) => (dispatch) => {
  return dispatch({ type: types.GET_ZOOM_CHAT_DATA, data });
};

/******************** 
@purpose : Used for get mediaStream
@Parameter : { data }
@Author : INIC
******************/
export const getRecording = (data) => ({
  type: types.GET_RECORDING_DATA,
  data,
});
