import * as types from "./types.js";
import { get } from "../../api";
import { PRIVACY_POLICY, PRIVACY_POLICY_IT } from "./../../api/routes";
import { ADMIN_API_URL } from "config/index.js";

export const getPrivacyInfo = (language) => async (dispatch) => {
  const privacyRoutes = language == "it" ? PRIVACY_POLICY_IT : PRIVACY_POLICY;
  const res = await get(
    { serviceURL: ADMIN_API_URL },
    privacyRoutes,
    false,
    true
  );

  if (res?.data) {
    dispatch(setPrivacyInfo(res.data));
    return Promise.resolve(res.data);
  }
  return Promise.reject(res);
};
/******************** 
@purpose : set Testmonial Info
@Parameter : { }
@Author : INIC
******************/
export const setPrivacyInfo = (data) => ({
  type: types.SET_PRIVACY_INFO,
  data,
});
