import React, { Fragment, useEffect, useState } from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "@routes";
import { useDispatch, useSelector } from "react-redux";
import { getInstituteInfo } from "store/actions/aboutUs";

import { useTranslation } from "react-i18next";
import { onImageError } from "utils";
import { addFollowUpdate } from "store/actions";
import { selectUserInfo } from "store/selectors/user";
import { Follow, UnFollow } from "components/svg/connections";
const AboutInsititue = ({ rating, instituteDetails }) => {
  const [lang] = useTranslation("language");
  const dispatch = useDispatch();
  const { aboutInstitute } = useSelector((state) => state.aboutUsInfo);
  const [followUnfollow, setfollowUnfollow] = useState(false);
  const userInfo = useSelector(selectUserInfo);

  const [isReadMore, setIsReadMore] = useState(true);
  useEffect(() => {
    if (instituteDetails?.id) dispatch(getInstituteInfo(instituteDetails?.id));

    setfollowUnfollow(aboutInstitute?.isFollow?.isFollow);
  }, [instituteDetails?.id, aboutInstitute?.isFollow?.isFollow]);

  return (
    <Fragment>
      <Card className="my-4">
        <Card.Body className="p-4">
          <div className="d-flex flex-wrap flex-md-nowrap justify-content-between mb-2">
            <h6 className="mb-md-2 mb-3">
              {lang("ROOMS.ABOUT")} {aboutInstitute?.name}
            </h6>
            {userInfo?.id !== aboutInstitute?.userDetails?.id && (
              <div className="">
                <Button
                  variant="outline-info-btn btn-outline-primary btn-small-icon w-90-px"
                  // size="sm"
                  title={!followUnfollow ? "Follow" : "Unfollow"}
                  // className="w-h-32 p-0 mr-2 btn-circle"
                  onClick={() => {
                    if (!followUnfollow) {
                      dispatch(
                        addFollowUpdate({
                          isFollow: true,
                          learningInstituteId: aboutInstitute?.id,
                        })
                      ).then((res) => {
                        if (res) setfollowUnfollow(true);
                      });
                    } else {
                      dispatch(
                        addFollowUpdate({
                          isFollow: false,
                          learningInstituteId: aboutInstitute?.id,
                        })
                      ).then((res) => {
                        if (res) setfollowUnfollow(false);
                      });
                    }
                  }}
                >
                  {!followUnfollow ? (
                    <>
                      <Follow /> Follow
                    </>
                  ) : (
                    <>
                      <UnFollow />
                      UnFollow
                    </>
                  )}
                </Button>
              </div>
            )}
          </div>
          <div className="d-flex flex-wrap justify-content-between flex-md-nowrap feedback-list-wrap">
            <div className="d-flex align-items-center">
              <div className="overflow-hidden rounded-pill flex-shrink-0 mr-2">
                <picture onContextMenu={(e) => e.preventDefault()}>
                  <source srcSet={aboutInstitute?.logo} type="image/png" />
                  <img
                    src={aboutInstitute?.logo || ""}
                    alt="User"
                    width="60"
                    height="60"
                    onError={(e) => {
                      onImageError(e, "profile", aboutInstitute?.name);
                    }}
                  />
                </picture>
              </div>
              <div className="ml-3">
                <h6
                  className="text-body-14 mb-0 font-18 cursor-pointer"
                  onClick={() => {
                    window.open(
                      `/profile/institute-profile?instituteId=${aboutInstitute?.id}&name=${aboutInstitute?.name}&userId=${aboutInstitute?.userDetails?.id}`,
                      "_blank"
                    );
                  }}
                >
                  {aboutInstitute?.name}
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
                    {aboutInstitute?.student}
                  </span>
                </li>
                <li className="px-3 mb-md-2">
                  <small className="text-secondary-75">
                    {lang("GROWTH_TOOL.COURSES")}
                  </small>
                  <span className="font-16 font-medium d-block pt-1 text-center">
                    {aboutInstitute?.course}
                  </span>
                </li>
                <li className="mb-2 mb-sm-0">
                  <small className="text-secondary-75">
                    {lang("COMMON.TOTAL_REVIEWS")}
                  </small>
                  <span className="font-16 font-medium d-block pt-1 text-center">
                    {aboutInstitute?.reviews}
                  </span>
                </li>
              </ul>
            </div>
          </div>
          <div className="desc mt-sm-3">
            <h3 className="h6">{lang("ROOMS.FULL_DESCRIPTION")}</h3>
            <p className="text-body-14 m-0 font-weight-normal">
              <p
                dangerouslySetInnerHTML={{
                  __html: isReadMore
                    ? aboutInstitute?.description?.slice(0, 200)
                    : aboutInstitute?.description,
                }}
              />

              {aboutInstitute?.description &&
                aboutInstitute?.description?.length > 200 && (
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
export default AboutInsititue;
