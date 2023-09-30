import React, { Fragment, useEffect, useState } from "react";
import { getMostFollowedTopics } from "store/actions";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { onImageError } from "utils";
import { useRouter } from "next/router";
import { Card, CardHeader, CardContent } from "@mui/material";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import { ThemeProvider } from "@mui/material/styles";
import theme from "config/theme";

const MostFollowedTopics = () => {
  const [lang] = useTranslation("language");
  const router = useRouter();
  const dispatch = useDispatch();
  const { mostFollowedTopics } = useSelector((state) => state.growth);

  useEffect(() => {
    dispatch(getMostFollowedTopics());
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <div className="mb-4 followed-content-box">
        <Card className="rounded-0 border-0 border-bottom-dark-2 overflow-hidden">
          <CardHeader
            sx={{ my: 1 }}
            className="d-flex border-radius-0 border-bottom border-geyser"
            title={
              <div className="w-100 d-flex border-0 p-0">
                <Typography
                  variant="subtitle1"
                  className="most-followed-topics-heading">
                  {lang("RIGHT_SIDEBAR.MOST_FOLLOWED_TOPICS")}
                </Typography>
              </div>
            }
          />
          <CardContent className="px-0 pb-1 pt-1">
            <ul className="listing-section listing-content-start pt-first-0 border-first-0">
              <li
                // key={i}
                className={`listing-box cursor-pointer font-12 font-weight-semibold px-3`}
                // ${
                //   i === mostFollowedContents?.rows?.length - 1 ? "pb-0" : ""
                // }`}
                // onClick={() => {
                //   contents.courseType
                //     ? router.push(`/course-detail/${contents.id}`)
                //     : router.push(`/virtual-events/${contents.id}`);
                // }}
              >
                <div className="position-relative flex-shrink-0 mr-3">
                  <Image
                    className="img-fluid w-h-84-48"
                    src={"/assets/images/video-Thumbnail.svg"}
                    title="List Item"
                    width={114}
                    height={64}
                    style={{ borderRadius: "0px" }}
                    // onError={(e) => onImageError(e)}
                  />
                </div>

                <div className="w-68">
                  <Typography
                    variant="h5"
                    noWrap="true"
                    sx={{
                      fontSize: "14px",
                      fontStyle: "normal",
                      fontWeight: 400,
                      lineHeight: "20px",
                      letterSpacing: "0.25px",
                      color: "#1C1B1E",
                    }}>
                    List Item
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{
                      color: "#49454E",
                      fontSize: "12px",
                      fontStyle: "normal",
                      fontWeight: 400,
                      lineHeight: "16px",
                    }}>
                    Supporting line text lorem ipsum dolor sit amet,
                    consectetur.
                    {/* {getCourseType(contents?.courseType)}
                    {getCourseType(contents?.virtualEventType)} */}
                  </Typography>
                </div>
              </li>
              <li
                // key={i}
                className={`listing-box cursor-pointer font-12 font-weight-semibold px-3 my-3`}
                // ${
                //   i === mostFollowedContents?.rows?.length - 1 ? "pb-0" : ""
                // }`}
                // onClick={() => {
                //   contents.courseType
                //     ? router.push(`/course-detail/${contents.id}`)
                //     : router.push(`/virtual-events/${contents.id}`);
                // }}
              >
                <div className="position-relative flex-shrink-0 mr-3">
                  <Image
                    src={"/assets/images/video-Thumbnail.svg"}
                    title="List Item"
                    width={114}
                    height={64}
                    // onError={(e) => onImageError(e)}
                  />
                </div>

                <div className="w-68">
                  <Typography
                    variant="h5"
                    noWrap="true"
                    sx={{
                      fontSize: "14px",
                      fontStyle: "normal",
                      fontWeight: 400,
                      lineHeight: "20px",
                      letterSpacing: "0.25px",
                      color: "#1C1B1E",
                    }}>
                    List Item
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{
                      color: "#49454E",
                      fontSize: "12px",
                      fontStyle: "normal",
                      fontWeight: 400,
                      lineHeight: "16px",
                    }}>
                    Supporting line text lorem ipsum dolor sit amet,
                    consectetur.
                    {/* {getCourseType(contents?.courseType)}
                    {getCourseType(contents?.virtualEventType)} */}
                  </Typography>
                </div>
              </li>
              <li
                // key={i}
                className={`listing-box cursor-pointer font-12 font-weight-semibold px-3 my-3`}
                // ${
                //   i === mostFollowedContents?.rows?.length - 1 ? "pb-0" : ""
                // }`}
                // onClick={() => {
                //   contents.courseType
                //     ? router.push(`/course-detail/${contents.id}`)
                //     : router.push(`/virtual-events/${contents.id}`);
                // }}
              >
                <div className="position-relative flex-shrink-0 mr-3">
                  <Image
                    src={"/assets/images/video-Thumbnail.svg"}
                    title="List Item"
                    width={114}
                    height={64}
                    // onError={(e) => onImageError(e)}
                  />
                </div>

                <div className="w-68">
                  <Typography
                    variant="h5"
                    noWrap="true"
                    sx={{
                      fontSize: "14px",
                      fontStyle: "normal",
                      fontWeight: 400,
                      lineHeight: "20px",
                      letterSpacing: "0.25px",
                      color: "#1C1B1E",
                    }}>
                    List Item
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{
                      color: "#49454E",
                      fontSize: "12px",
                      fontStyle: "normal",
                      fontWeight: 400,
                      lineHeight: "16px",
                    }}>
                    Supporting line text lorem ipsum dolor sit amet,
                    consectetur.
                    {/* {getCourseType(contents?.courseType)}
                    {getCourseType(contents?.virtualEventType)} */}
                  </Typography>
                </div>
              </li>
              <li
                // key={i}
                className={`listing-box cursor-pointer font-12 font-weight-semibold px-3 my-3`}
                // ${
                //   i === mostFollowedContents?.rows?.length - 1 ? "pb-0" : ""
                // }`}
                // onClick={() => {
                //   contents.courseType
                //     ? router.push(`/course-detail/${contents.id}`)
                //     : router.push(`/virtual-events/${contents.id}`);
                // }}
              >
                <div className="position-relative flex-shrink-0 mr-3">
                  <Image
                    src={"/assets/images/video-Thumbnail.svg"}
                    title="List Item"
                    width={114}
                    height={64}
                    // onError={(e) => onImageError(e)}
                  />
                </div>

                <div className="w-68">
                  <Typography
                    variant="h5"
                    noWrap="true"
                    sx={{
                      fontSize: "14px",
                      fontStyle: "normal",
                      fontWeight: 400,
                      lineHeight: "20px",
                      letterSpacing: "0.25px",
                      color: "#1C1B1E",
                    }}>
                    List Item
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{
                      color: "#49454E",
                      fontSize: "12px",
                      fontStyle: "normal",
                      fontWeight: 400,
                      lineHeight: "16px",
                    }}>
                    Supporting line text lorem ipsum dolor sit amet,
                    consectetur.
                    {/* {getCourseType(contents?.courseType)}
                    {getCourseType(contents?.virtualEventType)} */}
                  </Typography>
                </div>
              </li>
              {/* {mostFollowedContents.rows &&
              mostFollowedContents?.rows?.length > 0 ? (
                mostFollowedContents?.rows?.map((contents, i) => (
                  <li
                    key={i}
                    className={`listing-box cursor-pointer font-12 font-weight-semibold px-3 ${
                      i === mostFollowedContents?.rows?.length - 1 ? "pb-0" : ""
                    }`}
                    onClick={() => {
                      contents.courseType
                        ? router.push(`/course-detail/${contents.id}`)
                        : router.push(`/virtual-events/${contents.id}`);
                    }}>
                    <div className="position-relative flex-shrink-0 mr-3">
                      <img
                        
                        src={contents.imageURL}
                        onError={(e) => onImageError(e)}
                      />
                    </div>

                    <div className="w-68">
                      <h5 className="font-14 text-ellipsis mb-1 text-secondary sidebar-text">
                        {contents.title}
                      </h5>
                      <div className="text-body-12">
                        {getCourseType(contents?.courseType)}
                        {getCourseType(contents?.virtualEventType)}
                      </div>
                    </div>
                  </li>
                ))
              ) : (
                <div className="px-3">
                  <em className="font-12">
                    {lang("RIGHT_SIDEBAR.NO_RECORDS")}
                  </em>
                </div>
              )} */}
            </ul>
          </CardContent>
        </Card>
      </div>
    </ThemeProvider>
  );
};
export default MostFollowedTopics;
