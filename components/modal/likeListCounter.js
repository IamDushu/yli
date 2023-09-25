import React, { Fragment } from "react";
import { Tab, Tabs, Modal } from "react-bootstrap";
import { Link } from "@routes";
import { useDispatch, useSelector } from "react-redux";
import { onImageError } from "utils";
import { toggleModals } from "store/actions";
import { selectUserInfo } from "store/selectors/user";
import { useTranslation } from "react-i18next";

export const LikeListCounter = () => {
  const dispatch = useDispatch();
  const [lang] = useTranslation("language");
  const { postLikesData } = useSelector((state) => state.post);
  const userInfo = useSelector(selectUserInfo);

  const likes = postLikesData?.rows?.filter((item) => item.reaction === "Like");

  const celebrates = postLikesData?.rows?.filter(
    (item) => item.reaction === "Celebrate"
  );

  const supports = postLikesData?.rows?.filter(
    (item) => item.reaction === "Support"
  );

  const loves = postLikesData?.rows?.filter((item) => item.reaction === "Love");

  const insightfuls = postLikesData?.rows?.filter(
    (item) => item.reaction === "Insightful"
  );

  const curiouses = postLikesData?.rows?.filter(
    (item) => item.reaction === "Curious"
  );

  const allLikes = (
    <div className="d-flex justify-content-center">
      <div>{lang("DASHBOARD.POSTS.LIKES_MODAL.ALL_LIKES")}</div>
      <div className="ml-2">
        {Array.isArray(postLikesData?.rows) && postLikesData?.rows?.length}
      </div>
    </div>
  );

  const like = (
    <div className="d-flex justify-content-center">
      <picture className="icon">
        <source src="/assets/images/dashboard/like.svg" type="image/svg" />
        <img
          src="/assets/images/dashboard/like.svg"
          width="24"
          height="24"
          className="img-fluid w-h-24"
        />
      </picture>
      <div className="ml-2">{Array.isArray(likes) && likes.length}</div>
    </div>
  );

  const celebrate = (
    <div className="d-flex justify-content-center">
      <picture className="icon">
        <source src="/assets/images/dashboard/Celebrate.svg" type="image/svg" />
        <img
          src="/assets/images/dashboard/Celebrate.svg"
          width="24"
          height="24"
          className="img-fluid w-h-24"
        />
      </picture>
      <div className="ml-2">
        {Array.isArray(celebrates) && celebrates.length}
      </div>
    </div>
  );

  const support = (
    <div className="d-flex justify-content-center">
      <picture className="icon">
        <source src="/assets/images/dashboard/Support.svg" type="image/svg" />
        <img
          src="/assets/images/dashboard/Support.svg"
          width="24"
          height="24"
          className="img-fluid w-h-24"
        />
      </picture>
      <div className="ml-2">{Array.isArray(supports) && supports.length}</div>
    </div>
  );

  const love = (
    <div className="d-flex justify-content-center">
      <picture className="icon">
        <source src="/assets/images/dashboard/Love.svg" type="image/svg" />
        <img
          src="/assets/images/dashboard/Love.svg"
          width="24"
          height="24"
          className="img-fluid w-h-24"
        />
      </picture>
      <div className="ml-2">{Array.isArray(loves) && loves.length}</div>
    </div>
  );

  const insightful = (
    <div className="d-flex justify-content-center">
      <picture className="icon">
        <source
          src="/assets/images/dashboard/Insightful.svg"
          type="image/svg"
        />
        <img
          src="/assets/images/dashboard/Insightful.svg"
          width="24"
          height="24"
          className="img-fluid w-h-24"
        />
      </picture>
      <div className="ml-2">
        {Array.isArray(insightfuls) && insightfuls.length}
      </div>
    </div>
  );

  const curious = (
    <div className="d-flex justify-content-center">
      <picture className="icon">
        <source src="/assets/images/dashboard/Curious.svg" type="image/svg" />
        <img
          src="/assets/images/dashboard/Curious.svg"
          width="24"
          height="24"
          className="img-fluid w-h-24"
        />
      </picture>
      <div className="ml-2">{Array.isArray(curiouses) && curiouses.length}</div>
    </div>
  );

  const imagePreferenceHandler = (item) => {
    if (
      item["userDetails.id"] === userInfo.id ||
      item["userDetails.profilePicShowData"] === null ||
      item["userDetails.profilePicShowData.id"] === null ||
      item["userDetails.profilePicShowData.all"] ||
      (item["userDetails.connectionData.isConnection"] &&
        item["userDetails.profilePicShowData.myConnections"]) ||
      (item["userDetails.growthConnectionData.isGrowthConnection"] &&
        item["userDetails.profilePicShowData.myGrowthConnections"]) ||
      (item["userDetails.followData.isFollow"] &&
        item["userDetails.profilePicShowData.followers"]) ||
      (userInfo.role &&
        ((userInfo.role.includes("Teacher") &&
          item["userDetails.profilePicShowData.teachers"]) ||
          (userInfo.role.includes("Trainer") &&
            item["userDetails.profilePicShowData.trainer"]) ||
          (userInfo.role.includes("Coach") &&
            item["userDetails.profilePicShowData.coach"]) ||
          (userInfo.role.includes("Host") &&
            item["userDetails.profilePicShowData.hosts"])))
    ) {
      return true;
    }
  };

  const lastNameHandler = (item) => {
    if (
      item["userDetails.id"] === userInfo.id ||
      item["userDetails.lastNameVisibility"] === null ||
      item["userDetails.lastNameVisibility.id"] === null ||
      item["userDetails.lastNameVisibility.settings"]?.all ||
      (item["userDetails.connectionData.isConnection"] &&
        item["userDetails.lastNameVisibility.settings"]?.myConnection) ||
      (item["userDetails.growthConnectionData.isGrowthConnection"] &&
        item["userDetails.lastNameVisibility.settings"]?.myGrowthConnection) ||
      (item["userDetails.followData.isFollow"] &&
        item["userDetails.lastNameVisibility.settings"]?.followers)
    ) {
      return true;
    }
  };

  return (
    <Fragment>
      <Modal.Body className="text-center">
        <div>
          <Tabs
            defaultActiveKey="AllLikes"
            id="groups-tabs-section"
            className="custom-tabs-unfiled mb-30 border-0"
          >
            {Array.isArray(postLikesData?.rows) &&
              postLikesData?.rows?.length > 0 && (
                <Tab eventKey="AllLikes" title={allLikes}>
                  {postLikesData?.rows?.map((item, index) => {
                    const AllLikeProfileRoute = item["instituteDetails.id"]
                      ? "/profile/institute-profile?instituteId=" +
                      item["instituteDetails.id"] +
                      "&name=" +
                      item["instituteDetails.name"].split(" ", 1)[0] +
                      "+" +
                      item["instituteDetails.id"].split(" ", 2)[1] +
                      "&userId=" +
                      userInfo.id
                      : `/profile/${item["userDetails.profileId"]}`;
                    const instFirName =
                      item["userDetails.firstName"] !== null
                        ? item["userDetails.firstName"]
                        : item["instituteDetails.name"].split(" ", 1)[0];

                    const instLasName =
                      item["userDetails.lastName"] !== null
                        ? item["userDetails.lastName"]
                        : item["instituteDetails.name"].split(" ", 2)[1];

                    return (
                      <div
                        className="d-flex align-items-center mb-3"
                        key={index}
                      >
                        <Link route={AllLikeProfileRoute}>
                          <a
                            className="rounded-pill overflow-hidden w-h-70"
                            title={`${instFirName !== null ? instFirName : ""
                              } ${instLasName !== null ? instLasName : ""}`}
                            onClick={() =>
                              dispatch(toggleModals({ likelistcounter: false }))
                            }
                          >
                            <picture className="user-profile-pic rounded-pill overflow-hidden">
                              <source
                                src={
                                  imagePreferenceHandler(item)
                                    ? item["instituteDetails.id"]
                                      ? item["instituteDetails.logo"]
                                      : item["userDetails.profilePicURL"]
                                    : ""
                                }
                                type="image/jpg"
                              />
                              <img
                                src={
                                  imagePreferenceHandler(item)
                                    ? item["instituteDetails.id"]
                                      ? item["instituteDetails.logo"]
                                      : item["userDetails.profilePicURL"]
                                    : ""
                                }
                                alt="profilePicURL"
                                width="70"
                                height="70"
                                onError={(e) => {
                                  onImageError(
                                    e,
                                    "profile",
                                    `${instFirName} ${lastNameHandler(item) ? instLasName : ""
                                    }`
                                  );
                                }}
                              />
                            </picture>
                          </a>
                        </Link>
                        <div className="pl-3 text-left">
                          <Link route={AllLikeProfileRoute}>
                            <a
                              title={`${instFirName !== null ? instFirName : ""
                                } ${instLasName !== null ? instLasName : ""}`}
                              onClick={() =>
                                dispatch(
                                  toggleModals({ likelistcounter: false })
                                )
                              }
                            >
                              <h5 className="card-title font-16 text-secondary font-medium mb-10">
                                {instFirName}{" "}
                                {lastNameHandler(item) ? instLasName : ""}
                              </h5>
                            </a>
                          </Link>
                          <p className="font-12 text-gary font-weight-light mb-0">
                            {item["userDetails.shortDescription"] !== null
                              ? item["userDetails.shortDescription"]
                              : ""}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </Tab>
              )}
            {Array.isArray(likes) && likes.length > 0 && (
              <Tab eventKey="like" title={like}>
                {likes.map((item, index) => {
                  const LikesProfileRoute = item["instituteDetails.id"]
                    ? "/profile/institute-profile?instituteId=" +
                    item["instituteDetails.id"] +
                    "&name=" +
                    item["instituteDetails.name"].split(" ", 1)[0] +
                    "+" +
                    item["instituteDetails.id"].split(" ", 2)[1] +
                    "&userId=" +
                    userInfo.id
                    : `/profile/${item["userDetails.profileId"]}`;
                  const instFirName =
                    item["userDetails.firstName"] !== null
                      ? item["userDetails.firstName"]
                      : item["instituteDetails.name"].split(" ", 1)[0];

                  const instLasName =
                    item["userDetails.lastName"] !== null
                      ? item["userDetails.lastName"]
                      : item["instituteDetails.name"].split(" ", 2)[1];
                  return (
                    <div className="d-flex align-items-center mb-3" key={index}>
                      <Link route={LikesProfileRoute}>
                        <a
                          className="rounded-pill overflow-hidden w-h-70"
                          title={`${instFirName !== null ? instFirName : ""
                            } ${instLasName !== null ? instLasName : ""}`}
                          onClick={() =>
                            dispatch(toggleModals({ likelistcounter: false }))
                          }
                        >
                          <picture className="user-profile-pic rounded-pill overflow-hidden">
                            <source
                              src={
                                imagePreferenceHandler(item)
                                  ? item["instituteDetails.id"]
                                    ? item["instituteDetails.logo"]
                                    : item["userDetails.profilePicURL"]
                                  : ""
                              }
                              type="image/jpg"
                            />
                            <img
                              src={
                                imagePreferenceHandler(item)
                                  ? item["instituteDetails.id"]
                                    ? item["instituteDetails.logo"]
                                    : item["userDetails.profilePicURL"]
                                  : ""
                              }
                              alt="profilePicURL"
                              width="70"
                              height="70"
                              onError={(e) => {
                                onImageError(
                                  e,
                                  "profile",
                                  `${instFirName} ${lastNameHandler(item) ? instLasName : ""
                                  }`
                                );
                              }}
                            />
                          </picture>
                        </a>
                      </Link>
                      <div className="pl-3 text-left">
                        <Link route={LikesProfileRoute}>
                          <a
                            title={`${instFirName !== null ? instFirName : ""
                              } ${instLasName !== null ? instLasName : ""}`}
                            onClick={() =>
                              dispatch(toggleModals({ likelistcounter: false }))
                            }
                          >
                            <h5 className="card-title font-16 text-secondary font-medium mb-10">
                              {instFirName}
                              {lastNameHandler(item) ? instLasName : ""}
                            </h5>
                          </a>
                        </Link>
                        <p className="font-12 text-gary font-weight-light mb-0">
                          {item["userDetails.shortDescription"] !== null
                            ? item["userDetails.shortDescription"]
                            : ""}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </Tab>
            )}
            {Array.isArray(celebrates) && celebrates.length > 0 && (
              <Tab eventKey="celebrate" title={celebrate}>
                {celebrates.map((item, index) => {
                  const CelebrateProfileRoute = item["instituteDetails.id"]
                    ? "/profile/institute-profile?instituteId=" +
                    item["instituteDetails.id"] +
                    "&name=" +
                    item["instituteDetails.name"].split(" ", 1)[0] +
                    "+" +
                    item["instituteDetails.id"].split(" ", 2)[1] +
                    "&userId=" +
                    userInfo.id
                    : `/profile/${item["userDetails.profileId"]}`;
                  const instFirName =
                    item["userDetails.firstName"] !== null
                      ? item["userDetails.firstName"]
                      : item["instituteDetails.name"].split(" ", 1)[0];

                  const instLasName =
                    item["userDetails.lastName"] !== null
                      ? item["userDetails.lastName"]
                      : item["instituteDetails.name"].split(" ", 2)[1];
                  return (
                    <div className="d-flex align-items-center mb-3" key={index}>
                      <Link route={CelebrateProfileRoute}>
                        <a
                          className="rounded-pill overflow-hidden w-h-70"
                          title={`${instFirName !== null ? instFirName : ""
                            } ${instLasName !== null ? instLasName : ""}`}
                          onClick={() =>
                            dispatch(toggleModals({ likelistcounter: false }))
                          }
                        >
                          <picture className="user-profile-pic rounded-pill overflow-hidden">
                            <source
                              src={
                                imagePreferenceHandler(item)
                                  ? item["instituteDetails.id"]
                                    ? item["instituteDetails.logo"]
                                    : item["userDetails.profilePicURL"]
                                  : ""
                              }
                              type="image/jpg"
                            />
                            <img
                              src={
                                imagePreferenceHandler(item)
                                  ? item["instituteDetails.id"]
                                    ? item["instituteDetails.logo"]
                                    : item["userDetails.profilePicURL"]
                                  : ""
                              }
                              alt="profilePicURL"
                              width="70"
                              height="70"
                              onError={(e) => {
                                onImageError(
                                  e,
                                  "profile",
                                  `${instFirName} ${lastNameHandler(item) ? instLasName : ""
                                  }`
                                );
                              }}
                            />
                          </picture>
                        </a>
                      </Link>
                      <div className="pl-3 text-left">
                        <Link route={CelebrateProfileRoute}>
                          <a
                            title={`${instFirName !== null ? instFirName : ""
                              } ${instLasName !== null ? instLasName : ""}`}
                            onClick={() =>
                              dispatch(toggleModals({ likelistcounter: false }))
                            }
                          >
                            <h5 className="card-title font-16 text-secondary font-medium mb-10">
                              {instFirName}
                              {lastNameHandler(item) ? instLasName : ""}
                            </h5>
                          </a>
                        </Link>
                        <p className="font-12 text-gary font-weight-light mb-0">
                          {item["userDetails.shortDescription"] !== null
                            ? item["userDetails.shortDescription"]
                            : ""}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </Tab>
            )}
            {Array.isArray(supports) && supports.length > 0 && (
              <Tab eventKey="support" title={support}>
                {supports.map((item, index) => {
                  const SupportProfileRoute = item["instituteDetails.id"]
                    ? "/profile/institute-profile?instituteId=" +
                    item["instituteDetails.id"] +
                    "&name=" +
                    item["instituteDetails.name"].split(" ", 1)[0] +
                    "+" +
                    item["instituteDetails.id"].split(" ", 2)[1] +
                    "&userId=" +
                    userInfo.id
                    : `/profile/${item["userDetails.profileId"]}`;
                  const instFirName =
                    item["userDetails.firstName"] !== null
                      ? item["userDetails.firstName"]
                      : item["instituteDetails.name"].split(" ", 1)[0];

                  const instLasName =
                    item["userDetails.lastName"] !== null
                      ? item["userDetails.lastName"]
                      : item["instituteDetails.name"].split(" ", 2)[1];
                  return (
                    <div className="d-flex align-items-center mb-3" key={index}>
                      <Link route={SupportProfileRoute}>
                        <a
                          className="rounded-pill overflow-hidden w-h-70"
                          title={`${instFirName !== null ? instFirName : ""
                            } ${instLasName !== null ? instLasName : ""}`}
                          onClick={() =>
                            dispatch(toggleModals({ likelistcounter: false }))
                          }
                        >
                          <picture className="user-profile-pic rounded-pill overflow-hidden">
                            <source
                              src={
                                imagePreferenceHandler(item)
                                  ? item["instituteDetails.id"]
                                    ? item["instituteDetails.logo"]
                                    : item["userDetails.profilePicURL"]
                                  : ""
                              }
                              type="image/jpg"
                            />
                            <img
                              src={
                                imagePreferenceHandler(item)
                                  ? item["instituteDetails.id"]
                                    ? item["instituteDetails.logo"]
                                    : item["userDetails.profilePicURL"]
                                  : ""
                              }
                              alt="profilePicURL"
                              width="70"
                              height="70"
                              onError={(e) => {
                                onImageError(
                                  e,
                                  "profile",
                                  `${instFirName} ${lastNameHandler(item) ? instLasName : ""
                                  }`
                                );
                              }}
                            />
                          </picture>
                        </a>
                      </Link>
                      <div className="ml-2 text-left">
                        <Link route={SupportProfileRoute}>
                          <a
                            title={`${instFirName !== null ? instFirName : ""
                              } ${instLasName !== null ? instLasName : ""}`}
                            onClick={() =>
                              dispatch(toggleModals({ likelistcounter: false }))
                            }
                          >
                            <h5 className="card-title font-16 text-secondary font-medium mb-10">
                              {instFirName} {instLasName}
                            </h5>
                          </a>
                        </Link>
                        <p className="font-12 text-gary font-weight-light mb-0">
                          {item["userDetails.shortDescription"] !== null
                            ? item["userDetails.shortDescription"]
                            : ""}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </Tab>
            )}
            {Array.isArray(loves) && loves.length > 0 && (
              <Tab eventKey="love" title={love}>
                {loves.map((item, index) => {
                  const LovesProfileRoute = item["instituteDetails.id"]
                    ? "/profile/institute-profile?instituteId=" +
                    item["instituteDetails.id"] +
                    "&name=" +
                    item["instituteDetails.name"].split(" ", 1)[0] +
                    "+" +
                    item["instituteDetails.id"].split(" ", 2)[1] +
                    "&userId=" +
                    userInfo.id
                    : `/profile/${item["userDetails.profileId"]}`;
                  const instFirName =
                    item["userDetails.firstName"] !== null
                      ? item["userDetails.firstName"]
                      : item["instituteDetails.name"].split(" ", 1)[0];

                  const instLasName =
                    item["userDetails.lastName"] !== null
                      ? item["userDetails.lastName"]
                      : item["instituteDetails.name"].split(" ", 2)[1];
                  return (
                    <div className="d-flex align-items-center mb-3" key={index}>
                      <Link route={LovesProfileRoute}>
                        <a
                          className="rounded-pill overflow-hidden w-h-70"
                          title={`${instFirName !== null ? instFirName : ""
                            } ${instLasName !== null ? instLasName : ""}`}
                          onClick={() =>
                            dispatch(toggleModals({ likelistcounter: false }))
                          }
                        >
                          <picture className="user-profile-pic rounded-pill overflow-hidden">
                            <source
                              src={
                                imagePreferenceHandler(item)
                                  ? item["instituteDetails.id"]
                                    ? item["instituteDetails.logo"]
                                    : item["userDetails.profilePicURL"]
                                  : ""
                              }
                              type="image/jpg"
                            />
                            <img
                              src={
                                imagePreferenceHandler(item)
                                  ? item["instituteDetails.id"]
                                    ? item["instituteDetails.logo"]
                                    : item["userDetails.profilePicURL"]
                                  : ""
                              }
                              alt="profilePicURL"
                              width="70"
                              height="70"
                              onError={(e) => {
                                onImageError(
                                  e,
                                  "profile",
                                  `${instFirName} ${lastNameHandler(item) ? instLasName : ""
                                  }`
                                );
                              }}
                            />
                          </picture>
                        </a>
                      </Link>
                      <div className="ml-2 text-left">
                        <Link route={LovesProfileRoute}>
                          <a
                            title={`${instFirName !== null ? instFirName : ""
                              } ${instLasName !== null ? instLasName : ""}`}
                            onClick={() =>
                              dispatch(toggleModals({ likelistcounter: false }))
                            }
                          >
                            <h5 className="card-title font-16 text-secondary font-medium mb-10">
                              {instFirName}
                              {lastNameHandler(item) ? instLasName : ""}
                            </h5>
                          </a>
                        </Link>
                        <p className="font-12 text-gary font-weight-light mb-0">
                          {item["userDetails.shortDescription"] !== null
                            ? item["userDetails.shortDescription"]
                            : ""}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </Tab>
            )}
            {Array.isArray(insightfuls) && insightfuls.length > 0 && (
              <Tab eventKey="insightful" title={insightful}>
                {insightfuls.map((item, index) => {
                  const InsightfulProfileRoute = item["instituteDetails.id"]
                    ? "/profile/institute-profile?instituteId=" +
                    item["instituteDetails.id"] +
                    "&name=" +
                    item["instituteDetails.name"].split(" ", 1)[0] +
                    "+" +
                    item["instituteDetails.id"].split(" ", 2)[1] +
                    "&userId=" +
                    userInfo.id
                    : `/profile/${item["userDetails.profileId"]}`;
                  const instFirName =
                    item["userDetails.firstName"] !== null
                      ? item["userDetails.firstName"]
                      : item["instituteDetails.name"].split(" ", 1)[0];

                  const instLasName =
                    item["userDetails.lastName"] !== null
                      ? item["userDetails.lastName"]
                      : item["instituteDetails.name"].split(" ", 2)[1];

                  return (
                    <div className="d-flex align-items-center mb-3" key={index}>
                      <Link route={InsightfulProfileRoute}>
                        <a
                          className="rounded-pill overflow-hidden w-h-70"
                          title={`${instFirName !== null ? instFirName : ""
                            } ${instLasName !== null ? instLasName : ""}`}
                          onClick={() =>
                            dispatch(toggleModals({ likelistcounter: false }))
                          }
                        >
                          <picture className="user-profile-pic rounded-pill overflow-hidden">
                            <source
                              src={
                                imagePreferenceHandler(item)
                                  ? item["instituteDetails.id"]
                                    ? item["instituteDetails.logo"]
                                    : item["userDetails.profilePicURL"]
                                  : ""
                              }
                              type="image/jpg"
                            />
                            <img
                              src={
                                imagePreferenceHandler(item)
                                  ? item["instituteDetails.id"]
                                    ? item["instituteDetails.logo"]
                                    : item["userDetails.profilePicURL"]
                                  : ""
                              }
                              alt="profilePicURL"
                              width="70"
                              height="70"
                              onError={(e) => {
                                onImageError(
                                  e,
                                  "profile",
                                  `${instFirName} ${lastNameHandler(item) ? instLasName : ""
                                  }`
                                );
                              }}
                            />
                          </picture>
                        </a>
                      </Link>
                      <div className="pl-3 text-left">
                        <Link route={InsightfulProfileRoute}>
                          <a
                            title={`${instFirName !== null ? instFirName : ""
                              } ${instLasName !== null ? instLasName : ""}`}
                            onClick={() =>
                              dispatch(toggleModals({ likelistcounter: false }))
                            }
                          >
                            <h5 className="card-title font-16 text-secondary font-medium mb-10">
                              {instFirName}
                              {lastNameHandler(item) ? instLasName : ""}
                            </h5>
                          </a>
                        </Link>
                        <p className="font-12 text-gary font-weight-light mb-0">
                          {item["userDetails.shortDescription"] !== null
                            ? item["userDetails.shortDescription"]
                            : ""}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </Tab>
            )}
            {Array.isArray(curiouses) && curiouses.length > 0 && (
              <Tab eventKey="curious" title={curious}>
                {curiouses.map((item, index) => {
                  const CuriousesProfileRoute = item["instituteDetails.id"]
                    ? "/profile/institute-profile?instituteId=" +
                    item["instituteDetails.id"] +
                    "&name=" +
                    item["instituteDetails.name"].split(" ", 1)[0] +
                    "+" +
                    item["instituteDetails.id"].split(" ", 2)[1] +
                    "&userId=" +
                    userInfo.id
                    : `/profile/${item["userDetails.profileId"]}`;
                  const instFirName =
                    item["userDetails.firstName"] !== null
                      ? item["userDetails.firstName"]
                      : item["instituteDetails.name"].split(" ", 1)[0];

                  const instLasName =
                    item["userDetails.lastName"] !== null
                      ? item["userDetails.lastName"]
                      : item["instituteDetails.name"].split(" ", 2)[1];
                  return (
                    <div className="d-flex align-items-center mb-3" key={index}>
                      <Link route={CuriousesProfileRoute}>
                        <a
                          className="rounded-pill overflow-hidden w-h-70"
                          title={`${instFirName !== null ? instFirName : ""
                            } ${instLasName !== null ? instLasName : ""}`}
                          onClick={() =>
                            dispatch(toggleModals({ likelistcounter: false }))
                          }
                        >
                          <picture className="user-profile-pic rounded-pill overflow-hidden">
                            <source
                              src={
                                imagePreferenceHandler(item)
                                  ? item["instituteDetails.id"]
                                    ? item["instituteDetails.logo"]
                                    : item["userDetails.profilePicURL"]
                                  : ""
                              }
                              type="image/jpg"
                            />
                            <img
                              src={
                                imagePreferenceHandler(item)
                                  ? item["instituteDetails.id"]
                                    ? item["instituteDetails.logo"]
                                    : item["userDetails.profilePicURL"]
                                  : ""
                              }
                              alt="profilePicURL"
                              width="70"
                              height="70"
                              onError={(e) => {
                                onImageError(
                                  e,
                                  "profile",
                                  `${instFirName} ${lastNameHandler(item) ? instLasName : ""
                                  }`
                                );
                              }}
                            />
                          </picture>
                        </a>
                      </Link>
                      <div className="pl-3 text-left">
                        <Link route={CuriousesProfileRoute}>
                          <a
                            title={`${instFirName !== null ? instFirName : ""
                              } ${instLasName !== null ? instLasName : ""}`}
                            onClick={() =>
                              dispatch(toggleModals({ likelistcounter: false }))
                            }
                          >
                            <h5 className="card-title font-16 text-secondary font-medium mb-10">
                              {instFirName}
                              {lastNameHandler(item) ? instLasName : ""}
                            </h5>
                          </a>
                        </Link>
                        <p className="font-12 text-gary font-weight-light mb-0">
                          {item["userDetails.shortDescription"] !== null
                            ? item["userDetails.shortDescription"]
                            : ""}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </Tab>
            )}
          </Tabs>
        </div>
      </Modal.Body>
    </Fragment>
  );
};
