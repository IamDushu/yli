import * as types from "./types.js";
import { get, post } from "../../api";
import { GETTING_STARTED, GETTING_STARTED_IT } from "./../../api/routes";
import { ADMIN_API_URL } from "config/index.js";

export const getStartedDetails = (language) => async (dispatch) => {
  const startedRoutes = language == "it" ? GETTING_STARTED_IT : GETTING_STARTED;
  const res = await get(
    { serviceURL: ADMIN_API_URL },
    startedRoutes,
    false,
    true
  );

  if (res?.data) {
    dispatch(setStartedDeatils(res.data));
    return Promise.resolve(res.data);
  }
  return Promise.reject(res);
};

/******************** 
@purpose : set Cookies Policy Info
@Parameter : { }
@Author : INIC
******************/
export const setStartedDeatils = (data) => ({
  type: types.SET_STARTED_DETAILS,
  data,
});
