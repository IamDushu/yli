import { USER_API_URL } from "config";
import { post } from "api";
import * as types from "../types";
import store from "store/index.js";
import { toggleLoader } from "../ui";
export const RoomList = (payload) => async (dispatch) => {
  dispatch(toggleLoader(true, "roomloader"));
  const { workwithus } = store.getState().aboutUsInfo;
  const res = await post(
    { serviceURL: USER_API_URL },
    workwithus.event
      ? "user-n-virtualEvents/list"
      : "user-o-virtualEvents/list",
    false,
    payload
  );
  if (res?.data) {
    dispatch(toggleLoader(false, "roomloader"));
    dispatch(setRoomList(res.data));
  } else {
    dispatch(setRoomList({ rows: [], total: 0, page: 1, perPage: 10 }));
  }
  if (payload?.virtualEventType === "training-room" && res.status === 1) {
    dispatch({
      type: types.TRAINING_ROOM_LIST,
      resData: res.data,
    });
  }
  if (payload?.virtualEventType === "event" && res.status === 1) {
    dispatch({
      type: types.EVENT_LIST,
      resData: res.data,
    });
  }
  if (payload?.virtualEventType === "webinar" && res.status === 1) {
    dispatch({
      type: types.WEBINAR_LIST,
      resData: res.data,
    });
  }
  if (payload?.virtualEventType === "master-class" && res.status === 1) {
    dispatch({
      type: types.MASTER_CLASS_LIST,
      resData: res.data,
    });
  }
  if (payload?.virtualEventType === "coaching-room" && res.status === 1) {
    dispatch({
      type: types.COACHING_ROOM_LIST,
      resData: res.data,
    });
  }
  if (
    payload?.virtualEventType === "business-network-room" &&
    res.status === 1
  ) {
    dispatch({
      type: types.BNR_LIST,
      resData: res.data,
    });
  }

  return Promise.reject(res);
};

/******************** 
@purpose : set Training Rooms Listing
@Parameter : {data}
@Author : INIC
******************/

export const setRoomList = (data) => ({
  type: types.SET_ROOM_LIST,
  data,
});
