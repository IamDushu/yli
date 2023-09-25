import React, { useContext, useEffect, useState } from "react";
import { ChatContext } from "context/ChatContext";
import ProfileImage from "../ProfileImage";
import { useRouter } from "next/router";
import { getChannelMembers, toggleModals } from "store/actions";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import dynamic from "next/dynamic";
import { getLocalStorage } from "utils";
import { useYchat } from "hooks/useYchat";

const MainModal = dynamic(() =>
  import("components/modal").then((mod) => mod.MainModal)
);
const AddMember = dynamic(() => import("components/modal/add-member"));
const ChannelMembers = dynamic(() => import("./ChannelMembers"));

const ChatHeader = () => {
  const { currentChannel, userDetails } = useContext(ChatContext);
  const { channelMemeberList } = useSelector((state) => state.chat);
  const router = useRouter();
  const dispatch = useDispatch();
  const { getUserByID, getUserFullName } = useYchat();
  const { addmembers, channelmembers } = useSelector(
    ({ ui }) => ui.modals,
    shallowEqual
  );
  const [user, setUser] = useState(null);
  const [fullName, setFullName] = useState(null);

  let mmLogin = getLocalStorage("mmLogin");
  if (mmLogin && typeof mmLogin === "string") {
    mmLogin = JSON.parse(mmLogin);
  }

  useEffect(() => {
    if (currentChannel?.type === "P") {
      dispatch(getChannelMembers(currentChannel?.id));
    }
  }, [currentChannel]);

  useEffect(async () => {
    let userData =
      currentChannel?.members &&
      Object.values(currentChannel?.members).find(
        (member) => member?.id !== userDetails?.id
      );
    if (userData && userData.mmId) {
      userData = await getUserByID(userData.mmId);
      setUser(userData);
    }
    const fullNameDetails =
      currentChannel?.display_name || getUserFullName(userData);
    setFullName(fullNameDetails);
  }, [currentChannel, getUserByID]);

  const closeUserChat = () => {
    if (window.screen.width <= 991) {
      document.querySelector(".chat-view").style.display = "none";
      document.querySelector(".message-page-sidebar").style.display = "block";
    }
  };
  return (
    <div className="pl-3 chat-header " key={currentChannel?.id}>
      <div className="d-flex align-items-center w-100 ">
        {currentChannel && (
          <>
            <span
              class="material-icons mr-2 d-lg-none font-18 text-gray"
              onClick={() => closeUserChat()}
            >
              arrow_back
            </span>

            <div
              className="d-flex align-items-center cursor-pointer"
              onClick={() => {
                if (currentChannel?.type === "D") {
                  {
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
                          }&name=${user?.instituteDetails?.firstName || ""}+${
                            user?.instituteDetails?.lastName || ""
                          }`
                        )
                      : router.push(
                          `/profile/${
                            message?.user_id === mmLogin?.mmId
                              ? userInfo?.profileId
                              : user?.profileId
                          }`
                        );
                  }
                }
              }}
            >
              {currentChannel?.type !== "P" && (
                <ProfileImage
                  key={fullName}
                  name={fullName}
                  src={
                    user?.profilePicURL ||
                    user?.companyDetail?.logo ||
                    user?.instituteDetails?.logo
                  }
                />
              )}
              <div className="flex-grow-1 d-flex ">
                <div>
                  <span className="d-block mb-1">
                    <strong>{fullName}</strong>
                  </span>
                  {currentChannel?.type === "P" && (
                    <>
                      <div
                        className="d-inline-flex align-items-center cursor-pointer mr-4"
                        onClick={() => {
                          if (channelMemeberList?.length > 0) {
                            dispatch(toggleModals({ channelmembers: true }));
                          }
                        }}
                      >
                        <i className="bx bx-user font-16 user-icon" />{" "}
                        <p className="mb-0 ml-1 font-13">
                          {channelMemeberList?.length}
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </>
        )}

        {currentChannel?.type === "P" &&
          mmLogin?.mmId === currentChannel?.creator_id && (
            <div
              className="d-inline-flex justify-content-end mr-4 ml-auto cursor-pointer"
              onClick={() => dispatch(toggleModals({ addmembers: true }))}
            >
              <i class="bx bx-user-plus font-24 user-icon" />
            </div>
          )}
      </div>

      <MainModal
        className="add-members modal"
        show={addmembers}
        keyModal="addmembers"
        body={<AddMember channelId={currentChannel?.id} />}
        headerClassName="mb-50 block md-mb-30"
        header={<h2 className="h6 mb-0">Add members to {fullName}</h2>}
      />
      <MainModal
        className="channelmembers modal"
        show={channelmembers}
        keyModal="channelmembers"
        body={<ChannelMembers channelMemeberList={channelMemeberList} />}
        headerClassName="mb-50 block md-mb-30"
        header={<h2 className="h6 mb-0">{fullName} members</h2>}
      />
    </div>
  );
};

export default ChatHeader;
