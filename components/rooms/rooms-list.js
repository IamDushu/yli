import React, { Fragment, useState, useEffect } from "react";
import { Card, Row, Col, Button, Form } from "react-bootstrap";
import { Link } from "@routes";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { VIRTUAL_EVENT_DETAILS } from "../../routes/urls";
import { RoomList, LanguageList } from "store/actions/room";
import moment from "moment";
import momentTimezone from "moment-timezone";
import InfiniteScroll from "react-infinite-scroll-component";
import { onImageError } from "utils";
import Filter from "components/common/filter-course-room";
import { toggleModals } from "store/actions";
import { selectUserInfo } from "store/selectors/user";
import { APP_URL } from "config";
import { useTranslation } from "react-i18next";
import dynamic from "next/dynamic";
import StarRatings from "react-star-ratings";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import CourseLoader from "components/ui/courseLoader";
const MainModal = dynamic(() =>
  import("components/modal").then((mod) => mod.MainModal)
);
const AddToGMModal = dynamic(() =>
  import("components/modal").then((mod) => mod.AddToGMModal)
);
const RoomsList = () => {
  const [lang] = useTranslation("language");
  const router = useRouter();
  const roomType = router.query.type;

  const dispatch = useDispatch();
  /******************** 
@purpose : Used for use State
@Parameter : {  }
@Author : INIC
******************/

  const [body, setBody] = useState({
    pagesize: 10,
    searchText: "",
  });
  const [show, setShow] = useState(false);

  /******************** 
@purpose : Used for use selector
@Parameter : {  }
@Author : INIC
******************/
  const { roomList } = useSelector((state) => state.room);
  const { addtoGrowthModel } = useSelector(({ ui }) => ui.modals, shallowEqual);
   const userInfo = useSelector(selectUserInfo);

  /******************** 
@purpose : Used for use effect
@Parameter : {  }
@Author : INIC
******************/
  useEffect(() => {
    const payload = {
      page: 1,
      pagesize: body.pagesize,
      searchText: body.searchText,
      virtualEventType: roomType,
      language: body.language,
      sortByPrice: body.sortByPrice,
      skills: body.skills,
      duration: body.duration,
      rating: body.rating,
    };
    dispatch(RoomList(payload));
  }, [body, roomType]);

  useEffect(() => {
    setShow(false);
    delete body.language;
    delete body.sortByPrice;
    delete body.skills;
    delete body.duration;
    delete body.rating;
  }, [roomType]);

  useEffect(() => {
    dispatch(LanguageList());
  }, []);

  const fetchMoreRooms = () => {
    setBody({ ...body, pagesize: body.pagesize + 10 });
  };

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
      dispatch(toggleModals({ addtoGrowthModel: true }));
    } else {
      setGmodalData({ ...initGModalData });
      dispatch(toggleModals({ addtoGrowthModel: false }));
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
  if (!roomList?.rows) {
    return (
      <>
        {" "}
        <Filter
          body={body}
          setBody={setBody}
          show={show}
          setShow={setShow}
        />{" "}
        <Card>
          <Card.Header className="p-4 border-bottom border-dark">
            <h6 className="mb-0">
              {roomType === "training-room" &&
                lang("ROOMS.TRAINING_ROOMS_TITLE")}
              {roomType === "coaching-room" &&
                lang("ROOMS.COACHING_ROOMS_TITLE")}
              {roomType === "webinar" && lang("ROOMS.WEBINARS_TITLE")}
              {roomType === "event" && lang("ROOMS.EVENTS_TITLE")}
              {roomType === "master-class" && lang("ROOMS.MASTERCLASS")}
              {roomType === "business-network-room" && lang("ROOMS.BN_TITLE")}
            </h6>
          </Card.Header>
        </Card>
        <CourseLoader />
      </>
    );
  }
  /******************* 
  @purpose : Rander HTML/ React Components
  @Author : INIC
  ******************/
  return (
    <Fragment>
      <Filter body={body} setBody={setBody} show={show} setShow={setShow} />
      <Card>
        <Card.Header className="p-3 p-md-3 border-bottom border-dark">
          <h6 className="mb-0">
            {roomType === "training-room" && lang("ROOMS.TRAINING_ROOMS_TITLE")}
            {roomType === "coaching-room" && lang("ROOMS.COACHING_ROOMS_TITLE")}
            {roomType === "webinar" && lang("ROOMS.WEBINARS_TITLE")}
            {roomType === "event" && lang("ROOMS.EVENTS_TITLE")}
            {roomType === "master-class" && lang("ROOMS.MASTERCLASS")}
            {roomType === "business-network-room" && lang("ROOMS.BN_TITLE")}
          </h6>
        </Card.Header>
        <Card.Body>
          <div className="d-flex flex-xl-nowrap flex-wrap">
            <div className="video-courses-rightbar w-100">
              {roomList && roomList?.rows?.length === 0 ? (
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
                <InfiniteScroll
                  dataLength={
                    roomList !== "" && roomList?.rows?.length > 0
                      ? roomList?.rows?.length
                      : ""
                  }
                  next={fetchMoreRooms}
                  hasMore={roomList?.rows?.length !== roomList.total}
                  loader={<CourseLoader />}
                >
                  <Row className="pt-1 row-col-10 three-grid-spacing">
                    {roomList?.rows?.length > 0 &&
                      roomList?.rows
                        ?.sort(
                          (a, b) =>
                            new Date(a.startDate) - new Date(b.startDate)
                        )
                        .map((rooms, index) => {
                          const id = rooms?.id;

                          return (
                            <React.Fragment>
                              <Col
                                lg={4}
                                sm={6}
                                key={rooms?.id}
                                className="d-flex w-100 "
                              >
                                <Card className="secondary-card abstract-card-v2 h-100">
                                  <Card.Body className="d-flex flex-column h-100">
                                    {/* <Link
                                    route={
                                      VIRTUAL_EVENT_DETAILS + id + "/false"
                                    }
                                  > */}
                                    {/* <a> */}
                                    <div
                                      className="position-relative pointer"
                                      onClick={() => {
                                        router.push({
                                          pathname:
                                            VIRTUAL_EVENT_DETAILS +
                                            id +
                                            "/false",
                                        });
                                      }}
                                    >
                                      <picture
                                        onContextMenu={(e) =>
                                          e.preventDefault()
                                        }
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
                                    {/* </a> */}
                                    {/* </Link> */}

                                    <div className="courses-info px-3 pt-3 pb-2 d-flex flex-column">
                                      {/* <Link
                                      route={
                                        VIRTUAL_EVENT_DETAILS + id + "/false"
                                      }
                                    >
                                      <a> */}
                                      <div
                                        className="title-container"
                                        onClick={() => {
                                          router.push({
                                            pathname:
                                              VIRTUAL_EVENT_DETAILS +
                                              id +
                                              "/false",
                                          });
                                        }}
                                      >
                                        <h6 className="font-weight-bold text-body-16 mb-0 pointer ellipsis">
                                          {rooms?.title
                                            ?.charAt(0)
                                            .toUpperCase() +
                                            rooms?.title?.slice(1)}
                                        </h6>
                                      </div>
                                      {/* </a>
                                    </Link> */}
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
                                              {`${
                                                userInfo?.timezone
                                                  ? momentTimezone(
                                                      rooms?.startDate
                                                    )
                                                      .tz(userInfo?.timezone)
                                                      .format("DD/MM/YY")
                                                  : moment(
                                                      rooms?.startDate
                                                    ).format("DD/MM/YY")
                                              }`}{" "}
                                              &bull;{" "}
                                              {userInfo?.timezone
                                                ? momentTimezone(
                                                    rooms?.startDate
                                                  )
                                                    .tz(userInfo?.timezone)
                                                    .format("hh:mm a")
                                                : moment(
                                                    rooms?.startDate
                                                  ).format("hh:mm a")}
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
                                              src={
                                                "/assets/images/icon-add-gm.svg"
                                              }
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
                                            {rooms?.freePrice
                                              ? rooms?.freePrice
                                              : "0"}
                                          </span>{" "}
                                          <span className="">YC</span>
                                        </small>
                                      </div>
                                      {/* {rooms?.freePrice > 0 && ( */}
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
                              </Col>
                            </React.Fragment>
                          );
                        })}
                  </Row>
                </InfiniteScroll>
              )}
            </div>
          </div>
        </Card.Body>
      </Card>
      <MainModal
        className="add-to-gmodal modal"
        show={addtoGrowthModel}
        keyModal="addtoGrowthModel"
        body={
          <AddToGMModal
            toggleGMModal={addToGModalToggle}
            data={gmodalData}
            roomData={"roomList"}
          />
        }
        headerClassName="mb-50 block md-mb-30"
        header={<h2 className="h6 mb-0"> {lang("ROOMS.ADD_TO_GM")}</h2>}
      />
    </Fragment>
  );
};
export default RoomsList;
