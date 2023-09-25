import React, { useState } from "react";
import { Card, Col, Row, Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import moment from "moment";
import StarRatings from "react-star-ratings";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
export default function Webinars({
  activityData,
  addtoGrowthSAWebinar,
  router,
}) {
  const [lang] = useTranslation("language");
  const [showWebinar, setShowWebinar] = useState(4);
  return (
    activityData?.webinar?.length > 0 && (
      <div className="border-bottom border-dark">
        <div className="px-3 px-md-4 pt-2 pt-md-3">
          <h6 className="mb-0">{lang("JOBS.JOB_OFFERS.WEBINARS")}</h6>
        </div>
        <div className="d-flex flex-xl-nowrap flex-wrap p-3 p-md-4">
          <div className="video-courses-rightbar w-100">
            <Row className="row-col-10 three-grid-spacing">
              <Col lg={12}>
                <em></em>
              </Col>
            </Row>
            {activityData?.webinar?.length > 0 && (
              <Row className="row-col-10 three-grid-spacing">
                {activityData?.webinar?.map(
                  (webinar, index) =>
                    index + 1 <= showWebinar && (
                      <Col lg={4} sm={6} key={`webinar-${index}`}>
                        <Card className="secondary-card abstract-card-v2 h-100">
                          <Card.Body className="d-flex flex-column h-100">
                            <div
                              className="position-relative pointer"
                              onClick={() => {
                                router.push(`/virtual-events/${webinar?.id}`);
                              }}
                            >
                              <picture
                                onContextMenu={(e) => e.preventDefault()}
                              >
                                <source
                                  srcSet={
                                    webinar?.imageURL
                                      ? webinar?.imageURL
                                      : "../assets/images/user-no-image.png"
                                  }
                                  type="image/png"
                                />
                                <img
                                  src={
                                    webinar?.imageURL
                                      ? webinar?.imageURL
                                      : "../assets/images/user-no-image.png"
                                  }
                                  alt="My Room"
                                  height="100"
                                  className="w-100"
                                  onError={(e) => onImageError(e)}
                                />
                              </picture>
                            </div>
                            <div className="courses-info px-3 pt-3 pb-2 d-flex flex-column">
                              <div
                                className="title-container"
                                onClick={() => {
                                  router.push(`/virtual-events/${webinar?.id}`);
                                }}
                              >
                                <h6 className="font-weight-bold text-body-16 mb-0 pointer ellipsis">
                                  {webinar?.title?.charAt(0).toUpperCase() +
                                    webinar?.title?.slice(1)}
                                </h6>
                              </div>
                              {/* </a>
                                    </Link> */}
                              <div className="text-ellipsis d-flex align-items-center justify-content-between">
                                <small className="font-weight-semi-bold text-card-name text-body-12">
                                  {webinar?.userDetails?.firstName}{" "}
                                  {webinar?.userDetails?.lastName}
                                </small>
                              </div>

                              <div className="package-info">
                                <div className="d-flex justify-content-between">
                                  <div className="">
                                    <small className="font-12 font-weight-semi-bold">
                                      {`${moment(webinar?.startDate).format(
                                        "DD/MM/YY"
                                      )}`}{" "}
                                      &bull;{" "}
                                      {moment(webinar?.startDate).format(
                                        "hh:mm a"
                                      )}
                                    </small>
                                  </div>
                                </div>
                                <div className="d-flex justify-content-between">
                                  <div className="d-flex align-items-center">
                                    <StarRatings
                                      rating={webinar?.rating ?? 0}
                                      starDimension="15px"
                                      starSpacing="1px"
                                      starRatedColor="#FFC635"
                                    />
                                    <div
                                      className="d-flex pointer chevron-right-icon-bg"
                                      onClick={() =>
                                        router.push(
                                          `/virtual-events/${webinar?.id}`
                                        )
                                      }
                                    >
                                      <FontAwesomeIcon
                                        className="align-items-center chevron-right-icon"
                                        icon={faChevronRight}
                                      />
                                    </div>
                                  </div>
                                  <div className="d-flex align-items-center">
                                    <img
                                      src={"/assets/images/ic-webinars.svg"}
                                      alt="virtual event"
                                      width="20"
                                      height="20"
                                      className="mr-2"
                                    />

                                    <img
                                      src={"/assets/images/icon-add-gm.svg"}
                                      alt="Add To GM"
                                      width="20"
                                      height="20"
                                      onClick={() =>
                                        addtoGrowthSAWebinar(
                                          webinar?.id,
                                          webinar?.title,
                                          webinar?.virtualEventType
                                        )
                                      }
                                      className="pointer"
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </Card.Body>
                          <Card.Footer className="py-2 px-3 m-0 border-top">
                            <div className="justify-content-between d-flex align-items-center">
                              <div className="text-center flex-grow-1">
                                <small className="font-12 font-weight-semibold d-inline-flex">
                                  {lang("COMMON.FREE")}
                                </small>
                                <small className="d-block font-12 font-weight-bold">
                                  <span className="">
                                    {webinar?.freePrice
                                      ? webinar?.freePrice
                                      : "0"}
                                  </span>{" "}
                                  <span className="">YC</span>
                                </small>
                              </div>
                              {/* {webinar?.freePrice > 0 && ( */}
                              {webinar?.freePrice > 0 && (
                                <>
                                  <hr className="bg-paper-white m-0 course-card-hr"></hr>{" "}
                                  <div className="text-center flex-grow-1">
                                    <small className="font-weight-semibold font-12 d-inline-flex">
                                      {lang("COMMON.LITE")}
                                    </small>
                                    <small className="d-block font-weight-bold font-12">
                                      <span className="">
                                        {webinar?.litePrice}{" "}
                                      </span>
                                      <span className="">YC</span>
                                    </small>
                                  </div>
                                  <hr className="bg-paper-white m-0 course-card-hr"></hr>
                                  <div className="text-center flex-grow-1">
                                    <small className="font-weight-semibold font-12 d-inline-flex text-green-dark">
                                      {lang("COMMON.PREMIUM")}
                                    </small>
                                    <small className="d-block font-weight-bold font-12">
                                      <span className="">
                                        {webinar?.premiumPrice}{" "}
                                      </span>
                                      <span className="">YC</span>
                                    </small>
                                  </div>
                                </>
                              )}
                            </div>
                          </Card.Footer>
                        </Card>
                      </Col>
                    )
                )}
              </Row>
            )}
          </div>
        </div>
        {activityData?.webinar?.length > showWebinar && (
          <div className="people-tab-view-all-button border-top border-geyser py-2">
            <span
              className="people-tab-view-all-button-text"
              onClick={() =>
                setShowWebinar((previouseCount) => previouseCount + 4)
              }
            >
              {lang("COMMON.LOAD_MORE")}
            </span>
          </div>
        )}
      </div>
    )
  );
}
