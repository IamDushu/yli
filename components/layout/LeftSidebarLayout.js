import React, { Children } from "react";
import { Layout } from "components/layout";
import Grid from "@mui/material/Grid";
import {
  RecentAddedGM,
  GrowthPartners,
  GrowthModal,
  MyProfile,
  MostFollowedContents,
  FollowedGroup,
  SiteLinks,
} from "components/sidebar";
import EventCalendarWidget from "pages/events/events-calendar-widget";
import SidebarWidgetDropdown from "components/sidebar/sidebar-widget-dropdown/sidebar-widget-dropdown";
import GetStarted from "components/sidebar/get-started";
import YliwayGuide from "components/sidebar/yliway-guide";
import { useTranslation } from "react-i18next";
import { launchInstantMeeting } from "../../store/actions/yli-meet";

const RightSidebarLayout = ({ children, removeSidebar }) => {
  const [lang] = useTranslation("language");
  const onLaunchInstantMeeting = () => {
    dispatch(
      launchInstantMeeting({
        meetingStatus: "Running",
        meetingType: "Instant",
      })
    ).then((res) => router.push(`/yli-meet/${res.data.id}`));
  };
  return (
    <Layout removeSidebar={removeSidebar}>
      <div className="inner-wrapper profile-wrapper connection-box">
        <Grid
          container
          maxWidth="1160px"
          marginLeft={"auto"}
          marginRight={"auto"}
          paddingLeft={{ sm: 2, xs: 1 }}
          paddingRight={{ sm: 2, xs: 1 }}>
          <Grid item md={3} xs={12} paddingRight={{ md: "10px", sm: 0 }}>
            {/* left sidebar section */}
            <div className="profile-left-bar " style={{ marginLeft: 0 }}>
              <MyProfile />
              {/* <LatestArticle /> */}
              <div className="mt-4">
                <EventCalendarWidget />
              </div>
              <GrowthModal />
              <div className="mt-4">
                <SidebarWidgetDropdown
                  label={lang("SIDE_BAR.MEETING.TITLE")}
                  preIcon="/assets/images/meeting-sidebar.svg"
                  list={[
                    {
                      title: lang("SIDE_BAR.MEETING.INSTANT_MEETING"),
                      icon: "/assets/images/launch-instance-meeting.svg",
                      onClick: onLaunchInstantMeeting,
                    },
                    {
                      title: lang("SIDE_BAR.MEETING.SCHEDULED_MEETING"),
                      icon: "/assets/images/schedueled-meeting.svg",
                      onClick: () => alert("To be added"),
                    },
                    {
                      title: lang("SIDE_BAR.MEETING.ROOM_HOSTORY"),
                      icon: "/assets/images/room-conversation-history.svg",
                      onClick: () => alert("To be added"),
                    },
                  ]}
                />
              </div>
              <div className="mt-4">
                <SidebarWidgetDropdown
                  label={lang("SIDE_BAR.SQUAD.TITLE")}
                  preIcon="/assets/images/squad-sidebar.svg"
                  list={[
                    {
                      title: lang("SIDE_BAR.SQUAD.CREATE"),
                      icon: "/assets/images/launch-instance-meeting.svg",
                      onClick: () => alert("To be added"),
                    },
                  ]}
                />
              </div>
              <div className="mt-4">
                <GetStarted leftIcon="/assets/images/getstarted-flash-icon.svg" />
              </div>
              <div className="sticky-fix mt-4">
                <YliwayGuide
                  title={lang("SIDE_BAR.TITLE")}
                  bgImage="/assets/images/yliway-guide-background.png"
                  buttonText={lang("SIDE_BAR.YLIWAY_GUIDE")}
                  onButtonClick={() => {
                    window.open("/become-bn-room-manager");
                  }}
                />
                <SiteLinks />
              </div>
              {/* <GrowthPartners /> */}
              {/* <RecentAddedGM />
              <FollowedGroup />
              <div className="sticky-fix">
                <MostFollowedContents />
                <SiteLinks />
              </div> */}
            </div>
          </Grid>
          <Grid item md={9} xs={12} paddingLeft={{ md: "6px", sm: 0 }}>
            {/* right section */}
            <div className="profile-right-bar">
              {Children?.map(children, (child) => {
                return child;
              })}
            </div>
          </Grid>
        </Grid>
      </div>
    </Layout>
  );
};

export default RightSidebarLayout;
