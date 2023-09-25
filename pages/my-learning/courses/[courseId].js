import React, { useEffect, useRef, useState } from "react";
import { Layout } from "@components/layout";
import { Col, Row } from "react-bootstrap";
import CourseContent from "components/my-learning/courses/course-content";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { contentTypes } from "utils";
import {
  getChapterPdf,
  getCourseDetail,
  getLessonVideo,
  setQuizAnswer,
  updateUserViews,
} from "store/actions";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";
import {
  Certifications,
  StudentFeedback,
  AboutTeacher,
} from "components/profile";
import OtherCourses from "components/otherCoursesRooms/otherCourses";
import OtherMatchToGM from "components/otherCoursesRooms/otherMatchToGM";
import WithAuth from "components/with-auth/with-auth";
import CourseContentView from "components/my-learning/courses/course-content-view";
import CourseStructure from "components/my-learning/courses/course-structure";
import AboutInsititue from "components/profile/about-institute";
import CourseDetailLoader from "components/ui/course-detail-loader";

const MyLearningCoursePage = () => {
  const dispatch = useDispatch();

  const router = useRouter();
  const { courseId } = router.query;
  const { VIDEO, TEXT, QUIZ, DOCUMENT } = contentTypes;
  const { courseDetail } = useSelector((state) => state?.courses);
  const [contentType, setContentType] = useState(VIDEO);
  const [upcomingContentType, setUpcomingContentType] = useState(VIDEO);
  const [videoLink, setVideoLink] = useState("");
  const [pdfUrl, setPdfUrl] = useState("");
  const [text, setText] = useState("");
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const videoPlayerRef = useRef();
  const [videoStartTime, setVideoStartTime] = useState(0);
  // States for video player
  const [nextLesson, setNextLesson] = useState("");
  const [chapterIndex, setChapterIndex] = useState(0);
  const [lessonIndex, setLessonIndex] = useState(0);
  const [showUpNext, setShowUpNext] = useState(false);
  const [chapterId, setChapterId] = useState("");
  const [lessonId, setLessonId] = useState("");
  const [activeChapterToggle, setActiveChapterToggle] = useState();

  const pageReload = localStorage.getItem("pageReload");
  const { courseDetailLoader } = useSelector(
    ({ ui }) => ui.loaders,
    shallowEqual
  );
  useEffect(() => {
    if (pageReload)
      dispatch(setQuizAnswer(JSON.parse(pageReload))).then(() => {
        localStorage.removeItem("pageReload");
      });
    dispatch(getCourseDetail(courseId, router));
  }, []);

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

    if (courseDetail?.purchaseDetails === null) {
      router.push("/course-detail/" + courseId);
    }
  }, [courseDetail]);

  /******************* 
  @purpose : Used for handling video autoplay
  @param: {}
  @Author : INIC
  ******************/
  const handleAutoPlay = (chapterIndex, lessonIndex) => {
    setChapterIndex(chapterIndex);
    setLessonIndex(lessonIndex);
    let nextContent =
      courseDetail?.chapterDetails?.[chapterIndex]?.chapterLessonDetails?.[
        lessonIndex + 1
      ];
    if (nextContent !== undefined && nextContent?.videoURL !== null) {
      setNextLesson(nextContent);
      setUpcomingContentType(VIDEO);
    } else if (
      nextContent !== undefined &&
      nextContent?.quiz === true &&
      courseDetail?.chapterDetails?.[chapterIndex]?.chapterQuizDetails?.length >
        0
    ) {
      setChapterId(courseDetail?.chapterDetails?.[chapterIndex]?.id);
      setNextLesson(
        courseDetail?.chapterDetails?.[chapterIndex]?.chapterQuizDetails
      );
      setUpcomingContentType(QUIZ);
    } else if (nextContent !== undefined && nextContent?.pdf !== null) {
      setChapterId(courseDetail?.chapterDetails?.[chapterIndex]?.id);
      setNextLesson(nextContent);
      setUpcomingContentType(DOCUMENT);
    } else if (nextContent !== undefined && nextContent?.text !== null) {
      setChapterId(courseDetail?.chapterDetails?.[chapterIndex]?.id);
      setNextLesson(nextContent);
      setUpcomingContentType(TEXT);
    } else {
      nextContent =
        courseDetail?.chapterDetails?.[chapterIndex + 1]
          ?.chapterLessonDetails?.[0];
      if (nextContent !== undefined) {
        setChapterIndex(chapterIndex + 1);
        setLessonIndex(-1);
        if (nextContent?.videoURL !== null) {
          setNextLesson(nextContent);
          setUpcomingContentType(VIDEO);
        } else if (
          nextContent?.quiz === true &&
          courseDetail?.chapterDetails?.[chapterIndex + 1]?.chapterQuizDetails
            ?.length > 0
        ) {
          setChapterId(courseDetail?.chapterDetails?.[chapterIndex + 1]?.id);
          setNextLesson(
            courseDetail?.chapterDetails?.[chapterIndex + 1]?.chapterQuizDetails
          );
          setUpcomingContentType(QUIZ);
        } else if (nextContent?.pdf !== null) {
          setChapterId(courseDetail?.chapterDetails?.[chapterIndex + 1]?.id);
          setNextLesson(nextContent);
          setUpcomingContentType(DOCUMENT);
        } else if (nextContent?.text !== null) {
          setChapterId(courseDetail?.chapterDetails?.[chapterIndex + 1]?.id);
          setNextLesson(nextContent);
          setUpcomingContentType(TEXT);
        } else {
          setShowUpNext(false);
        }
      } else {
        setShowUpNext(false);
      }
    }
  };

  /******************* 
  @purpose : Used for updating video status
  @param: {}
  @Author : INIC
  ******************/
  const updateVideoWatchlist = () => {
    if (lessonId && chapterId && courseDetail?.id) {
      let data = {
        chapterId,
        lessonId,
        courseId: courseDetail?.id,
        watchedDuration: parseInt(videoPlayerRef?.current?.getCurrentTime()),
      };
      dispatch(updateUserViews(data)).then(async (res) => {
        if (res.status === 1) {
          dispatch(getCourseDetail(courseDetail?.id));
        }
      });
    }
  };

  /******************* 
  @purpose : Used for handling document click
  @param: {video}
  @Author : INIC
  ******************/
  const onPdfChangeHandler = async (id) => {
    const res = await Promise.resolve(dispatch(getChapterPdf(id)));
    setPdfUrl(res?.pdfURL?.url);
  };

  if (courseDetailLoader) {
    return <CourseDetailLoader sidebar={false} />;
  }
  return (
    <Layout>
      <div className="my-learning-course container-fluid">
        <Row>
          <Col md={12} className={`course-title-row`}>
            <h3>{courseDetail?.title}</h3>
          </Col>
        </Row>

        <Row className="course-preview-row">
          <Col md={9} className={"course-preview-left "}>
            <CourseContentView
              contentType={contentType}
              videoLink={videoLink}
              courseDetail={courseDetail}
              updateVideoWatchlist={updateVideoWatchlist}
              pdfUrl={pdfUrl}
              text={text}
              isVideoPlaying={isVideoPlaying}
              setIsVideoPlaying={setIsVideoPlaying}
              videoPlayerRef={videoPlayerRef}
              videoStartTime={videoStartTime}
              setVideoStartTime={setVideoStartTime}
              chapterId={chapterId}
              setContentType={setContentType}
              setChapterId={setChapterId}
              setVideoLink={setVideoLink}
              nextLesson={nextLesson}
              setNextLesson={setNextLesson}
              upcomingContentType={upcomingContentType}
              chapterIndex={chapterIndex}
              lessonIndex={lessonIndex}
              handleAutoPlay={handleAutoPlay}
              showUpNext={showUpNext}
              setShowUpNext={setShowUpNext}
              onPdfChangeHandler={onPdfChangeHandler}
              setActiveChapterToggle={setActiveChapterToggle}
            />

            <CourseContent />
            <Certifications />
            <OtherMatchToGM
              type="courses"
              courseType={courseDetail?.courseType}
            />
            {courseDetail?.instituteDetails?.id ? (
              <AboutInsititue
                rating={courseDetail?.rating}
                instituteDetails={courseDetail?.instituteDetails}
              />
            ) : (
              <AboutTeacher
                rating={courseDetail?.rating}
                userDetails={courseDetail?.UserDetails}
              />
            )}
            <StudentFeedback sourceId={courseId} type="course" />
            <OtherCourses
              courseId={courseDetail?.id}
              userDetails={courseDetail?.UserDetails}
              instituteDetails={courseDetail?.instituteDetails}
            />
          </Col>

          <Col md={3} className="courses-list-preview pb-3">
            {courseDetail?.chapterDetails &&
              courseDetail?.chapterDetails?.length > 0 && (
                <CourseStructure
                  courseDetail={courseDetail}
                  updateVideoWatchlist={updateVideoWatchlist}
                  setContentType={setContentType}
                  setVideoLink={setVideoLink}
                  setPdfUrl={setPdfUrl}
                  setChapterId={setChapterId}
                  lessonId={lessonId}
                  setLessonId={setLessonId}
                  setText={setText}
                  setIsVideoPlaying={setIsVideoPlaying}
                  isVideoPlaying={isVideoPlaying}
                  setVideoStartTime={setVideoStartTime}
                  handleAutoPlay={handleAutoPlay}
                  setShowUpNext={setShowUpNext}
                  onPdfChangeHandler={onPdfChangeHandler}
                  activeChapterToggle={activeChapterToggle}
                  setActiveChapterToggle={setActiveChapterToggle}
                />
              )}
          </Col>
        </Row>
      </div>
    </Layout>
  );
};

export default WithAuth(MyLearningCoursePage);
