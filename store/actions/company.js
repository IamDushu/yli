import { get, post } from "api";
import * as types from "./types.js";
import {
  ABOUT_DATA_CO,
  COMPANY_DATA,
  COMPANY_FOLLOWER_LIST,
  COMPANY_FOLLOW_UPDATE,
  COMPANY_HOME,
  COMPANY_PEOPLE_LIST,
  COMPANY_VALIDATE_EMAIL,
  CREATE_COMPANY,
  GET_COMPANY_DETAILS,
  LIST_PRODUCTS,
} from "api/routes";
import { USER_API_URL } from "config";
import { setCookie, showMessageNotification } from "utils";

/********************************************************
 * To check email exists or not
 * @author YLIWAY
 * @returns {Function}
 ********************************************************/
export const getValidateEmail = async (payload) => {
  const response = await post(
    { serviceURL: USER_API_URL },
    COMPANY_VALIDATE_EMAIL,
    false,
    payload,
    true
  );

  if (response.status === 1) {
    return Promise.resolve(response);
  } else if (response.status === 0) {
    showMessageNotification(response.message);
  }
};

/********************************************************
 * To create company
 * @author YLIWAY
 * @returns {Function}
 ********************************************************/
export const addCompany = async (payload) => {
  try {
    const response = await post(
      { serviceURL: USER_API_URL },
      CREATE_COMPANY,
      true,
      payload,
      true
    );
    if (response) {
      return response;
    }
    return false;
  } catch (error) {
    throw error;
  }
};

/********************************************************
 * Create Redux Action to get company details
 * @author YLIWAY
 * @returns {Function}
 ********************************************************/
export const getCompanyDetails = () => async (dispatch) => {
  const response = await get(
    { serviceURL: USER_API_URL },
    GET_COMPANY_DETAILS,
    false,
    true
  );
  if (response.status === 1) {
    dispatch(setCompanyDetails(response.data));

    setCookie("companyDetails", response.data);
    return Promise.resolve(response.data);
  }
  return Promise.reject(response);
};

export const setCompanyDetails = (payload) => ({
  type: types.SET_COMPANY_DETAILS,
  payload,
});

/******************** 
@purpose :  About info
@Parameter : { }
@Author : YLIWAY
******************/
export const aboutInfoCo = (id) => async (dispatch) => {
  const res = await get(
    { serviceURL: USER_API_URL },
    ABOUT_DATA_CO + id,
    false,
    "",
    true
  );

  if (res.status === 1) {
    dispatch(aboutDataCo(res.data));
    return Promise.resolve(res.data);
  }
  return Promise.reject(res);
};

/******************** 
@purpose : set About data
@Parameter : { }
@Author : YLIWAY
******************/
export const aboutDataCo = (data) => ({
  type: types.SET_ABOUT_INFO_CO,
  data,
});

/********************************************************
 * Create Redux Action for User Listing
 * @author YLIWAY
 * @returns {Function}
 ********************************************************/

export const getCompanyDetailsById = (id) => async (dispatch) => {
  try {
    const response = await get(
      { serviceURL: USER_API_URL },
      COMPANY_DATA + id,
      false,
      "",
      true
    );

    if (response.status === 1) {
      dispatch(setCompanyData(response.data));
      return Promise.resolve(response.data);
    }
    return Promise.reject();
  } catch (error) {}
};

export const setCompanyData = (data) => ({
  type: types.SET_COMPANY_DATA,
  data,
});

/********************************************************
 * Create Redux Action to follow company
 * @author YLIWAY
 * @returns {Function}
 ********************************************************/
export const addFollowUpdateCo = (data) => async (dispatch) => {
  try {
    const response = await post(
      { serviceURL: USER_API_URL },
      COMPANY_FOLLOW_UPDATE,
      false,
      data,
      true
    );
    if (response.status === 1) {
      return Promise.resolve(response);
    }
    return Promise.reject();
  } catch (error) {}
};

/******************** 
@purpose :  About info
@Parameter : { }
@Author : YLIWAY
******************/
export const getCompanyHomeInfo = (id) => async (dispatch) => {
  const res = await get(
    { serviceURL: USER_API_URL },
    COMPANY_HOME + id,
    false,
    "",
    true
  );
  if (res.status === 1) {
    dispatch(setCompanyHomeInfo(res.data));
    return Promise.resolve(res.data);
  }
  return Promise.reject(res);
};

/******************** 
@purpose : set About data
@Parameter : { }
@Author : YLIWAY
******************/
export const setCompanyHomeInfo = (payload) => ({
  type: types.SET_COMPANY_HOME_DETAILS,
  payload,
});

/********************************************************
 * Create Redux Action to fetch follower listing
 * @author YLIWAY
 * @returns {Function}
 ********************************************************/

export const getFollowerListingCo =
  (data, listingPage = false) =>
  async (dispatch) => {
    try {
      const response = await post(
        { serviceURL: USER_API_URL },
        COMPANY_FOLLOWER_LIST,
        false,
        data,
        true
      );
      if (response.status === 1) {
        if (listingPage) {
          dispatch(setFollowerListingPageCo(response.data));
        } else {
          dispatch(setFollowerListingCo(response.data));
          if (data?.isFollowers === false) {
            dispatch(setFollowerListingCo([]));
          }
        }
        return Promise.resolve();
      }
      return Promise.reject();
    } catch (error) {}
  };

export const setFollowerListingPageCo = (payload) => ({
  type: types.SET_FOLLOWER_LIST_PAGE_CO,
  payload,
});
export const setFollowerListingCo = (payload) => ({
  type: types.SET_FOLLOWER_LIST_CO,
  payload,
});

/********************************************************
 * Create Redux Action to fetch people listing
 * @author YLIWAY
 * @returns {Function}
 ********************************************************/

export const getPeopleListingCo =
  ({
    companyId,
    page,
    pagesize,
    searchText,
    listingPage,
    state = "",
    city = "",
    currentPosition = "",
    country = "",
    startDate = "",
    endDate = "",
    isFollowing,
    isFollowers,
  }) =>
  async (dispatch) => {
    try {
      const response = await get(
        { serviceURL: USER_API_URL },
        `${COMPANY_PEOPLE_LIST}?companyId=${companyId}&page=${page}&pageSize=${pagesize}&search=${searchText}&state=${state}&city=${city}&currentPosition=${currentPosition}&country=${country}&startDate=${startDate}&endDate=${endDate}`,
        false,
        true
      );
      if (response.status === 1) {
        if (listingPage) {
          dispatch(setPeopleListingPageCo(response.data));
        } else {
          dispatch(setPeopleListingCo(response.data));
          if (isFollowers === true) {
            dispatch(setPeopleListingCo([]));
          }
        }
        return Promise.resolve();
      }
      return Promise.reject();
    } catch (error) {}
  };

export const setPeopleListingCo = (payload) => ({
  type: types.SET_PEOPLE_LIST_CO,
  payload,
});
export const setPeopleListingPageCo = (payload) => ({
  type: types.SET_PEOPLE_LIST_PAGE_CO,
  payload,
});

/********************************************************
 * Create Redux Action to list company products
 * @author YLIWAY
 * @returns {Function}
 ********************************************************/

export const getProductsList = (data) => async (dispatch) => {
  try {
    const response = await post(
      { serviceURL: USER_API_URL },
      LIST_PRODUCTS,
      false,
      data,
      true
    );
    if (response.status === 1) {
      dispatch(setProductsList(response.data));
      return Promise.resolve();
    }
    return Promise.reject();
  } catch (error) {}
};

export const setProductsList = (payload) => ({
  type: types.SET_PRODUCTS_LIST,
  payload,
});
