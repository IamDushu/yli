import React, { useEffect } from "react";
import SearchHeader from "./SearchHeader";
import ChatList from "components/messagesV2/ChatList";
import ChatView from "./ChatView";
import Thread from "./Thread";
import { useYchat } from "hooks/useYchat";

const Message = () => {
  const { yChatSocketState, currentChannelHandler, setDefaultChannel } = useYchat();

  useEffect(() => {
    if (yChatSocketState) {
      setDefaultChannel();
    }
  }, [yChatSocketState]);

  useEffect(() => {
    return () => {
      currentChannelHandler(null);
    };
  }, []);

  return (
    <div>
      {/* <SearchHeader /> */}
      <div className="d-flex">
        <ChatList isFloatMessage={false} />
        <ChatView />
        <Thread />
      </div>
    </div>
  );
};

export default Message;
