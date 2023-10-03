import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getPendingConnectionsList,
  getSentConnectionsList,
  getMyConnectionsList,
} from "store/actions/connections";
import { getGrowthPartnerList } from "store/actions";
import { useTranslation } from "react-i18next";
import { RightSidebarLayout } from "components/layout";
import { Card } from "react-bootstrap";
import {
  SentConnectionRequest,
  PendingConnectionRequest,
  MyConnections,
  PeopleYouMayKnow,
  MyGrowthConnections,
} from "components/my-connections";
import WithAuth from "components/with-auth/with-auth";
import { useRouter } from "next/router";
import Tabs, { Tab } from "components/Tabs";

const CONNECTIONS_TAB_TYPES = {
  MY_GROWTH_CONNECTION: "my_growth_connection",
  MY_CONNECTION: "my-connection",
  PENDING_CONNECTION: "pending_connection",
  SENT_CONNECTION: "sent_connection",
};

const MyConnection = () => {
  const [lang] = useTranslation("language");
  const dispatch = useDispatch();
  const router = useRouter();
  const { tab } = router.query;
  const [tabKey, setTabKey] = useState(
    tab || CONNECTIONS_TAB_TYPES.PENDING_CONNECTION
  );
  const [showPeopleYouMayKnow, setShowPeopleYouMayKnow] = useState(true);
  const pendingList = useSelector(
    (state) => state.connections.pendingConnectionList
  );
  const sentList = useSelector((state) => state.connections.sentConnectionList);
  const growthPartners = useSelector((state) => state?.growth?.growthPartners);
  const totalConnection = useSelector(
    (state) => state.connections.totalConnection
  );

  useEffect(() => {
    if (!tab) {
      router.push({
        pathname: router.pathname,
        query: {
          ...router.query,
          tab: CONNECTIONS_TAB_TYPES.PENDING_CONNECTION,
        },
      });
    } else if (tab) {
      setTabKey(tab);
    }
  }, [router.query]);

  useEffect(() => {
    if (tab === CONNECTIONS_TAB_TYPES.PENDING_CONNECTION) {
      setShowPeopleYouMayKnow(true);
      dispatch(
        getPendingConnectionsList({
          page: 1,
          pagesize: 10,
          search: "",
        })
      );
    } else if (tab === CONNECTIONS_TAB_TYPES.SENT_CONNECTION) {
      setShowPeopleYouMayKnow(true);
      dispatch(
        getSentConnectionsList({
          page: 1,
          pagesize: 10,
          search: "",
        })
      );
    } else if (tab === CONNECTIONS_TAB_TYPES.MY_GROWTH_CONNECTION) {
      dispatch(
        getGrowthPartnerList({
          page: 1,
          pagesize: 10,
          search: "",
        })
      );
    } else {
      dispatch(
        getMyConnectionsList({
          page: 1,
          pagesize: 10,
          search: "",
        })
      );
    }
  }, [tab]);

  const getTabBody = (currentTab) => {
    switch (currentTab) {
      case CONNECTIONS_TAB_TYPES.MY_CONNECTION:
        return <MyConnections tabKey={currentTab} />;
      case CONNECTIONS_TAB_TYPES.MY_GROWTH_CONNECTION:
        return (
          <MyGrowthConnections
            tabKey={tabKey}
            setShowPYMK={setShowPeopleYouMayKnow}
          />
        );
      case CONNECTIONS_TAB_TYPES.PENDING_CONNECTION:
        return <PendingConnectionRequest tabKey={currentTab} />;
      case CONNECTIONS_TAB_TYPES.SENT_CONNECTION:
        return <SentConnectionRequest tabKey={currentTab} />;
    }
  };

  return (
    <RightSidebarLayout removeSidebar="footer">
      <Card
        className="mb-4"
        style={{
          boxShadow:
            "0px 1px 3px 1px rgba(0, 0, 0, 0.15), 0px 1px 2px 0px rgba(0, 0, 0, 0.30)",
          border: "none",
        }}
      >
        <Tabs
          value={tabKey}
          onClick={(tabVal) => {
            setTabKey(tabVal);
            router.push({
              pathname: router.pathname,
              query: { tab: tabVal },
            });
          }}
        >
          <Tab tabKey={CONNECTIONS_TAB_TYPES.MY_GROWTH_CONNECTION}>
            <span
              className={
                tabKey === CONNECTIONS_TAB_TYPES.MY_GROWTH_CONNECTION
                  ? "tab-badge active"
                  : "tab-badge"
              }
            >
              {growthPartners?.data?.total || 0}
            </span>
            {lang("CONNECTIONS.MY_GROWTH_CONNECTIONS")}
          </Tab>
          <Tab tabKey={CONNECTIONS_TAB_TYPES.MY_CONNECTION}>
            <span
              className={
                tabKey === CONNECTIONS_TAB_TYPES.MY_CONNECTION
                  ? "tab-badge active"
                  : "tab-badge"
              }
            >
              {totalConnection || 0}
            </span>
            {lang("CONNECTIONS.MY_CONNECTIONS")}
          </Tab>
          <Tab tabKey={CONNECTIONS_TAB_TYPES.PENDING_CONNECTION}>
            <span
              className={
                tabKey === CONNECTIONS_TAB_TYPES.PENDING_CONNECTION
                  ? "tab-badge active"
                  : "tab-badge"
              }
            >
              {pendingList.total || 0}
            </span>
            {lang("CONNECTIONS.PENDING_CONNECTION")}
          </Tab>
          <Tab tabKey={CONNECTIONS_TAB_TYPES.SENT_CONNECTION}>
            <span
              className={
                tabKey === CONNECTIONS_TAB_TYPES.SENT_CONNECTION
                  ? "tab-badge active"
                  : "tab-badge"
              }
            >
              {sentList.total || 0}
            </span>
            {lang("CONNECTIONS.SENT_CONNECTIONS")}
          </Tab>
        </Tabs>
        <div className="tab-body" style={{ padding: "0 1.5rem 0" }}>
          {getTabBody(tabKey)}
        </div>
      </Card>
    </RightSidebarLayout>
  );
};
export default WithAuth(MyConnection);
