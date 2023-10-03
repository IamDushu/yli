import React from "react";

import WithAuth from "components/with-auth/with-auth";
import Events from "./event";
import { SidebarLayout } from "components/layout";

const EventsWrapper = () => {
  /******************* 
  @purpose : Rander HTML/ React Components
  @Author : INIC
  ******************/
  return (
    <SidebarLayout removeSidebar="footer" removeRightSidebar>
      <Events />
    </SidebarLayout>
  );
};

export default WithAuth(EventsWrapper);
