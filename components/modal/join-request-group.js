import React from "react";
import { Form, Button, Card, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  getGroupDetails,
  groupRequestReceived,
  toggleModals,
} from "store/actions";
import { GROUPS_PRIVATE_ACTION } from "api/routes";
import { post } from "api";
import { USER_API_URL } from "config";
import { onImageError } from "utils";
import { selectUserInfo } from "store/selectors/user";

/******************* 
@purpose : User Set JoinRequestGroup
@Author : INIC
******************/
export const JoinRequestGroup = () => {
  const dispatch = useDispatch();

  const { requestReceivedGroup } = useSelector(({ groups }) => groups);
  const { groupDetails } = useSelector(({ groups }) => groups);
  const userInfo = useSelector(selectUserInfo);
  const requestHandler = async (id, action) => {
    let data = {
      id,
      action,
    };
    try {
      const response = await post(
        { serviceURL: USER_API_URL },
        GROUPS_PRIVATE_ACTION,
        true,
        data,
        true
      );
      if (response.status === 1) {
        let data = {
          groupId: groupDetails.id,
        };
        dispatch(groupRequestReceived(data));
        if (action === "accepted") dispatch(getGroupDetails(groupDetails.id));
      }
    } catch (error) {
      throw error;
    }
  };

  /******************** 
@purpose : Used for modal close
@Parameter : {}
@Author : INIC
******************/
  const backHandler = () => {
    dispatch(toggleModals({ joinrequestgroup: false }));
  };

  const imagePreferenceHandler = (userDetails, profilePicShowData) => {
    if (
      profilePicShowData === null ||
      profilePicShowData?.all ||
      (userDetails?.followData &&
        userDetails?.followData[0]?.isFollow &&
        profilePicShowData?.followers) ||
      (userDetails?.connectionData &&
        userDetails?.connectionData[0]?.isConnection &&
        profilePicShowData?.myConnections) ||
      (userDetails?.growthConnectionData &&
        userDetails?.growthConnectionData?.isGrowthConnection &&
        profilePicShowData?.myGrowthConnections) ||
      (userInfo.role &&
        ((userInfo.role.includes("Teacher") && profilePicShowData.teachers) ||
          (userInfo.role.includes("Trainer") && profilePicShowData.trainer) ||
          (userInfo.role.includes("Coach") && profilePicShowData.coach) ||
          (userInfo.role.includes("Host") && profilePicShowData.hosts)))
    ) {
      return true;
    }
  };
  const lastNameHandler = (userDetails, lastNameVisibility) => {
    if (
      lastNameVisibility === null ||
      lastNameVisibility?.settings?.all ||
      (userDetails?.followData &&
        userDetails?.followData[0]?.isFollow &&
        lastNameVisibility?.settings?.followers) ||
      (userDetails?.connectionData &&
        userDetails?.connectionData[0]?.isConnection &&
        lastNameVisibility?.settings?.myConnection) ||
      (userDetails?.growthConnectionData &&
        userDetails?.growthConnectionData?.isGrowthConnection &&
        lastNameVisibility?.settings?.myGrowthConnection)
    ) {
      return true;
    }
  };
  return (
    <>
      <Modal.Body>
        <Card>
          <Card.Body className="p-0">
            <div className="p-4">
              <h5 className="font-16 font-weight-semibold font-md-14 mb-30">
                New Membership Requests
              </h5>
              <ul className="list-unstyled model-listing-box">
                {(Array.isArray(requestReceivedGroup) &&
                  requestReceivedGroup.length === 0) ||
                requestReceivedGroup === undefined ? (
                  <p style={{ color: "red" }}>No record found</p>
                ) : (
                  Array.isArray(requestReceivedGroup) &&
                  requestReceivedGroup.map((list) => (
                    <li className="model-common-listing" key={list.id}>
                      <div className="custom-checkbox checkbox-blue d-flex align-items-center justify-content-between">
                        <picture
                          className="user-profile-pic rounded-pill"
                          onContextMenu={(e) => e.preventDefault()}
                        >
                          <source
                            srcSet={
                              imagePreferenceHandler(
                                list.userDetails,
                                list.userDetails.profilePicShowData
                              )
                                ? list.userDetails.profilePicURL
                                : ""
                            }
                            type="image/jpg"
                          />
                          <img
                            src={
                              imagePreferenceHandler(
                                list.userDetails,
                                list.userDetails.profilePicShowData
                              )
                                ? list.userDetails.profilePicURL || ""
                                : ""
                            }
                            alt=""
                            width="40"
                            height="40"
                            onError={(e) => {
                              onImageError(
                                e,
                                "profile",
                                `${list?.userDetails?.firstName} ${
                                  lastNameHandler(
                                    list?.userDetails,
                                    list?.userDetails?.lastNameVisibility
                                  )
                                    ? list?.userDetails?.lastName
                                    : ""
                                }`
                              );
                            }}
                          />
                        </picture>
                        <div className="ml-2">
                          <h5 className="card-title font-14 text-secondary font-medium mb-0">
                            {`${
                              list?.userDetails?.firstName
                                ?.charAt(0)
                                .toUpperCase() +
                              list?.userDetails?.firstName?.slice(1)
                            } ${
                              lastNameHandler(
                                list?.userDetails,
                                list?.userDetails?.lastNameVisibility
                              )
                                ? list?.userDetails?.lastName
                                    ?.charAt(0)
                                    .toUpperCase() +
                                  list?.userDetails?.lastName?.slice(1)
                                : ""
                            }`}
                          </h5>
                        </div>
                        <div className="ml-auto d-flex">
                          <div
                            className="w-h-44 bg-danger circle-inner-icons pointer mr-1 btn-hover-icon-white"
                            onClick={() => requestHandler(list.id, "rejected")}
                          >
                            <em className="icon icon-close-white font-14 hover-white"></em>
                          </div>
                          <div
                            className="w-h-44 bg-success circle-inner-icons pointer ml-3 btn-hover-icon-white"
                            onClick={() => requestHandler(list.id, "accepted")}
                          >
                            <em className="icon icon-check-white font-20 hover-white"></em>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))
                )}
              </ul>
            </div>
            <div className="custom-footer text-center d-flex border-top border-geyser justify-content-between">
              <Button
                variant="btn btn-outline-info btn-sm px-4 mr-3"
                onClick={backHandler}
              >
                Back
              </Button>
            </div>
          </Card.Body>
        </Card>
      </Modal.Body>
    </>
  );
};
