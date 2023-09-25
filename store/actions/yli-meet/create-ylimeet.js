import {
  CREATE_YLIMEET_INSTANT_MEETING_EVENTS,
  JOIN_YLIMEET_INSTANT_MEETING_EVENTS,
  SENT_YLIMEET_INSTANT_MEETING_NOTIFICATION_EVENTS,
  MONETISATION_FEATURE_LIST_MODULE_AND_CATEGORY,
  CREATE_AND_ADD_MEMBER_YLIMEET_GROUP_EVENTS,
  FIND_GROUP_OF_PARTICIPENTS,
  UPDATE_YLIMEET_INSTANT_MEETING_EVENTS,
  GET_YLIMEET_INSTANT_MEETING_DETAIL_EVENTS,
  END_YLIMEET_INSTANT_MEETING_EVENTS,
  ADD_MEMBER_YLIMEET_GROUP_EVENTS,
} from "api/routes";
import { USER_API_URL } from "config";
import { get, post } from "api";
import * as types from "../types";
import { showMessageNotification } from "utils";

/******************** 
@purpose : get Instant yli-meeting detail api
@Parameter : {values}
******************/
export const getMeetDetail = (data, router) => async (dispatch) => {
  try {
    const response = await get(
      { serviceURL: USER_API_URL },
      `${GET_YLIMEET_INSTANT_MEETING_DETAIL_EVENTS}?meetId=${data.id}`,
      false,
      data,
      true
    );
    if (response.status === 1) {
      if (response.statusCode === 409) {
        showMessageNotification(response.message);
        return router.push('/dashboard');
      }
      dispatch(setYliMeetInstantRoomDetail(response.data));
      return Promise.resolve(response);
    }
    return Promise.reject();
  } catch (error) {
    throw error;
  }
};

/******************** 
@purpose : create Instant yli-meeting api
@Parameter : {values}
******************/
export const launchInstantMeeting = (data) => async (dispatch) => {
  try {
    const response = await post(
      { serviceURL: USER_API_URL },
      CREATE_YLIMEET_INSTANT_MEETING_EVENTS,
      false,
      data,
      true
    );
    if (response.status === 1) {
      dispatch(setYliMeetInstantRoomDetail(response.data));
      return Promise.resolve(response);
    }
    return Promise.reject();
  } catch (error) {
    throw error;
  }
};

/******************** 
@purpose : create yli-meeting
@Parameter : {data}
******************/
export const createMeeting =
  ({
    router,
    requestData = {
      meetingStatus: "Running",
      meetingType: "Instant",
    },
  }) =>
  (dispatch) => {
    dispatch(launchInstantMeeting(requestData)).then((res) => {
      router.push(`/yli-meet/${res.data.id}`);
    });
  };

/******************** 
@purpose : update Instant yli-meeting api
@Parameter : {values}
******************/
export const updateInstantMeeting = (data) => async (dispatch) => {
  try {
    const response = await post(
      { serviceURL: USER_API_URL },
      UPDATE_YLIMEET_INSTANT_MEETING_EVENTS,
      false,
      data,
      true
    );
    if (response.status === 1) {
      dispatch(setYliMeetInstantRoomDetail(response.data));
      return Promise.resolve(response);
    }
    return Promise.reject();
  } catch (error) {
    throw error;
  }
};

/******************** 
@purpose : JOIN Instant yli-meeting api
@Parameter : {values}
******************/
export const joinInstantMeeting = (lang, data, router) => async (dispatch) => {
  try {
    const response = await post(
      { serviceURL: USER_API_URL },
      JOIN_YLIMEET_INSTANT_MEETING_EVENTS,
      false,
      data,
      true
    );
    if (response.status === 1) {
      showMessageNotification(response.message);
      if (response.statusCode === 200) {
        dispatch(setYliMeetInstantRoomDetail(response.data));
        return Promise.resolve(response);
      }
      return router.push(`/dashboard`);
    } else {
      if (response.statusCode === 500) {
        showMessageNotification(lang("COMMON.SOMETHING_WENT_WRONG"));
        return router.push(`/dashboard`);
      }
      showMessageNotification(response.message);
      return Promise.reject();
    }
  } catch (error) {
    throw error;
  }
};

/******************** 
@purpose : End Instant yli-meeting api
@Parameter : {values}
******************/
export const endMeet = async (data) => {
  try {
    const response = await post(
      { serviceURL: USER_API_URL },
      END_YLIMEET_INSTANT_MEETING_EVENTS,
      false,
      data,
      true
    );
    if (response.status === 1) {
      return Promise.resolve(response);
    }
    return Promise.reject();
  } catch (error) {
    throw error;
  }
};

/******************** 
@purpose : send Yli-meet Instant meeting notification or email  
@Parameter : {values}
******************/
export const sentNotification = (data, router, lang) => async (dispatch) => {
  const res = await post(
    { serviceURL: USER_API_URL },
    SENT_YLIMEET_INSTANT_MEETING_NOTIFICATION_EVENTS,
    false,
    data,
    true
  );
  if (res?.status === 1) {
    showMessageNotification(lang(res.message));
    if (res.statusCode === 409) {
      return router.push('/dashboard');
    }
    return Promise.resolve(res);
  }
  return Promise.reject(res);
};

/******************** 
@purpose : get Yli-meet Instant meeting feature and plan-list  
@Parameter : {values}
******************/
export const getYliMeetPlanFeature = (data) => async (dispatch) => {
  const res = await get(
    { serviceURL: USER_API_URL },
    `${MONETISATION_FEATURE_LIST_MODULE_AND_CATEGORY}?category=${data.category}&module=${data.module}&planId=${data?.planId}&entityId=${data?.entityId}`,
    false,
    "",
    true
  );

  if (res?.data) {
    return Promise.resolve(res.data);
  }
  return Promise.reject(res);
};

/******************** 
@purpose : create and add member in meet group api
@Parameter : {values}
******************/
export const createAndAddMemberInYliMeetGroup = async (data) => {
  try {
    const response = await post(
      { serviceURL: USER_API_URL },
      CREATE_AND_ADD_MEMBER_YLIMEET_GROUP_EVENTS,
      false,
      data,
      true,
      { key: "chat" }
    );
    if (response.status === 1) {
      return Promise.resolve(response);
    }
    return Promise.reject();
  } catch (error) {
    throw error;
  }
};

/******************** 
@purpose : Add member in meet group api
@Parameter : {values}
******************/
export const addMemberInYliMeetGroup = async (data) => {
  try {
    const response = await post(
      { serviceURL: USER_API_URL },
      ADD_MEMBER_YLIMEET_GROUP_EVENTS,
      false,
      data,
      true,
      { key: "chat" }
    );
    if (response.status === 1) {
      return Promise.resolve(response);
    }
    return Promise.reject();
  } catch (error) {
    throw error;
  }
};

/******************** 
@purpose : find Group Of Participents
@Parameter : {values}
******************/
export const findGroupOfParticipents = (data) => async (dispatch) => {
  try {
    const response = await post(
      { serviceURL: USER_API_URL },
      FIND_GROUP_OF_PARTICIPENTS,
      false,
      data,
      true,
      { key: "chat" }
    );
    if (response.status === 1) {
      if (response.data !== undefined) {
        dispatch(setYliMeetInstantRoomDetail(response.data));
      }
      return Promise.resolve(response);
    }
    return Promise.reject();
  } catch (error) {
    throw error;
  }
};

/******************** 
@purpose : set Yli-Meet Rooms
@Parameter : {data}
******************/

export const setYliMeetInstantRoomDetail = (data) => ({
  type: types.SET_YLIMEET_INSTANT_MEETING_DETAILS,
  data,
});
