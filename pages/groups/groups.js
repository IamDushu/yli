import React, { useEffect } from "react";
import { useState } from "react";
import { RightSidebarLayout } from "components/layout";
import { Tabs, Card, Tab, Button } from "react-bootstrap";

import { useRouter } from "next/router";
import withAuth from "components/with-auth/with-auth";

import MyGroups from "components/groups/my-groups";
import Requested from "components/groups/requested";
import GroupsJoin from "components/groups/groups-join";
import InvitationsGroups from "components/groups/invitations-groups";
import AllGroups from "components/groups/all-groups";
import { useTranslation } from "react-i18next";
import Waiting from "components/groups/Waiting";

const Groups = () => {
  const router = useRouter();
  const groupTabKey = localStorage.getItem("groupTab");
  const key = router.query.tabKey;
  const { type, groupTab } = router.query;
  const [tabKey, setTabKey] = useState(
    type === "joined" ? "joined" : groupTabKey
  );

  const [lang] = useTranslation("language");
  useEffect(() => {
    localStorage.setItem("groupTab", tabKey);
  }, [tabKey]);

  useEffect(() => {
    if (!groupTab) {
      router.push(
        {
          pathname: router.pathname,
          query: { ...router.query, groupTab: "groups" },
        },
        undefined,
        { shallow: true }
      );
    } else if (groupTab) {
      setTabKey(groupTab);
    }
  }, [router.query]);
  /******************* 
  @purpose : Rander HTML/ React Components
  @Author : INIC
  ******************/
  return (
    <RightSidebarLayout>
      <Card className="mb-4">
        <Card.Body className="p-0">
          {/* Groups */}
          <div className="position-relative">
            <div className="groups-search mt-xl-2 mt-4 ml-3 mr-4 d-flex align-items-center justify-content-between">
              <Button
                variant="btn btn-outline-primary align-items-center justify-content-end d-flex py-12 btn-hover-icon-white btn-sm border-radius-eight no-outline"
                onClick={() =>
                  router.push({
                    pathname: "/create-groups",
                    query: { isEdit: false },
                  })
                }
              >
                <em className="icon icon-plus-primary font-14 mr-2 ml-auto hover-white"></em>{" "}
                <span className="ml-1">
                  {lang("GROUP.COMMON.CREATE_GROUP")}
                </span>
              </Button>
            </div>

            <Tabs
              activeKey={tabKey}
              id="groups-tabs-section"
              className="custom-tabs px-12 mb-4 border-bottom border-geyser group-nav-tabs text-nowrap"
              onSelect={(e) => {
                setTabKey(e);
                router.push(
                  {
                    pathname: router.pathname,
                    query: { groupTab: e },
                  },
                  undefined,
                  { shallow: true }
                );
              }}
            >
              <Tab eventKey="groups" title={lang("GROUP.COMMON.GROUPS")}>
                <AllGroups tabKey={tabKey} />
              </Tab>

              <Tab eventKey="joined" title={lang("GROUP.COMMON.GROUP_JOINED")}>
                <GroupsJoin tabKey={tabKey} />
              </Tab>

              <Tab
                eventKey="invitations"
                title={lang("GROUP.COMMON.GROUP_INVITATIONS")}
              >
                <InvitationsGroups tabKey={tabKey} />
              </Tab>

              <Tab eventKey="waiting" title={lang("Waiting")}>
                <Waiting tabKey={tabKey} />
              </Tab>
              <Tab eventKey="my-groups" title={lang("GROUP.COMMON.MY_GROUPS")}>
                <MyGroups tabKey={tabKey} />
              </Tab>

              <Tab
                eventKey="requested"
                title={lang("GROUP.COMMON.GROUP_REQUESTED")}
              >
                <Requested tabKey={tabKey} />
              </Tab>
            </Tabs>
          </div>
        </Card.Body>
      </Card>
    </RightSidebarLayout>
  );
};

export default withAuth(Groups);
