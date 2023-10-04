import { Box, LinearProgress, Stack, Typography } from "@mui/material";
import LinearProgressbar from "components/linear-progressbar";
import React, { useState } from "react";
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
    <Box>
      <Typography variant="titleSmall">{poll?.question}</Typography>
      <Box variant="labelSmall">
        <Typography variant="labelSmall" component={"span"}>
          The author can see how you vote.
        </Typography>

        <Typography variant="labelSmall" color={"#6750A4"} component={"span"}>
          {" "}
          Learn more
        </Typography>
      </Box>

      <Box>
        {viewResult === true || isVoted === true
          ? poll?.answerDetails.slice(0).map((answer, index) => {
              const averageVote =
                (answer?.pVHD?.length * 100) / poll?.pollHistoryDetails?.length;
              const num = roundOfNumbers(averageVote);
              return (
                <Box key={index} px={2} py={"12px"}>
                  <Stack
                    direction={"row"}
                    justifyContent={"space-between"}
                    alignItems={"flex-end"}
                    mb={2}
                  >
                    <Stack>
                      <Typography variant="bodyLarge">
                        {answer.answer}
                      </Typography>
                      <Typography variant="bodySmall">
                        {answer?.pVHD?.length} votes
                      </Typography>
                    </Stack>
                    <Typography variant="labelLarge">{`${num}%`}</Typography>
                  </Stack>

                  <LinearProgressbar variant="determinate" value={num} />
                </Box>
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
      </Box>

      <Typography
        color={"neutral.50"}
        onClick={(e) =>
          postUserId === userData.id ? handlePollViewVoteResult(e, poll) : null
        }
        variant="labelSmall"
      >
        Total votes: {`${poll?.pollHistoryDetails?.length || 0} `}
        {isPollClosed
          ? `- ${lang("DASHBOARD.POSTS.POST_BODY.POST_POLL.POLL_CLOSED")}`
          : null}
        {!isPollClosed && pollUndoResult(poll)} -{" "}
        {convertToTargetTimezone(poll?.pollExpiryDate, userData?.timezone)}
      </Typography>
    </Box>
  );
};

export default PostPoll;
