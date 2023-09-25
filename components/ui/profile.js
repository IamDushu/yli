import {
  FollowedGroup,
  GrowthModal,
  GrowthPartners,
  MostFollowedContents,
  RecentAddedGM,
} from "components/sidebar";
import OtherViews from "components/sidebar/other-views";
import React from "react";
import { Card, Button, Container } from "react-bootstrap";
import Skeleton from "react-loading-skeleton"; // React skeleton loader view
import "react-loading-skeleton/dist/skeleton.css";

/******************* 
@Purpose : Used for loader view
@Parameter : {}
@Author : INIC
******************/
function ProfileLoader({ type }) {
  return (
    <div className="inner-wrapper profile-wrapper my-profile py-3">
      <Container>
        <div className="d-flex flex-wrap d-xl-nowrap">
          <div className="profile-left-bar">
            <Card className="mb-4">
              <Card.Body className="p-0">
                <div className="profile-bg position-relative">
                  <Skeleton width="100%" height={200} />
                </div>
                <div className="profile-summary-wrap">
                  <div className="mt-xl-4 mt-5 mb-3 mx-md-4 mx-3 position-relative pt-5 d-md-flex justify-content-between">
                    <div className="">
                      <div className="profile-wrap pt-xl-0 pt-4">
                        <div className="overflow-hidden profile-box rounded-pill">
                          <Skeleton width={130} height={130} />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="profile-set mb-3 mx-md-4 mx-3">
                    <div
                      className={
                        "d-flex flex-wrap flex-xl-nowwrap justify-content-between"
                      }
                    ></div>
                  </div>
                </div>
              </Card.Body>
              <div>
                <h1>
                  <Skeleton count={3} />
                </h1>
                <h1>
                  <Skeleton count={2} />
                </h1>
                <h1>
                  <Skeleton count={2} />
                </h1>
                <h3>
                  <Skeleton count={2} />
                </h3>
                <h1>
                  <Skeleton count={2} />
                </h1>
                <h1>
                  <Skeleton count={2} />
                </h1>
                <h1>
                  <Skeleton count={2} />
                </h1>
              </div>
            </Card>
          </div>
          {type !== "otherProfile" && (
            <div className="profile-right-bar">
              <OtherViews />
              <GrowthModal />
              <GrowthPartners />
              <RecentAddedGM />
              <FollowedGroup />
              <MostFollowedContents />
            </div>
          )}
        </div>
      </Container>
    </div>
  );
}
export default ProfileLoader;
