import { useRouter } from "next/router";
import React from "react";
import { Card, Table } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { toggleModal } from "store/actions";
import { useTranslation } from "react-i18next";
import dynamic from "next/dynamic";
const ViewSkillDetail = dynamic(() =>
  import("components/modal/view-skill-detail").then(
    (mod) => mod.ViewSkillDetail
  )
);
const MainModal = dynamic(() =>
  import("components/modal").then((mod) => mod.MainModal)
);
function RequiredSkills({ hardSkills, softSkills, mindsets, jobId }) {
  const [lang] = useTranslation("language");
  const dispatch = useDispatch();
  const router = useRouter();
  const { viewHardSkillDetail, viewSoftSkillDetail, viewMindsetDetail } =
    useSelector(({ ui }) => ui.modals, shallowEqual);

  return (
    <>
      <Card className="my-4">
        <Card.Header className="pb-0">
          <h3 className="h6 mb-0">
            {lang("JOBS.JOB_OFFERS.REQUIRED_HARD_SKILLS")}
          </h3>
        </Card.Header>
        <Card.Body className="p-3 border-bottom-geyser">
          <Table
            className="custom-table vertical-center-table font-14 mt-2 table-borderless"
            responsive="lg"
          >
            <thead>
              <tr>
                <th className="skill-col">
                  {lang("JOBS.JOB_OFFERS.SKILL_TYPE")}
                </th>
                <th>{lang("JOBS.JOB_OFFERS.WEIGHT")}</th>
                <th className="text-center">
                  {lang("JOBS.JOB_OFFERS.YOUR_ALIGNMENT")}
                </th>
                <th className="text-center">
                  {lang("JOBS.JOB_OFFERS.DETAILS")}
                </th>
                <th className="text-center">
                  {lang("JOBS.JOB_OFFERS.SUGGESTED_ACTIVITIES")}
                </th>
              </tr>
            </thead>
            <tbody>
              {hardSkills?.map((skill, index) => (
                <tr className="text-gray text-nowrap " key={`skill-${index}`}>
                  <td className="text-wrap w-25 text-break">{skill?.skillName}</td>
                  <td>{skill?.weightAge ? skill?.weightAge + "%" : "0%"}</td>
                  <td className="text-center d-flex align-items-center justify-content-center">
                    {skill?.isSkillMatched ? (
                      <i className="bx bxs-check-circle font-20 mx-1 text-green-primary"></i>
                    ) : (
                      <i className="icon-deny font-18 pt-1px mx-1"></i>
                    )}
                    {skill?.isEduMatched ? (
                      <i className="bx bxs-check-circle font-20 mx-1 text-green-primary"></i>
                    ) : (
                      <i className="icon-deny font-18 pt-1px mx-1"></i>
                    )}
                    {skill?.isCerMatched ? (
                      <i className="bx bxs-check-circle font-20 mx-1 text-green-primary"></i>
                    ) : (
                      <i className="icon-deny font-18 pt-1px mx-1"></i>
                    )}
                    {skill?.isExpMatched ? (
                      <i className="bx bxs-check-circle font-20 mx-1 text-green-primary"></i>
                    ) : (
                      <i className="icon-deny font-18 pt-1px mx-1"></i>
                    )}
                  </td>
                  <td
                    className="text-primary text-underline font-weight-bold text-center pointer"
                    onClick={() =>
                      dispatch(toggleModal(true, "viewHardSkillDetail"))
                    }
                  >
                    {/* {lang("JOBS.JOB_OFFERS.VIEW")} */}
                    <img src="assets/images/detail-icon-svg.svg" />
                  </td>
                  <td
                    className="text-primary text-underline font-weight-bold text-center pointer"
                    onClick={() => {
                      router.push({
                        pathname: `/suggested-activities/${jobId}`,
                        query: { skillName: skill?.skillName },
                      });
                    }}
                  >
                    {/* {lang("JOBS.JOB_OFFERS.VIEW")} */}
                    <img src="assets/images/suggestion-icon-svg.svg" />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
      <Card className="my-4">
        <Card.Header className="pb-0">
          <h3 className="h6 mb-0">
            {lang("JOBS.JOB_OFFERS.REQUIRED_SOFT_SKILLS")}
          </h3>
        </Card.Header>
        <Card.Body className="p-3 border-bottom-geyser">
          <Table
            className="custom-table vertical-center-table font-14 mt-2 table-borderless"
            responsive="lg"
          >
            <thead>
              <tr>
                <th className="skill-col">
                  {lang("JOBS.JOB_OFFERS.SKILL_TYPE")}
                </th>
                <th>{lang("JOBS.JOB_OFFERS.WEIGHT")}</th>
                <th className="text-center">
                  {lang("JOBS.JOB_OFFERS.YOUR_ALIGNMENT")}
                </th>
                <th className="text-center">
                  {lang("JOBS.JOB_OFFERS.DETAILS")}
                </th>
                <th className="text-center">
                  {lang("JOBS.JOB_OFFERS.SUGGESTED_ACTIVITIES")}
                </th>
              </tr>
            </thead>
            <tbody>
              {softSkills?.map((skill, index) => (
                <tr className="text-gray text-nowrap" key={`skill-${index}`}>
                  <td className="text-wrap w-25 text-break">{skill?.skillName}</td>
                  <td>{skill?.weightAge ? skill?.weightAge + "%" : "0%"}</td>
                  <td className="text-center d-flex align-items-center justify-content-center">
                    {skill?.isSkillMatched ? (
                      <i className="bx bxs-check-circle font-20 mx-1 text-green-primary"></i>
                    ) : (
                      <i className="icon-deny font-18 pt-1px mx-1"></i>
                    )}
                    {skill?.isEduMatched ? (
                      <i className="bx bxs-check-circle font-20 mx-1 text-green-primary"></i>
                    ) : (
                      <i className="icon-deny font-18 pt-1px mx-1"></i>
                    )}
                    {skill?.isCerMatched ? (
                      <i className="bx bxs-check-circle font-20 mx-1 text-green-primary"></i>
                    ) : (
                      <i className="icon-deny font-18 pt-1px mx-1"></i>
                    )}
                    {skill?.isExpMatched ? (
                      <i className="bx bxs-check-circle font-20 mx-1 text-green-primary"></i>
                    ) : (
                      <i className="icon-deny font-18 pt-1px mx-1"></i>
                    )}
                  </td>
                  <td
                    className="text-primary text-underline font-weight-bold text-center pointer"
                    onClick={() =>
                      dispatch(toggleModal(true, "viewSoftSkillDetail"))
                    }
                  >
                    {/* {lang("JOBS.JOB_OFFERS.VIEW")} */}
                    <img src="assets/images/detail-icon-svg.svg" />
                  </td>
                  <td
                    className="text-primary text-underline font-weight-bold text-center pointer"
                    onClick={() => {
                      router.push({
                        pathname: `/suggested-activities/${jobId}`,
                        query: { skillName: skill?.skillName },
                      });
                    }}
                  >
                    {/* {lang("JOBS.JOB_OFFERS.VIEW")} */}
                    <img src="assets/images/suggestion-icon-svg.svg" />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
      <Card className="my-4">
        <Card.Header className="pb-0">
          <h3 className="h6 mb-0">Required Mindset</h3>
        </Card.Header>
        <Card.Body className="p-3 border-bottom-geyser">
          <Table
            className="custom-table vertical-center-table font-14 mt-2 table-borderless"
            responsive="lg"
          >
            <thead>
              <tr>
                <th className="skill-col">
                  {lang("JOBS.JOB_OFFERS.SKILL_TYPE")}
                </th>
                <th>{lang("JOBS.JOB_OFFERS.WEIGHT")}</th>
                <th className="text-center">
                  {lang("JOBS.JOB_OFFERS.YOUR_ALIGNMENT")}
                </th>
                <th className="text-center">
                  {lang("JOBS.JOB_OFFERS.DETAILS")}
                </th>
                <th className="text-center">
                  {lang("JOBS.JOB_OFFERS.SUGGESTED_ACTIVITIES")}
                </th>
              </tr>
            </thead>
            <tbody>
              {mindsets?.map((skill, index) => (
                <tr className="text-gray text-nowrap" key={`skill-${index}`}>
                  <td className="text-wrap w-25 text-break">{skill?.skillName}</td>
                  <td>{skill?.weightAge ? skill?.weightAge + "%" : "0%"}</td>
                  <td className="text-center d-flex align-items-center justify-content-center">
                    {skill?.isSkillMatched ? (
                      <i className="bx bxs-check-circle font-20 mx-1 text-green-primary"></i>
                    ) : (
                      <i className="icon-deny font-18 pt-1px mx-1"></i>
                    )}
                    {skill?.isEduMatched ? (
                      <i className="bx bxs-check-circle font-20 mx-1 text-green-primary"></i>
                    ) : (
                      <i className="icon-deny font-18 pt-1px mx-1"></i>
                    )}
                    {skill?.isCerMatched ? (
                      <i className="bx bxs-check-circle font-20 mx-1 text-green-primary"></i>
                    ) : (
                      <i className="icon-deny font-18 pt-1px mx-1"></i>
                    )}
                    {skill?.isExpMatched ? (
                      <i className="bx bxs-check-circle font-20 mx-1 text-green-primary"></i>
                    ) : (
                      <i className="icon-deny font-18 pt-1px mx-1"></i>
                    )}
                  </td>
                  <td
                    className="text-primary text-underline font-weight-bold text-center pointer"
                    onClick={() =>
                      dispatch(toggleModal(true, "viewMindsetDetail"))
                    }
                  >
                    {/* {lang("JOBS.JOB_OFFERS.VIEW")} */}
                    <img src="assets/images/detail-icon-svg.svg" />
                  </td>
                  <td
                    className="text-primary text-underline font-weight-bold text-center pointer"
                    onClick={() => {
                      router.push({
                        pathname: `/suggested-activities/${jobId}`,
                        query: { skillName: skill?.skillName },
                      });
                    }}
                  >
                    {/* {lang("JOBS.JOB_OFFERS.VIEW")} */}
                    <img src="assets/images/suggestion-icon-svg.svg" />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
      <MainModal
        show={viewHardSkillDetail}
        keyModal="viewHardSkillDetail"
        body={<ViewSkillDetail skills={hardSkills} />}
        headerClassName="mb-50 block md-mb-30"
        header={<h5>Required Hard Skills</h5>}
      />
      <MainModal
        show={viewSoftSkillDetail}
        keyModal="viewSoftSkillDetail"
        body={<ViewSkillDetail skills={softSkills} />}
        headerClassName="mb-50 block md-mb-30"
        header={<h5>Required Soft Skills</h5>}
      />
      <MainModal
        show={viewMindsetDetail}
        keyModal="viewMindsetDetail"
        body={<ViewSkillDetail skills={mindsets} />}
        headerClassName="mb-50 block md-mb-30"
        header={<h5>Required Mindset</h5>}
      />
    </>
  );
}

export default RequiredSkills;
