import * as types from "@actions";
import { update } from "lodash";
import { useSelector } from "react-redux";
import { selectUserInfo } from "store/selectors/user";

/******************* 
@purpose : Intital Manage Activity reducer data
@Author : INIC
******************/
const initialState = {
  channelList: [],
  lastMessages: {},
  channelDetail: "",
  onlineMemberss: "",
  socket: "",
  ychatSocket: "",
  joinedchannel: [],
  joinedchannelrefetch: "",
  totalCount: 0,
};

/******************* 
@purpose : Manage Activity reducer
@Parameter : {communication_ini_data, action}
@Author : INIC
******************/
const message = (message_ini_data = initialState, action = {}) => {
  switch (action.type) {
    //Set channel List
    case types.SET_CHANNEL_LIST:
      return Object.assign({}, message_ini_data, {
        channelList: [...action.data],
      });
    //Set Message Count
    case types.SET_MESSAGE_COUNT:
      return Object.assign({}, message_ini_data, {
        totalCount: action.data,
      });
    //Set Update Channel list
    case types.SET_UPDATE_CHANNEL_LIST:
      let updateChannelID = action.data.id;
      let updatedChannel = message_ini_data.channelList;
      if (updateChannelID) {
        let objIndex = message_ini_data.channelList.findIndex(
          (obj) => obj.id === updateChannelID
        );
        updatedChannel[objIndex].custom[action.data.uuid] =
          action.data.custom[action.data.uuid];
      }

      return Object.assign({}, message_ini_data, {
        channelList: updatedChannel,
      });

    //set channel to top after send message
    case types.SET_SEND_MESSAGE:
      let index = message_ini_data.channelList.findIndex((object) => {
        return object.id === action.data.id;
      });

      message_ini_data.channelList.splice(index, 1);
      message_ini_data.channelList.unshift(action.data);

      return Object.assign({}, message_ini_data, {
        channelList: [...message_ini_data.channelList],
      });

    // Set channel Detail
    case types.SET_CURRENT_CHANNEL_DETAILS:
      return Object.assign({}, message_ini_data, {
        channelDetail: action.data,
      });
    // Set socket information
    case types.SET_SOCKET_CONNECTION_DETAILS:
      return Object.assign({}, message_ini_data, {
        socket: action.data,
      });
    // Set ychat socket information
    case types.SET_YCHAT_SOCKET_CONNECTION_DETAILS:
      return Object.assign({}, message_ini_data, {
        ychatSocket: action.data,
      });
    //update current Channel details
    case types.UPDATE_CURRENT_CHANNEL_DETAIL:
      return Object.assign({}, message_ini_data, {
        channelDetail: action.data,
      });
    //set last message in channel metadata
    case types.LAST_MESSAGE:
      return Object.assign({}, message_ini_data, {
        lastMessages: action.data,
      });
    //set online members in channel metadata
    case types.ONLINE_MEMBERS:
      return Object.assign({}, message_ini_data, {
        onlineMemberss: action.data,
      });
    //Update Channel details
    case types.UPDATE_CHANNEL_DETAIL:
      if (
        message_ini_data.channelDetail?.id === action.data.channelData.data.id
      ) {
        let custom = {
          ...message_ini_data.channelDetail.custom,
          [action.data.userId]: 0,
          lastupdate: new Date().getTime(),
        };
        return Object.assign({}, message_ini_data, {
          channelDetail: { ...message_ini_data.channelDetail, custom },
        });
      } else {
        message_ini_data.channelList.forEach((channel) => {
          if (channel.id === action.data.channelData.data.id) {
            channel.custom = action.data.channelData.data.custom;
            channel.custom["lastupdate"] = new Date().getTime();
          }
        });

        let index = message_ini_data.channelList.findIndex((object) => {
          return object.id === action.data.channelData.data.id;
        });
        message_ini_data.channelList.splice(
          0,
          1,
          message_ini_data.channelList.splice(index, 1)[0]
        );

        return Object.assign({}, message_ini_data, {
          channelList: [...message_ini_data.channelList],
        });
      }
    case types.SET_JOINED_CHANNEL_LIST:
      return Object.assign({}, message_ini_data, {
        joinedchannel: [...action.data],
      });
    case types.SET_JOINED_CHANNEL_REFETCH:
      return Object.assign({}, message_ini_data, {
        joinedchannelrefetch: action.data,
      });
    default:
      return message_ini_data;
  }
};

export default message;
