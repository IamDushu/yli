import React, { Fragment, useEffect, useState } from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import { Link } from "@routes";
import { useDispatch, useSelector } from "react-redux";
import { aboutTeacherInfo } from "store/actions/aboutUs";
import {
  changeConnectionStatus,
  followUser,
  sendConnectionRequest,
  unfollowUser,
} from "store/actions/connections";
import { useTranslation } from "react-i18next";
import { onImageError } from "utils";
import { selectUserInfo } from "store/selectors/user";
import {
  Connect,
  Follow,
  RejectRequest,
  UnFollow,
} from "components/svg/connections";
const AboutTeacher = ({
  userDetails,
  rating,
  instituteDetails,
  companyDetails,
}) => {
  const [lang] = useTranslation("language");
  const dispatch = useDispatch();
  const { aboutTeacher } = useSelector((state) => state.aboutUsInfo);
  const userInfo = useSelector(selectUserInfo);
  const [followUnfollow, setfollowUnfollow] = useState(false);
  const [connectWithdraw, setconnectWithdraw] = useState(false);

  const [isReadMore, setIsReadMore] = useState(true);
  useEffect(() => {
    if (userDetails?.id) dispatch(aboutTeacherInfo(userDetails?.id));
    setfollowUnfollow(aboutTeacher?.isFollow?.isFollow);
    setconnectWithdraw(aboutTeacher?.withDrawDetails?.status === "pending");
  }, [
    userDetails?.id,
    aboutTeacher?.isFollow?.isFollow,
    aboutTeacher?.isConnection?.isConnection,
  ]);

  return (
    <Fragment>
      <Card className="my-3 my-sm-4">
        <Card.Body className="p-4">
          <div className="mb-2">
            <Row className="align-items-center">
              <Col md={6}>
                <h6 className="mb-md-2 mb-3 font-18">
                  {lang("ROOMS.ABOUT")}
                  {instituteDetails
                    ? ` ${instituteDetails?.name}`
                    : companyDetails
                    ? ` ${companyDetails?.companyName}`
                    : ` Teacher`}
                </h6>
              </Col>
              <Col md={6} className="text-right">
                {userInfo?.id !== aboutTeacher?.id && (
                  <div className="d-md-block d-flex">
                    <Button
                      variant="outline-info-btn btn-outline-primary btn-small-icon w-90-px font-md-12"
                      // size="sm"
                      // variant="btn btn-outline-primary btn-small-icon"
                      title={!followUnfollow ? "Follow" : "UnFollow"}
                      // className="w-h-32 p-0 mr-2 btn-circle"
                      onClick={() => {
                        if (!followUnfollow) {
                          dispatch(followUser(aboutTeacher?.id));
                          setfollowUnfollow(true);
                        } else {
                          dispatch(unfollowUser(aboutTeacher?.id));
                          setfollowUnfollow(false);
                        }
                      }}
                    >
                      {!followUnfollow ? (
                        <>
                          <Follow />
                          Follow
                        </>
                      ) : (
                        <>
                          <UnFollow />
                          Unfollow
                        </>
                      )}
                    </Button>
                    {!aboutTeacher?.isConnection?.isConnection && (
                      <Button
                        variant="outline-info-btn btn-outline-primary btn-small-icon w-90-px font-md-12"
                        // size="sm"
                        className=" ml-2 "
                        title={!connectWithdraw ? "Connect" : "Reject"}
                        onClick={() => {
                          if (!connectWithdraw) {
                            dispatch(sendConnectionRequest(aboutTeacher?.id));
                            setconnectWithdraw(true);
                          } else {
                            dispatch(
                              changeConnectionStatus({
                                id: aboutTeacher?.withDrawDetails?.id,
                                status: "withdrawl",
                              })
                            );
                            setconnectWithdraw(false);
                          }
                        }}
                      >
                        {!connectWithdraw ? (
                          <>
                            <Connect />
                            Connect
                          </>
                        ) : (
                          <>
                            <RejectRequest />
                            Reject
                          </>
                        )}
                      </Button>
                    )}
                  </div>
                )}
              </Col>
            </Row>
          </div>
          <div className="d-flex flex-wrap justify-content-between flex-md-nowrap feedback-list-wrap">
            <div className="d-flex align-items-center">
              <div className="overflow-hidden rounded-pill flex-shrink-0">
                <picture onContextMenu={(e) => e.preventDefault()}>
                  <source
                    srcSet={
                      instituteDetails
                        ? instituteDetails?.logo
                        : companyDetails
                        ? companyDetails?.logo
                        : userDetails?.profilePicURL
                    }
                    type="image/png"
                  />
                  <img
                    src={
                      instituteDetails
                        ? instituteDetails?.logo || ""
                        : companyDetails
                        ? companyDetails?.logo || ""
                        : userDetails?.profilePicURL || ""
                    }
                    alt="User"
                    width="60"
                    height="60"
                    onError={(e) => {
                      onImageError(
                        e,
                        "profile",
                        `${
                          instituteDetails
                            ? instituteDetails?.name
                            : companyDetails
                            ? companyDetails?.companyName
                            : userDetails?.firstName +
                              " " +
                              userDetails?.lastName
                        }`
                      );
                    }}
                  />
                </picture>
              </div>
              <div className="ml-3">
                  <h6 className="text-body-14 mb-0 font-18 cursor-pointer" onClick={()=>{
                    window.open(instituteDetails?.id
                      ? `/profile/institute-profile?instituteId=${instituteDetails?.id}&name=${instituteDetails?.name}&userId=${instituteDetails?.userId}`
                      : companyDetails?.id
                      ? `/profile/company-profile?companyId=${companyDetails?.id}&name=${companyDetails?.companyName}&userId=${companyDetails?.userId}`
                      : `/profile/${userDetails?.profileId}`,"_blank")
                  }}>
                    {instituteDetails
                      ? instituteDetails?.name
                      : companyDetails
                      ? companyDetails?.companyName
                      : `${userDetails?.firstName} ${userDetails?.lastName}`}
                  </h6>
                <div className="d-flex align-items-center">
                  <em className="icon icon-star-fill font-16 pr-1"></em>
                  <span className="pt-1 font-medium font-12">{rating}</span>
                </div>
              </div>
            </div>
            <div className="d-flex justify-content-between mt-lg-4 mt-3 ml-md-3 mb-0">
              <ul className="list-unstyled d-flex flex-wrap flex-md-nowrap">
                <li className="mb-2 mb-sm-0">
                  <small className="text-secondary-75 text-body-12">
                    {lang("COMMON.STUDENT")}
                  </small>
                  <span className="text-body-16 d-block pt-1 text-center">
                    {aboutTeacher?.student}
                  </span>
                </li>
                <li className="px-3 mb-md-2">
                  <small className="text-secondary-75">
                    {lang("GROWTH_TOOL.COURSES")}
                  </small>
                  <span className="font-16 font-medium d-block pt-1 text-center">
                    {aboutTeacher?.course}
                  </span>
                </li>
                <li className="mb-2 mb-sm-0">
                  <small className="text-secondary-75">
                    {lang("COMMON.TOTAL_REVIEWS")}
                  </small>
                  <span className="font-16 font-medium d-block pt-1 text-center">
                    {aboutTeacher?.reviews}
                  </span>
                </li>
              </ul>
            </div>
          </div>
          <div className="desc mt-sm-3">
            <h6 className="h6 font-18">{lang("ROOMS.FULL_DESCRIPTION")}</h6>
            <p className="text-body-14 m-0 font-weight-normal">
              <p
                dangerouslySetInnerHTML={{
                  __html: isReadMore
                    ? aboutTeacher?.briefDescription?.slice(0, 200)
                    : aboutTeacher?.briefDescription,
                }}
              />

              {aboutTeacher?.briefDescription &&
                aboutTeacher?.briefDescription?.length > 200 && (
                  <a
                    className="text-blue-dress"
                    onClick={() => setIsReadMore(!isReadMore)}
                  >
                    {isReadMore
                      ? lang("COMMON.READ_MORE")
                      : lang("COMMON.READ_LESS")}
                  </a>
                )}
            </p>
          </div>
        </Card.Body>
      </Card>
    </Fragment>
  );
};
export default AboutTeacher;
