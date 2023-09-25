import * as types from "@actions";

/******************* 
@purpose : Intital yli-meet reducer data
******************/
const initialState = {
  instantMeetingDetail: null,
};

/******************* 
@purpose : Yli-meet reducer
@Parameter : {yliMeetRoom_ini_data, action}
******************/
const YliMeet = (yliMeet_ini_data = initialState, action = {}) => {
  switch (action.type) {
    //set Yli-Meet room Detail
    case types.SET_YLIMEET_INSTANT_MEETING_DETAILS:
      return {
        ...yliMeet_ini_data,
        instantMeetingDetail: action.data ? {...action.data} : null,
      };
    default:
      return yliMeet_ini_data;
  }
};

export default YliMeet;
