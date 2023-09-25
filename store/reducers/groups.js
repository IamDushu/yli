import * as types from "@actions";

/******************* 
@purpose : Intital Groups reducer data
@Author : INIC
******************/
const initialState = {
  groupsList: {},
  groupDetails: "",
  groupsJoinedList: {},
  groupsSearchList: {},
  groupsInviteReceived: {},
  groupsConnectionList: [],
  requestReceivedGroup: [],
  groupMembersList: {},
  groupId: "",
  memberDetails: {},
  profileGroupsList: {},
  allGroupsList: {},
  requestedGroupsList: {},
  waitingGroupList: {},
  myGroupDetails: {},
};

/******************* 
@purpose : Groups reducer
@Parameter : {groups_ini_data, action}
@Author : INIC
******************/
const groups = (state = initialState, action = {}) => {
  switch (action.type) {
    case types.GET_GROUPS_LIST:
      return Object.assign({}, state, {
        groupsList: action.payload,
      });

    case types.GET_GROUP_DETAILS:
      return Object.assign({}, state, {
        groupDetails: action.payload,
      });

    case types.SET_GROUP_ID_TO_DELETE: {
      return Object.assign({}, state, {
        groupId: action.data,
      });
    }

    case types.SET_MYGROUP_DETAILS: {
      return Object.assign({}, state, {
        myGroupDetails: action.data,
      });
    }

    case types.GET_GROUPS_JOINED_LIST:
      return Object.assign({}, state, {
        groupsJoinedList: action.payload,
      });

    case types.GET_ALL_GROUPS_LIST:
      return Object.assign({}, state, {
        allGroupsList: action.payload,
      });

    case types.GET_REQUESTED_GROUPS_LIST:
      return Object.assign({}, state, {
        requestedGroupsList: action.payload,
      });

    case types.GET_WAITING_GROUPS_LIST:
      return Object.assign({}, state, {
        waitingGroupList: action.payload,
      });

    case types.GET_GROUPS_INVITE_RECEIVED:
      return Object.assign({}, state, {
        groupsInviteReceived: action.payload,
      });

    case types.GET_GROUPS_CONNECTION_LIST:
      return Object.assign({}, state, {
        groupsConnectionList: action.payload,
      });

    case types.CLEAR_GROUPS_CONNECTION_LIST:
      return Object.assign({}, state, {
        groupsConnectionList: [],
      });

    case types.GROUPS_MUTE_UNMUTE: {
      const index = state.groupsJoinedList.data.findIndex(
        (group) => group.groupId === action.payload.groupId
      );
      const newObj = { ...state.groupsJoinedList };
      newObj.data[index].isMuted = action.payload.status;
      return {
        ...state,
        groupsJoinedList: newObj,
      };
    }

    case types.MYGROUPS_MUTE_UNMUTE: {
      const index = state.groupsList.data.findIndex(
        (group) => group.id === action.payload.groupId
      );
      const newObj = { ...state.groupsList };
      newObj.data[index].isGroupMember.isMuted = action.payload.status;
      return {
        ...state,
        groupsList: newObj,
      };
    }

    case types.REQUEST_RECEIVED:
      return Object.assign({}, state, {
        requestReceivedGroup: action.payload,
      });

    case types.GROUP_MEMBERS_LIST:
      return Object.assign({}, state, {
        groupMembersList: action.payload,
      });

    case types.MEMBER_DELETE: {
      const newGroupsList = { ...state.groupMembersList };
      newGroupsList.data = state.groupMembersList.data.filter(
        (member) => member.userId !== action.payload
      );
      return {
        ...state,
        groupMembersList: newGroupsList,
      };
    }

    case types.SET_MEMBER_DETAILS: {
      return Object.assign({}, state, {
        memberDetails: action.payload,
      });
    }

    case types.PROFILE_GROUPS_LIST:
      return Object.assign({}, state, {
        profileGroupsList: action.payload,
      });

    case types.CLEAR_MYGROUP_DATA: {
      return {
        ...state,
        groupsList: {},
      };
    }
    case types.CLEAR_GROUP_DATA: {
      return {
        ...state,
        groupsJoinedList: {},
      };
    }

    default:
      return state;
  }
};

export default groups;
