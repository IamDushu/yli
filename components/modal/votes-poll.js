import React, { useEffect, useState } from "react";
import { Tabs, Tab, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "../../routes";
import { onImageError } from "utils";
import { toggleModals } from "store/actions";
import { useTranslation } from "react-i18next";

/*******************   
@purpose : User Set Thankyou
@Author : INIC
******************/
export const VotesPoll = () => {
  const dispatch = useDispatch();
  const [lang] = useTranslation("language");
  const { voteData } = useSelector((state) => state.post);
  const [hasResponse, setHasResponse] = useState(false) 

  /******************** 
  @purpose : To check poll has some response
  @Parameter : {body}
  @Author : INIC
  ******************/
  useEffect(() => {
    setHasResponse(voteData?.answerDetails?.some(item => item.pVHD && item.pVHD.length > 0))
  }, [voteData]);

  return (
    <>
      <Modal.Body className="text-center  votepolDataOpacity">
        <h3 className="font-24 font-md-18 font-weight-semibold text-secondary mb-30">
          Votes
        </h3>
        <div className="">
          {
          hasResponse ? 
          <Tabs
            defaultActiveKey={voteData.answerDetails[0].answer}
            id="groups-tabs-section"
            className="custom-tabs-unfiled mb-30 border-0"
          >
            {Array.isArray(voteData.answerDetails) &&
              voteData.answerDetails.length > 0 &&
              voteData.answerDetails.map((answer, i) => {
                return (
                  <Tab
                    eventKey={answer.answer}
                    title={
                      <div className="d-flex">
                        <div>{answer.answer}</div>
                        <div className="vote-count-css">
                          {answer.totalVotes}
                        </div>
                      </div>
                    }
                    key={i}
                  >
                    {Array.isArray(answer.pVHD) &&
                      answer.pVHD.length > 0 &&
                      answer.pVHD.map((item, index) => {
                        return (
                          <div
                            className="d-flex align-items-center mb-3"
                            key={index}
                          >
                            <Link
                              route={`/profile/${item.pollUserD.profileId}`}
                            >
                              <a
                                title={`${
                                  item.pollUserD.firstName !== null
                                    ? item.pollUserD.firstName
                                    : ""
                                } ${
                                  item.pollUserD.lastName !== null
                                    ? item.pollUserD.lastName
                                    : ""
                                }`}
                                onClick={() =>
                                  dispatch(toggleModals({ votespoll: false }))
                                }
                              >
                                <div class=" rounded-pill overflow-hidden flex-shrink-0 border border-geyser w-h-40">
                                  <picture class="user-profile-pic flex-shrink-0 w-100 h-100">
                                    <source
                                      src={item.pollUserD.profilePicURL}
                                      width="40"
                                      height="40"
                                      class="img-fluid w-100 h-100"
                                    />
                                    <img
                                      src={item.pollUserD.profilePicURL}
                                      alt={item.pollUserD.firstName}
                                      width="40"
                                      height="40"
                                      onError={(e) => {
                                        onImageError(
                                          e,
                                          "profile",
                                          `${item.pollUserD.firstName} ${item.pollUserD.lastName}`
                                        );
                                      }}
                                    />
                                  </picture>
                                </div>
                              </a>
                            </Link>

                            <div className="ml-2 text-left">
                              <Link
                                route={`/profile/${item.pollUserD.profileId}`}
                              >
                                <a
                                  title={`${
                                    item.pollUserD.firstName !== null
                                      ? item.pollUserD.firstName
                                      : ""
                                  } ${
                                    item.pollUserD.lastName !== null
                                      ? item.pollUserD.lastName
                                      : ""
                                  }`}
                                  onClick={() =>
                                    dispatch(toggleModals({ votespoll: false }))
                                  }
                                >
                                  <h5 className="card-title font-16 text-secondary font-medium mb-10">
                                    {item.pollUserD.firstName}{" "}
                                    {item.pollUserD.lastName}
                                  </h5>
                                </a>
                              </Link>
                            </div>
                          </div>
                        );
                      })}
                  </Tab>
                );
              })}
          </Tabs> :  
          <div className="mx-auto">
            {lang("DASHBOARD.POSTS.POST_BODY.POST_POLL.NO_VOTES")}
          </div>
          }
        </div>
      </Modal.Body>
    </>
  );
};
