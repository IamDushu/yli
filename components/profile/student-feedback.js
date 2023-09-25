import React, { Fragment, useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { getStudentInfo } from "store/actions";
import InfiniteScroll from "react-infinite-scroll-component";
import { useTranslation } from "react-i18next";
import { onImageError } from "utils";

const StudentFeedback = ({ sourceId, type }) => {
  const [lang] = useTranslation("language");
  const router = useRouter();
  const { feedbackData } = useSelector((state) => state.testimonial);
  const [isReadDesc, setIsReadDesc] = useState(true);
  const [body, setBody] = useState({
    sourceId: type === "course" ? sourceId : sourceId[0],
    page: 1,
    pagesize: 10,
  });
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getStudentInfo(body));
  }, []);

  const fetchMoreFeedback = () => {
    setBody({
      ...body,
      pagesize: body.pagesize + 10,
    });
  };
  /******************* 
  @purpose : Rander HTML/ React Components
  @Author : INIC
  ******************/
  return (
    feedbackData?.rows?.length > 0 && (
      <Fragment>
        <InfiniteScroll
          dataLength={
            feedbackData.rows !== "" && feedbackData.rows?.length > 0
              ? feedbackData.rows?.length
              : ""
          }
          next={fetchMoreFeedback}
          hasMore={feedbackData.total}
        >
          <Card className="my-4">
            <Card.Header className="px-4 pt-4 pb-0">
              <h4 className="h6 mb-0">{lang("COMMON.STUDENT_FEEDBACK")}</h4>
            </Card.Header>
            <Card.Body className="p-4">
              {feedbackData.rows && feedbackData.rows.length > 0 ? (
                feedbackData.rows.map((feedback, i) => (
                  <div
                    className="border rounded-8 border-geyser p-4 mb-3"
                    key={i}
                  >
                    <i className="bx bxs-quote-alt-left text-primary font-24 mb-2"></i>

                    <p className="font-body-16 font-weight-normal">
                      <span
                        dangerouslySetInnerHTML={{
                          __html: isReadDesc
                            ? feedback.review?.slice(0, 150)
                            : feedback.review,
                        }}
                      />
                      {feedback?.review?.length > 150 && (
                        <span
                          className="text-primary font-weight-semibold"
                          onClick={() => setIsReadDesc(!isReadDesc)}
                        >
                          {isReadDesc
                            ? lang("COMMON.READ_MORE")
                            : lang("COMMON.READ_LESS")}
                        </span>
                      )}
                    </p>
                    <div className="d-flex">
                      <div className="mr-2 rounded-pill overflow-hidden flex-shrink-0 border border-geyser w-h-40">
                        <a>
                          <picture onContextMenu={(e) => e.preventDefault()}>
                            <source
                              srcSet={feedback?.User?.profilePicURL}
                              type="image/png"
                            />
                            <img
                              src={feedback?.User?.profilePicURL}
                              alt="User"
                              width="40"
                              height="40"
                              onError={(e) =>
                                onImageError(
                                  e,
                                  "profile",
                                  `${feedback?.User?.firstName} ${feedback?.User?.lastName}`
                                )
                              }
                            />
                          </picture>
                        </a>
                      </div>
                      <div className="w-100 mr-2">
                        <a>
                          <Card.Title className="mb-1">
                            <h5 className="text-body-14 mb-0">
                              {`${feedback?.User?.firstName} ${feedback?.User?.lastName}`}
                            </h5>
                          </Card.Title>
                        </a>

                        <div className="d-flex align-items-center">
                          <div>
                            <i className="bx bxs-star text-warning font-20 mr-1"></i>
                          </div>
                          <span className="text-body-12 text-secondary">
                            {feedback.rating}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <i className="text-dark">
                  {lang("COMMON.NO_STUDENT_FEEDBACK")}
                </i>
              )}
            </Card.Body>
          </Card>
        </InfiniteScroll>
      </Fragment>
    )
  );
};
export default StudentFeedback;
