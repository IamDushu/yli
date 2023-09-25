import React, { useEffect, useState } from "react";
import { post } from "api";
import { Card } from "react-bootstrap";
import { USER_API_URL } from "config";
import { JOB_LIST } from "api/routes";
import Joblisting from "./tabs-component/job-listing";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
const JobTabs = ({
  setRenderType,
  setJobDetailId,
  perPageSize = 10,
  viewMoreSize = 5,
  activeTab,
  setActiveTab,
}) => {
  /*******************
@purpose : Rander HTML/ React Components
@Author : INIC
******************/
  const [lang] = useTranslation("language");
  const [jobList, setJoblist] = useState([]);
  const [jobTotal, setJobTotal] = useState([]);
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [pagesize, setPagesize] = useState(perPageSize);
  const [loadMoreSize, setLoadMoreSize] = useState(viewMoreSize);
  const { instituteId, companyId, userId } = router.query;
  useEffect(async () => {
    const payload = {
      page,
      pagesize,
      searchText: "",
      instituteId: instituteId,
      ...(companyId !== undefined &&
        companyId !== null &&
        companyId !== "" && { companyId }),
      candidateId: userId,
    };

    const res = await post(
      { serviceURL: USER_API_URL },
      JOB_LIST,
      false,
      payload,
      true
    );
    if (res?.data) {
      setJoblist(res?.data?.rows);
      setJobTotal(res?.data?.total);
    }
  }, [pagesize]);

  const handleViewMore = () => {
    setPagesize((pagesize) => pagesize + loadMoreSize);
  };
  return (
    <>
      {/* Recent job opening */}
      <Card className="my-4">
        <Card.Body>
          <div className="d-flex justify-content-between  align-items-center mb-4  ">
            <h3 className="h6 mb-0">
              {lang("PROFILE_TABS.RECENT_JOB_OPENING")}
            </h3>
          </div>
          {jobList.length > 0 ? (
            jobList?.map((s, index) => {
              return (
                <>
                  {index !== 0 && <hr />}
                  <Joblisting
                    key={`job-${index}`}
                    index={index}
                    singleJob={s}
                    setRenderType={setRenderType}
                    setJobDetailId={setJobDetailId}
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                  />
                </>
              );
            })
          ) : (
            <div>{lang("PROFILE_TABS.NO_JOB_FOUND")}</div>
          )}
        </Card.Body>
        {jobTotal > pagesize && (
          <span
            // className=" view-all text-secondary font-weight-semibold rounded-b-8 bg-blueberry-whip py-12  text-body-14 text-center pointer"
            className="text-primary view-all font-weight-semibold  py-12  text-body-14 text-center cursor-pointer load-more-color border-top-gray"
            onClick={handleViewMore}
          >
            {lang("COMMON.LOAD_MORE")}
          </span>
        )}
      </Card>
      {/* Recent job opening */}
    </>
  );
};
export default JobTabs;
