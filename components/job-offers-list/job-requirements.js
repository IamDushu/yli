import React, { useEffect, useRef } from "react";
import { Card, Table, Row, Col, Collapse } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
  flagJob,
  getSuggestedJobDetail,
  getSuggestedJobList,
} from "store/actions";
import { selectUserInfo } from "store/selectors/user";
import moment from "moment";

function JobRequirements({ jobData, getJobListParams, setActiveJob }) {
  const [lang] = useTranslation("language");
  const userData = useSelector(selectUserInfo);
  const dispatch = useDispatch();
  const [collapseState, setCollapseState] = React.useState({
    otherBenefits: false,
    responsibilities: false,
    jobDescription: false,
  });

  const jobDescriptionRef = useRef(null);

  useEffect(() => {
    if (jobDescriptionRef.current) {
      jobDescriptionRef.current.scrollIntoView(0, 0);
    }
  }, [jobData]);
  return (
    <>
      <Card className="mb-4" ref={jobDescriptionRef}>
        <Card.Body className="px-4 pt-4 pb-2 border-bottom-geyser">
          <div className="d-flex justify-content-between flex-wrap">
            <h6
              className="jobdata-heading-css mb-4 cursor-pointer"
              onClick={() => {
                window.open(
                  jobData?.instituteDetails
                    ? `/profile/institute-profile?instituteId=${
                        jobData?.instituteDetails?.id
                      }${
                        jobData?.instituteDetails?.name
                          ? "&name=" + jobData?.instituteDetails?.name
                          : ""
                      }`
                    : `/profile/company-profile?companyId=${
                        jobData?.companyDetails?.id
                      }${
                        jobData?.companyDetails?.companyName
                          ? "&name=" + jobData?.companyDetails?.companyName
                          : ""
                      }`
                );
              }}
            >
              {jobData?.instituteDetails
                ? jobData?.instituteDetails?.name || ""
                : jobData?.companyDetails?.companyName || ""}
            </h6>
            <div className="d-flex">
              {jobData?.flaggedUserJobsDetails?.length == 0 && (
                <div className="job-detail-icon">
                  <img
                    onClick={() => {
                      const toSend = {
                        userId: userData?.id,
                        jobId: jobData?.id,
                        isDelete: false,
                      };
                      flagJob(toSend).then((res) => {
                        dispatch(getSuggestedJobDetail(jobData?.id)).then(
                          (res) => {
                            setActiveJob(res);
                            const dataParams = getJobListParams();
                            dispatch(getSuggestedJobList(dataParams));
                          }
                        );
                      });
                    }}
                    className="icon-svg-css-job-detail"
                    src="../../assets/images/flag-icon-svg.svg"
                  />
                </div>
              )}
            </div>
          </div>
          <Row className="mb-3">
            <Col md={7}>
              <h5 className="text-body-14">
                {lang("JOBS.JOB_OFFERS.PROFESSION")}
              </h5>
              <p className="text-body-14 font-weight-normal m-0">
                {jobData?.profession}
              </p>
            </Col>
            <Col md={5} className="d-flex justify-content-between mt-2 mt-md-0">
              <div>
                <h5 className="text-body-14">
                  {lang("JOBS.JOB_OFFERS.PUBLISHED_ON")}
                </h5>
                <p className="text-body-14 font-weight-normal m-0">
                  {moment(jobData?.createdAt).format("DD/MM/YYYY")}
                </p>
              </div>
              <div
                style={{
                  width: "1px",
                  alignSelf: "stretch",
                  backgroundColor: "#D1D5DB",
                }}
              ></div>
              <div>
                <h5 className="text-body-14">
                  {lang("JOBS.JOB_OFFERS.EXPIRE_ON")}
                </h5>
                <p className="text-body-14 font-weight-normal m-0">
                  {/* TODO: add key here for expiry */}
                  {jobData?.jobExpirationTime
                    ? moment(jobData?.jobExpirationTime).format("DD/MM/YYYY")
                    : "N/A"}
                </p>
              </div>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <h5 className="text-body-14">
                {lang("JOBS.JOB_OFFERS.EDUCATION")}
              </h5>
              <p className="text-body-14 font-weight-normal">
                {jobData?.educationDetails}
              </p>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <h5 className="text-body-14">
                {lang("JOBS.JOB_OFFERS.EXPERIENCE")}
              </h5>
              <p className="text-body-14 font-weight-normal">
                {jobData?.experience}
              </p>
            </Col>
          </Row>
          <Row>
            {jobData?.salaryRange && (
              <Col md={12}>
                <h5 className="text-body-14">
                  {lang("JOBS.JOB_OFFERS.SALARY")}
                </h5>
                <p className="text-body-14 font-weight-normal">
                  {jobData?.salaryRange}
                </p>
              </Col>
            )}
          </Row>
          <Row>
            {jobData?.employmentAge && (
              <Col md={12}>
                <h5 className="text-body-14">{lang("JOBS.JOB_OFFERS.AGE")}</h5>
                <p className="text-body-14 font-weight-normal">
                  {jobData?.employmentAge}
                </p>
              </Col>
            )}
          </Row>
          <Row>
            {jobData?.employmentType && (
              <Col md={12}>
                <h5 className="text-body-14">
                  {lang("JOBS.JOB_OFFERS.EMPLOYMENT_TYPE")}
                </h5>
                <p className="text-body-14 font-weight-normal">
                  {jobData?.employmentType}
                </p>
              </Col>
            )}
          </Row>
          <Row>
            {jobData?.jobType && (
              <Col md={12}>
                <h5 className="text-body-14">
                  {lang("JOBS.JOB_OFFERS.JOB_TYPE")}
                </h5>
                <p className="text-body-14 font-weight-normal">
                  {jobData?.jobType}
                </p>
              </Col>
            )}
          </Row>
          <Row>
            {jobData?.contractType && (
              <Col md={12}>
                <h5 className="text-body-14">
                  {lang("JOBS.JOB_OFFERS.CONTRACT_TYPE")}
                </h5>
                <p className="text-body-14 font-weight-normal">
                  {jobData?.contractType}
                </p>
              </Col>
            )}
          </Row>
          <Row>
            {jobData?.jobDescription && (
              <Col md={12}>
                <div className="border-dark  mb-2">
                  <div
                    className="d-flex cursor-pointer "
                    onClick={() => {
                      setCollapseState({
                        ...collapseState,
                        jobDescription: !collapseState.jobDescription,
                      });
                    }}
                  >
                    <h5 className="text-body-14 fb-20">
                      {lang("JOBS.JOB_OFFERS.JOB_DESCRIPTION")}
                    </h5>
                    <div className="ml-auto">
                      <img
                        src={`assets/images/${
                          collapseState.jobDescription
                            ? "arrow-up-svg.svg"
                            : "arrow-down-svg.svg"
                        }`}
                      />
                    </div>
                  </div>
                  <Collapse in={collapseState.jobDescription}>
                    {/* <ul className="pl-4 text-body-14 font-weight-normal"> */}
                    <p>{jobData?.jobDescription}</p>
                    {/* </ul> */}
                  </Collapse>
                </div>
              </Col>
            )}
          </Row>
          <Row>
            {jobData?.responsibilities && (
              <Col md={12}>
                <div className="border-dark  mb-2">
                  <div
                    className="d-flex cursor-pointer"
                    onClick={() => {
                      setCollapseState({
                        ...collapseState,
                        responsibilities: !collapseState.responsibilities,
                      });
                    }}
                  >
                    <h5 className="text-body-14 fb-20">
                      {lang("JOBS.JOB_OFFERS.RESPONSIBILITIES")}
                    </h5>
                    <div className="ml-auto">
                      <img
                        src={`assets/images/${
                          collapseState.responsibilities
                            ? "arrow-up-svg.svg"
                            : "arrow-down-svg.svg"
                        }`}
                      />
                    </div>
                  </div>
                  <Collapse in={collapseState.responsibilities}>
                    {/* <ul className="pl-4 text-body-14 font-weight-normal"> */}
                    <p>{jobData?.responsibilities}</p>
                    {/* </ul> */}
                  </Collapse>
                </div>
              </Col>
            )}
          </Row>
          <Row>
            {jobData?.otherBenefits && (
              <Col md={12}>
                <div
                  className="d-flex cursor-pointer"
                  onClick={() => {
                    setCollapseState({
                      ...collapseState,
                      otherBenefits: !collapseState.otherBenefits,
                    });
                  }}
                >
                  <h5 className="text-body-14 fb-20">
                    {lang("JOBS.JOB_OFFERS.OTHER_BENEFITS")}
                  </h5>
                  <div className="ml-auto">
                    <img
                      src={`assets/images/${
                        collapseState.otherBenefits
                          ? "arrow-up-svg.svg"
                          : "arrow-down-svg.svg"
                      }`}
                    />
                  </div>
                </div>
                <Collapse in={collapseState.otherBenefits}>
                  {/* <ul className="pl-4 text-body-14 font-weight-normal"> */}
                  <p>{jobData?.otherBenefits}</p>
                  {/* </ul> */}
                </Collapse>
              </Col>
            )}
          </Row>
        </Card.Body>
      </Card>
    </>
  );
}

export default JobRequirements;
