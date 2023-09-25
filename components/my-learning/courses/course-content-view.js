import React, { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import CourseText from "components/courses/CourseText";
import { contentTypes, onImageError } from "utils";
import QuizList from "components/quiz/quiz-list";
import { useDispatch } from "react-redux";
import { getLessonVideo } from "store/actions";

const CourseContentView = ({
  contentType,
  videoLink,
  courseDetail,
  updateVideoWatchlist,
  pdfUrl,
  text,
  isVideoPlaying,
  setIsVideoPlaying,
  videoPlayerRef,
  videoStartTime,
  setVideoStartTime,
  chapterId,
  setContentType,
  setChapterId,
  setVideoLink,
  nextLesson,
  setNextLesson,
  upcomingContentType,
  chapterIndex,
  lessonIndex,
  handleAutoPlay,
  showUpNext,
  setShowUpNext,
  onPdfChangeHandler,
  setActiveChapterToggle,
}) => {
  const { VIDEO, TEXT, QUIZ, DOCUMENT } = contentTypes;
  const dispatch = useDispatch();

  /******************* 
  @purpose : Used for seek video time
  @param: {video}
  @Author : INIC
  ******************/
  useEffect(() => {
    if (
      parseInt(videoPlayerRef?.current?.getDuration()) !==
      parseInt(videoStartTime)
    ) {
      videoPlayerRef?.current?.seekTo(videoStartTime);
    } else {
      videoPlayerRef?.current?.seekTo(0);
    }
  }, [videoStartTime]);

  /******************* 
  @purpose : Used for up next button
  @param: {}
  @Author : INIC
  ******************/
  const showNextHandler = () => {
    return (
      <div className="profile-overlay-video">
        <div className="text-center">
          <p className="text-white">Up Next</p>
          <h3 className="text-white font-weight-normal">
            {upcomingContentType === VIDEO
              ? nextLesson?.title
              : upcomingContentType === QUIZ
              ? "Attempt Quiz"
              : upcomingContentType === DOCUMENT
              ? "See Attachment"
              : upcomingContentType === TEXT && "See Text"}
          </h3>
          <i
            className="bx bx-play-circle font-65 pointer"
            onClick={handleUpNext}
          ></i>
        </div>
      </div>
    );
  };

  /******************* 
  @purpose : Used for handling upnext click
  @param: {}
  @Author : INIC
  ******************/
  const handleUpNext = async () => {
    if (nextLesson && upcomingContentType === VIDEO) {
      if (nextLesson?.ulwd?.watchedDuration) {
        setVideoStartTime(nextLesson?.ulwd?.watchedDuration);
      } else {
        setVideoStartTime(0);
      }
      setIsVideoPlaying(true);
      setContentType(VIDEO);
      setChapterId(nextLesson?.chapterId);
      const res = await Promise.resolve(
        dispatch(getLessonVideo(nextLesson?.id))
      );
      setVideoLink(res?.filePath);
      // setVideoLink(nextLesson?.videoURL);
      setNextLesson("");
      setActiveChapterToggle(nextLesson?.chapterId);
      handleAutoPlay(chapterIndex, lessonIndex + 1);
    } else if (upcomingContentType === QUIZ) {
      setQuiz(nextLesson);
      setNextLesson("");
      setContentType(QUIZ);
    } else if (upcomingContentType === DOCUMENT) {
      onPdfChangeHandler(chapterId, 0);
      // setPdfUrl(nextLesson);
      setNextLesson("");
      setContentType(DOCUMENT);
    } else if (upcomingContentType === TEXT) {
      setText(nextLesson);
      setNextLesson("");
      setContentType(TEXT);
    }
    setShowUpNext(false);
  };

  /******************* 
  @purpose : Used for handling video start
  @param: {}
  @Author : INIC
  ******************/
  const handleVideoStart = () => {
    setIsVideoPlaying(true);
    if (
      parseInt(videoPlayerRef?.current?.getDuration()) !==
      parseInt(videoStartTime)
    ) {
      videoPlayerRef?.current?.seekTo(videoStartTime);
    } else {
      videoPlayerRef?.current?.seekTo(0);
    }
  };

  /******************* 
  @purpose : Used for handling video play after pause
  @param: {}
  @Author : INIC
  ******************/
  const handleVideoPlay = () => {
    setIsVideoPlaying(true);
    updateVideoWatchlist();
  };

  /******************* 
  @purpose : Used for handling video pause
  @param: {}
  @Author : INIC
  ******************/
  const handleVideoPause = () => {
    setIsVideoPlaying(false);
    updateVideoWatchlist();
  };

  /******************* 
  @purpose : Used for handling video pause
  @param: {}
  @Author : INIC
  ******************/
  const handleVideoEnded = () => {
    setIsVideoPlaying(false);
    updateVideoWatchlist();
    if (
      (nextLesson && upcomingContentType === VIDEO) ||
      upcomingContentType === QUIZ ||
      upcomingContentType === DOCUMENT ||
      upcomingContentType === TEXT
    ) {
      setShowUpNext(true);
    } else {
      setShowUpNext(false);
    }
  };

  return (
    <div className={`${contentType === TEXT && "border p-3"}`}>
      {contentType === TEXT ? (
        <div className="a fullwidth-dropzone sm-6 md-6 lg-6 mb-3 mt-2 h-455">
          <CourseText text={text} />
        </div>
      ) : contentType === QUIZ ? (
        <QuizList courseId={courseDetail?.id} chapterId={chapterId} />
      ) : contentType === DOCUMENT ? (
        <>
          <object
            data={pdfUrl}
            type="application/pdf"
            className="previewImage w-100 h-455"
          />
        </>
      ) : (
        contentType === VIDEO && (
          <div className="position-relative">
            {showUpNext && showNextHandler()}
            {videoLink ? (
              <ReactPlayer
                url={videoLink}
                controls
                config={{
                  file: {
                    attributes: { controlsList: "nodownload" },
                  },
                }}
                width="100%"
                height="455"
                ref={videoPlayerRef}
                onStart={() => {
                  if (courseDetail?.previewVideo !== videoLink)
                    handleVideoStart();
                }}
                onPlay={() => {
                  if (courseDetail?.previewVideo !== videoLink)
                    handleVideoPlay();
                }}
                onPause={() => {
                  if (courseDetail?.previewVideo !== videoLink)
                    handleVideoPause();
                }}
                onEnded={() => {
                  if (courseDetail?.previewVideo !== videoLink)
                    handleVideoEnded();
                }}
                playing={
                  courseDetail.courseType === "offline"
                    ? false
                    : courseDetail.purchaseDetails !== null && isVideoPlaying
                    ? true
                    : false
                }
                onContextMenu={(e) => e.preventDefault()}
              />
            ) : (
              <img
                src={courseDetail.imageURL ? courseDetail.imageURL : ""}
                className="img-fluid w-100 h-455"
                onError={(e) => {
                  onImageError(e);
                }}
              />
            )}
          </div>
        )
      )}
    </div>
  );
};

export default CourseContentView;
