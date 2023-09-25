import { removeDetail, updateDataList } from '../utils/experience';
import {
  ADD_CURRENT_USER_CERTIFICATION,
  CLEAR_STATE,
  DELETE_CURRENT_USER_CERTIFICATION,
  GET_CERTIFICATION_LIST,
  SET_CURRENT_USER_CERTIFICATION,
  UPDATE_CURRENT_USER_CERTIFICATION
} from '../actions';

const initialState = {
  data: [],
  certificationList: [],
};

const certificationReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_CURRENT_USER_CERTIFICATION:
      return { data: payload || [] };

    case ADD_CURRENT_USER_CERTIFICATION:
      return { data: [...state.data, payload] };

    case UPDATE_CURRENT_USER_CERTIFICATION:
      return { data: updateDataList(state.data, payload) };

    case DELETE_CURRENT_USER_CERTIFICATION:
      return { data: removeDetail(state.data, payload) };

    case GET_CERTIFICATION_LIST: {
        return Object.assign({}, state, {
          certificationList: payload,
        });
      }

    case CLEAR_STATE:
      return { data: [] };

    default:
      return state;
  }
};

export default certificationReducer;
