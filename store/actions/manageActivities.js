import { post, remove } from "api";
import * as types from "./types.js";
import { DELETE_ACTIVITY_LIST, GET_ACTIVITY_LIST } from "api/routes.js";
import { USER_API_URL } from "config/index.js";

/******************** 
@purpose : Used for get manage activity list
@Parameter : { data, dispatch }
@Author : INIC
******************/
export const manageActivity = (data) => async (dispatch) => {
  try {
    const response = await post(
      { serviceURL: USER_API_URL },
      GET_ACTIVITY_LIST,
      false,
      data,
      true
    );
    if (response.status === 1) {
      dispatch(setActivity(response.data));
      return Promise.resolve(response);
    }
  } catch (error) {
    throw error;
  }
};

/******************** 
@purpose : Used for delete activity
@Parameter : { data, dispatch }
@Author : INIC
******************/
export const deleteActivity = (id) => async (dispatch) => {
  try {
    const response = await remove(
      { serviceURL: USER_API_URL },
      DELETE_ACTIVITY_LIST + id,
      true,
      true
    );
    if (response.status === 1) {
      dispatch(manageActivity({ page: 1, pagesize: 6, searchText: "" }));
      return Promise.resolve(response);
    }
  } catch (error) {
    throw error;
  }
};

/******************* 
@purpose :  set Activity List
@Parameter : {value}
@Author : INIC
******************/
export const setActivity = (data) => ({
  type: types.GET_ACTIVITY_DATA,
  data,
});
