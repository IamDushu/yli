import React, { useEffect, useState } from "react";
import WithAuth from "components/with-auth/with-auth";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { SidebarLayout } from "components/layout";
import TopicDetail from "components/topic/topic-detail";

/******************** 
  @purpose :  Topic
  @Parameter : {}
  @Author : INIC
  ******************/
function Topic() {
  const [lang] = useTranslation("language");
  const dispatch = useDispatch();
  const router = useRouter();
  return (
    <SidebarLayout removeSidebar="footer" removeRightSidebar>
        <TopicDetail/>
    </SidebarLayout>
  );
}

export default WithAuth(Topic);
