import React from "react";
import { Card, Table } from "react-bootstrap";
import { useTranslation } from "react-i18next";
/*******************   
 @purpose : User Set uploadPDF
 @Author : INIC
 ******************/
export const ViewSkillDetail = ({ skills }) => {
  const [lang] = useTranslation("language");
  return (
    <Card>
      <Card.Body className="p-3">
        <Table
          className="custom-table vertical-center-table font-14 mt-2 table-borderless"
          responsive="lg"
        >
          <thead>
            <tr>
              <th>{lang("JOBS.JOB_OFFERS.SKILL_TYPE")}</th>
              <th>Weightage</th>
              <th className="text-center">
               Skills
              </th>
              <th className="text-center">
                {lang("JOBS.JOB_OFFERS.EDUCATION")}
              </th>
              <th className="text-center">
                {lang("JOBS.JOB_OFFERS.CERTIFICATE")}
              </th>
              <th className="text-center">
                {lang("JOBS.JOB_OFFERS.EXPERIENCE")}
              </th>
            </tr>
          </thead>
          <tbody>
            {skills?.length &&
              skills.map((skill, index) => (
                <tr className="text-gray" key={skill?.name + "-" + index}>
                  <td>{skill?.skillName}</td>
                  <td>{skill?.weightAge ? skill?.weightAge + "%" : "0%"}</td>
                  <td className="text-center d-flex align-items-center justify-content-center">
                    {skill?.isSkillMatched ? (
                      <i className="bx bxs-check-circle font-26 mx-1 text-green-primary"></i>
                    ) : (
                      <i className="bx bxs-x-circle text-danger font-26 pt-1px mx-1"></i>
                    )}
                  </td>
                  <td className="text-primary text-underline font-weight-bold text-center">
                    {skill?.isEduMatched ? (
                      <i className="bx bxs-check-circle font-26 mx-1 text-green-primary"></i>
                    ) : (
                      <i className="bx bxs-x-circle text-danger font-26 pt-1px mx-1"></i>
                    )}
                  </td>
                  <td className="text-primary text-underline font-weight-bold text-center">
                    {skill?.isCerMatched ? (
                      <i className="bx bxs-check-circle font-26 mx-1 text-green-primary"></i>
                    ) : (
                      <i className="bx bxs-x-circle text-danger font-26 pt-1px mx-1"></i>
                    )}
                  </td>
                  <td className="text-primary text-underline font-weight-bold text-center">
                    {skill?.isExpMatched ? (
                      <i className="bx bxs-check-circle font-26 mx-1 text-green-primary"></i>
                    ) : (
                      <i className="bx bxs-x-circle text-danger font-26 pt-1px mx-1"></i>
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};
