import { CLEAR_STATE, SET_PLAN_DATA } from "../actions";

const initialState = {
  data: []
};

const planReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_PLAN_DATA:
      return { data: payload || [] };

    case CLEAR_STATE:
      return { data: [] };

    default:
      return state;
  }
};

export default planReducer;
