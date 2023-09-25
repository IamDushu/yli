import * as types from "@actions";

/******************* 
@purpose : Intital notifications Reducer data
@Author : INIC
******************/
const initialState = {
  notifications: null,
};

/******************* 
@purpose : notifications Reducer
@Parameter : {testimonial_ini_data, action}
@Author : INIC
******************/
const notificationsReducer = (
  notification_ini_data = initialState,
  action = {}
) => {
  switch (action.type) {
    // Set notifications information
    case types.SET_NOTIFICATION_LIST:
      return Object.assign({}, notification_ini_data, {
        notifications: action.payload,
      });
    default:
      return notification_ini_data;
  }
};

export default notificationsReducer;
