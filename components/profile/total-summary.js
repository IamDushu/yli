import React, { Fragment } from "react";
import { Card, Row, Col } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { selectUserCountData } from "../../store/selectors/user";
import { compactNumber } from "../../utils";

const TotalSummary = () => {
  const [lang] = useTranslation("language");
  const data = useSelector(selectUserCountData);
  if (!data) return <Fragment></Fragment>;

  // const { totalViews, totalLikes, totalShares, publishedPostsCount, totalPostCount } = data;
  const { totalLikes, totalPosts, totalPostShare } = data;
  return (
    <Card className="mt-2 d-none">
      <Card.Body className="m-sm-2">
        <Row>
          <Col md={3} xs={6}>
            <div className="d-flex align-items-center mb-md-0 mb-3">
              <div className="bg-malibu rounded-8 mr-2 flex-shrink-0 d-flex align-items-center justify-content-center">
                <em className="icon icon-post-publish font-26"></em>
              </div>
              <div>
                <h5 className="text-body-16">
                  {totalPosts ? compactNumber(totalPosts, 2) : 0}
                </h5>
                <h6 className="text-body-14 font-weight-normal m-0">
                  {lang("USER_PROFILE_SUMMARY.TEXT.POST_PUBLISHED")}
                </h6>
              </div>
            </div>
          </Col>
          <Col md={3} xs={6}>
            <div className="d-flex align-items-center mb-md-0 mb-3">
              <div className="bg-malibu rounded-8 mr-2 flex-shrink-0 d-flex align-items-center justify-content-center">
                <em className="icon icon-blue-eyes font-20"></em>
              </div>
              <div>
                <h5 className="text-body-16">
                  {data?.totalProfileViewed ? data?.totalProfileViewed : 0}
                </h5>
                <h6 className="text-body-14 font-weight-normal m-0">
                  {lang("USER_PROFILE_SUMMARY.TEXT.TOTAL_VIEWS")}
                </h6>
              </div>
            </div>
          </Col>
          <Col md={3} xs={6}>
            <div className="d-flex align-items-center">
              <div className="bg-malibu rounded-8 mr-2 flex-shrink-0 d-flex align-items-center justify-content-center">
                <em className="icon icon-profile-like font-26"></em>
              </div>
              <div>
                <h5 className="text-body-16">
                  {totalLikes ? compactNumber(totalLikes, 2) : 0}
                </h5>
                <h6 className="text-body-14 font-weight-normal m-0">
                  {lang("USER_PROFILE_SUMMARY.TEXT.TOTAL_LIKES")}
                </h6>
              </div>
            </div>
          </Col>
          <Col md={3} xs={6}>
            <div className="d-flex align-items-center">
              <div className="bg-malibu rounded-8 mr-2 flex-shrink-0 d-flex align-items-center justify-content-center">
                <em className="icon icon-total-shares font-22"></em>
              </div>
              <div>
                <h5 className="text-body-16">
                  {totalPostShare ? compactNumber(totalPostShare, 2) : 0}
                </h5>
                <h6 className="text-body-14 font-weight-normal m-0">
                  {lang("USER_PROFILE_SUMMARY.TEXT.TOTAL_SHARES")}
                </h6>
              </div>
            </div>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};
export default TotalSummary;
