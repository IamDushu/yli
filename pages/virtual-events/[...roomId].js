import React, { useEffect, useState } from "react";
import { Layout } from "@components/layout";
import { Card, Container } from "react-bootstrap";
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
import { Helmet } from "react-helmet"; 
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { roomDetails, setRoomDetailsClear } from "store/actions/room";
import WithAuth from "components/with-auth/with-auth";
import { selectUserInfo } from "store/selectors/user";
import OtherRooms from "components/otherCoursesRooms/otherRooms";
import OtherMatchToGM from "components/otherCoursesRooms/otherMatchToGM";
import RoomFeatures from "components/rooms/room-features";
import { onImageError,removeHTMLTags } from "utils";
import AboutInsititue from "components/profile/about-institute";
import CourseDetailLoader from "components/ui/course-detail-loader";

const RoomDetail = (roomType) => {
  const router = useRouter();
  const { roomId } = router.query;
  const dispatch = useDispatch();
  /******************** 
  @purpose : Used for use Selector 
  @Parameter : { data, dispatch }
  @Author : INIC
  ******************/
  const { roomDetail } = useSelector((state) => state?.room);
  const userData = useSelector(selectUserInfo);
  const { roomDetailLoader } = useSelector(
    ({ ui }) => ui.loaders,
    shallowEqual
  );

  /******************** 
  @purpose : Used for use effect
  @Parameter : { data, dispatch }
  @Author : INIC
  ******************/
  useEffect(() => {
    dispatch(roomDetails(roomId[0], router));
  }, [roomId]);

  useEffect(() => {
    return () => {
      dispatch(setRoomDetailsClear());
    };
  }, [roomId]);
  if (roomDetailLoader) {
    return <CourseDetailLoader sidebar={true} />;
  }


/*******
 @purpose : og extraction 
 @Author : YLIWAY
 */

  // Extract necessary data for og:image, og:title, og:description
  const ogImage = roomDetail?.imageURL || "virtual-event image";
  const ogTitle = roomDetail?.title? roomDetail?.title?.slice(0,300) :"virtual-event title";
  const ogDescription = (roomDetail?.fullDescription)? removeHTMLTags(roomDetail?.fullDescription).slice(0, 300):"virtual-event description";

  /******************* 
  @purpose : Rander HTML/ React Components
  @Author : INIC
  ******************/
  return (
    <>
      <Layout>
        {/* meta data for og:image, og:title, og:description */}
      <Helmet>
        <meta property="og:image" content={ogImage} />
        <meta property="og:title" content={ogTitle} />
        <meta property="og:description" content={ogDescription} />
      </Helmet>
        <div className="inner-wrapper profile-wrapper virtual-event-detail pt-0 pb-2">
          <Card>
            <Card.Body className="p-0">
              <div className="courses-banner-wrap w-100">
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
                      roomDetail?.imageURL
                        ? roomDetail?.imageURL
                        : "../assets/images/homepage/profile-bg.jpg"
                    }
                    alt="Profile-Banner"
                    className="w-100"
                    height="500"
                    onError={(e) => {
                      onImageError(e, "myprofile");
                    }}
                  />
                </picture>
              </div>
            </Card.Body>
          </Card>

          <Container className="d-lg-flex pb-2 pb-md-4 container">
            <div className="mt-4 pb-2 pb-md-4 profile-left-bar">
              <RoomFeatures userData={userData} />
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
                  companyDetails={roomDetail?.companyDetails}
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
            <div className="profile-right-bar mt-4 ">
              <UpgradeYourProfile />
              <GrowthModal />
              <GrowthPartners />
              <RecentAddedGM />
              <FollowedGroup />

              <MostFollowedContents />
            </div>
          </Container>
        </div>
      </Layout>
    </>
  );
};
export default WithAuth(RoomDetail);
