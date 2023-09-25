import React, { useState } from "react";
import { Accordion, Card } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { getLessonVideo } from "store/actions";
import { contentTypes, secondsToMinute } from "utils";

const CourseStructure = ({
  courseDetail,
  updateVideoWatchlist,
  setContentType,
  setVideoLink,
  setPdfUrl,
  setChapterId,
  lessonId,
  setLessonId,
  setText,
  setIsVideoPlaying,
  isVideoPlaying,
  setVideoStartTime,
  handleAutoPlay,
  setShowUpNext,
  onPdfChangeHandler,
  activeChapterToggle,
  setActiveChapterToggle,
}) => {
  const { VIDEO, TEXT, QUIZ, DOCUMENT } = contentTypes;
  const [lang] = useTranslation("language");
  const dispatch = useDispatch();

  /******************* 
  @purpose : Used for handling video click
  @param: {video}
  @Author : INIC
  ******************/
  const handleVideoClickFromPlaylist = async (
    video,
    chapterIndex,
    lessonIndex
  ) => {
    await Promise.resolve(updateVideoWatchlist());
    if (video?.ulwd?.watchedDuration) {
      setVideoStartTime(video?.ulwd?.watchedDuration);
    }

    setContentType(VIDEO);
    const res = await Promise.resolve(dispatch(getLessonVideo(video?.id)));
    setVideoLink(res?.filePath);
    handleAutoPlay(chapterIndex, lessonIndex);
    setShowUpNext(false);
  };

  return (
    <>
      <div className="courses-list-head">
        <h6>Course Structure</h6>
      </div>
      <Accordion defaultActiveKey="0">
        {Array.isArray(courseDetail?.chapterDetails) &&
          courseDetail?.chapterDetails?.map((chapter, chapterIndex) => (
            <div key={chapter?.id} className="border-bottom border-geyser">
              <Accordion.Toggle
                as={Card.Header}
                eventKey={activeChapterToggle}
                className="text-body-14 px-0 pt-0 pointer border-0"
                onClick={() =>
                  activeChapterToggle === chapter?.id
                    ? setActiveChapterToggle("")
                    : setActiveChapterToggle(chapter?.id)
                }
              >
                <div className="d-flex justify-content-between">
                  <div className="ml-4 mt-3">{chapter?.title}</div>
                  <span className="icon-down-arrow-grey ml-auto mr-2 mt-3 pr-1 text-primary"></span>
                </div>
                <div className="d-flex ml-4 mt-2">
                  <small className="text-body-12 text-secondary border-top-0 border-bottom-0 pr-2">
                    {chapter?.chapterLessonDetails?.length > 1
                      ? `${chapter?.chapterLessonDetails?.length} Contents`
                      : `${chapter?.chapterLessonDetails?.length} Content`}
                  </small>
                </div>
              </Accordion.Toggle>
              <Accordion.Collapse eventKey={chapter?.id}>
                <div className="p-20">
                  <ul className="list-unstyled">
                    {Array.isArray(chapter?.chapterLessonDetails) &&
                      chapter?.chapterLessonDetails?.length > 0 &&
                      chapter?.chapterLessonDetails
                        .sort((a, b) => a.lessonsOrder - b.lessonsOrder)
                        .map((lesson, lessonIndex) => {
                          if (lesson?.videoURL !== null) {
                            return (
                              <li
                                className="text-body-14 font-weight-normal d-flex justify-content-between mb-3 pointer"
                                key={lesson?.id}
                                onClick={() => {
                                  if (courseDetail.purchaseDetails !== null) {
                                    if (
                                      isVideoPlaying &&
                                      lessonId === lesson?.id
                                    ) {
                                      setIsVideoPlaying(false);
                                    } else {
                                      setChapterId(lesson?.chapterId);
                                      setLessonId(lesson?.id);
                                      setIsVideoPlaying(true);
                                      handleVideoClickFromPlaylist(
                                        lesson,
                                        chapterIndex,
                                        lessonIndex
                                      );
                                    }
                                  }
                                }}
                              >
                                <span className="pl-0 d-flex justify-content-between">
                                  <span>
                                    <em
                                      className={
                                        lesson?.ulwd?.isWatched
                                          ? "font-20 pr-2 align-middle bx bx-check-circle"
                                          : isVideoPlaying &&
                                            lessonId === lesson?.id
                                          ? "font-20 pr-2 align-middle bx bx-pause-circle"
                                          : "font-20 pr-2 align-middle bx bx-play-circle"
                                      }
                                      style={{ color: "#0f6bbf" }}
                                    ></em>
                                  </span>
                                  <span>{lesson?.title}</span>
                                </span>
                                <span className="pl-0">
                                  {secondsToMinute(lesson?.duration)}
                                </span>
                              </li>
                            );
                          }

                          if (lesson?.pdf !== null) {
                            return (
                              <li
                                className="text-body-14 font-weight-normal d-flex justify-content-between mb-3 pointer"
                                key={lesson?.id}
                                onClick={() => {
                                  if (courseDetail.purchaseDetails !== null) {
                                    setContentType(DOCUMENT);
                                    onPdfChangeHandler(lesson?.id);
                                  }
                                }}
                              >
                                <span className="pl-0 d-flex justify-content-between">
                                  <span>
                                    <i
                                      className="bx bxs-file-pdf pr-2 font-20"
                                      style={{ color: "#0f6bbf" }}
                                    ></i>
                                    {lesson?.title}
                                  </span>
                                </span>
                              </li>
                            );
                          }

                          if (
                            lesson?.quiz === true &&
                            chapter?.chapterQuizDetails?.length > 0
                          ) {
                            return (
                              <li
                                className="text-body-14 font-weight-normal d-flex justify-content-between mb-3 pointer"
                                key={lesson?.id}
                                onClick={() => {
                                  if (courseDetail.purchaseDetails !== null) {
                                    localStorage.setItem(
                                      "quizTimer",
                                      chapter?.timer
                                    );
                                    setChapterId(lesson?.chapterId);
                                    setContentType(QUIZ);
                                  }
                                }}
                              >
                                <span className="pl-0 d-flex justify-content-between">
                                  <span>
                                    <i
                                      className="bx bxs-help-circle pr-2 font-20"
                                      style={{ color: "#0f6bbf" }}
                                    ></i>{" "}
                                  </span>
                                  <span>
                                    {lang("COURSES.QUIZ")} {chapter.title}
                                  </span>
                                </span>
                              </li>
                            );
                          }

                          if (lesson?.text !== null) {
                            return (
                              <li
                                className="text-body-14 font-weight-normal d-flex justify-content-between mb-3 pointer"
                                key={lesson?.id}
                                onClick={() => {
                                  if (courseDetail.purchaseDetails !== null) {
                                    setContentType(TEXT);
                                    setText(lesson?.text);
                                  }
                                }}
                              >
                                <span className="pl-0 d-flex justify-content-between">
                                  <span>
                                    <i
                                      className="bx bx-text pr-2 font-20"
                                      style={{ color: "#0f6bbf" }}
                                    ></i>
                                    {lang("COURSES.CHAPTER_TEXT")}
                                  </span>
                                </span>
                              </li>
                            );
                          }

                          if (lesson?.room !== null) {
                            return (
                              <li
                                className="text-body-14 font-weight-normal d-flex justify-content-between mb-3 pointer"
                                key={lesson?.id}
                              >
                                <span className="pl-0 d-flex justify-content-between">
                                  <i
                                    className="bx bxl-zoom pr-2 font-20"
                                    style={{ color: "#0f6bbf" }}
                                  ></i>
                                  <a
                                    target="_blank"
                                    href={
                                      courseDetail.purchaseDetails !== null &&
                                      lesson?.room
                                    }
                                    className="text-black"
                                  >
                                    {lang("COURSES.TRAINING_ROOM")}
                                  </a>
                                </span>
                              </li>
                            );
                          }
                        })}
                  </ul>
                </div>
              </Accordion.Collapse>
            </div>
          ))}
      </Accordion>
      {courseDetail?.courseQuiz?.length > 0 && (
        <div
          className="d-flex justify-content-between pointer course-test"
          onClick={() => {
            if (courseDetail.purchaseDetails !== null) {
              localStorage.setItem("quizTimer", courseDetail?.timer);
              setChapterId(undefined);
              setContentType(QUIZ);
            }
          }}
        >
          <h6>{lang("COURSES.COURSE_TEST")}</h6>
        </div>
      )}
    </>
  );
};

export default CourseStructure;
