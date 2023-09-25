import * as types from "./types.js";
import { get, post, remove } from "../../api";
import { USER_API_URL } from "../../config";
import {
  PEOPLE_YOU_MAY_KNOW_LIST,
  PENDING_CONNECTIONS_LIST,
  SENT_CONNECTIONS_LIST,
  MY_CONNECTIONS_LIST,
  CHANGE_CONNECTION_STATUS,
  SEND_CONNECTION_REQUEST,
  FOLLOW_USER,
  FOLLOWERS_LIST,
  FOLLOWING_LIST,
  MY_GROWTH_CONNECTIONS_LIST,
  GROWTH_CONNECTIONS_DELETE,
  ADD_REMOVE_GROWTH_PARTNERS,
  CROSS_OPTION,
  PEOPLE_VIEWED_LIST,
} from "api/routes";
import { showMessageNotification } from "utils";
import { trackEvent } from "@components/segment-analytics";

/******************** 
@purpose : Used for get people you may know list
@Parameter : { data, dispatch }
@Author : INIC
******************/
export const getPeopleYouMayKnowList = (data) => async (dispatch) => {
  try {
    const response = await post(
      { serviceURL: USER_API_URL },
      PEOPLE_YOU_MAY_KNOW_LIST,
      false,
      data,
      true
    );
    if (response.status === 1) {
      dispatch({
        type: types.GET_PEOPLE_YOU_MAY_KNOW_LIST,
        payload: response.data,
      });
      return Promise.resolve(response);
    }
    return Promise.reject(response);
  } catch (error) { }
};

/******************** 
@purpose : Used for get pending connections list
@Parameter : { data, dispatch }
@Author : INIC
******************/
export const getPendingConnectionsList = (data) => async (dispatch) => {
  try {
    const response = await post(
      { serviceURL: USER_API_URL },
      PENDING_CONNECTIONS_LIST,
      false,
      data,
      true
    );
    if (response.status === 1) {
      return dispatch({
        type: types.GET_PENDING_CONNECTIONS_LIST,
        payload: response,
        page: data?.page,
      });
    }
  } catch (error) { }
};

/******************** 
@purpose : Used for get sent connections list
@Parameter : { data, dispatch }
@Author : INIC
******************/
export const getSentConnectionsList = (data) => async (dispatch) => {
  try {
    const response = await post(
      { serviceURL: USER_API_URL },
      SENT_CONNECTIONS_LIST,
      false,
      data,
      true
    );
    if (response.status === 1) {
      return dispatch({
        type: types.GET_SENT_CONNECTIONS_LIST,
        payload: response,
        page: data?.page,
      });
    }
  } catch (error) { }
};

/******************** 
@purpose : Used for get my connections list
@Parameter : { data, dispatch }
@Author : INIC
******************/
export const getMyConnectionsList = (data) => async (dispatch) => {
  try {
    const response = await post(
      { serviceURL: USER_API_URL },
      MY_CONNECTIONS_LIST,
      false,
      data,
      true
    );
    if (response.status === 1) {
      return dispatch({
        type: types.GET_MY_CONNECTIONS_LIST,
        payload: response.data,
        totalConnection: response.total, // quick fix as api changes may lead to broke somewhere else
        page: data?.page,
      });
    }
  } catch (error) { }
};

/******************** 
@purpose : Used for change connection's status
@Parameter : { data, dispatch }
@Author : INIC
******************/
export const changeConnectionStatus = (data) => async (dispatch) => {
  try {
    const response = await post(
      { serviceURL: USER_API_URL },
      CHANGE_CONNECTION_STATUS,
      false,
      data,
      true
    );
    if (response.status === 1) {
      if (data.status == "") {
        showMessageNotification("Connection removed successfully");
        return dispatch({
          type: types.REMOVE_FROM_MY_CONNECTION,
          payload: data.id,
        });
      } else if (data.status == "withdrawl") {
        showMessageNotification("Request withdrawn successfully");
        return dispatch({
          type: types.REMOVE_FROM_SENT_CONNECTION,
          payload: data.id,
        });
      } else if (data.status == "accepted" || data.status == "rejected") {
        // track event
        const evetnName =
          data.status === "accepted"
            ? "connection_accepted"
            : "connection_rejected";
        trackEvent(evetnName);
        dispatch({
          type: types.REMOVE_FROM_PENDING_CONNECTION,
          payload: data.id,
        });
        return Promise.resolve(response);
      }
    }
  } catch (error) { }
};

/******************** 
@purpose : Used for sending connection request
@Parameter : { id, dispatch }
@Author : INIC
******************/
export const sendConnectionRequest = (id) => async (dispatch) => {
  try {
    const response = await get(
      { serviceURL: USER_API_URL },
      `${SEND_CONNECTION_REQUEST}/${id}`,
      false,
      true
    );
    if (response.status === 1) {
      showMessageNotification("Request sent successfully");
      // track connection_sent
      trackEvent("connection_sent");
      // dispatch(followUser(id));
      dispatch({
        type: types.ADD_TO_SENT_CONNECTION_LIST,
        payload: { userId: id, id: response.data.id },
      });
      return dispatch({
        type: types.REMOVE_FROM_PEOPLE_YOU_MAY_KNOW,
        payload: id,
      });
    }
  } catch (error) { }
};

/******************** 
@purpose : Used for removing from people you may know
@Parameter : { id, dispatch }
@Author : INIC
******************/
export const removeFromPeopleYouMayKnow = (id) => async (dispatch) => {
  try {
    return dispatch({
      type: types.REMOVE_FROM_PEOPLE_YOU_MAY_KNOW,
      payload: id,
    });
  } catch (error) { }
};

/******************** 
@purpose : Used for following a user
@Parameter : { id }
@Author : INIC
******************/
export const followUser = (id, type) => async (dispatch) => {
  try {
    const response = await post(
      { serviceURL: USER_API_URL },
      `${FOLLOW_USER}/`,
      type === "connect" ? false : true,
      {
        userId: id,
        status: true,
      },
      true
    );
    if (response.status === 1) {
      // showMessageNotification("User followed successfully");
      return Promise.resolve(response);
    }
    return false;
  } catch (error) {
    throw error;
  }
};

/******************** 
@purpose : Used for unfollow a user
@Parameter : { id }
@Author : INIC
******************/
export const unfollowUser = (id) => async (dispatch) => {
  try {
    const response = await post(
      { serviceURL: USER_API_URL },
      `${FOLLOW_USER}/`,
      false,
      {
        userId: id,
        status: false,
      },
      true
    );
    if (response.status === 1) {
      showMessageNotification("User unfollowed successfully");
      return Promise.resolve(response);
    }
    // return false;
  } catch (error) {
    throw error;
  }
};

/******************** 
@purpose : Used for updating user in people you may know list
@Parameter : { data, dispatch }
@Author : INIC
******************/
export const updateUserInPYMK = (data) => async (dispatch) => {
  try {
    return dispatch({
      type: types.UPDATE_PEOPLE_YOU_MAY_KNOW_LIST_USER,
      payload: data,
    });
  } catch (error) { }
};

/******************** 
@purpose : Used for fetching followers list
@Parameter : { data, dispatch }
@Author : INIC
******************/
export const getFollowersList = (data) => async (dispatch) => {
  try {
    const response = await post(
      { serviceURL: USER_API_URL },
      FOLLOWERS_LIST,
      false,
      data,
      true
    );
    if (response.status === 1) {
      return dispatch({
        type: types.GET_FOLLOWERS_LIST,
        payload: response?.data ? response.data : [],
      });
    }
  } catch (error) { }
};

/******************** 
@purpose : Used for fetching followings list
@Parameter : { data, dispatch }
@Author : INIC
******************/
export const getFollowingList = (data) => async (dispatch) => {
  try {
    const response = await post(
      { serviceURL: USER_API_URL },
      FOLLOWING_LIST,
      false,
      data,
      true
    );
    if (response.status === 1) {
      return dispatch({
        type: types.GET_FOLLOWINGS_LIST,
        payload: response?.data ? response.data : [],
      });
    }
  } catch (error) { }
};

/******************** 
@purpose : Used for removing user from followings list
@Parameter : { id, dispatch }
@Author : INIC
******************/
export const removeUserFromFollowingList = (id) => async (dispatch) => {
  try {
    return dispatch({
      type: types.REMOVE_USER_FROM_FOLLOWINGS,
      payload: id,
    });
  } catch (error) { }
};

/******************** 
@purpose : Used for get my connections list
@Parameter : { data, dispatch }
@Author : INIC
******************/
export const getMyGrowthConnectionsList = (data) => async (dispatch) => {
  try {
    const response = await post(
      { serviceURL: USER_API_URL },
      MY_GROWTH_CONNECTIONS_LIST,
      false,
      data,
      true
    );
    if (response.status === 1) {
      return dispatch({
        type: types.GET_MY_GROWTH_CONNECTIONS_LIST,
        payload: response,
        page: data?.page,
      });
    }
  } catch (error) { }
};

/******************** 
@purpose : Used for remove my connections list
@Parameter : { id, dispatch }
@Author : INIC
******************/
export const removeMyGrowthConnectionsList = (id) => async (dispatch) => {
  try {
    const response = await get(
      { serviceURL: USER_API_URL },
      `${GROWTH_CONNECTIONS_DELETE}${id}`,
      true,
      true
    );
    if (response.status === 1) {
      return Promise.resolve(response);
    }
    return Promise.reject(response);
  } catch (err) {
    throw err;
  }
};
/******************** 
@purpose : Used for add/remove from growth connection
@Parameter : { id, dispatch }
@Author : INIC
******************/
export const addRemoveGrowthPartner = (data) => async (dispatch) => {
  try {
    const response = await post(
      { serviceURL: USER_API_URL },
      ADD_REMOVE_GROWTH_PARTNERS,
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
@purpose : Cross option in people you may know
@Parameter : { id, dispatch }
@Author : INIC
******************/
export const crossOptionPYMK = (id) => async (dispatch) => {
  try {
    const response = await get(
      { serviceURL: USER_API_URL },
      CROSS_OPTION + id,
      true,
      true
    );
    if (response.status === 1) {
      return Promise.resolve(response);
    }
    return Promise.reject(response);
  } catch (err) {
    throw err;
  }
};
/******************** 
@purpose : Used for get my connections list
@Parameter : { data, dispatch }
@Author : INIC
******************/
export const getPeopleViewedList = (data) => async (dispatch) => {
  try {
    const response = await post(
      { serviceURL: USER_API_URL },
      PEOPLE_VIEWED_LIST,
      false,
      data,
      true
    );
    if (response.status === 1) {
      return dispatch({
        type: types.GET_PEOPLE_VIEWED_LIST,
        payload: response,
      });
    }
  } catch (error) { }
};
