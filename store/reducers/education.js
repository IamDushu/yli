import {
  ADD_CURRENT_USER_EDUCATION,
  UPDATE_CURRENT_USER_EDUCATION,
  DELETE_CURRENT_USER_EDUCATION,
  SET_CURRENT_USER_EDUCATION,
  CLEAR_STATE,
  GET_EDUCATION_LIST
} from '../actions';
import { updateDataList, removeDetail } from '../utils/experience';

const initialState = {
  data: [],
  educationList: [],
};

const educationReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_CURRENT_USER_EDUCATION:
      return { data: payload || [] };

    case ADD_CURRENT_USER_EDUCATION:
      return { data: [...state.data, payload] };

    case UPDATE_CURRENT_USER_EDUCATION:
      return { data: updateDataList(state.data, payload) };

    case DELETE_CURRENT_USER_EDUCATION:
      return { data: removeDetail(state.data, payload) };
    
    case GET_EDUCATION_LIST: {
        return Object.assign({}, state, {
          educationList: payload,
        });
      }

    case CLEAR_STATE:
      return { data: [] };

    default:
      return state;
  }
};

export default educationReducer;
