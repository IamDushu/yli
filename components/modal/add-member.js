import React, { Fragment, useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addChannelMembers,
  getMessageListing,
  searchUserInChat,
  toggleModals,
} from "store/actions";
import { debounce } from "utils";
import { FormControl, InputAdornment, OutlinedInput } from "@mui/material";
import { Icon } from "components/icons";
import { useTranslation } from "react-i18next";
import ProfileImage from "components/MessagesV3/ProfileImage";
import ModalFooter from "components/yli-modal/modalFooter";
import ModalBody from "components/yli-modal/modalBody";

const AddMember = ({ channelId }) => {
  const dispatch = useDispatch();
  const [lang] = useTranslation("language");
  const [searchMessage, setSearchMessage] = useState("");
  const [searchUserList, setSearchUserList] = useState([]);
  const [userCount, setUsertCount] = useState([]);
  const [totalSelectedUser, setTotalSelectedUser] = useState([]);
  const { searchUserData } = useSelector((state) => state.chat);

  useEffect(() => {
    if (searchMessage !== "") {
      setSearchUserList([...(searchUserData?.usersData || [])]);
    }
  }, [searchUserData]);

  const style = {
    width: "20px",
    height: "20px",
    cursor: "pointer",
  };

  const getSearchedUserLists = useCallback(
    debounce(async (text) => {
      setSearchMessage(text);
      dispatch(
        searchUserInChat({
          search: text,
          page: 1,
          perPage: 10,
          type: "privateChannel",
          channelId,
        })
      );
    }, 1000),
    [dispatch]
  );

  const handleCheckboxChange = (event, itm) => {
    const checkboxValue = event.target.value;
    const isSelected = userCount.includes(checkboxValue);

    if (!isSelected) {
      setUsertCount((prevState) => [...prevState, checkboxValue]);
      setTotalSelectedUser((prevState) => [...prevState, itm]);
    } else {
      setUsertCount((prevState) =>
        prevState.filter((value) => value !== checkboxValue)
      );
      setTotalSelectedUser((prevState) =>
        prevState.filter((user) => user.id !== itm.id)
      );
    }
  };

  const addMemberToChannel = async () => {
    if (totalSelectedUser.length > 0) {
      let mmId;
      mmId = totalSelectedUser.map(({ mmId }) => mmId);

      for (let i = 0; i < mmId.length; i++) {
        await dispatch(addChannelMembers({ user_id: mmId[i] }, channelId));
      }
      await dispatch(toggleModals({ addmembers: false }));
      await dispatch(getMessageListing(channelId));
    }
  };

  return (
    <Fragment>
      <ModalBody>
        <div className="common-searchbar mb-3">
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
              onChange={(e) => {
                getSearchedUserLists(e.target.value);
              }}
            />
          </FormControl>
          <div className="mt-3">
            {searchUserList?.length > 0 &&
              searchUserList?.map((userData) => {
                const fullName =
                  userData?.display_name ||
                  (userData?.firstName || "") +
                    " " +
                    (userData?.lastName || "");
                return (
                  <div
                    className={`p-1 ${
                      userCount.includes(userData.id) ? "active-chat" : ""
                    }`}
                  >
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <div>
                        <div>
                          <ProfileImage
                            key={fullName}
                            name={fullName}
                            src={userData?.profilePicURL}
                            size={32}
                          />
                        </div>
                      </div>
                      <div>{fullName}</div>
                      <div className="pt-1 ml-auto">
                        <input
                          type="checkbox"
                          name="checkBox2"
                          style={style}
                          value={userData.id}
                          checked={userCount.includes(userData.id)}
                          onChange={(event) => {
                            handleCheckboxChange(event, userData);
                          }}
                        ></input>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </ModalBody>
      <ModalFooter
        showCanel
        cancleHandleClick={() => dispatch(toggleModals({ addmembers: false }))}
        performButtonTitle={lang("MESSAGE.ADD_MEMBER")}
        performHandleClick={() => addMemberToChannel()}
      />
    </Fragment>
  );
};

export default AddMember;
