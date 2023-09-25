import React, { useEffect, useState } from "react";
import { Container, Card, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPracticalTestList,
  fetchPracticalTestAnswers,
} from "store/actions";

function PracticalTest({
  courseid,
  chapterid,
  lessonid,
  type,
  setShowUpNext,
  setUpcomingContentType,
  showUpNext,
  showNextHandler,
  setType,
  courseDetail,
  indexChapter,
  setUpcomingVideo,
  setIndexChapter,
  setIndexChapterLesson,
}) {
  const dispatch = useDispatch();
  const { practicalTestQueList } = useSelector((state) => state.courses);
  const { practicalTestAnsList } = useSelector((state) => state.courses);
  const [userAnswer, setUserAnswer] = useState([]);

  useEffect(() => {
    QuestionList();
  }, []);

  const QuestionList = async () => {
    if (type === "chapter") {
      await dispatch(
        fetchPracticalTestList({
          page: 1,
          pagesize: 10,
          chapterId: chapterid,
          courseId: courseid,
        })
      );
    } else {
      await dispatch(
        fetchPracticalTestList({
          page: 1,
          pagesize: 10,
          courseId: courseid,
          lessonId: lessonid,
        })
      );
    }
  };

  const handleCheck = (answer, questionId) => {
    if (userAnswer.length === 0) {
      setUserAnswer([
        {
          questionId,
          answer,
        },
      ]);
    } else {
      let question = userAnswer.find((ele) => ele.questionId === questionId);

      if (question === undefined) {
        setUserAnswer([
          ...userAnswer,
          {
            questionId,
            answer: answer,
          },
        ]);
      } else {
        if (question.questionId === questionId) {
          const ques = [...userAnswer];
          let ansindex = userAnswer.findIndex(
            (ele) => ele.questionId === questionId
          );

          ques[ansindex] = { questionId, answer };
          setUserAnswer(ques);
        }
      }
    }
  };

  const submitQuiz = () => {
    if (type === "chapter") {
      dispatch(
        fetchPracticalTestAnswers({
          chapterId: chapterid,
          courseId: courseid,
          userAnswer,
        })
      );
    } else {
      dispatch(
        fetchPracticalTestAnswers({
          lessonId: lessonid,
          courseId: courseid,
          userAnswer,
        })
      );
    }
  };

  return (
    <Container>
      <div className="d-flex flex-xl-nowrap flex-wrap pt-3">
        <div className="w-100">
          {practicalTestQueList && practicalTestQueList?.length === 0 ? (
            <i>No Practical Test</i>
          ) : (
            practicalTestQueList?.length > 0 &&
            practicalTestQueList.map((v, index) => {
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
                      <ul
                        className="listing-section border-first-0"
                        key={index}
                      >
                        <li className="listing-box align-items-start align-items-center">
                          <input
                            type="textarea"
                            className="form-control py-5"
                            name={index}
                            id={index}
                            onChange={(event) =>
                              handleCheck(event.target.value, v.id)
                            }
                          />
                        </li>
                        {practicalTestAnsList?.userAnswer &&
                          practicalTestAnsList.userAnswer.map((data, i) => (
                            <>
                              {data.questionId === v.id && (
                                <span key={`key-${i}`}>{`This is ${
                                  data.correctAnswer ? "correct" : "incorrect"
                                } answer`}</span>
                              )}
                            </>
                          ))}
                      </ul>
                    </div>
                  </Card.Body>
                </Card>
              );
            })
          )}
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
                    variant="danger text-white w-sm-100 mr-3"
                    size="sm"
                  >
                    Submit Test
                  </Button>
                </div>
              </div>
            </Card.Body>
          </Card>
        </div>
      </div>

      <Button
        onClick={() => {
          if (
            type === "lesson" &&
            courseDetail.chapterDetails?.[indexChapter]?.chapterQuizDetails
              .length > 0
          ) {
            setType("chapter");
            setUpcomingContentType("quiz");
          } else if (
            type === "lesson" &&
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

export default PracticalTest;
