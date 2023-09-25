import { Loader } from "components/ui";
import TimeCountdown from "components/ui/timer";
import React, { useEffect, useState } from "react";
import { Button, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchQuizQuestions,
  getQuizDetails,
  setQuizAnswer,
} from "store/actions";
import Result from "./result";

function QuizList({ chapterId, courseId }) {
  const dispatch = useDispatch();
  const quizList = useSelector((state) => state.courses.quizQuestions);
  const quizDetails = useSelector((state) => state.courses.quizQuestionsSingle);

  const [questionId, setQuestionId] = useState();
  const [questionIndex, setQuestionIndex] = useState(1);
  const [userAnswer, setUserAnswer] = useState([]);
  const [loader, setLoader] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState();
  const [isTimeUp, setIsTimeUp] = useState(false);

  const timer = localStorage.getItem("quizTimer");
  const localQuestionId = localStorage.getItem("questionId");

  useEffect(() => {
    window.addEventListener("unload", function (e) {
      let body = {
        chapterId,
        courseId,
        userAnswer,
        questionId: localQuestionId,
        isTimeUp,
        markedAsReview: false,
        time: +timer,
        isSubmit: true,
      };
      localStorage.setItem("pageReload", JSON.stringify(body));
    });
  }, []);

  useEffect(() => {
    return () => {
      if (showResult === false) {
        if (localQuestionId) {
          let body = {
            chapterId,
            courseId,
            userAnswer,
            questionId: localQuestionId,
            isTimeUp,
            markedAsReview: false,
            time: +timer,
            isSubmit: true,
          };
          dispatch(setQuizAnswer(body));
        }
      }
    };
  }, [chapterId]);

  useEffect(() => {
    if (questionId) {
      dispatch(getQuizDetails(questionId)).then((res) => {
        if (res?.userQuizAnswer[0]?.givenAnswer.length > 0) {
          setUserAnswer(res?.userQuizAnswer[0]?.givenAnswer);
        }
      });
    }
  }, [questionId]);

  useEffect(() => {
    if (quizList) {
      setQuestionId(quizList[questionIndex - 1]?.id);
    }
  }, [questionIndex]);

  useEffect(() => {
    setQuestionIndex(1);
    setShowResult(false);
    dispatch(
      fetchQuizQuestions({
        chapterId,
        courseId,
      })
    ).then((res) => {
      setQuestionId(res?.rows[0]?.id);
      localStorage.setItem("questionId", res?.rows[0]?.id);
    });
  }, [chapterId]);

  useEffect(() => {
    if (isTimeUp) setQuestionAnswer(false, false);
  }, [isTimeUp]);

  /******************** 
@purpose : Used for get All Quiz List
@Parameter : {}
@Author : INIC
******************/
  const getAllQuizList = () => {
    dispatch(
      fetchQuizQuestions({
        chapterId,
        courseId,
      })
    );
  };

  /******************** 
@purpose : Used for set answer
@Parameter : {}
@Author : INIC
******************/
  const setQuestionAnswer = (isSubmit, markedAsReview, type, index, queId) => {
    setLoader(true);
    let body = {
      chapterId,
      courseId,
      userAnswer,
      questionId,
      isTimeUp,
      markedAsReview,
      time: +timer,
      isSubmit,
    };
    dispatch(setQuizAnswer(body)).then((res) => {
      if (markedAsReview && quizList?.length === questionIndex) {
        setQuestionIndex(1);
      }
      if (res?.result) {
        setShowResult(true);
        setResult(res?.result);
        setLoader(false);
      } else {
        if (type === "next" && quizList?.length !== questionIndex)
          setQuestionIndex(questionIndex + 1);
        if (type === "step") {
          setQuestionIndex(index);
          setQuestionId(queId);
        }
        getAllQuizList();
        setUserAnswer([]);
        setLoader(false);
        setIsTimeUp(false);
      }
    });
  };

  /******************** 
@purpose : Used for checkbox/radio change 
@Parameter : {}
@Author : INIC
******************/
  const handleChange = (e, hasMultipleAnswers) => {
    const { id, checked } = e.target;
    if (hasMultipleAnswers) {
      if (checked) {
        setUserAnswer([...userAnswer, id]);
      } else {
        const unCheck = userAnswer.filter((ele) => ele !== id);
        setUserAnswer(unCheck);
      }
    } else {
      setUserAnswer([id]);
    }
  };

  return (
    <div>
      <div className="bg-white d-md-flex quiz-modal">
        {loader ? (
          <Loader />
        ) : showResult ? (
          <Result result={result} />
        ) : (
          <>
            <div className="quiestions-box">
              <div className="border border-dark rounded-8">
                <div className="border-bottom border-dark py-2 px-3">
                  <h6 className="text-body-12 text-uppercase font-weight-semibold">
                    Question {questionIndex} out of {quizList?.length}
                  </h6>
                  <h5 className="text-body-16 mb-0">{quizDetails?.question}</h5>
                </div>
                <div className="p-3">
                  {quizDetails?.optionsdetails?.map((option, optionIndex) => (
                    <div
                      className="border border-dark rounded-8 text-body-14 font-weight-normal rounded mb-2 p-3"
                      key={optionIndex}
                    >
                      <div
                        className={
                          quizDetails?.hasMultipleAnswers
                            ? "custom-checkbox checkbox-blue mr-4"
                            : "custom-radio custom-radio-outline mr-4"
                        }
                      >
                        <label
                          htmlFor={option?.id}
                          className="mb-0 pr-0 ml-auto pr-2"
                        >
                          <input
                            type={
                              quizDetails?.hasMultipleAnswers
                                ? "checkbox"
                                : "radio"
                            }
                            name={
                              quizDetails?.hasMultipleAnswers
                                ? `qestion-${questionIndex}-${option?.id}`
                                : "cssradio"
                            }
                            id={option?.id}
                            autoComplete="off"
                            onChange={(e) => {
                              handleChange(e, quizDetails?.hasMultipleAnswers);
                            }}
                            checked={userAnswer.includes(option?.id)}
                          />
                          <span></span>
                          {option?.optionText}
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="py-4 d-md-flex d-none">
                <Button
                  variant="btn btn-outline-gray font-weight-semibold mr-4"
                  disabled={questionIndex === 1}
                  onClick={() => {
                    setQuestionIndex(questionIndex - 1);
                  }}
                >
                  <span className="bx bx-left-arrow-alt previous-icon"></span>{" "}
                  Back
                </Button>
                <Button
                  variant="btn btn-outline-secondary font-weight-semibold ml-auto mr-4"
                  onClick={() => {
                    setQuestionAnswer(false, true, "next");
                  }}
                >
                  Review Later
                </Button>
                {loader ? (
                  <Spinner as="span" animation="border" variant="primary" />
                ) : (
                  <Button
                    variant="btn btn-info font-weight-semibold"
                    onClick={() => {
                      if (quizList?.length !== questionIndex)
                        setQuestionAnswer(false, false, "next");
                      else setQuestionAnswer(true);
                    }}
                  >
                    {quizList?.length !== questionIndex
                      ? "Save & Next"
                      : "Submit"}
                  </Button>
                )}
              </div>
            </div>
            <div className="timer-box d-flex mt-lg-0 mt-4">
              <div className="border border-dark rounded-8">
                <TimeCountdown
                  setIsTimeUp={setIsTimeUp}
                  key={chapterId ? chapterId : courseId}
                />
                <div className="p-3">
                  <h5 className="text-body-16">Questions</h5>
                  <div className="d-flex flex-wrap">
                    <div className="mb-3 mr-3 d-flex align-items-center">
                      <div className="bg-exquisite-turquoise-16 border border-dark rounded-3 mr-2 w-h-16 flex-shrink-0"></div>
                      <p className="text-body-12 mb-0">Answered</p>
                    </div>
                    <div className="mb-3 mr-3 d-flex align-items-center">
                      <div className="bg-rise-n-shine-16 border border-dark rounded-3 mr-2 w-h-16 flex-shrink-0"></div>
                      <p className="text-body-12 mb-0">Not Answered/Skipped</p>
                    </div>
                    <div className="mb-3 mr-3 d-flex align-items-center">
                      <div className="bg-flirty-salmon-16 border border-dark rounded-3 mr-2 w-h-16 flex-shrink-0"></div>
                      <p className="text-body-12 mb-0">
                        Marked for review later
                      </p>
                    </div>
                    <div className="mb-3 mr-3 d-flex align-items-center">
                      <div className="bg-doctor border border-dark rounded-3 mr-2 w-h-16 flex-shrink-0"></div>
                      <p className="text-body-12 mb-0">Not Visited</p>
                    </div>
                  </div>
                  <div className="d-flex flex-wrap date-listing">
                    {quizList &&
                      quizList.map((question, index) => (
                        <div
                          key={`quiz-${index}`}
                          className={`w-h-40 rounded-pill flex-shrink-0 font-weight-semibold ${
                            index + 1 === questionIndex
                              ? "bg-primary text-white"
                              : question?.userQuizAnswer.length > 0 &&
                                question?.userQuizAnswer[0]?.markedAsReview
                              ? "bg-flirty-salmon-16 text-flirty-salmon"
                              : question?.userQuizAnswer.length > 0 &&
                                question?.userQuizAnswer[0]?.givenAnswer
                                  .length > 0
                              ? "bg-exquisite-turquoise-16 text-exquisite-turquoise"
                              : question?.userQuizAnswer.length > 0 &&
                                question?.userQuizAnswer[0]?.notAnswered
                              ? "bg-rise-n-shine-16 text-rise-n-shine"
                              : "bg-paper-white text-subnautical"
                          }  font-14 d-flex align-items-center justify-content-center mb-2 pointer`}
                          disabled={index + 1 === questionIndex}
                          onClick={() => {
                            setQuestionAnswer(
                              false,
                              false,
                              "step",
                              index + 1,
                              question?.id
                            );
                          }}
                        >
                          {index + 1}
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default QuizList;
