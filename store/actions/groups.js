import * as types from "./types.js";
import { get, post, remove } from "../../api";
import { USER_API_URL } from "config/index.js";
import {
  GROUPS_LIST,
  DELETE_GROUP,
  GROUP_DETAILS,
  GROUPS_JOINED_LIST,
  GROUPS_INVITE_RECEIVED,
  GROUPS_INVITE_ACTION,
  GROUPS_CONNECTION_LIST,
  GROUPS_INVITE_SEND,
  GROUPS_LEAVE,
  GROUPS_MUTEUNMUTE,
  GROUP_SEARCH,
  GROUPS_REQUEST_RECEIVED,
  GROUPS_MEMBERS,
  CREATE_GROUP,
  ALL_GROUPS_LIST,
  ALL_GROUPS_REQUESTED,
  GROUPS_PRIVATE_REQUESTED_LIST,
  JOIN_PUBLIC_GROUP,
  GROUPS_WITHDRAW,
} from "api/routes.js";
import { trackEvent } from "@components/segment-analytics";

/******************** 
@purpose : Used for get groups list
@Parameter : { data, dispatch }
@Author : INIC
******************/
export const getGroupsList = (data) => async (dispatch) => {
  try {
    const response = await post(
      { serviceURL: USER_API_URL },
      GROUPS_LIST,
      false,
      data,
      true
    );
    if (response.status === 1) {
      return dispatch({ type: types.GET_GROUPS_LIST, payload: response });
    }
  } catch (error) {
    throw error;
  }
};

/******************** 
@purpose : Used for get all groups list
@Parameter : { data, dispatch }
@Author : INIC
******************/
export const getAllGroupsList = (data) => async (dispatch) => {
  try {
    const response = await post(
      { serviceURL: USER_API_URL },
      ALL_GROUPS_LIST,
      false,
      data,
      true
    );
    if (response.status === 1) {
      return dispatch({ type: types.GET_ALL_GROUPS_LIST, payload: response });
    }
  } catch (error) {
    throw error;
  }
};

/******************** 
@purpose : Used for get Requested groups list
@Parameter : { data, dispatch }
@Author : INIC
******************/
export const getRequestedGroupsList = (data) => async (dispatch) => {
  try {
    const response = await post(
      { serviceURL: USER_API_URL },
      // ALL_GROUPS_REQUESTED,
      GROUPS_PRIVATE_REQUESTED_LIST,
      false,
      data,
      true
    );
    if (response.status === 1) {
      return dispatch({
        type: types.GET_REQUESTED_GROUPS_LIST,
        payload: response,
      });
    }
  } catch (error) {
    throw error;
  }
};

/******************** 
@purpose : Used for get Waiting groups list
@Parameter : { data, dispatch }
@Author : INIC
******************/
export const getWaitingList = (data) => async (dispatch) => {
  try {
    const response = await post(
      { serviceURL: USER_API_URL },
      ALL_GROUPS_REQUESTED,
      false,
      data,
      true
    );
    if (response.status === 1) {
      return dispatch({
        type: types.GET_WAITING_GROUPS_LIST,
        payload: response,
      });
    }
  } catch (error) {
    throw error;
  }
};

/******************** 
@purpose : Used for delete group
@Parameter : { data, dispatch }
@Author : INIC
******************/
export const deleteGroup = (id) => async (dispatch) => {
  try {
    const response = await remove(
      { serviceURL: USER_API_URL },
      `${DELETE_GROUP}${id}`,
      true,
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

/******************** 
@purpose : Used for fetching group details
@Parameter : { id, dispatch }
@Author : INIC
******************/
export const getGroupDetails = (id) => async (dispatch) => {
  try {
    const response = await get(
      { serviceURL: USER_API_URL },
      `${GROUP_DETAILS}${id}`,
      false,
      true
    );
    if (response.status === 1) {
      return dispatch({
        type: types.GET_GROUP_DETAILS,
        payload: response.data,
      });
    }
  } catch (error) {
    throw error;
  }
};

/******************** 
@purpose : Used for fetching group details
@Parameter : { id }
@Author : YLIWAY
******************/
export const getGroupDetailsByID = async (id) => {
  try {
    const response = await get(
      { serviceURL: USER_API_URL },
      `${GROUP_DETAILS}${id}`,
      false,
      true
    );
    if (response.status === 1) {
      return response.data;
    }
    return {};
  } catch (error) {
    throw error;
  }
};

/******************** 
@purpose : Used for get groups joined list
@Parameter : { data, dispatch }
@Author : INIC
******************/
export const getGroupsJoinedList = (data, type) => async (dispatch) => {
  try {
    const response = await post(
      { serviceURL: USER_API_URL },
      GROUPS_JOINED_LIST,
      false,
      data,
      true
    );
    if (response.status === 1) {
      if (type === "profile") {
        return dispatch({
          type: types.PROFILE_GROUPS_LIST,
          payload: response,
        });
      } else {
        return dispatch({
          type: types.GET_GROUPS_JOINED_LIST,
          payload: response,
        });
      }
    }
  } catch (error) {
    throw error;
  }
};

/******************** 
@purpose : Used for get groups invite received list
@Parameter : { dispatch }
@Author : INIC
******************/
export const getGroupsInviteReceived = (data) => async (dispatch) => {
  try {
    const response = await post(
      { serviceURL: USER_API_URL },
      GROUPS_INVITE_RECEIVED,
      false,
      data,
      true
    );
    if (response.status === 1) {
      return dispatch({
        type: types.GET_GROUPS_INVITE_RECEIVED,
        payload: response,
      });
    }
  } catch (error) {
    throw error;
  }
};

/******************** 
@purpose : Used for accepted & rejected group
@Parameter : { data, dispatch }
@Author : INIC
******************/
export const groupsInviteAction = (data) => async (dispatch) => {
  try {
    const response = await post(
      { serviceURL: USER_API_URL },
      GROUPS_INVITE_ACTION,
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

/******************** 
@purpose : Used for withdraw
@Parameter : { data, dispatch }
@Author : INIC
******************/
export const GroupWithdraw = (id) => async (dispatch) => {
  try {
    const response = await get(
      { serviceURL: USER_API_URL },
      `${GROUPS_WITHDRAW}${id}`,
      true,
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

/******************** 
@purpose : Used for get groups my connection list
@Parameter : { data, dispatch }
@Author : INIC
******************/
export const getGroupsConnectionList = (data) => async (dispatch) => {
  try {
    const response = await post(
      { serviceURL: USER_API_URL },
      GROUPS_CONNECTION_LIST,
      false,
      data,
      true
    );
    if (response.status === 1) {
      return dispatch({
        type: types.GET_GROUPS_CONNECTION_LIST,
        payload: response.data,
      });
    }
  } catch (error) {
    throw error;
  }
};

/******************** 
@purpose : Used for clear Groups Connection List 
@Parameter : { }
@Author : INIC
******************/
export const clearGroupsConnectionList = () => (dispatch) => {
  return dispatch({ type: types.CLEAR_GROUPS_CONNECTION_LIST });
};

/******************** 
@purpose : Used for groups invite send
@Parameter : { data, dispatch }
@Author : INIC
******************/
export const groupsInviteSend = (data) => async (dispatch) => {
  try {
    const response = await post(
      { serviceURL: USER_API_URL },
      GROUPS_INVITE_SEND,
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

/******************** 
@purpose : Used for create group
@Parameter : { data, dispatch }
@Author : INIC
******************/
export const createGroup = (data) => async (dispatch) => {
  try {
    const response = await post(
      { serviceURL: USER_API_URL },
      CREATE_GROUP,
      false,
      data,
      true
    );
    if (response.status === 1) {
      // track event
      trackEvent("group_created", {
        name: response.data?.name,
      });
      return Promise.resolve(response);
    }
    return Promise.reject(response);
  } catch (error) {
    throw error;
  }
};

/******************** 
@purpose : Used for groups leave
@Parameter : { data, dispatch }
@Author : INIC
******************/
export const groupLeave = (data) => async (dispatch) => {
  try {
    const response = await post(
      { serviceURL: USER_API_URL },
      GROUPS_LEAVE,
      true,
      data,
      true
    );

    if (data.removedBy === "admin" && response.status === 1) {
      return dispatch({
        type: types.MEMBER_DELETE,
        payload: data.userId,
      });
    }
    if (data.removedBy === "self" && response.status === 1) {
      return Promise.resolve(response);
    }
    return Promise.reject(response);
  } catch (error) {
    throw error;
  }
};

/******************** 
@purpose : Used for groups leave
@Parameter : { data, dispatch }
@Author : INIC
******************/
export const groupJoinRequest = (data) => async (dispatch) => {
  try {
    const response = await post(
      { serviceURL: USER_API_URL },
      JOIN_PUBLIC_GROUP,
      true,
      data,
      true
    );
    if (response.status === 1) {
      // track event
      trackEvent("group_joined");
      return Promise.resolve(response);
    }
    return Promise.reject(response);
  } catch (error) {
    throw error;
  }
};

/******************** 
@purpose : Used for groups mute & unmute
@Parameter : { data, dispatch }
@Author : INIC
******************/
export const groupMuteUnmute = (data, type) => async (dispatch) => {
  try {
    const response = await post(
      { serviceURL: USER_API_URL },
      GROUPS_MUTEUNMUTE,
      true,
      data,
      true
    );
    if (response.status === 1) {
      if (type === "joinGroup") {
        return dispatch({ type: types.GROUPS_MUTE_UNMUTE, payload: data });
      }
      if (type === "myGroup") {
        return dispatch({ type: types.MYGROUPS_MUTE_UNMUTE, payload: data });
      }
    }
  } catch (error) {
    throw error;
  }
};

/******************** 
@purpose : Used for group Request Received
@Parameter : { data, dispatch }
@Author : INIC
******************/
export const groupRequestReceived = (data) => async (dispatch) => {
  try {
    const response = await post(
      { serviceURL: USER_API_URL },
      GROUPS_REQUEST_RECEIVED,
      false,
      data,
      true
    );
    if (response.status === 1) {
      // return dispatch({ type: types.REQUEST_RECEIVED, payload: response.data });
      return Promise.resolve(response.data);
    }
  } catch (error) {
    throw error;
  }
};

/******************** 
@purpose : Used for group Members
@Parameter : { data, dispatch }
@Author : INIC
******************/
export const groupMembers = (data) => async (dispatch) => {
  try {
    const response = await post(
      { serviceURL: USER_API_URL },
      GROUPS_MEMBERS,
      false,
      data,
      true
    );
    if (response.status === 1) {
      return dispatch({
        type: types.GROUP_MEMBERS_LIST,
        payload: response,
      });
    }
  } catch (error) {
    throw error;
  }
};

/******************** 
@purpose : Used for clear my group data
@Parameter : { }
@Author : INIC
******************/
export const clearMyGroupsData = () => (dispatch) => {
  return dispatch({ type: types.CLEAR_MYGROUP_DATA });
};

/******************** 
@purpose : Used for clear my group data
@Parameter : { }
@Author : INIC
******************/
export const clearGroupsData = () => (dispatch) => {
  return dispatch({ type: types.CLEAR_GROUP_DATA });
};

/******************** 
@purpose : Used for clear my group data
@Parameter : { }
@Author : INIC
******************/
export const clearGroupSearchData = () => (dispatch) => {
  return dispatch({ type: types.CLEAR_GROUP_SEARCH_DATA });
};

/******************** 
@purpose : Used for delete group
@Parameter : { }
@Author : INIC
******************/
export const setGroupIdToDelete = (data) => (dispatch) => {
  return dispatch({ type: types.SET_GROUP_ID_TO_DELETE, data });
};

/******************** 
@purpose : Used for MyGroup Details
@Parameter : { }
@Author : INIC
******************/
export const setMyGroupDetails = (data) => (dispatch) => {
  return dispatch({ type: types.SET_MYGROUP_DETAILS, data });
};

/******************** 
@purpose : Used for delete group member
@Parameter : { }
@Author : INIC
******************/
export const setMemberDetails = (data) => (dispatch) => {
  return dispatch({ type: types.SET_MEMBER_DETAILS, payload: data });
};
