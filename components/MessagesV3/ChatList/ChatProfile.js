import { ChatContext } from "context/ChatContext";
import React, { useContext, useEffect, useState } from "react";
import ProfileImage from "../ProfileImage";
import { useYchat } from "hooks/useYchat";
import { getDateTime } from "utils";

const ChatProfile = ({ chat }) => {
  const { currentChannelHandler, getUserByID, getUserFullName } = useYchat();
  const { userDetails, currentChannel } = useContext(ChatContext);
  const [user, setUser] = useState(null);
  const [fullName, setFullName] = useState(null);

  useEffect(async () => {
    let userData =
      chat?.members &&
      Object.values(chat?.members).find(
        (member) => member?.id !== userDetails?.id
      );

    if (userData && userData.id) {
      userData = await getUserByID(userData.mmId);
      setUser(userData);
    }
    const fullNameDetails = chat?.display_name || getUserFullName(userData);
    setFullName(fullNameDetails);
  }, [chat, getUserByID]);

  const openUserChat = () => {
    if (window.screen.width <= 991) {
      document.querySelector(".message-page-sidebar").style.display = "none";
      document.querySelector(".chat-view").style.display = "block";
    }
  };

  return (
    <li
      className={`${
        chat?.unread?.msg_count > 0 && "bg-unread-message"
      } listing-box message-user-list position-relative border-top-0 px-12 d-flex align-items-center justify-content-between ${
        currentChannel?.id === chat.id && "active-chat"
      }`}
      style={{ height: "45px" }}
      key={chat.id}
      onClick={() => {
        currentChannelHandler(chat), openUserChat();
      }}
    >
      <div className="d-flex align-items-center">
        <div className="w-h-30 position-relative rounded-pill mr-2">
          <div className="w-h-30 rounded-pill ">
            <ProfileImage
              key={fullName}
              name={fullName}
              src={
                user?.profilePicURL ||
                user?.companyDetail?.logo ||
                user?.instituteDetails?.logo
              }
              size={24}
              fontSize={"0.72rem"}
              isOnline={user?.isUserOnline}
            />
          </div>
        </div>
        <div
          className={`position-relative mr-2 text-ellipsis notification-listing`}
        >
          <a
            title={fullName}
            className="font-14 text-ellipsis font-weight-normal"
          >
            {fullName}
          </a>
        </div>
      </div>

      <div className="d-flex align-items-center text-right">
        <h6 className="font-weight-normal text-nowrap text-gray text-body-12 mb-0">
          {getDateTime(chat.last_post_at || chat.create_at)}
        </h6>
      </div>
    </li>
  );
};

export default ChatProfile;
