import React, { useState } from "react";
import { Card, Col, Row, Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { Link } from "@routes";
import StarRatings from "react-star-ratings";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

export default function Courses({ activityData, addtoGrowthSAC, router }) {
  const [lang] = useTranslation("language");
  const [showCourses, setShowCourses] = useState(4);
  return (
    activityData?.course?.length > 0 && (
      <div className="border-bottom border-dark">
        <div className="px-3 px-md-4 pt-2 pt-md-3">
          <h6 className="mb-0">{lang("JOBS.JOB_OFFERS.COURSES")}</h6>
        </div>
        <div className="d-flex flex-xl-nowrap flex-wrap px-3 px-md-4  pt-3 pt-md-4 pb-4">
          <div className="video-courses-rightbar w-100">
            <Row className="row-col-10 three-grid-spacing">
              <Col lg={12}>
                <em></em>
              </Col>
            </Row>
            {activityData?.course?.length > 0 && (
              <Row className="row-col-10 three-grid-spacing">
                {activityData?.course?.map(
                  (course, index) =>
                    index + 1 <= showCourses && (
                      <Col lg={4} sm={6} key={`course-${index}`}>
                        {/* <Card className="secondary-card h-100">
                          <Card.Body className="d-flex flex-column">
                            <div
                              className="courses-img position-relative pointer"
                              onClick={() =>
                                router.push(`/course-detail/${course?.id}`)
                              }
                            >
                              <picture
                                onContextMenu={(e) => e.preventDefault()}
                              >
                                <source
                                  src={course?.imageURL}
                                  type="image/png"
                                />
                                <img
                                  src={course?.imageURL}
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
                                {course?.courseType}
                              </span>
                              <div className="m-0 d-flex align-items-center rating">
                                <em className="icon icon-star-fill font-20 pr-2"></em>
                                <span className="pt-1 font-weight-semibold font-12 text-white">
                                  {course?.rating}
                                </span>
                              </div>
                            </div>
                            <div className="courses-info p-2 p-lg-3 d-flex flex-column h-100">
                              <h6
                                className="courses-info p-2 p-lg-3 d-flex flex-column h-100"
                                onClick={() =>
                                  router.push(`/course-detail/${course?.id}`)
                                }
                              >
                                {course?.title}
                              </h6>
                              <small className="text-body-14 font-weight-normal">
                                {course?.UserDetails?.firstName +
                                  " " +
                                  course?.UserDetails?.lastName}
                              </small>
                              <div className="package-info d-flex flex-column h-100 mt-3">
                                <div className="d-flex justify-content-between mb-2">
                                  <small className="text-secondary font-12">
                                    {lang("JOBS.JOB_OFFERS.FREE")}
                                  </small>
                                  <small className="font-12">
                                    <span className="text-secondary font-weight-semibold">
                                      {course?.freePrice}
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
                                      {course?.freePrice}&euro;
                                    </span>
                                    <span className="text-secondary font-weight-semibold">
                                      {course?.lighPrice}
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
                                      {course?.freePrice}&euro;
                                    </span>
                                    <span className="text-secondary font-weight-semibold">
                                      {course?.premiumPrice}
                                    </span>
                                    <span className="font-weight-semibold font-14">
                                      &euro;
                                    </span>
                                  </small>
                                </div>
                                {course?.gmData === null ? (
                                  <div className="text-center mt-auto">
                                    <Button
                                      variant="outline-info"
                                      className="mx-3 px-3"
                                      onClick={() =>
                                        addtoGrowthSAC(
                                          course?.id,
                                          course?.title,
                                          "course"
                                        )
                                      }
                                    >
                                      <em className="icon icon-plus-primary font-12 mr-2 ml-auto hover-white"></em>
                                      Add To GM
                                    </Button>
                                  </div>
                                ) : course?.gmData !== null ? (
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
                        {/* // new */}
                        <Card className="secondary-card abstract-card-v2 h-100">
                          <Card.Body className="d-flex flex-column h-100">
                            <Link
                              route={
                                course?.courseType === "other"
                                  ? course?.personalWebsiteLink
                                  : "/course-detail/" + course?.id
                              }
                            >
                              <a
                                {...(course?.courseType === "other"
                                  ? { target: "_blank" }
                                  : {})}
                              >
                                <div className="position-relative pointer">
                                  <picture>
                                    <source
                                      srcSet={course?.imageURL}
                                      type="image/png"
                                    />
                                    <img
                                      src={course?.imageURL}
                                      alt={course?.title}
                                      height="155"
                                      className="w-100"
                                      onError={({ currentTarget }) => {
                                        currentTarget.onerror = null;
                                        currentTarget.src =
                                          "../assets/images/user-no-img.jpg";
                                      }}
                                    />
                                  </picture>
                                </div>
                              </a>
                            </Link>

                            <div className="courses-info px-3 pt-3 pb-2 d-flex flex-column">
                              <Link
                                route={
                                  course?.courseType === "other"
                                    ? course?.personalWebsiteLink
                                    : "/course-detail/" + course?.id
                                }
                              >
                                <a
                                  {...(course?.courseType === "other"
                                    ? { target: "_blank" }
                                    : {})}
                                >
                                  <div className="title-container">
                                    <h6 className="font-weight-bold text-body-16 mb-1 pointer ellipsis">
                                      {course?.title?.charAt(0).toUpperCase() +
                                        course?.title?.slice(1)}
                                    </h6>
                                  </div>
                                </a>
                              </Link>
                              <div className="text-ellipsis d-flex align-items-center justify-content-between">
                                <small className="font-weight-semi-bold text-card-name text-body-12">
                                  {course?.UserDetails?.firstName +
                                    " " +
                                    course?.UserDetails?.lastName}
                                </small>
                              </div>

                              <div className="package-info">
                                {/* <div className="d-flex justify-content-between">
                                  <div className="">
                                    <small className="font-12 font-weight-semibold">
                                      {`${moment().format("DD/MM/YY")}`} &bull;{" "}
                                      {`${timeGetter(moment())}`}
                                    </small>
                                  </div>
                                </div> */}
                                <div className="d-flex justify-content-between align-middle">
                                  <div className="d-flex align-items-center">
                                    <StarRatings
                                      rating={
                                        course?.rating ?? 0
                                      }
                                      starDimension="15px"
                                      starSpacing="1px"
                                      starRatedColor="#FFC635"
                                    />
                                    <div
                                      className="d-flex pointer chevron-right-icon-bg"
                                      onClick={() =>
                                        router.push({
                                          pathname:
                                            course?.courseType === "other"
                                              ? course?.personalWebsiteLink
                                              : "/course-detail/" + course?.id,
                                        })
                                      }
                                    >
                                      <FontAwesomeIcon
                                        className="align-items-center chevron-right-icon"
                                        icon={faChevronRight}
                                      />
                                    </div>
                                  </div>
                                  <div>
                                    <img
                                      src={
                                        course?.courseType === "online"
                                          ? "/assets/images/online-icon-svg.svg"
                                          : course?.courseType === "offline"
                                          ? "/assets/images/offline-course.svg"
                                          : "/assets/images/icon-other-course.svg"
                                      }
                                      alt={
                                        course?.courseType === "online"
                                          ? "online"
                                          : "offline"
                                      }
                                      width={
                                        course?.courseType === "other"
                                          ? "20"
                                          : "20"
                                      }
                                      height={
                                        course?.courseType === "other"
                                          ? "20"
                                          : "20"
                                      }
                                      className="mr-2"
                                    />

                                    <img
                                      src={"/assets/images/icon-add-gm.svg"}
                                      alt="Add To GM"
                                      width="20"
                                      height="20"
                                      onClick={() =>
                                        addtoGrowthSAC(
                                          course?.id,
                                          course?.title,
                                          "course"
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
                              {course?.courseType === "other" ? (
                                <div className="text-center flex-grow-1">
                                  <small className="font-12 font-weight-semibold d-inline-flex">
                                    {lang("ROOMS.OTHER_TITLE")}
                                  </small>
                                </div>
                              ) : (
                                <div className="text-center flex-grow-1">
                                  <small className="font-12 font-weight-semibold d-inline-flex">
                                    {course?.courseType === "offline"
                                      ? lang("ROOMS.PRICE")
                                      : lang("COMMON.FREE")}
                                  </small>
                                  <small className="d-block font-12 font-weight-bold">
                                    <span className="">
                                      {course?.courseType === "offline"
                                        ? course?.enterPrice
                                          ? course?.enterPrice
                                          : "0"
                                        : course?.freePrice
                                        ? course?.freePrice
                                        : "0"}
                                    </span>{" "}
                                    <span className="">YC</span>
                                  </small>
                                </div>
                              )}
                              {course?.courseType === "online" && (
                                <>
                                  <hr className="bg-paper-white m-0 course-card-hr"></hr>{" "}
                                  <div className="text-center flex-grow-1">
                                    <small className="font-weight-semibold font-12 d-inline-flex">
                                      {lang("COMMON.LITE")}
                                    </small>
                                    <small className="d-block font-weight-bold font-12">
                                      <span className="">
                                        {course?.litePrice}{" "}
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
                                        {course?.premiumPrice}{" "}
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
        {activityData?.course?.length > showCourses && (
              <div className="people-tab-view-all-button border-top border-geyser py-2">
                {/* <Button
                  variant="outline-info"
                  className="px-3 py-2"
                  onClick={() =>
                    setShowCourses((previouseCount) => previouseCount + 4)
                  }
                >
                  {lang("JOBS.JOB_OFFERS.LOAD_MORE")}
                </Button> */}
                <span
                  className="people-tab-view-all-button-text"
                  onClick={() =>
                    setShowCourses((previouseCount) => previouseCount + 4)
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
