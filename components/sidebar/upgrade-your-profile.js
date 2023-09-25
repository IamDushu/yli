import React, { Fragment, useEffect, useState } from "react";
import { Card, Accordion, Button, ListGroup } from "react-bootstrap";
import { Badge } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { getProfileCountData, toggleModals } from "store/actions";
import { Link } from "@routes";
import { get } from "../../api";
import { PROFILE_COUNT } from "./../../api/routes";
import { useSelector } from "react-redux";
import { USER_API_URL } from "../../config";
import {
  selectUserCountData,
  selectUserInfo,
} from "../../store/selectors/user";
import { useRouter } from "next/router";
import { ACCOUNTS } from "routes/urls";
import { useTranslation } from "react-i18next";
import { compactNumber } from "../../utils";

const UpgradeYourProfile = (isSelfProfile) => {
  const [lang] = useTranslation("language");
  const router = useRouter();
  const dispatch = useDispatch();
  const userInfo = useSelector(selectUserInfo);
  const { accountType } = userInfo;
  const growthPartners = useSelector((state) => state?.growth?.growthPartners);
  const totalConnection = useSelector(
    (state) => state.connections.totalConnection
  );
  // const countData = useSelector(selectUserCountData);
  const [countData, setCountData] = useState(null);
  useEffect(async () => {
    if (userInfo) {
      const response = await get(
        { serviceURL: USER_API_URL },
        PROFILE_COUNT + userInfo.id,
        false,
        true
      );
      if (response.status === 1) {
        setCountData(response.data);
      }
    }
  }, []);
  /******************** 
@purpose : Used for display type of account
@Parameter : { type }
@Author : INIC
******************/

  const upgradeUser = (type) => {
    if (type === "free") {
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
    } else if (type === "lite") {
      return (
        <div className="updgrade-profile">
          <div className="pb-10 font-14 font-medium">
            {lang("COMMON.UPGRADE_YOUR_PROFILE")}
          </div>
          <div className="d-flex flex-xl-nowrap flex-wrap">
            <Button
              variant="primary w-100 ml-xl-1 ml-0 btn-sm"
              onClick={() =>
                router.replace({
                  pathname: ACCOUNTS,
                  query: { upgrade: true },
                })
              }
            >
              {lang("COMMON.PREMIUM")}
            </Button>
          </div>
        </div>
      );
    } else if (type === "premium") {
      return;
    }
  };

  const styleValue = {
    fontStyle: "normal",
    fontWeight: 700,
    fontSize: "12px",
    lineHeight: "15px",
    textAlign: "right",
    letterSpacing: "0.25px",
    color: "#051F4E",
    flex: "none",
    order: 1,
    flexGrow: 0,
  };
  const titleCss = {
    fontStyle: "normal",
    fontWeight: 600,
    fontSize: "14px",
    lineHeight: "17px",
    letterSpacing: "0.25px",
    color: "#051F4E",
    flex: "none",
    order: 0,
    flexGrow: 0,
  };
  /******************* 
  @purpose : Rander HTML/ React Components
  @Author : INIC
  ******************/
  return (
    <Fragment>
      {/* growth modal listing */}
      <Accordion
        defaultActiveKey="0"
        className="upgrade-your-profile mb-2 mt-lg-0 mt-2"
      >
        <Card className="d-none">
          <Card.Header className="p-0">
            <Accordion.Toggle
              variant="link"
              eventKey="0"
              className="p-20 w-100 d-flex border-0 accordion-heading-box text-secondary"
            >
              <Card.Title
                className="text-body-14 mb-0 pb-0"
                onClick={() =>
                  router.replace({
                    pathname: ACCOUNTS,
                    query: { upgrade: true },
                  })
                }
              >
                {lang("COMMON.UPGRADE_YOUR_PROFILE")}
              </Card.Title>
              <em className="icon icon-down-arrow ml-auto font-24 d-xl-none"></em>
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="0">
            <Card.Body className="p-0">
              <div className="px-3">
                <ul className="listing-section listing-content-between border-first-0">
                  {/* <li className="listing-box">
                    <Link route='/'>
                      <a title="How Other User View My Profile" className="d-flex align-items-center w-100">
                        How Other User View My Profile
                        <em className="icon icon-right-angle-arrow ml-auto"></em>
                      </a>
                    </Link>
                  </li> */}
                  <li
                    className="listing-box"
                    onClick={() => dispatch(toggleModals({ addcredit: true }))}
                  >
                    <a
                      title="Add Credits"
                      className="d-flex align-items-center w-100"
                    >
                      {lang("COMMON.ADD_CREDITS")}
                      <em className="icon icon-right-angle-arrow ml-auto"></em>
                    </a>
                  </li>
                </ul>
              </div>
              {/* {upgradeUser(accountType)} */}
            </Card.Body>
          </Accordion.Collapse>
        </Card>

        {/* <Card className="mb-3 my-profile-box">
        <Card.Body className="p-0 overflow-hidden">
          <div
            style={{
              backgroundImage: `url("../../assets/images/dashboard/cover-background.jpg")`,
            }}
            className="position-relative user-cover-box"
          >
            <div className="user-profile-pic rounded-pill">
              <Link route="/">
                <a
                  title={`${firstName !== null ? firstName : ""} ${
                    lastName !== null ? lastName : ""
                  }`}
                >
                  <picture>
                    <source
                      srcSet={
                        profilePicURL !== null
                          ? profilePicURL
                          : firstName !== null
                          ? firstName.charAt(0).toUpperCase()
                          : ""
                      }
                      type="image/jpg"
                    />
                    <img
                      src={
                        profilePicURL !== null
                          ? profilePicURL
                          : firstName !== null
                          ? firstName.charAt(0).toUpperCase()
                          : ""
                      }
                      onError={(e) => {
                        onImageError(e, "profile");
                      }}
                      // alt="Upload your photo"
                      width="120"
                      height="120"
                      className="img-fluid h-100"
                      alt="user name"
                    />
                  </picture>
                </a>
              </Link>
            </div>
          </div>
          <div className="px-3 pt-xl-0 pt-3">
            <div className="text-center pt-4">
              <Link route="/">
                <a title="Jaydon Vaccaro">
                  <h6>
                    {`${firstName !== null ? firstName : "Jaydon"} ${
                      lastName !== null ? lastName : "Vaccaro"
                    }`}
                  </h6>
                </a>
              </Link>

              <p className="text-body-12">
                {`${currentPosition !== null ? currentPosition : " "}`}
              </p>
            </div>
            <ul className="listing-section listing-content-between border-first-0 py-sm">
              <li className="listing-box">
                <Link to="/my-connections">
                  <a
                    title="my connections"
                    className="d-flex align-items-center w-100"
                  >
                    My Connections
                    <div className="ml-auto">
                      <Badge className="text-body-14 text-gray">
                        {countData?.totalConnections
                          ? compactNumber(countData?.totalConnections, 2)
                          : 0}
                      </Badge>
                    </div>
                  </a>
                </Link>
              </li>
              <li className="listing-box">
                <Link route="/">
                  <a
                    title="people viewed"
                    className="d-flex align-items-center w-100"
                  >
                    People Viewed
                    <div className="ml-auto">
                      <Badge className="text-body-14 text-gray">
                        {countData?.totalProfileViewed
                          ? compactNumber(countData?.totalProfileViewed, 2)
                          : 0}
                      </Badge>
                    </div>
                  </a>
                </Link>
              </li>
              <li className="listing-box">
                <Link route="/my-growth-connections">
                  <a
                    title="growth connections"
                    className="d-flex align-items-center w-100"
                  >
                    Growth Connections
                    <div className="ml-auto">
                      <Badge className="text-body-14 text-gray">
                        {countData?.totalGrowthConnections
                          ? compactNumber(countData?.totalGrowthConnections, 2)
                          : 0}
                      </Badge>
                    </div>
                  </a>
                </Link>
              </li>
            </ul>
          </div>
          {upgradeUser(accountType)}
        </Card.Body>
      </Card> */}
        <Card className="mb-3 my-profile-box" style={{ borderRadius: 0 }}>
          <Card.Body className="p-0 overflow-hidden">
            <ListGroup style={{ width: "100%", borderRadius: 0 }}>
              <ListGroup.Item className="px-3">
                <h6 className="mb-0" style={titleCss}>
                  {lang("COMMON.YOUR_SHORTCUTS")}
                </h6>
              </ListGroup.Item>
              <ListGroup.Item className="px-3">
                {true && (
                  <a
                    title="my connections"
                    className="d-flex align-items-center w-100 text-decoration-none"
                    style={{ cursor: "default" }}
                  // href="/my-connections"
                  >
                    <li className="d-flex align-items-center w-100 pb-2 f-12-w-500 text-gray-darker font-weight-semibold">
                      {lang("COMMON.MY_CONNECTIONS")}
                      <span
                        className=" ml-auto text-body-12 h-auto badge"
                        style={styleValue}
                      >
                        {countData?.totalConnections
                          ? compactNumber(countData?.totalConnections, 2)
                          : 0}
                      </span>
                    </li>
                  </a>
                )}
                {true && (
                  <a
                    title="my growth connections"
                    className="d-flex align-items-center w-100 text-decoration-none"
                  // href="/my-growth-connections"
                  >
                    <li
                      className="d-flex align-items-center w-100 pb-2 f-12-w-500 text-gray-darker font-weight-semibold"
                      style={{
                        cursor: "default",
                      }}
                    >
                      {lang("COMMON.MY_GROWTH_CONNECTIONS")}
                      <span
                        className=" ml-auto text-body-12 h-auto badge"
                        style={styleValue}
                      >
                        {countData?.totalGrowthConnections
                          ? compactNumber(countData?.totalGrowthConnections, 2)
                          : 0}
                      </span>
                    </li>
                  </a>
                )}
                <a
                  title="People visited my profile"
                  className="d-flex align-items-center w-100 text-decoration-none"
                // href="/my-growth-connections"
                >
                  <li
                    className="d-flex align-items-center w-100 f-12-w-500 text-gray-darker font-weight-semibold"
                    style={{
                      cursor: "default",
                    }}
                  >
                    {lang("COMMON.PEOPLE_VISITED_MY_PROFILE")}
                    <span
                      className=" ml-auto text-body-12 h-auto badge"
                      style={styleValue}
                    >
                      {countData?.totalProfileViewed
                        ? compactNumber(countData?.totalProfileViewed, 2)
                        : 0}
                    </span>
                  </li>
                </a>
                <a
                  title="People visited my profile"
                  className="d-flex align-items-center w-100 text-decoration-none pt-2"

                // href="/my-growth-connections"
                >
                  <li
                    className="d-flex align-items-center w-100 f-12-w-500 text-gray-darker font-weight-semibold"
                    style={{
                      cursor: "default",
                    }}
                  >
                    {lang("COMMON.POST_PUBLISHED")}
                    <span
                      className=" ml-auto text-body-12 h-auto badge"
                      style={styleValue}
                    >
                      {countData?.totalPosts ?? 0}
                    </span>
                  </li>
                </a>
                <a
                  title="People visited my profile"
                  className="d-flex align-items-center w-100 text-decoration-none pt-2"
                // href="/my-growth-connections"
                >
                  <li
                    className="d-flex align-items-center w-100 f-12-w-500 text-gray-darker font-weight-semibold"
                    style={{
                      cursor: "default",
                    }}
                  >
                    {lang("COMMON.TOTAL_LIKES")}
                    <span
                      className=" ml-auto text-body-12 h-auto badge"
                      style={styleValue}
                    >
                      {countData?.totalLikes ?? 0}
                    </span>
                  </li>
                </a>
                <a
                  title="People visited my profile"
                  className="d-flex align-items-center w-100 text-decoration-none pt-2"
                // href="/my-growth-connections"
                >
                  <li
                    className="d-flex align-items-center w-100 f-12-w-500 text-gray-darker font-weight-semibold"
                    style={{
                      cursor: "default",
                    }}
                  >
                    {lang("COMMON.TOTAL_SHARES")}
                    <span
                      className=" ml-auto text-body-12 h-auto badge"
                      style={styleValue}
                    >
                      {countData?.totalShares ?? 0}
                    </span>
                  </li>
                </a>
              </ListGroup.Item>
            </ListGroup>

            <div className="px-3">
              <ul className="listing-section listing-content-between border-first-0">
                <li
                  className="listing-box border-0 pb-12 pt-12"
                  onClick={() => dispatch(toggleModals({ addcredit: true }))}
                >
                  <a
                    title="Add Credits"
                    className="d-flex align-items-center w-100 text-gray-darker font-weight-semibold"
                  >
                    {lang("COMMON.ADD_CREDITS")}
                    <em className="icon icon-right-angle-arrow ml-auto"></em>
                  </a>
                </li>
              </ul>
            </div>

            {upgradeUser(accountType)}
          </Card.Body>
        </Card>
      </Accordion>
    </Fragment>
    // old
    // <Fragment>
    //   {/* growth modal listing */}
    //   <Accordion defaultActiveKey="0" className="upgrade-your-profile mb-4">
    //     <Card>
    //       <Card.Header className="p-0"></Card.Header>
    //       <Accordion.Collapse eventKey="0">
    //         <Card.Body className="">
    //           <div className="p-0">
    //             <ul className="listing-section listing-content-between border-first-0 pt-first-0">
    //               <li
    //                 className="listing-box"
    //                 onClick={() =>
    //                   window.open(
    //                     `/profile/${userInfo.profileId}?viewmode=true`,
    //                     "_self"
    //                   )
    //                 }
    //               >
    //                 <a
    //                   // title="my connections"
    //                   className="d-flex align-items-center w-100"
    //                 >
    //                   {lang(
    //                     "RIGHT_SIDEBAR.OTHER_VIEWS.HOW_OTHER_VIEW_MY_PROFILE"
    //                   )}
    //                   <div className="ml-auto">
    //                     <Badge className="text-primary font-14 font-weight-normal">
    //                       <em className="icon icon-right-angle-arrow ml-auto"></em>
    //                     </Badge>
    //                   </div>
    //                 </a>
    //               </li>
    //               <li
    //                 className="listing-box"
    //                 onClick={() => dispatch(toggleModals({ addcredit: true }))}
    //               >
    //                 <a
    //                   // title="Add Credits"
    //                   className="d-flex align-items-center w-100"
    //                 >
    //                   {lang("RIGHT_SIDEBAR.OTHER_VIEWS.ADD_CREDITS")}
    //                   <em className="icon icon-right-angle-arrow ml-auto"></em>
    //                 </a>
    //               </li>

    //               <li className="listing-box">
    //                 <Link to="/my-connections/connection-list">
    //                   <a
    //                     // title="my connections"
    //                     className="d-flex align-items-center w-100"
    //                   >
    //                     {lang("MY_PROFILE.MY_CONNECTIONS")}
    //                     <div className="ml-auto">
    //                       <Badge className="text-body-14 text-gray">
    //                         {countData?.totalConnections}
    //                       </Badge>
    //                     </div>
    //                   </a>
    //                 </Link>
    //               </li>
    //               <li className="listing-box">
    //                 <Link route="/people-viewed">
    //                   <a
    //                     // title="people viewed"
    //                     className="d-flex align-items-center w-100"
    //                   >
    //                     {lang("MY_PROFILE.PEOPLE_VIEWED")}
    //                     <div className="ml-auto">
    //                       <Badge className="text-body-14 text-gray">
    //                         {countData?.totalProfileViewed}
    //                       </Badge>
    //                     </div>
    //                   </a>
    //                 </Link>
    //               </li>
    //               <li className="listing-box">
    //                 <Link route="/my-growth-connections">
    //                   <a
    //                     // title="growth connections"
    //                     className="d-flex align-items-center w-100"
    //                   >
    //                     {lang("USER_PROFILE_SUMMARY.TEXT.GROWTH_CONNECTIONS")}
    //                     <div className="ml-auto">
    //                       <Badge className="text-body-14 text-gray">
    //                         {countData?.totalGrowthConnections}
    //                       </Badge>
    //                     </div>
    //                   </a>
    //                 </Link>
    //               </li>
    //             </ul>
    //           </div>
    //           {upgradeUser(accountType)}
    //         </Card.Body>
    //       </Accordion.Collapse>
    //     </Card>
    //   </Accordion>
    // </Fragment>
  );
};
export default UpgradeYourProfile;
