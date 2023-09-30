import { get, image, linkedinGet, post, put } from "../../api"; // API Types
import * as types from "./types.js"; // Redux actions payload types
import Routes, {
  FILE_UPLOAD,
  MY_PROFILE,
  UPDATE_USER_DETAILS,
  PROFILE_COUNT,
  PROFILE_VIEWED,
  PROFILE_SEARCH,
  GET_LEARNING_INSTITUTE_DETAILS,
  CHECK_PENDING_REQUEST,
  YLIWAY_USER_CERTIFICATE,
  MONETISATION_FEATURE_LIST,
  PURCHASE_MONETISATION_FEATURE,
  MONETISATION_PURCHASED_FEATURE_LIST,
  MONETISATION_PLAN_LIST,
  PURCHASE_MONETISATION_PLAN,
  LINKEDIN_ME,
  UNSUBSCRIBE_MONETISATION_PLAN,
  GET_COMPANY_DETAILS,
  GET_BILLING_INFO,
  YLIWAY_USER_ENTITY_ID,
  YLIWAY_USER_ENTITY_DETAILS,
  MONETISATION_PLAN_DETAILS,
  LAST_PURCHASED_PLAN_DETAILS,
  UPDATE_COMPANY_ROLE_INVITATION_STATUS,
  UPDATE_LI_ROLE_INVITATION_STATUS,
  SECURITY_ACTIVITIES,
  NEW_LOGINS,
} from "./../../api/routes"; // API endpoint routes
import { setExperience } from "./experience";
import {
  ADMIN_API_URL,
  AUTH_API_URL,
  IMAGE_URL,
  LINKEDIN_API_URL,
  USER_API_URL,
} from "../../config";
import {
  GET_GROUPS_JOINED_LIST,
  SET_CURRENT_USER_CERTIFICATION,
  SET_CURRENT_USER_COUNT_DATA,
  SET_CURRENT_USER_EDUCATION,
  SET_CURRENT_USER_LANGUAGE,
  UPDATE_CURRENT_USER_INFO,
  SET_INSTITUTE_DETAILS,
} from ".";
import {
  getCookie,
  setCookie,
  setLocalStorage,
  setSession,
  showMessageNotification,
  USER_IMAGE_TYPES,
} from "../../utils";
import { setActivity, setActivityFollowerCount } from "./activity";
const { USER_DETAILS } = Routes;

export const updateRoleInvitationStatus =
  (type, status, auth, roleId, notificationId) => async () => {
    let url = "";
    if (type === "learningInstitute") {
      url = UPDATE_LI_ROLE_INVITATION_STATUS + `?instituteRoleId=${roleId}`;
    } else if (type === "company") {
      url = UPDATE_COMPANY_ROLE_INVITATION_STATUS + `?companyRoleId=${roleId}`;
    }
    url += `&status=${status}&auth=${auth}&notificationId=${notificationId}`;
    const response = await get({ serviceURL: USER_API_URL }, url, false, true);
    showMessageNotification(response?.message);
    if (response.status === 1) {
      return Promise.resolve(response?.message);
    }
    return Promise.reject();
  };

/******************** 
@purpose : Used for get user information
@Parameter : { data, dispatch }
@Author : INIC
******************/
export const getUserInfo = () => (dispatch) => {
  return get(USER_DETAILS).then((res) => {
    if (res.data) {
      dispatch(setUserInfo(res.data));
    }
    return Promise.reject(res);
  });
};
/******************** 
@purpose : Used for store logout responce and remove token in cookie
@Parameter : { }
@Author : INIC
******************/
export const setUserInfo = (data) => ({
  type: types.SET_USER_INFO,
  data,
});
/******************** 
@purpose : Used for store logout responce and remove token in cookie
@Parameter : { }
@Author : INIC
******************/
export const setUserFullInfo = (data) => ({
  type: types.SET_USER_FULL_INFO,
  data,
});

/********************************************************
 * Create Redux Action to set user profile count data
 * @author INIC
 * @param {Object} payload count data
 * @returns {Object}
 ********************************************************/
export const setUserCountData = (payload) => ({
  type: SET_CURRENT_USER_COUNT_DATA,
  payload,
});

/********************************************************
 * Create Redux Action to set user joined groups
 * @author INIC
 * @param {Object} payload
 * @returns {Object}
 ********************************************************/
export const setUserJoinedGroupData = (payload) => ({
  type: GET_GROUPS_JOINED_LIST,
  payload,
});

/********************************************************
 * Create Redux Action to set user education data
 * @author INIC
 * @param {Array} payload
 * @returns {Object}
 ********************************************************/
export const setEducationData = (payload) => ({
  type: SET_CURRENT_USER_EDUCATION,
  payload,
});

/********************************************************
 * Create Redux Action to set user language skills
 * @author INIC
 * @param {Array} payload
 * @returns {Object}
 ********************************************************/
export const setLanguageData = (payload) => ({
  type: SET_CURRENT_USER_LANGUAGE,
  payload,
});

/********************************************************
 * Create Redux Action to set user certification data
 * @author INIC
 * @param {Array} payload
 * @returns {Object}
 ********************************************************/
export const setCertificateData = (payload) => ({
  type: SET_CURRENT_USER_CERTIFICATION,
  payload,
});

/********************************************************
 * Create Redux Action to fetch user profile
 * @author INIC
 * @returns {Function}
 ********************************************************/
export const getUserProfileData = () => async (dispatch) => {
  const response = await post(
    { serviceURL: AUTH_API_URL },
    MY_PROFILE,
    false,
    {},
    true
  );
  if (response.status === 1) {
    dispatch(setUserFullInfo({ ...response.data }));
    const countData = {
      growthConnectionsCount: 0,
      connectionsCount: 0,
      totalViews: 0,
      totalLikes: 0,
      totalShares: 0,
      profileViews: 0,
      publishedPostsCount: 0,
      totalPostCount: 0,
    };
    for (const key in countData) {
      if (key in response.data) {
        countData[key] = response.data[key];
        delete response.data[key];
      }
    }
    // dispatch(setUserCountData(countData));
    dispatch(setExperience(response.data.experience));
    delete response.data.experience;

    dispatch(setCertificateData(response.data.certificate));
    delete response.data.certificate;

    dispatch(setEducationData(response.data.educationDetails));
    delete response.data.educationDetails;

    dispatch(setActivity(response.data.activity));
    dispatch(setActivityFollowerCount(response.data.activityFollowerCount));
    delete response.data.activity;
    delete response.data.activityFollowerCount;

    dispatch(setUserJoinedGroupData(response.data.joinedGroups));
    delete response.data.joinedGroups;

    dispatch(setLanguageData(response.data.languageSkills));
    delete response.data.languageSkills;
    dispatch(setUserInfo(response.data));
  }
};

/*
@purpose getting security activities
*/
export const getSecurityActivities = async (payload) => {
  const response = await post(
    { serviceURL: AUTH_API_URL },
    SECURITY_ACTIVITIES,
    false,
    payload,
    true
  );
  if (response.status) {
    return Promise.resolve(response.data);
  } else {
    return Promise.reject(response.data);
  }
};

/*
@purpose getting recently new logins
*/
export const getRecentlyNewLogins = async (payload) => {
  const response = await post(
    { serviceURL: AUTH_API_URL },
    NEW_LOGINS,
    false,
    payload,
    true
  );
  if (response.status) {
    return Promise.resolve(response.data);
  } else {
    return Promise.reject(response.data);
  }
};

/********************************************************
 * Create Redux Action to get institute details
 * @author INIC
 * @returns {Function}
 ********************************************************/
export const getInstituteDetails = () => async (dispatch) => {
  const response = await get(
    { serviceURL: USER_API_URL },
    GET_LEARNING_INSTITUTE_DETAILS,
    false,
    true
  );
  if (response.status === 1) {
    dispatch(setInstituteDetails(response.data));

    setCookie("instituteDetails", response.data);
    return Promise.resolve(response.data);
  }
  return Promise.reject(response);
};

export const setInstituteDetails = (payload) => ({
  type: SET_INSTITUTE_DETAILS,
  payload,
});

/********************************************************
 * Create Redux Action to fetch user profile
 * @author INIC
 * @returns {Function}
 ********************************************************/
export const getProfileCountData = (id) => async (dispatch) => {
  const response = await get(
    { serviceURL: USER_API_URL },
    PROFILE_COUNT + id,
    false,
    true
  );

  if (response.status === 1) {
    dispatch(setUserCountData(response.data));
  }
};

/********************************************************
 * Create Redux Action for profile viewed
 * @author INIC
 * @returns {Function}
 ********************************************************/
export const profileViewed = (id) => async (dispatch) => {
  const response = await get(
    { serviceURL: USER_API_URL },
    PROFILE_VIEWED + id,
    false,
    true
  );
};
/*** getting billing info api ***/
export const getBillingInfo = async () => {
  try {
    const response = await get(
      { serviceURL: USER_API_URL },
      GET_BILLING_INFO,
      false,
      true
    );
    if (response.status === 1) {
      return Promise.resolve(response?.data);
    }
    return Promise.reject();
  } catch (error) {
    return Promise.reject(e);
  }
};

/********************************************************
 * Create Redux Action for profile viewed
 * @author INIC
 * @returns {Function}
 ********************************************************/
export const profileSearch = (body) => async (dispatch) => {
  const response = await post(
    { serviceURL: USER_API_URL },
    PROFILE_SEARCH,
    false,
    body,
    true
  );
};

/********************************************************
 * Create Redux Action to add or edit user profile description
 * @author INIC
 * @param {Object} payload experience data
 * @param {Function} [cb] callback function
 * @returns {Promise}
 ********************************************************/
export const updateUserInfo =
  (payload, cb, show = true) =>
  async (dispatch) => {
    const response = await post(
      { serviceURL: AUTH_API_URL },
      UPDATE_USER_DETAILS,
      show,
      payload,
      true
    );
    if (response.status === 1) {
      dispatch({ type: UPDATE_CURRENT_USER_INFO, payload });
      console.log("in here 1");
      if (typeof cb === "function") cb();
      console.log("in here");
      return Promise.resolve(response);
    } else {
      return Promise.reject(response);
    }
  };

/********************************************************
 * Create Redux Action to update user images
 * @author INIC
 * @param {Object} payload experience data
 * @param {Function} [cb] callback function
 * @returns {Promise}
 ********************************************************/
export const updateUserImage =
  (payload, field, cb = null) =>
  async (dispatch) => {
    const response = await image(
      { serviceURL: ADMIN_API_URL },
      FILE_UPLOAD,
      false,
      payload,
      true
    );
    if (response.status === 1) {
      const data = {};
      switch (field) {
        case USER_IMAGE_TYPES.PROFILE:
          data["profilePicURL"] = response.data.fileUrl;
          dispatch(updateUserInfo(data, cb));
          break;

        case USER_IMAGE_TYPES.PROFILE_BG:
          data["profileBgURL"] = response.data.fileUrl;
          dispatch(updateUserInfo(data, cb));
          break;

        default:
          if (typeof cb === "function") cb(response.data.fileUrl);
          break;
      }
      return Promise.resolve(response.data);
    } else {
      return Promise.reject(response);
    }
  };

export const showHeaderMenu = () => async (dispatch) => {
  let x = getCookie("userInfo");

  if (typeof x === "string") {
    x = JSON.parse(x);
  }

  if (x?.isSignUpDetailsCompleted === true && x?.showHeaderMenu === false) {
    x.showHeaderMenu = true;
    setCookie("userInfo", x);
    dispatch({ type: types.SET_USER_INFO, data: x });
  }
};

/********************************************************
 * Create Redux Action to check pending request
 * @author INIC
 * @returns {Function}
 ********************************************************/

export const checkPendingRequest = (id) => async (dispatch) => {
  const response = await get(
    { serviceURL: USER_API_URL },
    CHECK_PENDING_REQUEST + id,
    false,
    true
  );
  dispatch({
    type: types.SET_CHECK_PENDING_REQUEST,
    data: response.data,
  });
};

/******************** 
@purpose : Used for get user information
@Parameter : { data, dispatch }
@Author : INIC
******************/
export const getYliwayeCertificate = () => (dispatch) => {
  return get(
    { serviceURL: USER_API_URL },
    YLIWAY_USER_CERTIFICATE,
    false,
    true
  ).then((res) => {
    if (res.data) {
      dispatch(setYliwayeCertificate(res.data));
    }
    return Promise.reject(res);
  });
};
/******************** 
@purpose : Used for store logout responce and remove token in cookie
@Parameter : { }
@Author : INIC
******************/
export const setYliwayeCertificate = (data) => (dispatch) =>
  dispatch({
    type: types.SET_YLIWAY_USER_CERTIFICATE,
    data,
  });

/******************** 
@purpose : Used for get entity id
@Parameter : { data, dispatch }
@Author : INIC
******************/
export const getEntityDetails = (body) => (dispatch) => {
  return post(
    { serviceURL: USER_API_URL },
    YLIWAY_USER_ENTITY_DETAILS,
    false,
    body,
    true
  ).then((res) => {
    if (res.data) {
      dispatch(setEntityDetails(res.data));
    }
    return Promise.reject(res);
  });
};

/******************** 
@purpose : Used for store entity id
@Parameter : { }
@Author : INIC
******************/
export const setEntityDetails = (data) => (dispatch) => {
  setLocalStorage("entityDetail", JSON.stringify(data));
  return dispatch({
    type: types.SET_ENTITY_DETAILS,
    data,
  });
};

/******************** 
@purpose : Used for get purchased feature list
@Parameter : { data, dispatch }
@Author : INIC
******************/
export const getPurchasedFeatureList = (category) => (dispatch) => {
  const param = category && `?category=${category}`;
  return get(
    { serviceURL: USER_API_URL },
    category
      ? MONETISATION_PURCHASED_FEATURE_LIST + param
      : MONETISATION_PURCHASED_FEATURE_LIST,
    false,
    true
  ).then((res) => {
    if (res.status === 1) {
      dispatch(setPurchasedFeatureList(res?.data));
      return Promise.resolve(res);
    }
    return Promise.reject(res);
  });
};
/******************** 
@purpose : Used for store purchased feature list
@Parameter : { }
@Author : INIC
******************/
export const setPurchasedFeatureList = (data) => (dispatch) =>
  dispatch({
    type: types.SET_MONITISATION_PURCHASED_FEATURE_LIST,
    data,
  });

/******************** 
@purpose : Used for get monetisation features list
@Parameter : { data, dispatch }
@Author : INIC
******************/
export const getMonetisationFeatures = (body) => (dispatch) => {
  return post(
    { serviceURL: USER_API_URL },
    MONETISATION_FEATURE_LIST,
    false,
    body,
    true
  ).then((res) => {
    if (res.status === 1) {
      dispatch(setMonetisationFeatures(res.data));
      return Promise.resolve(res);
    }
    return Promise.reject(res);
  });
};
/******************** 
@purpose : Used for set monetisation features list
@Parameter : { }
@Author : INIC
******************/
export const setMonetisationFeatures = (data) => (dispatch) =>
  dispatch({
    type: types.SET_MONITISATION_FEATURE_LIST,
    data,
  });

/******************** 
@purpose : Used for get monetisation features list
@Parameter : { data, dispatch }
@Author : INIC
******************/
export const getMonetisationPlans = (body) => (dispatch) => {
  return post(
    { serviceURL: USER_API_URL },
    MONETISATION_PLAN_LIST,
    false,
    body,
    true
  ).then((res) => {
    if (res.status === 1) {
      dispatch(setMonetisationPlans(res.data));
      return Promise.resolve(res);
    }
    return Promise.reject(res);
  });
};
/******************** 
@purpose : Used for set monetisation plan list
@Parameter : { }
@Author : INIC
******************/
export const setMonetisationPlans = (data) => (dispatch) =>
  dispatch({
    type: types.SET_MONITISATION_PLAN_LIST,
    data,
  });

/******************** 
@purpose : Used for get monetisation features list
@Parameter : { data, dispatch }
@Author : INIC
******************/
export const getMonetisationPlanDetails = (body) => (dispatch) => {
  return post(
    { serviceURL: USER_API_URL },
    MONETISATION_PLAN_DETAILS,
    false,
    body,
    true
  ).then((res) => {
    if (res.status === 1) {
      dispatch(setMonetisationPlanDetails(res.data));
      return Promise.resolve(res);
    }
    return Promise.reject(res);
  });
};
/******************** 
@purpose : Used for set monetisation plan list
@Parameter : { }
@Author : INIC
******************/
export const setMonetisationPlanDetails = (data) => (dispatch) =>
  dispatch({
    type: types.SET_MONITISATION_PLAN_DETAILS,
    data,
  });

/******************** 
@purpose : Used for get monetisation features list
@Parameter : { data, dispatch }
@Author : INIC
******************/
export const purchaseMonetisationFeature = (body) => (dispatch) => {
  return post(
    { serviceURL: USER_API_URL },
    PURCHASE_MONETISATION_FEATURE,
    true,
    body,
    true
  );
};
/******************** 
@purpose : Used for get monetisation features list
@Parameter : { data, dispatch }
@Author : INIC
******************/
export const purchaseMonetisationPlan = (body) => (dispatch) => {
  return post(
    { serviceURL: USER_API_URL },
    PURCHASE_MONETISATION_PLAN,
    true,
    body,
    true
  );
};
/******************** 
@purpose : Used for unsubscribe monetisation features list
@Parameter : { data, dispatch }
@Author : INIC
******************/
export const unsubscribeMonetisationPlan = (id, body) => (dispatch) => {
  return put(
    { serviceURL: USER_API_URL },
    UNSUBSCRIBE_MONETISATION_PLAN + id,
    true,
    body,
    true
  );
};

/******************** 
@purpose : Used for get monetisation features list
@Parameter : { data, dispatch }
@Author : INIC
******************/
export const getLastPurchasePlanDetails = (body) => (dispatch) => {
  return get(
    { serviceURL: USER_API_URL },
    LAST_PURCHASED_PLAN_DETAILS,
    false,
    true
  ).then((res) => {
    if (res.status === 1) {
      dispatch(setLastPurchasePlanDetails(res.data));
      return Promise.resolve(res);
    }
    return Promise.reject(res);
  });
};
/******************** 
@purpose : Used for set monetisation plan list
@Parameter : { }
@Author : INIC
******************/
export const setLastPurchasePlanDetails = (data) => (dispatch) =>
  dispatch({
    type: types.SET_LAST_PURCHASED_PLAN_DETAILS,
    data,
  });

/********************************************************
 * Create Redux Action to get data from linkedin
 * @author INIC
 * @returns {Function}
 ********************************************************/

export const getDataFromLinkedin = () => async (dispatch) => {
  const response = await linkedinGet(
    { serviceURL: LINKEDIN_API_URL },
    LINKEDIN_ME,
    false,
    true
  );
  return response;
};
