import { removeDetail, updateDataList } from '../utils/experience';
import {
  ADD_CURRENT_USER_LANGUAGE,
  CLEAR_STATE,
  DELETE_CURRENT_USER_LANGUAGE,
  SET_CURRENT_USER_LANGUAGE,
  UPDATE_CURRENT_USER_LANGUAGE
} from '../actions';

const initialState = {
  data: []
};

const languageReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_CURRENT_USER_LANGUAGE:
      return { data: payload || [] };

    case ADD_CURRENT_USER_LANGUAGE:
      return { data: [...state.data, payload] };

    case UPDATE_CURRENT_USER_LANGUAGE:
      return { data: updateDataList(state.data, payload) };

    case DELETE_CURRENT_USER_LANGUAGE:
      return { data: removeDetail(state.data, payload) };

    case CLEAR_STATE:
      return { data: [] };

    default:
      return state;
  }
};

export default languageReducer;
