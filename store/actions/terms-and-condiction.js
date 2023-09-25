import * as types from "./types.js";
import { get } from "../../api";
import { TERMS_AND_CONDITION, TERMS_AND_CONDITION_IT } from "./../../api/routes";
import { ADMIN_API_URL } from "config/index.js";

export const getTermsInfo = (language) => async (dispatch) => {
  const termsRoutes = language == "it" ? TERMS_AND_CONDITION_IT : TERMS_AND_CONDITION;
  const res = await get(
    { serviceURL: ADMIN_API_URL },
    termsRoutes,
    false,
    true
  );

  if (res?.data) {
    dispatch(setTermsInfo(res.data));
    return Promise.resolve(res.data);
  }
  return Promise.reject(res);
};
/******************** 
@purpose : set Testmonial Info
@Parameter : { }
@Author : INIC
******************/
export const setTermsInfo = (data) => ({
  type: types.SET_TERMS_INFO,
  data,
});
