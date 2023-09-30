import * as types from "@actions";

/******************* 
@purpose : Intital Groups reducer data
@Author : INIC
******************/
const initialState = {
  growthModelDetail: {},
  growthModelActivities: [],
  growthPartnerList: [],
  growthPartnerActivityList: [],
  searchedGrowthPartnerList: [],
  growthPartners: [],
  blockId: "",
  blockPayload: [],
  otherCoursesRooms: [],
  filterAuthors: [],
  filterActivityType: [],
  mindsetReducer: [],
  tractionReducer: [],
  softskillBlockReducer: [],
  hardskillReducer: [],
  supportReducer: [],
  distributionReducer: [],
  statusData: [],
  recentAddedGM: {},
  jobTypeStepOne: "",
  mostFollowedContents: [],
  latestArticles: [],
  mostFollowedTopics: [],
  mostFollowedCircles: [],
  blockFlag: [],
  growthProject: {
    id: "",
    step: "",
  },
  departmentList: [],
  professionList: [],
  selectedSkills: [],
};

/******************* 
@purpose : Groups reducer
@Parameter : {groups_ini_data, action}
@Author : INIC
******************/
const growth = (state = initialState, action = {}) => {
  switch (action.type) {
    case types.SET_GROWTHMODEL: {
      return Object.assign({}, state, {
        growthModelDetail: action.payload,
      });
    }
    case types.UPDATE_GROWTHMODEL:
      return Object.assign({}, state, {
        growthModelDetail: { ...state.growthModelDetail, ...action.payload },
      });
    case types.SET_GROWTHMODEL_ACTIVITIES:
      return Object.assign({}, state, {
        growthModelActivities:
          action.payload.page > 1
            ? {
                ...action.payload,
                rows: [
                  ...state.growthModelActivities.rows,
                  ...action.payload.rows,
                ],
              }
            : action.payload,
      });
    case types.SET_GROWTHMODEL_SELECTED_SKILLS:
      return Object.assign({}, state, {
        selectedSkills: action.payload,
      });
    case types.REMOVE_GROWTHMODEL_ACTIVITY:
      return Object.assign({}, state, {
        growthModelActivities: {
          ...state.growthModelActivities,
          rows: state.growthModelActivities.rows.filter(
            (v) => v.id !== action.payload
          ),
        },
      });
    case types.ADD_GROWTHMODEL_ACTIVITY:
      return Object.assign({}, state, {
        growthModelDetail: { ...state.growthModelDetail },
        growthModelActivities: action.payload,
      });
    case types.GROWTH_MODEL_ACTIVITIES_STATUS:
      return Object.assign({}, state, {
        growthModelDetail: { ...state.growthModelDetail },
        growthModelActivitiesstatus: action.payload,
      });
    case types.SET_GROWTH_PARTNER_LIST:
      return Object.assign({}, state, {
        growthPartnerList: action?.payload?.data?.rows,
        growthPartners: action.payload,
      });
    case types.SET_GROWTH_PARTNER_ACTIVITY_LIST:
      return Object.assign({}, state, {
        growthPartnerActivityList: action?.payload?.data,
      });
    case types.SET_SEARCHED_GROWTH_PARTNER_LIST:
      return Object.assign({}, state, {
        searchedGrowthPartnerList: action.payload.data?.rows,
        growthPartners: action.payload,
      });
    case types.SET_BLOCK_ID: {
      return Object.assign({}, state, {
        blockId: action.payload,
      });
    }
    case types.SET_BLOCK_PAYLOAD: {
      return Object.assign({}, state, {
        hardskillReducer: action.payload,
      });
    }
    case types.SET_SOFTBLOCK_PAYLOAD: {
      return Object.assign({}, state, {
        softskillBlockReducer: action.payload,
      });
    }

    case types.SET_TRACTION_PAYLOAD: {
      return Object.assign({}, state, {
        tractionReducer: action.payload,
      });
    }
    case types.SET_SUPPORT_PAYLOAD: {
      return Object.assign({}, state, {
        supportReducer: action.payload,
      });
    }
    case types.SET_MINDSET_PAYLOAD: {
      return Object.assign({}, state, {
        mindsetReducer: action.payload,
      });
    }
    case types.SET_DISTRIBUTION_PAYLOAD: {
      return Object.assign({}, state, {
        distributionReducer: action.payload,
      });
    }
    case types.MOST_FOLLOWED_CONTENT: {
      return Object.assign({}, state, {
        mostFollowedContents: action.data,
      });
    }

    case types.LATEST_ARTICLES: {
      return Object.assign({}, state, {
        latestArticles: action.data,
      });
    }
    case types.MOST_FOLLOWED_TOPICS: {
      return Object.assign({}, state, {
        mostFollowedTopics: action.data,
      });
    }
    case types.MOST_FOLLOWED_CIRCLES: {
      return Object.assign({}, state, {
        mostFollowedCircles: action.data,
      });
    }
    case types.SAVE_ACTIVITY_CLEAR: {
      return Object.assign({}, state, {
        hardskillReducer: [],
        softskillBlockReducer: [],
        tractionReducer: [],
        supportReducer: [],
        mindsetReducer: [],
        distributionReducer: [],
      });
    }
    case types.SET_GROWTHMODEL_BLANK_RES: {
      return Object.assign({}, state, {
        gmResData: action.payload,
      });
    }
    case types.SET_GROWTH_ITEMS:
      return Object.assign({}, state, {
        otherCoursesRooms: action.data,
      });
    case types.ADD_TO_GM_STATUS:
      return Object.assign({}, state, {
        growthModelStatus: action.payload,
      });
    case types.SET_AUTHOR_API_DETAIL:
      return Object.assign({}, state, {
        filterAuthors: action.payload,
      });
    case types.SET_ACTIVITY_TYPE_DETAIL:
      return Object.assign({}, state, {
        filterActivityType: action.payload,
      });
    case types.CLEAR_AUTHOR_NAMES:
      return Object.assign({}, state, {
        filterAuthors: [],
      });
    case types.GM_STATUS_DATA:
      return Object.assign({}, state, {
        statusData: action.payload,
      });
    case types.SET_RECENT_ADD_TO_GM:
      return Object.assign({}, state, {
        recentAddedGM: action.data,
      });
    case types.STORE_PROFESSION_STEP_ONE:
      return Object.assign({}, state, {
        professionStepOne: action.data,
      });
    case types.STORE_JOBTYPE_STEP_ONE:
      return Object.assign({}, state, {
        jobTypeStepOne: action.data,
      });
    case types.BLOCK_FLAG_DATA: {
      return Object.assign({}, state, {
        blockFlag: action.payload,
      });
    }
    case types.SET_GROWTH_PROJECT: {
      return Object.assign({}, state, {
        growthProject: action.payload,
      });
    }
    case types.SET_GROWTH_PROFESSION: {
      return Object.assign({}, state, {
        growthProfession: action.data,
      });
    }
    case types.SET_GM_DEPARTMENT_LIST: {
      return Object.assign({}, state, {
        departmentList: action.data,
      });
    }
    case types.SET_GM_PROFESSION_LIST: {
      return Object.assign({}, state, {
        professionList: action.data,
      });
    }

    default:
      return state;
  }
};

export default growth;
