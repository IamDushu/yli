import React from "react";
import { Container } from "react-bootstrap";

import { Layout } from "components/layout";
import WithAuth from "components/with-auth/with-auth";
import Events from "./event";

const EventsWrapper = () => {
  /******************* 
  @purpose : Rander HTML/ React Components
  @Author : INIC
  ******************/
  return (
    <Layout removeSidebar={"footer"}>
      <div className="inner-wrapper profile-wrapper connection-box pt-4 pb-0">
        <Container>
          <div className="message-page-container">
            <Events />
          </div>
        </Container>
      </div>
    </Layout>
  );
};

export default WithAuth(EventsWrapper);
