import { APP_URL } from "config";
import { useRouter } from "next/router";
import Pagination from "rc-pagination";
import React, { Fragment, useEffect, useState } from "react";
import { Card, Row, Col, Button } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { fetchCourses, toggleModals } from "store/actions";
import dynamic from "next/dynamic";
import { useTranslation } from "react-i18next";
import { Link } from "@routes";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import StarRatings from "react-star-ratings";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

const MainModal = dynamic(() =>
  import("components/modal").then((mod) => mod.MainModal)
);
const AddToGMModal = dynamic(() =>
  import("components/modal").then((mod) => mod.AddToGMModal)
);
const OtherCourses = ({ userDetails, courseId, instituteDetails }) => {
  const dispatch = useDispatch();
  const [lang] = useTranslation("language");
  const otherCourses = useSelector(({ courses }) => courses?.courses);
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [pagesize, setPageSize] = useState(12);
  const [total, setTotal] = useState(1);
  const { addtoGrowthModelOtherCourses } = useSelector(
    ({ ui }) => ui.modals,
    shallowEqual
  );

  const [courses, setCourses] = useState([]);

  useEffect(() => {
    if (userDetails !== undefined) {
      dispatch(fetchCourses({ page, pagesize, userId: userDetails?.id }));
      if (otherCourses?.total !== undefined && otherCourses?.total > 1) {
        setTotal(otherCourses?.total);
      }
    }
  }, [userDetails, page, pagesize, otherCourses?.total]);

  useEffect(() => {
    let otherCoursesByUser = [];
    otherCourses?.data &&
      otherCourses?.data?.length > 0 &&
      otherCourses?.data?.forEach((element) => {
        if (element?.id !== courseId) {
          otherCoursesByUser.push(element);
        }
        setCourses(otherCoursesByUser);
      });
  }, [otherCourses]);
  const paginationChange = (page, pageSize) => {
    setPage(page);
    setPageSize(pageSize);
  };

  const initGModalData = {
    activityCategory: "course",
    activityTitle: "",
    activityId: "",
    activityLink: "",
  };

  const [gmodalData, setGmodalData] = useState(initGModalData);

  const addToGModalToggle = (id = "", title = "", postLink) => {
    if (id !== "") {
      setGmodalData((state) => ({
        ...state,
        activityId: id,
        activityTitle: title,
        activityLink: postLink,
      }));
      dispatch(toggleModals({ addtoGrowthModelOtherCourses: true }));
    } else {
      setGmodalData({ ...initGModalData });
      dispatch(toggleModals({ addtoGrowthModelOtherCourses: false }));
    }
  };

  const addtoGrowthM = (id, title, courseType, personalWebsiteLink) => {
    if (courseType === "other") {
      let postLink = personalWebsiteLink;
      addToGModalToggle(id, title, postLink);
    } else {
      let postLink = `${APP_URL}/course-detail/${id}`;
      addToGModalToggle(id, title, postLink);
    }
  };

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 3,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <Fragment>
      {courses?.length > 0 && (
        <Card className="my-4 my-courses-wrap video-courses-rightbar">
          <Card.Body className="pb-3 pt-3 pt-md-4 px-md-3 px-2">
            <h3 className="h6 ml-md-2 ml-1 ">{`${lang("COURSES.OTHER_COURSE_BY")} ${
              instituteDetails ? instituteDetails?.name : userDetails?.firstName
            } ${instituteDetails ? "" : userDetails?.lastName}`}</h3>

            {courses?.length > 0 ? (
              <Carousel responsive={responsive}>
                {courses?.map((v) => (
                  <div
                    className="d-flex w-100 px-1 px-md-2 mb-2"
                    // style={{ minWidth: "111%" }}
                  >
                    <Card className="secondary-card abstract-card-v2">
                      <Card.Body className="d-flex flex-column h-100">
                        <Link
                          route={
                            v?.courseType === "other"
                              ? v?.personalWebsiteLink
                              : "/course-detail/" + v?.id
                          }
                        >
                          <a
                            {...(v?.courseType === "other"
                              ? { target: "_blank" }
                              : {})}
                          >
                            <div className="position-relative pointer">
                              <picture>
                                <source srcSet={v?.imageURL} type="image/png" />
                                <img
                                  src={v?.imageURL}
                                  alt={v?.title}
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
                              v?.courseType === "other"
                                ? v?.personalWebsiteLink
                                : "/course-detail/" + v?.id
                            }
                          >
                            <a
                              {...(v?.courseType === "other"
                                ? { target: "_blank" }
                                : {})}
                            >
                              <div className="title-container">
                                <h6 className="font-weight-bold text-body-16 mb-1 pointer ellipsis">
                                  {v?.title?.charAt(0).toUpperCase() +
                                    v?.title?.slice(1)}
                                </h6>
                              </div>
                            </a>
                          </Link>
                          <div className="text-ellipsis d-flex align-items-center justify-content-between">
                            <small className="font-weight-semi-bold text-card-name text-body-12">
                              {v?.courseType === "other"
                                ? v?.structureInformation
                                : v?.instituteDetails
                                ? v?.instituteDetails?.name
                                : `${v?.UserDetails?.firstName} ${v?.UserDetails?.lastName}`}
                            </small>
                          </div>

                          <div className="package-info">
                            <div className="d-flex justify-content-between align-middle">
                              <div className="d-flex align-items-center">
                                <StarRatings
                                  rating={v?.rating ?? 0}
                                  starDimension="15px"
                                  starSpacing="1px"
                                  starRatedColor="#FFC635"
                                />
                                <div
                                  className="d-flex pointer chevron-right-icon-bg"
                                  onClick={() =>
                                    router.push({
                                      pathname:
                                        v?.courseType === "other"
                                          ? v?.personalWebsiteLink
                                          : "/course-detail/" + v?.id,
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
                                    v?.courseType === "online"
                                      ? "/assets/images/online-icon-svg.svg"
                                      : v?.courseType === "offline"
                                      ? "/assets/images/offline-course.svg"
                                      : "/assets/images/icon-other-course.svg"
                                  }
                                  alt={
                                    v?.courseType === "online"
                                      ? "online"
                                      : "offline"
                                  }
                                  width={
                                    v?.courseType === "other" ? "20" : "20"
                                  }
                                  height={
                                    v?.courseType === "other" ? "20" : "20"
                                  }
                                  className="mr-2"
                                />

                                <img
                                  src={"/assets/images/icon-add-gm.svg"}
                                  alt="Add To GM"
                                  width="20"
                                  height="20"
                                  onClick={() => {
                                    addtoGrowthM(
                                      v?.id,
                                      v?.title,
                                      v?.courseType,
                                      v?.personalWebsiteLink
                                    );
                                  }}
                                  className="pointer"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </Card.Body>
                      <Card.Footer className="py-2 px-3 m-0 border-top">
                        <div className="justify-content-between d-flex align-items-center">
                          {v?.courseType === "other" ? (
                            <div className="text-center flex-grow-1">
                              <small className="font-12 font-weight-semibold d-inline-flex">
                                {lang("ROOMS.OTHER_TITLE")}
                              </small>
                            </div>
                          ) : (
                            <div className="text-center flex-grow-1">
                              <small className="font-12 font-weight-semibold d-inline-flex">
                                {v?.courseType === "offline"
                                  ? lang("ROOMS.PRICE")
                                  : lang("COMMON.FREE")}
                              </small>
                              <small className="d-block font-12 font-weight-bold">
                                <span className="">
                                  {v?.courseType === "offline"
                                    ? v?.enterPrice
                                      ? v?.enterPrice
                                      : "0"
                                    : v?.freePrice
                                    ? v?.freePrice
                                    : "0"}
                                </span>{" "}
                                <span className="">YC</span>
                              </small>
                            </div>
                          )}
                          {v?.courseType === "online" && (
                            <>
                              <hr className="bg-paper-white m-0 course-card-hr"></hr>{" "}
                              <div className="text-center flex-grow-1">
                                <small className="font-weight-semibold font-12 d-inline-flex">
                                  {lang("COMMON.LITE")}
                                </small>
                                <small className="d-block font-weight-bold font-12">
                                  <span className="">{v?.litePrice} </span>
                                  <span className="">YC</span>
                                </small>
                              </div>
                              <hr className="bg-paper-white m-0 course-card-hr"></hr>
                              <div className="text-center flex-grow-1">
                                <small className="font-weight-semibold font-12 d-inline-flex text-green-dark">
                                  {lang("COMMON.PREMIUM")}
                                </small>
                                <small className="d-block font-weight-bold font-12">
                                  <span className="">{v?.premiumPrice} </span>
                                  <span className="">YC</span>
                                </small>
                              </div>
                            </>
                          )}
                        </div>
                      </Card.Footer>
                    </Card>
                  </div>
                ))}
              </Carousel>
            ) : (
              <Row className="row-col-10 three-grid-spacing">
                <Col lg={12}>
                  <em>{lang("GROUP.COMMON.NO_RECORDS_FOUND")}</em>
                </Col>
              </Row>
            )}
          </Card.Body>
        </Card>
      )}

      <MainModal
        className="add-to-gmodal modal"
        show={addtoGrowthModelOtherCourses}
        keyModal="addtoGrowthModelOtherCourses"
        body={
          <AddToGMModal
            toggleGMModal={addToGModalToggle}
            data={gmodalData}
            otherCourses={"otherCoursesByAuthor"}
          />
        }
        headerClassName="mb-50 block md-mb-30"
        header={
          <h2 className="h6 mb-0">
            {lang("DASHBOARD.POSTS.POST_FOOTER.ADD_TO_GM")}
          </h2>
        }
      />
    </Fragment>
  );
};
export default OtherCourses;
