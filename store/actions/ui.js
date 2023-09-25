import { get, post } from "api";
import { LINK_PREVIEW } from "api/routes";
import { USER_API_URL } from "config";
import * as types from "./types";
/******************* 
@purpose : Set UI Key on Redux
@Parameter : {key, data}
@Author : INIC
******************/
export const setUiKey = (key, data) => ({
  type: types.SET_UI_KEY,
  key,
  data,
});
/******************* 
@purpose : Set Alert Notification
@Parameter : {text, level, timeout}
@Author : INIC
******************/
export const setAlert = (text, level = "success", timeout = 5000) => ({
  type: types.SHOW_ALERT,
  text,
  level,
  timeout,
});
/******************* 
@purpose : Remove Alert Notification
@Parameter : {}
@Author : INIC
******************/
export const removeAlert = () => ({
  type: types.REMOVE_ALERT,
});
/******************* 
@purpose :  Handle Modal View
@Parameter : {value, key}
@Author : INIC
******************/
export const toggleModal = (value, key) => ({
  type: types.TOGGLE_MODAL,
  value,
  key,
});
/******************* 
@purpose :  Handle Multiple Modal View
@Parameter : {data}
@Author : INIC
******************/
export const toggleModals = (data) => ({
  type: types.TOGGLE_MODALS,
  data,
});
/******************* 
@purpose :  Handle Loader View
@Parameter : {value, key}
@Author : INIC
******************/
export const toggleLoader = (value, key) => ({
  type: types.TOGGLE_LOADER,
  value,
  key,
});

/******************* 
@purpose :  Handle Multiple Modal View
@Parameter : {data}
@Author : INIC
******************/
export const sharePostModal = (data) => ({
  type: types.SHARE_MODAL,
  data,
});
/******************* 
@purpose :  Handle Multiple Modal View
@Parameter : {data}
@Author : INIC
******************/
export const skillEndorseModal = (data) => ({
  type: types.SKILL_ENDORSE_MODAL,
  data,
});
/******************* 
@purpose :  View Certificate
@Parameter : {data}
@Author : INIC
******************/
export const viewCertiModal = (data) => ({
  type: types.VIEW_CERTIFICATE,
  data,
});

/******************* 
@purpose :  Handle share article modal view
@Parameter : {data}
@Author : INIC
******************/
export const shareArticleModal = (data) => ({
  type: types.ARTICLE_MODAL,
  data,
});

/******************* 
@purpose :  Handle share article modal view
@Parameter : {data}
@Author : INIC
******************/
export const otherConnectionModal = (data) => ({
  type: types.OTHER_CONNECTION,
  data,
});

/******************* 
@purpose :  Handle share article modal view
@Parameter : {data}
@Author : INIC
******************/
export const uploadCoursePdf = (data) => ({
  type: types.UPLOAD_COURSE_PDF,
  data,
});

/******************* 
@purpose :  Handle link preview
@Parameter : {data}
@Author : INIC
******************/
export const getPreviewUrl = (payload) => async (dispatch) => {
  const response = await post(
    { serviceURL: USER_API_URL },
    LINK_PREVIEW,
    false,
    payload,
    true
  );
  if (response.status === 1) {
    return Promise.resolve(response.data);
  }
};

/******************* 
@purpose :  Handle Multiple Modal View
@Parameter : {data}
@Author : INIC
******************/
export const confirmDeleteMessgae = (data) => ({
  type: types.CONFIRM_DELETE_MESSAGE,
  data,
});

/******************* 
@purpose :  Request for recommendation
@Parameter : {data}
@Author : INIC
******************/
export const requestForRecommendation = (data) => ({
  type: types.REQUEST_FOR_RECOMMENDATION,
  data,
});
