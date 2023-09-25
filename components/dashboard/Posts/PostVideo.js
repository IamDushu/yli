import React, { useEffect } from "react";
import videojs from "video.js";

import VideoJS from "components/videoComponent";
/******************** 
@purpose :  Dashboard Post Video
@Parameter : {listData, type}
@Author : INIC
******************/
const PostVideo = ({ listData, type, isShared }) => {
  const videoUrl = type
    ? listData.postShareDetails !== null
      ? listData.postShareDetails.videoURL
      : ""
    : listData?.postDetails?.videoURL === null
    ? ""
    : listData?.postDetails?.videoURL;

  const playerRef = React.useRef(null);
  const [videoJsOptions, setVideoJsOptions] = React.useState({
    autoplay: false,
    controls: true,
    responsive: true,
    height: 455,
    fluid: true,
    sources: [
      {
        src: videoUrl,
        type: "video/mp4",
      },
      {
        src: videoUrl,
        type: "video/mkv",
      },
      {
        src: videoUrl,
        type: "video/quicktime",
      },
      {
        src: videoUrl,
        type: "video/avi",
      },
      {
        src: videoUrl,
        type: "video/x-ms-wmv",
      },
      {
        src: videoUrl,
        type: "video/avchd",
      },
    ],
  });

  useEffect(() => {
    // Update the video source URL in the videoJsOptions object
    setVideoJsOptions((prevOptions) => ({
      ...prevOptions,
      sources: [
        {
          src: videoUrl,
          type: "video/mp4",
        },
        {
          src: videoUrl,
          type: "video/mkv",
        },
        {
          src: videoUrl,
          type: "video/quicktime",
        },
        {
          src: videoUrl,
          type: "video/avi",
        },
        {
          src: videoUrl,
          type: "video/x-ms-wmv",
        },
        {
          src: videoUrl,
          type: "video/avchd",
        },
      ],
    }));
  }, [videoUrl]);

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
  return (
    <div className={isShared ? "px-3 mb-3" : "mb-0"}>
      <div className="course-detail-play">
        <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />
      </div>
    </div>
  );
};

export default PostVideo;
