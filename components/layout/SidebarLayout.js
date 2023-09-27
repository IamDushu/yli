import React, { Children } from "react";
import { Layout } from "@components/layout";
import {
  MyProfile,
  RecentAddedGM,
  MostFollowedContents,
  Add,
  GrowthPartners,
  FollowedGroup,
  GrowthModal,
  SiteLinks,
} from "components/sidebar";
import EventCalendarWidget from "pages/events/events-calendar-widget";
import SidebarWidgetDropdown from "components/sidebar/sidebar-widget-dropdown/sidebar-widget-dropdown";
import { launchInstantMeeting } from "../../store/actions/yli-meet";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import YliwayGuide from "components/sidebar/yliway-guide";
import { useTranslation } from "react-i18next";
import GetStarted from "components/sidebar/get-started";
import Grid from "@mui/material/Grid";
import LatestArticle from "components/sidebar/latest-artcles";

const SidebarLayout = ({ children, removeSidebar }) => {
  const dispatch = useDispatch();
  const router = useRouter();
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
      <div className="inner-wrapper dashboard-box">
        <Grid container maxWidth="lg" marginLeft={'auto'} marginRight={'auto'} paddingLeft={{ md: 2, sm: 1 }} paddingRight={{ md: 2, sm: 1 }}>
          <Grid item md={3} sm={12} paddingRight={{ md: 3, sm: 0 }}>
            <div className="left-profile-section">
              <MyProfile />
              <GrowthModal />
              <div className="mt-4">
                <EventCalendarWidget />
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
            </div>
          </Grid>

          <Grid item md={5} sm={12} paddingRight={{ md: 3, sm: 0 }}>
            <div className="post-section">
              {Children?.map(children, (child) => {
                return child;
              })}
            </div>
          </Grid>

          <Grid item md={4} sm={12}>
            {/* right blog section */}
            <div className="right-blog-section">
              <LatestArticle />
              <GrowthPartners />
              <RecentAddedGM />
              <FollowedGroup />
              <div className="sticky-fix">
                <MostFollowedContents />
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
    </Layout>
  );
};

export default SidebarLayout;
