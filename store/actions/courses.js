import { get, post } from "@api";
import * as types from "@actions"; // Redux actions payload types
import { ADMIN_API_URL, USER_API_URL, PAYMENT_API_URL } from "@config";
import {
  GET_TAGS,
  ADD_TAGS,
  GET_CONFIGURATION,
  UPLOAD_COURSE,
  COURSE_DETAIL_TEACHER,
  ADD_UPDATE_CHAPTER,
  COURSE_DETAIL,
  JOIN_COURSE,
  QUIZ_QUESTIONS,
  QUIZ_QUESTIONSLIST,
  QUIZ_ANSWERS,
  PRACTICAL_TESTQUES_LIST,
  PRACTICAL_TESTQUES_ANSWER,
  MY_LEARNING,
  MY_LEARNING_PAGINATION,
  USER_LESSON_VIEWS,
  UPDATE_COURSE_TEXT,
  GENERATE_COURSE_CERTIFICATE,
  GET_CERTIFICATE_DETAILS,
  COURSE_PLAYLIST,
  QUIZ_ANSWERS_QUESTION,
  QUIZ_DETAILS,
  GET_LESSON_VIDEO,
  GET_CHAPTER_PDF,
} from "api/routes";

import store from "store";
import { toggleLoader } from "./ui";
import { courseGet } from "api";
import { DASHBOARD } from "routes/urls";

/******************** 
@purpose : Used for fetching tags
@Parameter : { data }
@Author : INIC
******************/
export const fetchTags = async (data) => {
  try {
    const response = await post(
      { serviceURL: ADMIN_API_URL },
      `${GET_TAGS}/`,
      false,
      data,
      true
    );
    if (response.status === 1) {
      return response;
    }
    return false;
  } catch (error) {}
};

/******************** 
@purpose : Used for adding tags
@Parameter : { data }
@Author : INIC
******************/
export const addTags = async (data) => {
  try {
    const response = await post(
      { serviceURL: ADMIN_API_URL },
      `${ADD_TAGS}/`,
      false,
      data,
      true
    );
    if (response.status === 1) {
      return true;
    }
    return false;
  } catch (error) {}
};

/******************** 
@purpose : Used for configurations peer producers
@Parameter : { data }
@Author : INIC
******************/
export const getConfiguration = async () => {
  try {
    const response = await get(
      { serviceURL: ADMIN_API_URL },
      `${GET_CONFIGURATION}/`,
      false,
      true
    );
    if (response.status === 1) {
      return response;
    }
    return false;
  } catch (error) {}
};

/******************** 
@purpose : Used for uploading course
@Parameter : { data }
@Author : INIC
******************/
export const uploadCourse = async (data) => {
  try {
    const response = await post(
      { serviceURL: USER_API_URL },
      `${UPLOAD_COURSE}/`,
      false,
      data,
      true
    );
    if (response.status === 1) {
      return response.data;
    }
    return false;
  } catch (error) {}
};

/******************** 
@purpose : Used for fetching courses
@Parameter : { data }
@Author : INIC
******************/
export const fetchCourses = (data) => async (dispatch) => {
  dispatch(toggleLoader(true, "courseloader"));
  const { workwithus } = store.getState().aboutUsInfo;
  try {
    const response = await post(
      { serviceURL: USER_API_URL },
      workwithus.course ? "other-n-Courses" : "other-o-Courses",
      false,
      data,
      true
    );

    if (response.status === 1) {
      dispatch(toggleLoader(false, "courseloader"));
      dispatch({ type: types.SET_COURSES, payload: response });
      return Promise.resolve();
    }
    return Promise.reject();
  } catch (error) {}
};

/******************** 
@purpose : Used for fetching course detail
@Parameter : { data }
@Author : INIC
******************/
export const getCourseDetail = (id, router) => async (dispatch) => {
  dispatch(toggleLoader(true, "courseDetailLoader"));
  try {
    const response = await get(
      { serviceURL: USER_API_URL },
      `${COURSE_DETAIL}/${id}`,
      false,
      true
    );
    if (response.status === 1) {
      dispatch(toggleLoader(false, "courseDetailLoader"));
      dispatch(setCourseDetail(response.data));
      return response;
    }
    if (!response.data) {
      router.push(DASHBOARD);
    }
    return false;
  } catch (error) {
    throw error;
  }
};

export const setCourseDetail = (data) => async (dispatch) => {
  dispatch({
    type: types.SET_COURSE_DETAIL,
    payload: data,
  });
};

/******************** 
@purpose : Used for fetching course playlist
@Parameter : { id }
@Author : INIC
******************/
export const getCoursePlaylist = (id) => async (dispatch) => {
  try {
    const response = await get(
      { serviceURL: USER_API_URL },
      `${COURSE_PLAYLIST}/${id}`,
      false,
      true
    );
    if (response.status === 1) {
      dispatch(setCoursePlaylist(response.data));
      return response;
    }
    return false;
  } catch (error) {
    throw error;
  }
};

export const setCoursePlaylist = (data) => async (dispatch) => {
  dispatch({
    type: types.SET_COURSE_PLAYLIST,
    payload: data,
  });
};

/******************** 
@purpose : Used for join a course
@Parameter : { data }
@Author : INIC
******************/
export const joinCourse = async (id) => {
  try {
    const response = await get(
      { serviceURL: PAYMENT_API_URL },
      `${JOIN_COURSE}/${id}`,
      false,
      true
    );
    if (response.status === 1) {
      return response;
    }
    return false;
  } catch (error) {}
};

/******************** 
@purpose : Used for fetching course detail teacher
@Parameter : { data }
@Author : INIC
******************/
export const getCourseDetailsTeacher = async (id) => {
  try {
    const response = await get(
      { serviceURL: USER_API_URL },
      `${COURSE_DETAIL_TEACHER}/${id}`,
      false,
      true
    );
    if (response.status === 1) {
      return response;
    }
    return false;
  } catch (error) {}
};

/******************** 
@purpose : Used for uploading chapter
@Parameter : { data }
@Author : INIC
******************/
export const addUpdateChapter = (data) => async (dispatch) => {
  try {
    const response = await post(
      { serviceURL: USER_API_URL },
      `${ADD_UPDATE_CHAPTER}/`,
      false,
      data,
      true
    );
    if (response.status === 1) {
      dispatch({ type: types.ADD_UPDATE_CHAPTER, payload: response.data });
      return true;
    }
    return false;
  } catch (error) {}
};

/******************** 
@purpose : Used for fetching quiz questions
@Parameter : { data }
@Author : INIC
******************/
export const fetchQuizQuestions = (data) => async (dispatch) => {
  try {
    const response = await post(
      { serviceURL: USER_API_URL },
      QUIZ_QUESTIONS,
      false,
      data,
      true
    );
    if (response.status === 1) {
      dispatch({
        type: types.SET_QUIZ_QUESTIONS,
        payload: response?.data?.rows,
      });

      return response.data;
    }
  } catch (error) {}
};

/******************** 
@purpose : Used for fetching quiz details
@Parameter : { id }
@Author : INIC
******************/
export const getQuizDetails = (id) => async (dispatch) => {
  try {
    const response = await get(
      { serviceURL: USER_API_URL },
      `${QUIZ_DETAILS}/${id}`,
      false,
      true
    );
    if (response.status === 1) {
      dispatch({
        type: types.SET_SINGLE_QUIZ_QUESTIONS,
        payload: response.data,
      });
      return response.data;
    }
    return false;
  } catch (error) {}
};

/******************** 
@purpose : Used for quiz question answer
@Parameter : { data }
@Author : INIC
******************/
export const setQuizAnswer = (data) => async (dispatch) => {
  try {
    const response = await post(
      { serviceURL: USER_API_URL },
      QUIZ_ANSWERS_QUESTION,
      false,
      data,
      true
    );
    if (response.status === 1) {
      return response.data;
    }
    return Promise.reject();
  } catch (error) {}
};

/******************* 
  @Purpose : Used for get video duration
  @Parameter : {}
  @Author : INIC
  ******************/
export const getVideoDuration = async (blob) => {
  const tempVideoEl = document.createElement("video");

  const durationP = new Promise((resolve, reject) => {
    tempVideoEl.addEventListener("loadedmetadata", () => {
      // Chrome bug: https://bugs.chromium.org/p/chromium/issues/detail?id=642012
      if (tempVideoEl.duration === Infinity) {
        tempVideoEl.currentTime = Number.MAX_SAFE_INTEGER;
        tempVideoEl.ontimeupdate = () => {
          tempVideoEl.ontimeupdate = null;
          resolve(tempVideoEl.duration);
          tempVideoEl.currentTime = 0;
        };
      }
      // Normal behavior
      else resolve(tempVideoEl.duration);
    });
    tempVideoEl.onerror = (event) => {
      // reject(event.target.error);
      resolve("0");
    };
  });

  tempVideoEl.src =
    typeof blob === "string" || blob instanceof String
      ? blob
      : window.URL.createObjectURL(blob);
  let x = await durationP;
  return Math.floor(x);
};

/******************** 
@purpose : Used for fetching lessons
@Parameter : { data }
@Author : INIC
******************/
export const fetchQuizQuestionsList = (data) => async (dispatch) => {
  try {
    const response = await post(
      { serviceURL: USER_API_URL },
      QUIZ_QUESTIONSLIST,
      false,
      data,
      true
    );
    if (response.status === 1) {
      // showMessageNotification(response.message)
      dispatch({
        type: types.QUIZ_QUESTIONS_LIST,
        payload: response.data.rows,
      });
      return Promise.resolve();
    }
    return Promise.reject();
  } catch (error) {}
};

export const fetchQuizAnswers = (data) => async (dispatch) => {
  try {
    const response = await post(
      { serviceURL: USER_API_URL },
      QUIZ_ANSWERS,
      false,
      data,
      true
    );
    if (response.status === 1) {
      // showMessageNotification(response.message)
      dispatch({
        type: types.QUIZ_ANSWERS_LIST,
        payload: response.data.result,
      });
      return Promise.resolve();
    }
    return Promise.reject();
  } catch (error) {}
};

export const QuizQuestionsClear = () => async (dispatch) => {
  return dispatch({
    type: types.QUIZ_QUES_CLEAR,
  });
};

export const fetchPracticalTestList = (data) => async (dispatch) => {
  try {
    const response = await post(
      { serviceURL: USER_API_URL },
      PRACTICAL_TESTQUES_LIST,
      false,
      data,
      true
    );
    if (response.status === 1) {
      dispatch({
        type: types.PRACTICAL_TEST_QUESTIONS_LIST,
        payload: response.data.rows,
      });
      return Promise.resolve();
    }
    return Promise.reject();
  } catch (error) {}
};

export const fetchPracticalTestAnswers = (data) => async (dispatch) => {
  try {
    const response = await post(
      { serviceURL: USER_API_URL },
      PRACTICAL_TESTQUES_ANSWER,
      false,
      data,
      true
    );

    if (response.status === 1) {
      dispatch({
        type: types.PRACTICAL_TEST_ANSWERS_LIST,
        payload: response.data,
      });
      return Promise.resolve();
    }
    return Promise.reject();
  } catch (error) {}
};

export const fetchMyLearningData = (data) => async (dispatch) => {
  try {
    const response = await post(
      { serviceURL: USER_API_URL },
      MY_LEARNING,
      false,
      data,
      true
    );

    if (response.status === 1) {
      dispatch({
        type: types.MY_LEARNING_LIST,
        payload: response.data.rows,
      });
      return Promise.resolve();
    }
    return Promise.reject();
  } catch (error) {}
};

export const fetchMyLearningPaginationData = (data) => async (dispatch) => {
  try {
    const response = await post(
      { serviceURL: USER_API_URL },
      MY_LEARNING_PAGINATION,
      false,
      data,
      true
    );
    if (data.type === "course" && response.status === 1) {
      dispatch({
        type: types.MY_LEARNING_COURSE_LIST,
        payload: response.data,
      });
    }
    if (data.type === "training-room" && response.status === 1) {
      dispatch({
        type: types.MY_LEARNING_TRAININGROOM_LIST,
        payload: response.data,
      });
    }
    if (data.type === "event" && response.status === 1) {
      dispatch({
        type: types.MY_LEARNING_EVENT_LIST,
        payload: response.data,
      });
    }
    if (data.type === "webinar" && response.status === 1) {
      dispatch({
        type: types.MY_LEARNING_WEBINAR_LIST,
        payload: response.data,
      });
    }
    if (data.type === "coaching-room" && response.status === 1) {
      dispatch({
        type: types.MY_LEARNING_COACHINGROOM_LIST,
        payload: response.data,
      });
    }
    if (data.type === "business-network-room" && response.status === 1) {
      dispatch({
        type: types.MY_LEARNING_BNR_LIST,
        payload: response.data,
      });
    }
    if (data.type === "master-class" && response.status === 1) {
      dispatch({
        type: types.MY_LEARNING_MASTERCLASS_LIST,
        payload: response.data,
      });
    }
    if (data.type === "welcome-room" && response.status === 1) {
      dispatch({
        type: types.MY_LEARNING_WELCOME_ROOM,
        payload: response.data,
      });
    }
    return Promise.reject();
  } catch (error) {}
};

/******************** 
@purpose : Used for tracking course
@Parameter : { }
@Author : INIC
******************/
export const updateUserViews = (data) => async (dispatch) => {
  try {
    const response = await post(
      { serviceURL: USER_API_URL },
      USER_LESSON_VIEWS,
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
@purpose : Used for tracking course text
@Parameter : { }
@Author : INIC
******************/
export const updateUserText = (data) => async (dispatch) => {
  try {
    const response = await post(
      { serviceURL: USER_API_URL },
      UPDATE_COURSE_TEXT,
      false,
      data,
      true
    );

    if (response.status === 1) {
      return Promise.resolve();
    }
    return Promise.reject();
  } catch (error) {}
};

/******************** 
@purpose : Used for generating certificares
@Parameter : { }
@Author : INIC
******************/
export const generateCertificate = (id) => async (dispatch) => {
  try {
    const response = await get(
      { serviceURL: USER_API_URL },
      GENERATE_COURSE_CERTIFICATE + id,
      false,
      true
    );

    if (response.status === 1) {
      dispatch(setGenerateCertificate(response.data));
      return Promise.resolve(response);
    }
    return Promise.reject();
  } catch (error) {
    throw error;
  }
};

/******************** 
@purpose : Used for set generating certificares
@Parameter : { }
@Author : INIC
******************/
export const setGenerateCertificate = (data) => async (dispatch) => {
  dispatch({
    type: types.SET_CERTIFICATE_DETAIL,
    payload: data,
  });
};

/******************** 
@purpose : Used for get certificate detail
@Parameter : { }
@Author : INIC
******************/
export const getCertificateDetails = (id) => async (dispatch) => {
  try {
    const response = await get(
      { serviceURL: USER_API_URL },
      GET_CERTIFICATE_DETAILS + id,
      false,
      true
    );

    if (response.status === 1) {
      dispatch(setCertificateDetails(response.data));
      return Promise.resolve(response?.data);
    }
    return Promise.reject();
  } catch (error) {}
};

/******************** 
@purpose : Used for set certificate detail
@Parameter : { }
@Author : INIC
******************/
export const setCertificateDetails = (data) => async (dispatch) => {
  dispatch({
    type: types.SET_CERTIFICATE_DETAIL,
    payload: data,
  });
};

/******************** 
@purpose : Used for get video
@Parameter : { }
@Author : INIC
******************/
export const getLessonVideo = (id) => async (dispatch) => {
  try {
    const response = await courseGet(
      { serviceURL: USER_API_URL },
      GET_LESSON_VIDEO + id,
      false,
      true
    );

    if (response.status === 1) {
      return Promise.resolve(response.data);
    }
  } catch (error) {}
};

export const getChapterPdf = (id) => async (dispatch) => {
  try {
    const response = await courseGet(
      { serviceURL: USER_API_URL },
      GET_CHAPTER_PDF + id,
      false,
      true
    );

    if (response.status === 1) {
      return Promise.resolve(response.data);
    }
  } catch (error) {}
};
