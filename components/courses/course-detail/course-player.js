import VideoJS from "components/videoComponent";
import moment from "moment";
import React, { Fragment, useEffect, useState } from "react";
import { Card, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import { onImageError } from "utils";
import videojs from "video.js";
const CoursePlayer = () => {
  const playerRef = React.useRef(null);
  const courseDetail = useSelector((state) => state?.courses?.courseDetail);
  const [videoLink, setVideoLink] = useState("");

  const videoJsOptions = {
    autoplay: false,
    controls: true,
    responsive: true,
    height: 455,
    fluid: true,
    sources: [
      {
        src: videoLink,
        type: "video/mp4",
      },
      {
        src: videoLink,
        type: "video/mkv",
      },
      {
        src: videoLink,
        type: "video/quicktime",
      },
      {
        src: videoLink,
        type: "video/avi",
      },
      {
        src: videoLink,
        type: "video/x-ms-wmv",
      },
      {
        src: videoLink,
        type: "video/avchd",
      },
    ],
  };

  const handlePlayerReady = (player) => {
    playerRef.current = player;

    // You can handle player events here, for example:
    player.on("waiting", () => {
      videojs.log("player is waiting");
    });

    player.on("dispose", () => {
      videojs.log("player will dispose");
    });
  };

  /******************* 
  @purpose : Used for loading initial video
  @param: {video}
  @Author : INIC
  ******************/
  useEffect(() => {
    if (!videoLink) {
      setVideoLink(courseDetail?.previewVideo);
    } else if (!videoLink && !courseDetail?.previewVideo) {
      setVideoLink(courseDetail?.imageURL);
    }
  }, [courseDetail]);

  return (
    <Fragment>
      {/* Profile Summary : START */}
      <Card>
        <Card.Body className="p-0">
          <Row className="mt-2 mt-sm-5">
            <Col sm={8}>
              <div className="course-heading">
                <h4>{courseDetail?.title}</h4>
              </div>
              <div className="course-misc-details mt-4 flex-column flex-md-row">
                <span className="mr-3 mb-2">
                  <i class="bx bxs-info-circle"></i>
                  {`Last updated ${moment(courseDetail.updatedAt).format(
                    "DD/MM/YYYY"
                  )}`}
                </span>
                <span className="mb-2">
                  <i class="bx bx-globe"></i>
                  {courseDetail.language}
                </span>
                {courseDetail.subtitles && (
                  <span>
                    <i class="bx bxs-credit-card-front"></i>
                    {courseDetail.subtitleLanguage}
                  </span>
                )}
              </div>
            </Col>
            <Col sm={4}>
              {videoLink ? (
                <div className="course-detail-play">
                  <VideoJS
                    options={videoJsOptions}
                    onReady={handlePlayerReady}
                  />
                </div>
              ) : (
                <img
                  src={courseDetail.imageURL ? courseDetail.imageURL : ""}
                  className="img-fluid w-100 preview-img-course"
                  onError={(e) => {
                    onImageError(e);
                  }}
                />
              )}
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Fragment>
  );
};
export default CoursePlayer;
