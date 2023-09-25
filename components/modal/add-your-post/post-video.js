import VideoJS from "components/videoComponent";
import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { FileUploader } from "react-drag-drop-files";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { toggleModals, uploadPostVideo } from "store/actions";
import videojs from "video.js";

export const VideoPost = () => {
  const [lang] = useTranslation("language");
  const dispatch = useDispatch();
  const [videoUrl, setVideoUrl] = useState("");
  const [selectVidFile, setSelectVidFile] = useState("");
  const [vidError, setVidError] = useState(false);
  const [vidSizeError, setVidSizeError] = useState("");
  const [loading, setLoading] = useState(false);
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
        type: "video/avchd",
      },
      {
        src: videoUrl,
        type: "video/quicktime",
      },
      {
        src: videoUrl,
        type: "video/x-ms-wmv",
      },
      {
        src: videoUrl,
        type: "video/avi",
      },
    ],
  });
  const fileTypes = ["MP4", "quicktime", "x-ms-wmv", "AVI", "MKV", "AVCHD"];
  const playerRef = React.useRef(null);

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

  const handlePickVideos = (file) => {
    if (file) {
      setSelectVidFile(file);
      console.log(file.type);
      const type =
        "video/mp4" ||
        "video/mkv" ||
        "video/quicktime" ||
        "video/x-ms-wmv" ||
        "video/avi" ||
        "video/avchd";
      const _videoUrl = URL.createObjectURL(file);
      setVideoJsOptions((prevOptions) => ({
        ...prevOptions,
        sources: [
          {
            src: _videoUrl,
            type: type,
          },
        ],
      }));
      setVideoUrl(_videoUrl);
    }
  };

  const handlePostVideo = async () => {
    if (videoUrl !== "") {
      const videoData = new FormData();
      videoData.append("file", selectVidFile);
      setLoading(true);
      const response = await dispatch(uploadPostVideo(videoData));

      if (response) {
        setVidSizeError("");
        setLoading(false);
        setVidError(false);
        dispatch(toggleModals({ addpost: true }));
        dispatch(toggleModals({ videopost: false }));
      }
    } else {
      setVidError(true);
    }
  };

  return (
    <>
      <Modal.Body>
        {videoUrl !== "" ? (
          <div className="course-detail-play">
            <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />
          </div>
        ) : (
          <div className="fullwidth-dropzone text-center overflow-hidden mb-3">
            <FileUploader
              handleChange={handlePickVideos}
              children={
                <>
                  <div className="dropzone-wrap-xxl text-center pointer w-100">
                    <em className="icon icon-upload-cloud font-44 pb-0"></em>
                    <p className="m-0 font-16 text-geyser font-medium">
                      {lang("DASHBOARD.UPLOAD_HERE")}
                    </p>
                    <small className="m-0 body-text-14 text-geyser font-normal">
                      ( {lang("COMMON.UPLOAD_VIDEO_FORMAT")})
                    </small>
                  </div>
                </>
              }
              name="file"
              maxSize={5000}
              minSize={0.075}
              onSizeError={() =>
                setVidSizeError(lang("DASHBOARD.VIDEO_LENGTH_ERROR"))
              }
              types={fileTypes}
            />
          </div>
        )}
      </Modal.Body>

      <small className="error form-text ml-3 mb-1">
        {vidError
          ? lang("DASHBOARD.PLEASE_SELECT_VIDEO")
          : vidSizeError
          ? vidSizeError
          : ""}
      </small>
      <Modal.Footer className="d-flex ">
        <Button
          variant="btn btn-info btn-sm px-xl-4 px-5 mt-xl-0 mt-2 py-3 w-lg-100 mb-0"
          onClick={handlePostVideo}
        >
          {loading ? lang("COMMON.LOADING") : lang("DASHBOARD.SAVE_VIDEO")}
        </Button>
      </Modal.Footer>
    </>
  );
};
