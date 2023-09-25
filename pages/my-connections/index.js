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
import { Card, Tabs, Tab, Badge } from "react-bootstrap";
import {
  SentConnectionRequest,
  PendingConnectionRequest,
  MyConnections,
  PeopleYouMayKnow,
  MyGrowthConnections,
} from "components/my-connections";
import WithAuth from "components/with-auth/with-auth";
import { useRouter } from "next/router";

const MyConnection = () => {
  const [lang] = useTranslation("language");
  const dispatch = useDispatch();
  const router = useRouter();
  const { tab } = router.query;
  const [tabKey, setTabKey] = useState(tab || "pending_connection");
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
        query: { ...router.query, tab: "pending_connection" },
      });
    } else if (tab) {
      setTabKey(tab);
    }
  }, [router.query]);

  useEffect(() => {
    if (tab === "pending_connection") {
      setShowPeopleYouMayKnow(true);
      dispatch(
        getPendingConnectionsList({
          page: 1,
          pagesize: 8,
          search: "",
        })
      );
    } else if (tab === "sent_connection") {
      setShowPeopleYouMayKnow(true);
      dispatch(
        getSentConnectionsList({
          page: 1,
          pagesize: 8,
          search: "",
        })
      );
    } else if (tab === "my_growth_connection") {
      dispatch(
        getGrowthPartnerList({
          page: 1,
          pagesize: 8,
          search: "",
        })
      );
    } else {
      dispatch(
        getMyConnectionsList({
          page: 1,
          pagesize: 20,
          search: "",
        })
      );
    }
  }, [tab]);

  return (
    <RightSidebarLayout removeSidebar="footer">
      <Card className=" mb-2 mb-md-3">
        <Card.Body className="p-0">
          <Tabs
            activeKey={tabKey}
            id="groups-tabs-section"
            className="custom-tabs custom-group-tabs px-12 mb-2 border-bottom border-geyser group-nav-tabs"
            onSelect={(e) => {
              setTabKey(e);
              router.push({
                pathname: router.pathname,
                query: { tab: e },
              });
            }}
          >
            <Tab
              eventKey="pending_connection"
              title={
                <>
                  {lang("CONNECTIONS.PENDING_CONNECTION")}
                  <Badge
                    pill
                    variant="primary"
                    className="badge-custom badge-sm"
                  >
                    {pendingList.total}
                  </Badge>
                </>
              }
            >
              {tabKey === "pending_connection" && (
                <PendingConnectionRequest tabKey={tabKey} />
              )}
            </Tab>

            <Tab
              eventKey="sent_connection"
              title={
                <>
                  {lang("CONNECTIONS.SENT_CONNECTIONS")}
                  <Badge
                    pill
                    variant="primary"
                    className="badge-custom badge-sm"
                  >
                    {sentList.total}
                  </Badge>
                </>
              }
            >
              {tabKey === "sent_connection" && (
                <SentConnectionRequest tabKey={tabKey} />
              )}
            </Tab>

            <Tab
              eventKey="my_growth_connection"
              title={
                <>
                  {lang("CONNECTIONS.MY_GROWTH_CONNECTIONS")}
                  {growthPartners?.data?.total > 0 && (
                    <Badge
                      pill
                      variant="primary"
                      className="badge-custom badge-sm"
                    >
                      {growthPartners?.data?.total}
                    </Badge>
                  )}
                </>
              }
            >
              {tabKey === "my_growth_connection" && (
                <MyGrowthConnections
                  tabKey={tabKey}
                  setShowPYMK={setShowPeopleYouMayKnow}
                />
              )}
            </Tab>

            <Tab
              eventKey="my-connection"
              title={
                <>
                  {lang("CONNECTIONS.MY_CONNECTIONS")}
                  {totalConnection > 0 && (
                    <Badge
                      pill
                      variant="primary"
                      className="badge-custom badge-sm"
                    >
                      {totalConnection}
                    </Badge>
                  )}
                </>
              }
            >
              {tabKey === "my-connection" && <MyConnections tabKey={tabKey} />}
            </Tab>
          </Tabs>

          {/* Sent connection request */}
        </Card.Body>
      </Card>
      {showPeopleYouMayKnow && <PeopleYouMayKnow />}
    </RightSidebarLayout>
  );
};
export default WithAuth(MyConnection);
