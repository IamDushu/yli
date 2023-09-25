import React from "react";
import { Container, Row, Card } from "react-bootstrap";
import { Layout } from "@components/layout";
import { RoomsList } from "components/rooms";
import { MyProfile, GrowthModal, Add } from "components/sidebar";
import WithAuth from "components/with-auth/with-auth";

const Rooms = () => {
  /******************* 
  @purpose : Rander HTML/ React Components
  @Author : INIC
  ******************/

  return (
    <Layout>
      <div className="inner-wrapper video-courses">
        <Container>
          <div className="d-flex flex-md-nowrap flex-wrap two-column-sidebar">
            {/* left profile section */}
            <div className="left-profile-section">
              {/* profile section */}
              <MyProfile />
              {/* growth modal listing */}
              <GrowthModal />
              <Add />
            </div>

            {/* Video Courses list : START */}
            <div className="right-profile-section">
              <RoomsList />
            </div>
            {/* Video Courses list : END */}
          </div>
        </Container>
      </div>
    </Layout>
  );
};

export default WithAuth(Rooms);
