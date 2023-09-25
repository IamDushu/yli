import React, { useCallback, useEffect, useState } from "react";
import { Form, Modal, Button, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toggleModals } from "../../store/actions";
import { onImageError, getFullName } from "utils";
import { useTranslation } from "react-i18next";
import { getSearchedUsersList } from "../../store/actions/search-result";
import { searchedUsersList } from "store/selectors/searchResult";
import { getMyConnectionsList } from "store/actions/connections";
import { sentNotification } from "../../store/actions/yli-meet";
import { showMessageNotification, debounce } from "utils";
import { useRouter } from "next/router";

export const AddParticipants = () => {
  const [lang] = useTranslation("language");
  const dispatch = useDispatch();
  const router = useRouter();
  const { ylimeetId } = router.query;
  const list = useSelector((state) => state.connections.myConnectionList);
  const [searchText, setSearchText] = useState("");
  const [userCount, setUsertCount] = useState([]);
  const [userMails, setUserMails] = useState([]);
  const [totalSelectedUser, setTotalSelectedUser] = useState([]);
  const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const pagesize = 20;
  const searchedUserList = useSelector(searchedUsersList);
  list && list.sort((a, b) => a.firstName.localeCompare(b.firstName));

  useEffect(() => {
    if (list?.length === 0) {
      dispatch(
        getMyConnectionsList({
          page: 1,
          pagesize: pagesize,
          searchText,
        })
      );
    }
  }, []);

  const getSearchedUserLists = useCallback(
    debounce(async (text) => {
      await dispatch(
        getSearchedUsersList({
          page: 1,
          pagesize: 10,
          searchText: text,
        })
      );
    }, 1000),
    [dispatch]
  );

  const handleCheckboxChange = (event, itm) => {
    const checkboxValue = event.target.value;
    const isSelected = userCount.includes(checkboxValue);

    if (!isSelected) {
      if (userCount?.length >= 10) {
        event.preventDefault();
        return;
      }
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

  const sendInvite = () => {
    if (searchedUserList.rows?.length === 0 && searchText) {
      searchText
        .split(",")
        .map((item) =>
          item.match(regexEmail)
            ? !userMails.includes(item) && userMails.push(item)
            : showMessageNotification(`Please Enter Valid Email: ${item}`)
        );
    }
    if (userCount?.length + userMails?.length === 0) {
      showMessageNotification("Please select user or enter email");
      return;
    }
    if (userCount?.length + userMails?.length > 10) {
      showMessageNotification("Maximum 10 users allow");
      return;
    }
    const data = {
      meetId: ylimeetId,
      userIds: userCount,
      invitedUsers: totalSelectedUser,
      outsideMails: userMails,
    };
    dispatch(sentNotification(data, router, lang));
    dispatch(toggleModals({ addparticipants: false }));
  };

  const style = {
    display: "inline-block",
    width: "19px",
    height: "19px",
    border: "2px solid #bcbcbc",
    borderRadius: "2px",
    cursor: "pointer",
  };

  return (
    <>
      <Modal.Body className="p-3">
        <div>
          <div className="common-searchbar">
            <Form.Group
              controlId="formSearch"
              className="position-relative mb-0"
            >
              <Form.Control
                type="text"
                placeholder={lang("YLIMEET.INSTANT_YLIMEET.ADD_PARTICIPANTS.SEARCH_PLACEHOLDER")}
                className="text-primary"
                value={searchText}
                onChange={(e) => {
                  setSearchText(e.target.value);
                  getSearchedUserLists(e.target.value);
                }}
                autoComplete="off"
              />
              <div className="search-inner-icon">
                <em className="bx bx-search font-22"></em>
              </div>
              {searchText !== "" &&
              searchedUserList &&
              searchedUserList.rows?.length > 0 ? (
                <div>
                  <ul className="list-unstyled mb-0">
                    {searchedUserList.rows.map((itm, index) => {
                      return (
                        <li
                          className={`${userCount.includes(itm.id) ? "d-flex align-items-center active-chat" : "d-flex align-items-center"}`}
                          key={itm?.id}
                        >
                          <div className="ml-3 mr-3 mt-2">
                            <input
                              type="checkbox"
                              name="checkBox2"
                              style={style}
                              value={itm.id}
                              checked={userCount.includes(itm.id)}
                              onChange={(event) => {handleCheckboxChange(event, itm)}}
                            ></input>
                          </div>
                          <div className="w-h-40 mt-2">
                            <img
                              src={itm.profilePicURL}
                              onError={(e) => {
                                onImageError(
                                  e,
                                  "profile",
                                  `${itm.firstName} ${itm.lastName || ""}`
                                );
                              }}
                              width="32"
                              height="32"
                              className="rounded-pill overflow-hidden w-h-32 img-fluid object-cover pointer"
                              alt={itm.firstName}
                            />
                          </div>
                          <div className="text-body-16 ml-1">
                            {itm.firstName || ""} {itm.lastName || ""}
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ) : (
                searchText !== "" && (
                  <div className="text-center pt-5 pb-3">
                    <div className="mb-3 icon-avatar-54">
                      <span className="material-icons">search</span>
                    </div>
                    <h5>
                      {searchText !== "" &&
                        searchText.trim() &&
                        lang("YLIMEET.INSTANT_YLIMEET.ADD_PARTICIPANTS.USER_NOT_FOUND")}
                    </h5>
                  </div>
                )
              )}
            </Form.Group>
          </div>

          <div>
            {searchText === "" && (
              <ul className="list-unstyled mb-0">
                {list?.length > 0 &&
                  list.sort().map((obj) => (
                    <li
                      className={`${userCount.includes(obj.userId) ? "pt-1 pb-1 d-flex align-items-center active-chat" : "pt-1 pb-1 d-flex align-items-center"}`}
                      key={obj?.id}
                    >
                      <div className="ml-3 mr-3 mt-1">
                        <input
                          type="checkbox"
                          name="checkBox2"
                          style={style}
                          value={obj.userId}
                          checked={userCount.includes(obj.userId)}
                          onChange={(event) => {handleCheckboxChange(event, obj)}}
                        ></input>
                      </div>
                      <div className="user-profile-pic flex-shrink-0 w-h-40 border-0 rounded-pill pointer">
                        <img
                          className="d-flex img-fluid w-100 h-100"
                          src={
                            obj.profilePicURL ?? "/assets/images/user-noimg.jpg"
                          }
                          alt={getFullName(obj)}
                          onError={(e) => {
                            onImageError(e, "profile", getFullName(obj));
                          }}
                        />
                      </div>
                      <div className="text-body-16 ml-2 mt-1">
                        {obj.firstName || ""} {obj.lastName || ""}
                      </div>
                    </li>
                  ))}
                  {totalSelectedUser?.map((itm) => (
                    !itm.connectedAt && (<li
                      className="pt-1 pb-1 d-flex align-items-center active-chat"
                      key={itm?.id}
                    >
                      <div className="ml-3 mr-3 mt-1">
                        <input
                          type="checkbox"
                          name="checkBox2"
                          style={style}
                          value={itm.id}
                          checked={userCount.includes(itm.id)}
                          onChange={(event) => handleCheckboxChange(event, itm)}
                        ></input>
                      </div>
                      <div className="user-profile-pic flex-shrink-0 w-h-40 border-0 rounded-pill pointer">
                        <img
                          className="d-flex img-fluid w-100 h-100"
                          src={itm.profilePicURL}
                          alt={`${itm.firstName} ${itm.lastName || ""}`}
                          onError={(e) => {
                            onImageError(
                              e,
                              "profile",
                              `${itm.firstName} ${itm.lastName || ""}`
                            );
                          }}
                        />
                      </div>
                      <div className="text-body-16 ml-2 mt-1">
                        {itm.firstName || ""} {itm.lastName || ""}
                      </div>
                    </li>)
                  ))}
              </ul>
            )}
          </div>
        </div>
      </Modal.Body>

      <Modal.Footer className="custom-footer text-center d-flex border-top border-geyser justify-content-between">
        <Button
          variant="btn btn-info font-weight-semibold px-30"
          onClick={() => sendInvite()}
        >
          {lang("YLIMEET.INSTANT_YLIMEET.ADD_PARTICIPANTS.SENT_INVITE")}
        </Button>
      </Modal.Footer>
    </>
  );
};
