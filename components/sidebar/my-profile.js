import React, { Fragment, useEffect } from "react";
import { Badge } from "react-bootstrap";
import { Link } from "@routes";
import { useSelector } from "react-redux";
import {
  selectUserCountData,
  selectUserInfo,
} from "../../store/selectors/user";
import { compactNumber, onImageError, getFullName } from "../../utils";
import { ACCOUNTS } from "routes/urls";
import { useRouter } from "next/router";
import {
  getLastPurchasePlanDetails,
  getProfileCountData,
  toggleModals,
} from "store/actions";
import { useDispatch } from "react-redux";
import { getMyConnectionsList } from "store/actions/connections";
import { useTranslation } from "react-i18next";
import dynamic from "next/dynamic";
import { Card, CardMedia } from "@mui/material";
import Typography from "@mui/material/Typography";
const ProfileImage = dynamic(() =>
  import("../profile-image").then((mod) => mod.ProfileImage)
);

import { Icon } from "components/icons";
import { YliwayButton } from "components/button";

const MyProfile = () => {
  const router = useRouter();

  const [lang] = useTranslation("language");
  const dispatch = useDispatch();
  const countData = useSelector(selectUserCountData);
  const userInfo = useSelector(selectUserInfo);
  const lastPurchasedPlanDetails = useSelector(
    (state) => state.user.lastPurchasedPlanDetails
  );
  const {
    accountType,
    firstName,
    lastName,
    currentPosition,
    profilePicURL,
    profileId,
    profileBgURL,
  } = userInfo;

  /**
   * Get count
   */
  useEffect(() => {
    if (userInfo) {
      dispatch(getProfileCountData(userInfo.id));
      dispatch(getLastPurchasePlanDetails());
    }
    dispatch(
      getMyConnectionsList({
        page: 1,
        pagesize: 20,
      })
    );
  }, []);

  /**
   * Show upgrade buttons based on account type
   * @param {String} type
   * @returns {Component}
   */
  const upgradeUser = (type) => {
    return (
      <div
        className="mb-4 align-items-center d-flex"
        style={{
          paddingLeft: "19px",
          paddingRight: "19px",
          marginTop: "18px",
        }}>
        <div className="">
          <a
            className="text-center font-14 font-weight-bold text-secondary-purple yliway-btn-custom-space"
            onClick={() =>
              router.replace({
                pathname: ACCOUNTS,
                query: { upgrade: true },
              })
            }>
            <YliwayButton
              primary="true"
              backgroundColor="#6750A4"
              size="small"
              label={lang("COMMON.UPGRADE_YOUR_PROFILE")}
            />
          </a>
        </div>
        <div
          style={{ cursor: "pointer" }}
          onClick={() => dispatch(toggleModals({ addcredit: true }))}>
          <span className="add-credit-btn">
            {lang("RIGHT_SIDEBAR.OTHER_VIEWS.ADD_CREDITS")}
          </span>
        </div>
      </div>
    );
  };

  return (
    <Fragment>
      {/* profile section */}
      <Card className="mb-4 my-profile-box rounded-0">
        {/* <Card.Body className="p-0"> */}
        {/* img */}
        <CardMedia
          component="div"
          style={{
            backgroundImage: `url(${
              profileBgURL ||
              "../../assets/images/dashboard/cover-background-2.jpg"
            })`,
          }}
          className="position-relative user-cover-box">
          <div className="user-profile-pic rounded-pill">
            <Link route={`/profile/${profileId}`}>
              <div title={getFullName(userInfo)}>
                <ProfileImage
                  size="96px"
                  imageUrl={profilePicURL}
                  firstName={firstName}
                  lastName={lastName}
                />
                {/*  <picture onContextMenu={(e) => e.preventDefault()}>
                    <source srcSet={profilePicURL || ""} type="image/jpg" />
                    <img
                      src={profilePicURL || ""}
                      onError={(e) => {
                        onImageError(e, "profile", `${firstName} ${lastName}`);
                      }}
                      width="120"
                      height="120"
                      className="img-fluid h-100"
                      alt="user name"
                    />
                  </picture> */}
              </div>
            </Link>
          </div>
        </CardMedia>
        {/* position */}
        <div className="px-4 pt-xl-0 pt-2">
          <div
            className="text-center pointer"
            style={{
              paddingTop: "7px",
            }}>
            <Link route={`/profile/${profileId}`}>
              <Typography
                variant="h6"
                className="profile-name"
                sx={{ marginBottom: "7px", textTransform: "capitalize" }}>
                {getFullName(userInfo)}
              </Typography>
            </Link>
            {/* <p className="current-position">{currentPosition ?? " "}</p> */}
            <Typography
              variant="body1"
              className="current-position"
              sx={{ marginBottom: "16px", textTransform: "capitalize" }}>
              {currentPosition ?? " "}
            </Typography>
          </div>
        </div>
        {/* data */}
        <div>
          <ul className="listing-section listing-content-between border-first-0 py-sm">
            <li
              className="listing-box pl-3 pr-4"
              style={{ paddingTop: "2.5px", paddingBottom: "2.5px" }}>
              <Link route={`/my-connections?tab=my-connection`}>
                <div
                  title={lang("MY_PROFILE.MY_CONNECTIONS")}
                  className="d-flex align-items-center w-100  pointer  list-item">
                  <Icon iconName="addConnectionIcon" />
                  <span className="flex-grow-1 mx-2 d-block">
                    {lang("MY_PROFILE.MY_CONNECTIONS")}
                  </span>
                  <span className="count">
                    {countData?.totalConnections
                      ? compactNumber(countData?.totalConnections, 2) +
                        (countData?.totalConnections > 100 ? "+" : "")
                      : 0}
                  </span>
                </div>
              </Link>
            </li>
            <li
              className="listing-box pl-3 pr-4"
              style={{ paddingTop: "2.5px", paddingBottom: "2.5px" }}>
              <Link to="/people-viewed">
                <div
                  title={lang("MY_PROFILE.PEOPLE_VIEWED")}
                  className="d-flex align-items-center w-100  pointer  list-item">
                  <Icon iconName="viewProfileIcon" />
                  <span className="flex-grow-1 mx-2 d-block">
                    {lang("MY_PROFILE.PEOPLE_VIEWED")}
                  </span>
                  <span className="count">
                    {countData?.totalProfileViewed
                      ? compactNumber(countData?.totalProfileViewed, 2) +
                        (countData?.totalProfileViewed > 100 ? "+" : "")
                      : 0}
                  </span>
                </div>
              </Link>
            </li>
            <li
              className="listing-box pl-3 pr-4"
              style={{ paddingTop: "2.5px", paddingBottom: "2.5px" }}>
              <Link route={`/my-connections?tab=my_growth_connection`}>
                <div
                  title={lang("CONNECTIONS.MY_GROWTH_CONNECTIONS")}
                  className="d-flex align-items-center w-100  pointer  list-item">
                  <Icon iconName="growthConnectionIcon" />
                  <span className="flex-grow-1 mx-2 d-block">
                    {lang("CONNECTIONS.MY_GROWTH_CONNECTIONS")}
                  </span>
                  <span className="count">
                    {countData?.totalGrowthConnections
                      ? compactNumber(countData?.totalGrowthConnections, 2) +
                        (countData?.totalGrowthConnections > 100 ? "+" : "")
                      : 0}{" "}
                  </span>
                </div>
              </Link>
            </li>
          </ul>
        </div>

        {/* <div className="px-3">
            <ul className="listing-section listing-content-between border-first-0">
              <li className="listing-box pt-12 pb-2">
                <Link to={`/profile/${userInfo.profileId}?viewmode=true`}>
                  <a
                    title="my connections"
                    className="d-flex align-items-center w-100 profile-list-box">
                    <div className="font-weight-semibold">
                      {lang(
                        "RIGHT_SIDEBAR.OTHER_VIEWS.HOW_OTHER_VIEW_MY_PROFILE"
                      )}
                    </div>
                    <div className="ml-auto">
                      <span className="text-primary font-14 font-weight-normal h-auto">
                        <em className="icon icon-right-gray-arrow ml-auto"></em>
                     </span>
                    </div>
                  </a>
                </Link>
              </li>
              <li
                className="listing-box border-0 pt-0 pb-12"
                onClick={() => dispatch(toggleModals({ addcredit: true }))}>
                <Link route="/">
                  <a
                    title="people viewed"
                    className="d-flex align-items-center w-100 profile-list-box">
                    <div className="font-weight-semibold">
                      {lang("RIGHT_SIDEBAR.OTHER_VIEWS.ADD_CREDITS")}
                    </div>

                    <div className="ml-auto">
                      <span className="text-primary font-14 font-weight-normal h-auto">
                        <em className="icon icon-right-gray-arrow ml-auto"></em>
                     </span>
                    </div>
                  </a>
                </Link>
              </li>
            </ul>
          </div> */}

        {lastPurchasedPlanDetails?.isUpgradable && upgradeUser(accountType)}
        {/* </Card.Body> */}
      </Card>
    </Fragment>
  );
};
export default MyProfile;
