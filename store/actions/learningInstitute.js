import { get, post } from "../../api"; // API Types
import * as types from "./types.js"; // Redux actions payload types
import {
  ABOUT_DATA,
  CREATE_LEARNING_INSTITUTE,
  GET_LEARNING_INSTITUTE_DETAILS,
  LEARNING_INSTITUTE_EVENTS,
  LEARNING_INSTITUTE_FOLLOWER_LIST,
  LIST_SERVICES,
  LEARNING_INSTITUTE_SECTORS,
  LEARNING_INSTITUTE_HOME,
  INSTITUTE_USER_LIST,
  LEARNING_INSTITUTE_JOB_LIST,
  LEARNING_INSTITUTE_COURSES_LIST,
  LIST_FACULTY,
  GROWTH_PARTNERS,
  ADD_UPDATE_JOB,
  JOB_DETAIL_LIST,
  INCOMPLETE_JOB,
  JOB_EVENT_LIST,
  INSTITUTE_PURCHASE_LIST,
  LEARNING_INSTITUTE_DETAILS,
  JOB_CANDIDATE_LIST,
  SINGLE_JOB_CANDIDATE_LIST,
  SINGLE_JOB_CANDIDATE_DETAIL,
  LEARNING_INSTITUTE_FOLLOW_UPDATE,
  APPLY_FOR_JOB,
  SUGGESTED_JOB_LIST,
  SUGGESTED_JOB_DETAIL,
  SUGGESTED_ACTIVITY_LIST,
  LEARNING_VALIDATE_EMAIL,
  LEARNING_INSTITUTE_PEOPLE_LIST,
  LEARNING_INSTITUTE_CURRENT_POSITIONS,
  LEARNING_INSTITUTE_EVENTS_LIST,
} from "./../../api/routes"; // API endpoint routes
import { CONTENTS_API_URL, USER_API_URL } from "../../config";
import { setCookie, showMessageNotification } from "utils";
import { trackEvent } from "@components/segment-analytics";

/********************************************************
 * Create Redux Action to get learning institute sectors
 * @author INIC
 * @returns {Function}
 ********************************************************/
export const getLearningInstituteSectors = (payload) => async (dispatch) => {
  const response = await post(
    { serviceURL: USER_API_URL },
    LEARNING_INSTITUTE_SECTORS,
    false,
    payload,
    true
  );
  if (response.status === 1) {
    dispatch(setLearningInstituteSectors(response.data));
  }
};

export const setLearningInstituteSectors = (payload) => ({
  type: types.SET_LEARNING_INSTITUTE_SECTORS,
  payload,
});

/********************************************************
 * Create Redux Action to create learning institute
 * @author INIC
 * @returns {Function}
 ********************************************************/
export const addLearningInstitute = (payload) => async (dispatch) => {
  const response = await post(
    { serviceURL: USER_API_URL },
    CREATE_LEARNING_INSTITUTE,
    true,
    payload,
    true
  );
  if (response) {
    return response;
  }
};

/******************** 
@purpose :  About info
@Parameter : { }
@Author : INIC
******************/
export const aboutInfo = (id) => async (dispatch) => {
  const res = await get(
    { serviceURL: USER_API_URL },
    ABOUT_DATA + id,
    false,
    "",
    true
  );

  if (res.status === 1) {
    dispatch(aboutData(res.data));
    return Promise.resolve(res.data);
  }
  return Promise.reject(res);
};

/******************** 
@purpose : set About data
@Parameter : { }
@Author : INIC
******************/
export const aboutData = (data) => ({
  type: types.SET_ABOUT_INFO,
  data,
});

/******************* 
@purpose : Store About Us data
@Parameter : {data}
@Author : INIC
******************/
export const learningAboutUsData = (data) => ({
  type: types.ABOUT_US_ADD_UPDATE,
  data,
});

/********************************************************
 * Create Redux Action to  learning institute event
 * @author INIC
 * @returns {Function}
 ********************************************************/

export const learningInstituteEvents = (data) => async (dispatch) => {
  try {
    const response = await post(
      {
        serviceURL: CONTENTS_API_URL,
      },
      LEARNING_INSTITUTE_EVENTS,
      false,
      data,
      true
    );
    if (response.status === 1) {
      if (data?.virtualEventType === "event") {
        if (data?.postType === "past") {
          dispatch({
            type: types.LEARNING_EVENTS_PAST,
            payload: response.data,
          });
        }
        if (data?.postType === "upcoming") {
          dispatch({
            type: types.LEARNING_EVENTS_UPCOMING,
            payload: response.data,
          });
        }
        dispatch({ type: types.LEARNING_EVENTS, payload: response.data });
      }
      if (data?.virtualEventType === "training-room") {
        dispatch({ type: types.LEARNING_TRAINING, payload: response.data });
      }
      if (data?.virtualEventType === "coaching-room") {
        dispatch({ type: types.LEARNING_COACH, payload: response.data });
      }
      if (data?.virtualEventType === "webinar") {
        dispatch({ type: types.LEARNING_WEBINAR, payload: response.data });
      }
      if (data?.virtualEventType === "master-class") {
        dispatch({ type: types.LEARNING_MASTERCLASS, payload: response.data });
      }

      const roomTypes = [
        "training-room",
        "coaching-room",
        "webinar",
        "master-class",
      ];
      if (data?.activityType && roomTypes.includes(data?.activityType)) {
        roomTypes?.map((item) => {
          if (item === "event" && item !== data?.activityType) {
            dispatch({ type: types.LEARNING_EVENTS, payload: [] });
          }
          if (item === "training-room" && item !== data?.activityType) {
            dispatch({
              type: types.LEARNING_TRAINING,
              payload: [],
            });
          }
          if (item === "coaching-room" && item !== data?.activityType) {
            dispatch({ type: types.LEARNING_COACH, payload: [] });
          }
          if (item === "webinar" && item !== data?.activityType) {
            dispatch({
              type: types.LEARNING_WEBINAR,
              payload: [],
            });
          }
          if (item === "master-class" && item !== data?.activityType) {
            dispatch({
              type: types.LEARNING_MASTERCLASS,
              payload: [],
            });
          }
        });

        dispatch({
          type: types.SET_LEARNING_INST_COURSES_LIST_ONLINE,
          payload: [],
        });
        dispatch({
          type: types.SET_LEARNING_INST_COURSES_LIST_OFFLINE,
          payload: [],
        });
      }

      return Promise.resolve();
    }
    return Promise.reject();
  } catch (error) {}
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
  type: types.SET_INSTITUTE_DETAILS,
  payload,
});

/********************************************************
 * Create Redux Action to fetch people listing
 * @author INIC
 * @returns {Function}
 ********************************************************/

export const getPeopleListing =
  ({
    learningInstituteId,
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
        `${LEARNING_INSTITUTE_PEOPLE_LIST}?learningInstituteId=${learningInstituteId}&page=${page}&pageSize=${pagesize}&search=${searchText}&state=${state}&city=${city}&currentPosition=${currentPosition}&country=${country}&startDate=${startDate}&endDate=${endDate}`,
        false,
        true
      );
      if (response.status === 1) {
        if (listingPage) {
          dispatch(setPeopleListingPage(response.data));
        } else {
          dispatch(setPeopleListing(response.data));
          if (isFollowers === true) {
            dispatch(setPeopleListing([]));
          }
        }
        return Promise.resolve();
      }
      return Promise.reject();
    } catch (error) {}
  };

export const setPeopleListing = (payload) => ({
  type: types.SET_PEOPLE_LIST,
  payload,
});
export const setPeopleListingPage = (payload) => ({
  type: types.SET_PEOPLE_LIST_PAGE,
  payload,
});

/********************************************************
 * Create Redux Action to fetch follower listing
 * @author INIC
 * @returns {Function}
 ********************************************************/

export const getFollowerListing =
  (data, listingPage = false) =>
  async (dispatch) => {
    try {
      const response = await post(
        { serviceURL: USER_API_URL },
        LEARNING_INSTITUTE_FOLLOWER_LIST,
        false,
        data,
        true
      );
      if (response.status === 1) {
        if (listingPage) {
          dispatch(setFollowerListingPage(response.data));
        } else {
          dispatch(setFollowerListing(response.data));
          if (data?.isFollowers === false) {
            dispatch(setFollowerListing([]));
          }
        }
        return Promise.resolve();
      }
      return Promise.reject();
    } catch (error) {}
  };

export const setFollowerListingPage = (payload) => ({
  type: types.SET_FOLLOWER_LIST_PAGE,
  payload,
});
export const setFollowerListing = (payload) => ({
  type: types.SET_FOLLOWER_LIST,
  payload,
});

/********************************************************
 * Create Redux Action to follow institute
 * @author INIC
 * @returns {Function}
 ********************************************************/
export const addFollowUpdate = (data) => async (dispatch) => {
  try {
    const response = await post(
      { serviceURL: USER_API_URL },
      LEARNING_INSTITUTE_FOLLOW_UPDATE,
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

/********************************************************
 * Create Redux Action to list institute services
 * @author INIC
 * @returns {Function}
 ********************************************************/

export const getServicesList = (data) => async (dispatch) => {
  try {
    const response = await post(
      { serviceURL: USER_API_URL },
      LIST_SERVICES,
      false,
      data,
      true
    );
    if (response.status === 1) {
      dispatch(setServicesList(response.data));
      return Promise.resolve();
    }
    return Promise.reject();
  } catch (error) {}
};

export const setServicesList = (payload) => ({
  type: types.SET_SERVICES_LIST,
  payload,
});

/******************** 
@purpose :  About info
@Parameter : { }
@Author : INIC
******************/
export const getInstituteHomeInfo = (id) => async (dispatch) => {
  const res = await get(
    { serviceURL: USER_API_URL },
    LEARNING_INSTITUTE_HOME + id,
    false,
    "",
    true
  );
  if (res.status === 1) {
    dispatch(setInstituteHomeInfo(res.data));
    return Promise.resolve(res.data);
  }
  return Promise.reject(res);
};

/******************** 
@purpose : set About data
@Parameter : { }
@Author : INIC
******************/
export const setInstituteHomeInfo = (payload) => ({
  type: types.SET_INSTITUTE_HOME_DETAILS,
  payload,
});

/********************************************************
 * Create Redux Action for User Listing
 * @author INIC
 * @returns {Function}
 ********************************************************/

export const getUserList = (data) => async (dispatch) => {
  try {
    const response = await post(
      { serviceURL: USER_API_URL },
      INSTITUTE_USER_LIST,
      false,
      data,
      true
    );
    if (response.status === 1) {
      dispatch(setUserList(response.data));
      return Promise.resolve(response.data);
    }
    return Promise.reject();
  } catch (error) {}
};

export const setUserList = (data) => ({
  type: types.SET_USERS_LIST,
  data,
});

/********************************************************
 * Create Redux Action to list institute jobs
 * @author INIC
 * @returns {Function}
 ********************************************************/

export const getJobList = (data) => async (dispatch) => {
  try {
    const response = await post(
      { serviceURL: USER_API_URL },
      LEARNING_INSTITUTE_JOB_LIST,
      false,
      data,
      true
    );
    if (response.status === 1) {
      dispatch(setJobList(response.data));
      return Promise.resolve();
    }
    return Promise.reject();
  } catch (error) {
    throw error;
  }
};

export const setJobList = (payload) => ({
  type: types.SET_INSTITUTE_JOB_LIST,
  payload,
});
/********************************************************
 * Create Redux Action to list of suggested jobs
 * @author INIC
 * @returns {Function}
 ********************************************************/

export const getSuggestedJobList = (data) => async (dispatch) => {
  try {
    const response = await post(
      { serviceURL: USER_API_URL },
      SUGGESTED_JOB_LIST,
      false,
      data,
      true
    );
    if (response.status === 1) {
      dispatch(setSuggestedJobList(response.data));
      return Promise.resolve();
    }
    return Promise.reject();
  } catch (error) {
    throw error;
  }
};

export const setOldSelectedJobId = (payload) => {
  return {
    type: types.UPDATE_OLD_SELECTED_JOB_ID,
    payload: payload,
  };
};

export const viewJob = async (payload) => {
  try {
    const res = await post(
      { serviceURL: USER_API_URL },
      "job/view-job",
      false,
      payload,
      true
    );
    if (res.status === 1) {
      trackEvent("job_posting_viewed"); // track segment event
      return Promise.resolve(res);
    } else {
      return Promise.reject(res);
    }
  } catch (err) {
    return Promise.reject(res);
  }
};

export const setSuggestedJobList = (payload) => ({
  type: types.SET_SUGGESTED_JOB_LIST,
  payload,
});

/********************************************************
 * Create Redux Action to list of suggested job detail
 * @author INIC
 * @returns {Function}
 ********************************************************/

export const getSuggestedJobDetail = (id) => async (dispatch) => {
  try {
    const response = await get(
      { serviceURL: USER_API_URL },
      SUGGESTED_JOB_DETAIL + id,
      false,
      true
    );
    if (response.status === 1) {
      dispatch(setSuggestedJobDetail(response.data));
      return Promise.resolve(response.data);
    }
    return Promise.reject();
  } catch (error) {
    throw error;
  }
};
export const flagJob = async (payload) => {
  try {
    const response = await post(
      { serviceURL: USER_API_URL },
      "job/flag-job",
      false,
      payload,
      true
    );
    if (response.status == 1) {
      return Promise.resolve(response.data);
    }
    return Promise.reject();
  } catch (error) {
    throw error;
  }
};
export const setSuggestedJobDetail = (payload) => ({
  type: types.SET_SUGGESTED_JOB_DETAIL,
  payload,
});

/********************************************************
 * Create Redux Action to list of suggested jobs
 * @author INIC
 * @returns {Function}
 ********************************************************/

export const getSuggestedJobActivities = (data) => async (dispatch) => {
  try {
    const response = await post(
      { serviceURL: USER_API_URL },
      SUGGESTED_ACTIVITY_LIST,
      false,
      data,
      true
    );
    if (response.status === 1) {
      dispatch(setSuggestedJobActivities(response.data));
      return Promise.resolve();
    }
    return Promise.reject();
  } catch (error) {
    throw error;
  }
};

export const setSuggestedJobActivities = (payload) => ({
  type: types.SET_SUGGESTED_ACTIVITY_LIST,
  payload,
});

/********************************************************
 * Create Redux Action to list institute faculty
 * @author INIC
 * @returns {Function}
 ********************************************************/

export const getFacultyList = (data) => async (dispatch) => {
  try {
    const response = await post(
      { serviceURL: USER_API_URL },
      LIST_FACULTY,
      false,
      data,
      true
    );
    if (response.status === 1) {
      dispatch(setFacultyList(response.data));
      return Promise.resolve();
    }
    return Promise.reject();
  } catch (error) {}
};

export const setFacultyList = (payload) => ({
  type: types.SET_FACULTY_LIST,
  payload,
});

// export const fetchLearningInstCourses = (data) => async (dispatch) => {
//   try {
//     const response = await post(
//       { serviceURL: USER_API_URL },
//       `${LEARNING_INSTITUTE_COURSES_LIST}/`,
//       false,
//       data,
//       true
//     );
//     if (response.status === 1) {
//       dispatch({
//         type: types.SET_LEARNING_INST_COURSES_LIST,
//         payload: response,
//       });
//       return Promise.resolve();
//     }
//     return Promise.reject();
//   } catch (error) {}
// };

export const fetchLearningInstCourses = (data) => async (dispatch) => {
  try {
    const response = await post(
      { serviceURL: USER_API_URL },
      `${LEARNING_INSTITUTE_COURSES_LIST}`,
      false,
      data,
      true
    );
    if (response.status === 1) {
      dispatch({
        type: types.SET_LEARNING_INST_COURSES_LIST,
        payload: response,
      });
      if (data?.activityType) {
        if (data?.activityType == "offline") {
          dispatch({
            type: types.SET_LEARNING_INST_COURSES_LIST_OFFLINE,
            payload: response,
          });
        } else {
          dispatch({
            type: types.SET_LEARNING_INST_COURSES_LIST_ONLINE,
            payload: response,
          });
        }

        dispatch({ type: types.LEARNING_TRAINING, payload: [] });
        dispatch({ type: types.LEARNING_COACH, payload: [] });
        dispatch({ type: types.LEARNING_WEBINAR, payload: [] });
        dispatch({
          type: types.LEARNING_MASTERCLASS,
          payload: [],
        });
        if (data?.activityType == "offline")
          dispatch({
            type: types.SET_LEARNING_INST_COURSES_LIST_ONLINE,
            payload: [],
          });
        else
          dispatch({
            type: types.SET_LEARNING_INST_COURSES_LIST_OFFLINE,
            payload: [],
          });
      } else {
        if (data?.courseType?.length == 1 && data?.courseType[0] == "offline") {
          dispatch({
            type: types.SET_LEARNING_INST_COURSES_LIST_OFFLINE,
            payload: response,
          });
        } else if (
          data?.courseType?.length == 1 &&
          data?.courseType[0] == "online"
        ) {
          dispatch({
            type: types.SET_LEARNING_INST_COURSES_LIST_ONLINE,
            payload: response,
          });
        }
      }

      return Promise.resolve();
    }
    return Promise.reject();
  } catch (error) {}
};

/********************************************************
 * Create Redux Action for User Listing
 * @author INIC
 * @returns {Function}
 ********************************************************/

export const getPurchaseList = (data) => async (dispatch) => {
  try {
    const response = await post(
      { serviceURL: USER_API_URL },
      INSTITUTE_PURCHASE_LIST,
      false,
      data,
      true
    );
    if (response.status === 1) {
      dispatch(setPurchaseList(response.data));
      return Promise.resolve(response.data);
    }
    return Promise.reject();
  } catch (error) {}
};

export const setPurchaseList = (data) => ({
  type: types.SET_PURCHASE_LIST,
  data,
});

/********************************************************
 * Create Redux Action for User Listing
 * @author INIC
 * @returns {Function}
 ********************************************************/

export const getLearningInstituteDetails =
  (id, fetchCurrentUserFollowStatus = false) =>
  async (dispatch) => {
    try {
      const response = await get(
        { serviceURL: USER_API_URL },
        LEARNING_INSTITUTE_DETAILS +
          id +
          `?fetchCurrentUserFollowStatus=${fetchCurrentUserFollowStatus}`,
        false,
        "",
        true
      );

      if (response.status === 1) {
        dispatch(setLearningDetails(response.data));
        return Promise.resolve(response.data);
      }
      return Promise.reject();
    } catch (error) {}
  };

/******************** 
@purpose : Used for get growth model activities
@Parameter : { dispatch }
@Author : INIC
******************/
export const getGrowthPartnerList = (data) => async (dispatch) => {
  try {
    const response = await post(
      { serviceURL: USER_API_URL },
      GROWTH_PARTNERS,
      false,
      data,
      true
    );
    if (response.status === 1) {
      dispatch(setGrowthPartnerList(response));
      return response.data;
    }
  } catch (error) {
    throw error;
  }
};

export const setGrowthPartnerList = (response) => async (dispatch) =>
  dispatch({
    type: types.SET_GROWTH_PARTNER_LIST,
    payload: response.data,
  });

/******************** 
@purpose : Used for add update job
@Parameter : { dispatch }
@Author : INIC
******************/

export const addUpdateJob = (data) => async (dispatch) => {
  try {
    const response = await post(
      { serviceURL: USER_API_URL },
      ADD_UPDATE_JOB,
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

export const setLearningDetails = (data) => ({
  type: types.SET_LEARNING_DETAILS,
  data,
});
/******************** 
@purpose : Used job detail
@Parameter : { dispatch }
@Author : INIC
******************/
export const getJobDetail = (id) => async (dispatch) => {
  try {
    const response = await get(
      { serviceURL: USER_API_URL },
      JOB_DETAIL_LIST + id,
      false,
      true
    );
    if (response.status === 1) {
      dispatch(setJobDetail(response.data));
      return Promise.resolve();
    }
    return Promise.reject();
  } catch (error) {
    throw error;
  }
};

export const setJobDetail = (payload) => ({
  type: types.SET_INSTITUTE_JOB_DETAIL,
  payload,
});
/******************** 
@purpose : Used job detail
@Parameter : { dispatch }
@Author : INIC
******************/
export const getJobEventList = (id) => async (dispatch) => {
  try {
    const response = await get(
      { serviceURL: USER_API_URL },
      JOB_EVENT_LIST + id,
      false,
      true
    );
    if (response.status === 1) {
      dispatch(setJobEventList(response.data));
      return Promise.resolve();
    }
    return Promise.reject();
  } catch (error) {
    throw error;
  }
};

export const setJobEventList = (payload) => ({
  type: types.SET_INSTITUTE_JOB_EVENT_LIST,
  payload,
});
/******************** 
@purpose : Used for fetching incomplte job 
@Parameter : { dispatch }
@Author : INIC
******************/
export const getIncompleteJobDetail = (id) => async (dispatch) => {
  try {
    const response = await get(
      { serviceURL: USER_API_URL },
      INCOMPLETE_JOB + id,
      false,
      true
    );
    if (response.status === 1) {
      return Promise.resolve(response.data);
    }
    return Promise.reject();
  } catch (error) {
    throw error;
  }
};
/******************** 
@purpose : Used job detail
@Parameter : { dispatch }
@Author : INIC
******************/
export const getJobCandidateList = (data) => async (dispatch) => {
  try {
    const response = await post(
      { serviceURL: USER_API_URL },
      JOB_CANDIDATE_LIST,
      false,
      data,
      true
    );
    if (response.status === 1) {
      dispatch(setJobCandidateList(response.data));
      return Promise.resolve(response.data);
    }
    return Promise.reject();
  } catch (error) {
    throw error;
  }
};

export const setJobCandidateList = (payload) => ({
  type: types.SET_INSTITUTE_JOB_CANDIDATE_LIST,
  payload,
});

/******************** 
@purpose : Used job listing for single job
@Parameter : { dispatch }
@Author : INIC
******************/
export const getSingleJobCandidateList = (data) => async (dispatch) => {
  try {
    const response = await post(
      { serviceURL: USER_API_URL },
      SINGLE_JOB_CANDIDATE_LIST,
      false,
      data,
      true
    );
    if (response.status === 1) {
      dispatch(setSingleJobCandidateList(response.data));
      return Promise.resolve(response.data);
    }
    return Promise.reject();
  } catch (error) {
    throw error;
  }
};

export const setSingleJobCandidateList = (payload) => ({
  type: types.SET_INSTITUTE_SINGLE_JOB_CANDIDATE_LIST,
  payload,
});

/******************** 
@purpose : Used job candidate detail for single job
@Parameter : { dispatch }
@Author : INIC
******************/
export const getSingleJobCandidateDetail = (data) => async (dispatch) => {
  try {
    const response = await post(
      { serviceURL: USER_API_URL },
      SINGLE_JOB_CANDIDATE_DETAIL,
      false,
      data,
      true
    );
    if (response.status === 1) {
      dispatch(setSingleJobCandidateDetail(response.data));
      return Promise.resolve(response.data);
    }
    return Promise.reject();
  } catch (error) {
    throw error;
  }
};

export const setSingleJobCandidateDetail = (payload) => ({
  type: types.SET_INSTITUTE_SINGLE_JOB_CANDIDATE_DETAIL,
  payload,
});

/******************** 
@purpose : Used to set rendering type of job tab
@Parameter : { dispatch }
@Author : INIC
******************/
export const setJobRendering = (payload) => ({
  type: types.SET_JOB_RENDER,
  payload,
});

/******************** 
@purpose : Used to apply for the job
@Parameter : { dispatch }
@Author : INIC
******************/
export const applyForJob = (data) => async (dispatch) => {
  try {
    const response = await post(
      { serviceURL: USER_API_URL },
      APPLY_FOR_JOB,
      false,
      data,
      true
    );
    if (response.status === 1) {
      return Promise.resolve(response);
    }
    return Promise.reject();
  } catch (error) {
    throw error;
  }
};

export const getValidateEmail = (payload) => async (dispatch) => {
  const response = await post(
    { serviceURL: USER_API_URL },
    LEARNING_VALIDATE_EMAIL,
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
export const getCurrentPostionList = async (data) => {
  try {
    const response = await post(
      { serviceURL: USER_API_URL },
      LEARNING_INSTITUTE_CURRENT_POSITIONS,
      false,
      data,
      true
    );
    if (response.status === 1) {
      return Promise.resolve(response?.data);
    }
    return Promise.reject();
  } catch (error) {
    console.log(error);
  }
};
