import {
  FollowedGroup,
  GrowthModal,
  GrowthPartners,
  MostFollowedContents,
  RecentAddedGM,
  UpgradeYourProfile,
} from "components/sidebar";
import React from "react";
import { Fragment } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const CourseDetailLoader = ({ sidebar }) => {
  return (
    <div className="profile-wrapper ">
      <Skeleton height={70} style={{ backgroundColor: "#DCDCDC" }} />
      <Skeleton height={350} style={{ backgroundColor: "#DCDCDC" }} />
      <Skeleton height={100} style={{ backgroundColor: "#DCDCDC" }} />
      <div className="bg-paper-white pt-1">
        <Container className="d-lg-flex pb-2 pb-md-4">
          <div className="profile-left-bar">
            <Fragment>
              <Card className="my-3 my-md-4">
                <Card.Body className="p-md-4 p-3">
                  <div className="mb-4">
                    <Skeleton count={4} height={16} style={{ backgroundColor: "#DCDCDC" }} />
                  </div>
                  <div className="mb-4">
                    <Skeleton count={4} height={16} style={{ backgroundColor: "#DCDCDC" }} />
                  </div>
                  <div className="mb-4">
                    <Skeleton count={4} height={16} style={{ backgroundColor: "#DCDCDC" }} />
                  </div>
                  <div className="mb-4">
                    <Skeleton count={2} height={16} style={{ backgroundColor: "#DCDCDC" }} />
                  </div>
                  <div className="">
                    <Skeleton count={3} height={16} style={{ backgroundColor: "#DCDCDC" }} />
                  </div>
                </Card.Body>
              </Card>
              <Card className="my-3 my-md-4">
                <Card.Body className="p-md-4 p-3">
                  <div className="mb-4">
                    <Skeleton height={16} style={{ backgroundColor: "#DCDCDC" }} />
                  </div>
                  <div className="mb-4">
                    <Skeleton height={60} style={{ backgroundColor: "#DCDCDC" }} />
                  </div>
                  <div className="">
                    <Skeleton count={4} height={16} style={{ backgroundColor: "#DCDCDC" }} />
                  </div>
                </Card.Body>
              </Card>
              <Card className="my-3 my-md-4">
                <Card.Body className="p-md-4 p-3">
                  <div className="mb-4">
                    <Skeleton height={16} style={{ backgroundColor: "#DCDCDC" }} />
                  </div>
                  <div className="mb-4">
                    <Skeleton count={4} style={{ backgroundColor: "#DCDCDC" }} />
                  </div>
                  <div className="">
                    <Skeleton count={4} height={16} style={{ backgroundColor: "#DCDCDC" }} />
                  </div>
                </Card.Body>
              </Card>
              <Card className="my-3 my-md-4">
                <Card.Body className="p-md-4 p-3">
                  <div className="mb-4">
                    <Skeleton height={16} style={{ backgroundColor: "#DCDCDC" }} />
                  </div>
                  <Row>
                    <Col md={4} className="mb-4 mb-md-0">
                      <div className="mb-3">
                        <Skeleton height={140} style={{ backgroundColor: "#DCDCDC" }} />
                      </div>
                      <div className="mb-3">
                        <Skeleton count={4} style={{ backgroundColor: "#DCDCDC" }} />
                      </div>
                      <div>
                        <Skeleton count={2} style={{ backgroundColor: "#DCDCDC" }} />
                      </div>
                    </Col>
                    <Col md={4} className="mb-4 mb-md-0">
                      <div className="mb-3">
                        <Skeleton height={140} style={{ backgroundColor: "#DCDCDC" }} />
                      </div>
                      <div className="mb-3">
                        <Skeleton count={4} style={{ backgroundColor: "#DCDCDC" }} />
                      </div>
                      <div>
                        <Skeleton count={2} style={{ backgroundColor: "#DCDCDC" }} />
                      </div>
                    </Col>
                    <Col md={4}>
                      <div className="mb-3">
                        <Skeleton height={140} style={{ backgroundColor: "#DCDCDC" }} />
                      </div>
                      <div className="mb-3">
                        <Skeleton count={4} style={{ backgroundColor: "#DCDCDC" }} />
                      </div>
                      <div>
                        <Skeleton count={2} style={{ backgroundColor: "#DCDCDC" }} />
                      </div>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Fragment>
          </div>
          {sidebar && (
            <div className="profile-right-bar mt-4">
              <UpgradeYourProfile />
              <GrowthModal />
              <GrowthPartners />
              <RecentAddedGM />
              <FollowedGroup />
              <MostFollowedContents />
            </div>
          )}
        </Container>
      </div>
    </div>
  );
};

export default CourseDetailLoader;
