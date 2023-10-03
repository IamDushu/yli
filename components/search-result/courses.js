import { APP_URL } from "config";
import React from "react";
import { Button, Col, Row } from "react-bootstrap";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { toggleModals } from "store/actions";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { Link } from "@routes";
import StarRatings from "react-star-ratings";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { GMIcon } from "icons/index";
const MainModal = dynamic(() =>
  import("components/modal").then((mod) => mod.MainModal),
);
const AddToGMModal = dynamic(() =>
  import("components/modal").then((mod) => mod.AddToGMModal),
);
const Courses = ({
  lang,
  selectedFilters,
  searchData,
  setShowAll,
  showAll,
  router,
  userData,
}) => {
  const dispatch = useDispatch();

  const { addtoGrowthModelglobalCourse } = useSelector(
    ({ ui }) => ui.modals,
    shallowEqual,
  );

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
      dispatch(toggleModals({ addtoGrowthModelglobalCourse: true }));
    } else {
      setGmodalData({ ...initGModalData });
      dispatch(toggleModals({ addtoGrowthModelglobalCourse: false }));
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

  return (
    <div style={{ boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)" }}>
      {(selectedFilters.length === 0 ||
        selectedFilters.includes(lang("GLOBAL_SEARCH.FILTER.COURSES"))) &&
        searchData?.searchResults?.courses?.rows.length > 0 && (
          <Card className="mb-3">
            <div className="p-2 pb-4">
              <h3
                className="mb-0 px-3 py-3"
                style={{
                  fontSize: "16px",
                  color: "#001551",
                  fontWeight: "500",
                  lineHeight: "24px",
                }}
              >
                {" "}
                {lang("GLOBAL_SEARCH.FILTER.COURSES")}
              </h3>
              <div className="pb-2 video-courses-rightbar">
                <div
                  className="pt-1 px-3 d-flex flex-wrap"
                  style={{
                    columnGap: "0.5rem",
                    rowGap: "1.5rem",
                    display: "flex",
                    flexWrap: "wrap",
                  }}
                >
                  {searchData?.searchResults?.courses?.rows.map((course, i) => {
                    return (
                      i <= 3 &&
                      !showAll.courses && (
                        <Card
                          className="secondary-card abstract-card-v2"
                          style={{
                            width: "166px",
                            height: "152px",
                            position: "relative",
                            borderRadius: "0px",
                          }}
                        >
                          <div
                            style={{
                              width: "104px",
                              height: "16px",
                              backgroundColor: "#D9D9D9",
                              position: "absolute",
                              top: "4px",
                              left: "7px",
                              fontWeight: "500",
                              fontSize: "11px",
                              color: "#6750A4",
                              zIndex: "1",
                              lineHeight: "16px",
                              textAlign: "center",
                              opacity: "0.7",
                            }}
                          >
                            ONLINE COURSE
                          </div>

                          <div
                            style={{
                              position: "absolute",
                              right: "8px",
                              top: "0px",
                              color: "#6750A4",
                              zIndex: "1",
                            }}
                          >
                            <GMIcon />
                          </div>
                          <Link route={"/course-detail/" + course.id}>
                            <div className="position-relative pointer">
                              <CardMedia
                                component="img"
                                height="70px"
                                className="w-100"
                                src={
                                  course?.imageURL ||
                                  "../assets/images/user-no-img.jpg"
                                }
                                alt={course?.title}
                                onError={({ currentTarget }) => {
                                  currentTarget.onerror = null;
                                  currentTarget.src =
                                    "../assets/images/user-no-img.jpg";
                                }}
                              />
                            </div>
                          </Link>
                          <CardContent className="p-1">
                            <Link route={"/course-detail/" + course.id}>
                              <div className="title-container">
                                <h6
                                  className="text-body-14 pointer ellipsis"
                                  style={{
                                    fontWeight: "500",
                                    color: "#6750A4",
                                    lineHeight: "20px",
                                    letterSpacing: "0.1px",
                                  }}
                                >
                                  {course?.title?.charAt(0).toUpperCase() +
                                    course?.title?.slice(1)}
                                </h6>
                              </div>
                            </Link>
                            <div className="text-ellipsis d-flex align-items-center justify-content-between">
                              <small className="font-weight-semi-bold text-card-name text-body-12">
                                <span style={{ color: "#49454E" }}>
                                  {`${course?.UserDetails?.firstName || ""} ${
                                    course?.UserDetails?.lastName || ""
                                  }`.trim()}
                                </span>
                              </small>
                            </div>
                            <StarRatings
                              rating={course?.rating ?? 0}
                              starDimension="10.44px"
                              starSpacing="1px"
                              starRatedColor="#FFC635"
                            />
                          </CardContent>
                        </Card>
                      )
                    );
                  })}
                  {searchData?.searchResults?.courses?.rows.map((course, i) => {
                    return (
                      showAll.courses && (
                        <Card
                          className="secondary-card abstract-card-v2 mb-2"
                          style={{
                            width: "166px",
                            height: "152px",
                            position: "relative",
                            borderRadius: "0px",
                          }}
                        >
                          <div
                            style={{
                              width: "104px",
                              height: "16px",
                              backgroundColor: "#D9D9D9",
                              position: "absolute",
                              top: "4px",
                              left: "7px",
                              fontWeight: "500",
                              fontSize: "11px",
                              color: "#6750A4",
                              zIndex: "1",
                              lineHeight: "16px",
                              textAlign: "center",
                              opacity: "0.7",
                            }}
                          >
                            ONLINE COURSE
                          </div>

                          <div
                            style={{
                              position: "absolute",
                              right: "8px",
                              top: "0px",
                              color: "#6750A4",
                              zIndex: "1",
                            }}
                          >
                            <GMIcon />
                          </div>
                          <Link route={"/course-detail/" + course.id}>
                            <div className="position-relative pointer">
                              <CardMedia
                                component="img"
                                height="70px"
                                className="w-100"
                                src={
                                  course?.imageURL ||
                                  "../assets/images/user-no-img.jpg"
                                }
                                alt={course?.title}
                                onError={({ currentTarget }) => {
                                  currentTarget.onerror = null;
                                  currentTarget.src =
                                    "../assets/images/user-no-img.jpg";
                                }}
                              />
                            </div>
                          </Link>
                          <CardContent className="p-1">
                            <Link route={"/course-detail/" + course.id}>
                              <div className="title-container">
                                <h6
                                  className="text-body-14 pointer ellipsis"
                                  style={{
                                    fontWeight: "500",
                                    color: "#6750A4",
                                    lineHeight: "20px",
                                    letterSpacing: "0.1px",
                                  }}
                                >
                                  {course?.title?.charAt(0).toUpperCase() +
                                    course?.title?.slice(1)}
                                </h6>
                              </div>
                            </Link>
                            <div className="text-ellipsis d-flex align-items-center justify-content-between">
                              <small className="font-weight-semi-bold text-card-name text-body-12">
                                <span style={{ color: "#49454E" }}>
                                  {`${course?.UserDetails?.firstName || ""} ${
                                    course?.UserDetails?.lastName || ""
                                  }`.trim()}
                                </span>
                              </small>
                            </div>
                            <StarRatings
                              rating={course?.rating ?? 0}
                              starDimension="10.44px"
                              starSpacing="1px"
                              starRatedColor="#FFC635"
                            />
                          </CardContent>
                        </Card>
                      )
                    );
                  })}
                </div>
              </div>
              {searchData?.searchResults?.courses?.rows.length > 4 && (
                <div className="people-tab-view-all-button mt-2 pt-2 d-flex justify-content-center">
                  <span
                    className="people-tab-view-all-button-text"
                    onClick={() => {
                      setShowAll({
                        ...showAll,
                        courses: !showAll.courses,
                      });
                    }}
                  >
                    {!showAll.courses ? (
                      <>
                        <AddIcon fontSize="small" />
                        <span className="ml-2">{lang("COMMON.LOAD_MORE")}</span>
                      </>
                    ) : (
                      <>
                        <RemoveIcon fontSize="small" />
                        <span className="ml-2">{lang("COMMON.VIEW_LESS")}</span>
                      </>
                    )}
                  </span>
                </div>
              )}
            </div>
          </Card>
        )}

      {selectedFilters.includes(lang("GLOBAL_SEARCH.FILTER.COURSES")) &&
        searchData?.searchResults?.courses?.rows.length === 0 && <></>}
      <MainModal
        className="add-to-gmodal modal"
        show={addtoGrowthModelglobalCourse}
        keyModal="addtoGrowthModelglobalCourse"
        body={
          <AddToGMModal
            toggleGMModal={addToGModalToggle}
            data={gmodalData}
            globalCourse={"globalCourse"}
            searchData={searchData?.searchText}
          />
        }
        headerClassName="mb-50 block md-mb-30"
        header={<h2 className="h6 mb-0">{lang("ROOMS.ADD_TO_GM")}</h2>}
      />
    </div>
  );
};

export default Courses;
