import React, { useContext, useEffect, useMemo, useState } from "react";
import { getMessageListing, toggleModals } from "store/actions";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import { selectUserInfo } from "store/selectors/user";
import { Link } from "@routes";
import { useTranslation } from "react-i18next";
import dynamic from "next/dynamic";
import { ChatContext } from "context/ChatContext";
import ChatGroup from "./ChatGroup";
import ProfileImage from "../ProfileImage";
import { useRouter } from "next/router";

const MainModal = dynamic(() =>
  import("components/modal").then((mod) => mod.MainModal)
);
const CreateChannel = dynamic(() => import("components/modal/CreateChannel"));
const FindChannel = dynamic(() => import("components/modal/FindChannel"));

const ChatList = ({ isFloatMessage }) => {
  const router = useRouter();
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
              <input
                type="select"
                className="write-message search-message text-white w-100 font-14"
                placeholder={lang("MESSAGE.SEARCH_CHANNELS")}
                readOnly={true}
                onClick={() => dispatch(toggleModals({ searchChannel: true }))}
              />
              <div className="position-absolute search-write-icon">
                <span className="bx bx-search text-secondary  font-20"></span>
              </div>
            </div>
          </div>

          <div className="chat-list-height">
            <ChatGroup
              title="Private Channels"
              chats={privateChats}
              open={false}
              onAddClick={() => dispatch(toggleModals({ createChannel: true }))}
            />
            <ChatGroup title="Direct Channel" chats={directChats} />
          </div>
        </div>
      </div>
      <MainModal
        show={createChannel}
        keyModal="createChannel"
        body={<CreateChannel isYliMeet={isYliMeet} />}
        headerClassName="mb-50 block md-mb-30"
        header={<h2 className="h6 m-0">Create Channel</h2>}
      />
      <MainModal
        className="profile-photo-view custom-modal-footer"
        show={searchChannel}
        keyModal="searchChannel"
        centered
        body={<FindChannel />}
        headerClassName="mb-50 block md-mb-30"
        header={
          <div>
            <h2 className="h6 m-0">Find Channels</h2>
            <p className="mb-0 mt-1 text-body-14 font-weight-normal pr-4">
              Type to find a channel.
            </p>
          </div>
        }
      />
    </div>
  );
};

export default ChatList;
