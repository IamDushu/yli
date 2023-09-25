import React, { useEffect, useMemo, useContext } from "react";
import { useSelector } from "react-redux";
import _ from "lodash";
import ChatMessage from "./ChatMessage";
import { useYchat } from "hooks/useYchat";
import { ChatContext } from "context/ChatContext";

const scrollToBottom = (ref) => {
  ref.scrollIntoView({ behaviour: "smooth", block: "end", inline: "nearest" });
};

const ChatDetails = ({ isFloatMessage }) => {
  const scrollBottom = React.createRef();
  const { getUserByID, yChatSocketState } = useYchat();
  const { messageListing, channelMemeberList } = useSelector(
    (state) => state.chat
  );
  const { isChatDetailsLoading, handleIsChatDetailsLoading } =
    useContext(ChatContext);
  let prevMessage;

  const messages = useMemo(() => {
    if (messageListing?.posts) {
      return _.orderBy(
        Object.values(messageListing.posts).filter((x) => !x.root_id),
        (x) => new Date(x.create_at)
      );
    }
    return [];
  }, [messageListing]);

  useEffect(() => {
    scrollToBottom(scrollBottom.current);
  }, [messages]);

  useEffect(() => {
    if (yChatSocketState && messages && messages.length > 0) {
      // fetching member details first and then show messages so, it will not show Yliway users for messages
      async function fetchMembers() {
        await Promise.all(
          channelMemeberList.map(async (data) => {
            await getUserByID(data.user_id);
          })
        );
        handleIsChatDetailsLoading(false);
      }

      fetchMembers();
    }
  }, [channelMemeberList, messages, yChatSocketState]);

  return (
    <div className="chat-details">
      {!isChatDetailsLoading &&
        messages.map((message) => {
          const ChatMessageComponent = (
            <ChatMessage
              key={message.id}
              message={message}
              prevMessage={prevMessage}
              usersData={messageListing.usersData}
              isFloatMessage={isFloatMessage}
            />
          );
          prevMessage = message;
          return ChatMessageComponent;
        })}
      <div ref={scrollBottom} />
    </div>
  );
};

export default ChatDetails;
