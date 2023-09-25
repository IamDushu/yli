import React, { Fragment, useEffect, useState } from "react";
import { Card, Row, Col } from "react-bootstrap";
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchCourses, toggleModals } from "store/actions";
import { APP_URL } from "config";
import FilterCourse from "components/common/filter-course-room/FilterCourse";
import { useTranslation } from "react-i18next";
import dynamic from "next/dynamic";
import { Link } from "@routes";
import StarRatings from "react-star-ratings";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import CourseLoader from "components/ui/courseLoader";

const AddToGMModal = dynamic(() =>
  import("components/modal").then((mod) => mod.AddToGMModal)
);
const MainModal = dynamic(() =>
  import("components/modal").then((mod) => mod.MainModal)
);
/******************** 
    @purpose : Used for Course List
    @Parameter : { list, userData }
    @Author : INIC
    ******************/

const CoursesList = ({
  list,
  userData,
  fetchCoursesSetting,
  fetchSettings,
  clearFilters,
}) => {
  const router = useRouter();
  const [lang] = useTranslation("language");
  const dispatch = useDispatch();
  const allcourseList = useSelector(({ courses }) => courses?.courses);
  const { addtoGrowthModel } = useSelector(({ ui }) => ui.modals, shallowEqual);
  useEffect(() => {
    dispatch(fetchCourses(fetchSettings));
  }, [fetchSettings]);

  /********************************************************
   * Handle Pagination change
   * @author INIC
   * @param {number} pageNo
   * @param {number} pageSize
   * @returns {void}
   ********************************************************/
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
      dispatch(toggleModals({ addtoGrowthModel: true }));
    } else {
      setGmodalData({ ...initGModalData });
      dispatch(toggleModals({ addtoGrowthModel: false }));
    }
  };

  const addtoGrowthM = (id, title, courseType, Link) => {
    let postLink =
      courseType === "other" ? Link : `${APP_URL}/course-detail/${id}`;
    addToGModalToggle(id, title, postLink);
  };

  if (!allcourseList?.data) {
    return (
      <>
        <FilterCourse
          getCourses={fetchCoursesSetting}
          clearFilters={clearFilters}
        />
        <Card>
          <Card.Header className="p-4 border-bottom border-dark">
            <h6 className="mb-0">{lang("ROOMS.COURSE_TITLE")}</h6>
          </Card.Header>
        </Card>
        <CourseLoader fetchCoursesSetting={fetchCoursesSetting} />
      </>
    );
  }
  return (
    <Fragment>
      <InfiniteScroll
        dataLength={
          allcourseList?.data !== "" && allcourseList?.data?.length > 0
            ? allcourseList?.data?.length
            : ""
        }
        next={fetchCoursesSetting}
        hasMore={allcourseList?.data?.length !== allcourseList?.total}
        loader={<CourseLoader />}
      >
        <FilterCourse
          getCourses={fetchCoursesSetting}
          clearFilters={clearFilters}
        />
        <Card>
          <Card.Header className="p-2 p-md-3  border-bottom border-dark">
            <h6 className="mb-0">{lang("ROOMS.COURSE_TITLE")}</h6>
          </Card.Header>
          <Card.Body>
            <div className="d-flex flex-xl-nowrap flex-wrap">
              <div className="video-courses-rightbar w-100">
                <Row className="pt-1 row-col-10 three-grid-spacing">
                  {list && list?.length > 0 ? (
                    list
                      ?.sort(
                        (a, b) => new Date(b.startDate) - new Date(a.startDate)
                      )
                      .map((v) => (
                        <Col
                          lg={4}
                          sm={6}
                          key={v?.id}
                          className="d-flex w-100 "
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
                                      <source
                                        srcSet={v?.imageURL}
                                        type="image/png"
                                      />
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
                                      : userData.id !== v?.userId &&
                                        v?.instituteDetails
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
                                          v?.courseType === "other"
                                            ? "20"
                                            : "20"
                                        }
                                        height={
                                          v?.courseType === "other"
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
                                        <span className="">
                                          {v?.litePrice}{" "}
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
                                          {v?.premiumPrice}{" "}
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
                      ))
                  ) : (
                    <Col lg={12}>
                      <em>{lang("ROOMS.NO_COURSES_FOUND")}</em>
                    </Col>
                  )}
                </Row>
              </div>
            </div>
          </Card.Body>
        </Card>
      </InfiniteScroll>
      <MainModal
        className="add-to-gmodal modal"
        show={addtoGrowthModel}
        keyModal="addtoGrowthModel"
        body={
          <AddToGMModal
            toggleGMModal={addToGModalToggle}
            data={gmodalData}
            courseListComp="courseListComp"
          />
        }
        headerClassName="mb-50 block md-mb-30"
        header={<h2 className="h6 mb-0">{lang("ROOMS.ADD_TO_GM")}</h2>}
      />
    </Fragment>
  );
};

export default CoursesList;
