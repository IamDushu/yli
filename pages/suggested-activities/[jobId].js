import React from "react";
import WithAuth from "components/with-auth/with-auth";
import SuggestedActivity from "components/suggested-activity/Index";
import { useRouter } from "next/router";

const suggestedActivities = () => {
  const router = useRouter();
  const { jobId, skillName } = router.query;
  /******************* 
  @purpose : Rander HTML/ React Components
  @Author : INIC
  ******************/
  return <SuggestedActivity skillName={skillName} jobId={jobId} />;
};

export default WithAuth(suggestedActivities);
