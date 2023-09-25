import CompanyTour from "components/learning-institute/about-us/companyTour";
import OurMission from "components/learning-institute/about-us/ourMission";
import OurVision from "components/learning-institute/about-us/ourVision";
import EnvironmentalCommitment from "components/learning-institute/about-us/EnvironmentalCommitment";
import React, { useEffect, useState } from "react";

import SocialCommitment from "components/learning-institute/about-us/SocialCommitment";
import OurLogo from "components/learning-institute/about-us/ourLogo";

const AboutTabs = ({ aboutData }) => {
  const [learningAboutData, setLearningAboutData] = useState({
    ourMission: [],
    ourVision: [],
    ourEnvironmentalCommitment: [],
    companyTour: [],
    ourLogo: [],
    ourSocialCommitment: [],
  });

  useEffect(() => {
    let ourVision = [];
    let ourMission = [];
    let ourLogo = [];
    let companyTour = [];
    let ourEnvironmentalCommitment = [];
    let ourSocialCommitment = [];
    aboutData &&
      aboutData.length > 0 &&
      aboutData.forEach((element) => {
        if (element.type === "ourVision") {
          ourVision.push(element);
        } else if (element.type === "ourLogo") {
          ourLogo.push(element);
        } else if (element.type === "companyTour") {
          companyTour.push(element);
        } else if (element.type === "ourMission") {
          ourMission.push(element);
        } else if (element.type === "ourEnvironmentalCommitment") {
          ourEnvironmentalCommitment.push(element);
        } else if (element.type === "ourSocialCommitment") {
          ourSocialCommitment.push(element);
        }
      });
    setLearningAboutData({
      ...learningAboutData,
      ourVision,
      ourLogo,
      companyTour,
      ourMission,
      ourEnvironmentalCommitment,
      ourSocialCommitment,
    });
  }, [aboutData]);
  /*******************
@purpose : Rander HTML/ React Components
@Author : INIC
******************/

  return (
    <React.Fragment>
      {/* Company Tour */}
      {learningAboutData.companyTour &&
        learningAboutData?.companyTour[0]?.data?.length > 0 && (
          <CompanyTour learningAboutData={learningAboutData} />
        )}
      {/* Our Mission */}
      {learningAboutData.ourMission &&
        learningAboutData?.ourMission[0]?.data?.length > 0 && (
          <OurMission learningAboutData={learningAboutData} />
        )}
      {/* Our Vision  */}
      {learningAboutData.ourVision &&
        learningAboutData?.ourVision[0]?.data?.length > 0 && (
          <OurVision learningAboutData={learningAboutData} />
        )}
      {/* Our Logo  */}
      {learningAboutData.ourLogo &&
        learningAboutData?.ourLogo[0]?.data?.length > 0 && (
          <OurLogo learningAboutData={learningAboutData} />
        )}
      {/* Our Environmental Commitment  */}
      {learningAboutData.ourEnvironmentalCommitment &&
        learningAboutData?.ourEnvironmentalCommitment[0]?.data?.length > 0 && (
          <EnvironmentalCommitment learningAboutData={learningAboutData} />
        )}
      {/* Our Social Commitment  */}
      {learningAboutData.ourSocialCommitment &&
        learningAboutData?.ourSocialCommitment[0]?.data?.length > 0 && (
          <SocialCommitment learningAboutData={learningAboutData} />
        )}
    </React.Fragment>
  );
};
export default AboutTabs;
