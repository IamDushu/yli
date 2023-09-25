import React, { Children } from "react";
import { Container } from "react-bootstrap";
import { Layout } from "@components/layout";
import {
  MyProfile,
  RecentAddedGM,
  MostFollowedContents,
  Add,
  GrowthPartners,
  FollowedGroup,
  GrowthModal,
  SiteLinks,
} from "components/sidebar";

const SidebarLayout = ({ children, removeSidebar }) => {
  return (
    <Layout removeSidebar={removeSidebar}>
      <div className="inner-wrapper dashboard-box">
        <Container>
          <div className="d-flex flex-wrap">
            <div className="left-profile-section">
              <MyProfile />
              <GrowthModal />
              <div className="sticky-fix">
                <Add />
                <SiteLinks />
              </div>
            </div>

            {/* post view */}
            <div className="post-section">
              {Children?.map(children, (child) => {
                return child;
              })}
            </div>

            {/* right blog section */}
            <div className="right-blog-section w-lg-100 p-sm-0 mt-3 mt-lg-0">
              <GrowthPartners />
              <RecentAddedGM />
              <FollowedGroup />
              <div className="sticky-fix">
                <MostFollowedContents />
              </div>
            </div>
          </div>
        </Container>
      </div>
    </Layout>
  );
};

export default SidebarLayout;
