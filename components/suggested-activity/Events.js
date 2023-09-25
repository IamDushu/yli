import React, { useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import moment from "moment";
import StarRatings from "react-star-ratings";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { VIRTUAL_EVENT_DETAILS } from "../../routes/urls";

export default function Events({ activityData, addtoGrowthSAEvents, router }) {
  const [lang] = useTranslation("language");
  const [showEvents, setShowEvents] = useState(4);
  return (
    activityData?.event?.length > 0 && (
      <div className="border-bottom border-dark">
        <div className="px-3 px-md-4 pt-2 pt-md-3">
          <h6 className="mb-0">{lang("JOBS.JOB_OFFERS.EVENTS")}</h6>
        </div>
        <div className="d-flex flex-xl-nowrap flex-wrap p-3 p-md-4">
          <div className="video-courses-rightbar w-100">
            <Row className="row-col-10 three-grid-spacing">
              <Col lg={12}>
                <em></em>
              </Col>
            </Row>
            {activityData?.event?.length > 0 && (
              <Row className="row-col-10 three-grid-spacing">
                {activityData?.event?.map(
                  (event, index) =>
                    index + 1 <= showEvents && (
                      <Col lg={4} sm={6} key={`event-${index}`}>
                        {/* <Card className="secondary-card h-100">
                          <Card.Body className="d-flex flex-column">
                            <div
                              className="courses-img position-relative pointer"
                              onClick={() =>
                                router.push(`/virtual-events/${event?.id}`)
                              }
                            >
                              <picture
                                onContextMenu={(e) => e.preventDefault()}
                              >
                                <source
                                  src={event?.imageURL}
                                  type="image/png"
                                />
                                <img
                                  src={event?.imageURL}
                                  alt="My Room"
                                  width="250"
                                  height="120"
                                  className="w-100"
                                  onError={(e) => {
                                    onImageError(e, "myProfile");
                                  }}
                                />
                              </picture>
                              <span className="available-status text-uppercase font-12 rounded-pill bg-white font-weight-semibold">
                                {event?.virtualEventType}
                              </span>
                              <div className="m-0 d-flex align-items-center rating">
                                <em className="icon icon-star-fill font-20 pr-2"></em>
                                <span className="pt-1 font-weight-semibold font-12 text-white">
                                  {event?.rating}
                                </span>
                              </div>
                            </div>
                            <div className="a courses-info p-2 p-lg-3 d-flex flex-column h-100">
                              <h6
                                className="text-ellipsis text-body-16 pointer pb-1"
                                onClick={() =>
                                  router.push(`/virtual-events/${event?.id}`)
                                }
                              >
                                {event?.title}
                              </h6>
                              <small className="text-body-14 font-weight-normal">
                                {event?.UserDetails?.firstName +
                                  " " +
                                  event?.UserDetails?.lastName}
                              </small>
                              <div className="package-info d-flex flex-column h-100 mt-3">
                                <div className="d-flex justify-content-between mb-2">
                                  <small className="text-secondary font-12">
                                    {lang("JOBS.JOB_OFFERS.FREE")}
                                  </small>
                                  <small className="font-12">
                                    <span className="text-secondary font-weight-semibold">
                                      {event?.freePrice}
                                    </span>
                                    <span className="font-weight-semibold font-14 pl-1">
                                      &euro;
                                    </span>
                                  </small>
                                </div>
                                <div className="d-flex justify-content-between mb-2">
                                  <small className="text-secondary font-12">
                                    {lang("JOBS.JOB_OFFERS.LITE")}
                                  </small>
                                  <small className="font-12">
                                    <span className="text-decoration-line-through text-gray">
                                      {event?.freePrice}&euro;
                                    </span>
                                    <span className="text-secondary font-weight-semibold">
                                      {event?.lighPrice}
                                    </span>
                                    <span className="font-weight-semibold font-14">
                                      &euro;
                                    </span>
                                  </small>
                                </div>
                                <div className="d-flex justify-content-between mb-3">
                                  <small className="text-secondary font-12">
                                    {lang("JOBS.JOB_OFFERS.PREMIUM")}
                                  </small>
                                  <small className="font-12">
                                    <span className="text-decoration-line-through text-gary">
                                      {event?.freePrice}&euro;
                                    </span>
                                    <span className="text-secondary font-weight-semibold">
                                      {event?.premiumPrice}
                                    </span>
                                    <span className="font-weight-semibold font-14">
                                      &euro;
                                    </span>
                                  </small>
                                </div>
                                {event?.gmData === null ? (
                                  <div className="text-center mt-auto">
                                    <Button
                                      variant="outline-info"
                                      className="mx-3 px-3"
                                      onClick={() =>
                                        addtoGrowthSAEvents(
                                          event?.id,
                                          event?.title,
                                          event?.virtualEventType
                                        )
                                      }
                                    >
                                      <em className="icon icon-plus-primary font-12 mr-2 ml-auto hover-white"></em>
                                      Add To GM
                                    </Button>
                                  </div>
                                ) : event?.gmData !== null ? (
                                  <Button
                                    variant="outline-info"
                                    className="mx-3 px-3"
                                  >
                                    <em className="font-12 mr-2 ml-auto hover-white"></em>
                                    Added to GM
                                  </Button>
                                ) : (
                                  ""
                                )}
                              </div>
                            </div>
                          </Card.Body>
                        </Card> */}
                        {/* new */}
                        <Card className="secondary-card abstract-card-v2 h-100">
                          <Card.Body className="d-flex flex-column h-100">
                            {/* <Link
                                    route={
                                      VIRTUAL_EVENT_DETAILS + id + "/false"
                                    }
                                  > */}
                            {/* <a> */}
                            <div
                              className="position-relative pointer"
                              onClick={() => {
                                router.push(`/virtual-events/${event?.id}`);
                              }}
                            >
                              <picture
                                onContextMenu={(e) => e.preventDefault()}
                              >
                                <source
                                  srcSet={
                                    event?.imageURL
                                      ? event?.imageURL
                                      : "../assets/images/user-no-image.png"
                                  }
                                  type="image/png"
                                />
                                <img
                                  src={
                                    event?.imageURL
                                      ? event?.imageURL
                                      : "../assets/images/user-no-image.png"
                                  }
                                  alt="My Room"
                                  height="155"
                                  className="w-100"
                                  onError={(e) => onImageError(e)}
                                />
                              </picture>
                            </div>
                            {/* </a> */}
                            {/* </Link> */}

                            <div className="courses-info px-3 pt-3 pb-2 d-flex flex-column">
                              {/* <Link
                                      route={
                                        VIRTUAL_EVENT_DETAILS + id + "/false"
                                      }
                                    >
                                      <a> */}
                              <div
                                className="title-container"
                                onClick={() => {
                                  router.push(`/virtual-events/${event?.id}`);
                                }}
                              >
                                <h6 className="font-weight-bold text-body-16 mb-0 pointer ellipsis">
                                  {event?.title?.charAt(0).toUpperCase() +
                                    event?.title?.slice(1)}
                                </h6>
                              </div>
                              {/* </a>
                                    </Link> */}
                              <div className="text-ellipsis d-flex align-items-center justify-content-between">
                                <small className="font-weight-semi-bold text-card-name text-body-12">
                                  {event?.userDetails?.firstName}{" "}
                                  {event?.userDetails?.lastName}
                                </small>
                              </div>

                              <div className="package-info">
                                <div className="d-flex justify-content-between">
                                  <div className="">
                                    <small className="font-12 font-weight-semi-bold">
                                      {`${moment(event?.startDate).format(
                                        "DD/MM/YY"
                                      )}`}{" "}
                                      &bull;{" "}
                                      {moment(event?.startDate).format(
                                        "hh:mm a"
                                      )}
                                    </small>
                                  </div>
                                </div>
                                <div className="d-flex justify-content-between">
                                  <div className="d-flex align-items-center">
                                    <StarRatings
                                      rating={event?.rating ?? 0}
                                      starDimension="15px"
                                      starSpacing="1px"
                                      starRatedColor="#FFC635"
                                    />
                                    <div
                                      className="d-flex pointer chevron-right-icon-bg"
                                      onClick={() =>
                                        router.push(
                                          `/virtual-events/${event?.id}`
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
                                      src={"/assets/images/ic-events.svg"}
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
                                        addtoGrowthSAEvents(
                                          event?.id,
                                          event?.title,
                                          event?.virtualEventType
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
                                    {event?.freePrice ? event?.freePrice : "0"}
                                  </span>{" "}
                                  <span className="">YC</span>
                                </small>
                              </div>
                              {/* {event?.freePrice > 0 && ( */}
                              {event?.freePrice > 0 && (
                                <>
                                  <hr className="bg-paper-white m-0 course-card-hr"></hr>{" "}
                                  <div className="text-center flex-grow-1">
                                    <small className="font-weight-semibold font-12 d-inline-flex">
                                      {lang("COMMON.LITE")}
                                    </small>
                                    <small className="d-block font-weight-bold font-12">
                                      <span className="">
                                        {event?.litePrice}{" "}
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
                                        {event?.premiumPrice}{" "}
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
        {activityData?.event?.length > showEvents && (
              // <div className="text-center pt-4">
              //   <Button
              //     variant="outline-info"
              //     className="px-3 py-2"
              //     onClick={() =>
              //       setShowEvents((previouseCount) => previouseCount + 4)
              //     }
              //   >
              //     {lang("JOBS.JOB_OFFERS.LOAD_MORE")}
              //   </Button>
              // </div>
              <div className="people-tab-view-all-button  border-top border-geyser py-2">
                <span
                  className="people-tab-view-all-button-text"
                  onClick={() =>
                    setShowEvents((previouseCount) => previouseCount + 4)
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
