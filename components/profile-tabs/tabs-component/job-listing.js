import React, { useEffect } from "react";
import { Link } from "@routes";
import { onImageError, removeCookie, setCookie } from "utils";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

const Joblisting = ({
  index,
  singleJob,
  setRenderType,
  setJobDetailId,
  activeTab,
  setActiveTab,
}) => {
  const [lang] = useTranslation("language");
  const { learningData } = useSelector((state) => state.learningInstitute);
  const { companyData } = useSelector((state) => state.company);
  useEffect(() => {
    removeCookie("jobId");
  }, []);

  /*******************
@purpose : Rander HTML/ React Components
@Author : INIC
******************/

  return (
    <>
      <div className="d-flex flex-row" key={index}>
        <div className="overflow-hidden rounded-pill flex-shrink-0 mr-sm-2">
          <picture>
            <source
              srcset={learningData?.logo || companyData?.logo}
              type="image/png"
            />
            <img
              src={learningData?.logo || companyData?.logo}
              alt="expirince"
              width="54"
              height="54"
              onError={onImageError}
            />
          </picture>
        </div>
        <div className="exp-desc ml-2 w-100">
          <div className="d-flex flex-md-row flex-column justify-content-between">
            <div>
              <h6 className="mb-2 text-body-16">{singleJob?.profession}</h6>
              {singleJob?.address && (
                <span className="text-gray text-body-14 font-weight-normal d-block mb-2">
                  {singleJob?.address}
                </span>
              )}
            </div>
            {/* <div className="ml-md-auto d-flex h-75">
              <div className="border-r pr-3 mr-3 ">
                <span className="d-block text-body-12 mb-1 text-black">
                  100%
                </span>
                <span className="d-block text-body-12 font-weight-normal mb-1 text-gray ">
                  {lang("JOBS.JOB_OFFERS.HARD_SKILLS")}
                </span>
              </div>
              <div className="border-r pr-3 mr-3 ">
                <span className="d-block text-body-12 mb-1 text-black">
                  100%
                </span>
                <span className="d-block text-body-12 font-weight-normal mb-1 text-gray ">
                  {lang("JOBS.JOB_OFFERS.SOFT_SKILLS")}
                </span>
              </div>
              <div className="border-r pr-3 mr-3 ">
                <span className="d-block text-body-12 mb-1 text-black">
                  100%
                </span>
                <span className="d-block text-body-12 font-weight-normal mb-1 text-gray ">
                  {lang("JOBS.JOB_OFFERS.MINDSET")}
                </span>
              </div>
             
            </div> */}
          </div>
          <p className="text-body-14 font-weight-normal mt-2">
            {singleJob?.jobDescription}
          </p>{" "}
          <span
            className="text-primary ml-sm-auto  ml-2 my-sm-auto flex-shrink-0 text-body-14 pointer border-r pr-3 mr-3"
            onClick={() => {
              if (activeTab !== "job") setActiveTab("job");
              setJobDetailId(singleJob?.id);
              setRenderType("jobdetail");
            }}
          >
            {lang("JOBS.JOB_OFFERS.VIEW_DETAILS")}
          </span>{" "}
        </div>
      </div>
    </>
  );
};
export default Joblisting;
