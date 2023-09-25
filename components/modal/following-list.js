import React, { useEffect } from "react";
import { Button, Card, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import {
  getFollowingList,
  unfollowUser,
  removeUserFromFollowingList,
} from "store/actions/connections";
import { onImageError } from "utils";
import { selectUserInfo } from "store/selectors/user";

/*******************   
@purpose : User Set Thankyou
@Author : INIC
******************/
export const FollowingList = ({ isSelfProfile, otherUserData, userData }) => {
  const list = useSelector((state) => state.connections.followingList);
  const selfUserInfo = useSelector(selectUserInfo);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      getFollowingList({
        userId: !isSelfProfile && otherUserData?.id,
        page: 1,
        pagesize: 100,
      })
    );
  }, []);

  const imagePreferenceHandler = (userDetails, profilePicShowData) => {
    if (
      profilePicShowData === null ||
      profilePicShowData?.all ||
      profilePicShowData?.followers ||
      (userDetails?.connectionData &&
        userDetails?.connectionData[0]?.isConnection &&
        profilePicShowData.myConnections) ||
      (userDetails?.growthConnectionData &&
        userDetails?.growthConnectionData?.isGrowthConnection &&
        profilePicShowData.myGrowthConnections) ||
      (selfUserInfo.role &&
        ((selfUserInfo.role.includes("Teacher") &&
          profilePicShowData.teachers) ||
          (selfUserInfo.role.includes("Trainer") &&
            profilePicShowData.trainer) ||
          (selfUserInfo.role.includes("Coach") && profilePicShowData.coach) ||
          (selfUserInfo.role.includes("Host") && profilePicShowData.hosts)))
    ) {
      return true;
    }
  };

  const lastNameHandler = (userDetails, lastNameVisibility) => {
    if (
      lastNameVisibility === null ||
      lastNameVisibility?.settings?.all ||
      lastNameVisibility?.settings?.followers ||
      (userDetails?.connectionData &&
        userDetails?.connectionData &&
        userDetails?.connectionData[0]?.isConnection &&
        lastNameVisibility.settings.myConnection) ||
      (userDetails?.growthConnectionData &&
        userDetails?.growthConnectionData?.isGrowthConnection &&
        lastNameVisibility.settings.myGrowthConnection)
    ) {
      return true;
    }
  };

  return (
    <>
      <Modal.Body>
        <Card className="mb-2">
          <Card.Body>
            {list.length > 0 ? (
              list.map((v, i) => {
                return (
                  <div className="d-flex align-items-center mb-2" key={i}>
                    <div className="mr-2 rounded-pill overflow-hidden flex-shrink-0 border border-geyser w-h-50">
                      <s href={`/profile/${v.profileId}`}>
                        <picture
                          className="user-profile-pic d-inline-block rounded-pill mb-3 pointer"
                          onContextMenu={(e) => e.preventDefault()}
                        >
                          <source
                            srcSet={
                              imagePreferenceHandler(
                                v.userDetails && v.userDetails[0],
                                v.userDetails &&
                                  v.userDetails[0].profilePicShowData
                              )
                                ? v.profilePicURL
                                : ""
                            }
                            type="image/jpg"
                          />
                          <img
                            src={
                              imagePreferenceHandler(
                                v.userDetails && v.userDetails[0],
                                v.userDetails &&
                                  v.userDetails[0].profilePicShowData
                              )
                                ? v.profilePicURL || ""
                                : ""
                            }
                            alt={v.firstName + " " + v.lastName}
                            width="54"
                            height="54"
                            onError={(e) => {
                              onImageError(
                                e,
                                "profile",
                                `${v.firstName} ${
                                  lastNameHandler(
                                    v.userDetails && v.userDetails[0],
                                    v.userDetails &&
                                      v.userDetails[0].lastNameVisibility
                                  )
                                    ? v.lastName
                                    : ""
                                }`
                              );
                            }}
                          />
                        </picture>
                      </s>
                    </div>
                    <div className="w-100 mr-3">
                      <div className="font-16 font-600 text-secondary mb-1 card-title h5">
                        <a href={`/profile/${v.profileId}`}>
                          <h5 className="card-title font-16 text-secondary font-medium mb-1 text-ellipsis pointer">
                            {v.firstName}{" "}
                            {lastNameHandler(
                              v.userDetails && v.userDetails[0],
                              v.userDetails &&
                                v.userDetails[0].lastNameVisibility
                            )
                              ? v.lastName
                              : ""}
                          </h5>
                        </a>
                      </div>
                    </div>
                    <div className="text-center d-flex">
                      {isSelfProfile && (
                        <Button
                          variant="btn btn-info btn-sm font-12 text-uppercase font-weight-semibold py-12 ml-3 w-100"
                          type="button"
                          onClick={async () => {
                            await dispatch(unfollowUser(v.userId));
                            await dispatch(
                              removeUserFromFollowingList(v.userId)
                            );
                          }}
                        >
                          Unfollow
                        </Button>
                      )}
                    </div>
                  </div>
                );
              })
            ) : (
              <em>No records found.</em>
            )}
          </Card.Body>
        </Card>
      </Modal.Body>
    </>
  );
};
