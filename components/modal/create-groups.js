import React, { useCallback, useEffect, useState } from "react";
import { Form, Button, Card, Modal } from "react-bootstrap";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import {
  clearGroupsConnectionList,
  getGroupsConnectionList,
  groupsInviteAction,
  groupsInviteSend,
  toggleModals,
} from "store/actions";
import { onImageError } from "utils";
import { selectUserInfo } from "store/selectors/user";
import { useTranslation } from "react-i18next";

/******************* 
@purpose : User Set CreateGroups
@Author : INIC
******************/
export const CreateGroups = () => {
  const [searchText, setsSearchText] = useState("");
  const [userId, setUserId] = useState([]);
  const [error, setError] = useState("");
  const [isCheckAll, setIsCheckAll] = useState(false);
  const dispatch = useDispatch();
  const [lang] = useTranslation("language");
  const { groupsConnectionList, groupDetails } = useSelector(
    ({ groups }) => groups
  );
  const userInfo = useSelector(selectUserInfo);
  useEffect(() => {
    let body = {
      searchText,
      groupId: groupDetails.id,
    };
    dispatch(getGroupsConnectionList(body));
  }, [searchText]);

  useEffect(() => {
    return () => {
      dispatch(clearGroupsConnectionList());
    };
  }, []);

  const debounce = (func) => {
    let timer;
    return function (...args) {
      const context = this;
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        timer = null;
        func.apply(context, args);
      }, 500);
    };
  };

  const searchHandler = useCallback(
    debounce((e) => {
      setsSearchText(e.target.value);
    })
  );

  /******************** 
@purpose : Used for select all check box
@Parameter : {event}
@Author : INIC
******************/
  const handleSelectAll = (e) => {
    setIsCheckAll(!isCheckAll);
    setUserId(groupsConnectionList?.map((li) => li.connectionUserId));
    if (isCheckAll) {
      setUserId([]);
    }
  };

  /******************** 
@purpose : Used for check box handler
@Parameter : {event}
@Author : INIC
******************/
  const checkBoxHandler = (e) => {
    const { id, checked } = e.target;
    setUserId([...userId, id]);
    if (!checked) {
      setUserId(userId.filter((item) => item !== id));
    }
  };

  /******************** 
@purpose : Used for group invite send to user
@Parameter : {}
@Author : INIC
******************/
  const sendHandler = async () => {
    let body = {
      userIds: userId,
      groupId: groupDetails.id,
    };
    if (body?.userIds?.length === 0) {
      setError("Please select user");
    } else {
      await dispatch(groupsInviteSend(body));
      backHandler();
    }
  };
  /******************** 
  @purpose : Used for withdraw request
  @Parameter : { id }
  @Author : INIC
  ******************/
  const actionHandler = (id, action) => {
    let body = {
      id,
      action,
      groupId: groupDetails.id,
    };
    dispatch(groupsInviteAction(body)).then((res) => {
      if (res) {
        let data = {
          searchText,
          groupId: groupDetails.id,
        };
        dispatch(getGroupsConnectionList(data));
      }
    });
  };
  /******************** 
@purpose : Used for modal close
@Parameter : {}
@Author : INIC
******************/
  const backHandler = () => {
    dispatch(toggleModals({ creategroups: false }));
  };

  /******************** 
@purpose : last name handler
@Parameter : {}
@Author : INIC
******************/
  const lastNameHandler = (userData, lastName) => {
    if (
      lastName === null ||
      lastName.settings.all ||
      (userData?.connectionData &&
        userData?.connectionData[0]?.isConnection &&
        lastName.settings.myConnection) ||
      (userData?.followData &&
        userData?.followData[0]?.isFollow &&
        lastName.settings.followers) ||
      (userData?.growthConnectionData &&
        userData?.growthConnectionData?.isGrowthConnection &&
        lastName.settings.myGrowthConnection)
    ) {
      return true;
    }
  };

  return (
    <>
      <Modal.Body className="p-4">
        <div className="mb-3">
          <div className="common-searchbar mb-3">
            <Form.Group
              controlId="formSearch"
              className="position-relative mb-0"
            >
              <Form.Control
                type="text"
                placeholder="Search"
                onChange={searchHandler}
              />
              <div className="search-inner-icon">
                <em className="bx bx-search"></em>
              </div>
            </Form.Group>
          </div>
        </div>
        {Array.isArray(groupsConnectionList) &&
          groupsConnectionList.length > 0 && (
            <div className="custom-checkbox checkbox-blue d-flex justify-content-between pb-3">
              <div className="ml-2">
                <h5 className="card-title pt-2 font-14 text-secondary font-medium mb-0">
                  {lang("GROUP.COMMON.SEND_ALL_MEMBER_INVITE")}
                </h5>
              </div>
              <div className="custom-checkbox ml-auto checkbox-blue d-flex align-items-center pr-3 mb-2">
                <label className="mr-8 mb-2">
                  <input
                    type="checkbox"
                    name="allSelect"
                    autoComplete="off"
                    checked={userId?.length === groupsConnectionList?.length}
                    onChange={handleSelectAll}
                  />
                  <span></span>
                </label>
              </div>
            </div>
          )}

        {groupsConnectionList === undefined ||
        (Array.isArray(groupsConnectionList) &&
          groupsConnectionList.length === 0) ? (
          <p style={{ color: "red" }}>No connection found</p>
        ) : (
          <ul className="list-unstyled model-listing-box">
            {Array.isArray(groupsConnectionList) &&
              groupsConnectionList.map((group, i) => {
                const imagePreference =
                  group?.users &&
                  (group?.users?.profilePicShowData === null ||
                    (group?.users?.connectionData &&
                      group?.users?.connectionData[0]?.isConnection &&
                      group?.users?.profilePicShowData?.myConnections) ||
                    (group?.users?.followData &&
                      group?.users?.followData[0]?.isFollow &&
                      group?.users?.profilePicShowData?.followers) ||
                    (group?.users?.growthConnectionData &&
                      group?.users?.growthConnectionData?.isGrowthConnection &&
                      group?.users?.profilePicShowData?.myGrowthConnections) ||
                    group?.users?.profilePicShowData?.all ||
                    (userInfo.role &&
                      ((userInfo.role.includes("Teacher") &&
                        group?.users?.profilePicShowData?.teachers) ||
                        (userInfo.role.includes("Trainer") &&
                          group?.users?.profilePicShowData?.trainer) ||
                        (userInfo.role.includes("Coach") &&
                          group?.users?.profilePicShowData?.coach) ||
                        (userInfo.role.includes("Host") &&
                          group?.users?.profilePicShowData?.hosts))));

                return (
                  <li className="model-common-listing" key={i}>
                    <div className="custom-checkbox checkbox-blue d-flex justify-content-between">
                      <picture className="user-profile-pic rounded-pill">
                        <source
                          srcSet={imagePreference && group.users.profilePicURL}
                          type="image/jpg"
                        />
                        <img
                          src={
                            imagePreference
                              ? group.users.profilePicURL || ""
                              : ""
                          }
                          alt={`${group.users.firstName} ${group.users.lastName}`}
                          width="40"
                          height="40"
                          onError={(e) => {
                            onImageError(
                              e,
                              "profile",
                              `${group.users.firstName} ${
                                lastNameHandler(
                                  group.users,
                                  group.users.lastNameVisibility
                                )
                                  ? group.users.lastName
                                  : ""
                              }`
                            );
                          }}
                        />
                      </picture>
                      <div className="ml-2">
                        <h5 className="card-title pt-2 font-14 text-secondary font-medium mb-0">
                          {`${
                            group.users.firstName?.charAt(0).toUpperCase() +
                            group.users.firstName?.slice(1)
                          } ${
                            lastNameHandler(
                              group.users,
                              group.users.lastNameVisibility
                            )
                              ? group.users.lastName?.charAt(0).toUpperCase() +
                                group.users.lastName?.slice(1)
                              : ""
                          }`}
                        </h5>
                      </div>
                      <div className="custom-checkbox ml-auto checkbox-blue d-flex align-items-center">
                        {group.isAlreadyGroupMember ? (
                          <label className="text-body-14 mb-0 text-primary card-title h5">
                            {lang("GROUP.COMMON.MEMBER")}
                          </label>
                        ) : group.isUserInvited ? (
                          <label
                            className="text-body-14 mb-0 text-primary card-title h5 pointer"
                            onClick={() => {
                              actionHandler(group.connectionUserId, "withdraw");
                            }}
                          >
                            {lang("GROUP.COMMON.WITHDRAW")}
                          </label>
                        ) : (
                          <label className="mb-0">
                            <input
                              type="checkbox"
                              name="csscheckbox"
                              autoComplete="off"
                              id={group.connectionUserId}
                              checked={userId.includes(group.connectionUserId)}
                              onChange={checkBoxHandler}
                            />

                            <span></span>
                          </label>
                        )}
                      </div>
                    </div>
                  </li>
                );
              })}
          </ul>
        )}
        <span style={{ color: "red", fontSize: "14px" }}>{error}</span>
      </Modal.Body>
      <Modal.Footer className="custom-footer text-center d-flex border-top border-geyser justify-content-between">
        <Button variant="btn btn-outline-info mr-3" onClick={backHandler}>
          Back
        </Button>
        <Button variant="btn btn-info px-5" onClick={sendHandler}>
          Send
        </Button>
      </Modal.Footer>
    </>
  );
};
