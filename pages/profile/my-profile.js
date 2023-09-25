import React, { useEffect, useRef } from "react";
import { Layout } from "@components/layout";
import { Container } from "react-bootstrap";
import {
  RecentAddedGM,
  UpgradeYourProfile,
  GrowthPartners,
  GrowthModal,
} from "components/sidebar";
import {
  ProfileSummary,
  TotalSummary,
  Description,
  Activity,
  Experience,
  Education,
  Certifications,
  FollowedGroups,
  Languages,
} from "components/profile";
import { useDispatch } from "react-redux";
import {
  getGroupsJoinedList,
  getUserProfileData,
  postListing,
} from "../../store/actions";
import WithAuth from "../../components/with-auth/with-auth";

const MyProfile = () => {
  const dispatch = useDispatch();

  const descriptionRef = useRef();
  const experienceRef = useRef();
  const educationRef = useRef();
  const certificationRef = useRef();
  const languageRef = useRef();

  useEffect(() => {
    dispatch(getUserProfileData());
    dispatch(getGroupsJoinedList({ page: 1, pagesize: 4 }));
    dispatch(postListing({ page: 1, pagesize: 4 }));
  }, []);

  /******************* 
  @purpose : Rander HTML/ React Components
  @Author : INIC
  ******************/
  return (
    <Layout>
      <div className="inner-wrapper profile-wrapper my-profile">
        <Container>
          <div className="d-flex flex-wrap d-xl-nowrap">
            <div className="profile-left-bar">
              <ProfileSummary
                descriptionRef={descriptionRef}
                experienceRef={experienceRef}
                educationRef={educationRef}
                certificationRef={certificationRef}
                languageRef={languageRef}
              />
              <TotalSummary />
              <Description descriptionRef={descriptionRef} />
              <Activity />
              <Experience experienceRef={experienceRef} />
              <Education educationRef={educationRef} />
              <Certifications certificationRef={certificationRef} />
              <FollowedGroups />
              <Languages languageRef={languageRef} />
            </div>
            <div className="profile-right-bar">
              <UpgradeYourProfile />
              <GrowthModal />
              <GrowthPartners />
              <RecentAddedGM />
            </div>
          </div>
        </Container>
      </div>
    </Layout>
  );
};
export default WithAuth(MyProfile);
