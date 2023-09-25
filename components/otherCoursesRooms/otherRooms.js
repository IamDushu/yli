import { APP_URL } from "config";
import moment from "moment";
import React, { Fragment, useEffect, useState } from "react";
import { Card, Row, Col, Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { toggleModals } from "store/actions";
import { RoomList } from "store/actions/room";
import { onImageError } from "utils";
import dynamic from "next/dynamic";
import { VIRTUAL_EVENT_DETAILS } from "routes/urls";
import { Link } from "@routes";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import StarRatings from "react-star-ratings";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import momentTz from "moment-timezone";

const MainModal = dynamic(() =>
  import("components/modal").then((mod) => mod.MainModal)
);
const AddToGMModal = dynamic(() =>
  import("components/modal").then((mod) => mod.AddToGMModal)
);
const OtherRooms = ({
  roomType,
  userDetails,
  roomId,
  instituteDetails,
  userInfo,
}) => {
  const [lang] = useTranslation("language");
  const dispatch = useDispatch();
  const { roomList } = useSelector((state) => state.room);
  const [rooms, setRooms] = useState([]);
  const [total, setTotal] = useState(1);
  const router = useRouter();
  useEffect(() => {
    if (userDetails !== undefined) {
      const payload = {
        page: 1,
        pagesize: 12,
        // virtualEventType: roomType,
        userId: userDetails?.id,
        instituteId: instituteDetails?.id,
      };
      dispatch(RoomList(payload));
      if (roomList?.total !== undefined && roomList?.total > 1) {
        setTotal(roomList?.total);
      }
    }
  }, [userDetails, roomList?.total]);
  useEffect(() => {
    let otherRoomsByUser = [];
    roomList?.rows &&
      roomList?.rows?.length > 0 &&
      roomList?.rows?.forEach((element) => {
        if (element?.id !== roomId) {
          otherRoomsByUser.push(element);
        }
        setRooms(otherRoomsByUser);
      });
  }, [roomList]);

  // const { addtoGrowthModel } = useSelector(({ ui }) => ui.modals, shallowEqual);
  const { addtoGrowthModelotherRoom } = useSelector(
    ({ ui }) => ui.modals,
    shallowEqual
  );

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
      dispatch(toggleModals({ addtoGrowthModelotherRoom: true }));
    } else {
      setGmodalData({ ...initGModalData });
      dispatch(toggleModals({ addtoGrowthModelotherRoom: false }));
    }
  };

  const addtoGrowthM = (id, title, courseType, personalWebsiteLink) => {
    if (courseType === "other") {
      let postLink = personalWebsiteLink;
      addToGModalToggle(id, title, postLink);
    } else {
      let postLink = `${APP_URL}/virtual-events/${id}`;
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
      {rooms?.length > 0 && (
        <Card className="mt-4 mb-0 mb-md-3 my-courses-wrap video-courses-rightbar">
          <Card.Body className="pb-2 pb-md-3 pt-3 pt-md-4 px-md-3 px-2">
            <h3 className="h6 ml-md-2 ml-1">
              {lang("ROOMS.OTHER_ROOMS_BY")}
              {instituteDetails
                ? ` ${instituteDetails?.name}`
                : ` ${userDetails?.firstName} ${userDetails?.lastName}`}
            </h3>
            {rooms && rooms?.length === 0 ? (
              <Row className="pt-1 row-col-10 three-grid-spacing">
                <Col lg={12}>
                  <em>
                    {roomType === "training-room" &&
                      lang("ROOMS.NO_TRAINING_ROOM_FOUND")}
                    {roomType === "coaching-room" &&
                      lang("ROOMS.NO_COACHING_ROOM_FOUND")}
                    {roomType === "webinar" && lang("ROOMS.NO_WEBINAR_FOUND")}
                    {roomType === "event" && lang("ROOMS.NO_EVENT_FOUND")}
                    {roomType === "master-class" &&
                      lang("ROOMS.NO_MASTERCLASS_FOUND")}
                    {roomType === "business-network-room" &&
                      lang("ROOMS.NO_BN_FOUND")}
                  </em>
                </Col>
              </Row>
            ) : (
              rooms?.length > 0 && (
                <Carousel responsive={responsive}>
                  {rooms?.map((rooms, index) => {
                    const id = rooms?.id;

                    return (
                      <div
                        className="d-flex w-100 px-1 px-md-2 mb-2"
                        // style={{ minWidth: "102%" }}
                      >
                        <Card className="secondary-card abstract-card-v2 h-100">
                          <Card.Body className="d-flex flex-column h-100">
                            <Link route={VIRTUAL_EVENT_DETAILS + id + "/false"}>
                              <a>
                                <div className="position-relative pointer">
                                  <picture
                                    onContextMenu={(e) => e.preventDefault()}
                                  >
                                    <source
                                      srcSet={
                                        rooms?.imageURL
                                          ? rooms?.imageURL
                                          : "../assets/images/user-no-image.png"
                                      }
                                      type="image/png"
                                    />
                                    <img
                                      src={
                                        rooms?.imageURL
                                          ? rooms?.imageURL
                                          : "../assets/images/user-no-image.png"
                                      }
                                      alt="My Room"
                                      height="155"
                                      className="w-100"
                                      onError={(e) => onImageError(e)}
                                    />
                                  </picture>
                                </div>
                              </a>
                            </Link>

                            <div className="courses-info px-3 pt-3 pb-2 d-flex flex-column">
                              <Link
                                route={VIRTUAL_EVENT_DETAILS + id + "/false"}
                              >
                                <a>
                                  <div className="title-container">
                                    <h6 className="font-weight-bold text-body-16 mb-0 pointer ellipsis">
                                      {rooms?.title?.charAt(0).toUpperCase() +
                                        rooms?.title?.slice(1)}
                                    </h6>
                                  </div>
                                </a>
                              </Link>
                              <div className="text-ellipsis d-flex align-items-center justify-content-between">
                                <small className="font-weight-semi-bold text-card-name text-body-12">
                                  {rooms?.userDetails?.firstName}{" "}
                                  {rooms?.userDetails?.lastName}
                                </small>
                              </div>

                              <div className="package-info">
                                <div className="d-flex justify-content-between">
                                  <div className="">
                                    <small className="font-12 font-weight-semi-bold">
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
                                        : moment(rooms?.startDate).format(
                                            "h:mm a"
                                          )}
                                    </small>
                                  </div>
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
                                      onClick={() =>
                                        router.push({
                                          pathname:
                                            VIRTUAL_EVENT_DETAILS +
                                            id +
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
                                  <div className="d-flex align-items-center">
                                    <img
                                      src={
                                        roomType === "training-room"
                                          ? "/assets/images/offline-course.svg"
                                          : roomType === "coaching-room"
                                          ? "/assets/images/ic-coaching.svg"
                                          : roomType === "webinar"
                                          ? "/assets/images/ic-webinars.svg"
                                          : roomType === "event"
                                          ? "/assets/images/ic-events.svg"
                                          : roomType === "master-class"
                                          ? "/assets/images/ic-masterclass.svg"
                                          : roomType ===
                                              "business-network-room" &&
                                            "/assets/images/ic-bn-rooms.svg"
                                      }
                                      alt="virtual event"
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
                                          rooms?.id,
                                          rooms?.title,
                                          rooms?.courseType,
                                          rooms?.personalWebsiteLink
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
                              <div className="text-center flex-grow-1">
                                <small className="font-12 font-weight-semibold d-inline-flex">
                                  {lang("COMMON.FREE")}
                                </small>
                                <small className="d-block font-12 font-weight-bold">
                                  <span className="">
                                    {rooms?.freePrice ? rooms?.freePrice : "0"}
                                  </span>{" "}
                                  <span className="">YC</span>
                                </small>
                              </div>
                              {rooms?.freePrice > 0 && (
                                <>
                                  <hr className="bg-paper-white m-0 course-card-hr"></hr>{" "}
                                  <div className="text-center flex-grow-1">
                                    <small className="font-weight-semibold font-12 d-inline-flex">
                                      {lang("COMMON.LITE")}
                                    </small>
                                    <small className="d-block font-weight-bold font-12">
                                      <span className="">
                                        {rooms?.litePrice}{" "}
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
                                        {rooms?.premiumPrice}{" "}
                                      </span>
                                      <span className="">YC</span>
                                    </small>
                                  </div>
                                </>
                              )}
                            </div>
                          </Card.Footer>
                        </Card>
                      </div>
                    );
                  })}
                </Carousel>
              )
            )}
          </Card.Body>
        </Card>
      )}

      <MainModal
        className="add-to-gmodal modal"
        show={addtoGrowthModelotherRoom}
        keyModal="addtoGrowthModelotherRoom"
        body={
          <AddToGMModal
            toggleGMModal={addToGModalToggle}
            data={gmodalData}
            roomData={"otherRooms"}
          />
        }
        headerClassName="mb-50 block md-mb-30"
        header={<h2 className="h6 mb-0">{lang("ROOMS.ADD_TO_GM")}</h2>}
      />
    </Fragment>
  );
};
export default OtherRooms;
