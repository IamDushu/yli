import * as types from "./types";
import { get, post } from "../../api";
import {
  SEARCH_RESULT,
  RECENT_SEARCH_LIST,
  CLEAR_SEARCH_LIST,
  SEARCH_UER_LIST,
} from "./../../api/routes";
import { USER_API_URL } from "config/index.js";
import { showMessageNotification } from "utils";

/******************** 
@purpose : Get search result data
@Parameter : { }
@Author : INIC
******************/
export const getSearchResults = (body) => async (dispatch) => {
  const searchText = body.searchText;
  const payload = {
    type: searchText && searchText.includes("#") ? "tags" : undefined,
    tags:
      searchText && searchText.includes("#")
        ? [searchText.replace("#", "")]
        : undefined,
    searchText:
      searchText && searchText.includes("#")
        ? searchText.replace("#", "")
        : searchText,
    ...body,
  };
  const response = await post(
    { serviceURL: USER_API_URL },
    SEARCH_RESULT,
    false,
    payload,
    true
  );
  if (response?.data) {
    dispatch(setSearch(response?.data));
    return Promise.resolve(response.data);
  }
  return Promise.reject(response);
};

/******************** 
@purpose : Set search result data
@Parameter : { }
@Author : INIC
******************/
export const setSearch = (data) => ({
  type: types.SET_SEARCH_RESULT,
  data,
});

/******************** 
@purpose : Set search text
@Parameter : { }
@Author : INIC
******************/
export const saveSearchText = (data) => ({
  type: types.SET_SEARCH_TEXT,
  data,
});

/******************** 
@purpose : Get recent search result list
@Parameter : { }
@Author : INIC
******************/
export const getRecentSearchList = () => async (dispatch) => {
  const res = await get(
    { serviceURL: USER_API_URL },
    RECENT_SEARCH_LIST,
    false,
    true
  );
  if (res?.data) {
    dispatch({
      type: types.RECENT_SEARCH_LIST,
      data: res.data,
    });
    return Promise.resolve(res.data);
  }
  return Promise.reject(res);
};

export const clearSearchList = () => (dispatch) => {
  dispatch({
    type: types.CLEAR_SEARCH_LIST,
  });
};

/******************** 
@purpose : Get recent search result list
@Parameter : { }
@Author : INIC
******************/
export const clearRecentSearchList = (lang) => async (dispatch) => {
  const res = await get(
    { serviceURL: USER_API_URL },
    CLEAR_SEARCH_LIST,
    false,
    true
  );
  if (res?.status === 1) {
    showMessageNotification(lang("TOAST.HISTORY_CLEARED_SUCCESSFULLY"));

    dispatch(getRecentSearchList());
    // return Promise.resolve(res);
  }
  // return Promise.reject(res);
};

/********************
 * @purpose : Get recent search result list
 * @Parameter : { body }
 * @Author : INIC
 ******************/

export const getSearchedUsersList = (body) => async (dispatch) => {
  const response = await post(
    { serviceURL: USER_API_URL },
    SEARCH_UER_LIST,
    false,
    body,
    true
  );
  if (response.data) {
    dispatch({
      type: types.SET_SEARCHED_USER_LIST,
      data: response.data,
    });
  }
};

export const _getSearchedUsersList = (body) => async (dispatch) => {
  const response = await post(
    { serviceURL: USER_API_URL },
    SEARCH_RESULT,
    false,
    body,
    true
  );
  if (response.data) {
    dispatch({
      type: types.SET_SEARCHED_USER_LIST,
      data: response.data,
    });
  }
};