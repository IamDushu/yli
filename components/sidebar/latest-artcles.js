import React, { Fragment, useEffect, useState } from "react";
// import { Card, Accordion } from "react-bootstrap";
import { mostFollowedContent } from "store/actions";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { onImageError } from "utils";
import { useRouter } from "next/router";
import { Article } from "components/article";
import { Card, CardHeader, CardContent } from "@mui/material";
import Typography from "@mui/material/Typography";

const LatestArticle = () => {
  const [lang] = useTranslation("language");
  const router = useRouter();
  const dispatch = useDispatch();
  const { mostFollowedContents } = useSelector((state) => state.growth);
  useEffect(() => {
    dispatch(mostFollowedContent({ page: 1, pagesize: 5 }));
  }, []);

  const getCourseType = (type) => {
    switch (type) {
      case "online":
        return "Online Course";
      case "offline":
        return "Offline Course";
      case "other":
        return "Other Course";
      case "training-room":
        return "Training Room";
      case "business-network-room":
        return "Business Network Room";
      case "webinar":
        return "Webinar";
      case "event":
        return "Event";
      case "master-class":
        return "Master Class";
      case "coaching-room":
        return "Coaching Room";
    }
  };

  return (
    <div className="mb-3 followed-content-box">
      <Card
        className="rounded-0 border-0 border-bottom-dark-2 "
        style={{ height: "auto" }}>
        <CardHeader
          className="d-flex border-radius-0 border-bottom border-geyser py-2"
          title={
            <div className="w-100 d-flex border-0 p-0 overflow-hidden">
              <Typography
                variant="h6"
                component="div"
                className="d-flex text-body-16 mb-0 w-100 text-secondary latest-article-heading">
                {lang("GROWTH_TOOL.LATEST_ARTILCE")}
                <span
                  style={{ marginLeft: "auto", cursor: "pointer" }}
                  className="latest-article-view-all">
                  {lang("GROWTH_TOOL.VIEW_ALL")}
                </span>
              </Typography>
            </div>
          }
        />

        <CardContent className="px-3">
          <div className="list-spacing">
            <Article
              imgSrc="/assets/images/video-Thumbnail.svg"
              name="Eleanor Rigby"
              date="18/09/23 3 PM"
              heading="An article with at least two lines of text"
              text="Supporting line text lorem ipsum dolor sit amet, consect and more content more than 2 lines if entere third line and more"
            />
          </div>
          <div className="list-spacing">
            <Article
              imgSrc="/assets/images/video-Thumbnail.svg"
              name="Eleanor Rigby"
              date="18/09/23 3 PM"
              heading="An article with at least two lines of text"
              text="Supporting line text lorem ipsum dolor sit amet, consect and more content more than 2 lines if entere third line and more"
            />
          </div>
          <div className="list-spacing">
            <Article
              imgSrc="/assets/images/video-Thumbnail.svg"
              name="Eleanor Rigby"
              date="18/09/23 3 PM"
              heading="An article with at least two lines of text"
              text="Supporting line text lorem ipsum dolor sit amet, consect and more content more than 2 lines if entere third line and more"
            />
          </div>
          <div className="list-spacing">
            <Article
              imgSrc="/assets/images/video-Thumbnail.svg"
              name="Eleanor Rigby"
              date="18/09/23 3 PM"
              heading="An article with at least two lines of text"
              text="Supporting line text lorem ipsum dolor sit amet, consect and more content more than 2 lines if entere third line and more"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
export default LatestArticle;
