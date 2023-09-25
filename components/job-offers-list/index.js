// EXTERNAL
import React, { useEffect, useState } from "react";
import { Layout } from "@components/layout";
import { Container, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
// INTERNAL
import WithAuth from "components/with-auth/with-auth";
import JobDetail from "./job-detail";
import {
  setOldSelectedJobId,
  getSuggestedJobDetail,
  getSuggestedJobList,
} from "store/actions";
import JobList from "./job-list";
import JobFilters from "./job-filters";

const JobOffers = () => {
  const dispatch = useDispatch();
  const jobData = useSelector(
    (state) => state?.learningInstitute?.suggestedJobList
  );
  const [activeJob, setActiveJob] = useState("");
  const [pagination, setPagination] = useState({ page: 1, pagesize: 10 });
  const [filters, setFilters] = useState({
    searchText: "",
    employmentType: "",
    address: "",
    jobType: "",
    contractType: "",
  });
  const [filterCount, setFilterCount] = useState(0);
  /*******************
  @purpose : For initial suggested job fetching
  @param : {}
  @Author : INIC
  ******************/
  useEffect(() => {
    let cnt_filters = 0;
    for(let val of Object.values(filters)){
      if(val) cnt_filters++;
    }
    let data = {
      ...pagination,
      ...filters,
      isFilterApplied: cnt_filters > 0,
    };
    dispatch(getSuggestedJobList(data));
  }, [pagination, filters]);

  // return updated params for job-list-api
  const getJobListParams=()=>{
      let cnt_filters = 0;
      for (let val of Object.values(filters)) {
        if (val) cnt_filters++;
      }
    return {
      ...pagination,
      ...filters,
      isFilterApplied: cnt_filters > 0,
    };
  }

  /******************** 
  @purpose :  Infinite Scroll
  @Parameter : {}
  @Author : INIC
  ******************/
  const fetchMoreSuggestion = () => {
    setPagination({
      ...pagination,
      pagesize: pagination.pagesize + 5,
    });
  };

  /*******************
  @purpose : For initial active job
  @param : {}
  @Author : INIC
  ******************/
  useEffect(() => {
    if (jobData?.rows?.length) {
      if (activeJob == "") {
        dispatch(getSuggestedJobDetail(jobData?.rows?.[0]?.id)).then((res) => {
          dispatch(setOldSelectedJobId(jobData?.rows?.[0]?.id));
          setActiveJob(res);
        });
      } 
    } else {
      setActiveJob("");
    }
  }, [jobData]);

  /*******************
  @purpose : Rander HTML/ React Components
  @Author : INIC
  ******************/
  return (
    <Layout>
      <div className="inner-wrapper profile-wrapper my-profile">
        <Container>
          <JobFilters
            setFilters={setFilters}
            filterCount={filterCount}
            setFilterCount={setFilterCount}
          />
          <div className="d-flex flex-wrap d-xl-nowrap">
            <Container className="fluid px-0">
              <Row>
                <Col md={12} lg={4} >
                  {/* Candidate List Starts */}
                  <JobList
                    activeJob={activeJob}
                    setActiveJob={setActiveJob}
                    fetchMoreSuggestion={fetchMoreSuggestion}
                    getJobListParams={getJobListParams}
                  />
                  {/* Candidate List Ends */}
                </Col>
                <Col  md={12} lg={8} >
                  <JobDetail
                    activeJob={activeJob}
                    setActiveJob={setActiveJob}
                    getJobListParams={getJobListParams}
                  />
                </Col>
              </Row>
            </Container>
          </div>
        </Container>
      </div>
    </Layout>
  );
};
export default WithAuth(JobOffers);
