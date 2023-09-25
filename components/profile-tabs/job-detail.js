import React, { useEffect, useState, Fragment, useRef } from "react";
import { useTranslation } from "react-i18next";
import {
  Container,
  ProgressBar,
  Tabs,
  Tab,
  Table,
  Card,
  Row,
  Col,
  Button,
} from "react-bootstrap";
import WithAuth from "components/with-auth/with-auth";

import { shallowEqual, useDispatch, useSelector } from "react-redux";
import JobDetailSkillListing from "./tabs-component/job-detail-skill-listing";
import JobDetailSkillHeadingListing from "./tabs-component/job-detail-skill-heading-listing";
import { getJobDetail, toggleModals } from "store/actions";
import { JOB_LIST, onImageError } from "utils";
import dynamic from "next/dynamic";
const MainModal = dynamic(() =>
  import("components/modal").then((mod) => mod.MainModal)
);
const ApplyJob = dynamic(() =>
  import("components/modal/apply-for-job").then((mod) => mod.ApplyJob)
);
const JobDetail = ({ setRenderType, jobDetailId }) => {
  const { applyforjob } = useSelector(({ ui }) => ui.modals, shallowEqual);
  const user = useSelector(({ user }) => user);
  const [lang] = useTranslation("language");
  const dispatch = useDispatch();
  // const [jobDetailData, setJobDetailData] = useState({});
  const jobDetailData = useSelector(
    (state) => state?.learningInstitute?.jobDetail
  );

  useEffect(async () => {
    // if (jobDetailId) {
    //   const jobDetailUrl = `${JOB_DETAIL_LIST}${jobDetailId}`;
    //   const res = await get(
    //     { serviceURL: USER_API_URL },
    //     jobDetailUrl,
    //     false,
    //     {},
    //     true
    //   );
    //   if (res?.data) {
    //     setJobDetailData(res?.data);
    //   }
    // }

    dispatch(getJobDetail(jobDetailId));
  }, [jobDetailId]);

  /*******************
@purpose : Rander HTML/ antd
@Author : INIC
******************/

  return (
    <>
      {/* Back to jobs */}
      <div className="d-flex pointer my-2 my-sm-3" onClick={() => setRenderType(JOB_LIST)}>
        <i className="bx bx-arrow-back mr-3"></i>
        <p className="text-body-14 text-uppercase text-underline mb-0">
          {lang("PROFILE_TABS.BACK_TO_JOBS")}
        </p>
      </div>
      {/* Apply for job */}
      <Card className="mt-3  mb-0">
        <Card.Body>
          <div className="d-sm-flex  align-items-center">
            <div className="overflow-hidden rounded-pill flex-shrink-0 mr-2 flex-wrap ">
              <picture onContextMenu={(e) => e.preventDefault()}>
                <source
                  srcSet={
                    jobDetailData?.instituteDetails?.logo ||
                    jobDetailData?.companyDetails?.logo
                  }
                  type="image/png"
                />
                <img
                  src={
                    jobDetailData?.instituteDetails?.logo ||
                    jobDetailData?.companyDetails?.logo
                  }
                  alt="expirince"
                  width="120"
                  height="120"
                  onError={(e) =>
                    onImageError(e, "profile", jobDetailData?.profession)
                  }
                />
              </picture>
            </div>
            <div className="ml-1 mw-70 d-flex flex-md-row flex-column w-100">
              <div>
                <h6 className="mb-0">{jobDetailData?.profession}</h6>
                <p className="text-gray font-weight-semibold mb-2">
                  {jobDetailData?.address}
                </p>
              </div>

              {jobDetailData?.userId !== user?.userInfo?.id && (
                <Button
                  variant="btn btn-info btn-sm  w-fit-content ml-md-auto h-100 "
                  onClick={() => {
                    if (!jobDetailData?.applied)
                      dispatch(toggleModals({ applyforjob: true }));
                  }}
                >
                  <span>
                    {!jobDetailData?.applied
                      ? lang("JOBS.JOB_OFFERS.APPLY_NOW")
                      : lang("JOBS.JOB_OFFERS.APPLIED")}
                  </span>
                </Button>
              )}
            </div>
          </div>
        </Card.Body>
      </Card>

      {/* basic requirment */}
      <Card className="my-30 mb-0">
        <Card.Body>
          <Row>
            <Col md={12}>
              <div className="d-flex justify-content-between mb-3 align-items-md-center flex-sm-row flex-column">
                <h3 className="h6 mb-2 mb-sm-0">
                  {lang("PROFILE_TABS.BASIC_REQUIRMENTS")}
                </h3>
              </div>
            </Col>
            <Col md={6} lg={3}>
              <h6 className="text-body-14 mb-1">
                {lang("PROFILE_TABS.EDUCATION_PT")}:
              </h6>
              <p>{jobDetailData?.educationDetails}</p>
            </Col>
            <Col md={6} lg={3}>
              <h6 className="text-body-14 mb-1">
                {lang("PROFILE_TABS.EXPERIENCE_PT")}:
              </h6>
              <p>{jobDetailData?.experience}</p>
            </Col>
            {jobDetailData?.salaryRange && (
              <Col md={6} lg={3}>
                <h6 className="text-body-14 mb-1">
                  {lang("PROFILE_TABS.SALARY_PT")}:
                </h6>
                <p>{jobDetailData?.salaryRange}</p>
              </Col>
            )}
            {jobDetailData?.employmentAge && (
              <Col md={6} lg={3}>
                <h6 className="text-body-14 mb-1">
                  {lang("PROFILE_TABS.AGE_PT")}:
                </h6>
                <p>{jobDetailData?.employmentAge}</p>
              </Col>
            )}
            {jobDetailData?.otherBenefits && (
              <Col md={12} lg={12}>
                <h6 className="text-body-14 mb-1">
                  {lang("PROFILE_TABS.OTHER_BENEFITS_PT")}:
                </h6>
                <ul className="pl-4 benifit-list">
                  <li className="text-body-14 font-weight-normal my-1">
                    {jobDetailData?.otherBenefits}
                  </li>
                </ul>
              </Col>
            )}
            {jobDetailData?.responsibilities && (
              <Col md={12} lg={12}>
                <h6 className="text-body-14 mb-1">
                  {lang("PROFILE_TABS.RESPONSIBLITITES_PT")}:
                </h6>
                <ul className="pl-4 mb-0 reasponsibility-list">
                  <li className="text-body-14 font-weight-normal my-1">
                    {jobDetailData?.responsibilities}
                  </li>
                </ul>
              </Col>
            )}
          </Row>
        </Card.Body>
      </Card>
      <Card className="my-3">
        <Card.Body className="p-4">
          <div className="d-flex justify-content-between pb-2">
            <h6>Job Description</h6>
          </div>
          <div className="desc pr-xl-5 mr-xl-2">
            <p className="text-body-14 font-weight-normal m-0">
              {jobDetailData?.jobDescription}
            </p>
          </div>
        </Card.Body>
      </Card>
      {/*  */}
      <Card className="my-3 mb-0">
        <Card.Body className="p-0">
          <div className="custom-tab">
            <Tabs
              defaultActiveKey="hardskill"
              id="uncontrolled-tab-example"
              className="pl-3 w-100"
            >
              <Tab
                eventKey="hardskill"
                title={lang("JOBS.JOB_OFFERS.HARD_SKILLS")}
              >
                <div className="px-3 my-4">
                  <h6 className="mb-3">{lang("PROFILE_TABS.REQ_SKILLS_PT")}</h6>
                  <Table className="custom-table font-14 mt-2 text-nowrap" responsive="lg">
                    <thead>
                      <JobDetailSkillHeadingListing />
                    </thead>
                    <tbody>
                      <JobDetailSkillListing
                        mapData={jobDetailData?.hardSkills}
                      />
                    </tbody>
                  </Table>
                </div>
                {/* <hr className="mt-4 mb-1" /> */}
              </Tab>
              <Tab
                eventKey="softskill"
                title={lang("JOBS.JOB_OFFERS.SOFT_SKILLS")}
              >
                <div className="px-3 my-4">
                  <h6 className="mb-3">{lang("PROFILE_TABS.REQ_SKILLS_PT")}</h6>
                  <Table className="custom-table font-14 mt-2 text-nowrap" responsive="lg">
                    <thead>
                      <JobDetailSkillHeadingListing />
                    </thead>
                    <tbody>
                      <JobDetailSkillListing
                        mapData={jobDetailData?.softSkills}
                      />
                    </tbody>
                  </Table>
                </div>
                {/* <hr className="mt-4 mb-1" /> */}
              </Tab>
              <Tab eventKey="mindsets" title={lang("JOBS.JOB_OFFERS.MINDSET")}>
                <div className="px-3 my-4">
                  <h6 className="mb-3">{lang("PROFILE_TABS.REQ_SKILLS_PT")}</h6>
                  <Table className="custom-table font-14 mt-2 text-nowrap" responsive="lg">
                    <thead>
                      <JobDetailSkillHeadingListing />
                    </thead>
                    <tbody>
                      <JobDetailSkillListing
                        mapData={jobDetailData?.mindsets}
                      />
                    </tbody>
                  </Table>
                </div>
                {/* <hr className="mt-4 mb-1" /> */}
                {/* <CourseList
                  className="mt-0"
                  viewall="true"
                  edit="no"
                  border="false"
                  title="Suggest content by YLIWAY"
                /> */}
              </Tab>
            </Tabs>
          </div>
        </Card.Body>
      </Card>

      {/* <Card className="my-30 mb-0">
        <Card.Body className="p-0">
          <div className="custom-tab px-">
            <CourseList
              className="mt-0"
              viewall="true"
              edit="no"
              border="false"
              title="Suggest content by YLIWAY"
            />
          </div>
        </Card.Body>
      </Card> */}
      <MainModal
        show={applyforjob}
        keyModal="applyforjob"
        body={
          <ApplyJob
            jobId={jobDetailData?.id}
            instituteId={jobDetailData?.instituteId}
            companyId={jobDetailData?.companyId}
            candidateId={user?.userInfo?.id}
          />
        }
        headerClassName="mb-50 block md-mb-30"
      />
    </>
  );
};
export default WithAuth(JobDetail);
