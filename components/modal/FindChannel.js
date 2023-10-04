import React, { Fragment, useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
  chatCreateUser,
  searchUserInChat,
  setSearchUser,
  toggleModals,
} from "store/actions";
import { debounce } from "lodash";
import ProfileImage from "components/MessagesV3/ProfileImage";
import { getLocalStorage } from "utils";
import { useYchat } from "hooks/useYchat";
import { FormControl, InputAdornment, OutlinedInput } from "@mui/material";
import { Icon } from "components/icons";
import ModalBody from "components/yli-modal/modalBody";

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
    if (userData.type !== "P") {
      const res = await chatCreateUser({
        ids: [userData?.mmId, mmLogin?.mmId],
      });
      currentChannelHandler({
        ...res,
        members: {
          [userData?.mmId]: res.userData,
        },
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
      <Fragment>
        <ModalBody>
          <FormControl sx={{ m: 0, width: "100%" }} variant="outlined">
            <OutlinedInput
              startAdornment={
                <InputAdornment className="mt-1">
                  <Icon iconName="searchIcon" />
                </InputAdornment>
              }
              aria-describedby="outlined-weight-helper-text"
              inputProps={{
                "aria-label": "weight",
              }}
              placeholder={lang("MY_ACCOUNTS.COMMON.SEARCH")}
              onChange={(e) => searchChannelMembers(e.target.value)}
            />
          </FormControl>
          {searchChannelData?.length > 0 ? (
            searchChannelData?.map((channel) => {
              const fullName =
                channel?.display_name ||
                (channel?.firstName || "") + " " + (channel?.lastName || "");

              return (
                <div
                  className="mt-2 cursor-pointer"
                  key={channel?.id}
                  onClick={() => {
                    searchHandler(channel);
                  }}
                >
                  <div style={{ display:"flex", alignItems:"center", marginTop: "2px"}}>
                    <div>
                      <ProfileImage
                        key={fullName}
                        name={fullName}
                        src={channel?.profilePicURL}
                        size={32}
                      />
                    </div>
                    <div className="ml-2">
                      <a title={fullName}>{fullName}</a>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center pt-5 pb-3">
              <div className="mb-3 icon-avatar-54">
                <Icon iconName="searchIcon" width={30} height={30} />
              </div>
              <h5 className="model-header">
                {searchMessage !== "" && searchMessage.trim()
                  ? lang("MESSAGE.NO_RESULT", { query: searchMessage })
                  : lang("MESSAGE.SEARCH_CHANNELS")}
              </h5>
              <p className="mb-0 text-gray">{lang("MESSAGE.CHECK_SPELL")}</p>
            </div>
          )}
        </ModalBody>
      </Fragment>
    </>
  );
};

export default FindChannel;
