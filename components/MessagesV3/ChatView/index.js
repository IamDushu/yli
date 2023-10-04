import React, { useContext } from "react";
import ChatHeader from "./ChatHeader";
import ChatDetails from "./ChatDetails";
import ChatFooter from "./ChatFooter";
import { ChatContext } from "context/ChatContext";

const ChatView = () => {
  const { currentChannel } = useContext(ChatContext);

  return (
    <>
      {currentChannel?.id ? (
        <div className="chat-view position-relative">
          <ChatHeader />
          <ChatDetails />
          <ChatFooter />
        </div>
      ) : (
        <div className="chat-view position-relative h-auto justify-content-center align-content-center">
          Select channel to start conversation
        </div>
      )}
    </>
  );
};


export default ChatView;