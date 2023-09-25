import React from "react";
import { Card, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import ActivityDetail from "./activity-detail";
import { selectUserInfo, selectUserCountData } from "store/selectors/user";
import { toggleModals } from "store/actions";
import { ACCOUNTS } from "routes/urls";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
const MainModal = dynamic(() =>
  import("@components/modal").then((mod) => mod.MainModal)
);
const FollowerList = dynamic(() =>
  import("@components/modal").then((mod) => mod.FollowerList)
);
const FollowingList = dynamic(() =>
  import("@components/modal").then((mod) => mod.FollowingList)
);
/******************** 
  @purpose :Activity List
  @Parameter : {isSelfProfile, userDetails}
  @Author : INIC
  ******************/
const Activity = ({
  isSelfProfile,
  userDetails,
  otherUserData,
  viewmode,
  userCountInfo,
  userData,
}) => {
  const router = useRouter();
  const { followerList, followingList } = useSelector(
    ({ ui }) => ui.modals,
    shallowEqual
  );
  const dispatch = useDispatch();

  const [lang] = useTranslation("language");

  const userInfo = isSelfProfile ? useSelector(selectUserInfo) : userDetails;
  const { manageActivity } = useSelector((state) => state.manageActivity);
  const countData = isSelfProfile
    ? useSelector(selectUserCountData)
    : userCountInfo;

  // for self profile, recent activities list
  let data = manageActivity;

  let { profilePicURL } = userInfo || {};
  profilePicURL = isSelfProfile
    ? profilePicURL
    : otherUserData?.profilePicURL || "";
  return (
    <>
      <Card className="mb-3">
        <Card.Body className="p-3">
          <div className="d-flex justify-content-between pb-3">
            <h6 className="m-0">
              {lang("ACTIVITY.TEXT.ACTIVITY")}
              <span className="text-primary d-block text-body-14 mt-2 mb-2">
                <span
                  className="pointer"
                  onClick={() => {
                    dispatch(toggleModals({ followerList: true }));
                  }}
                >
                  {countData?.totalFollowers ? countData?.totalFollowers : 0}{" "}
                  {lang("ACTIVITY.TEXT.FOLLOWERS")}
                </span>{" "}
                |{" "}
                <span
                  className="pointer"
                  onClick={() => {
                    dispatch(toggleModals({ followingList: true }));
                  }}
                >
                  {countData?.totalFollowing ? countData.totalFollowing : 0}{" "}
                  {lang("ACTIVITY.TEXT.FOLLOWINGS")}
                </span>
              </span>
            </h6>
          </div>
          {data && data.length > 0 ? (
            <div>
              {data.map((item, index) => (
                <ActivityDetail
                  profilePicURL={profilePicURL}
                  key={item.id}
                  isSelfProfile={isSelfProfile}
                  index={index}
                  data={data}
                  // {...item}
                  item={item}
                  otherUserData={otherUserData}
                  viewmode={viewmode}
                  userData={userData}
                />
              ))}
            </div>
          ) : (
            <div className="desc pr-xl-5 mr-xl-2">
              <p className="text-body-14 font-weight-normal m-0">
                {lang("ACTIVITY.TEXT.NO_ACTIVITY")}
              </p>
            </div>
          )}
        </Card.Body>
        {isSelfProfile && data && data.length > 0 && (
          <>
            <div className="people-tab-view-all-button border-geyser border-top py-2">
              <span
                className="people-tab-view-all-button-text load-more-color"
                onClick={() =>
                  router.push({
                    pathname: ACCOUNTS,
                    query: { activity: "manage-activies" },
                  })
                }
              >
                {lang("COMMON.VIEW_ALL")}
              </span>
            </div>

            {/* <a
              onClick={() =>
                router.push({
                  pathname: ACCOUNTS,
                  query: { activity: "manage-activies" },
                })
              }
              className="text-body-14 rounded-b-8 bg-blueberry-whip py-12 text-center"
            >
              {lang("ACTIVITY.TEXT.SEE_ALL_ACTIVITY")}
            </a> */}
          </>
        )}
      </Card>
      <MainModal
        className="follower-list modal"
        show={followerList}
        keyModal="followerList"
        body={
          <FollowerList
            isSelfProfile={isSelfProfile}
            otherUserData={otherUserData}
          />
        }
        header={<h2 className="h6 m-0">{lang("ACTIVITY.TEXT.FOLLOWERS")}</h2>}
        headerClassName="mb-50 block md-mb-30"
      />
      <MainModal
        className="follower-list modal"
        show={followingList}
        keyModal="followingList"
        body={
          <FollowingList
            isSelfProfile={isSelfProfile}
            otherUserData={otherUserData}
          />
        }
        header={<h2 className="h6 m-0">{lang("ACTIVITY.TEXT.FOLLOWINGS")}</h2>}
        headerClassName="mb-50 block md-mb-30"
      />
    </>
  );
};
export default Activity;
