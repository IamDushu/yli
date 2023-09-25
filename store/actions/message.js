import { post } from "api/index.js";
import { SEND_MESSAGE_NOTIFICATION } from "api/routes.js";
import { NOTIFICATION_API_URL } from "config/index.js";
import { getCookie } from "utils/functions.js";

import * as types from "./types.js";

/******************** 
@purpose : Used for socket details
@Parameter : { data}
@Author : INIC
******************/
export const setSocketDetails = (data) => {
  return {
    type: types.SET_SOCKET_CONNECTION_DETAILS,
    data,
  };
};

/******************** 
@purpose : Used for ychat socket details
@Parameter : { data}
@Author : INIC
******************/
export const setYChatSocketDetails = (data) => {
  return {
    type: types.SET_YCHAT_SOCKET_CONNECTION_DETAILS,
    data,
  };
};

/******************** 
@purpose : Used for current Channel
@Parameter : { data }
@Author : INIC
******************/
export const setChannelListDetails = (data) => {
  return {
    type: types.SET_CHANNEL_LIST,
    data,
  };
};

/******************** 
@purpose : Used for current Channel
@Parameter : { data }
@Author : INIC
******************/
export const setCurrentChannelDetail = (data) => {
  return {
    type: types.SET_CURRENT_CHANNEL_DETAILS,
    data,
  };
};

/******************** 
@purpose : Used for current Channel
@Parameter : { data }
@Author : INIC
******************/
export const updateChannelDetails = (data) => {
  const userInfo = getCookie("userInfo");
  const id = JSON.parse(userInfo).id;
  const data1 = {
    ...data,
    userId: id,
  };
  return {
    type: types.UPDATE_CHANNEL_DETAIL,
    data: data1,
  };
};
/******************** 
@purpose : Used for update currentChannel
@Parameter : { data }
@Author : INIC
******************/
export const updateCurrentChannelDetails = (data) => {
  return {
    type: types.UPDATE_CURRENT_CHANNEL_DETAIL,
    data,
  };
};

/******************** 
@purpose : Used for joined Channel details
@Parameter : { data }
@Author : INIC
******************/
export const setJoinedChannelRefetchDetail = (data) => {
  return {
    type: types.SET_JOINED_CHANNEL_REFETCH,
    data,
  };
};

/******************** 
@purpose : Used for joined Channel details
@Parameter : { data }
@Author : INIC
******************/
export const setJoinedChannelDetail = (data) => {
  return {
    type: types.SET_JOINED_CHANNEL_LIST,
    data,
  };
};

/******************** 
@purpose : Used for send Notification to User
@Parameter : { data }
@Author : INIC
******************/

export const sendNotificationToUser = (data) => async (dispatch) => {
  try {
    const response = await post(
      { serviceURL: NOTIFICATION_API_URL },
      SEND_MESSAGE_NOTIFICATION,
      false,
      data,
      true
    );
  } catch (error) {
    throw error;
  }
};

/******************** 
@purpose : Used for set last message in channel metadata 
@Parameter : { data }
@Author : INIC
******************/
export const lastMessage = (data) => {
  return {
    type: types.LAST_MESSAGE,
    data,
  };
};

/******************** 
@purpose : Used for get online member
@Parameter : { data }
@Author : INIC
******************/
export const onlineMembers = (data) => {
  return {
    type: types.ONLINE_MEMBERS,
    data,
  };
};

/******************** 
@purpose : Used for update channel list
@Parameter : { data }
@Author : INIC
******************/
export const updateChannelList = (data) => {
  return {
    type: types.SET_UPDATE_CHANNEL_LIST,
    data,
  };
};

/******************** 
@purpose : Used for update channel list
@Parameter : { data }
@Author : INIC
******************/
export const messageCount = (data) => {
  return {
    type: types.SET_MESSAGE_COUNT,
    data,
  };
};

/******************** 
@purpose : Used for move channel to top
@Parameter : { data }
@Author : INIC
******************/
export const sendMessage = (data) => {
  return {
    type: types.SET_SEND_MESSAGE,
    data,
  };
};
