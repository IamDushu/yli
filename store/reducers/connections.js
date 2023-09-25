import * as types from "@actions";
import moment from "moment-timezone";
/******************* 
@purpose : Intital Groups reducer data
@Author : INIC
******************/
const initialState = {
  peopleYouMayKnowList: [],
  pendingConnectionList: [],
  sentConnectionList: [],
  myConnectionList: [],
  peopleViewedList: [],
  followerList: [],
  followingList: [],
  myGrowthConnectionList: {},
  totalConnection: 0,
};

/******************* 
@purpose : Connections reducer
@Parameter : {initialState, action}
@Author : INIC
******************/
const connections = (state = initialState, action = {}) => {
  switch (action.type) {
    case types.GET_PEOPLE_YOU_MAY_KNOW_LIST:
      return Object.assign({}, state, {
        peopleYouMayKnowList: action.payload,
      });
    case types.UPDATE_PEOPLE_YOU_MAY_KNOW_LIST_USER:
      return Object.assign({}, state, {
        peopleYouMayKnowList: state.peopleYouMayKnowList.map((v) => {
          return v.id === action.payload.id ? { ...v, ...action.payload } : v;
        }),
      });
    case types.GET_PENDING_CONNECTIONS_LIST:
      return Object.assign({}, state, {
        pendingConnectionList:
          action?.page == 1
            ? action.payload
            : {
                ...action.payload,
                data: [
                  ...state.pendingConnectionList.data,
                  ...action.payload.data,
                ],
              },
      });
    case types.GET_SENT_CONNECTIONS_LIST:
      return Object.assign({}, state, {
        sentConnectionList:
          action?.page == 1
            ? action.payload
            : {
                ...action.payload,
                data: [
                  ...state.sentConnectionList.data,
                  ...action.payload.data,
                ],
              },
      });
    case types.GET_MY_CONNECTIONS_LIST:
      return Object.assign({}, state, {
        myConnectionList:
          action?.page == 1
            ? action.payload
            : {
                ...action.payload,
                data: [...state.myConnectionList.data, ...action.payload.data],
              },
        totalConnection: action.totalConnection,
      });
    case types.GET_PEOPLE_VIEWED_LIST:
      return Object.assign({}, state, {
        peopleViewedList: action.payload,
      });
    case types.ADD_TO_SENT_CONNECTION_LIST: {
      let { mutualConnections, ...x } = state.peopleYouMayKnowList.find(
        (row) => row.id === action.payload.userId
      );

      return {
        ...state,
        sentConnectionList: state.sentConnectionList
          ? [
              ...state.sentConnectionList,
              {
                ...x,
                ...action.payload,
                status: "pending",
                createdAt: moment().format(),
              },
            ]
          : [
              {
                ...x,
                ...action.payload,
                status: "pending",
                createdAt: moment().format(),
              },
            ],
      };
    }
    case types.REMOVE_FROM_PEOPLE_YOU_MAY_KNOW: {
      return {
        ...state,
        peopleYouMayKnowList: state.peopleYouMayKnowList.filter(
          (row) => row.id !== action.payload
        ),
      };
    }
    case types.REMOVE_FROM_MY_CONNECTION:
      return {
        ...state,
        myConnectionList: state.myConnectionList.filter(
          (row) => row.id !== action.payload
        ),
      };
    case types.REMOVE_FROM_SENT_CONNECTION:
      return {
        ...state,
        sentConnectionList: state.sentConnectionList.filter(
          (row) => row.id !== action.payload
        ),
      };
    case types.REMOVE_FROM_PENDING_CONNECTION:
      return {
        ...state,
        pendingConnectionList: state.pendingConnectionList.filter(
          (row) => row.id !== action.payload
        ),
      };
    case types.GET_FOLLOWERS_LIST:
      return Object.assign({}, state, {
        followerList: action.payload,
      });
    case types.GET_FOLLOWINGS_LIST:
      return Object.assign({}, state, {
        followingList: action.payload,
      });
    case types.REMOVE_USER_FROM_FOLLOWINGS:
      return {
        ...state,
        followingList: state.followingList.filter(
          (row) => row.userId !== action.payload
        ),
      };
    case types.GET_MY_GROWTH_CONNECTIONS_LIST:
      return Object.assign({}, state, {
        myGrowthConnectionList:
          action?.page == 1
            ? action.payload
            : {
                ...action.payload,
                data: [
                  ...state.myGrowthConnectionList.data,
                  ...action.payload.data,
                ],
              },
      });
    default:
      return state;
  }
};

export default connections;
