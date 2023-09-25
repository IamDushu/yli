import React from "react";
import WithAuth from "components/with-auth/with-auth";
import JobOffers from "components/job-offers-list";

const jobOffers = () => {
  /******************* 
  @purpose : Rander HTML/ React Components
  @Author : INIC
  ******************/
  return <JobOffers />;
};

export default WithAuth(jobOffers);
