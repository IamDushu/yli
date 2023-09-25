// EEXTERNAL
import React from "react";
import { Card } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
  getSuggestedJobDetail,
  viewJob,
  getSuggestedJobList,
  setOldSelectedJobId,
} from "store/actions";
import { onImageError } from "utils";
import { flagJob } from "store/actions";
import InfiniteScroll from "react-infinite-scroll-component";
import { selectUserInfo } from "store/selectors/user";
import SkeletonLoader from "components/ui/skeleton";
import { over } from "lodash";
function JobList({
  activeJob,
  setActiveJob,
  fetchMoreSuggestion,
  getJobListParams,
}) {
  const userData = useSelector(selectUserInfo);
  const [lang] = useTranslation("language");
  const dispatch = useDispatch();
  const jobData = useSelector(
    (state) => state?.learningInstitute?.suggestedJobList
  );
  const { oldSelectedJobId } = useSelector((state) => state?.learningInstitute);

  /*******************
  @purpose : For job details
  @param : {}
  @Author : INIC
  ******************/
  const handleActiveJob = (id) => {
    dispatch(getSuggestedJobDetail(id)).then((res) => {
      setActiveJob(res);
    });
  };

  return (
    <Card className="mb-4">
      <Card.Header className="border-bottom border-geyser pb-0 pt-2">
        <h6 className="jobs-found-text-css  text-center">
          {jobData?.total
            ? jobData?.total > 1
              ? jobData?.total + " " + lang("JOBS.JOB_OFFERS.VACANCIES")
              : jobData?.total + " " + lang("JOBS.JOB_OFFERS.VACANCY")
            : "0 " + lang("JOBS.JOB_OFFERS.VACANCY")}
        </h6>
      </Card.Header>

      <Card.Body className="p-0 job-list-card" id="job-scroll-div">
        <InfiniteScroll
          dataLength={jobData?.rows?.length || 0}
          next={fetchMoreSuggestion}
          hasMore={jobData?.rows?.length !== jobData?.total}
          loader={<SkeletonLoader />}
          scrollableTarget="job-scroll-div"
        >
          <div
            className="chatters-list w-100"
            style={{
              maxHeight: "inherit",
            }}
          >
            <ul
              className="listing-section border-first-0"
              style={{
                maxHeight: "inherit",
              }}
            >
              {jobData?.rows?.map((data, index) => (
                <li
                  className={`listing-box w-100 flex-wrap px-2 ${
                    activeJob?.id === data?.id && "active"
                  } ${
                    data?.viewedUserJobsDetails?.length == 0
                      ? "bg-water-blue"
                      : ""
                  } `}
                  key={`job-${index}`}
                  onClick={() => {
                    if (
                      data?.id !== oldSelectedJobId &&
                      oldSelectedJobId !== -1
                    ) {
                      const toSend = {
                        jobId: oldSelectedJobId,
                        userId: userData?.id,
                      };

                      viewJob(toSend).then(() => {
                        const dataParams = getJobListParams();
                        dispatch(getSuggestedJobList(dataParams)).then(() => {
                          dispatch(setOldSelectedJobId(data?.id));
                        });
                      });
                    }
                    handleActiveJob(data?.id);
                  }}
                >
                  <div className="d-flex">
                    <div className="flex-shrink-0 w-h-54 rounded-pill overflow-hidden">
                      <picture>
                        <source
                          srcSet={
                            data?.instituteDetails?.logo
                              ? data?.instituteDetails?.logo
                              : ""
                          }
                          type="image/png"
                        />
                        <img
                          src={
                            data?.instituteDetails
                              ? data?.instituteDetails?.logo || ""
                              : data?.companyDetails?.logo || ""
                          }
                          alt="experience"
                          width="54"
                          height="54"
                          onError={(e) => {
                            onImageError(e, "profile", data?.profession);
                          }}
                        />
                      </picture>
                    </div>
                    <div className="ml-2">
                      <div className="d-flex">
                        <h6 className="text-body-16 w-100">{data?.profession}</h6>
                        <div className="d-flex">
                          {data?.jobCandidateDetails?.length == 0 &&
                            data?.flaggedUserJobsDetails?.length > 0 && (
                              <div
                                onClick={() => {
                                  const toSend = {
                                    userId: userData?.id,
                                    jobId: data?.id,
                                    isDelete: true,
                                  };
                                  flagJob(toSend).then(() => {
                                    const dataParams = getJobListParams();
                                    dispatch(
                                      getSuggestedJobList(dataParams)
                                    ).then(() => {
                                      handleActiveJob(data?.id);
                                    });
                                  });
                                }}
                              >
                                <img
                                  className="icon-svg-css-job-list"
                                  src="../../assets/images/flag-icon-svg.svg"
                                />
                              </div>
                            )}
                          {data?.jobCandidateDetails?.length > 0 && (
                            <div>
                              <img
                                className="icon-svg-css-job-list"
                                src="../../assets/images/select-icon-svg.svg"
                              />
                            </div>
                          )}
                        </div>
                      </div>
                      <p className="text-body-14 text-gray mb-2 font-weight-normal">
                        {data?.city ? data.city : ""}
                        {data?.country && data?.city ? ", " : ""}
                        {data?.country ? data.country : ""}
                      </p>
                      <div className="d-flex align-items-center p-2">
                        <div className="mr-1 border-right-divider">
                          <h6 className="text-body-14 mb-0 text-center">
                            {data?.hardSkillAlignment
                              ? Math.round(data?.hardSkillAlignment * 100) / 100
                              : 0}{" "}
                            %
                          </h6>
                          <p className="text-body-12 font-weight-semibold mb-0">
                            {lang("JOBS.JOB_OFFERS.HARD_SKILLS")}
                          </p>
                        </div>
                        {/* <div className="mr-1 ">
                          <div className="active-dot w-h-4 mr-2 bg-gray flex-shrink-0"></div>
                        </div> */}
                        <div className=" mr-1  border-right-divider">
                          <h6 className="text-body-14 mb-0 text-center">
                            {" "}
                            {data?.softSkillAlignment
                              ? Math.round(data?.softSkillAlignment * 100) / 100
                              : 0}
                            %
                          </h6>
                          <p className="text-body-12 font-weight-semibold mb-0">
                            {lang("JOBS.JOB_OFFERS.SOFT_SKILLS")}
                          </p>
                        </div>
                        {/* <div className="mr-1 ">
                          <div className="active-dot w-h-4 mr-2 bg-gray flex-shrink-0"></div>
                        </div> */}
                        <div>
                          <h6 className="text-body-14 mb-0 text-center">
                            {data?.mindsetAlignment
                              ? Math.round(data?.mindsetAlignment * 100) / 100
                              : 0}
                            %
                          </h6>
                          <p className="text-body-12 font-weight-semibold mb-0">
                            {lang("JOBS.JOB_OFFERS.MINDSET")}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          {/* <div className="d-flex justify-content-center p-2 border-top-gray">
          <div
            className="text-center load-more-job-list"
            onClick={
              jobData?.rows?.length >= jobData?.total
                ? null
                : fetchMoreSuggestion
            }
          >
            {jobData?.rows?.length >= jobData?.total
              ? jobData?.total
                ? jobData?.total > 1
                  ? jobData?.total + " " + lang("JOBS.JOB_OFFERS.VACANCIES")
                  : jobData?.total + " " + lang("JOBS.JOB_OFFERS.VACANCY")
                : "0 " + lang("JOBS.JOB_OFFERS.VACANCY")
              : lang("JOBS.JOB_OFFERS.LOAD_MORE")}
          </div>
        </div> */}
        </InfiniteScroll>
      </Card.Body>
    </Card>
  );
}

export default JobList;
