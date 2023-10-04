import React, { useEffect } from "react";
import { MyDashboard } from "components/dashboard";
import { useDispatch, useSelector } from "react-redux";
import withAuth from "../../components/with-auth/with-auth";
import { showHeaderMenu } from "../../store/actions";
import { RightSidebarLayout } from "components/layout";
import { Container } from "@mui/material";
import Image from "next/image";
import Box from "@mui/material/Box";

const ViewAll = () => {
  const dispatch = useDispatch();
  // Get user profile data
  let userData = useSelector(({ user }) => user.userInfo);
  if (typeof userData === "string") userData = JSON.parse(userData);

  const imageWidth = 769; // Image width in pixels
  const imageHeight = 403.725; // Image height in pixels
  const padding = 16; // Padding in pixels

  const maxWidth = imageWidth + 2 * padding; // Maximum width with padding
  const maxHeight = imageHeight + 2 * padding; // Maximum height with padding

  const styles = {
    container: {
      backgroundColor: "white",
      maxWidth: `${maxWidth}px`,
      maxHeight: `${maxHeight}px`,
      padding: `${padding}px`,
    },
    image: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
    },
    container2: {
      marginTop: "1rem",
      backgroundColor: "white",
      maxWidth: `${maxWidth}px`,
      maxHeight: `${255}px`,
      padding: `${padding}px`,
    },
    text: {
      color: "#051F4E",
      fontSize: "14px",
      fontStyle: "normal",
      fontWeight: 400,
      lineHeight: "normal",
      letterSpacing: "0.25px",
    },
  };

  /**
   * Show user header menu if signup completed
   */
  useEffect(() => {
    if (userData.isSignUpDetailsCompleted === true) {
      dispatch(showHeaderMenu());
    }
  }, [userData]);

  return (
    <RightSidebarLayout removeSidebar="footer">
      <Container style={styles.container}>
        <Box></Box>
      </Container>
    </RightSidebarLayout>
  );
};

export default withAuth(ViewAll);
