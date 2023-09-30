import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Grid from "@mui/material/Grid";
import { Layout } from "@components/layout";
import { Container, Card, Spinner } from "react-bootstrap";
import {
  RecentAddedGM,
  MyProfile,
  GrowthModal,
  MostFollowedContents,
  Add,
  GrowthPartners,
  FollowedGroup,
  SiteLinks,
} from "components/sidebar";
import WithAuth from "components/with-auth/with-auth";
import {
  markasallRead,
  readNotifications,
  removeNotifications,
  turnOffNotifications,
  getNotificationsList,
} from "store/actions/notifications";
import { useDispatch, useSelector } from "react-redux";
import NotificationList from "components/notification/notificationList";
import OtherViews from "components/sidebar/other-views";
import InfiniteScroll from "react-infinite-scroll-component";
import SkeletonLoader from "components/ui/skeleton";

const BlogsListing = () => {
  const [lang] = useTranslation("language");
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [pagesize, setPagesize] = useState(20);
  const notificationData = useSelector(
    ({ notifications }) => notifications.notifications
  );
  const { isLoading } = useSelector((state) => state.ui);
  const removeNotification = (s) => {
    try {
      dispatch(removeNotifications({ id: s?.id, status: false }));
    } catch (err) {
      throw err;
    }
  };

  const turnOffNotification = (s) => {
    try {
      dispatch(turnOffNotifications({ text: s.text }));
    } catch (err) {
      throw err;
    }
  };

  const markSeenNotification = (s) => {
    try {
      if (!s.isSeen) {
        dispatch(readNotifications({ id: s?.id, isSeen: true }));
      }
    } catch (err) {
      throw err;
    }
  };
  const checkStatus = () => {
    setPagesize(pagesize + 20);
  };
  useEffect(() => {
    dispatch(getNotificationsList({ page, pagesize }));
  }, [page, pagesize]);
  /******************* 
  @purpose : Rander HTML/ React Components
  @Author : INIC
  ******************/
  return (
    <Layout removeSidebar="footer">
      <div className="inner-wrapper notifications-box">
        <Grid
          container
          maxWidth="1160px"
          marginLeft={"auto"}
          marginRight={"auto"}
          paddingLeft={{ md: 2, xs: 1 }}
          paddingRight={{ md: 2, xs: 1 }}>
           <Grid item md={3} sm={12} paddingRight={{ md: "18px", sm: 0 }}>
            {/* left profile section */}
            <div className="left-profile-section">
              {/* profile section */}
              <MyProfile />
              {/* growth modal listing */}
              <GrowthModal />
              <div className="sticky-fix">
                <Add />
                <SiteLinks />
              </div>
            </div>
            </Grid>
            <Grid
            item
            md={5}
            sm={12}
            paddingLeft={{ md: "6px", sm: 0 }}
            paddingRight={{ md: "8px", sm: 0 }}>
            {/* Middle section view */}
            <div className="post-section">
              {/* Notifications : START */}
              <Card className="mb-20">
                <Card.Header className="d-flex justify-content-between">
                  <h5 className="mb-0">{lang("NOTIFICATION.NOTIFICATIONS")}</h5>
                  {notificationData?.rows?.length > 0 && (
                    <div
                      className="mb-0 cursor-pointer"
                      onClick={() => dispatch(markasallRead())}>
                      <h6 className="text-body-14 text-primary">
                        {lang("NOTIFICATION.MARK_ALL_AS_READ")}
                      </h6>
                    </div>
                  )}
                </Card.Header>
                <Card.Body className="p-0">
                  {/* {isLoading ? (
                    <div className="text-center mt-4 mb-3">
                      <Spinner animation="border" variant="primary" />
                    </div>
                  ) :  */}
                  <InfiniteScroll
                    dataLength={notificationData?.rows?.length || ""}
                    next={() => checkStatus()}
                    hasMore={
                      notificationData?.count !== notificationData?.rows.length
                    }
                    loader={<SkeletonLoader />}>
                    <ul className="listing-section border-first-0 pt-first-0">
                      {notificationData?.rows.length > 0 ? (
                        notificationData?.rows?.map((s, index) => {
                          return (
                            <NotificationList
                              singleNotification={s}
                              removeNotification={removeNotification}
                              markSeenNotification={markSeenNotification}
                              turnOffNotification={turnOffNotification}
                              index={index}
                              lang={lang}
                              pagesize={pagesize}
                              page={page}
                              key={`notification-${index}`}
                            />
                          );
                        })
                      ) : (
                        <li className="listing-box text-center ml-3 mt-3">
                          <em>{lang("NOTIFICATION.NO_NOTIFICATIONS")}</em>
                        </li>
                      )}
                    </ul>
                  </InfiniteScroll>
                </Card.Body>
              </Card>
            </div>
            </Grid>
            <Grid item md={4} sm={12} paddingLeft={{ md: "16px", sm: 0 }}>
            {/* right blog section */}
            <div className="right-blog-section">
              {/* <OtherViews /> */}

              <GrowthPartners />
              {/* <RecentAddedGM />
              <FollowedGroup />
              <div className="sticky-fix">
                <MostFollowedContents />
              </div> */}

              {/* Top Activities */}
            </div>
            </Grid>
          </Grid>
      
      </div>
    </Layout>
  );
};
export default WithAuth(BlogsListing);
