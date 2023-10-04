import {
  ADD_EDIT_GROWTH_MODEL_SELECTED_SKILLS,
  ADD_GROWTH_MODEL,
  ADD_GROWTH_MODEL_ACTIVITIES,
  ADD_PROFESSIONS,
  ADD_STUDENT_FEEDBACK,
  AUTHOR_NAMELIST,
  BLOCK_FLAG,
  DELETE_GROWTH_MODEL,
  DELETE_GROWTH_MODEL_ACTIVITIES,
  GET_ALL_PROFESSIONS,
  GET_GROWTH_MODEL,
  GET_GROWTH_MODEL_ACTIVITIES,
  GET_GROWTH_MODEL_ACTIVITIES_STATUS,
  GET_GROWTH_MODEL_SELECTED_SKILLS,
  GET_GROWTH_MODEL_STEPONE,
  GET_PROFESSIONAL_FIELD,
  GET_PROFESSIONS,
  GM_DEPARTMENT_LIST,
  GROWTH_PARTNERS_LIST,
  MOST_FOLLOWED_CONTENT,
  LATEST_ARTICLES,
  MOST_FOLLOWED_TOPICS,
  MOST_FOLLOWED_CIRCLES,
  OTHER_GROWTH_COURSES,
  OTHER_GROWTH_ROOMS,
  RECENTLY_ADDED_TO_GM,
  STATUS_GM,
  UPDATE_GROWTH_MODEL,
  UPDATE_GROWTH_MODEL_ACTIVITIES,
  GROWTH_PROFESSION_LIST,
  UPDATE_CONNECTION_GOALS,
  GROWTH_PARTNERS_ACTIVITY_LIST,
  ADD_UPDATE_PARTNERS_ACTIVITY_LIST,
  DELETE_GROWTH_PARTNERS_ACTIVITY,
  DELETE_GROWTH_MODEL_USER_ACTIVITIES,
} from "api/routes";
import { GROWTH_MODEL_API_URL, USER_API_URL } from "config";
import { showMessageNotification } from "utils";
import { get, patch, post, remove } from "../../api";
import * as types from "./types.js";

export const getGrowthModelSelectedSkills =
  (growthModelId) => async (dispatch) => {
    try {
      const response = await get(
        { serviceURL: USER_API_URL },
        `${GET_GROWTH_MODEL_SELECTED_SKILLS}/${growthModelId}`,
        false,
        true
      );

      if (response.statusCode === 200) {
        return dispatch({
          type: types.SET_GROWTHMODEL_SELECTED_SKILLS,
          payload: response.data.skills,
        });
      } else {
        return dispatch({
          type: types.SET_GROWTHMODEL_SELECTED_SKILLS,
          payload: [],
        });
      }
    } catch (error) {
      // throw error;
    }
  };

export const addEditGrowthModelSelectedSkills = (data) => async (dispatch) => {
  try {
    await post(
      { serviceURL: USER_API_URL },
      ADD_EDIT_GROWTH_MODEL_SELECTED_SKILLS,
      false,
      data,
      true
    );
    dispatch(getGrowthModelSelectedSkills(data.growthModelId));
  } catch (error) {
    throw error;
  }
};

/******************** 
@purpose : Used for get growth model
@Parameter : { dispatch }
@Author : INIC
******************/
export const getGrowthModel = () => async (dispatch) => {
  try {
    const response = await get(
      { serviceURL: GROWTH_MODEL_API_URL },
      GET_GROWTH_MODEL,
      false,
      true
    );

    if (response.statusCode === 200) {
      return dispatch({ type: types.SET_GROWTHMODEL, payload: response.data });
    } else {
      return dispatch({
        type: types.SET_GROWTHMODEL,
        payload: { current_step: 0 },
      });
    }
  } catch (error) {
    throw error;
  }
};

/******************** 
@purpose : Used for add growth model
@Parameter : { data, dispatch }
@Author : INIC
******************/
export const addGrowthModal = (data) => async (dispatch) => {
  try {
    const response = await post(
      { serviceURL: GROWTH_MODEL_API_URL },
      ADD_GROWTH_MODEL,
      true,
      data,
      true
    );
    if (response.statusCode === 200) {
      if (response?.message) {
        return Promise.resolve(response);
      }
      dispatch({ type: types.SET_GROWTHMODEL, payload: response.data });
      return Promise.resolve(response);
    }
  } catch (error) {
    throw error;
  }
};

/******************** 
@purpose : Used for update growth model
@Parameter : { data, dispatch }
@Author : INIC
******************/
export const updateGrowthModal = (data) => async (dispatch) => {
  let body = {
    professionField: data.profession_field,
    profession: data.profession,
    compilationMethod: data.compilation_method,
    jobType: data.job_type,
  };
  try {
    const response = await post(
      { serviceURL: GROWTH_MODEL_API_URL },
      `${UPDATE_GROWTH_MODEL}/${data.id}`,
      false,
      body,
      true
    );

    if (response.statusCode === 200) {
      return dispatch(getGrowthModel());
    }
  } catch (error) {
    throw error;
  }
};

/******************** 
@purpose : Used for setting project and open it
@Parameter : { dispatch }
@Author : INIC
******************/
export const setGrowthProject =
  (id, step, otherData = {}) =>
  async (dispatch) => {
    try {
      dispatch({
        type: types.SET_GROWTH_PROJECT,
        payload: {
          ...otherData,
          id,
          step,
        },
      });
      return;
    } catch (error) {
      throw error;
    }
  };
export const setGrowthProfession = (data) => async (dispatch) => {
  try {
    dispatch({
      type: types.SET_GROWTH_PROFESSION,
      data,
    });
    return;
  } catch (error) {
    throw error;
  }
};
/******************** 
@purpose : Used for deleting project
@Parameter : {id, dispatch }
@Author : YLIWAY
******************/
export const deleteGrowthProject = (id) => async (dispatch) => {
  try {
    const response = await remove(
      { serviceURL: GROWTH_MODEL_API_URL },
      `${DELETE_GROWTH_MODEL}/${id}`,
      true,
      true
    );

    if (response.statusCode === 200) {
      return dispatch(getGrowthModel());
    }
  } catch (error) {
    throw error;
  }
};

/******************** 
@purpose : Used for get growth model activities
@Parameter : { dispatch }
@Author : INIC
******************/
export const getGrowthModelActivities =
  (id, filterSettings) => async (dispatch) => {
    try {
      let url = `${GET_GROWTH_MODEL_ACTIVITIES}`;
      let data = {
        growthModelId: id,
      };

      if (filterSettings.resource !== "") {
        data["skillArea"] = filterSettings.resource;
      }
      if (filterSettings.acitivityType !== "") {
        data["acitivityType"] = filterSettings.acitivityType;
      }
      if (filterSettings.status !== "") {
        data["status"] = filterSettings.status;
      }
      if (filterSettings.page !== "") {
        data["page"] = filterSettings.page;
      }
      if (filterSettings.limit !== "") {
        data["pagesize"] = filterSettings.limit;
      }
      if (filterSettings.rating !== "") {
        data["rating"] = filterSettings.rating;
      }
      if (filterSettings.sortByPrice !== "") {
        data["sortByPrice"] = filterSettings.sortByPrice;
      }
      if (filterSettings?.author?.length > 0) {
        data["author"] = filterSettings.author;
      }

      const response = await post(
        { serviceURL: USER_API_URL },
        url,
        false,
        data,
        true
      );
      if (response.statusCode === 200) {
        let payload = {
          ...response.data,
          page: filterSettings.page,
        };
        return dispatch({
          type: types.SET_GROWTHMODEL_ACTIVITIES,
          payload,
        });
      }
    } catch (error) {
      throw error;
    }
  };

/******************** 
@purpose : Used for add growth model activities
@Parameter : { data, dispatch }
@Author : INIC
******************/
export const addGrowthModelActivities = (data) => async (dispatch) => {
  try {
    const response = await post(
      { serviceURL: GROWTH_MODEL_API_URL },
      ADD_GROWTH_MODEL_ACTIVITIES,
      true,
      data,
      true
    );

    if (response.statusCode !== 201) {
      return false;
    }
    // showMessageNotification("Details Saved Successfully.");
    return response.data;
  } catch (error) {
    throw error;
  }
};

/******************** 
@purpose : Used for update growth model activities
@Parameter : { id, data }
@Author : INIC
******************/
export const updateGrowthModelActivities = async (id, data) => {
  try {
    const response = await patch(
      { serviceURL: GROWTH_MODEL_API_URL },
      `${UPDATE_GROWTH_MODEL_ACTIVITIES}/${id}`,
      true,
      data
    );
    if (response?.statusCode === 400 && response?.status === "error") {
      showMessageNotification(response?.data?.message[0], "error");
    }
  } catch (error) {
    throw error;
  }
};

/******************** 
@purpose : Used for delete growth model activities
@Parameter : { data, dispatch }
@Author : INIC
******************/
export const deleteGrowthModelActivities = (id) => async (dispatch) => {
  try {
    const response = await remove(
      { serviceURL: GROWTH_MODEL_API_URL },
      `${DELETE_GROWTH_MODEL_ACTIVITIES}/${id}`,
      true,
      true
    );
    if (response.statusCode === 200) {
      return dispatch({
        type: types.REMOVE_GROWTHMODEL_ACTIVITY,
        payload: id,
      });
    }
  } catch (error) {
    throw error;
  }
};

/******************** 
@purpose : Used for get growth model activities
@Parameter : { dispatch }
@Author : INIC
******************/
export const getGrowthModelActivitiesStatus = (id) => async (dispatch) => {
  try {
    await get(
      { serviceURL: GROWTH_MODEL_API_URL },
      `${GET_GROWTH_MODEL_ACTIVITIES_STATUS}?growthmodel_id=${id}`,
      false,
      true
    );
  } catch (error) {
    throw error;
  }
};

/******************** 
@purpose : Used for delete growth model activities
@Parameter : { dispatch }
******************/
export const deleteGrowthModelUserActivities = (id) => async (dispatch) => {
  try {
    await post(
      { serviceURL: USER_API_URL },
      `${DELETE_GROWTH_MODEL_USER_ACTIVITIES}/${id}`,
      false,
      {},
      true
    );
  } catch (error) {
    throw error;
  }
};

/******************** 
@purpose : Used for get professionField list
@Parameter : {}
@Author : INIC
******************/
export const getProfessionalField = async () => {
  try {
    const response = await get(
      { serviceURL: USER_API_URL },
      GET_PROFESSIONAL_FIELD,
      false,
      true
    );
    if (response.statusCode == 200) {
      return response.data;
    } else {
      return [];
    }
  } catch (error) {
    throw error;
  }
};

/******************** 
@purpose : Used for get professions list
@Parameter : {}
@Author : INIC
******************/
export const getProfession = (data) => async (dispatch) => {
  try {
    const response = await post(
      { serviceURL: USER_API_URL },
      GET_PROFESSIONS,
      false,
      data,
      true
    );
    if (response.statusCode == 200) {
      dispatch(setProfession(response.data));
      return response.data;
    } else {
      return [];
    }
  } catch (error) {
    throw error;
  }
};

/******************** 
@purpose : Set GM department list 
@Parameter : {}
@Author : INIC
******************/

export const setProfession = (data) => ({
  type: types.SET_GM_PROFESSION_LIST,
  data,
});

/******************** 
@purpose : Used for get all professions 
@Parameter : {}
@Author : INIC
******************/
export const getAllProfession = async (data) => {
  try {
    const response = await get(
      { serviceURL: USER_API_URL },
      GET_ALL_PROFESSIONS + data,
      false,
      true
    );
    if (response.statusCode == 200) {
      return response.data;
    } else {
      return [];
    }
  } catch (error) {
    throw error;
  }
};

/******************** 
@purpose : Used for add professions 
@Parameter : { data }
@Author : INIC
******************/
export const addProfession = async (data) => {
  try {
    const response = await post(
      { serviceURL: USER_API_URL },
      ADD_PROFESSIONS,
      true,
      data,
      true
    );
    if (response.statusCode === 200) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    throw error;
  }
};

/******************** 
@purpose : Change Growth Model Step
@Parameter : { data }
@Author : INIC
******************/
export const changeGrowthModelStep = (data) => async (dispatch) => {
  try {
    return dispatch({ type: types.UPDATE_GROWTHMODEL, payload: data });
  } catch (error) {
    throw error;
  }
};

/******************** 
@purpose : Used for get professions list
@Parameter : {}
@Author : INIC
******************/
export const recentlyAddedToGM = (body) => async (dispatch) => {
  try {
    const response = await post(
      { serviceURL: USER_API_URL },
      RECENTLY_ADDED_TO_GM,
      false,
      body,
      true
    );
    if (response.status === 1) {
      dispatch(setRecentAddedToGm(response));
      return response.data;
    } else {
      return [];
    }
  } catch (error) {
    throw error;
  }
};

/******************** 
@purpose : set recent added to gm data
@Parameter : {}
@Author : INIC
******************/

export const setRecentAddedToGm = (data) => ({
  type: types.SET_RECENT_ADD_TO_GM,
  data,
});

/******************** 
@purpose : Used for get professions list
@Parameter : {}
@Author : INIC
******************/
export const mostFollowedContent = (body) => async (dispatch) => {
  try {
    const response = await post(
      { serviceURL: USER_API_URL },
      MOST_FOLLOWED_CONTENT,
      false,
      body,
      true
    );
    if (response.status === 1) {
      dispatch(setMostFollowedContents(response.data));
      return response.data;
    } else {
      return [];
    }
  } catch (error) {
    throw error;
  }
};

/******************** 
@purpose : set recent added to gm data
@Parameter : {}
@Author : INIC
******************/

export const setMostFollowedContents = (data) => ({
  type: types.MOST_FOLLOWED_CONTENT,
  data,
});

/******************** 
@purpose : Used for get Latest Article list
@Parameter : {body, dispatch}
@Author : Yliway
******************/
export const getLatestArticles = (body) => async (dispatch) => {
  try {
    const response = await post(
      { serviceURL: USER_API_URL },
      LATEST_ARTICLES,
      false,
      body,
      true
    );
    if (response.status === 1) {
      dispatch(setLatestArticles(response.data.rows));
      return response.data;
    } else {
      return [];
    }
  } catch (error) {
    throw error;
  }
};

/******************** 
@purpose : set recent added to gm data
@Parameter : {}
@Author : INIC
******************/

export const setLatestArticles = (data) => ({
  type: types.LATEST_ARTICLES,
  data,
});

/******************** 
@purpose : Used to get Most Followed Topics list
@Parameter : {body, dispatch}
@Author : Yliway
******************/
export const getMostFollowedTopics = () => async (dispatch) => {
  try {
    const response = await get(
      { serviceURL: USER_API_URL },
      MOST_FOLLOWED_TOPICS,
      false,
      true
    );
    if (response.status === 1) {
      dispatch(setMostFollowedTopics(response.data.rows));
      return response.data;
    } else {
      return [];
    }
  } catch (error) {
    throw error;
  }
};

/******************** 
@purpose : set Most Followed Topics
@Parameter : {}
@Author : INIC
******************/

export const setMostFollowedTopics = (data) => ({
  type: types.MOST_FOLLOWED_TOPICS,
  data,
});

/******************** 
@purpose : Used to get Most Followed Circles
@Parameter : {body, dispatch}
@Author : Yliway
******************/
export const getMostFollowedCircles = () => async (dispatch) => {
  try {
    const response = await get(
      { serviceURL: USER_API_URL },
      MOST_FOLLOWED_CIRCLES,
      false,
      true
    );
    if (response.status === 1) {
      dispatch(setMostFollowedCircles(response.data.rows));
      return response.data;
    } else {
      return [];
    }
  } catch (error) {
    throw error;
  }
};

/******************** 
@purpose : set Most Followed Circles
@Parameter : {}
@Author : INIC
******************/

export const setMostFollowedCircles = (data) => ({
  type: types.MOST_FOLLOWED_CIRCLES,
  data,
});

/******************* 
  @purpose : To generate acitivity list in required manner
  @Parameter : {courseList}
  @Author : INIC
  ******************/
export const createActivityLists = (courseList, manual = false) => {
  let x = {};

  courseList?.map((v, i) => {
    // skill area index
    let sA = v?.skillArea?.toLowerCase().split(" ").join("_");
    // skill type index
    let sT = v?.skillType?.toLowerCase().split(" ").join("_");
    // course details to save
    let c = {
      activityId: v?.id,
      activityTitle: v?.title,
      authorName: `${v?.UserDetails?.firstName} ${v?.UserDetails?.lastName}`,
      activityCategory: "course",
      activityLink: "/course-detail/" + v?.id,
    };
    if (manual) {
      c["imageUrl"] = v.imageURL;
      c["courseType"] = v.courseType;
      c["enterPrice"] = v.enterPrice;
      c["freePrice"] = v.freePrice;
      c["litePrice"] = v.litePrice;
      c["premiumPrice"] = v.premiumPrice;
    }
    // if skill area exists in object or else creates index for skill area in object
    if (x[sA]) {
      // if skill type exists in object or else creates index for skill type in object
      if (x[sA]["skillTypes"][sT]) {
        x[sA]["skillTypes"][sT]["data"].push(c);
      } else {
        x[sA]["skillTypes"][sT] = {
          typeName: v?.skillType,
          data: [{ ...c }],
        };
      }
    } else {
      x[sA] = {
        name: v?.skillArea,
        skillTypes: {},
      };
      x[sA]["skillTypes"][sT] = {
        typeName: v?.skillType,
        data: [{ ...c }],
      };
    }
  });

  return x;
};

/******************* 
  @purpose : To generate acitivity list in required manner for manual
  @Parameter : {list}
  @Author : INIC
  ******************/
export const createActivityLists2 = (lists) => {
  let listValues = Object.values(lists);
  listValues.map((v, i) => {
    listValues[i].skillTypes = Object.values(v.skillTypes);
  });

  return listValues;
};

/******************** 
@purpose : Used for get growth connection list
@Parameter : { dispatch }
@Author : INIC
******************/
export const getGrowthPartnerList = (data, isFiltered) => async (dispatch) => {
  try {
    const response = await post(
      { serviceURL: USER_API_URL },
      GROWTH_PARTNERS_LIST,
      false,
      data,
      true
    );
    if (response.status === 1) {
      if (data?.searchText || isFiltered) {
        dispatch(setSearchedGrowthPartnerList(response));
      } else {
        dispatch(setGrowthPartnerList(response));
      }
      return Promise.resolve(response);
      // return response.data;
    }
  } catch (error) {
    throw error;
  }
};

export const setSearchedGrowthPartnerList = (response) => async (dispatch) => {
  dispatch({
    type: types.SET_SEARCHED_GROWTH_PARTNER_LIST,
    payload: response,
  });
};
export const setGrowthPartnerList = (response) => async (dispatch) => {
  dispatch({
    type: types.SET_GROWTH_PARTNER_LIST,
    payload: response,
  });
};

/******************** 
@purpose : Used for add/update growth connection activities
@Parameter : { dispatch }
@Author : INIC
******************/
export const addUpdateGrowthPartnerActivities = (data) => async (dispatch) => {
  try {
    const response = await post(
      { serviceURL: USER_API_URL },
      ADD_UPDATE_PARTNERS_ACTIVITY_LIST,
      true,
      data,
      true
    );
    if (response.status === 1) {
      return Promise.resolve(response);
    }
  } catch (error) {
    throw error;
  }
};

/******************** 
@purpose : Used for get growth connection activities
@Parameter : { dispatch }
@Author : INIC
******************/
export const getGrowthPartnerActivities = (data) => async (dispatch) => {
  try {
    const response = await post(
      { serviceURL: USER_API_URL },
      GROWTH_PARTNERS_ACTIVITY_LIST,
      false,
      data,
      true
    );
    if (response.status === 1) {
      dispatch(setGrowthPartnerActivities(response));

      return Promise.resolve(response);
    }
  } catch (error) {
    throw error;
  }
};

/******************** 
@purpose : Used for delete growth connection activities
@Parameter : { dispatch }
@Author : YLIWAY
******************/

export const deleteGrowthPartnerActivities = (id) => async (dispatch) => {
  try {
    const response = await remove(
      { serviceURL: USER_API_URL },
      `${DELETE_GROWTH_PARTNERS_ACTIVITY}/${id}`,
      true,
      {},
      true
    );
    if (response.status === 1) {
      return Promise.resolve(response);
    }
  } catch (error) {
    return Promise.reject(error);
  }
};

export const setGrowthPartnerActivities = (response) => async (dispatch) => {
  dispatch({
    type: types.SET_GROWTH_PARTNER_ACTIVITY_LIST,
    payload: response,
  });
};

/******************** 
@purpose : Used for get growth profession list
@Parameter : { dispatch }
@Author : INIC
******************/
export const getGrowthProfessionList = (data) => async (dispatch) => {
  try {
    const response = await post(
      { serviceURL: USER_API_URL },
      GROWTH_PROFESSION_LIST,
      false,
      data,
      true
    );
    if (response.status === 1) {
      return Promise.resolve(response);
    }
  } catch (error) {
    throw error;
  }
};

/******************** 
@purpose : Used for handling growth partnership goals
@Parameter : { dispatch }
@Author : INIC
******************/
export const manageGrowthPartnershipGoals = (data) => async (dispatch) => {
  try {
    const response = await post(
      { serviceURL: USER_API_URL },
      UPDATE_CONNECTION_GOALS,
      true,
      data,
      true
    );
    if (response.status === 1) {
      return Promise.resolve(response);
    }
  } catch (error) {
    throw error;
  }
};

/********************************************************
 * Create Redux Action to create student feedback
 * @author INIC
 * @returns {Function}
 ********************************************************/
export const addStudentFeedback = (payload) => async (dispatch) => {
  const response = await post(
    { serviceURL: USER_API_URL },
    ADD_STUDENT_FEEDBACK,
    false,
    payload,
    true
  );
  if (response.status === 1) {
    return Promise.resolve(response.message);
  }
};

/******************** 
@purpose : get block id
@Parameter : { }
@Author : INIC
******************/
export const setBlockId = (data) => ({
  type: types.SET_BLOCK_ID,
  payload: data,
});

/******************** 
@purpose : Set Skill block response
@Parameter : { }
@Author : INIC
******************/
// export const setBlockPayload = (data) => ({
//   type: types.SET_BLOCK_PAYLOAD,
//   payload: data,
// });

export const setBlockPayload = (data, type) => async (dispatch) => {
  if (type === "Hard Skill" || type === "Hard Skills") {
    dispatch({
      type: types.SET_BLOCK_PAYLOAD,
      payload: data,
    });
  }
  if (type === "Soft Skill" || type === "Soft Skills") {
    dispatch({
      type: types.SET_SOFTBLOCK_PAYLOAD,
      payload: data,
    });
  }
  if (type === "Traction") {
    dispatch({
      type: types.SET_TRACTION_PAYLOAD,
      payload: data,
    });
  }
  if (type === "Support") {
    dispatch({
      type: types.SET_SUPPORT_PAYLOAD,
      payload: data,
    });
  }
  if (type === "Mindset") {
    dispatch({
      type: types.SET_MINDSET_PAYLOAD,
      payload: data,
    });
  }
  if (type === "Distribution") {
    dispatch({
      type: types.SET_DISTRIBUTION_PAYLOAD,
      payload: data,
    });
  }
};

/******************** 
@purpose : get block flag
@Parameter : {data }
@Author : INIC
******************/
export const getBlockFlag = (data) => async (dispatch) => {
  const res = await get(
    { serviceURL: USER_API_URL },
    `${BLOCK_FLAG}/${data}`,
    false,
    "",
    true
  );
  if (res?.statusCode === 200 && res?.data) {
    return dispatch({ type: types.BLOCK_FLAG_DATA, payload: res?.data });
  }
};

/******************** 
@purpose : set Block Payload Detail Clear
@Parameter : {data}
@Author : INIC
******************/

export const clearActivityPayload = () => ({
  type: types.SAVE_ACTIVITY_CLEAR,
});

export const setGmDetailsRes = (data) => ({
  type: types.SET_GROWTHMODEL_BLANK_RES,
  payload: data,
});

export const getGrowthCoursesRooms = (body, type) => async (dispatch) => {
  const res = await post(
    { serviceURL: USER_API_URL },
    type === "courses" ? OTHER_GROWTH_COURSES : OTHER_GROWTH_ROOMS,
    false,
    body,
    true
  );

  if (res?.data) {
    dispatch(setGrowthCoursesRooms(res.data));
    return Promise.resolve(res.data);
  }
  return Promise.reject(res);
};

export const setGrowthCoursesRooms = (data) => ({
  type: types.SET_GROWTH_ITEMS,
  data,
});

/********************************************************
 * Create Redux Action to create student feedback
 * @author INIC
 * @returns {Function}
 ********************************************************/
export const getAuthorName = (data) => async (dispatch) => {
  try {
    const response = await post(
      { serviceURL: USER_API_URL },
      AUTHOR_NAMELIST,
      false,
      data,
      true
    );
    if (response.statusCode === 200) {
      if (response?.data) {
        dispatch({
          type: types.SET_ACTIVITY_TYPE_DETAIL,
          payload: response?.data?.activityType,
        });
        if (response?.data?.rows?.length > 0) {
          dispatch({
            type: types.SET_AUTHOR_API_DETAIL,
            payload: response?.data,
          });
        }
      }
      return Promise.resolve(response.data);
    }
  } catch (error) {
    throw error;
  }
};

export const clearAuthorName = () => ({
  type: types.CLEAR_AUTHOR_NAMES,
});

export const getStatusGM = () => async (dispatch) => {
  try {
    const response = await get(
      { serviceURL: GROWTH_MODEL_API_URL },
      STATUS_GM,
      false,
      true
    );
    if (response?.statusCode === 200) {
      dispatch(setGMStatusData(response?.data));
      return Promise.resolve(response.data);
    }
  } catch (error) {
    throw error;
  }
};

/******************** 
@purpose : set GM activity status
@Parameter : {}
@Author : INIC
******************/

export const setGMStatusData = (data) => ({
  type: types.GM_STATUS_DATA,
  payload: data,
});

/******************** 
@purpose : set recent added to gm data
@Parameter : {}
@Author : INIC
******************/

export const storeProfessionData = (data) => ({
  type: types.STORE_PROFESSION_STEP_ONE,
  data,
});
/******************** 
@purpose : store job type Step One GM
@Parameter : {}
@Author : INIC
******************/

export const storeJobType = (data) => ({
  type: types.STORE_JOBTYPE_STEP_ONE,
  data,
});

/******************** 
@purpose : get Growth Model Step One
@Parameter : { }
@Author : INIC
******************/
export const getGrowthModelStepOne = () => async (dispatch) => {
  try {
    const res = await get(
      { serviceURL: USER_API_URL },
      GET_GROWTH_MODEL_STEPONE,
      false,
      "",
      true
    );

    if (res?.status === 1) {
      dispatch(storeJobType(res?.data?.jobType));
      dispatch(
        storeProfessionData({
          value: res?.data?.professionField,
          label: res?.data?.profession,
        })
      );
      return Promise.resolve(res);
    }
    return Promise.reject(res);
  } catch (error) {
    throw error;
  }
};

/******************** 
@purpose : Get GM department list 
@Parameter : { }
@Author : INIC
******************/
export const getGMDepartmentList = (searchTxt) => async (dispatch) => {
  try {
    const res = await get(
      { serviceURL: USER_API_URL },
      searchTxt !== ""
        ? GM_DEPARTMENT_LIST + `?searchTxt=${searchTxt}`
        : GM_DEPARTMENT_LIST,
      false,
      "",
      true
    );

    if (res?.status === 1) {
      dispatch(setGMDepartmentList(res.data));
      return Promise.resolve(res.data);
    }
    return Promise.reject(res);
  } catch (error) {
    throw error;
  }
};

/******************** 
@purpose : Set GM department list 
@Parameter : {}
@Author : INIC
******************/

export const setGMDepartmentList = (data) => ({
  type: types.SET_GM_DEPARTMENT_LIST,
  data,
});
