import { post, put } from "api";
import * as types from "./types.js";
import {
  ADD_VISIBILITY_CONNECTION_STATUS,
  ADD_VISIBILITY_LAST_NAME,
  ADD_VISIBILITY_LINKS,
  ADD_VISIBILITY_PROFILE,
  ADD_VISIBILITY_PUBLIC_PROFILE,
  ADD_VISIBILITY_STORY,
  ADD_VISIBILITY_TAGS,
  GET_VISIBILITY_SETTING,
  BLOCK_USER_LIST,
  BLOCK_USER,
  UPDATE_ANONYMOUS_VISIBLITY,
} from "api/routes";
import { USER_API_URL } from "config";

/******************** 
@purpose : Used for add visibility profile
@Parameter : { data, dispatch }
@Author : INIC
******************/
export const addVisibilityProfile = (data) => async (dispatch) => {
  try {
    const response = await post(
      { serviceURL: USER_API_URL },
      ADD_VISIBILITY_PROFILE,
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
@purpose : Used for add visibility story
@Parameter : { data, dispatch }
@Author : INIC
******************/
export const addVisibilityStory = (data) => async (dispatch) => {
  try {
    const response = await post(
      { serviceURL: USER_API_URL },
      ADD_VISIBILITY_PROFILE,
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
@purpose : Used for add Public Profile
@Parameter : { data, dispatch }
@Author : INIC
******************/
export const addVisibilityPublicProfile = (data) => async (dispatch) => {
  try {
    const response = await post(
      { serviceURL: USER_API_URL },
      ADD_VISIBILITY_PUBLIC_PROFILE,
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
@purpose : Used for add visibility links
@Parameter : { data, dispatch }
@Author : INIC
******************/
export const addVisibilityLinks = (data) => async (dispatch) => {
  try {
    const response = await post(
      { serviceURL: USER_API_URL },
      ADD_VISIBILITY_LINKS,
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
@purpose : Used for add visibility last name
@Parameter : { data, dispatch }
@Author : INIC
******************/
export const addVisibilityLastName = (data) => async (dispatch) => {
  try {
    const response = await post(
      { serviceURL: USER_API_URL },
      ADD_VISIBILITY_LAST_NAME,
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
@purpose : Used for add visibility connection status
@Parameter : { data, dispatch }
@Author : INIC
******************/
export const addVisibilityConnectionStatus = (data) => async (dispatch) => {
  try {
    const response = await post(
      { serviceURL: USER_API_URL },
      ADD_VISIBILITY_CONNECTION_STATUS,
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
@purpose : Used for add visibility connection status
@Parameter : { data, dispatch }
@Author : INIC
******************/
export const addVisibilityTags = (data) => async (dispatch) => {
  try {
    const response = await post(
      { serviceURL: USER_API_URL },
      ADD_VISIBILITY_TAGS,
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
@purpose : Used for get visibility profile
@Parameter : { data, dispatch }
@Author : INIC
******************/
export const getSetting = (data) => async (dispatch) => {
  try {
    const response = await post(
      { serviceURL: USER_API_URL },
      GET_VISIBILITY_SETTING,
      false,
      data,
      true
    );
    if (data.key === "profile_options" && response.status === 1) {
      return dispatch({
        type: types.GET_PROFILE_OPTIONS,
        payload: response.data,
      });
    }
    if (data.key === "story_options" && response.status === 1) {
      return dispatch({
        type: types.GET_STORY_OPTIONS,
        payload: response.data,
      });
    }
    if (data.key === "public_profile_options" && response.status === 1) {
      return dispatch({
        type: types.GET_PUBLIC_PROFILE,
        payload: response.data,
      });
    }
    if (data.key === "links_options" && response.status === 1) {
      return dispatch({
        type: types.GET_LINKS_OPTIONS,
        payload: response.data,
      });
    }
    if (data.key === "last_name_options" && response.status === 1) {
      return dispatch({
        type: types.GET_LASTNAME_OPTIONS,
        payload: response.data,
      });
    }
    if (data.key === "connection_options" && response.status === 1) {
      return dispatch({
        type: types.GET_CONNECTION_OPTIONS,
        payload: response.data,
      });
    }
    if (data.key === "tags_options" && response.status === 1) {
      return dispatch({
        type: types.GET_TAGS_OPTIONS,
        payload: response.data,
      });
    }
  } catch (error) {
    throw error;
  }
};

/******************** 
@purpose : Used for block User List
@Parameter : { data, dispatch }
@Author : INIC
******************/
export const blockUserList = (data) => async (dispatch) => {
  try {
    const response = await post(
      { serviceURL: USER_API_URL },
      BLOCK_USER_LIST,
      false,
      data,
      true
    );
    if (response.status === 1) {
      return dispatch({
        type: types.GET_BLOCK_USER_LIST,
        payload: response.data,
      });
    }
  } catch (error) {
    throw error;
  }
};

/******************** 
@purpose : Used for block User 
@Parameter : { data, dispatch }
@Author : INIC
******************/
export const blockUser = (data) => async (dispatch) => {
  try {
    const response = await post(
      { serviceURL: USER_API_URL },
      BLOCK_USER,
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
@purpose : Used for make User anonymous 
@Parameter : { data, dispatch }
@Author : INIC
******************/
export const updateAnonymousUser = (data) => async (dispatch) => {
  try {
    const response = await put(
      { serviceURL: USER_API_URL },
      UPDATE_ANONYMOUS_VISIBLITY,
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
