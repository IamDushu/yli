import { removeDetail, updateDataList } from "../utils/experience";
import {
  SET_CURRENT_USER_EXPERIENCE,
  UNSET_CURRENT_USER_EXPERIENCE,
  ADD_CURRENT_USER_EXPERIENCE,
  UPDATE_CURRENT_USER_EXPERIENCE,
  DELETE_CURRENT_USER_EXPERIENCE,
  CLEAR_STATE,
  GET_LERNING_INSTITUTE_LIST,
  GET_USER_COMPANY_LIST,
  GET_USER_ORGANIZATION_LIST,
  GET_EXPERIENCE_LIST,
} from "./../actions";

const initialState = {
  data: [],
  institueList: [],
  userCompanyList: [],
  organizationList: [],
  experienceList: [],
};

const experienceReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_CURRENT_USER_EXPERIENCE:
      return { data: payload || [] };

    case UNSET_CURRENT_USER_EXPERIENCE:
      return { data: [] };

    case ADD_CURRENT_USER_EXPERIENCE:
      return { data: [...state.data, payload] };

    case UPDATE_CURRENT_USER_EXPERIENCE:
      return { data: updateDataList(state.data, payload) };

    case DELETE_CURRENT_USER_EXPERIENCE:
      return { data: removeDetail(state.data, payload) };

    case GET_LERNING_INSTITUTE_LIST: {
      return Object.assign({}, state, {
        institueList: payload,
      });
    }
    case GET_USER_COMPANY_LIST: {
      return Object.assign({}, state, {
        userCompanyList: payload,
      });
    }
    case GET_USER_ORGANIZATION_LIST: {
      return Object.assign({}, state, {
        organizationList: payload,
      });
    }
    case GET_EXPERIENCE_LIST: {
      return Object.assign({}, state, {
        experienceList: payload,
      });
    }

    case CLEAR_STATE:
      return { data: [] };

    default:
      return state;
  }
};

export default experienceReducer;
