import React, { Children } from "react";
import { Layout } from "components/layout";
import Grid from "@mui/material/Grid";
import {
  RecentAddedGM,
  GrowthPartners,
  GrowthModal,
  MyProfile,
  MostFollowedContents,
  FollowedGroup,
  SiteLinks,
} from "components/sidebar";
import LatestArticle from "components/sidebar/latest-artcles";

const RightSidebarLayout = ({ children, removeSidebar }) => {
  return (
    <Layout removeSidebar={removeSidebar}>
      <div className="inner-wrapper profile-wrapper connection-box">
      <Grid container maxWidth="1160px" marginLeft={'auto'} marginRight={'auto'} paddingLeft={{ sm: 2, xs: 1 }} paddingRight={{ sm: 2, xs: 1 }}>
      <Grid item md={3}  xs={12} paddingRight={{ md: '10px', sm: 0 }}>
            {/* left sidebar section */}
            <div className="profile-left-bar " style={{ marginLeft: 0 }}>
              <MyProfile />
              <LatestArticle />
              <GrowthModal />
              <GrowthPartners />
              {/* <RecentAddedGM />
              <FollowedGroup />
              <div className="sticky-fix">
                <MostFollowedContents />
                <SiteLinks />
              </div> */}
            </div>
            </Grid>
            <Grid item md={9}  xs={12} paddingLeft={{ md: '6px', sm: 0 }}>
            {/* right section */}
            <div className="profile-right-bar">
              {Children?.map(children, (child) => {
                return child;
              })}
            </div>
            </Grid>
        </Grid>
      </div>
    </Layout>
  );
};

export default RightSidebarLayout;
