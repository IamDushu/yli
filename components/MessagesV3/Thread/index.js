import React, { useContext, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import ChatMessage from "../ChatView/ChatMessage";
import { ChatContext } from "context/ChatContext";
import MessageBox from "../MessageBox";
import { getThreadMessages } from "store/actions";

const Thread = () => {
  const dispatch = useDispatch();
  const { activeThread, activeThreadHandler } = useContext(ChatContext);
  const { threadListing, messageListing } = useSelector((state) => state.chat);
  let prevMessage;

  const messages = useMemo(() => {
    if (threadListing) {
      return _.orderBy(threadListing, (x) => new Date(x.create_at));
    }
    return [];
  }, [threadListing]);

  useEffect(() => {
    if (activeThread && activeThread.id) {
      dispatch(getThreadMessages(activeThread.id))
    }
  }, [activeThread?.id])
  const closeChatThread = () => {
    if (window.screen.width <= 991) {
      document.querySelector(".chat-view").style.display = 'block';
    }
  }

  return (
    <>
      {activeThread && (
        <div className="chat-thread">
          <div className="pl-3 chat-header d-flex align-items-center justify-space-bw pr-3">
            <div className="chat-thread-title">Threads</div>
            <div className="d-flex">
              <div>
                <i
                  className="bx bx-x pointer bx-sm text-gray cursor-pointer ml-3"
                  onClick={() => {
                    activeThreadHandler(null),
                      closeChatThread();
                  }}
                />
              </div>
            </div>
          </div>
          <div className="pt-3 thread-chat-list">
            {messages.map((message) => {
              const ChatMessageComponent = (
                <ChatMessage
                  key={message.id}
                  message={message}
                  prevMessage={prevMessage}
                  usersData={messageListing.usersData}
                  isThread={true}
                />
              );
              prevMessage = message;
              return ChatMessageComponent;
            })}
          </div>
          <div className="p-2 messagebox-overlay">
            <MessageBox isThread={true} />
          </div>
        </div>
      )}
    </>
  );
};

export default Thread;
