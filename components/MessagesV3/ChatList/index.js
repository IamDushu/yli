import React, { useContext, useEffect, useMemo, useState } from "react";
import { getMessageListing, toggleModals } from "store/actions";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import { selectUserInfo } from "store/selectors/user";
import { Link } from "@routes";
import { useTranslation } from "react-i18next";
import dynamic from "next/dynamic";
import { ChatContext } from "context/ChatContext";
import ProfileImage from "../ProfileImage";
import { SearchBar } from "components/header/search-bar";
import { CollapseList } from "components/CollapseList";
import ChatProfile from "./ChatProfile";
import YliModal from "components/yli-modal";

const CreateChannel = dynamic(() => import("components/modal/CreateChannel"));
const FindChannel = dynamic(() => import("components/modal/FindChannel"));

const ChatList = ({ isFloatMessage }) => {
  const dispatch = useDispatch();
  const [lang] = useTranslation("language");
  const [fullSize, setFullSize] = useState(!isFloatMessage);
  const { createChannel, searchChannel, isYliMeet } = useSelector(
    ({ ui }) => ui.modals,
    shallowEqual
  );
  const userInfo = useSelector(selectUserInfo);
  const { currentChannel, channels } = useContext(ChatContext);
  const [privateChats, directChats] = useMemo(() => {
    const chats = _.orderBy(
      Object.values(channels),
      (x) => new Date(x.last_post_at),
      "desc"
    );
    return [
      chats.filter((row) => row.type === "P"),
      chats.filter((row) => row.type === "D"),
    ];
  }, [channels]);

  useEffect(() => {
    if (currentChannel?.id) dispatch(getMessageListing(currentChannel?.id));
  }, [currentChannel?.id]);

  return (
    <div
      className={`${
        isFloatMessage
          ? "float-msg border border-geyser"
          : "message-page-sidebar bg-white"
      }`}
    >
      {isFloatMessage && (
        <div
          className={
            "bg-white p-12 py-1 d-flex align-items-center justify-content-between"
          }
          onClick={() => setFullSize(!fullSize)}
        >
          <Link href="">
            <a title="">
              <div className="d-flex align-items-center">
                <ProfileImage
                  src={userInfo?.profilePicURL}
                  name={`${userInfo?.firstName} ${userInfo?.lastName}`}
                />
                <h5
                  className={
                    "font-14 text-black text-ellipsis font-semibold mb-0"
                  }
                  onClick={() => setFullSize(!fullSize)}
                >
                  {lang("MESSAGE.MESSAGING")}
                </h5>
              </div>
            </a>
          </Link>
          <div className=" d-flex align-items-center text-white">
            <div className="ml-2 d-flex align-items-center"></div>
            <em
              className={`icon icon-down-arrow ml-3 font-24 ico-icon-off-black ${
                fullSize ? "" : "rotate-top"
              }`}
              onClick={() => setFullSize(!fullSize)}
            ></em>
          </div>
        </div>
      )}

      <div className={`font-14 bg-white ${!isFloatMessage ? "h-100" : ""}`}>
        <div
          className={
            fullSize
              ? "bg-white chatters-list flex-shrink-0"
              : "chatters-list d-none flex-shrink-0"
          }
        >
          <div
            className={`${
              isFloatMessage ? "px-3 py-2" : "pt-0 pr-3 pb-2 pl-3"
            } border-geyser`}
          >
            <div className="w-100 position-relative pt-2">
              <SearchBar
                handleClick={() =>
                  dispatch(toggleModals({ searchChannel: true }))
                }
                placeHolderText={lang("MESSAGE.SEARCH_CHANNELS")}
              />
            </div>
          </div>

          <div className="chat-list-height">
            <CollapseList
              title="Private Channels"
              items={privateChats}
              open={false}
              onAddClick={() => dispatch(toggleModals({ createChannel: true }))}
              render={(chat) => <ChatProfile key={chat.id} chat={chat} />}
            />
            <CollapseList
              title="Direct Channel"
              items={directChats}
              render={(chat) => <ChatProfile key={chat.id} chat={chat} />}
            />
          </div>
        </div>
      </div>
      <YliModal
        show={createChannel}
        keyModal="createChannel"
        body={<CreateChannel isYliMeet={isYliMeet} />}
        headerClassName="mb-50 block md-mb-30"
        header={lang("MESSAGE.CREATE_PRIVATE_CHANNEL")}
      />
      <YliModal
        className="custom-modal-footer"
        show={searchChannel}
        keyModal="searchChannel"
        centered
        body={<FindChannel />}
        headerClassName="mb-50 block md-mb-30"
        header={
          <div>
            {lang("MESSAGE.FIND_CHANNEL")}
            <p className="mb-0 text-body-14 text-gray pr-4">
              {lang("MESSAGE.FIND_CHANNEL_DESCRIPTION")}
            </p>
          </div>
        }
      />
    </div>
  );
};

export default ChatList;
