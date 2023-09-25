import * as types from "./types.js";
import { get, post } from "../../api/index.js";
import { INVESTOR_RELATION, INVESTOR_RELATION_IT } from "../../api/routes.js";
import { ADMIN_API_URL } from "config/index.js";

export const getInvesterRelationInfo = (language) => async (dispatch) => {
  const investorRoutes =
    language == "it" ? INVESTOR_RELATION_IT : INVESTOR_RELATION;
  const res = await get(
    { serviceURL: ADMIN_API_URL },
    investorRoutes,
    false,
    true
  );

  if (res?.data) {
    dispatch(setInvesterInfo(res.data));
    return Promise.resolve(res.data);
  }
  return Promise.reject(res);
};

export const setInvesterInfo = (data) => ({
  type: types.SET_INVEST_REL_INFO,
  data,
});
