import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import React from "react";
import { Card, Col, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import StarRatings from "react-star-ratings";
import { onImageError } from "utils";

export default function CourseListing({ courseType, pageSize, setPageSize }) {
  const [lang] = useTranslation("language");
  const router = useRouter();
  const { learninginstcourselistonline, learninginstcourselistoffline } =
    useSelector((state) => state.learningInstitute);
  const learninginstcourselist =
    courseType === "online"
      ? learninginstcourselistonline
      : courseType === "offline" && learninginstcourselistoffline;
  return (
    learninginstcourselist?.rows.length > 0 && (
      <Card className="mt-3">
        <div className="px-3 pt-3">
        <div>
          <h3 className="h6 font-16 text-style font-weight-bold text-secondary-dark-blue w-100">
            {courseType === "online"
              ? lang("LEARNING_INSTITUTE.PRODUCTS_TAB.ONLINE_COURSES")
              : lang("LEARNING_INSTITUTE.PRODUCTS_TAB.OFFLINE_COURSES")}
          </h3>
        </div>
        <Row
          className={`row  ${
            learninginstcourselist?.rows?.length > 0 ? "px-2" : ""
          }`}
        >
          {learninginstcourselist?.rows &&
          learninginstcourselist?.rows?.length > 0
            ? learninginstcourselist?.rows
                .sort((a, b) => new Date(b.startDate) - new Date(a.startDate))
                .map((rooms) => {
                  return (
                    <Col md={4} sm={6} className="d-flex w-100 p-0  mb-3 px-2">
                      <Card className="secondary-card abstract-card-v2">
                        <Card.Body className="d-flex flex-column h-100">
                          <div
                            className="position-relative pointer"
                            onClick={() => {
                              router.push({
                                pathname: "/course-detail/" + rooms?.id,
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
                                pathname: "/course-detail/" + rooms?.id,
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
                              <div className="d-flex justify-content-between"></div>

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
                                  src={
                                    courseType === "online"
                                      ? "/assets/images/online-icon-svg.svg"
                                      : "/assets/images/offline-icon-svg.svg"
                                  }
                                  alt={courseType}
                                  width="20"
                                  height="20"
                                />
                              </div>
                            </div>
                          </div>
                        </Card.Body>
                        <Card.Footer className="py-2 px-3 border-top">
                          {courseType === "online" ? (
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
                                    <span className="">
                                      {rooms.premiumPrice}{" "}
                                    </span>
                                    <span className="">YC</span>
                                  </small>
                                </div>
                              </>

                              <div className="text-center mt-4"></div>
                            </div>
                          ) : (
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
                                    <span className="">
                                      {rooms.premiumPrice}{" "}
                                    </span>
                                    <span className="">YC</span>
                                  </small>
                                </div>
                              </>
                              <div className="text-center mt-4"></div>
                            </div>
                          )}
                        </Card.Footer>
                      </Card>
                    </Col>
                  );
                })
            : ""}
        </Row>
        </div>
        {learninginstcourselist?.rows?.length <
          learninginstcourselist?.total && (
          <div className="d-flex justify-content-center border-top-gray py-1">
            <div className="people-tab-view-all-button my-2">
              <span
                className="people-tab-view-all-button-text"
                onClick={() => setPageSize(courseType)}
              >
                Load More
              </span>
            </div>
          </div>
        )}
      </Card>
    )
  );
}
