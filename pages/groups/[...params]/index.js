import React, { useEffect, useState } from "react";
import { Layout } from "@components/layout";
import { Container, Card, Button } from "react-bootstrap";
import { Loader } from "components/ui";

import {
  RecentAddedGM,
  MyProfile,
  GrowthModal,
  MostFollowedContents,
  Add,
  UpgradeYourProfile,
  GrowthPartners,
  FollowedGroup,
} from "components/sidebar";
import { MyDashboard } from "components/dashboard";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import {
  getGroupDetails,
  getGroupsJoinedList,
  groupJoinRequest,
  groupRequestReceived,
  groupsInviteAction,
  toggleModals,
  groupLeave,
} from "store/actions";
import moment from "moment-timezone";
import WithAuth from "components/with-auth/with-auth";
import { selectUserInfo } from "store/selectors/user";
import { Link } from "../../../routes";
import { onImageError, createdByFunction, showToast } from "utils";
import { useTranslation } from "react-i18next";

const GroupsPost = () => {
  const router = useRouter();
  const { params } = router.query;
  const [lang] = useTranslation("language");
  const dispatch = useDispatch();
  const { groupDetails } = useSelector(({ groups }) => groups);
  const { requestReceivedGroup } = useSelector(({ groups }) => groups);
  const [isLoading, setIsLoading] = useState(true);

  const userData = useSelector(selectUserInfo);

  useEffect(async () => {
    await dispatch(getGroupDetails(params[1]));
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (
      userData.id == groupDetails.userId &&
      groupDetails.groupType === "private"
    ) {
      let data = {
        groupId: groupDetails.id,
      };
      dispatch(groupRequestReceived(data));
    }
  }, [groupDetails]);

  /******************** 
@purpose : Used for join Public Group
@Parameter : { }
@Author : INIC
******************/
  const joinRequest = async () => {
    let data = {
      groupId: groupDetails.id,
    };
    dispatch(groupJoinRequest(data)).then(() => {
      dispatch(getGroupDetails(params[1]));
      dispatch(getGroupsJoinedList({ page: 1, pagesize: 10 }, "group"));
    });
  };

  /******************** 
@purpose : Used for group unfollow
@Parameter : { groupId }
@Author : YLIWAY
******************/
  const leaveRequest = () => {
    if (userData.id === groupDetails.userId) {
      return showToast({
        message: lang("GROUP.COMMON.GROUP_OWNER_LEAVE_ERROR"),
        type: "error",
      });
    }
    const body = {
      groupId: groupDetails.id,
      userId: userData.id,
      removedBy: "self",
    };

    dispatch(groupLeave(body)).then(() => {
      dispatch(getGroupDetails(params[1]));
      dispatch(getGroupsJoinedList({ page: 1, pagesize: 10 }, "group"));
    });
  };

  /******************** 
@purpose : Used for accepted & rejected group
@Parameter : { id }
@Author : INIC
******************/
  const actionHandler = (id, action) => {
    let body = {
      id: id,
      action,
    };
    dispatch(groupsInviteAction(body)).then(() => {
      dispatch(getGroupDetails(params[1]));
    });
  };

  /******************* 
  @purpose : Rander HTML/ React Components
  @Author : INIC
  ******************/

  return (
    <Layout>
      {/* <CreateGroups /> */}
      <div className="inner-wrapper">
        <Container>
          <div className="d-flex flex-xl-nowrap flex-wrap">
            {/* left profile section */}
            <div className="left-profile-section">
              <MyProfile />
              <GrowthModal />
              <Add />
            </div>

            {/* post view */}

            {isLoading ? (
              <div className="post-section mt-3 mt-md-0">
                <Loader />
              </div>
            ) : (
              <div className="post-section mt-3 mt-md-0">
                {/* Profile Summary : START */}
                <Card className="mb-3">
                  <Card.Body className="p-0 overflow-hidden">
                    <div className="group-bg-img-div">
                      <div className="defualt-image">
                        <picture
                          className=""
                          onContextMenu={(e) => e.preventDefault()}
                        >
                          <source
                            srcSet={groupDetails.imageURL ?? ""}
                            type="image/jpg"
                          />

                          <img
                            src={groupDetails.imageURL ?? ""}
                            alt={groupDetails.name}
                            className="w-100 "
                            // width="745"
                            // style={{ objectFit: "cover" }}

                            onError={(e) => {
                              onImageError(e);
                            }}
                          />
                        </picture>
                      </div>
                      {/* <div className="defualt-image group-small-img-div mx-3">
                      <picture
                        className="mt-2"
                        onContextMenu={(e) => e.preventDefault()}
                      >
                        <source
                          srcSet={groupDetails.logo ?? ""}
                          type="image/jpg"
                        />

                        <img
                          src={groupDetails.logo ?? ""}
                          alt={groupDetails.name}
                          className="group-small-img"
                          // width="745"
                          // style={{ objectFit: "cover" }}
                          onError={(e) => {
                            onImageError(e);
                          }}
                        />
                      </picture>
                    </div> */}
                    </div>

                    <div className="mb-2 mt-2 px-3 py-2">
                      <div className="d-sm-flex align-items-center justify-content-start invite-connections">
                        <div>
                          <h6 className="">{groupDetails.name}</h6>
                          <p className="text-small mb-0">
                            {groupDetails?.hashTags?.map((tag) => `#${tag} `)}
                          </p>
                        </div>
                        {groupDetails.isUserInvited ? (
                          <div className="ml-auto d-flex align-items-center mt-sm-0 mt-2">
                            <Button
                              variant="btn btn-sm btn-outline-gray font-14 mr-sm-4 mr-2 d-flex align-items-center"
                              onClick={() =>
                                actionHandler(
                                  groupDetails.isInvitedData.id,
                                  "rejected"
                                )
                              }
                            >
                              <em className="icon icon-deny font-16 pr-2"></em>
                              {lang("CONNECTIONS.REJECT")}
                            </Button>
                            <Button
                              variant="btn btn-sm btn-outline-info font-14 d-flex align-items-center"
                              onClick={() =>
                                actionHandler(
                                  groupDetails.isInvitedData.id,
                                  "accepted"
                                )
                              }
                            >
                              <em className="icon icon-approve font-16 pr-2"></em>
                              {lang("GROUP.COMMON.GROUP_ACCEPT")}
                            </Button>
                          </div>
                        ) : userData.id != groupDetails.userId &&
                          groupDetails.isAlreadyGroupMember === false ? (
                          <div className="text-gary font-medium ml-auto">
                            <Button
                              variant="btn btn-info btn-sm px-5 font-14"
                              onClick={() => joinRequest()}
                            >
                              {`${
                                groupDetails.groupType === "public"
                                  ? lang("GROUP.COMMON.JOIN")
                                  : groupDetails?.requestSent === 1
                                  ? lang("GROUP.COMMON.GROUP_REQUESTED")
                                  : lang("GROUP.COMMON.REQUEST_TO_JOIN")
                              }`}
                            </Button>
                          </div>
                        ) : (
                          <div className="text-gary font-medium ml-auto">
                            <Button
                              variant="btn btn-dark btn-sm px-5 font-14"
                              onClick={leaveRequest}
                            >
                              {lang("GROUP.COMMON.LEAVE")}
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="px-3 pb-3 pt-0 d-sm-flex jusity-content-bewteen align-items-end">
                      <div className="invite-responsive-box">
                        <div className="pt-md-2">
                          <div className="d-flex align-items-center mb-1">
                            <div className="d-flex align-items-center justify-content-center">
                              <span className="icon-web mr-1 mr-sm-2"></span>
                              <div>
                                <small className="text-body-14 font-weight-normal">
                                  {groupDetails.groupType
                                    ?.charAt(0)
                                    .toUpperCase() +
                                    groupDetails.groupType?.slice(1)}{" "}
                                  Group
                                </small>
                              </div>
                            </div>

                            {/*  */}
                            <div className="d-flex align-items-center justify-content-center justify-content-lg-start invite-participants w-auto">
                              <div className="px-2 text-gray">•</div>
                              <Link
                                route={
                                  groupDetails?.isAlreadyGroupMember
                                    ? `/groups/group-members/${groupDetails?.id}`
                                    : "javascript:void(0)"
                                }
                              >
                                <div
                                  className={`flex-shrink-0  ${
                                    groupDetails?.isAlreadyGroupMember &&
                                    "cursor-pointer"
                                  }`}
                                >
                                  <span
                                    className={`text-body-14 ${
                                      groupDetails?.isAlreadyGroupMember
                                        ? " text-primary"
                                        : "text-gray"
                                    }`}
                                  >
                                    {groupDetails.members}
                                  </span>
                                  <span
                                    className={`text-body-14 ml-2 ${
                                      groupDetails?.isAlreadyGroupMember
                                        ? " text-primary"
                                        : "text-gray"
                                    }`}
                                  >
                                    {groupDetails.members > 1
                                      ? lang("GROUP.COMMON.PARTICIPANDTS")
                                      : lang("GROUP.COMMON.PARTICIPANT")}
                                  </span>
                                </div>
                              </Link>
                              <div>
                                {/* {userData.id == groupDetails.userId &&
                            groupDetails.groupType === "private" && (
                              <p
                                className="m-0 text-info font-medium pointer"
                                onClick={() =>
                                  dispatch(
                                    toggleModals({ joinrequestgroup: true })
                                  )
                                }
                              >
                                Request Details
                              </p>
                            )} */}
                              </div>

                              {userData.id == groupDetails.userId &&
                              groupDetails.groupType === "private" &&
                              requestReceivedGroup !== undefined ? (
                                <div
                                  className="dsf d-flex justify-content-center align-items-center w-h-25  text-white ml-1 rounded-pill text-body-12 bg-primary flex-shrink-0"
                                  title="Notification"
                                  onClick={() =>
                                    dispatch(
                                      toggleModals({ joinrequestgroup: true })
                                    )
                                  }
                                >
                                  {requestReceivedGroup.length}
                                </div>
                              ) : (
                                ""
                              )}
                            </div>

                            {/*  */}
                          </div>
                          <div className="d-lg-flex align-items-center">
                            <div className="mb-2 mb-sm-0">
                              <span className="text-body-12">
                                {lang("GROUP.COMMON.CREATION_DATE")}
                              </span>
                              <small className="text-body-12 text-secondary pl-1">
                                {moment(groupDetails.createdAt).format(
                                  "DD MMM YYYY"
                                )}
                              </small>
                            </div>
                            <div className="d-align-items-center d-flex">
                              <div className="px-2 text-gray text-body-12 d-none d-lg-block">
                                •
                              </div>
                              <span className="text-body-12">
                                {lang("GROUP.COMMON.CREATED_BY")}
                              </span>
                              {/* {groupDetails?.users?.firstName === null &&
                            groupDetails?.users?.lastName === null ? (
                              ""
                            ) : ( */}
                              <small className="text-body-12 cursor-pointer pl-1 text-primary">
                                {/* {`${
                                  groupDetails?.users?.firstName
                                    ?.charAt(0)
                                    .toUpperCase() +
                                  groupDetails?.users?.firstName?.slice(1)
                                } ${
                                  groupDetails?.users?.lastName
                                    ?.charAt(0)
                                    .toUpperCase() +
                                  groupDetails?.users?.lastName?.slice(1)
                                }`} */}

                                <Link
                                  href={createdByFunction(
                                    groupDetails?.createdBy
                                  )}
                                >
                                  <a className="text-primary">
                                    {groupDetails?.createdBy?.name
                                      ?.charAt(0)
                                      .toUpperCase() +
                                      groupDetails?.createdBy?.name?.slice(1)}
                                  </a>
                                </Link>
                              </small>
                              {/* )} */}
                            </div>
                          </div>
                        </div>
                      </div>
                      {userData.id == groupDetails.userId ? (
                        <div className="d-sm-flex align-items-center ml-auto justify-content-end invite-connections pt-3 pt-lg-0">
                          <div className="text-gary font-medium">
                            <Button
                              variant="btn btn-info btn-sm "
                              onClick={() => {
                                dispatch(toggleModals({ creategroups: true }));
                              }}
                            >
                              {lang("GROUP.COMMON.INVITE_CONNECTIONS")}
                            </Button>
                          </div>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </Card.Body>
                </Card>

                {/* Description : START */}
                {groupDetails.description && (
                  <>
                    <Card className="mb-3">
                      <Card.Body>
                        <h6 className="font-16">
                          {lang("GROUP.CREATE_GROUP.GROUP_DESC")}
                        </h6>
                        <div className="desc pr-xl-5 mr-xl-2">
                          <p className="text-body-14 font-weight-normal m-0">
                            {groupDetails.description}
                          </p>
                        </div>
                      </Card.Body>
                    </Card>
                  </>
                )}

                {/* Rules of conduct : START */}
                {groupDetails.remarks && (
                  <>
                    <Card className="mb-3">
                      <Card.Body>
                        <h6 className="font-16">
                          {lang("GROUP.CREATE_GROUP.RULE_OF_CONDUCT")}
                        </h6>
                        <div className="desc pr-xl-5 mr-xl-2">
                          <p className="text-body-14 font-weight-normal m-0">
                            {groupDetails.remarks}
                          </p>
                        </div>
                      </Card.Body>
                    </Card>
                  </>
                )}

                {/* Invite Connections : START */}
                {/* <Card className="mb-3">
                <Card.Body></Card.Body>
              </Card> */}

                {groupDetails?.isAlreadyGroupMember === true && (
                  <MyDashboard page="groups" groupId={params[1]} />
                )}
              </div>
            )}

            {/* right blog section */}
            <div className="right-blog-section w-lg-100 p-md-0">
              {/* GrowthPartners */}
              <GrowthPartners />

              {/* Recently Added to gm */}
              <RecentAddedGM />

              <FollowedGroup />
              <MostFollowedContents />
            </div>
          </div>
        </Container>
      </div>
    </Layout>
  );
};
export default WithAuth(GroupsPost);
