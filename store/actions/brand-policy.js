import * as types from "./types.js";
import { get } from "../../api";
import { BRAND_POLICY, BRAND_POLICY_IT } from "./../../api/routes";
import { ADMIN_API_URL } from "config/index.js";

export const getBrandInfo = (language) => async (dispatch) => {
  const brandRoutes = language == "it" ? BRAND_POLICY_IT : BRAND_POLICY;
  const res = await get(
    { serviceURL: ADMIN_API_URL },
    brandRoutes,
    false,
    true
  );

  if (res?.data) {
    dispatch(setBrandInfo(res.data));
    return Promise.resolve(res.data);
  }
  return Promise.reject(res);
};
/******************** 
@purpose : set Brand Policy Info
@Parameter : { }
@Author : INIC
******************/
export const setBrandInfo = (data) => ({
  type: types.SET_BRAND_INFO,
  data,
});