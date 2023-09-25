import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
  chatCreateUser,
  searchUserInChat,
  setSearchUser,
  toggleModals,
} from "store/actions";
import { Modal, Form } from "react-bootstrap";
import { debounce } from "lodash";
import ProfileImage from "components/messagesV2/ProfileImage";
import { getLocalStorage } from "utils";
import { useYchat } from "hooks/useYchat";

const FindChannel = () => {
  const [lang] = useTranslation("language");
  const dispatch = useDispatch();
  const [searchChannelData, setSearchChannelData] = useState([]);
  const { currentChannelHandler, searchChannelByName } = useYchat();
  const { searchUserData } = useSelector((state) => state.chat);
  let mmLogin = getLocalStorage("mmLogin");
  if (mmLogin && typeof mmLogin === "string") {
    mmLogin = JSON.parse(mmLogin);
  }
  const [searchMessage, setSearchMessage] = useState("");

  /************************************************************ 
    @purpose : useEffect for search channel members
    @Parameter : { group }
    @Author : INIC
    **********************************************************/
  useEffect(() => {
    if (searchMessage === "") {
      dispatch(setSearchUser([]));
      setSearchChannelData([]);
    }
  }, [searchMessage]);

  useEffect(() => {
    if (searchMessage !== "") {
      setSearchChannelData([
        ...(searchChannelByName(searchMessage) || []),
        ...(searchUserData?.usersData || []),
      ]);
    }
  }, [searchUserData]);

  useEffect(() => {
    if (searchMessage !== "" && searchMessage.trim()) {
      setSearchChannelData(searchChannelByName(searchMessage));
      dispatch(
        searchUserInChat({
          search: searchMessage,
          page: 1,
          perPage: 10,
        })
      );
    }
  }, [searchMessage]);
  /************************************************************ 
    @purpose : Debounce function for search channel members
    @Parameter : { group }
    @Author : INIC
    **********************************************************/
  const searchChannelMembers = useCallback(
    debounce((value) => {
      setSearchMessage(value);
    }, 500)
  );

  const searchHandler = async (userData) => {
    if(userData.type !== "P") {
      const res = await chatCreateUser({
        ids: [userData?.mmId, mmLogin?.mmId],
      });
      currentChannelHandler({
        ...res,
        members: {
          [userData?.mmId]: res.userData
        }
      });
    } else {
      currentChannelHandler(userData);
    }
    dispatch(toggleModals({ searchChannel: false }));
    dispatch(setSearchUser([]));
    setSearchChannelData([]);
  };
  return (
    <>
      {/* <Form> */}
      <Modal.Body className="p-4">
        <div className="common-searchbar mb-3">
          <Form.Group controlId="formSearch" className="position-relative mb-0">
            <Form.Control
              type="text"
              placeholder={lang("MY_ACCOUNTS.COMMON.SEARCH")}
              onChange={(e) => searchChannelMembers(e.target.value)}
            />
            <div className="search-inner-icon">
              <em className="bx bx-search"></em>
            </div>
          </Form.Group>
        </div>
        {searchChannelData?.length > 0 ? (
          searchChannelData?.map((channel) => {
            const fullName =
              channel?.display_name ||
              (channel?.firstName || "") + " " + (channel?.lastName || "");

            return (
              <div
                className="chat-message-container cursor-pointer"
                key={channel?.id}
                onClick={() => {
                  searchHandler(channel);
                }}
              >
                <div className="row mb-2 pl-3">
                    {channel?.type !== "P" ? (
                      <ProfileImage
                        key={fullName}
                        name={fullName}
                        src={channel?.profilePicURL}
                        size={24}
                      />
                    ) : (
                      <i class="bx bxs-lock-alt bx-xs"></i>
                    )}
                    <div
                      className={`position-relative ${channel.type === "P" ? "pl-2" : ""
                        } mr-2 text-ellipsis notification-listing`}
                    >
                      <a
                        title={fullName}
                        className="font-14 text-ellipsis font-weight-normal"
                      >
                        {fullName}
                      </a>
                    </div>
                </div>
              </div>
            )
          })
        ) : (
          <div className="text-center pt-5 pb-3">
            <div className="mb-3 icon-avatar-54">
              <span className="material-icons">search</span>
            </div>
            <h5>
              {searchMessage !== "" && searchMessage.trim()
                ? lang("MESSAGE.NO_RESULT", { query: searchMessage })
                : lang("MESSAGE.SEARCH_CHANNELS")}
            </h5>
            <p className="mb-0">{lang("MESSAGE.CHECK_SPELL")}</p>
          </div>
        )}
      </Modal.Body>
      <Modal.Footer className="custom-footer text-center d-flex border-top border-geyser justify-content-between" />
    </>
  );
};

export default FindChannel;
