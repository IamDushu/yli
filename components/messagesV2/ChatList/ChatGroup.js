import React, { useState } from "react";
import ChatProfile from "./ChatProfile";

const ChatGroup = ({ title, chats, onAddClick, open = true }) => {
  const [isOpen, setIsOpen] = useState(open);

  return (
    <>
      <div
        className="font-14 text-white text-ellipsis d-flex align-item-center cursor-pointer mx-3 py-3 border-top border-geyser"
        onClick={() => setIsOpen(!isOpen)}
      >
        <em
          className={`icon ${
            isOpen ? "icon-down-arrow" : "icon-right-angle-arrow"
          } font-22 ico-icon-black
          `}
        />
        <span className="pt-1 pl-2 text-black font-weight-bold"> {title}</span>
        {title === "Private Channels" && (
          <em
            className="icon icon-plus-primary font-14 pt-2 ml-auto text-black"
            onClick={onAddClick}
          />
        )}
      </div>
      {isOpen && (
        <ul className="listing-section border-first-0">
          {chats &&
            chats.length > 0 &&
            chats.map((chat) => <ChatProfile key={chat.id} chat={chat} />)}
        </ul>
      )}
    </>
  );
};

export default ChatGroup;
