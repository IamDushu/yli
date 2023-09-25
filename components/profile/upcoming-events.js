import React, { Fragment } from "react";
import { Card, Row, Col, Button } from "react-bootstrap";
import { Link } from "@routes";
import Slider from "react-slick";
import { useSelector } from "react-redux";
import { formatDateTime, minuteToHour } from "utils";
import moment from "moment";
import { useRouter } from "next/router";

var settings = {
  dots: true,
  arrows: true,
  infinite: false,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 3,
  responsive: [
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
      },
    },
    {
      breakpoint: 767,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};
const EventSliderCard = ({ showEdit = true }) => {
  const router = useRouter();
  const { instituteId, companyId } = router.query;
  const homeDetailLi = useSelector(
    (state) => state?.learningInstitute?.instituteHomeDetails
  );
  const homeDetailCo = useSelector(
    (state) => state?.company?.companyHomeDetails
  );
  const homeDetail =
    instituteId !== undefined
      ? homeDetailLi
      : companyId !== undefined
      ? homeDetailCo
      : [];
  return (
    <Fragment>
      <Card className="my-4 my-courses-wrap video-courses-rightbar custom-slick">
        <Card.Body>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h3 className="h6">Upcoming Events</h3>
            {showEdit && (
              <a className="text-body-14 m-0 font-font-weight-normal text-primary">
                Edit
              </a>
            )}
          </div>
          <Slider {...settings}>
            {homeDetail?.upcomingEvents?.rows?.map((data, index) => (
              <Card className="secondary-card h-100" key={"event-" + index}>
                <Card.Body>
                  <div className="courses-img position-relative">
                    <picture onContextMenu={(e) => e.preventDefault()}>
                      <source
                        srcSet={data?.eventsData?.imageURL}
                        type="image/png"
                      />
                      <img
                        src={data?.eventsData?.imageURL}
                        alt="My Courses"
                        width="260"
                        height="140"
                        onError={(e) => {
                          onImageError(e);
                        }}
                      />
                    </picture>
                    {/* <span className="available-status  text-uppercase font-12 rounded-pill bg-white font-weight-semibold">
                      Offline
                    </span> */}

                    {/* <div class="m-0 d-flex align-items-center rating">
                      <em class="icon icon-star-fill font-20 pr-2"></em>
                      <span class="font-12 font-weight-semibold text-white">
                        4.3
                      </span>
                    </div> */}
                  </div>
                  <div className="courses-info p-3">
                    <h6 className="font-weight-semibold">
                      {data?.eventsData?.title}
                    </h6>
                    {/* <span className="text-body-14 font-weight-normal">
                      Lorenzo Zurzolo
                    </span> */}
                    {/*  */}
                    <div className="event-timing my-2">
                      <div className="d-flex mb-2">
                        <small className="text-body-12 text-secondary-75 w-65-px">
                          Date
                        </small>
                        <small className="ml-4 ">
                          <span className="text-body-12 text-secondary font-font-weight-normal d-block">
                            {formatDateTime(data?.eventDate)}{" "}
                          </span>
                          <span className="font-10 font-font-weight-normal  d-block">
                            Available same day
                          </span>
                        </small>
                      </div>
                      <div className="d-flex mb-2">
                        <small className="text-body-12 text-secondary-75 w-65-px">
                          Start Time
                        </small>
                        <small className="ml-4 ">
                          <span className="text-body-12 text-secondary font-font-weight-normal d-block">
                            {moment(data?.eventDate).format("hh:mm a")}
                          </span>
                        </small>
                      </div>
                      <div className="d-flex mb-0">
                        <small className="text-body-12 text-secondary-75 w-65-px">
                          Duration
                        </small>
                        <small className="ml-4 ">
                          <span className="text-body-12 text-secondary font-font-weight-normal d-block">
                            {minuteToHour(data?.eventsData?.duration)} hr
                          </span>
                        </small>
                      </div>
                    </div>
                    {/*  */}
                    <div className="package-info mt-2">
                      <div className="d-flex justify-content-between mb-2">
                        <small className="text-secondary w-25">Free</small>
                        <small>
                          <span className="text-body-12 font-weight-semibold text-secondary">
                            {data?.eventsData?.freePrice}
                          </span>{" "}
                          <span className="text-body-12 font-weight-semibold text-secondary">
                            &euro;
                          </span>
                        </small>
                      </div>
                      <div className="d-flex justify-content-between mb-2">
                        <small className="text-secondary">Lite</small>
                        <small>
                          <span className="text-decoration-line-through text-body-12 font-weight-semibold">
                            {data?.eventsData?.freePrice} &euro;
                          </span>
                          <span className="text-body-12 font-weight-semibold text-secondary">
                            {" "}
                            {data?.eventsData?.litePrice}
                          </span>
                          <span className="text-body-12 font-weight-semibold text-secondary">
                            {" "}
                            &euro;
                          </span>
                        </small>
                      </div>
                      <div className="d-flex justify-content-between mb-1">
                        <small className="text-secondary">Premium</small>
                        <small>
                          <span className="text-decoration-line-through text-body-12 font-weight-semibold">
                            {data?.eventsData?.freePrice} &euro;
                          </span>
                          <span className="text-body-12 font-weight-semibold text-secondary">
                            {" "}
                            {data?.eventsData?.premiumPrice}
                          </span>
                          <span className="text-body-12 font-weight-semibold text-secondary">
                            {" "}
                            &euro;
                          </span>
                        </small>
                      </div>

                      <div className="text-center mt-3">
                        <Button
                          variant="btn btn-primary w-100 btn-sm px-4"
                          size="sm"
                        >
                          View User Feedback
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            ))}
          </Slider>
        </Card.Body>
      </Card>
    </Fragment>
  );
};
export default EventSliderCard;
