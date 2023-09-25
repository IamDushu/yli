import { ChatContext } from "context/ChatContext";
import moment from "moment";
import { useRouter } from "next/router";
import React, { useContext, useState, useMemo, useEffect } from "react";
import { Dropdown, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  confirmDeleteMessgae,
  editMessageInChannel,
  getMessageListing,
  getThreadMessages,
  toggleModals,
} from "store/actions";
import { selectUserInfo } from "store/selectors/user";
import { getDay, getLocalStorage } from "utils";
import ProfileImage from "../ProfileImage";
import Picker from "@emoji-mart/react";
// import FileMessage from "./FileMessage";
import { useYchat } from "hooks/useYchat";

const ChatMessage = ({
  message,
  isThread,
  prevMessage,
  isFloatMessage,
  usersData,
}) => {
  const router = useRouter();
  const { activeThread, activeThreadHandler } = useContext(ChatContext);
  const {
    getUserByID,
    getUserFullName,
    getUserByUserNameOrId,
    yChatSocketState,
  } = useYchat();
  const dispatch = useDispatch();
  const userInfo = useSelector(selectUserInfo);
  const [addEmoji, setAddEmoji] = useState(false);
  const [messageText, setMessageText] = useState("");
  const [user, setUser] = useState(null);
  const [isSystemMsg, setIsSystemMsg] = useState(false);
  const [fullName, setFullName] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  let mmLogin = getLocalStorage("mmLogin");
  if (mmLogin && typeof mmLogin === "string") {
    mmLogin = JSON.parse(mmLogin);
  }

  const editInitialState = {
    status: false,
    id: "",
    message: "",
  };
  const [editMessage, setEditMessage] = useState(editInitialState);
  /*******************   
 @purpose : Edit message popup
 @Author : INIC
 ******************/
  const saveEditHandler = async (message) => {
    await dispatch(
      editMessageInChannel({ message: editMessage.message }, editMessage.id)
    );
    if (isThread) {
      dispatch(getThreadMessages(activeThread.id));
    } else {
      await dispatch(getMessageListing(message?.channel_id));
    }
    setEditMessage(editInitialState);
  };

  /******************* 
@purpose : Used for handle Emoji
@Parameter : {}
@Author : INIC
******************/
  const handleEmoji = (e) => {
    const text = editMessage.message + e.native;
    setEditMessage({ ...editMessage, message: text });
  };

  useEffect(() => {
    if (yChatSocketState) {
      const fetchUser = async () => {
        let userDetail = await getUserByID(message?.user_id);
        if (!userDetail) {
          userDetail = usersData?.find((x) => x.mmId === message?.user_id);
        }
        let _isSystemMsg = message?.type?.startsWith("system");
        setFullName(getUserFullName(userDetail, _isSystemMsg));
        setUser(userDetail);
        setIsSystemMsg(_isSystemMsg);
        setIsLoading(false);
      };

      fetchUser();
    }
  }, [message, yChatSocketState]);

  const openChatThread = () => {
    if (window.screen.width <= 991) {
      document.querySelector(".chat-view").style.display = "none";
    }
  };

  useEffect(async () => {
    if (message && yChatSocketState) {
      let formattedMessage = message.message.replace(/\n/g, "<br />");
      if (message?.props?.username) {
        const user = await getUserByUserNameOrId(
          message?.props?.username,
          message?.type === "system_join_channel"
            ? message?.user_id
            : message?.props?.userId
        );
        formattedMessage = formattedMessage.replace(
          message?.props?.username,
          getUserFullName(user)
        );
      }
      if (message?.props?.addedUsername) {
        const user = await getUserByUserNameOrId(
          message?.props?.addedUsername,
          message?.props?.addedUserId
        );
        formattedMessage = formattedMessage.replace(
          message?.props?.addedUsername,
          getUserFullName(user)
        );
      }
      setMessageText(formattedMessage);
    }
  }, [getUserByUserNameOrId, message, yChatSocketState]);

  return (
    <>
      {!prevMessage ||
      !moment(message.create_at).isSame(
        moment(prevMessage?.create_at),
        "day"
      ) ? (
        <div className="date">
          <span>{getDay(message.create_at)}</span>
        </div>
      ) : null}
      {!isLoading && (
        <div className="chat-message-container d-flex justify-content-between">
          <div className="d-flex w-100">
            <div className="d-inline-block">
              <ProfileImage
                name={fullName}
                src={
                  isSystemMsg
                    ? "/assets/images/brand-logo-icon.png"
                    : user?.type === "user"
                    ? user?.profilePicURL
                    : user?.type === "Learning Institute"
                    ? user?.instituteDetails?.logo
                    : user?.companyDetail?.logo
                }
              />
            </div>
            <div className="pl-2 d-block flex-grow-1">
              <div>
                <span className="chat-message-user">
                  <strong
                    className="cursor-pointer font-weight-medium"
                    onClick={() => {
                      if (
                        message?.type !== "system_join_channel" &&
                        message?.type !== "system_add_to_channel"
                      ) {
                        user?.type === "Company"
                          ? router.push(
                              `/profile/company-profile?companyId=${
                                user?.companyDetail?.id
                              }&name=${user?.companyDetail?.firstName || ""}+${
                                user?.companyDetail?.lastName || ""
                              }`
                            )
                          : user?.type === "Learning Institute"
                          ? router.push(
                              `/profile/institute-profile?instituteId=${
                                user?.instituteDetails?.id
                              }&name=${
                                user?.instituteDetails?.firstName || ""
                              }+${user?.instituteDetails?.lastName || ""}`
                            )
                          : router.push(
                              `/profile/${
                                message?.user_id === mmLogin?.mmId
                                  ? userInfo?.profileId
                                  : user?.profileId
                              }`
                            );
                      }
                    }}
                  >
                    {fullName}
                  </strong>
                </span>
                <span className="chat-message-time">
                  {moment(message.create_at).format("HH:mm")}
                </span>
              </div>
              {editMessage.status && editMessage.id ? (
                <div>
                  <div className="mb-2 position-relative">
                    <Form.Control
                      type="text"
                      className="pr-5"
                      value={editMessage.message}
                      placeholder="Edit message"
                      onChange={(e) =>
                        setEditMessage({
                          ...editMessage,
                          message: e.target.value,
                        })
                      }
                    />
                    <div className="message-text-options d-flex">
                      <i
                        className="material-icons text-gray-darker cursor-pointer font-18"
                        onClick={() => setAddEmoji(!addEmoji)}
                      >
                        emoji_emotions
                      </i>

                      {addEmoji && (
                        <div className="emoji-overlay-popup">
                          <Picker
                            onEmojiSelect={(e) => {
                              setAddEmoji(false);
                              handleEmoji(e);
                            }}
                            theme="light"
                            previewPosition="none"
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <button
                      className="btn btn-sm btn-info font-weight-semibold mr-2"
                      onClick={() => saveEditHandler(message)}
                      disabled={
                        !editMessage.message !== "" &&
                        !editMessage.message.trim()
                      }
                    >
                      Save
                    </button>
                    <button
                      className="btn btn-sm btn-dark font-weight-semibold"
                      onClick={() => setEditMessage(editInitialState)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  {/* <div className="chat-message-body">
                  <p className="mb-0">{message.message}</p>
                </div> */}

                  {/* <div className="chat-message-body">
                  {message.message.split("\n").map((substring, index) => (
                    <p className="mb-0" key={index}>
                      {substring}
                    </p>
                  ))}
                </div> */}

                  <div className="chat-message-body">
                    <p
                      className="mb-0"
                      dangerouslySetInnerHTML={{
                        __html: messageText,
                      }}
                    ></p>
                  </div>

                  {/* message?.file_ids && <FileMessage message={message} /> */}
                </>
              )}
            </div>
          </div>

          {(message?.user_id === mmLogin?.mmId || !isThread) &&
            message?.type !== "system_join_channel" &&
            message?.type !== "system_add_to_channel" &&
            !(isFloatMessage && message?.user_id !== mmLogin?.mmId) && (
              <div className="ml-auto text-right">
                <Dropdown className="theme-dropdown">
                  <Dropdown.Toggle>
                    <em className="icon icon-ellipsis-h font-24 text-black"></em>
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    {!isThread && !isFloatMessage && (
                      <Dropdown.Item
                        className="d-flex align-items-center"
                        onClick={() => {
                          activeThreadHandler(message);
                          openChatThread();
                        }}
                      >
                        <i className="bx bx-reply bx-xs pr-2 text-gray" />
                        Reply
                      </Dropdown.Item>
                    )}
                    {message?.user_id === mmLogin?.mmId && (
                      <>
                        <Dropdown.Item
                          className="d-flex align-items-center"
                          onClick={() => {
                            setEditMessage({
                              ...editMessage,
                              status: true,
                              id: message.id,
                              message: message.message,
                            });
                          }}
                        >
                          <span className="icon-write font-16 pr-2 text-info"></span>
                          Edit
                        </Dropdown.Item>
                        <Dropdown.Item
                          className="d-flex align-items-center"
                          onClick={async () => {
                            dispatch(
                              confirmDeleteMessgae({ message, isThread })
                            );
                            dispatch(toggleModals({ deleteMessage: true }));
                          }}
                        >
                          <span className="icon-delete font-16 pr-2 text-info"></span>
                          Delete
                        </Dropdown.Item>
                      </>
                    )}
                  </Dropdown.Menu>
                </Dropdown>

                {!isThread && message.thread_reply_cnt > 0 && (
                  <div
                    className="chat-message-reply mt-1"
                    onClick={() => {
                      activeThreadHandler(message);
                    }}
                  >
                    {/*             <ProfileImage
                size={24}
                name={
                  message?.user_id === mmLogin?.mmId
                    ? `${userInfo?.firstName} ${userInfo?.lastName}`
                    : fullName
                }
              /> */}
                    <i className="bx bx-reply pointer bx-xs text-gray mr-1" />
                    <span className="text-ellipsis">
                      {message.thread_reply_cnt} Reply
                    </span>
                  </div>
                )}
              </div>
            )}
        </div>
      )}
    </>
  );
};

export default ChatMessage;
