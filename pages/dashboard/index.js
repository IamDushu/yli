import React, { useEffect } from "react";
import { MyDashboard } from "components/dashboard";
import { useDispatch, useSelector } from "react-redux";
import withAuth from "../../components/with-auth/with-auth";
import { showHeaderMenu } from "../../store/actions";
import { SidebarLayout } from "components/layout";

const Dashboard = () => {
  const dispatch = useDispatch();
  // Get user profile data
  let userData = useSelector(({ user }) => user.userInfo);
  if (typeof userData === "string") userData = JSON.parse(userData);

  /**
   * Show user header menu if signup completed
   */
  useEffect(() => {
    if (userData.isSignUpDetailsCompleted === true) {
      dispatch(showHeaderMenu());
    }
  }, [userData]);

  return (
    <SidebarLayout removeSidebar="footer">
      <MyDashboard />
    </SidebarLayout>
  );
};

export default withAuth(Dashboard);
