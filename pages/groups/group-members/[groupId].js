import { Layout } from "components/layout";
import {
  Add,
  FollowedGroup,
  GrowthModal,
  GrowthPartners,
  MostFollowedContents,
  MyProfile,
  OtherViews,
  RecentAddedGM,
} from "components/sidebar";
import React, { useEffect } from "react";
import { Button, Card, Container } from "react-bootstrap";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import {
  followUser,
  getGroupDetails,
  groupMembers,
  sendConnectionRequest,
  setMemberDetails,
  toggleModals,
} from "store/actions";
import WithAuth from "components/with-auth/with-auth";
import { onImageError } from "utils";
import { selectUserInfo } from "store/selectors/user";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { APP_URL } from "config";

function GroupMembers() {
  const router = useRouter();
  const { groupId } = router.query;
  const [lang] = useTranslation("language");
  const dispatch = useDispatch();
  const { groupDetails } = useSelector(({ groups }) => groups);
  const { groupMembersList } = useSelector(({ groups }) => groups);
  const userData = useSelector(selectUserInfo);

  useEffect(() => {
    groupMembersDetails();
    dispatch(getGroupDetails(groupId));
  }, []);

  /******************** 
  @purpose : Used for checking if user is member or not
  @Parameter : { groupDetails }
  @Author : INIC
  ******************/
  useEffect(() => {
    if (!groupDetails?.isAlreadyGroupMember)
      router.back()
  }, [groupDetails])

  /******************** 
@purpose : Used for delete Member
@Parameter : { groupId, userId }
@Author : INIC
******************/
  const groupMembersDetails = () => {
    let data = {
      groupId,
    };
    dispatch(groupMembers(data));
  };
  /******************** 
  @purpose : Used for managing connection request
  @Parameter : { groupId, userId }
  @Author : INIC
  ******************/
  const handleCoonectionRequest = (id) => {
    dispatch(sendConnectionRequest(id)).then(() => {
      groupMembersDetails();
    });
  };
  /******************** 
  @purpose : Used for managing follow 
  @Parameter : { groupId, userId }
  @Author : INIC
  ******************/
  const handleFollowRequest = (id) => {
    dispatch(followUser(id)).then(() => {
      groupMembersDetails();
    });
  };

  /******************** 
@purpose : Last Name handler
@Parameter : { groupId, userId }
@Author : INIC
******************/

  const lastNameHandler = (userInfo, lastName) => {
    if (
      userData.id === userInfo.id ||
      lastName === null ||
      lastName?.settings?.all ||
      (userInfo?.connectionData &&
        userInfo?.connectionData[0]?.isConnection &&
        lastName.settings.myConnection) ||
      (userInfo?.growthConnectionData &&
        userInfo?.growthConnectionData?.isGrowthConnection &&
        lastName.settings.myGrowthConnection) ||
      (userInfo?.followData &&
        userInfo?.followData[0]?.isFollow &&
        lastName.settings.followers)
    ) {
      return true;
    }
  };

  return (
    <Layout>
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
            <div className="post-section">
              <div className="mb-30">
                <div className="d-flex align-items-center justify-content-start invite-connections pt-4 pt-lg-0">
                  <h2 className="font-30 mb-0">{groupDetails.name}</h2>
                  <div className="text-gary font-medium ml-auto">
                    <Button
                      variant="btn btn-info btn-sm px-5 font-14"
                      onClick={() => router.back()}
                    >
                      {lang("COMMON.BACK")}
                    </Button>
                  </div>
                </div>
                <h5 className="font-16 font-weight-semibold font-md-14 mb-30">
                  {lang("GROUP.COMMON.GROUP_MEMBERS")}
                </h5>
              </div>

              <Card className="mb-30">
                <Card.Body>
                  <ul className="listing-section listing-content-between border-first-0">
                    {(Array.isArray(groupMembersList.data) &&
                      groupMembersList.data.length === 0) ||
                      groupMembersList.data === undefined ? (
                      <p style={{ color: "red" }}>No record found</p>
                    ) : (
                      Array.isArray(groupMembersList.data) &&
                      groupMembersList.data.map((list) => {
                        const imagePreference =
                          userData.id === list?.userId ||
                          (list.userDetails &&
                            (list?.userDetails?.profilePicShowData === null ||
                              (list?.userDetails?.connectionData &&
                                list?.userDetails?.connectionData[0]
                                  ?.isConnection &&
                                list?.userDetails?.profilePicShowData
                                  ?.myConnections) ||
                              (list?.userDetails?.growthConnectionData &&
                                list?.userDetails?.growthConnectionData
                                  ?.isGrowthConnection &&
                                list?.userDetails?.profilePicShowData
                                  ?.myGrowthConnections) ||
                              (list?.userDetails?.followData &&
                                list?.userDetails?.followData[0]?.isFollow &&
                                list?.userDetails?.profilePicShowData
                                  ?.followers) ||
                              list?.userDetails?.profilePicShowData?.all ||
                              (userData.role &&
                                ((userData.role.includes("Teacher") &&
                                  list?.userDetails?.profilePicShowData
                                    ?.teachers) ||
                                  (userData.role.includes("Trainer") &&
                                    list?.userDetails?.profilePicShowData
                                      ?.trainer) ||
                                  (userData.role.includes("Coach") &&
                                    list?.userDetails?.profilePicShowData
                                      ?.coach) ||
                                  (userData.role.includes("Host") &&
                                    list?.userDetails?.profilePicShowData
                                      ?.hosts)))));

                        return (
                          <li
                            className="listing-box justify-content-start py-2"
                            key={list.id}
                          >
                            <Link
                              href={(list?.userDetails?.type == "user") ? `${APP_URL}/profile/${list?.userDetails?.profileId}` : (
                                list?.userDetails?.type == "Company" ? (`${APP_URL}/profile/company-profile?companyId=${list?.userDetails?.companyDetail?.id}${list?.userDetails?.companyDetail?.companyName ? (`&name=${list?.userDetails?.companyDetail?.companyName}`) : ``}`) : (`${APP_URL}/profile/institute-profile?instituteId=${list?.userDetails?.instituteDetail?.id}${list?.userDetails?.instituteDetail?.name ? (`&name=${list?.userDetails?.instituteDetail?.name}`) : ``}`)
                              )}
                            >
                              <picture
                                className="user-profile-pic rounded-pill pointer"
                                onContextMenu={(e) => e.preventDefault()}
                              >
                                <source
                                  src={(list?.userDetails?.type == "user") ? list.userDetails.profilePicURL || "" : (
                                    list?.userDetails?.type == "Company" ? (list?.userDetails?.companyDetail?.logo || "") : (list?.userDetails?.instituteDetail?.logo || "")
                                  )}
                                  type="image/jpg"
                                />

                                <img
                                  src={(list?.userDetails?.type == "user") ? list.userDetails.profilePicURL || "" : (
                                    list?.userDetails?.type == "Company" ? (list?.userDetails?.companyDetail?.logo || "") : (list?.userDetails?.instituteDetail?.logo || "")
                                  )}
                                  alt=""
                                  width="40"
                                  height="40"
                                  onError={(e) => {
                                    onImageError(
                                      e,
                                      "profile",
                                      `${list?.userDetails?.firstName} ${lastNameHandler(
                                        list?.userDetails,
                                        list?.userDetails?.lastNameVisibility
                                      )
                                        ? list?.userDetails?.lastName
                                          ?.charAt(0)
                                          .toUpperCase() +
                                        list?.userDetails?.lastName?.slice(
                                          1
                                        )
                                        : ""
                                      }`
                                    );
                                  }}
                                />
                              </picture>
                            </Link>
                            <div className="ml-2">
                              <Link
                                href={(list?.userDetails?.type == "user") ? `${APP_URL}/profile/${list?.userDetails?.profileId}` : (
                                  list?.userDetails?.type == "Company" ? (`${APP_URL}/profile/company-profile?companyId=${list?.userDetails?.companyDetail?.id}${list?.userDetails?.companyDetail?.companyName ? (`&name=${list?.userDetails?.companyDetail?.companyName}`) : ``}`) : (`${APP_URL}/profile/institute-profile?instituteId=${list?.userDetails?.instituteDetail?.id}${list?.userDetails?.instituteDetail?.name ? (`&name=${list?.userDetails?.instituteDetail?.name}`) : ``}`)
                                )}
                              >
                                <h5
                                  className={
                                    list?.blockUser
                                      ? "card-title font-16 text-gray font-medium mb-1 pointer"
                                      : "card-title font-16 text-secondary font-medium mb-1 pointer"
                                  }
                                >
                                  {(list?.userDetails?.type == "user") ? (
                                    `${list?.userDetails?.firstName
                                      ?.charAt(0)
                                      .toUpperCase() +
                                    list?.userDetails?.firstName?.slice(1)
                                    } ${lastNameHandler(
                                      list?.userDetails,
                                      list?.userDetails?.lastNameVisibility
                                    )
                                      ? list?.userDetails?.lastName
                                        ?.charAt(0)
                                        .toUpperCase() +
                                      list?.userDetails?.lastName?.slice(1)
                                      : ""
                                    }${list?.blockUser ? " (Blocked User)" : ""}`
                                  ) : (
                                    list?.userDetails?.type == "Company" ? (list?.userDetails?.companyDetail?.companyName || "") : (list?.userDetails?.instituteDetail?.name || "")
                                  )}
                                </h5>
                              </Link>
                              <p className="text-body-14 font-weight-normal m-0">
                                {list?.userDetails?.currentPosition}
                              </p>
                            </div>

                            {userData?.id !== list?.userId && (
                              <div className="ml-auto d-flex">
                                {!list?.userDetails?.followData?.[0]
                                  ?.isFollow &&
                                  groupMembersList?.adminDetails?.userId !==
                                  list?.userDetails?.id && (
                                    <div
                                      className="w-h-24 bg-primary circle-inner-icons ml-3 pointer"
                                      title="Follow"
                                      onClick={() =>
                                        handleFollowRequest(
                                          list?.userDetails?.id
                                        )
                                      }
                                    >
                                      <em className="bx bx-user-plus text-white m-auto"></em>
                                    </div>
                                  )}
                                {!list?.userDetails?.connectionData?.[0]
                                  ?.isConnection &&
                                  list?.userDetails?.connectionData?.[0]
                                    ?.status !== "pending" &&
                                  groupMembersList?.adminDetails?.userId !==
                                  list?.userDetails?.id && (
                                    <div
                                      className="w-h-24 bg-primary circle-inner-icons ml-3 pointer"
                                      title="Connect"
                                      onClick={() =>
                                        handleCoonectionRequest(
                                          list?.userDetails?.id
                                        )
                                      }
                                    >
                                      <em className="bx bx-user-voice text-white m-auto"></em>
                                    </div>
                                  )}
                                {userData.id ===
                                  groupMembersList?.adminDetails?.userId
                                  ? userData.id !== list?.userId && (
                                    <div
                                      className="w-h-24 bg-cosmos circle-inner-icons ml-3 pointer"
                                      onClick={() => {
                                        dispatch(
                                          toggleModals({
                                            groupmemberdelete: true,
                                          })
                                        );
                                        dispatch(
                                          setMemberDetails({
                                            groupId: list.groupId,
                                            userId: list.userId,
                                          })
                                        );
                                      }}
                                    >
                                      <em className="icon icon-delete font-16"></em>
                                    </div>
                                  )
                                  : ""}
                              </div>
                            )}
                          </li>
                        );
                      })
                    )}
                  </ul>
                </Card.Body>
              </Card>
            </div>

            {/* right blog section */}
            <div className="right-blog-section">
              <OtherViews />
              <GrowthPartners />
              <RecentAddedGM />
              <FollowedGroup />
              <MostFollowedContents />
              <Add />
            </div>
          </div>
        </Container>
      </div>
    </Layout>
  );
}

export default WithAuth(GroupMembers);
