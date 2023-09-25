import { UPDATE_USER_DETAILS } from '../../api/routes';
import { AUTH_API_URL } from '../../config';
import { UPDATE_CURRENT_USER_INFO } from './types';
import { post } from '../../api';
import { OPERATION_TYPE } from '../../utils';

/********************************************************
 * Create Redux Action to add user description data
 * @author INIC
 * @param {Object} payload description data
 * @param {Function} [cb] callback function
 * @returns {Promise}
 ********************************************************/
export const addDescription = (payload, cb) => async (dispatch) => {
  const response = await post({ serviceURL: AUTH_API_URL }, UPDATE_USER_DETAILS, true, { ...payload, operationType: OPERATION_TYPE.ADD }, true);
  if (response.status === 1) {
    dispatch({ type: UPDATE_CURRENT_USER_INFO, payload });
    if (typeof cb === 'function') cb();
    return Promise.resolve(response.data);
  } else {
    return Promise.reject(response);
  }
};

/********************************************************
 * Create Redux Action to update user description data
 * @author INIC
 * @param {Object} payload description data
 * @param {Function} [cb] callback function
 * @returns {Promise}
 ********************************************************/
export const updateDescription = (payload, cb) => async (dispatch) => {
  const response = await post({ serviceURL: AUTH_API_URL }, UPDATE_USER_DETAILS, true, { ...payload, operationType: OPERATION_TYPE.UPDATE }, true);
  if (response.status === 1) {
    dispatch({ type: UPDATE_CURRENT_USER_INFO, payload });
    if (typeof cb === 'function') cb();

    return Promise.resolve(response.data);
  } else {
    return Promise.reject(response);
  }
};

/********************************************************
 * Create Redux Action to delete user description data
 * @author INIC
 * @param {object} payload empty description
 * @param {Function} [cb] callback function
 * @returns {Promise}
 ********************************************************/
export const deleteDescription = (payload, cb) => async (dispatch) => {
  const response = await post({ serviceURL: AUTH_API_URL }, UPDATE_USER_DETAILS, true, { ...payload, operationType: OPERATION_TYPE.DELETE }, true);
  if (response.status === 1) {
    dispatch({ type: UPDATE_CURRENT_USER_INFO, payload });
    if (typeof cb === 'function') cb();

    return Promise.resolve(response.status);
  } else {
    return Promise.reject(response);
  }
};
