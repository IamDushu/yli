import { APP_URL } from "config";
import React from "react";
import { Button, Col, Row } from "react-bootstrap";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { toggleModals } from "store/actions";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { Link } from "@routes";
import StarRatings from "react-star-ratings";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
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
    <div className="shadow">
      {(selectedFilters.length === 0 ||
        selectedFilters.includes(lang("GLOBAL_SEARCH.FILTER.COURSES"))) &&
        searchData?.searchResults?.courses?.rows.length > 0 && (
          <Card className="mb-3">
            <div className="p-2">
              <h3
                className="mb-0 px-3 py-1"
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
              <div className="px-3 pb-3 video-courses-rightbar">
                <div className="pt-1 d-flex flex-wrap">
                  {searchData?.searchResults?.courses?.rows.map((course, i) => {
                    return (
                      i <= 3 &&
                      !showAll.courses && (
                        <Col
                          lg={3}
                          md={6}
                          sm={4}
                          key={i}
                          // className="d-flex flex-column m-1"
                        >
                          <Card
                            className="secondary-card abstract-card-v2"
                            style={{
                              width: "166px",
                              height: "152px",
                              position: "relative",
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
                                  image={course?.imageURL}
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
                        </Col>
                      )
                    );
                  })}
                  {searchData?.searchResults?.courses?.rows.map((course, i) => {
                    return (
                      showAll.courses && (
                        <Col lg={3} md={6} sm={4} key={i}>
                          <Card
                            className="secondary-card abstract-card-v2"
                            style={{
                              width: "166px",
                              height: "152px",
                              position: "relative",
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
                                  height="155"
                                  className="w-100"
                                  image={course?.imageURL}
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
                                  <h6 className="font-weight-bold text-body-16 mb-1 pointer ellipsis">
                                    {course?.title?.charAt(0).toUpperCase() +
                                      course?.title?.slice(1)}
                                  </h6>
                                </div>
                              </Link>
                              <div className="text-ellipsis d-flex align-items-center justify-content-between">
                                <small className="font-weight-semi-bold text-card-name text-body-12">
                                  {`${course?.UserDetails?.firstName || ""} ${
                                    course?.UserDetails?.lastName || ""
                                  }`.trim()}
                                </small>
                              </div>
                              <StarRatings
                                rating={course?.rating ?? 0}
                                starDimension="15px"
                                starSpacing="1px"
                                starRatedColor="#FFC635"
                              />
                            </CardContent>
                          </Card>
                        </Col>
                        // <Col lg={4} md={6} sm={4} key={index}>
                        //   <Card className="secondary-card abstract-card-v2">
                        //     <Card.Body className="d-flex flex-column h-100">
                        //       <Link route={"/course-detail/" + course.id}>
                        //         <div className="position-relative pointer">
                        //           <picture>
                        //             <source
                        //               srcSet={course?.imageURL}
                        //               type="image/png"
                        //             />
                        //             <img
                        //               src={course?.imageURL}
                        //               alt={course?.title}
                        //               height="155"
                        //               className="w-100"
                        //               onError={({ currentTarget }) => {
                        //                 currentTarget.onerror = null;
                        //                 currentTarget.src =
                        //                   "../assets/images/user-no-img.jpg";
                        //               }}
                        //             />
                        //           </picture>
                        //         </div>
                        //       </Link>

                        //       <div className="courses-info px-3 pt-3 pb-2 d-flex flex-column">
                        //         <Link route={"/course-detail/" + course.id}>
                        //           <div className="title-container">
                        //             <h6 className="font-weight-bold text-body-16 mb-1 pointer ellipsis">
                        //               {course?.title
                        //                 ?.charAt(0)
                        //                 .toUpperCase() +
                        //                 course?.title?.slice(1)}
                        //             </h6>
                        //           </div>
                        //         </Link>
                        //         <div className="text-ellipsis d-flex align-items-center justify-content-between">
                        //           <small className="font-weight-semi-bold text-card-name text-body-12">
                        //             {course?.UserDetails?.firstName +
                        //               " " +
                        //               course?.UserDetails?.lastName}
                        //           </small>
                        //         </div>

                        //         <div className="package-info">
                        //           <div className="d-flex justify-content-between align-middle">
                        //             <div className="d-flex align-items-center">
                        //               <StarRatings
                        //                 rating={course?.rating ?? 0}
                        //                 starDimension="15px"
                        //                 starSpacing="1px"
                        //                 starRatedColor="#FFC635"
                        //               />
                        //               <div
                        //                 className="d-flex pointer chevron-right-icon-bg"
                        //                 onClick={() =>
                        //                   router.push({
                        //                     pathname:
                        //                       "/course-detail/" + course?.id,
                        //                   })
                        //                 }
                        //               >
                        //                 <FontAwesomeIcon
                        //                   className="align-items-center chevron-right-icon"
                        //                   icon={faChevronRight}
                        //                 />
                        //               </div>
                        //             </div>
                        //             <div>
                        //               <img
                        //                 src={
                        //                   course?.courseType === "online"
                        //                     ? "/assets/images/online-icon-svg.svg"
                        //                     : course?.courseType === "offline"
                        //                     ? "/assets/images/offline-course.svg"
                        //                     : "/assets/images/icon-other-course.svg"
                        //                 }
                        //                 alt={
                        //                   course?.courseType === "online"
                        //                     ? "online"
                        //                     : "offline"
                        //                 }
                        //                 width={
                        //                   course?.courseType === "other"
                        //                     ? "20"
                        //                     : "20"
                        //                 }
                        //                 height={
                        //                   course?.courseType === "other"
                        //                     ? "20"
                        //                     : "20"
                        //                 }
                        //                 className="mr-2"
                        //               />

                        //               <img
                        //                 src={"/assets/images/icon-add-gm.svg"}
                        //                 alt="Add To GM"
                        //                 width="20"
                        //                 height="20"
                        //                 onClick={() => {
                        //                   addtoGrowthM(
                        //                     course?.id,
                        //                     course?.title,
                        //                     course?.courseType,
                        //                     course?.personalWebsiteLink,
                        //                   );
                        //                 }}
                        //                 className="pointer"
                        //               />
                        //             </div>
                        //           </div>
                        //         </div>
                        //       </div>
                        //     </Card.Body>
                        //     <Card.Footer className="py-2 px-3 m-0 border-top">
                        //       <div className="justify-content-between d-flex align-items-center">
                        //         {course?.courseType === "other" ? (
                        //           <div className="text-center flex-grow-1">
                        //             <small className="font-12 font-weight-semibold d-inline-flex">
                        //               {lang("ROOMS.OTHER_TITLE")}
                        //             </small>
                        //           </div>
                        //         ) : (
                        //           <div className="text-center flex-grow-1">
                        //             <small className="font-12 font-weight-semibold d-inline-flex">
                        //               {course?.courseType === "offline"
                        //                 ? lang("ROOMS.PRICE")
                        //                 : lang("COMMON.FREE")}
                        //             </small>
                        //             <small className="d-block font-12 font-weight-bold">
                        //               <span className="">
                        //                 {course?.courseType === "offline"
                        //                   ? course?.enterPrice
                        //                     ? course?.enterPrice
                        //                     : "0"
                        //                   : course?.freePrice
                        //                   ? course?.freePrice
                        //                   : "0"}
                        //               </span>{" "}
                        //               <span className="">YC</span>
                        //             </small>
                        //           </div>
                        //         )}
                        //         {course?.courseType === "online" && (
                        //           <>
                        //             <hr className="bg-paper-white m-0 course-card-hr"></hr>{" "}
                        //             <div className="text-center flex-grow-1">
                        //               <small className="font-weight-semibold font-12 d-inline-flex">
                        //                 {lang("COMMON.LITE")}
                        //               </small>
                        //               <small className="d-block font-weight-bold font-12">
                        //                 <span className="">
                        //                   {course?.litePrice}{" "}
                        //                 </span>
                        //                 <span className="">YC</span>
                        //               </small>
                        //             </div>
                        //             <hr className="bg-paper-white m-0 course-card-hr"></hr>
                        //             <div className="text-center flex-grow-1">
                        //               <small className="font-weight-semibold font-12 d-inline-flex text-green-dark">
                        //                 {lang("COMMON.PREMIUM")}
                        //               </small>
                        //               <small className="d-block font-weight-bold font-12">
                        //                 <span className="">
                        //                   {course?.premiumPrice}{" "}
                        //                 </span>
                        //                 <span className="">YC</span>
                        //               </small>
                        //             </div>
                        //           </>
                        //         )}
                        //       </div>
                        //     </Card.Footer>
                        //   </Card>
                        // </Col>
                      )
                    );
                  })}
                </div>
              </div>
              {searchData?.searchResults?.courses?.rows.length > 4 && (
                <div className="people-tab-view-all-button my-2 pt-2 d-flex justify-content-center">
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
                        <AddIcon fontSize="small" />
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
        searchData?.searchResults?.courses?.rows.length === 0 && (
          <p>No Courses Found</p>
        )}
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
