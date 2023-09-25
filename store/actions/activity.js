import { SET_CURRENT_USER_ACTIVITY, UNSET_CURRENT_USER_ACTIVITY } from './index';
import { SET_CURRENT_USER_ACTIVITY_FOLLOWER_COUNT } from './types';

/********************************************************
 * Create Redux Action to set user profile activity data
 * @author INIC
 * @param {Array} payload activity data
 * @returns {{type: String, payload: Array}}
 ********************************************************/
export const setActivity = (payload) => ({ type: SET_CURRENT_USER_ACTIVITY, payload });

/********************************************************
 * Create Redux Action to set user profile activity follower count
 * @author INIC
 * @param {number} payload
 * @returns {{type: String, payload: number}}
 ********************************************************/
export const setActivityFollowerCount = (payload) => ({ type: SET_CURRENT_USER_ACTIVITY_FOLLOWER_COUNT, payload });

/********************************************************
 * Create Redux Action to unset user profile activity data
 * @author INIC
 * @returns {{type: String}}
 ********************************************************/
export const unsetActivity = () => ({ type: UNSET_CURRENT_USER_ACTIVITY });
