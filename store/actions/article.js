import * as types from "./types.js";
import { get, post, remove } from "../../api";
import { USER_API_URL } from "config/index.js";
import {
  CREATE_ARTICLE,
  ARTICLE_LIST,
  DELETE_ARTICLE,
  GET_ARTICLE,
  POST_LIST,
  GET_DELETED_ARTICLE,
  UNDELETE_ARTICLE,
} from "api/routes.js";
import { showMessageNotification } from "utils";
import { SET_ARTICLE_DATA } from "./types";
import { POST_API_URL } from "config/index.js";
import store from "store/index.js";

/******************** 
@purpose : Used to create an article
@Parameter : { data, dispatch }
@Author : INIC
******************/
export const createArticle = async (data) => {
  try {
    const response = await post(
      { serviceURL: USER_API_URL },
      CREATE_ARTICLE,
      false,
      data,
      true
    );

    if (response.status === 1) {
      if (data.publishedStatus === "published") {
        showMessageNotification("Article published successfully");
      } else {
        showMessageNotification("Article drafted successfully");
      }
    }
    return response;
  } catch (error) {
    let errorMessage = "Something went wrong";
    if (data.publishedStatus === "published") {
      errorMessage += ", while publishing article";
    } else {
      errorMessage += ", while drafting article";
    }
    showMessageNotification(errorMessage);
    throw error;
  }
};

/******************** 
@purpose : Used to get list of articles
@Parameter : { data, dispatch }
@Author : INIC
******************/
export const articleListing = (data) => async (dispatch) => {
  try {
    const response = await post(
      { serviceURL: USER_API_URL },
      ARTICLE_LIST,
      false,
      data,
      true
    );
    if (response.status === 1) {
      dispatch({ type: types.SET_ARTICLE_LIST, payload: response.data });
      return Promise.resolve(response?.data);
    }
    return Promise.reject(response);
  } catch (error) {
    throw error;
  }
};

/******************** 
@purpose : Used to delete an article
@Parameter : { data, dispatch }
@Author : INIC
******************/
export const deleteArticle = (id) => async (dispatch) => {
  try {
    const response = await remove(
      { serviceURL: USER_API_URL },
      DELETE_ARTICLE + id,
      true,
      true
    );

    if (response.status === 1) {
    }
    return Promise.reject(response);
  } catch (error) {
    throw error;
  }
};

/********************************************************
 * Create Redux Action to fetch article data
 * @author INIC
 * @returns {Function}
 ********************************************************/
export const getArticleData = (id, isDraftedArticle = false) => async (dispatch) => {
  const response = await get(
    { serviceURL: USER_API_URL },
    `${GET_ARTICLE}${id}?isDraftedArticle=${isDraftedArticle}`,
    false,
    true
  );
  if (response.status === 1) {
    dispatch(setArticleData(response.data));
  }
};

/********************************************************
 * Create Redux Action to set user profile count data
 * @author INIC
 * @param {Object} payload count data
 * @returns {Object}
 ********************************************************/
export const setArticleData = (payload) => ({
  type: SET_ARTICLE_DATA,
  payload,
});

/******************** 
@purpose :  Post Listing
@Parameter : {export const addPost = (body) => async (dispatch) => {
}
@Author : INIC
******************/
export const getPublishedArticles = (body) => async (dispatch) => {
  const { workwithus } = store.getState().aboutUsInfo;
  const res = await post(
    { serviceURL: workwithus.post ? POST_API_URL : USER_API_URL },
    POST_LIST,
    false,
    body,
    true
  );

  if (res?.data) {
    dispatch(setPublishedArticles(res.data));
    return Promise.resolve(res.data);
  }
  return Promise.reject(res);
};

/********************************************************
 * Create Redux Action to set published articles data
 * @author INIC
 * @param {Object} payload count data
 * @returns {Object}
 ********************************************************/
export const setPublishedArticles = (payload) => ({
  type: types.SET_PUBLISHED_ARTICLE_DATA,
  payload,
});


/****
 * @author YLIWAY
 * @purpose : to get all deleted articles
 * @param {Object} payload {page,pagesize...}
 * 
 */
export const getDeletedArticles = async (payload) => {
  const response = await post(
    { serviceURL: USER_API_URL },
    GET_DELETED_ARTICLE,
    false,
    payload,
    true
  );
  if (response.status === 1) {
    return Promise.resolve(response.data);
  } else return Promise.reject(response);
};


/****
 * @author YLIWAY
 * @purpose : undelete articles 
 * @param : id
 * 
 */
export const undeleteArticle = async (id) => {
  const response = await get(
    { serviceURL: USER_API_URL },
    `${UNDELETE_ARTICLE}${id}`,
    true,
    true
  );
  if (response.status === 1) {
    return Promise.resolve(response.data);
  } else return Promise.reject(response);
};


