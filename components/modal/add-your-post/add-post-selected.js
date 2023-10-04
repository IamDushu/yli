import VideoJS from "components/videoComponent";
import React, { useEffect } from "react";
import { Row, Col, Card } from "react-bootstrap";
import { useDispatch } from "react-redux";
import videojs from "video.js";
import {
  toggleModals,
  createPoll,
  editCreatePoll,
  setPostImage,
  setPostVideo,
  setPostDocument,
  posttype,
} from "store/actions";
import { onImageError } from "utils";

const AddPostSelected = (props) => {
  const dispatch = useDispatch();
  const playerRef = React.useRef(null);
  const [videoJsOptions, setVideoJsOptions] = React.useState({
    autoplay: false,
    controls: true,
    responsive: true,
    height: 455,
    fluid: true,
    sources: [
      {
        src: "",
        type: "video/mp4",
      },
      {
        src: "",
        type: "video/mkv",
      },
      {
        src: "",
        type: "video/quicktime",
      },
      {
        src: "",
        type: "video/avi",
      },
      {
        src: "",
        type: "video/x-ms-wmv",
      },
      {
        src: "",
        type: "video/avchd",
      },
    ],
  });
  const handleDelete = () => {
    dispatch(createPoll(""));
    dispatch(editCreatePoll(false));
    dispatch(posttype(""));
  };

  const handleEditCreatPol = () => {
    dispatch(toggleModals({ createpoll: true }));
    dispatch(editCreatePoll(true));
    dispatch(posttype("poll"));
  };

  useEffect(() => {
    if (props.postVideo !== "" && props.postVideo !== null) {
      setVideoJsOptions((prevOptions) => ({
        ...prevOptions,
        sources: [
          {
            src: props.postVideo.fileUrl,
            type: "video/mp4",
          },
          {
            src: props.postVideo.fileUrl,
            type: "video/mkv",
          },
          {
            src: props.postVideo.fileUrl,
            type: "video/quicktime",
          },
          {
            src: props.postVideo.fileUrl,
            type: "video/avi",
          },
          {
            src: props.postVideo.fileUrl,
            type: "video/x-ms-wmv",
          },
          {
            src: props.postVideo.fileUrl,
            type: "video/avchd",
          },
        ],
      }));
    }
  }, [props.postVideo]);

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
    <div>
      {props.postImage !== null && props.postImage !== "" && (
        <Card>
          <Card.Body className="p-0">
            <div className="position-absolute r-0 p-2">
              <em
                className="icon icon-write text-white font-20 pr-1 me-2"
                onClick={() => {
                  dispatch(toggleModals({ photopost: true }));
                  dispatch(posttype("photo"));
                }}
              ></em>

              <em
                className="icon icon-delete-line text-white font-22 pr-1"
                onClick={() => dispatch(setPostImage(null))}
              ></em>
            </div>
            <picture
              className="card-img-top"
              onContextMenu={(e) => e.preventDefault()}
            >
              <source srcSet={props.postImage} type="image/jpg" />
              <img
                src={props.postImage}
                alt="postImage"
                width="100%"
                onError={(e) => {
                  onImageError(e, "myProfile");
                }}
              />
            </picture>
          </Card.Body>
        </Card>
      )}

      {props.isEditDshBordPost === true && props.postVideo !== null ? (
        <Card>
          <Card.Body className="p-0">
            <div
              className="position-absolute r-0 px-4 py-2 pointer"
              style={{ zIndex: 1000 }}
            >
              <em
                className="icon icon-write font-20 text-white pr-1 me-2"
                onClick={() => {
                  dispatch(toggleModals({ videopost: true }));
                  dispatch(posttype("video"));
                }}
              ></em>
              <em
                className="icon icon-delete-line font-22 text-white pr-1"
                onClick={() => dispatch(setPostVideo(null))}
              ></em>
            </div>
            <video
              className="card-img-top"
              controls
              src={
                props.isEditDshBordPost ? props?.postVideo : props?.postVideo
              }
              alt={`${props.postVideo}`}
              width="100%"
            />
          </Card.Body>
        </Card>
      ) : props.postVideo !== "" && props.postVideo !== null ? (
        <Card>
          <Card.Body className="p-0">
            <div
              className="position-absolute r-0 px-4 py-2 pointer"
              style={{ zIndex: 1000 }}
            >
              <em
                className="icon icon-write font-20 text-white pr-1 me-2"
                onClick={() => {
                  dispatch(toggleModals({ videopost: true }));
                  dispatch(posttype("video"));
                }}
              ></em>
              <em
                className="icon icon-delete-line font-22 text-white pr-1"
                onClick={() => dispatch(setPostVideo(null))}
              ></em>
            </div>
            <div className="course-detail-play">
              <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />
            </div>
          </Card.Body>
        </Card>
      ) : null}

      {props.postDocument !== "" && props.postDocument !== null && (
        <Card>
          <Card.Body className="p-0">
            {props.isEditDshBordPost === false && (
              <div className="position-absolute r-0 px-4 py-2">
                <em
                  className="icon icon-write font-20 text-white pr-1 me-2"
                  onClick={() => {
                    dispatch(toggleModals({ documentpost: true }));
                    dispatch(posttype("documents"));
                  }}
                ></em>
                <em
                  className="icon icon-delete-line font-22 text-white pr-1"
                  onClick={() => dispatch(setPostDocument(null))}
                ></em>
              </div>
            )}
            <object
              className="card-document"
              data={
                props.isEditDshBordPost
                  ? `${props.postDocument}`
                  : `${props.postDocument.fileUrl}`
              }
              type="application/pdf"
            />
          </Card.Body>
        </Card>
      )}
      {props.isEditDshBordPost === true ? (
        Array.isArray(props?.createPolls?.pollAnswers) && (
          <Card width="100%">
            <Card.Body>
              <Card.Title>
                <Row>
                  <Col sm={10} md={10} lg={10}>
                    <h6>{props.createPolls?.pollQuestion?.question}</h6>
                  </Col>
                  <Col sm={2} md={2} lg={2}>
                    <button
                      className="poll-option-bar-btn"
                      onClick={handleDelete}
                    >
                      <em className="icon icon-delete font-20"></em>
                    </button>
                    <button
                      className="poll-option-bar-btn"
                      onClick={handleEditCreatPol}
                    >
                      <em className="icon icon-write font-20"></em>
                    </button>
                  </Col>
                </Row>
              </Card.Title>
              <Card.Text className="poll-text-bar">
                {props.createPolls?.pollAnswers?.map((poll, index) => {
                  return (
                    <div className="poll-option-bar" key={index}>
                      {poll.answer}
                    </div>
                  );
                })}
              </Card.Text>
            </Card.Body>
          </Card>
        )
      ) : props.createPolls !== "" ? (
        <Card width="100%">
          <Card.Body>
            <Card.Title>
              <Row>
                <Col sm={10} md={10} lg={10}>
                  <h6>{props.createPolls?.pollQuestion?.question}</h6>
                </Col>
                <Col sm={2} md={2} lg={2}>
                  <button
                    className="poll-option-bar-btn"
                    onClick={handleDelete}
                  >
                    <em className="icon icon-delete font-20"></em>
                  </button>
                  <button
                    className="poll-option-bar-btn"
                    onClick={handleEditCreatPol}
                  >
                    <em className="icon icon-write font-20"></em>
                  </button>
                </Col>
              </Row>
            </Card.Title>
            <Card.Text className="poll-text-bar">
              {props.createPolls?.pollAnswers?.map((poll, index) => {
                return (
                  <div className="poll-option-bar" key={index}>
                    {poll.answer}
                  </div>
                );
              })}
            </Card.Text>
          </Card.Body>
        </Card>
      ) : null}
    </div>
  );
};

export default AddPostSelected;
