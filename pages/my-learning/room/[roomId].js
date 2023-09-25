import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Layout } from "@components/layout";
import { Button, Card, Col, Row } from "react-bootstrap";
import { YMEET_API } from "config";

import {
  RecentAddedGM,
  UpgradeYourProfile,
  GrowthPartners,
  GrowthModal,
  MostFollowedContents,
  FollowedGroup,
} from "components/sidebar";
import { StudentFeedback, AboutTeacher } from "components/profile";
import { useRouter } from "next/router";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {
  createOrAddMemberToChannel,
  getVirtualEventJoin,
  roomDetails,
  setRoomDetailsClear,
} from "store/actions/room";
import WithAuth from "components/with-auth/with-auth";
import { selectUserInfo } from "store/selectors/user";
import LoadingLayer from "components/zoom/loading-layer";
import OtherRooms from "components/otherCoursesRooms/otherRooms";
import OtherMatchToGM from "components/otherCoursesRooms/otherMatchToGM";
import { getCookie, onImageError, showMessageNotification } from "utils";
import RoomFeatures from "components/my-learning/room/room-features";
import moment from "moment";
import Ymeeting from "components/ymeet/Ymeeting";
import AboutInsititue from "components/profile/about-institute";
import CourseDetailLoader from "components/ui/course-detail-loader";

const RoomDetail = () => {
  const router = useRouter();
  const { roomId } = router.query;
  const dispatch = useDispatch();
  const [lang] = useTranslation("language");

  const [zoomApi, setZoomApi] = useState(false);
  const [loading, setIsLoading] = useState(true);
  const [loadingText, setLoadingText] = useState("");
  const [showJoin, setShowJoin] = useState(false);
  const [isLaunchButton, setIsLaunchButton] = useState(false);
  const { roomDetailLoader } = useSelector(
    ({ ui }) => ui.loaders,
    shallowEqual
  );
  /******************** 
  @purpose : Used for use Selector 
  @Parameter : { data, dispatch }
  @Author : INIC
  ******************/
  const { roomDetail } = useSelector((state) => state?.room);
  const userData = useSelector(selectUserInfo);

  /****************** YMEET *******************+*/
  let token = getCookie("token");

  /******************** 
  @purpose : Used for use effect
  @Parameter : { data, dispatch }
  @Author : INIC
  ******************/
  useEffect(() => {
    dispatch(roomDetails(roomId, router));
  }, []);
  useEffect(() => {
    setIsLaunchButton(roomDetail?.isLaunched);
  }, [roomDetail?.isLaunched]);
  useEffect(() => {
    return () => {
      dispatch(setRoomDetailsClear());
    };
  }, []);

  useEffect(() => {
    if (
      zoomApi === "true" &&
      showJoin &&
      roomDetail &&
      roomDetail?.purchaseDetails !== null
    ) {
      dispatch(getVirtualEventJoin({ virtualEventId: roomDetail?.id }));
    }

    if (roomDetail?.startDate !== undefined) {
      showJoinBtn();
    }

    if (
      roomDetail?.virtualEventType !== "welcome-room" &&
      roomDetail?.purchaseDetails === null
    ) {
      router.push("/virtual-events/" + roomId);
    }
  }, [zoomApi, roomDetail, showJoin, roomDetail?.purchaseDetails]);

  useEffect(() => {
    let launchTimeoutId;
    const currentDate = moment().format("MMMM DD YYYY");
    if (currentDate === moment(roomDetail?.startDate).format("MMMM DD YYYY")) {
      let launchBtn = moment(roomDetail?.startDate).subtract(10, "minutes");
      const launchTimeDiffInMillis = launchBtn.diff(moment());
      if (launchTimeDiffInMillis && launchTimeDiffInMillis > 0) {
        launchTimeoutId = setTimeout(() => {
          if (roomDetail?.startDate !== undefined) {
            showJoinBtn();
          }
        }, launchTimeDiffInMillis);
      }
    }
    return () => {
      if (launchTimeoutId) clearTimeout(launchTimeoutId);
    };
  }, [roomDetail]);
  /********************
  @purpose : zoom join btn show
  @Parameter : {  }
  @Author : INIC
  ******************/
  const showJoinBtn = () => {
    const currentDate = moment().format("MMMM DD YYYY");
    const currentTime = moment().format("HHmm");

    if (currentDate === moment(roomDetail?.startDate).format("MMMM DD YYYY")) {
      let givenTime = moment(roomDetail?.startDate)
        .subtract(10, "minutes")
        .format("HHmm");

      let durationAdd = moment(roomDetail?.startDate)
        .add(roomDetail?.duration, "minutes")
        .format("HHmm");
      if (currentTime >= givenTime && currentTime <= durationAdd) {
        setShowJoin(true);
      }
    }
  };

  const onJoinCall = () => {
    if (isLaunchButton) {
      createOrAddMemberToChannel(roomDetail?.id).then(() => {
        setZoomApi(true);
      });
    } else {
      showMessageNotification(lang("ROOMS.HOST_JOIN_MEETING"));
    }
  };
  if (roomDetailLoader) {
    return <CourseDetailLoader sidebar={true} />;
  }
  /******************* 
  @purpose : Rander HTML/ React Components
  @Author : INIC
  ******************/
  return (
    <>
      {loading && zoomApi === "true" && <LoadingLayer content={loadingText} />}
      <Layout isJoinRoom={zoomApi}>
        <div className="inner-wrapper profile-wrapper my-learning-virtual-event-detail pt-0">
          {!zoomApi && (
            <Row>
              {/* <Col md={12} className={`room-title-row`}>
                <h3 className="px-5">{roomDetail?.title}</h3>
                {roomDetail?.UserDetails?.id !== userData?.id &&
                  (roomDetail?.purchaseDetails !== null ||
                    roomDetail?.isSpecialGuest ||
                    roomDetail?.virtualEventType === "welcome-room") &&
                  showJoin && (
                    <Button
                      variant="primary"
                      className="btn-yliway-enroll px-4 my-auto"
                      onClick={() => setZoomApi(true)}
                    >
                      {lang("ROOMS.JOIN")}
                    </Button>
                  )}
              </Col> */}
            </Row>
          )}
          <Card>
            <Card.Body className="p-0">
              <div className="courses-banner-wrap w-100">
                {zoomApi === true ? (
                  <Ymeeting
                    domain={YMEET_API}
                    roomName={roomId}
                    token={token}
                    getIFrameRef={(node) => {
                      node.style.height = "calc(100vh - 70px)";
                    }}
                    configOverwrite={{
                      startWithAudioMuted: true,
                      hiddenPremeetingButtons: ["microphone"],
                    }}
                    onApiReady={(externalApi) => {
                      setIsLoading(false);
                    }}
                    onReadyToClose={() => {
                      setZoomApi(false);
                    }}
                  />
                ) : (
                  <picture onContextMenu={(e) => e.preventDefault()}>
                    <source
                      srcSet={
                        roomDetail?.imageURL
                          ? roomDetail?.imageURL
                          : "../assets/images/my-profile/profile-bg.jpg"
                      }
                      type="image/png"
                    />
                    <img
                      src={
                        roomDetail?.image
                          ? roomDetail?.image
                          : "../assets/images/homepage/profile-bg.jpg"
                      }
                      alt="Profile-Banner"
                      height="360"
                      className="object-cover w-100"
                      onError={(e) => {
                        onImageError(e, "myprofile");
                      }}
                    />
                  </picture>
                )}
              </div>
              <div className={`room-title-row bg-white container px-2 px-sm-3`}>
                <h3 className="text-secondary">{roomDetail?.title}</h3>
                {!zoomApi &&
                  roomDetail?.UserDetails?.id !== userData?.id &&
                  (roomDetail?.purchaseDetails !== null ||
                    roomDetail?.isSpecialGuest ||
                    roomDetail?.virtualEventType === "welcome-room") &&
                  showJoin && (
                    <Button
                      variant="primary"
                      className="btn-yliway-enroll px-4 my-auto"
                      onClick={onJoinCall}
                    >
                      {lang("ROOMS.JOIN")}
                    </Button>
                  )}
              </div>
            </Card.Body>
          </Card>

          <div className="d-flex flex-wrap d-xl-nowrap container">
            <div className="profile-left-bar mt-4 bg-white">
              <RoomFeatures />
              <div className="px-2 px-sm-4 pb-4">
                <OtherMatchToGM
                  type="rooms"
                  roomType={roomDetail?.virtualEventType}
                />
                {roomDetail?.instituteDetails?.id ? (
                  <AboutInsititue
                    rating={roomDetail?.rating}
                    instituteDetails={roomDetail?.instituteDetails}
                  />
                ) : (
                  <AboutTeacher
                    rating={roomDetail?.rating}
                    userDetails={roomDetail?.UserDetails}
                    type="rooms"
                    instituteDetails={roomDetail?.instituteDetails}
                  />
                )}
                <StudentFeedback type="rooms" sourceId={roomId} />
                <OtherRooms
                  userDetails={roomDetail?.UserDetails}
                  roomType={roomDetail?.virtualEventType}
                  roomId={roomDetail?.id}
                  instituteDetails={roomDetail?.instituteDetails}
                  userInfo={userData}
                />
              </div>
            </div>
            <div className="profile-right-bar my-4">
              <UpgradeYourProfile />
              <GrowthModal />
              <GrowthPartners />
              <RecentAddedGM />
              <FollowedGroup />

              <MostFollowedContents />
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};
export default WithAuth(RoomDetail);
