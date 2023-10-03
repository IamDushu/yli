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
  const placeholder = "/assets/images/video-Thumbnail.svg";
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    dispatch(getMostFollowedTopics());
  }, []);

  console.log("---topics comp---");

  return (
    <ThemeProvider theme={theme}>
      <div className="mb-4 followed-content-box">
        <Card className="rounded-0 overflow-hidden" sx={{ boxShadow: 3 }}>
          <CardHeader
            sx={{ my: 0 }}
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
          <CardContent
            className="px-0 pb-1"
            style={{ paddingTop: "12px", paddingBottom: "12px" }}>
            <ul className="listing-section listing-content-start pt-first-0 border-first-0">
              {mostFollowedTopics?.length > 0 ? (
                mostFollowedTopics?.slice(0, 4)?.map((topic, i) => (
                  <li
                    key={i}
                    className={`listing-box cursor-pointer font-12 font-weight-semibold px-3`}
                    // onClick={() => {
                    //   contents.courseType
                    //     ? router.push(`/course-detail/${contents.id}`)
                    //     : router.push(`/virtual-events/${contents.id}`);
                    // }}
                  >
                    <div className="position-relative flex-shrink-0 mr-3">
                      <Image
                        className="img-fluid"
                        // src={imageError ? placeholder : topic?.imageURL}
                        src={topic?.imageURL}
                        title={topic?.name}
                        width={114}
                        height={64}
                        style={{ borderRadius: "0px" }}
                        // onError={(event) => setImageError(true)}
                        // onError={(e) => {
                        //   console.log(i, "---i--");
                        //   e.target.src = placeholder; // Path to your placeholder image
                        // }}
                      />
                    </div>

                    <div className="w-68">
                      <Typography
                        variant="h5"
                        className="topic-name-elipis"
                        title={topic?.name}>
                        {topic?.name}
                      </Typography>

                      <Typography variant="body2" className="topic-text-elipis">
                        {topic?.description}
                      </Typography>
                    </div>
                  </li>
                ))
              ) : (
                <div className="px-3">
                  <em className="font-12">
                    {lang("RIGHT_SIDEBAR.NO_RECORDS")}
                  </em>
                </div>
              )}
            </ul>
          </CardContent>
        </Card>
      </div>
    </ThemeProvider>
  );
};
export default MostFollowedTopics;
