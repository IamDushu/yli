import * as types from "@actions";
import { getCookie } from "@utils"; //Utility functions
import { getUpdatedUserInfo } from "../utils/user";
import { getLocalStorage, getSession } from "utils";
/******************* 
@purpose : Intital user reducer data
@Author : INIC
******************/
const entityData = getLocalStorage("entityDetail");
const initialState = {
  token: getCookie("token"),
  refreshToken: getCookie("refreshToken"),
  userInfo: getCookie("userInfo"),
  instituteDetails: getCookie("instituteDetails"),
  companyDetails: getCookie("companyDetails"),
  verifyType: getCookie("verifyType"),
  countData: null,
  isLoggingIn: false,
  loggedInUserId: "",
  userFullInfo: {},
  checkPendingRequest: {},
  allowSignup: false,
  userYliwayCertificates: [],
  userEntityDetails: entityData || {},
  monetisationFeatureList: [],
  monetisationPlanList: [],
  monetisationPlanDetails: [],
  lastPurchasedPlanDetails: [],
  monetisationPurchasedFeatureList: [],
};

/******************* 
@purpose : ui reducer
@Parameter : {user_ini_data, action}
@Author : INIC
******************/
const user = (user_ini_data = initialState, action = {}) => {
  switch (action.type) {
    // Set user authorized token
    case types.SET_TOKEN:
      return Object.assign({}, user_ini_data, {
        token: action.token,
      });
    // Remove user authorized token
    case types.REMOVE_TOKEN:
      return Object.assign({}, user_ini_data, {
        token: false,
      });
    // Set user refresh token
    case types.SET_REFRESH_TOKEN:
      return Object.assign({}, user_ini_data, {
        refreshToken: action.token,
      });
    // Remove user refresh token
    case types.REMOVE_REFRESH_TOKEN:
      return Object.assign({}, user_ini_data, {
        refreshToken: false,
      });

    // Set user verification type
    case types.SET_VERIFY_TYPE:
      return Object.assign({}, user_ini_data, {
        verifyType: action.verifyType,
      });
    // Remove user verification type
    case types.REMOVE_VERIFY_TYPE:
      return Object.assign({}, user_ini_data, {
        verifyType: "",
      });
    // Set login user information
    case types.SET_USER_INFO:
      return Object.assign({}, user_ini_data, {
        userInfo: action.data,
      });
    case types.SET_USER_FULL_INFO:
      return Object.assign({}, user_ini_data, {
        userFullInfo: action.data,
      });
    case types.UPDATE_USER_INFO:
      return Object.assign({}, user_ini_data, {
        userInfo: { ...user_ini_data.userInfo, ...action.data },
      });

    case types.UPDATE_CURRENT_USER_INFO:
      return Object.assign({}, user_ini_data, {
        userInfo: getUpdatedUserInfo(user_ini_data.userInfo, action.payload),
      });
    case types.SET_INSTITUTE_DETAILS:
      return Object.assign({}, user_ini_data, {
        instituteDetails: action.payload,
      });
    case types.SET_COMPANY_DETAILS:
      return Object.assign({}, user_ini_data, {
        companyDetails: action.payload,
      });
    case types.SET_CURRENT_USER_COUNT_DATA:
      return Object.assign({}, user_ini_data, { countData: action.payload });
    case types.LOGGED_SUCCEEDED:
      return Object.assign({}, user_ini_data, { countData: action.payload });
    case types.SET_CHECK_PENDING_REQUEST:
      return Object.assign({}, user_ini_data, {
        checkPendingRequest: action.data,
      });
    case types.ALLOW_SIGNUP:
      return Object.assign({}, user_ini_data, {
        allowSignup: action.payload,
      });
    case types.SET_YLIWAY_USER_CERTIFICATE:
      return Object.assign({}, user_ini_data, {
        userYliwayCertificates: action.data,
      });
    case types.SET_ENTITY_DETAILS:
      return Object.assign({}, user_ini_data, {
        userEntityDetails: action.data,
      });
    case types.SET_MONITISATION_FEATURE_LIST:
      return Object.assign({}, user_ini_data, {
        monetisationFeatureList: action.data,
      });
    case types.SET_MONITISATION_PLAN_LIST:
      return Object.assign({}, user_ini_data, {
        monetisationPlanList: action.data,
      });
    case types.SET_MONITISATION_PLAN_DETAILS:
      return Object.assign({}, user_ini_data, {
        monetisationPlanDetails: action.data,
      });
    case types.SET_LAST_PURCHASED_PLAN_DETAILS:
      return Object.assign({}, user_ini_data, {
        lastPurchasedPlanDetails: action.data,
      });
    case types.SET_MONITISATION_PURCHASED_FEATURE_LIST:
      return Object.assign({}, user_ini_data, {
        monetisationPurchasedFeatureList: action.data,
      });
    case types.CLEAR_STATE:
      return {
        token: "",
        refreshToken: "",
        userInfo: "",
        verifyToken: "",
        countData: null,
      };
    default:
      return user_ini_data;
  }
};

export default user;
