import ProfileImage from "components/messagesV2/ProfileImage";
import React, { Fragment, useContext, useState } from "react";
import ChatDetails from "components/messagesV2/ChatView/ChatDetails";
import ChatFooter from "components/messagesV2/ChatView/ChatFooter";
import { ChatContext } from "context/ChatContext";
import { useYchat } from "hooks/useYchat";

const CurrentChannel = ({ currentChannel, close, setClose, event }) => {
  const [hide, setHide] = useState(false);
  const [expandCollapse, setExpandCollapse] = useState(false);
  const { currentChannelHandler, getUserFullName } = useYchat();
  const { userDetails } = useContext(ChatContext);
  const user = currentChannel?.members && Object.values(currentChannel?.members).find((member) => member?.id !== userDetails?.id)
  const fullName = currentChannel?.display_name || getUserFullName(user);
  /******************* 
  @purpose : Rander HTML/ React Components
  @Author : INIC
  ******************/
  return (
    <Fragment>
      <div
        className={
          close
            ? "float-chat-panel border border-geyser d-none"
            : hide
            ? "float-chat-panel clicker-view border border-geyser"
            : `float-chat-panel border border-geyser ${
                expandCollapse ? "large-chat-panel" : ""
              } ${event ? "ymeet-chat-panel" : ""}`
          // large-chat-panel --> Add this class to large current chat pannel
        }
        key={currentChannel?.id}
      >
        <div className="chat-panel position-relative d-sm-block d-none">
          <ul className="listing-section bg-white">
            <li className="p-3 align-items-center d-flex border-info border-bottom">
              <div className="d-flex align-items-center top-header flex-grow-1">
                <div className="w-h-32 position-relative rounded-pill mr-2">
                  <div className="w-h-32 rounded-pill overflow-hidden">
                    <ProfileImage
                      name={fullName}
                      src={user?.profilePicURL}
                    />
                  </div>
                </div>
                <div className="position-relative mr-sm-2 w-140 notification-listing text-ellipsis">
                  <a title={fullName} className="text-body-14">
                    {fullName}
                  </a>
                </div>
              </div>
              <i
                className={`bx ${
                  expandCollapse ? "bx-collapse" : "bx-expand"
                } bx-sm text-gray cursor-pointer ml-3`}
                onClick={() => {
                  setExpandCollapse(!expandCollapse);
                }}
              ></i>
              <i
                className="bx bx-x pointer bx-sm text-gray cursor-pointer ml-3"
                onClick={() => {
                  setClose(true);
                  setExpandCollapse(false);
                  currentChannelHandler(null);
                }}
              ></i>
              <span
                className="icon-down-arrow-grey font-14 pointer ml-3 icon-for-dropclick cursor-pointer"
                onClick={() => setHide(!hide)}
              ></span>
            </li>
          </ul>
          {!hide && (
            <div className="chatting-box bottom-show-typemsg float-chat-container">
              <div className="chat-view current-chat-list">
                <ChatDetails isFloatMessage={true} />
              </div>
              <ChatFooter />
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default CurrentChannel;
