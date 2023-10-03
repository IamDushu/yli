import React, { useEffect } from "react";
import { MyDashboard } from "components/dashboard";
import { useDispatch, useSelector } from "react-redux";
import withAuth from "../../components/with-auth/with-auth";
import { showHeaderMenu } from "../../store/actions";
import { RightSidebarLayout } from "components/layout";
import { Container } from "@mui/material";
import Image from "next/image";
import Box from "@mui/material/Box";

const Dashboard = () => {
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
        <Box>
          <div
            style={{
              maxWidth: `${maxWidth}px`,
              maxHeight: `${maxHeight}px`,
              padding: `${padding}px`,
            }}>
            <Image
              src="/assets/images/image-started.png" // Replace with the actual path to your image
              alt="Your Image"
              width={imageWidth}
              height={imageHeight}
              objectFit="cover"
            />
          </div>
        </Box>
      </Container>
      <Container style={styles.container2}>
        <p style={styles.text}>
          Complete the Overview and Descrition section and tell in a simple and
          direct way who you are, what you do and why you could be a valuable
          resource for your audience. Taking care of your image will be very
          important. Update your Skills, It is the best way to highlight your
          professional qualities and to increase the likelihood of getting
          hired, finding a better job, and forging professional relationships.
          Create your first Professional Growth Project. You can choose from
          thousands of occupations, and we will suggest the skills that should
          be developed and, in many cases, point you to training activities for
          those skills. Use the Meeting function and for the first time you will
          not lose messages exchanged with other participants during the
          meeting. Use the Calendar to schedule your professional development
          activities and meetings
        </p>
      </Container>
    </RightSidebarLayout>
  );
};

export default withAuth(Dashboard);
