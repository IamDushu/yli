import React, { useEffect, useState } from "react";
import _ from "lodash/isEmpty";
import { Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  getFollowerListing,
  getInstituteHomeInfo,
  getJobList,
  getPeopleListing,
} from "store/actions/learningInstitute";
import EventSliderCard from "components/profile/upcoming-events";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import JobTabRender from "./tabs-component/job-tab-render";
import PeopleTabs from "./people-tab";
import { getCompanyHomeInfo } from "store/actions";

export const HomeTabs = ({
  handleActiveTab,
  activeTab,
  setRenderType,
  jobDetailId,
  setJobDetailId,
  setActiveTab,
}) => {
  const [lang] = useTranslation("language");
  const dispatch = useDispatch();
  const [isReadOverview, setIsReadOverview] = useState(true);
  const [isReadDesc, setIsReadDesc] = useState(true);
  const [followerPage, setFollowerPage] = useState(1);
  const [followerPagesize, setFollowerPagesize] = useState(4);
  const [peoplePage, setPeoplePage] = useState(1);
  const [peoplePagesize, setPeoplePagesize] = useState(4);
  const router = useRouter();
  const { instituteId, companyId } = router.query;
  const homeDetailLi = useSelector(
    (state) => state?.learningInstitute?.instituteHomeDetails
  );
  const homeDetailCo = useSelector(
    (state) => state?.company?.companyHomeDetails
  );

  const homeDetail =
    instituteId !== undefined
      ? homeDetailLi
      : companyId !== undefined
      ? homeDetailCo
      : [];

  const followerList = useSelector(
    (state) => state?.learningInstitute?.followerList
  );
  const peopleList = useSelector(
    (state) => state?.learningInstitute?.peopleList
  );
  const jobList = useSelector(
    (state) => state?.learningInstitute?.instituteJobList
  );

  /******************* 
  @Purpose : Used for institute detail
  @Parameter : {instituteDetails}
  @Author : INIC
  ******************/
  useEffect(() => {
    if (!_(instituteId) && activeTab === "home") {
      dispatch(getInstituteHomeInfo(instituteId));
      dispatch(
        getJobList({
          page: 1,
          pagesize: 2,
          searchText: "",
          instituteId: instituteId,
        })
      );
      dispatch(
        getFollowerListing({
          page: followerPage,
          pagesize: followerPagesize,
          searchText: "",
          order: [],
          learningInstituteId: instituteId,
        })
      );
      dispatch(
        getPeopleListing({
          page: peoplePage,
          pagesize: peoplePagesize,
          searchText: "",
          order: [],
          learningInstituteId: instituteId,
        })
      );
    }

    if (!_(companyId) && activeTab === "home") {
      dispatch(getCompanyHomeInfo(companyId));
    }
  }, [instituteId, companyId, activeTab]);

  return (
    <>
      {homeDetail?.overview && (
        <Card className="mt-4 mb-3">
          <Card.Body className="">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h3 className="h6 mb-0">{lang("PROFILE_TABS.OVERVIEW")}</h3>
            </div>
            <div className="desc pr-xl-5 mr-xl-2">
              <p className="text-body-14 font-weight-normal mb-0">
                <p
                  className="mb-0"
                  dangerouslySetInnerHTML={{
                    __html: isReadOverview
                      ? homeDetail?.overview?.slice(0, 300)
                      : homeDetail?.overview,
                  }}
                />
              </p>
              {homeDetail?.overview?.length > 300 && (
                <div
                  className="text-primary text-body-14 font-weight-semibold mt-2 pointer"
                  onClick={() => setIsReadOverview(!isReadOverview)}
                >
                  {isReadOverview
                    ? lang("COMMON.READ_MORE")
                    : lang("COMMON.READ_LESS")}
                </div>
              )}
            </div>
          </Card.Body>
        </Card>
      )}
      {homeDetail?.description && (
        <Card className="my-4">
          <Card.Body className="py-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h3 className="h6 mb-0">{lang("ROOMS.FULL_DESCRIPTION")}</h3>
            </div>
            <div className="desc pr-xl-5 mr-xl-2">
              <p className="text-body-14 font-weight-normal">
                <p
                  dangerouslySetInnerHTML={{
                    __html: isReadDesc
                      ? homeDetail?.description?.slice(0, 300)
                      : homeDetail?.description,
                  }}
                />
              </p>
              {homeDetail?.description?.length > 300 && (
                <div
                  className="text-primary text-body-14 font-weight-semibold mt-2 pointer"
                  onClick={() => setIsReadDesc(!isReadDesc)}
                >
                  {isReadDesc ? "Read More" : "Read Less"}
                </div>
              )}
            </div>
          </Card.Body>
        </Card>
      )}

      {homeDetail?.upcomingEvents?.rows?.length > 0 && (
        <EventSliderCard showEdit={false} />
      )}

      {/* Resent job opening*/}
      <JobTabRender
        perPageSize={2}
        viewMoreSize={2}
        setRenderType={setRenderType}
        jobDetailId={jobDetailId}
        setJobDetailId={setJobDetailId}
        setActiveTab={setActiveTab}
      />

      {/* People */}
      <PeopleTabs isFilter={false} />
    </>
  );
};
