// EXTERNAL
import React from "react";
// INTERNAL
import RequiredSkills from "./required-skills";
import JobDescription from "./job-description";
import { ApplyJob } from "components/modal/apply-for-job";
import JobRequirements from "./job-requirements";
import { useTranslation } from "react-i18next";
import { Card } from "react-bootstrap";
import { useSelector } from "react-redux";
import { selectUserInfo } from "store/selectors/user";
import noresultimg from 'public/assets/images/no-result.svg';

const JobDetail = ({ activeJob, setActiveJob, getJobListParams }) => {
  const [lang] = useTranslation("language");
  const userData = useSelector(selectUserInfo);
  /*******************
  @purpose : Rander HTML/ React Components
  @Author : INIC
  ******************/
  return activeJob?.id ? (
    <div className="job-detail-column" id="job-detail-scroll-css">
      {/* Job requirements Starts */}
      <JobRequirements
        jobData={activeJob}
        setActiveJob={setActiveJob}
        getJobListParams={getJobListParams}
      />
      {/* Job requirements Ends */}
      {/* Job description Starts */}
      {/* <JobDescription jobDescription={activeJob?.jobDescription} /> */}
      {/* Job description Ends */}
      {/* Required Skills Starts */}
      <RequiredSkills
        hardSkills={activeJob?.hardSkillsAlignment}
        softSkills={activeJob?.softSkillsAlignment}
        mindsets={activeJob?.mindsetSkillsAlignment}
        jobId={activeJob?.id}
      />
      {/* Required Skills Ends */}
      <ApplyJob
        jobId={activeJob?.id}
        instituteId={activeJob?.instituteDetails?.id}
        companyId={activeJob?.companyDetails?.id}
        candidateId={userData?.id}
        getJobListParams={getJobListParams}
        jobData={activeJob}
      />
    </div>
  ) : (
    <Card>
      <Card.Body className="p-5 text-center">
        <img src={noresultimg} alt="noresultimg"/>
        <h5 className="text-secondary mt-5 text-center">
          {lang("JOBS.JOB_OFFERS.NO_SUGGESTED_JOBS")}
        </h5>
      </Card.Body>
    </Card>
  );
};
export default JobDetail;
