import { APP_URL } from "config";
import moment from "moment";
import { useRouter } from "next/router";
import React, { Fragment, useEffect, useState } from "react";
import { Card, Row, Col } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { getGrowthCoursesRooms, toggleModals } from "store/actions";
import { onImageError } from "utils";
import dynamic from "next/dynamic";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { Link } from "@routes";
import { VIRTUAL_EVENT_DETAILS } from "routes/urls";
import StarRatings from "react-star-ratings";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const MainModal = dynamic(() =>
  import("components/modal").then((mod) => mod.MainModal)
);
const AddToGMModal = dynamic(() =>
  import("components/modal").then((mod) => mod.AddToGMModal)
);
const OtherMatchToGM = ({ type, roomType, courseType }) => {
  const [lang] = useTranslation("language");
  const dispatch = useDispatch();
  const { otherCoursesRooms } = useSelector((state) => state.growth);
  const router = useRouter();
  const { addtoGrowthModelMatchGM } = useSelector(
    ({ ui }) => ui.modals,
    shallowEqual
  );

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

  useEffect(() => {
    if ((type === "rooms" && roomType) || type === "courses") {
      dispatch(
        getGrowthCoursesRooms(
          {
            page: 1,
            pagesize: 12,
            type:
              type === "rooms"
                ? [
                    "training-room",
                    "event",
                    "webinar",
                    "master-class",
                    "coaching-room",
                    "business-network-room",
                  ]
                : undefined,
          },
          type
        )
      );
    }
  }, [otherCoursesRooms?.total, roomType, type]);

  const initGModalData = {
    activityCategory: roomType,
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
      dispatch(toggleModals({ addtoGrowthModelMatchGM: true }));
    } else {
      setGmodalData({ ...initGModalData });
      dispatch(toggleModals({ addtoGrowthModelMatchGM: false }));
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
    <Fragment>
      {otherCoursesRooms?.rows?.length > 0 && (
        <Card className="my-4 my-courses-wrap video-courses-rightbar">
          <Card.Body className="pb-3 pt-3 pt-md-4 px-md-3 px-2">
            <h3 className="h6 ml-md-2 ml-1 ">
              {type === "courses"
                ? lang("ROOMS.OTHER_COURSES")
                : lang("ROOMS.OTHER_ROOMS")}{" "}
              {lang("ROOMS.MATCH_TO_GM")}
            </h3>

            {otherCoursesRooms?.rows?.length > 0 ? (
              <Carousel responsive={responsive}>
                {otherCoursesRooms?.rows?.map((v) => (
                  <div
                    className="d-flex w-100 px-1 px-md-2 mb-2"
                    // style={{ minWidth: "102%" }}
                  >
                    <Card className="secondary-card abstract-card-v2  h-100">
                      <Card.Body className="d-flex flex-column h-100">
                        <Link
                          route={
                            type === "courses"
                              ? v?.courseType === "other"
                                ? v?.personalWebsiteLink
                                : "/course-detail/" + v?.id
                              : VIRTUAL_EVENT_DETAILS + v?.id + "/false"
                          }
                        >
                          <div className="position-relative pointer">
                            <picture onContextMenu={(e) => e.preventDefault()}>
                              <source
                                srcSet={
                                  v?.imageURL
                                    ? v?.imageURL
                                    : "../assets/images/user-no-image.png"
                                }
                                type="image/png"
                              />
                              <img
                                src={
                                  v?.imageURL
                                    ? v?.imageURL
                                    : "../assets/images/user-no-image.png"
                                }
                                alt="My Room"
                                height="155"
                                className="w-100"
                                onError={(e) => onImageError(e)}
                              />
                            </picture>
                          </div>
                        </Link>
                        <div className="courses-info px-3 pt-3 pb-2 d-flex flex-column">
                          <Link
                            route={
                              type === "courses"
                                ? v?.courseType === "other"
                                  ? v?.personalWebsiteLink
                                  : "/course-detail/" + v?.id
                                : VIRTUAL_EVENT_DETAILS + v?.id + "/false"
                            }
                          >
                            <a>
                              <div className="title-container">
                                <h6 className="font-weight-bold text-body-16 mb-0 pointer ellipsis">
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
                            {type !== "courses" && (
                              <div className="d-flex justify-content-between">
                                <div className="">
                                  <small className="font-12 font-weight-semi-bold">
                                    {`${moment(v?.startDate).format(
                                      "DD/MM/YY"
                                    )}`}{" "}
                                    &bull;{" "}
                                    {moment(v?.startDate).format("hh:mm a")}
                                  </small>
                                </div>
                              </div>
                            )}
                            <div className="d-flex justify-content-between">
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
                                        VIRTUAL_EVENT_DETAILS +
                                        v?.id +
                                        "/false",
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
                                    courseType === "other"
                                      ? "/assets/images/icon-other-course.svg"
                                      : courseType === "online"
                                      ? "/assets/images/online-icon-svg.svg"
                                      : courseType === "offline"
                                      ? "/assets/images/offline-course.svg"
                                      : roomType === "training-room"
                                      ? "/assets/images/offline-course.svg"
                                      : roomType === "coaching-room"
                                      ? "/assets/images/ic-coaching.svg"
                                      : roomType === "webinar"
                                      ? "/assets/images/ic-webinars.svg"
                                      : roomType === "event"
                                      ? "/assets/images/ic-events.svg"
                                      : roomType === "master-class"
                                      ? "/assets/images/ic-masterclass.svg"
                                      : roomType === "business-network-room" &&
                                        "/assets/images/ic-bn-rooms.svg"
                                  }
                                  alt={
                                    type === "courses"
                                      ? v?.courseType === "online"
                                        ? "online"
                                        : "offline"
                                      : "virtual event"
                                  }
                                  width="20"
                                  height="20"
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
                      <Card.Footer className="py-2 px-3 border-top">
                        <div className="justify-content-between d-flex align-items-center">
                          <div className="text-center flex-grow-1">
                            <small className="font-12 font-weight-semibold d-inline-flex">
                              {lang("COMMON.FREE")}
                            </small>
                            <small className="d-block font-12 font-weight-bold">
                              <span className="">
                                {v?.freePrice ? v?.freePrice : "0"}
                              </span>{" "}
                              <span className="">YC</span>
                            </small>
                          </div>
                          {/* {rooms?.freePrice > 0 && ( */}
                          {v?.freePrice > 0 && (
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
              <Row className="pt-3 row-col-10 three-grid-spacing">
                <Col lg={12}>
                  <em>
                    {roomType === "training-room"
                      ? lang("ROOMS.NO_TRAINING_ROOM_FOUND")
                      : roomType === "coaching-room"
                      ? lang("ROOMS.NO_COACHING_ROOM_FOUND")
                      : roomType === "webinar"
                      ? lang("ROOMS.NO_WEBINAR_FOUND")
                      : roomType === "master-class"
                      ? lang("ROOMS.NO_MASTERCLASS_FOUND")
                      : roomType === "business-network-room"
                      ? lang("ROOMS.NO_BN_FOUND")
                      : roomType === "event"
                      ? lang("ROOMS.NO_EVENT_FOUND")
                      : lang("ROOMS.NO_COURSES_FOUND")}
                  </em>
                </Col>
              </Row>
            )}
          </Card.Body>
        </Card>
      )}

      <MainModal
        className="add-to-gmodal modal"
        show={addtoGrowthModelMatchGM}
        keyModal="addtoGrowthModelMatchGM"
        body={
          <AddToGMModal
            toggleGMModal={addToGModalToggle}
            data={gmodalData}
            page={"matchtogm"}
          />
        }
        headerClassName="mb-50 block md-mb-30"
        header={<h2 className="h6 mb-0">{lang("ROOMS.ADD_TO_GM")}</h2>}
      />
    </Fragment>
  );
};
export default OtherMatchToGM;
