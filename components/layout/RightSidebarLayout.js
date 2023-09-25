import React, { Children } from "react";
import { Layout } from "components/layout";
import { Container } from "react-bootstrap";
import {
  RecentAddedGM,
  GrowthPartners,
  GrowthModal,
  MyProfile,
  MostFollowedContents,
  FollowedGroup,
  SiteLinks,
} from "components/sidebar";

const RightSidebarLayout = ({ children, removeSidebar }) => {
  return (
    <Layout removeSidebar={removeSidebar}>
      <div className="inner-wrapper profile-wrapper connection-box">
        <Container>
          <div className="d-flex flex-xl-nowrap flex-wrap">
            {/* post view */}
            <div className="profile-left-bar">
              {Children?.map(children, (child) => {
                return child;
              })}
            </div>

            {/* right blog section */}
            <div className="profile-right-bar">
              <MyProfile />
              <GrowthModal />
              <GrowthPartners />
              <RecentAddedGM />
              <FollowedGroup />
              <div className="sticky-fix">
                <MostFollowedContents />
                <SiteLinks />
              </div>
            </div>
          </div>
        </Container>
      </div>
    </Layout>
  );
};

export default RightSidebarLayout;
