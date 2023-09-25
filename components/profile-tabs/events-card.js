import React from "react";
import momentTz from "moment-timezone";
import { Card, Col, Row } from "react-bootstrap";

import { onImageError } from "utils";
import StarRatings from "react-star-ratings";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";
import { VIRTUAL_EVENT_DETAILS } from "routes/urls";
import moment from "moment";
import { useSelector } from "react-redux";
import { selectUserInfo } from "store/selectors/user";

const EventCard = ({ eventData, pageSize, setPageSize }) => {
  const [lang] = useTranslation("language");
  const userInfo = useSelector(selectUserInfo);
  const router = useRouter();
  /*******************
        @purpose : Rander HTML/ React Components
        @Author : INIC
        ******************/
  return (
    <React.Fragment>
      <Row className="m-0 px-3">
        {eventData?.rows && eventData?.rows?.length > 0 ? (
          eventData?.rows
            ?.sort((a, b) => new Date(b.startDate) - new Date(a.startDate))
            .map((rooms, index) => {
              return (
                <Col
                  md={4}
                  sm={6}
                  className="d-flex w-100 p-0 pr-3"
                  key={"event-" + index}
                >
                  <Card className="secondary-card abstract-card-v2 mb-3">
                    <Card.Body className="d-flex flex-column h-100">
                      <div
                        className="position-relative pointer"
                        onClick={() => {
                          router.push({
                            pathname:
                              VIRTUAL_EVENT_DETAILS + rooms.id + "/false",
                          });
                        }}
                      >
                        <picture>
                          <source
                            srcSet={
                              rooms.imageURL
                                ? rooms.imageURL
                                : "../assets/images/user-no-image.png"
                            }
                            type="image/png"
                          />
                          <img
                            src={
                              rooms.imageURL
                                ? rooms.imageURL
                                : "../assets/images/user-no-image.png"
                            }
                            alt="My Room"
                            height="100"
                            onError={(e) => onImageError(e)}
                            className="w-100"
                          />
                        </picture>
                      </div>
                      <div
                        className="courses-info px-3 pt-3 pb-2 d-flex flex-column"
                        onClick={() => {
                          router.push({
                            pathname:
                              VIRTUAL_EVENT_DETAILS + rooms.id + "/false",
                          });
                        }}
                      >
                        <div className="title-container">
                          <h6 className="font-weight-bold text-body-16 mb-1 pointer ellipsis">
                            {rooms?.title?.charAt(0).toUpperCase() +
                              rooms?.title?.slice(1)}
                          </h6>
                        </div>

                        <div className="package-info">
                          <div className="d-flex justify-content-between">
                            <small className="font-12 font-weight-semi-bold pb-1">
                              {userInfo?.timezone
                                ? momentTz(rooms?.startDate)
                                    .tz(userInfo?.timezone)
                                    .format("DD MMM YYYY")
                                : moment(rooms?.startDate).format(
                                    "DD MMM YYYY"
                                  )}{" "}
                              &bull;{" "}
                              {userInfo?.timezone
                                ? momentTz(rooms?.startDate)
                                    .tz(userInfo?.timezone)
                                    .format("h:mm a")
                                : moment(rooms?.startDate).format("h:mm a")}
                            </small>
                          </div>

                          <div className="d-flex justify-content-between">
                            <div className="d-flex align-items-center">
                              <StarRatings
                                rating={rooms?.rating ?? 0}
                                starDimension="15px"
                                starSpacing="1px"
                                starRatedColor="#FFC635"
                              />
                              <div
                                className="d-flex pointer chevron-right-icon-bg"
                                // onClick={() => {
                                //   router.push({
                                //     pathname: "/profile/student-review",
                                //     query: {
                                //       sourceId: rooms.id,
                                //     },
                                //   });
                                // }}
                              >
                                <FontAwesomeIcon
                                  className="align-items-center chevron-right-icon"
                                  icon={faChevronRight}
                                />
                              </div>
                            </div>

                            <img
                              src="/assets/images/event-svg.svg"
                              alt="event"
                              width="20"
                              height="20"
                            />
                          </div>
                        </div>
                      </div>
                    </Card.Body>
                    <Card.Footer className="py-2 px-3 border-top">
                      <div className="justify-content-between d-flex align-items-center">
                        <div className="text-center flex-grow-1">
                          <small className="font-12 font-weight-semibold d-inline-flex">
                            {lang("COMMON.FREE")}
                          </small>
                          <small className="d-block font-12 font-weight-bold">
                            <span className="">
                              {rooms?.freePrice ? rooms?.freePrice : 0}
                            </span>{" "}
                            <span className="">YC</span>
                          </small>
                        </div>
                        <>
                          <hr className="bg-paper-white m-0 course-card-hr"></hr>{" "}
                          <div className="text-center flex-grow-1">
                            <small className="font-weight-semibold font-12 d-inline-flex">
                              {lang("COMMON.LITE")}
                            </small>
                            <small className="d-block font-weight-bold font-12">
                              <span className="">{rooms.litePrice} </span>
                              <span className="">YC</span>
                            </small>
                          </div>
                          <hr className="bg-paper-white m-0 course-card-hr"></hr>
                          <div className="text-center flex-grow-1">
                            <small className="font-weight-semibold font-12 d-inline-flex text-green-dark">
                              {lang("COMMON.PREMIUM")}
                            </small>
                            <small className="d-block font-weight-bold font-12">
                              <span className="">{rooms.premiumPrice} </span>
                              <span className="">YC</span>
                            </small>
                          </div>
                        </>
                        <div className="text-center mt-4"></div>
                      </div>
                    </Card.Footer>
                  </Card>
                </Col>
              );
            })
        ) : (
          <Col lg={12}>
            <Card className="border-0">
              <Card.Body>
                <em className="font-14 text-charcoal-grey d-block">
                  {" "}
                  {lang("PROFILE_TABS.NOEVENTFOUND")}
                </em>
              </Card.Body>
            </Card>
          </Col>
        )}
      </Row>
      {eventData?.rows?.length < eventData?.total && (
        <a
          className="border-top border-geyser text-body-14 py-12 text-center people-tab-view-all-button-text"
          onClick={() => setPageSize(pageSize + 3)}
        >
          Load More
        </a>
      )}
    </React.Fragment>
  );
};
export default EventCard;
