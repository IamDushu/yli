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
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          marginBottom: "0.5rem",
          marginRight: "1rem",
        }}>
        <div className="updgrade-profile  px-2">
          <a
            className="text-center font-14 font-weight-bold text-secondary-purple"
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
          style={{ marginTop: "1.5rem",marginLeft: "1rem", cursor: "pointer" }}
          onClick={() => dispatch(toggleModals({ addcredit: true }))}>
          <span className="add-credit-btn">
            {/* style={{
               color: "#6750A4",
               fontSize: "14px",
               fontStyle: "normal",
               fontWeight: 500,
               lineHeight: "20px",
             }} */}
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
                  size="120px"
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
        <div className="px-3 pt-xl-0 pt-3">
          <div className="text-center pt-3 pointer">
            <Link route={`/profile/${profileId}`}>
              {/* <h6 className="customTypography">{getFullName(userInfo)}</h6> */}
              <Typography variant="h6" className="profile-name">
                {getFullName(userInfo)}
              </Typography>
            </Link>
            <p className="current-position">{currentPosition ?? " "}</p>
          </div>
        </div>
        {/* data */}
        <div style={{ padding: "0px 24px 8px 16px" }}>
          <ul className="listing-section listing-content-between border-first-0 py-sm">
            <li className="listing-box pt-12 pb-2">
              <Link route={`/my-connections?tab=my-connection`}>
                <div
                  title={lang("MY_PROFILE.MY_CONNECTIONS")}
                  className="d-flex align-items-center w-100  pointer  list-item">
                  <Icon iconName="addConnectionIcon" />
                  <span style={{ paddingLeft: "6px" }}>
                    {lang("MY_PROFILE.MY_CONNECTIONS")}
                  </span>

                  <div className="ml-auto">
                    <span className="count">
                      {countData?.totalConnections
                        ? compactNumber(countData?.totalConnections, 2) +
                          (countData?.totalConnections > 100 ? "+" : "")
                        : 0}
                    </span>
                  </div>
                </div>
              </Link>
            </li>
            <li className="listing-box pt-0 pb-2">
              <Link to="/people-viewed">
                <div
                  title={lang("MY_PROFILE.PEOPLE_VIEWED")}
                  className="d-flex align-items-center w-100  pointer  list-item">
                  <Icon iconName="viewProfileIcon" />
                  <span style={{ paddingLeft: "6px" }}>
                    {lang("MY_PROFILE.PEOPLE_VIEWED")}
                  </span>
                  <div className="ml-auto">
                    <span className="count">
                      {countData?.totalProfileViewed
                        ? compactNumber(countData?.totalProfileViewed, 2) +
                          (countData?.totalProfileViewed > 100 ? "+" : "")
                        : 0}
                    </span>
                  </div>
                </div>
              </Link>
            </li>
            <li className="listing-box pt-0 pb-12">
              <Link route={`/my-connections?tab=my_growth_connection`}>
                <div
                  title={lang("CONNECTIONS.MY_GROWTH_CONNECTIONS")}
                  className="d-flex align-items-center w-100  pointer  list-item">
                  <Icon iconName="growthConnectionIcon" />
                  <span style={{ paddingLeft: "6px" }}>
                    {lang("CONNECTIONS.MY_GROWTH_CONNECTIONS")}
                  </span>
                  <div className="ml-auto">
                    <span className="count">
                      {countData?.totalGrowthConnections
                        ? compactNumber(countData?.totalGrowthConnections, 2) +
                          (countData?.totalGrowthConnections > 100 ? "+" : "")
                        : 0}{" "}
                    </span>
                  </div>
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
