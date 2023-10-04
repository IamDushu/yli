import React from "react";
import { Layout } from "components/layout";
import WithAuth from "components/with-auth/with-auth";

// import Message from "components/messages";
import Message from "components/messagesV2";
import { SiteLinks } from "components/sidebar";
import { Container } from "react-bootstrap";
import MessageV3 from "components/MessagesV3";

const Messages = () => {
  /******************* 
  @purpose : Rander HTML/ React Components
  @Author : INIC
  ******************/
  return (
    <Layout removeSidebar={"footer"}>
      <div className="inner-wrapper profile-wrapper connection-box pt-4 pb-0">
        <Container>
          <div className="message-page-container">
            {/* <Message /> */}
            <MessageV3 />
          </div>

          {/* <SiteLinks /> */}
        </Container>
      </div>
    </Layout>
  );
};
export default WithAuth(Messages);
