import { useRouter } from "next/router";
import React from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import moment from "moment";
import { selectUserInfo } from "store/selectors/user";
import { getDay, getLocalStorage } from "utils";
import ProfileImage from "../ProfileImage";
import { useYchat } from "hooks/useYchat";

const SearchMessageContainer = ({ message, prevMessage }) => {
  const router = useRouter();
  const [lang] = useTranslation("language");
  const { getUserByID, getUserFullName } = useYchat();
  const userInfo = useSelector(selectUserInfo);
  let mmLogin = getLocalStorage("mmLogin");
  if (mmLogin && typeof mmLogin === "string") {
    mmLogin = JSON.parse(mmLogin);
  }

  const user = getUserByID(message?.user_id);
  const fullName = getUserFullName(user);

  return (
    <>
      {!prevMessage || !moment(message.create_at).isSame(moment(prevMessage?.create_at), 'day') ? (
        <div className="date"><span>{getDay(message.create_at)}</span></div>
      ) : null}
      <div className="chat-message-container d-flex justify-content-between">
        <div className="d-flex w-100">
          <div className="d-inline-block">
            <ProfileImage
              name={fullName}
              src={user?.profilePicURL}
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
                      router.push(
                        `/profile/${message?.user_id === mmLogin?.mmId
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
            <div className="chat-message-body">
              <p className="mb-0">{message.message}</p>
            </div>
            <div
              className="chat-message-reply mt-2"
            // onClick={() => {
            //   activeThreadHandler(message);
            // }}
            >
              <i className="bx bx-reply pointer bx-xs text-gray mr-1" />
              <span>{lang("MESSAGE.JUMP")}</span>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default SearchMessageContainer;
