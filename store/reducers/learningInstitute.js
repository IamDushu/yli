import * as types from "@actions";
import { getCookie } from "utils";

/******************* 
@purpose : Intital about us reducer data
@Author : INIC
******************/
const initialState = {
  aboutData: [],
  aboutUsData: {},
  eventData: [],
  eventDataPast: [],
  eventDataUpcoming: [],
  instituteDetails: getCookie("instituteDetails"),
  peopleList: [],
  peopleListPage: [],
  followerList: [],
  followerListPage: [],
  servicesList: [],
  sectors: [],
  instituteHomeDetails: {},
  getUserLists: [],
  instituteJobList: [],
  suggestedJobList: {},
  suggestedActivityList: {},
  suggestedJobDetail: {},
  learningInstituteCourseList: [],
  facultyList: [],
  growthPartnerList: [],
  jobDetail: [],
  jobEventList: [],
  purchaseList: [],
  learningData: {},
  candidateListing: [],
  singleJobCandidateListing: [],
  singleJobCandidateDetail: [],
  jobRender: {},
  trainingList: [],
  coachList: [],
  webinarList: [],
  masterClassList: [],
  oldSelectedJobId: -1,
  learninginstcourselistonline: [],
  learninginstcourselistoffline: [],
  SET_LEARNING_INST_COURSES_LIST_ONLINE: [],
};

/******************* 
@purpose : about us reducer
@Parameter : {testimonial_ini_data, action}
@Author : INIC
******************/
const learningInstitute = (about_ini_data = initialState, action = {}) => {
  switch (action.type) {
    // Set about us information
    case types.SET_ABOUT_INFO:
      return {
        ...about_ini_data,
        aboutData: action.data,
      };
    case types.LEARNING_EVENTS:
      return {
        ...about_ini_data,
        eventData: action.payload,
      };
    case types.LEARNING_EVENTS_PAST:
      return {
        ...about_ini_data,
        eventDataPast: action.payload,
      };
    case types.LEARNING_EVENTS_UPCOMING:
      return {
        ...about_ini_data,
        eventDataUpcoming: action.payload,
      };
    case types.LEARNING_TRAINING:
      return {
        ...about_ini_data,
        trainingList: action.payload,
      };
    case types.LEARNING_COACH:
      return {
        ...about_ini_data,
        coachList: action.payload,
      };
    case types.LEARNING_WEBINAR:
      return {
        ...about_ini_data,
        webinarList: action.payload,
      };
    case types.LEARNING_MASTERCLASS:
      return {
        ...about_ini_data,
        masterClassList: action.payload,
      };
    case types.ABOUT_US_ADD_UPDATE:
      return {
        ...about_ini_data,
        aboutUsData: action.data,
      };
    case types.SET_USERS_LIST:
      return {
        ...about_ini_data,
        getUserLists: action.data,
      };

    case types.SET_INSTITUTE_DETAILS:
      return Object.assign({}, about_ini_data, {
        instituteDetails: action.payload,
      });

    case types.SET_FOLLOWER_LIST:
      return Object.assign({}, about_ini_data, {
        followerList: action.payload,
      });
    case types.SET_FOLLOWER_LIST_PAGE:
      return Object.assign({}, about_ini_data, {
        followerListPage: action.payload,
      });
    case types.SET_PEOPLE_LIST:
      return Object.assign({}, about_ini_data, {
        peopleList: action.payload,
      });
    case types.SET_PEOPLE_LIST_PAGE:
      return Object.assign({}, about_ini_data, {
        peopleListPage: action.payload,
      });
    case types.SET_SERVICES_LIST:
      return Object.assign({}, about_ini_data, {
        servicesList: action.payload,
      });

    case types.SET_LEARNING_INSTITUTE_SECTORS:
      return Object.assign({}, about_ini_data, {
        sectors: action.payload,
      });
    case types.SET_INSTITUTE_HOME_DETAILS:
      return Object.assign({}, about_ini_data, {
        instituteHomeDetails: action.payload,
      });
    case types.SET_INSTITUTE_JOB_LIST:
      return Object.assign({}, about_ini_data, {
        instituteJobList: action.payload,
      });
    case types.SET_SUGGESTED_JOB_LIST:
      return Object.assign({}, about_ini_data, {
        suggestedJobList: action.payload,
      });
    case types.SET_SUGGESTED_JOB_DETAIL:
      return Object.assign({}, about_ini_data, {
        suggestedJobDetail: action.payload,
      });
    case types.SET_SUGGESTED_ACTIVITY_LIST:
      return Object.assign({}, about_ini_data, {
        suggestedActivityList: action.payload,
      });
    case types.SET_LEARNING_INST_COURSES_LIST:
      return Object.assign({}, about_ini_data, {
        learninginstcourselist: action.payload,
      });
    case types.SET_LEARNING_INST_COURSES_LIST_OFFLINE:
      return Object.assign({}, about_ini_data, {
        learninginstcourselistoffline: action.payload,
      });
    case types.SET_LEARNING_INST_COURSES_LIST_ONLINE:
      return Object.assign({}, about_ini_data, {
        learninginstcourselistonline: action.payload,
      });
    case types.SET_FACULTY_LIST:
      return Object.assign({}, about_ini_data, {
        facultyList: action.payload,
      });
    case types.SET_GROWTH_PARTNER_LIST: {
      return Object.assign({}, about_ini_data, {
        growthPartnerList: action.payload,
      });
    }
    case types.SET_INSTITUTE_JOB_DETAIL:
      return Object.assign({}, about_ini_data, {
        jobDetail: action.payload,
      });
    case types.SET_INSTITUTE_JOB_EVENT_LIST:
      return Object.assign({}, about_ini_data, {
        jobEventList: action.payload,
      });
    case types.SET_PURCHASE_LIST:
      return Object.assign({}, about_ini_data, {
        purchaseList: action.data,
      });
    case types.SET_LEARNING_DETAILS:
      return Object.assign({}, about_ini_data, {
        learningData: action.data,
      });
    case types.SET_INSTITUTE_JOB_CANDIDATE_LIST:
      return Object.assign({}, about_ini_data, {
        candidateListing: action.payload,
      });
    case types.SET_INSTITUTE_SINGLE_JOB_CANDIDATE_LIST:
      return Object.assign({}, about_ini_data, {
        singleJobCandidateListing: action.payload,
      });
    case types.SET_INSTITUTE_SINGLE_JOB_CANDIDATE_DETAIL:
      return Object.assign({}, about_ini_data, {
        singleJobCandidateDetail: action.payload,
      });
    case types.SET_JOB_RENDER:
      return Object.assign({}, about_ini_data, {
        jobRender: action.payload,
      });
    case types.UPDATE_OLD_SELECTED_JOB_ID:
      return Object.assign({}, about_ini_data, {
        oldSelectedJobId: action.payload,
      });

    default:
      return about_ini_data;
  }
};

export default learningInstitute;
