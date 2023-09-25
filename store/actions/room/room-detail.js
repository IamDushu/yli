import {
  COACHING_ROOM_DETAILS,
  TRAINING_ROOM_DETAILS,
  VIRTUAL_EVENTS_DETAIL,
  JOIN_ROOMS,
  JOIN_VIRTUAL_EVENT,
  GENERATE_VIRTUAL_EVENT_CERTIFICATE,
  GET_VIRTUAL_EVENT_CERTIFICATE_DETAILS,
} from "api/routes";
import { USER_API_URL } from "config";
import { get, post } from "api";
import * as types from "../types";
import { PAYMENT_API_URL } from "@config";
import { showMessageNotification } from "utils";
import { setCertificateDetails, setGenerateCertificate } from "../courses";
import { DASHBOARD } from "routes/urls";
import { toggleLoader } from "../ui";

/******************** 
@purpose : upload Banner Image and video for training room
@Parameter : {imageData, format}
@Author : INIC
******************/
export const roomDetails = (id, router) => async (dispatch) => {
  dispatch(toggleLoader(true, "roomDetailLoader"));
  const res = await get(
    { serviceURL: USER_API_URL },
    VIRTUAL_EVENTS_DETAIL + id,
    false,
    true
  );

  if (res?.data) {
    dispatch(toggleLoader(false, "roomDetailLoader"));
    dispatch(setRoomDetails(res.data));
    return Promise.resolve(res.data);
  } else if (!res?.data) {
    router.push(DASHBOARD);
  }
  return Promise.reject(res);
};

/******************** 
@purpose : use for virtual Event join
@Parameter : {virtualEventId}
@Author : INIC
******************/
export const getVirtualEventJoin = (data) => async (dispatch) => {
  try {
    const response = await post(
      { serviceURL: USER_API_URL },
      JOIN_VIRTUAL_EVENT,
      false,
      data,
      true
    );
    if (response) {
      showMessageNotification(response?.message);
    }
  } catch (error) {
    throw error;
  }
};

/******************** 
@purpose : Used for virtual Event generating certificares
@Parameter : { virtualEventId}
@Author : INIC
******************/
export const virtualEventGenerateCertificate = (data) => async (dispatch) => {
  try {
    const response = await post(
      { serviceURL: USER_API_URL },
      GENERATE_VIRTUAL_EVENT_CERTIFICATE,
      false,
      data,
      true
    );
    if (response.status === 1) {
      dispatch(setGenerateCertificate(response?.data));
      return Promise.resolve(response);
    }
    return Promise.reject();
  } catch (error) {
    throw error;
  }
};

/******************** 
@purpose : Used for get certificate detail
@Parameter : { }
@Author : INIC
******************/
export const getvirtualEventCertificateDetails = (id) => async (dispatch) => {
  try {
    const response = await get(
      { serviceURL: USER_API_URL },
      GET_VIRTUAL_EVENT_CERTIFICATE_DETAILS + id,
      false,
      true
    );

    if (response.status === 1) {
      dispatch(setCertificateDetails(response?.data));
      return Promise.resolve(response?.data);
    }
    return Promise.reject();
  } catch (error) {
    throw error;
  }
};

/******************** 
@purpose : set Training Rooms Detail
@Parameter : {data}
@Author : INIC
******************/
export const setRoomDetails = (data) => ({
  type: types.SET_ROOM_DETAILS,
  data,
});

/******************** 
@purpose : set Training Rooms Detail Clear
@Parameter : {data}
@Author : INIC
******************/
export const setRoomDetailsClear = () => ({
  type: types.SET_ROOM_DETAILS_CLEAR,
});

/******************** 
@purpose : Used for join a rooms
@Parameter : { data }
@Author : INIC
******************/

export const joinRoom = async (id, channelId) => {
  try {
    const response = await get(
      { serviceURL: PAYMENT_API_URL },
      `${JOIN_ROOMS}/${id}?channelId=${channelId}`,
      true,
      true
    );
    if (response.statusCode === 409) {
      throw response.message;
    }
    if (response.status === 1) {
      return response;
    }
    return false;
  } catch (error) {
    throw error;
  }
};
