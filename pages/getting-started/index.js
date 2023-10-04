import React, { useEffect } from "react";
import { MyDashboard } from "components/dashboard";
import { useDispatch, useSelector } from "react-redux";
import withAuth from "../../components/with-auth/with-auth";
import { getStartedDetails } from "store/actions/getting-started";
import { RightSidebarLayout } from "components/layout";
import { Container } from "@mui/material";
import Image from "next/image";
import Box from "@mui/material/Box";
import { getCookie, getDefaultLanguage } from "utils";

const GettingStarted = () => {
  const dispatch = useDispatch();
  const { startedDetails } = useSelector(
    ({ startedDetails }) => startedDetails
  );

  function createMarkup() {
    if (startedDetails.content) {
      return {
        __html: startedDetails.content,
      };
    }
  }

  const imageWidth = 769; // Image width in pixels
  const imageHeight = 403.725; // Image height in pixels

  useEffect(() => {
    let currentLanguage = getCookie("language");
    if (!currentLanguage) currentLanguage = getDefaultLanguage();
    dispatch(getStartedDetails(currentLanguage));
  }, []);

  return (
    <RightSidebarLayout removeSidebar="footer">
      <Container className="container">
        <Box>
          <div className="box">
            <Image
              src="/assets/images/image-started.png"
              alt="Your Image"
              className="image"
              width={imageWidth}
              height={imageHeight}
              objectFit="cover"
            />
          </div>
        </Box>
      </Container>
      <Container className="container2">
        <div className="text" dangerouslySetInnerHTML={createMarkup()} />
      </Container>
    </RightSidebarLayout>
  );
};

export default withAuth(GettingStarted);
