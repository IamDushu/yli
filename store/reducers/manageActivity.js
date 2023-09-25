import * as types from "@actions";

/******************* 
@purpose : Intital Manage Activity reducer data
@Author : INIC
******************/
const initialState = {
  manageActivity: [],
};

/******************* 
@purpose : Manage Activity reducer
@Parameter : {communication_ini_data, action}
@Author : INIC
******************/
const manageActivity = (
  manage_activity_ini_data = initialState,
  action = {}
) => {
  switch (action.type) {
    case types.GET_ACTIVITY_DATA:
      return Object.assign({}, manage_activity_ini_data, {
        manageActivity: action.data,
      });
    default:
      return manage_activity_ini_data;
  }
};

export default manageActivity;
