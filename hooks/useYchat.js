import React, { useCallback, useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  newMessage,
  setMessageListing,
  setYChatSocketDetails,
} from "store/actions";
import { YCHAT_SOCKET_END_POINT, CHAT_TEAM_ID } from "config";
import { ChatContext } from "context/ChatContext";
import { getCookie, getLocalStorage, showMessageNotification } from "utils";
import MatterMostClient from "mattermost-client/client";
import { useRouter } from "next/router";
import { trackEvent } from "@components/segment-analytics";

const MessageNotification = ({ event }) => {
  const context = useContext(ChatContext);
  const {
    getUserByID,
  } = context || {};
  const post = JSON.parse(event?.data?.post);
  const user = getUserByID && getUserByID(post.user_id);
  return (
    <div>
      {event?.data?.channel_type === "P" && (
        <div>
          <strong>{event?.data?.channel_name}</strong>
        </div>
      )}
      <div>
        <strong>
          {user?.firstName || ""} {user?.lastName || ""}
        </strong>
      </div>
      <div>{post.message}</div>
    </div>
  );
};

export const useYchat = () => {
  const [yChatSocketState, setYChatSocketState] = useState();
  const dispatch = useDispatch();
  const router = useRouter();
  const context = useContext(ChatContext);
  const {
    currentChannel,
    updateUserProfiles,
    channels,
    setChannels,
    setUserDetails,
    handleUnreadMessageCount,
    setCurrentChannel,
    clearChatContext,
    handleIsChatDetailsLoading,
  } = context || {};
  const { ychatSocket } = useSelector((state) => state.message);
  const token = getCookie("token");

  const connectYchat = () => {
    let chatLoginData = getLocalStorage("mmLogin");
    if (chatLoginData && typeof chatLoginData === "string") {
      chatLoginData = JSON.parse(chatLoginData);
    }
    if (ychatSocket && !yChatSocketState) {
      setYChatSocketState(ychatSocket);
    } else if (chatLoginData?.token && !yChatSocketState) {
      console.log("connectYchat =========================");
      const yChatClient = new MatterMostClient(
        YCHAT_SOCKET_END_POINT,
        CHAT_TEAM_ID,
        {
          wssPort: 443,
          httpPort: 443,
          pingInterval: 30000,
        }
      );
      yChatClient.tokenLogin(chatLoginData?.token);
      setYChatSocketState(yChatClient);
      dispatch(setYChatSocketDetails(yChatClient));
    }
  };

  const disconnectYchat = useCallback(() => {
    yChatSocketState?.disconnect();
    setYChatSocketState(null);
    dispatch(setYChatSocketDetails(null));
    clearChatContext();
  }, [yChatSocketState]);

  useEffect(() => {
    if (ychatSocket && !yChatSocketState) {
      setYChatSocketState(ychatSocket);
    }
  }, [ychatSocket, yChatSocketState]);

  useEffect(() => {
    if (yChatSocketState) {
      yChatSocketState?.removeAllListeners("message").on("message", onMessage);

      yChatSocketState
        ?.removeAllListeners("profilesLoaded")
        .on("profilesLoaded", (data) => {
          updateUserProfiles(data);
        });
      yChatSocketState
        ?.removeAllListeners("channelsLoaded")
        .on("channelsLoaded", updateChannelList);
      yChatSocketState
        ?.removeAllListeners("unread_updated")
        .on("unread_updated", updateChannelList);
      yChatSocketState
        ?.removeAllListeners("user_mapped_to_channels")
        .on("user_mapped_to_channels", dataMapped);

      yChatSocketState
        ?.removeAllListeners("direct_added")
        .on("direct_added", updateChannelList);

      yChatSocketState
        ?.removeAllListeners("channel_viewed")
        .on("channel_viewed", handleUnreadMessage);

      yChatSocketState
        ?.removeAllListeners("meLoaded")
        .on("meLoaded", (data) => {
          setUserDetails(data);
        });

      /* yChatSocketState?.removeAllListeners("open").on("open", (event) => {
        console.log("MatterMostClient open => ", event);
      });
      yChatSocketState?.removeAllListeners("hello").on("hello", (event) => {
        console.log("MatterMostClient onHello => ", event);
      });
      yChatSocketState
        .removeAllListeners("connected")
        .on("connected", (event) => {
          console.log("MatterMostClient onConnected => ", event);
        });

      yChatSocketState
        ?.removeAllListeners("channel_updated")
        .on("channel_updated", (event) => {
          console.log("MatterMostClient channel_updated => ", event);
        });
      yChatSocketState
        ?.removeAllListeners("user_added")
        .on("user_added", (event) => {
          console.log("MatterMostClient userAdded => ", event);
        });
      yChatSocketState
        ?.removeAllListeners("user_removed")
        .on("user_removed", (event) => {
          console.log("MatterMostClient userRemoved => ", event);
        });
      yChatSocketState?.removeAllListeners("typing").on("typing", (event) => {
        console.log("MatterMostClient userTyping => ", event);
      });
      yChatSocketState?.removeAllListeners("error").on("error", (event) => {
        console.log("MatterMostClient error => ", event);
      });
      yChatSocketState?.removeAllListeners("loaded").on("loaded", (event) => {
        console.log("MatterMostClient loaded => ", event);
      }); */
    }
  }, [yChatSocketState, currentChannel]);

  const handleUnreadMessage = useCallback(() => {
    handleUnreadMessageCount?.(yChatSocketState?.getUnreadMessageCount());
  }, [yChatSocketState, handleUnreadMessageCount]);

  useEffect(() => {
    handleUnreadMessage();
  }, [channels, yChatSocketState]);

  useEffect(() => {
    if (
      channels &&
      currentChannel?.id &&
      JSON.stringify(channels[currentChannel?.id]) !==
        JSON.stringify(currentChannel)
    ) {
      setCurrentChannel(channels[currentChannel?.id] ?? currentChannel);
    }
  }, [channels]);

  const onMessage = useCallback(
    (event) => {
      if (event.event === "posted") {
        trackEvent("message_received"); // segment track event
        const post = JSON.parse(event.data.post);
        yChatSocketState?.FetchChannelByID(post.channel_id);
        if (currentChannel?.name === event?.data?.channel_name) {
          trackEvent("message_read"); // segment track event
          dispatch(newMessage(post));
        } else if (event.data.sender_name !== "System" && token) {
          showMessageNotification(<MessageNotification event={event} />);
        }
      }
    },
    [currentChannel, yChatSocketState]
  );

  const updateChannelList = useCallback(
    (data) => {
      const updatedChannels = JSON.parse(
        JSON.stringify(yChatSocketState?.getAllChannels())
      );
      setChannels(updatedChannels);
      handleUnreadMessage();
      if (data.event === "direct_added" && updatedChannels[data.channel_id]) {
        currentChannelHandler(updatedChannels[data.channel_id]);
      }
    },
    [yChatSocketState]
  );

  const setDefaultChannel = useCallback(() => {
    if (
      !currentChannel?.id &&
      yChatSocketState &&
      router.pathname === "/messages"
    ) {
      const updatedChannels = JSON.parse(
        JSON.stringify(yChatSocketState?.getAllChannels())
      );
      const orderdDirectChats = _.orderBy(
        Object.values(updatedChannels),
        (x) => new Date(x.last_post_at),
        "desc"
      ).filter((row) => row.type === "D");
      if (orderdDirectChats && orderdDirectChats[0]) {
        currentChannelHandler(orderdDirectChats[0]);
      }
    }
  }, [yChatSocketState, currentChannel, router]);

  const dataMapped = useCallback(
    (data) => {
      updateChannelList(data);
      setDefaultChannel();
    },
    [updateChannelList, setDefaultChannel]
  );

  const currentChannelHandler = useCallback(
    (channel) => {
      if (!channel) {
        dispatch(setMessageListing({}));
        setCurrentChannel(null);
      } else if (channel?.id && channel?.id !== currentChannel?.id) {
        handleIsChatDetailsLoading(true);
        dispatch(setMessageListing({}));
        setCurrentChannel(
          JSON.parse(
            JSON.stringify(yChatSocketState?.channels[channel.id] || channel)
          )
        );
        if (channel?.id) yChatSocketState?.viewChannel(channel.id);
      }
    },
    [yChatSocketState, currentChannel]
  );

  const sendMessage = useCallback(
    (data) => {
      trackEvent("message_sent"); // segment track event
      yChatSocketState?.postMessage(data.message, data.channel_id);
    },
    [yChatSocketState]
  );

  const createPrivateChannel = useCallback(
    (data) => {
      yChatSocketState?.createChannel(data);
    },
    [yChatSocketState]
  );

  const getUserByID = useCallback(
    async (id) => {
      return await yChatSocketState?.getUserByID(id);
    },
    [yChatSocketState]
  );

  const getUserByUserNameOrId = useCallback(
    async (userName, id) => {
      if (id) {
        return yChatSocketState?.getUserByID(id);
      } else {
        return await yChatSocketState?.getUserByUserName(userName);
      }
    },
    [yChatSocketState]
  );

  const getUserFullName = (user, isSystem) => {
    if (isSystem) return "System";
    return user?.type === "user" &&
      (user?.firstName || user?.lastName || user?.first_name || user?.last_name)
      ? `${user?.firstName || user?.first_name || ""} ${
          user?.lastName || user?.last_name || ""
        }`
      : user?.instituteDetails?.name || user?.companyDetail?.companyName
      ? user?.instituteDetails?.name || user?.companyDetail?.companyName
      : "Yliway user";
  };

  const searchChannelByName = useCallback(
    (name) => {
      const channelsData = yChatSocketState?.getAllChannels();
      if (!channelsData) return [];
      return Object.values(channelsData)?.filter(
        (channel) =>
          channel.type === "P" && channel?.display_name?.includes(name)
      );
    },
    [yChatSocketState]
  );

  const searchMessages = useCallback(
    async (body) => {
      return yChatSocketState?.searchMessages(body);
    },
    [yChatSocketState]
  );

  return {
    yChatSocketState,
    sendMessage,
    setDefaultChannel,
    currentChannelHandler,
    connectYchat,
    disconnectYchat,
    createPrivateChannel,
    getUserByID,
    getUserByUserNameOrId,
    getUserFullName,
    searchChannelByName,
    searchMessages,
  };
};
