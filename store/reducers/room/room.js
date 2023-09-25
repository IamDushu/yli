import * as types from "@actions";

/******************* 
@purpose : Intital training room reducer data
@Author : INIC
******************/
const initialState = {
  roomList: [],
  bannerImage: "",
  previewVideo: "",
  roomDetail: {},
  languageList: [],
  configuration: {},
  trainingRoomList: [],
  eventList: [],
  webinarList: [],
  masterClassList: [],
  bnrList: [],
  coachingRoomList: []

};

/******************* 
@purpose : Training Room reducer
@Parameter : {trainingRoom_ini_data, action}
@Author : INIC
******************/
const TrainingRoom = (room_ini_data = initialState, action = {}) => {
  switch (action.type) {
    // Set Training room  information
    case types.SET_ROOM_LIST:
      return {
        ...room_ini_data,
        roomList: action.data,
      };
    //set Banner Image
    case types.SET_BANNER_IMAGE:
      return {
        ...room_ini_data,
        bannerImage: action.data,
      };
    //set Preview Video
    case types.SET_PREVIEW_VIDEO:
      return {
        ...room_ini_data,
        previewVideo: action.data,
      };
    //set Training room Detail
    case types.SET_ROOM_DETAILS:
      return {
        ...room_ini_data,
        roomDetail: action.data,
      };
    //set Training room Detail clear
    case types.SET_ROOM_DETAILS_CLEAR:
      return {
        ...room_ini_data,
        roomDetail: {},
      };
    //set Language List
    case types.SET_LANGUAGE_LIST:
      return {
        ...room_ini_data,
        languageList: action.data,
      };
    case types.SET_CONFIGURATION:
      return {
        ...room_ini_data,
        configuration: action.data,
      };
    case types.TRAINING_ROOM_LIST:
      return {
        ...room_ini_data,
        trainingRoomList: action.resData,
      }
    case types.EVENT_LIST:
      return {
        ...room_ini_data,
        eventList: action.resData,
      }
    case types.WEBINAR_LIST:
      return {
        ...room_ini_data,
        webinarList: action.resData,
      }
    case types.MASTER_CLASS_LIST:
      return {
        ...room_ini_data,
        masterClassList: action.resData,
      }
    case types.COACHING_ROOM_LIST:
      return {
        ...room_ini_data,
        coachingRoomList: action.resData,
      }
    case types.BNR_LIST:
      return {
        ...room_ini_data,
        bnrList: action.resData,
      }
    default:
      return room_ini_data;
  }
};
export default TrainingRoom;
