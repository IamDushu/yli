import {
  ALL_SKILLS_LISTING,
  COACHING_ROOM_CREATE,
  CREATE_OR_ADD_MEMBER_VIRTUAL_EVENTS,
  FACULTY_ALL_LIST,
  FILE_UPLOAD,
  GET_CONFIGURATION,
  LANGUAGE_LIST,
  TRAINING_ROOM_CREATE,
} from "api/routes";
import { image, post, get } from "api";
import { ADMIN_API_URL, IMAGE_URL, USER_API_URL, CONTENTS_API_URL } from "config";
import * as types from "../types";
import { showMessageNotification } from "utils";

/******************** 
@purpose : upload Banner Image and video for training room
@Parameter : {imageData, format}
@Author : INIC
******************/
export const bannerImageVideoUpload =
  (imageData, format) => async (dispatch) => {
    const res = await image(
      { serviceURL: ADMIN_API_URL },
      FILE_UPLOAD,
      false,
      imageData,
      true
    );

    if (res?.data) {
      const imageURL = `${IMAGE_URL}${res.data.filePath}`;
      if (format === "image") {
        dispatch(setBannerImage(imageURL));
      } else if (format === "video") {
        dispatch(setPreviewVideo(imageURL));
      }
      return Promise.resolve(imageURL);
    }
    return Promise.reject(res);
  };

/******************** 
@purpose : set language list 
@Parameter : {}
@Author : INIC
******************/
export const LanguageList = () => async (dispatch) => {
  const res = await get(
    { serviceURL: USER_API_URL },
    LANGUAGE_LIST,
    false,
    true
  );
  if (res?.data) {
    dispatch(setLanguageList(res.data));
    return Promise.resolve(res.status);
  }
  return Promise.reject(res);
};

export const SkillsList = (filter = '') => async dispatch => {
  const res = await get(
    { serviceURL: USER_API_URL },
    `${ALL_SKILLS_LISTING}?filter=${filter}`,
    false,
    true
  );
  if (res.data) {
    dispatch(setSkillsList(res.data));
    return Promise.resolve(res.data);
  }
  return Promise.reject(res);
}

/******************** 
@purpose : set Banner Image and video for training room
@Parameter : {data}
@Author : INIC
******************/
export const setBannerImage = (data) => ({
  type: types.SET_BANNER_IMAGE,
  data,
});

export const setPreviewVideo = (data) => ({
  type: types.SET_PREVIEW_VIDEO,
  data,
});

/******************** 
@purpose : set Language list
@Parameter : {data}
@Author : INIC
******************/
export const setLanguageList = (data) => ({
  type: types.SET_LANGUAGE_LIST,
  data,
});

export const setSkillsList = (data) => {
  return {
    type: types.SET_SKILLS_LIST,
    payload: data,
  }
};

/******************** 
@purpose : set language list 
@Parameter : {}
@Author : INIC
******************/
export const getConfiguration = () => async (dispatch) => {
  const res = await get(
    { serviceURL: ADMIN_API_URL },
    GET_CONFIGURATION,
    false,
    true
  );

  if (res?.data) {
    dispatch(setConfiguration(res.data));
    return Promise.resolve(res.data);
  }
  return Promise.reject(res);
};
/******************** 
@purpose : set Language list
@Parameter : {data}
@Author : INIC
******************/
export const setConfiguration = (data) => ({
  type: types.SET_CONFIGURATION,
  data,
});

/******************** 
@purpose : set faculty list
@Parameter : {data}
@Author : INIC
******************/

export const getFacultyList = (data) => async (dispatch) => {
  const res = await post(
    { serviceURL: USER_API_URL },
    FACULTY_ALL_LIST,
    false,
    data,
    true
  );

  if (res?.data) {
    return Promise.resolve(res.data);
  }
  return Promise.reject(res);
};


/******************** 
@purpose : create channel or add member to vitualEvent private channel
@Parameter : { id }
******************/
export const createOrAddMemberToChannel = async (id) => {
  const response = await post(
    { serviceURL: CONTENTS_API_URL },
    `${CREATE_OR_ADD_MEMBER_VIRTUAL_EVENTS}${id}`,
    false,
    {},
    true,
    { key: 'chat' }
  );
  return response;
};
