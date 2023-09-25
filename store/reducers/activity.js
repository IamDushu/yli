import { CLEAR_STATE, SET_CURRENT_USER_ACTIVITY, SET_CURRENT_USER_ACTIVITY_FOLLOWER_COUNT, UNSET_CURRENT_USER_ACTIVITY } from '../actions';

const initialState = { followerCount: 0, data: [] };

const activityReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_CURRENT_USER_ACTIVITY:
      return { ...state, data: payload || [] };

    case SET_CURRENT_USER_ACTIVITY_FOLLOWER_COUNT:
      return { ...state, followerCount: payload || 0 };

    case UNSET_CURRENT_USER_ACTIVITY:
      return { ...state, data: [] };

    case CLEAR_STATE:
      return { followerCount: 0, data: [] };

    default:
      return state;
  }
};

export default activityReducer;
