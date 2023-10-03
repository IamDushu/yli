import React, { useEffect } from "react";
import ChatList from "./ChatList";
import { useYchat } from "hooks/useYchat";
import ChatView from "./ChatView";
import Thread from "./Thread";

const MessageV3 = () => {
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

export default MessageV3;
