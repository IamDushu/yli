import * as types from "@actions";

/******************* 
@purpose : Intital zoom reducer data
@Author : INIC
******************/
const initialState = {
  zoomData: "",
  getMedia: "",
  getRecord: "",
  zmClient: "",
  chatClient: "",
};

/******************* 
@purpose : zoom reducer
@Parameter : {initialState, action}
@Author : INIC
******************/
const zoom = (state = initialState, action = {}) => {
  switch (action.type) {
    case types.GET_ZOOM_DATA:
      return Object.assign({}, state, {
        zoomData: action.payload,
      });
    case types.GET_MEDIA_DATA:
      return Object.assign({}, state, {
        getMedia: action.data,
      });
    case types.GET_RECORDING_DATA:
      return Object.assign({}, state, {
        getRecord: action.data,
      });
    case types.GET_ZOOM_CLIENT_DATA:
      return Object.assign({}, state, {
        zmClient: action.data,
      });
    case types.GET_ZOOM_CHAT_DATA:
      return Object.assign({}, state, {
        chatClient: action.data,
      });
    case types.SET_ZOOM_DATA_CLEAR:
      return Object.assign({}, state, {
        zoomData: "",
      });

    default:
      return state;
  }
};

export default zoom;
