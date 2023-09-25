import * as types from "@actions";

/******************* 
@purpose : Intital visibility reducer data
@Author : INIC
******************/
const initialState = {
  profileOptions: {},
  storyOptions: {},
  publicProfile: {},
  linksOptions: {},
  lastNameOptions: {},
  connectionOptions: {},
  tagsOptions: {},
  blockUserListing: [],
};

/******************* 
@purpose : visibility reducer
@Parameter : {visibility_ini_data, action}
@Author : INIC
******************/
const visibility = (state = initialState, action = {}) => {
  switch (action.type) {
    case types.GET_PROFILE_OPTIONS:
      return Object.assign({}, state, {
        profileOptions: action.payload,
      });
    case types.GET_STORY_OPTIONS:
      return Object.assign({}, state, {
        storyOptions: action.payload,
      });
    case types.GET_PUBLIC_PROFILE:
      return Object.assign({}, state, {
        publicProfile: action.payload,
      });
    case types.GET_LINKS_OPTIONS:
      return Object.assign({}, state, {
        linksOptions: action.payload,
      });
    case types.GET_LASTNAME_OPTIONS:
      return Object.assign({}, state, {
        lastNameOptions: action.payload,
      });
    case types.GET_CONNECTION_OPTIONS:
      return Object.assign({}, state, {
        connectionOptions: action.payload,
      });
    case types.GET_TAGS_OPTIONS:
      return Object.assign({}, state, {
        tagsOptions: action.payload,
      });
    case types.GET_BLOCK_USER_LIST:
      return Object.assign({}, state, {
        blockUserListing: action.payload,
      });
    default:
      return state;
  }
};

export default visibility;
