import React, { Fragment, useEffect } from "react";
import { Button, Badge, Card } from "react-bootstrap";
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
      <div className="updgrade-profile bg-secondary-lighter py-12 px-3">
        <a
          className="text-center font-14 font-weight-bold text-secondary-purple"
          onClick={() =>
            router.replace({
              pathname: ACCOUNTS,
              query: { upgrade: true },
            })
          }
        >
          <div className="text-center font-14 font-weight-bold text-secondary-purple">
            {lang("COMMON.UPGRADE_YOUR_PROFILE")}
          </div>
        </a>
      </div>
    );
  };

  return (
    <Fragment>
      {/* profile section */}
      <Card className="mb-3 my-profile-box rounded-0">
        <Card.Body className="p-0">
          <div
            style={{
              backgroundImage: `url(${
                profileBgURL ??
                "../../assets/images/dashboard/cover-background-2.jpg"
              })`,
            }}
            className="position-relative user-cover-box"
          >
            <div className="user-profile-pic rounded-pill">
              <Link route={`/profile/${profileId}`}>
                <div title={getFullName(userInfo)}>
                  <picture onContextMenu={(e) => e.preventDefault()}>
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
                  </picture>
                </div>
              </Link>
            </div>
          </div>
          <div className="px-3 pt-xl-0 pt-3">
            <div className="text-center pt-3 pointer">
              <Link route={`/profile/${profileId}`}>
                <h6>{getFullName(userInfo)}</h6>
              </Link>
              <p className="text-body-12 text-gray-darker">
                {currentPosition ?? " "}
              </p>
            </div>
          </div>
          <div className="px-3 pt-xl-0 pt-3 list-top-bottom-border">
            <ul className="listing-section listing-content-between border-first-0 py-sm">
              <li className="listing-box pt-12 pb-2">
                <Link route={`/my-connections?tab=my-connection`}>
                  <div
                    title={lang("MY_PROFILE.MY_CONNECTIONS")}
                    className="d-flex align-items-center w-100 text-gray-darker pointer  list-item"
                  >
                    {lang("MY_PROFILE.MY_CONNECTIONS")}

                    <div className="ml-auto">
                      <Badge className="font-12 font-weight-bold text-primary h-auto">
                        {countData?.totalConnections
                          ? compactNumber(countData?.totalConnections, 2)
                          : 0}
                      </Badge>
                    </div>
                  </div>
                </Link>
              </li>
              <li className="listing-box pt-0 pb-2">
                <Link to="/people-viewed">
                  <div
                    title={lang("MY_PROFILE.PEOPLE_VIEWED")}
                    className="d-flex align-items-center w-100 text-gray-darker pointer  list-item"
                  >
                    {lang("MY_PROFILE.PEOPLE_VIEWED")}
                    <div className="ml-auto">
                      <Badge className="font-12 font-weight-bold text-primary h-auto">
                        {countData?.totalProfileViewed
                          ? compactNumber(countData?.totalProfileViewed, 2)
                          : 0}
                      </Badge>
                    </div>
                  </div>
                </Link>
              </li>
              <li className="listing-box pt-0 pb-12">
                <Link route={`/my-connections?tab=my_growth_connection`}>
                  <div
                    title={lang("CONNECTIONS.MY_GROWTH_CONNECTIONS")}
                    className="d-flex align-items-center w-100 text-gray-darker pointer  list-item"
                  >
                    {lang("CONNECTIONS.MY_GROWTH_CONNECTIONS")}
                    <div className="ml-auto">
                      <Badge className="font-12 font-weight-bold text-primary h-auto">
                        {countData?.totalGrowthConnections
                          ? compactNumber(countData?.totalGrowthConnections, 2)
                          : 0}
                      </Badge>
                    </div>
                  </div>
                </Link>
              </li>
            </ul>
          </div>

          <div className="px-3">
            <ul className="listing-section listing-content-between border-first-0">
              <li className="listing-box pt-12 pb-2">
                <Link to={`/profile/${userInfo.profileId}?viewmode=true`}>
                  <a
                    title="my connections"
                    className="d-flex align-items-center w-100 profile-list-box"
                  >
                    <div className="font-weight-semibold">
                      {lang(
                        "RIGHT_SIDEBAR.OTHER_VIEWS.HOW_OTHER_VIEW_MY_PROFILE"
                      )}
                    </div>
                    <div className="ml-auto">
                      <Badge className="text-primary font-14 font-weight-normal h-auto">
                        <em className="icon icon-right-gray-arrow ml-auto"></em>
                      </Badge>
                    </div>
                  </a>
                </Link>
              </li>
              <li
                className="listing-box border-0 pt-0 pb-12"
                onClick={() => dispatch(toggleModals({ addcredit: true }))}
              >
                <Link route="/">
                  <a
                    title="people viewed"
                    className="d-flex align-items-center w-100 profile-list-box"
                  >
                    <div className="font-weight-semibold">
                      {lang("RIGHT_SIDEBAR.OTHER_VIEWS.ADD_CREDITS")}
                    </div>

                    <div className="ml-auto">
                      <Badge className="text-primary font-14 font-weight-normal h-auto">
                        <em className="icon icon-right-gray-arrow ml-auto"></em>
                      </Badge>
                    </div>
                  </a>
                </Link>
              </li>
            </ul>
          </div>

          {lastPurchasedPlanDetails?.isUpgradable && upgradeUser(accountType)}
        </Card.Body>
      </Card>
    </Fragment>
  );
};
export default MyProfile;
