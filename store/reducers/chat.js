import * as types from "@actions";

/******************* 
@purpose : Intital chat reducer data
@Author : INIC
******************/
const initialState = {
  chatListing: [],
  messageListing: {},
  threadListing: [],
  searchUserData: [],
  channelMemeberList: [],
};

/******************* 
@purpose : Brand policy reducer
@Parameter : {chat_ini_data, action}
@Author : INIC
******************/
const chatReducer = (chat_ini_data = initialState, action = {}) => {
  switch (action.type) {
    case types.CHAT_LISTING:
      return { ...chat_ini_data, chatListing: action.data };
    case types.NEW_MESSAGE:
      const newState = { ...chat_ini_data };
      if (!newState.messageListing.posts) newState.messageListing.posts = {};
      newState.messageListing.posts[action.data.id] = action.data;
      return JSON.parse(JSON.stringify(newState));
    case types.MESSAGE_LISTING:
      return { ...chat_ini_data, messageListing: action.data };
    case types.THREAD_MESSAGE_LISTING:
      return { ...chat_ini_data, threadListing: action.data };
    case types.SEARCH_MESSAGE_USER:
      return { ...chat_ini_data, searchUserData: action.data };
    case types.PRIVATE_CHANNEL_MEMBERS:
      return { ...chat_ini_data, channelMemeberList: action.data };
    default:
      return chat_ini_data;
  }
};

export default chatReducer;
