import React, { useState } from "react";
import { Card, ProgressBar } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

import {
  pollVoting,
  toggleModals,
  undoVote,
  voteClickData,
} from "store/actions";
import { selectUserInfo } from "store/selectors/user";
import { convertToTargetTimezone, roundOfNumbers } from "utils";

/******************** 
@purpose :  Dashboard Post Poll
@Parameter : {listData, type}
@Author : INIC
******************/
const PostPoll = ({ poll, getAllPost, postUserId }) => {
  const dispatch = useDispatch();
  const [lang] = useTranslation("language");
  const userData = useSelector(selectUserInfo);
  let current = new Date().getTime() / 1000.0;
  let expiry = new Date(poll.pollExpiryDate).getTime() / 1000.0;

  let isPollClosed = expiry < current;

  const [viewResult, setViewResult] = useState(false);

  poll.answerDetails.sort((a, b) => {
    return a.pollOrder - b.pollOrder;
  });

  let isVoted = false;
  poll.pollHistoryDetails.forEach((element) => {
    if (element.userId === userData.id) {
      return (isVoted = true);
    }
  });

  if (isPollClosed) {
    isVoted = true;
  }

  /******************** 
@purpose :  poll Voting
@Parameter : {body}
@Author : INIC
******************/
  const handlePollVoting = async (poll, id) => {
    let body = {
      questionId: id,
      answerId: poll?.id,
    };
    dispatch(pollVoting(body));

    getAllPost();
    setViewResult(true);
  };
  /******************** 
@purpose :  poll view vote result
@Parameter : {body}
@Author : INIC
******************/
  const handlePollViewVoteResult = (e, listData) => {
    dispatch(toggleModals({ votespoll: true }));
    dispatch(voteClickData(listData));
  };
  /******************** 
@purpose :  poll undo vote
@Parameter : {body}
@Author : INIC
******************/

  const pollUndoResult = (poll) => {
    const data = poll?.pollHistoryDetails.filter(
      (ele) => ele.userId === userData.id
    );
    if (data?.length > 0) {
      return (
        <span className="undo-result  text-small">
          <span className="px-1  text-small cursor-default">•</span>
          <span className="text-black" onClick={() => handleUndoVote(data)}>
            {lang("DASHBOARD.POSTS.POST_BODY.POST_POLL.UNDO")}
          </span>
        </span>
      );
    }
    if (poll?.createdBy === userData?.id) {
      return (
        <span className="undo-result  text-small">
          <span className="px-1  text-small">•</span>
          <span onClick={() => handleViewResult()}>
            {viewResult
              ? lang("DASHBOARD.POSTS.POST_BODY.POST_POLL.HIDE_RESULT")
              : lang("DASHBOARD.POSTS.POST_BODY.POST_POLL.VIEW_RESULT")}
          </span>
        </span>
      );
    }
  };
  /******************** 
@purpose :  undo Voting
@Parameter : {body}
@Author : INIC
******************/
  const handleUndoVote = async (pollHistoryDetails) => {
    if (pollHistoryDetails[0].userId === userData.id) {
      dispatch(undoVote(pollHistoryDetails[0].id));
      getAllPost();
      setViewResult(false);
    }
  };

  /******************** 
@purpose : handleView result
@Parameter : {body}
@Author : INIC
******************/
  const handleViewResult = () => {
    setViewResult(!viewResult);
  };

  return (
    <Card width="100%" className="poll-post">
      <Card.Body>
        <Card.Title>
          <div>
            <h6>{poll?.question}</h6>
            <p className="text-small">The author can see how you vote.</p>
          </div>
        </Card.Title>

        <Card.Text className="poll-effect w-100 cursor-pointer">
          {viewResult === true || isVoted === true
            ? poll?.answerDetails.slice(0).map((answer, index) => {
                const averageVote =
                  (answer?.pVHD?.length * 100) /
                  poll?.pollHistoryDetails?.length;
                const num = roundOfNumbers(averageVote);
                return (
                  <div key={index} className="poll-box mb-2">
                    <div
                      className="d-flex position-relative justify-space-bw"
                      key={index}
                    >
                      <div className="mb-2">
                        <div className="fw-dark"> {answer.answer}</div>
                        <div className="text-small">
                          {answer?.pVHD?.length} votes
                        </div>
                      </div>
                      <div className="ml-2 text-right fw-dark">{`${num}%`}</div>
                    </div>
                    <ProgressBar now={num} className="w-100" />
                  </div>
                );
              })
            : poll?.answerDetails
                // ?.sort(({ pollOrder }) => (pollOrder ? 1 : -1))
                .map((answer, index) => (
                  <div
                    className="poll-option-bar"
                    key={index}
                    onClick={() => handlePollVoting(answer, poll.id)}
                  >
                    {answer.answer}
                  </div>
                ))}
        </Card.Text>

        <div className="poll-result">
          <span
            className={`vote poll-vote-text ${
              postUserId === userData.id
                ? "cursor-pointer poll-vote-hover"
                : "cursor-default"
            }`}
            onClick={(e) =>
              postUserId === userData.id
                ? handlePollViewVoteResult(e, poll)
                : null
            }
          >
            Total votes:
            {`${poll?.pollHistoryDetails?.length || 0} `}
          </span>
          {isPollClosed ? (
            <>
              <span className="px-1  text-small cursor-default">•</span>
              <span className="font-12 cursor-default text-secondary">
                {lang("DASHBOARD.POSTS.POST_BODY.POST_POLL.POLL_CLOSED")}
              </span>
            </>
          ) : null}

          {!isPollClosed && pollUndoResult(poll)}
          <span className="px-1  text-small cursor-default">•</span>
          <span className="text-small cursor-default">
            {convertToTargetTimezone(poll?.pollExpiryDate, userData?.timezone)}
          </span>
        </div>
      </Card.Body>
    </Card>
  );
};

export default PostPoll;
