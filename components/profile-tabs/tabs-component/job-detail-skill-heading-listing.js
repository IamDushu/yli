import React from "react";
import { useTranslation } from "react-i18next";

const JobDetailSkillHeadingListing = ({ index, singleSkill }) => {
  const [lang] = useTranslation("language");

  /*******************
@purpose : Rander HTML/ React Components
@Author : INIC
******************/

  return (
    <>
      <tr>
        {/* <th>Skill Area</th> */}
        <th>{lang("JOBS.JOB_OFFERS.PROFESSION")}</th>
        <th>{lang("GROWTH_MODEL.GM_STEPFOUR_COL1")}</th>
        <th>{lang("JOBS.JOB_OFFERS.WEIGHT_AGE")}</th>
      </tr>
    </>
  );
};
export default JobDetailSkillHeadingListing;
