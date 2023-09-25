import { get, post } from "api/index.js";
import {
  ADD_SKILLS_DATA,
  SKILLS_AREA,
  SKILLS_LISTING,
  SKILLS_TYPE,
  SKILLS_USERLIST,
  UPDATE_SKILLS_DATA,
  ACTIVITIES_LIST,
  PROFILE_SKILLS_TYPE,
  SKILL_ENDORSEMENT,
  SKILLS_TYPE_GROWTH,
  ENDORSE_REQUEST,
  USER_SKILLS,
  ENDORSE_LIST,
  SKILL_ENDORSEMENT_REJECT,
} from "api/routes.js";
import { USER_API_URL } from "config";
import * as types from "./types.js";

/******************** 
@purpose : get skill Area
@Parameter : { }
@Author : INIC
******************/
export const getSkillArea = (body) => async (dispatch) => {
  const res = await get(
    { serviceURL: USER_API_URL },
    SKILLS_AREA,
    false,
    "",
    true
  );

  if (res?.data) {
    dispatch(setSkillArea(res.data));
    return Promise.resolve(res.data);
  }
  return Promise.reject(res);
};
/******************** 
@purpose : get skill Area
@Parameter : { }
@Author : INIC
******************/
export const getSkillAreaPost = (body) => async (dispatch) => {
  const res = await post(
    { serviceURL: USER_API_URL },
    SKILLS_AREA,
    false,
    body,
    true
  );

  if (res?.data) {
    dispatch(setSkillArea(res.data));
    return Promise.resolve(res.data);
  }
  return Promise.reject(res);
};

/******************** 
@purpose : set skill Area
@Parameter : { }
@Author : INIC
******************/
export const setSkillArea = (data) => ({
  type: types.SET_SKILL_AREA,
  data,
});

/******************** 
@purpose : get skills based on skilltype ID AND Set data according to block names
@Parameter : { }
@Author : INIC
******************/

export const getSkillType =
  (id, type, professionId, data = { page: 1, pagesize: 100, searchText: "" }) =>
    async (dispatch) => {
      const res = await get(
        { serviceURL: USER_API_URL },
        type === "profile"
          ? SKILLS_TYPE +
          id +
          "&page=" +
          data?.page +
          "&pagesize=" +
          data?.pagesize +
          "&searchText=" +
          data?.searchText
          : type === "skills"
            ? SKILLS_TYPE +
            id +
            "&page=" +
            data?.page +
            "&pagesize=" +
            data?.pagesize +
            "&searchText=" +
            data?.searchText
            : SKILLS_TYPE_GROWTH +
            id +
            "&profId=" +
            professionId +
            "&isSelected=true",

        false,
        "",
        true
      );
      if (res?.statusCode === 200 && res?.data) {
        dispatch(setSkillType(res?.data, type));
        dispatch(setSkillTypea(res?.data, type));
        return Promise.resolve(res?.data);
      }
      // if (res?.statusCode === 200 && res?.data) {
      //   dispatch(setSkillType(res?.data, type));
      //   let type = "";
      //   if (id === 2) {
      //     type = "Mindset";
      //   } else if (id === 6) {
      //     type = "Hard Skills";
      //   } else if (id === 1) {
      //     type = "Soft Skills";
      //   }
      //   dispatch(setSkillTypea(res?.data, type));
      //   // return Promise.resolve(res.data);
      // }
    };

export const getAllSkillType = () => async (dispatch) => {
  const hardSkillResponse = await get(
    { serviceURL: USER_API_URL },
    SKILLS_TYPE + "6",
    false,
    "",
    true
  );
  if (hardSkillResponse?.statusCode === 200 && hardSkillResponse?.data) {
    dispatch(setSkillTypea(hardSkillResponse?.data, "Hard Skills"));
  }
  const softSkillResponse = await get(
    { serviceURL: USER_API_URL },
    SKILLS_TYPE + "1",
    false,
    "",
    true
  );
  if (softSkillResponse?.statusCode === 200 && softSkillResponse?.data) {
    dispatch(setSkillTypea(softSkillResponse?.data, "Soft Skills"));
  }
  const mindsetResponse = await get(
    { serviceURL: USER_API_URL },
    SKILLS_TYPE + "2",
    false,
    "",
    true
  );
  if (mindsetResponse?.statusCode === 200 && mindsetResponse?.data) {
    dispatch(setSkillTypea(mindsetResponse?.data, "Mindset"));
  }
};

/******************** 
@purpose : set skill type
@Parameter : { }
@Author : INIC
******************/
export const setSkillType = (data, type) => ({
  type: types.SET_SKILL_TYPE,
  data,
});

export const setSkillTypea = (data, type) => async (dispatch) => {
  if (type === "Soft Skills") {
    dispatch({
      type: types.SET_SOFTSKILL_SKILL_TYPE,
      data,
    });
    return Promise.resolve(data);
  }
  if (type === "Hard Skills") {
    dispatch({
      type: types.SET_HARDSKILL_SKILL_TYPE,
      data,
    });
    return Promise.resolve(data);
  }
  if (type === "Traction") {
    dispatch({
      type: types.SET_TRACTIONSKILL_SKILL_TYPE,
      data,
    });
    return Promise.resolve(data);
  }
  if (type === "Mindset") {
    dispatch({
      type: types.SET_MINDSETSKILL_SKILL_TYPE,
      data,
    });
    return Promise.resolve(data);
  }
  if (type === "Distribution") {
    dispatch({
      type: types.SET_DISTRIBUTIONSKILL_SKILL_TYPE,
      data,
    });
    return Promise.resolve(data);
  }
  if (type === "Support") {
    dispatch({
      type: types.SET_SUPPORTSKILL_SKILL_TYPE,
      data,
    });
    return Promise.resolve(data);
  }
};

/******************** 
@purpose : clear skills reducer data
@Parameter : { }
@Author : INIC
******************/

export const clearSkillType = () => async (dispatch) => {
  dispatch({
    type: types.CLEAR_SKILL_TYPE,
  });
};

/******************** 
@purpose : get skill userlist
@Parameter : { }
@Author : INIC
******************/
export const getSkillUserList = (type) => async (dispatch) => {
  const res = await get(
    { serviceURL: USER_API_URL },
    SKILLS_USERLIST + type,
    false,
    "",
    true
  );

  if (res?.data) {
    dispatch(setSkillUserList(res.data));
    return Promise.resolve(res.data);
  }
  return Promise.reject(res);
};

/******************** 
@purpose : set skill userlist
@Parameter : { }
@Author : INIC
******************/
export const setSkillUserList = (data) => ({
  type: types.SET_SKILL_USERLIST,
  data,
});
/******************** 
@purpose : add skill data
@Parameter : { }
@Author : INIC
******************/
export const addSkillData = (payload) => async (dispatch) => {
  const response = await post(
    { serviceURL: USER_API_URL },
    ADD_SKILLS_DATA,
    true,
    payload,
    true
  );
  if (response.status === 1) {
    dispatch({ type: types.ADD_SKILLS_DATA, payload });

    return Promise.resolve(response.data);
  } else {
    return Promise.reject(response);
  }
};
/******************** 
@purpose : update skill data
@Parameter : { }
@Author : INIC
******************/
export const updateSkillData = (payload, id) => async (dispatch) => {
  const response = await post(
    { serviceURL: USER_API_URL },
    UPDATE_SKILLS_DATA + id,
    true,
    payload,
    true
  );
  if (response.status === 1) {
    dispatch({ type: types.ADD_SKILLS_DATA, payload });

    return Promise.resolve(response.data);
  } else {
    return Promise.reject(response);
  }
};

export const deleteSkillData = (payload, id) => async (dispatch) => {
  await post(
    { serviceURL: USER_API_URL },
    UPDATE_SKILLS_DATA + id,
    true,
    payload,
    true
  );
};
/******************** 
@purpose : get skill listing
@Parameter : { }
@Author : INIC
******************/
export const getSkillsData = (payload={}) => async (dispatch) => {
  const queryParams = [];
  const {page,pagesize,searchText,skillArea,userId} = payload
  if (page) queryParams.push(`page=${page}`);
  if (pagesize) queryParams.push(`pagesize=${pagesize}`);
  if (searchText) queryParams.push(`searchText=${searchText}`);
  if (skillArea) queryParams.push(`skillArea=${skillArea}`);
  if (userId) queryParams.push(`userId=${userId}`);
  
  const query = queryParams.length > 0 ? `/?${queryParams.join('&')}` : '';
  const res = await get(
    { serviceURL: USER_API_URL },
    SKILLS_LISTING+query,
    false,
    "",
    true
  );

  if (res?.data) {
    dispatch(setSkillsData(res.data));
    return Promise.resolve(res.data);
  }
  return Promise.reject(res);
};

export const setSkillsData = (data) => ({
  type: types.SKILLS_LIST,
  data,
});

/******************** 
@purpose : activity list 
@Parameter : { }
@Author : INIC
******************/

export const activityListData = (payload, type) => async (dispatch) => {
  const response = await post(
    { serviceURL: USER_API_URL },
    ACTIVITIES_LIST,
    false,
    payload,
    true
  );

  if (response.status === 1) {
    if (payload.page > 1) {
      dispatch(updateSkillsActData(response.data));
    } else {
      dispatch(setSkillsActData(response.data));
    }
  }

  if (
    (response.status === 1 && type === "Hard Skills") ||
    (response.status === 1 && type === "Hard Skill")
  ) {
    dispatch({
      type: types.HARD_SKILL_LIST,
      data: response.data,
    });
  }
  if (
    (response.status === 1 && type === "Soft Skills") ||
    (response.status === 1 && type === "Soft Skill")
  ) {
    dispatch({
      type: types.SOFT_SKILL_LIST,
      data: response.data,
    });
  }
  if (response.status === 1 && type === "Mindset") {
    dispatch({
      type: types.MINDSET_LIST,
      data: response.data,
    });
  }
  if (response.status === 1 && type === "Traction") {
    dispatch({
      type: types.TRACTION_LIST,
      data: response.data,
    });
  }
  if (response.status === 1 && type === "Distribution") {
    dispatch({
      type: types.DISTRIBUTION_LIST,
      data: response.data,
    });
  }
  if (response.status === 1 && type === "Support") {
    dispatch({
      type: types.SUPPORT_LIST,
      data: response.data,
    });
  } else {
    if (response.statusCode === 200) {
      return Promise.resolve(response);
    }
    return Promise.reject(response);
  }
};

/******************** 
@purpose : set activity data
@Parameter : {data, blockName }
@Author : INIC
******************/

export const setSkillsActData = (data) => ({
  type: types.ACTIVITY_LIST_DATA,
  data,
});

/******************** 
@purpose : update activity data
@Parameter : {data }
@Author : INIC
******************/

export const updateSkillsActData = (data) => ({
  type: types.ACTIVITY_LIST_DATA_UPDATE,
  data,
});

/******************** 
@purpose : clear left skills data
@Parameter : {data, blockName }
@Author : INIC
******************/

export const SkillsClearData = () => ({
  type: types.ACTIVITY_LIST_CLEARDATA,
});

/******************** 
@purpose : store left skills data
@Parameter : {data, blockName }
@Author : INIC
******************/

export const storeSkillData = (data, blockName) => async (dispatch) => {
  if (blockName === "Mindset") {
    dispatch({
      type: types.SKILL_DATA_STOREM,
      data: data,
    });
  }
  if (blockName === "Soft Skills" || blockName === "Soft Skill") {
    dispatch({
      type: types.SKILL_DATA_STORESS,
      data: data,
    });
  }
  if (blockName === "Traction") {
    dispatch({
      type: types.SKILL_DATA_STORET,
      data: data,
    });
  }
  if (blockName === "Hard Skills" || blockName === "Hard Skill") {
    dispatch({
      type: types.SKILL_DATA_STOREHS,
      data: data,
    });
  }
  if (blockName === "Distribution") {
    dispatch({
      type: types.SKILL_DATA_STOREDist,
      data: data,
    });
  }
  if (blockName === "Support") {
    dispatch({
      type: types.SKILL_DATA_STORESupp,
      data: data,
    });
  }
};

/******************** 
@purpose : set Block Payload Detail Clear
@Parameter : {data}
@Author : INIC
******************/

export const clearBlockData = () => ({
  type: types.SET_BLOCK_PAYLOAD_DETAILS_CLEAR,
});

/******************** 
@purpose : set skill data Clear
@Parameter : {}
@Author : INIC
******************/

export const clearSkillData = () => ({
  type: types.CLEAR_SKILL_DATA,
});

/********************************************************
 * Create Redux Action for skill endorsement
 * @author INIC
 * @param {Object} payload experience data
 * @param {Function} [cb] callback function
 * @returns {Promise}
 ********************************************************/
export const skillEndorse = (payload) => async (dispatch) => {
  const response = await post(
    { serviceURL: USER_API_URL },
    SKILL_ENDORSEMENT,
    true,
    payload,
    true
  );
  if (response.status === 1) {
    return Promise.resolve(response);
  } else {
    return Promise.reject(response);
  }
};


/***************
 @author : YLIWAY 
 @purpose : to reject endorse request

 */
export const skillEndorseReject = (payload) => async (dispatch) => {
  const response = await post(
    { serviceURL: USER_API_URL },
    SKILL_ENDORSEMENT_REJECT,
    true,
    payload,
    true
  );
  if (response.status === 1) {
    return Promise.resolve(response);
  } else {
    return Promise.reject(response);
  }
};

/********************************************************
 * Create Redux Action for  endorsement request
 * @author INIC
 * @returns {Promise}
 ********************************************************/
export const endorseRequest = (payload) => async () => {
  const response = await post(
    { serviceURL: USER_API_URL },
    ENDORSE_REQUEST,
    true,
    payload,
    true
  );
  if (response.status === 1) {
    return Promise.resolve(response);
  } else {
    return Promise.reject(response);
  }
};

/********************************************************
 * Create Redux Action for user skill list
 * @author INIC
 * @returns {Promise}
 ********************************************************/
export const userSkillsList = (skillArea,otherPayload={}) => async (dispatch) => {
  const queryParams = [];
  const {page,pagesize,searchText} = otherPayload
  if (page) queryParams.push(`page=${page}`);
  if (pagesize) queryParams.push(`pagesize=${pagesize}`);
  if (searchText) queryParams.push(`searchText=${searchText}`);
  
  const query = queryParams.length > 0 ? `&${queryParams.join('&')}` : '';
  const response = await get(
    { serviceURL: USER_API_URL },
    USER_SKILLS + skillArea+query,
    false,
    "",
    true
  );
  if (response.status === 1) {
    dispatch(setUserSkillsData(response));
    return Promise.resolve(response);
  } else {
    return Promise.reject(response);
  }
};

export const setUserSkillsData = (data) => ({
  type: types.SKILLS_USER_LIST,
  data,
});

/********************************************************
 * Create Redux Action for Endorse list
 * @author INIC
 * @returns {Promise}
 ********************************************************/
export const getEndorsedList = (payload) => async (dispatch) => {
  const response = await post(
    { serviceURL: USER_API_URL },
    ENDORSE_LIST,
    false,
    payload,
    true
  );
  if (response.status === 1) {
    dispatch(setEndorsedList(response));
    return Promise.resolve(response);
  } else {
    return Promise.reject(response);
  }
};

export const setEndorsedList = (data) => ({
  type: types.SKILLS_ENDORSE_LIST,
  data,
});
