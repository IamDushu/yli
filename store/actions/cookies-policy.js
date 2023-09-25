import * as types from "./types.js";
import { get, post } from "../../api";
import { COOKIES_POLICY,COOKIES_POLICY_IT } from "./../../api/routes";
import { ADMIN_API_URL } from "config/index.js";

export const getCookiesInfo = (language) => async (dispatch) => {
  const cookiesRoutes = (language=="it")?COOKIES_POLICY_IT:COOKIES_POLICY;
  const res = await get(
    { serviceURL: ADMIN_API_URL },
    cookiesRoutes,
    false,
    true
  );

  if (res?.data) {
    dispatch(setCookiesInfo(res.data));
    return Promise.resolve(res.data);
  }
  return Promise.reject(res);
};
/******************** 
@purpose : set Cookies Policy Info
@Parameter : { }
@Author : INIC
******************/
export const setCookiesInfo = (data) => ({
  type: types.SET_COOKIES_INFO,
  data,
});