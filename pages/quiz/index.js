import React, { Fragment, useEffect, useState } from "react";
import { Container, Card, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchQuizQuestionsList,
  fetchQuizAnswers,
  QuizQuestionsClear,
} from "store/actions";

function Quiz({
  courseid,
  chapterid,
  lessonid,
  type,
  setShowUpNext,
  setUpcomingContentType,
  showUpNext,
  showNextHandler,
  indexChapter,
  courseDetail,
  indexChapterLesson,
  setUpcomingVideo,
  setIndexChapter,
  setIndexChapterLesson,
  setType,
}) {
  const dispatch = useDispatch();
  const [userAnswer, setUserAnswer] = useState([]);
  const [disableOptions, setDisableOptions] = useState(false);
  const quizList = useSelector((state) => state.courses.questionsList);
  const answersL = useSelector((state) => state.courses.answersList);

  useEffect(() => {
    QuestionList();
  }, []);
  const QuestionList = async () => {
    if (type === "chapter") {
      await dispatch(
        fetchQuizQuestionsList({
          page: 1,
          pagesize: 10,
          chapterId: chapterid,
          courseId: courseid,
        })
      );
    } else {
      await dispatch(
        fetchQuizQuestionsList({
          page: 1,
          pagesize: 10,
          courseId: courseid,
          lessonId: lessonid,
        })
      );
    }
  };
  useEffect(() => {
    return () => {
      dispatch(QuizQuestionsClear());
    };
  }, []);

  const submitQuiz = () => {
    if (type === "chapter") {
      dispatch(
        fetchQuizAnswers({
          chapterId: chapterid,
          courseId: courseid,
          userAnswer: userAnswer,
        })
      );
    } else {
      dispatch(
        fetchQuizAnswers({
          courseId: courseid,
          lessonId: lessonid,
          userAnswer: userAnswer,
        })
      );
    }
    setDisableOptions(true);
  };

  const handleCheck = (event, id, questionId) => {
    if (userAnswer.length === 0) {
      setUserAnswer([
        {
          questionId,
          answer: [id],
        },
      ]);
    } else {
      let question = userAnswer.find((ele) => ele.questionId === questionId);

      if (question === undefined) {
        setUserAnswer([
          ...userAnswer,
          {
            questionId,
            answer: [id],
          },
        ]);
      } else {
        if (question.questionId === questionId) {
          const ques = [...userAnswer];
          let ansindex = userAnswer.findIndex(
            (ele) => ele.questionId === questionId
          );
          ques[ansindex].answer.push(id);
          setUserAnswer(ques);
        }
      }
    }
  };

  return (
    <Container>
      <div className="d-flex flex-xl-nowrap flex-wrap mt-5">
        <div className="profile-left-bar">
          {quizList && quizList?.length > 0
            ? quizList.map((v, index) => {
                return (
                  <Card className="overflow-hidden mb-4" key={index}>
                    <Card.Body>
                      <div className="bg-dark py-2 px-3 mb-2 d-flex">
                        Q{index + 1}{" "}
                        <span className="text-right ml-auto font-14 text-gray"></span>
                      </div>
                      {/* Solve */}
                      <div className="py-4 text-center">{v.question}</div>
                      <div className="mt-3">
                        <ul className="listing-section border-first-0">
                          {v.optionsdetails && v.optionsdetails.length > 0
                            ? v.optionsdetails.map((listData, ansindex) => {
                                return (
                                  <Fragment key={`answer-${ansindex}`}>
                                    <li className="listing-box align-items-start align-items-center">
                                      <input
                                        onClick={(event) =>
                                          handleCheck(
                                            event,
                                            listData.id,
                                            listData.questionId
                                          )
                                        }
                                        type="checkbox"
                                        disabled={disableOptions}
                                        id={ansindex}
                                        name={ansindex}
                                        value={listData.optionText}
                                      />
                                      <label
                                        for="html"
                                        className="ml-2 mb-0 w-100 pointer"
                                      >
                                        {listData.optionText}
                                      </label>
                                    </li>
                                  </Fragment>
                                );
                              })
                            : ""}
                        </ul>
                      </div>
                    </Card.Body>
                  </Card>
                );
              })
            : ""}
          <Card className="overflow-hidden mb-4">
            <Card.Body>
              <div className="d-flex justify-content-between">
                <div>
                  <Button
                    variant="warning w-sm-100"
                    size="sm"
                    onClick={() =>
                      window.open(`/course-detail/${courseid}`, "_self")
                    }
                  >
                    Back
                  </Button>
                </div>

                <div>
                  <Button
                    onClick={submitQuiz}
                    type="submit"
                    variant="danger text-white w-sm-100 mr-3"
                    size="sm"
                  >
                    Submit Quiz
                  </Button>
                </div>
              </div>
            </Card.Body>
          </Card>
        </div>

        <div className="profile-right-bar">
          <Card className="overflow-hidden mb-4">
            <Card.Body>
              <div>
                <h5 className="font-16 mb-3">Question Label</h5>
                <ul className="listing-section">
                  <li className="listing-box align-items-start align-items-center">
                    <div className="w-h-40 bg-dark"></div>
                    <h6 className="font-14 font-weight-lighter mb-0 pl-4">
                      Not Visited
                    </h6>
                  </li>
                  <li className="listing-box align-items-start align-items-center">
                    <div className="w-h-40 bg-success"></div>
                    <h6 className="font-14 font-weight-lighter mb-0 pl-4">
                      Answered
                    </h6>
                  </li>
                  <li className="listing-box align-items-start align-items-center">
                    <div className="w-h-40 bg-danger"></div>
                    <h6 className="font-14 font-weight-lighter mb-0 pl-4">
                      Not Answered/Skipped
                    </h6>
                  </li>
                  <li className="listing-box align-items-start align-items-center">
                    <div className="w-h-40 bg-warning"></div>
                    <h6 className="font-14 font-weight-lighter mb-0 pl-4">
                      Marked for review later
                    </h6>
                  </li>
                </ul>
              </div>
            </Card.Body>
          </Card>
        </div>
      </div>
      <Button
        onClick={() => {
          if (
            type === "lesson" &&
            courseDetail.chapterDetails?.[indexChapter]?.chapterLessonDetails?.[
              indexChapterLesson
            ]?.chLePrDe.length > 0
          ) {
            setUpcomingContentType("practical");
          } else if (
            type === "lesson" &&
            courseDetail.chapterDetails?.[indexChapter]?.chapterQuizDetails
              .length > 0
          ) {
            setType("chapter");
            setUpcomingContentType("quiz");
          } else if (
            type === "chapter" &&
            courseDetail.chapterDetails?.[indexChapter]?.chapterPracticalDetails
              .length > 0
          ) {
            setType("chapter");
            setUpcomingContentType("practical");
          } else if (
            courseDetail?.chapterDetails?.[indexChapter + 1]
              ?.chapterLessonDetails?.[0]
          ) {
            setUpcomingContentType("video");
            setUpcomingVideo(
              courseDetail?.chapterDetails?.[indexChapter + 1]
                ?.chapterLessonDetails?.[0]
            );
            setIndexChapter(indexChapter + 1);
            setIndexChapterLesson(-1);
          }
          setShowUpNext(true);
        }}
      >
        Next
      </Button>
      {showUpNext && showNextHandler()}
    </Container>
  );
}

export default Quiz;
