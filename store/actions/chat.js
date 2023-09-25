import { get, image, post, put, remove } from "api";
import {
  ADD_CHANNEL_MEMBERS,
  CHAT_CREATE_CHANNEL,
  CHAT_CREATE_USER,
  CHAT_USER_LOGIN,
  CHAT_USER_SIGNUP,
  DELETE_MESSAGE_CHANNEL,
  EDIT_MESSAGE_CHANNEL,
  FILE_LISTING_MESSAGE,
  FILE_UPLOAD_MESSAGE,
  GET_CHANNELS_LIST,
  GET_MESSAGE_LIST,
  GET_THREAD_MESSAGES,
  GET_USER_BY_EMAIL,
  GET_USER_BY_ID,
  MM_FILE_UPLOAD,
  REPLY_MESSAGE_CHANNEL,
  SEND_MESSAGE,
  USER_SEARCH,
} from "api/routes";
import { trackEvent } from "@components/segment-analytics";

import { CHAT_API_URL } from "config";
import { CHAT_TEAM_ID } from "config/index.js";
import {
  getLocalStorage,
  setLocalStorage,
  showMessageNotification,
} from "utils";
import * as types from "./types.js"; // Redux actions payload types

/********************************************************
 * Create Redux Action for chat user login
 * @author INIC
 * @param {Array} payload
 * @returns {Object}
 ********************************************************/
export const chatLoginUser = (body) => async (dispatch) => {
  const res = await post(
    { serviceURL: CHAT_API_URL },
    CHAT_USER_LOGIN,
    false,
    body,
    true
  );
  if (res?.status === 1) {
    const mmLogin = {
      token: res?.data?.token,
      mmId: res?.data?.id,
      username: res?.data?.username,
    };
    setLocalStorage("mmLogin", JSON.stringify(mmLogin));
    return Promise.resolve(res.data);
  }
  return Promise.reject(res);
};

/********************************************************
 * Create Redux Action for chat user signup
 * @author INIC
 * @param {Array} payload
 * @returns {Object}
 ********************************************************/
export const chatSignupUser = (body, type) => async (dispatch) => {
  const res = await post(
    { serviceURL: CHAT_API_URL },
    CHAT_USER_SIGNUP,
    false,
    body,
    true
  );
  if (res?.status === 1) {
    const mmLogin = {
      token: res?.data?.token,
      mmId: res?.data?.id,
      username: res?.data?.username,
    };
    if (type !== "profile") {
      setLocalStorage("mmLogin", JSON.stringify(mmLogin));
    } else {
      showMessageNotification(res.reason);
    }
    return Promise.resolve(res.data);
  }
  return Promise.reject(res);
};

/********************************************************
 * Create Redux Action for create chat user
 * @author INIC
 * @param {Array} payload
 * @returns {Object}
 ********************************************************/
export const chatCreateUser = async (body) => {
  const res = await post(
    { serviceURL: CHAT_API_URL },
    CHAT_CREATE_USER,
    false,
    body,
    true,
    { key: "chat" }
  );
  if (res?.status === 1) {
    return Promise.resolve(res.data);
  } else {
    showMessageNotification(res.reason);
  }
  return Promise.reject(res);
};

/********************************************************
 * Create Redux Action for get user by email
 * @author INIC
 * @param {Array} payload
 * @returns {Object}
 ********************************************************/
export const getUserByEmail = (email) => async () => {
  const res = await get(
    { serviceURL: CHAT_API_URL },
    GET_USER_BY_EMAIL + email,
    false,
    true,
    { key: "chat" }
  );
  if (res?.status === 1) {
    return Promise.resolve(res.data);
  } else {
    showMessageNotification(res.reason);
  }
  return Promise.reject(res);
};

/********************************************************
 * get user details by user id
 * @author INIC
 * @param {Array} payload
 * @returns {Promise<Object>}
 ********************************************************/
export const getUserById = async (id) => {
  const res = await get(
    { serviceURL: CHAT_API_URL },
    GET_USER_BY_ID + id,
    false,
    true,
    { key: "chat" }
  );
  if (res?.status === 1) {
    return res.data;
  } else {
    showMessageNotification(res.reason);
  }
  return Promise.reject(res);
};

/********************************************************
 * Create Redux Action for chat list
 * @author INIC
 * @param {Array} payload
 * @returns {Object}
 ********************************************************/
export const getChatListing = () => async (dispatch) => {
  let mmLogin = getLocalStorage("mmLogin");
  if (mmLogin && typeof mmLogin === "string") {
    mmLogin = JSON.parse(mmLogin);
  }
  const res = await get(
    { serviceURL: CHAT_API_URL },
    GET_CHANNELS_LIST + mmLogin?.mmId + "/" + CHAT_TEAM_ID,
    false,
    true,
    { key: "chat" }
  );
  if (res?.status === 1) {
    dispatch(setChatListing(res.data));
    return Promise.resolve(res.data);
  } else {
    showMessageNotification(res.reason);
  }
  return Promise.reject(res);
};
/********************************************************
 * Create Redux Action to set chat list
 * @author INIC
 * @param {Array} payload
 * @returns {Object}
 ********************************************************/

export const setChatListing = (data) => ({
  type: types.CHAT_LISTING,
  data,
});
/********************************************************
 * Create Redux Action for create channel
 * @author INIC
 * @param {Array} payload
 * @returns {Object}
 ********************************************************/
export const chatCreateChannel = (body) => async () => {
  const res = await post(
    { serviceURL: CHAT_API_URL },
    CHAT_CREATE_CHANNEL,
    false,
    body,
    true,
    { key: "chat" }
  );
  if (res?.status === 1) {
    return Promise.resolve(res.data);
  } else {
    showMessageNotification(res.reason);
  }
  return Promise.reject(res);
};
/********************************************************
 * Create Redux Action for message list
 * @author INIC
 * @param {Array} payload
 * @returns {Object}
 ********************************************************/
export const getMessageListing = (channelId) => async (dispatch) => {
  const res = await get(
    { serviceURL: CHAT_API_URL },
    GET_MESSAGE_LIST + channelId + "/" + "messages",
    false,
    true,
    { key: "chat" }
  );
  if (res?.status === 1) {
    dispatch(setMessageListing(res.data));
    return Promise.resolve(res.data);
  } else {
    showMessageNotification(res.reason);
  }
  return Promise.reject(res);
};
/********************************************************
 * Create Redux Action to set message list
 * @author INIC
 * @param {Array} payload
 * @returns {Object}
 ********************************************************/

export const setMessageListing = (data) => ({
  type: types.MESSAGE_LISTING,
  data,
});

export const newMessage = (data) => ({
  type: types.NEW_MESSAGE,
  data,
});

/********************************************************
 * Create Redux Action for create channel
 * @author INIC
 * @param {Array} payload
 * @returns {Object}
 ********************************************************/
export const sendMessage = (body) => async () => {
  const res = await post(
    { serviceURL: CHAT_API_URL },
    SEND_MESSAGE,
    false,
    body,
    true,
    { key: "chat" }
  );
  if (res?.status === 1) {
    return Promise.resolve(res.data);
  } else {
    showMessageNotification(res.reason);
  }
  return Promise.reject(res);
};

/********************************************************
 * Create Redux Action for create channel
 * @author INIC
 * @param {Array} payload
 * @returns {Object}
 ********************************************************/
export const searchUserInChat = (body) => async (dispatch) => {
  const res = await post(
    { serviceURL: CHAT_API_URL },
    USER_SEARCH,
    false,
    body,
    true,
    { key: "chat" }
  );
  if (res?.status === 1) {
    dispatch(setSearchUser(res.data));
    return Promise.resolve(res.data);
  } else {
    showMessageNotification(res.reason);
  }
  return Promise.reject(res);
};
/********************************************************
 * Create Redux Action to set search user
 * @author INIC
 * @param {Array} payload
 * @returns {Object}
 ********************************************************/

export const setSearchUser = (data) => ({
  type: types.SEARCH_MESSAGE_USER,
  data,
});

/********************************************************
 * Create Redux Action for delete a message
 * @author INIC
 * @param {Array} payload
 * @returns {Object}
 ********************************************************/
export const deleteMessageListing = (id) => async (dispatch) => {
  const res = await remove(
    { serviceURL: CHAT_API_URL },
    DELETE_MESSAGE_CHANNEL + id,
    false,
    true,
    { key: "chat" }
  );
  if (res?.status === 1) {
    trackEvent("message_deleted"); // track segment event
    return Promise.resolve(res.data);
  } else {
    showMessageNotification(res.reason);
  }
  return Promise.reject(res);
};

/********************************************************
 * Create Redux Action for edit message
 * @author INIC
 * @param {Array} payload
 * @returns {Object}
 ********************************************************/
export const editMessageInChannel = (body, id) => async (dispatch) => {
  const res = await put(
    { serviceURL: CHAT_API_URL },
    EDIT_MESSAGE_CHANNEL + id,
    false,
    body,
    true,
    { key: "chat" }
  );
  if (res?.status === 1) {
    return Promise.resolve(res.data);
  } else {
    showMessageNotification(res.reason);
  }
  return Promise.reject(res);
};
/********************************************************
 * Create Redux Action for reply a message
 * @param {Array} payload
 * @returns {Object}
 ********************************************************/
export const replyMessage = (body) => async (dispatch) => {
  const res = await post(
    { serviceURL: CHAT_API_URL },
    REPLY_MESSAGE_CHANNEL,
    false,
    body,
    true,
    { key: "chat" }
  );
  if (res?.status === 1) {
    trackEvent("message_sent_reply"); // track segment event
    return Promise.resolve(res.data);
  } else {
    showMessageNotification(res.reason);
  }
  return Promise.reject(res);
};

/********************************************************
 * Create action to fetch thread messages
 * @param {Object} payload
 * @returns {Object}
 ********************************************************/
export const setThreadMessages = (data) => ({
  type: types.THREAD_MESSAGE_LISTING,
  data,
});

export const getThreadMessages = (messageId) => async (dispatch) => {
  const res = await get(
    { serviceURL: CHAT_API_URL },
    GET_THREAD_MESSAGES + messageId,
    false,
    true,
    { key: "chat" }
  );
  if (res?.status === 1) {
    const posts = res.data?.posts ? Object.values(res.data?.posts) : [];
    dispatch(setThreadMessages(posts));
    return Promise.resolve(res.data);
  } else {
    showMessageNotification(res.reason);
  }
  return Promise.reject(res);
};

/********************************************************
 * Create Redux Action for reply a message
 * @param {Array} payload
 * @returns {Object}
 ********************************************************/
export const fileUploadMM = (body) => async (dispatch) => {
  const res = await image(
    { serviceURL: CHAT_API_URL },
    MM_FILE_UPLOAD,
    false,
    body,
    true,
    { key: "chat" }
  );
  if (res?.status === 1) {
    return Promise.resolve(res.data);
  } else {
    showMessageNotification(res.reason);
  }
  return Promise.reject(res);
};

/********************************************************
 * Create Redux Action for upload message with a file
 * @param {Array} payload
 * @returns {Object}
 ********************************************************/
export const fileUploadMessage = (body) => async (dispatch) => {
  const res = await post(
    { serviceURL: CHAT_API_URL },
    FILE_UPLOAD_MESSAGE,
    false,
    body,
    true,
    { key: "chat" }
  );
  if (res?.status === 1) {
    return Promise.resolve(res.data);
  } else {
    showMessageNotification(res.reason);
  }
  return Promise.reject(res);
};

/********************************************************
 * Create Redux Action for showing the file
 * @param {Array} payload
 * @returns {Object}
 ********************************************************/
export const getFileInListing = async (fileId) => {
  const res = await get(
    { serviceURL: CHAT_API_URL },
    FILE_LISTING_MESSAGE + fileId,
    false,
    true,
    { key: "chat" }
  );
  if (res?.status === 1) {
    return Promise.resolve(res.data);
  } else {
    showMessageNotification(res.reason);
  }
  return Promise.reject(res);
};

/********************************************************
 * Create Redux Action for upload message with a file
 * @param {Array} payload
 * @returns {Object}
 ********************************************************/
export const addChannelMembers = (body, channelId) => async () => {
  const res = await post(
    { serviceURL: CHAT_API_URL },
    `${ADD_CHANNEL_MEMBERS}/${channelId}/member`,
    false,
    body,
    true,
    { key: "chat" }
  );
  if (res?.status === 1) {
    return Promise.resolve(res.data);
  } else {
    showMessageNotification(res.reason);
  }
  return Promise.reject(res);
};
/********************************************************
 * Create Redux Action for get member list
 * @param {Array} payload
 * @returns {Object}
 ********************************************************/
export const getChannelMembers = (channelId) => async (dispatch) => {
  const res = await get(
    { serviceURL: CHAT_API_URL },
    GET_MESSAGE_LIST + channelId + "/" + "members",
    false,
    true,
    { key: "chat" }
  );
  if (res?.status === 1) {
    dispatch(setChannelMembers(res.data));
    return Promise.resolve(res.data);
  } else {
    showMessageNotification(res.reason);
  }
  return Promise.reject(res);
};

export const setChannelMembers = (data) => ({
  type: types.PRIVATE_CHANNEL_MEMBERS,
  data,
});
