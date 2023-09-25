import React from "react";
import { jobTabRenderTypes } from "utils";
import JobDetail from "../job-detail";
import JobTabs from "../job-tabs";

export default function JobTabRender({
  renderType,
  setRenderType,
  jobDetailId,
  setJobDetailId,
  perPageSize,
  viewMoreSize,
  activeTab,
  setActiveTab,
}) {
  return (
    <>
      {renderType === jobTabRenderTypes.JOB_DETAIL && jobDetailId ? (
        <JobDetail setRenderType={setRenderType} jobDetailId={jobDetailId} />
      ) : (
        <JobTabs
          setRenderType={setRenderType}
          setJobDetailId={setJobDetailId}
          perPageSize={perPageSize}
          viewMoreSize={viewMoreSize}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      )}
    </>
  );
}
