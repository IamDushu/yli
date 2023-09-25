import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  getSkillType,
  setSkillsActData,
  setSkillType,
} from "store/actions/skills";

const Skills = ({ skillArea, skillsSelectedToView, skillsSelected, onClickSkills, onClickSkillsToView }) => {
  const { growthProject } = useSelector(
    (state) => state.growth
  );
  const { profession_field } = useSelector(
    ({ growth }) => growth.growthModelDetail
  );
  const { skillType } = useSelector((state) => state?.skillReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    if (skillArea?.value !== "" && skillArea?.label !== "") {
      dispatch(setSkillType([]));
      dispatch(setSkillsActData([]));
      let profId = profession_field;
      if ((skillArea?.value === 6 || skillArea?.label === 'Hard Skills') && growthProject) {
        profId = growthProject?.profession_field;
      }
      dispatch(
        getSkillType(skillArea?.value, skillArea?.label, profId)
      );
    }
  }, [JSON.stringify(skillArea)]);

  const getClassName = (skillCheck, isSelected) => {
    if (isSelected) {
      return 'skill skill-exists mb-3'
    }
    if (skillCheck) {
      return 'skill skill-selected mb-3'
    }
    return `skill mb-3`;
  }
  return (
    <>
      <div className="d-flex mb-3">
        <div className="check-box-unselect">
          <span></span> Not selected
        </div>
        <div className="check-box-select">
          <span></span> Selected
        </div>
      </div>
      <Row>
        {skillType.length > 0 &&
          skillType?.map((skill) => {
            const skillCheck = skillsSelected?.includes(skill?.name);
            const viewSkillCheck = skillsSelectedToView?.includes(skill?.name)
            return (
              <Col sm={4} key={skill?.id}>
                <div
                  className={getClassName(skillCheck, skill?.isSelected)}
                >
                  <span className="skill-title">{skill?.name}</span>
                  <span className="d-flex justify-content-around skill-check-box">
                    <i style={{ paddingTop: '3px' }} class='bx bx-info-circle text-primary' data-toggle="tooltip" title="Description not available"></i>
                    <span onClick={() => onClickSkillsToView(skill?.name)} >
                      {viewSkillCheck && !skillCheck ? <i style={{ fontSize: '1.2rem' }} class="material-icons text-primary">
                        visibility_off
                      </i>
                        : <i style={{ fontSize: '1.2rem' }} class="material-icons text-primary">
                          visibility
                        </i>

                      }
                    </span>
                    <span onClick={() =>
                      onClickSkills(skill?.name)
                    }>
                      {skillCheck ? (
                        <i className="bx bxs-check-circle"></i>
                      ) : (
                        <i className="bx bx-circle"></i>
                      )}
                    </span>
                  </span>
                </div>
              </Col>
            );
          })}
      </Row >
    </>
  );
};

export default Skills;
