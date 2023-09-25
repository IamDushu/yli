import React from "react";
import { Card, Col, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import moment from "moment";
import momentTz from "moment-timezone";
import { useRouter } from "next/router";
import StarRatings from "react-star-ratings";
// Import the FontAwesomeIcon component
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// import the icons you need
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { VIRTUAL_EVENT_DETAILS } from "routes/urls";
import { selectUserInfo } from "store/selectors/user";
import { useSelector } from "react-redux";

function VirtualEventsList({ rooms, eventType }) {
  const [lang] = useTranslation("language");
  const router = useRouter();
  const userInfo = useSelector(selectUserInfo);

  return (
    // new card design
    <Col md={4} sm={6} className="d-flex w-100 p-0 pr-3">
      <Card className="secondary-card abstract-card-v2 mb-3">
        <Card.Body className="d-flex flex-column h-100">
          <div
            className="position-relative pointer"
            onClick={() => {
              router.push({
                pathname: VIRTUAL_EVENT_DETAILS + rooms?.id + "/false",
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
                pathname: VIRTUAL_EVENT_DETAILS + rooms?.id + "/false",
              });
            }}
          >
            <div className="title-container">
              <h6 className="font-weight-bold text-body-16 mb-1 pointer ellipsis">
                {rooms?.title?.charAt(0).toUpperCase() + rooms?.title?.slice(1)}
              </h6>
            </div>

            <div className="package-info">
              <div className="d-flex justify-content-between">
                <small className="font-12 font-weight-semi-bold pb-1">
                  {userInfo?.timezone
                    ? momentTz(rooms?.startDate)
                        .tz(userInfo?.timezone)
                        .format("DD MMM YYYY")
                    : moment(rooms?.startDate).format("DD MMM YYYY")}{" "}
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
                  <div className="d-flex pointer chevron-right-icon-bg">
                    <FontAwesomeIcon
                      className="align-items-center chevron-right-icon"
                      icon={faChevronRight}
                    />
                  </div>
                </div>

                {eventType === "coaching-room" && (
                  <img
                    src="/assets/images/coaching-room-svg.svg"
                    alt="coaching-room"
                    width="20"
                    height="20"
                  />
                )}
                {eventType === "master-class" && (
                  <img
                    src="/assets/images/masterclass-svg.svg"
                    alt="master"
                    width="20"
                    height="20"
                  />
                )}
                {eventType === "webinar" && (
                  <img
                    src="/assets/images/webinar-svg.svg"
                    alt="webinar"
                    width="20"
                    height="20"
                  />
                )}
                {eventType === "training-room" && (
                  <img
                    src="/assets/images/offline-icon-board-svg.svg"
                    alt="traning-room"
                    width="20"
                    height="20"
                  />
                )}
                {eventType === "event" && (
                  <img
                    src="/assets/images/event-svg.svg"
                    alt="event"
                    width="20"
                    height="20"
                  />
                )}
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
}

export default VirtualEventsList;
