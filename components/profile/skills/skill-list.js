import React from "react";
import { Card, Col, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { requestForRecommendation, toggleModals } from "store/actions";
import greenshield from "../../../public/assets/images/green-shield.svg";
import { useTranslation } from "react-i18next";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { onImageError } from "utils";

/**************************************  
  @Purpose : Skill list common component
  @Parameter : { skills, skillName}
  @Author : YLIWAY
  **************************************/
const SkillList = ({
  skills,
  skillName,
  loading,
  loadMore,
  setLoadMore,
  otherProfileId,
  type,
}) => {
  const [lang] = useTranslation("language");
  const dispatch = useDispatch();
  let numberOfSkills = loadMore[type] ? skills?.length : 4;

  /**************************************  
  @Purpose : Used for handling skill class
  @Parameter : {skillId, type}
  @Author : YLIWAY
  **************************************/
  const skillClassHandler = (skillId, type) => {
    if (skillId) {
      return `text-green-dark font-11 ${
        type === "experience" ? "" : "mr-2"
      } px-1 rounded-4 border-green py2 font-weight-bold`;
    } else {
      return `text-gray font-11 ${
        type === "experience" ? "" : "mr-2"
      } px-1 rounded-4 border-secondary py2 font-weight-bold`;
    }
  };
  return (
    <Card>
      <Card.Header className="d-sm-flex justify-content-between">
        <h4 className="mb-0 font-18 font-weight-bold">{skillName}</h4>
        {!otherProfileId && !loading && skills.length > 0 && (
          <span
            className="text-primary text-body-14 cursor-pointer font-weight-bold"
            onClick={() => {
              dispatch(toggleModals({ requestforrecommendation: true }));
              dispatch(requestForRecommendation(skillName));
            }}
          >
            {lang("SKILLS.FORM.REQUEST_FOR_RECOMMENDATION")}
          </span>
        )}
      </Card.Header>
      <Card.Body className="py-0">
        {loading ? (
          <Skeleton height={200} style={{ backgroundColor: "#DCDCDC" }} />
        ) : (
          <>
            {skills.length > 0 ? (
              <Row>
                {skills?.slice(0, numberOfSkills)?.map((skill) => (
                  <Col xl={12} lg={12} className="mb-3" key={skill?.id}>
                    <div className="skill-card border border-dark p-2 pl-3 br-8 h-100">
                      <div className="d-flex justify-content-between">
                        <div className="d-flex">
                          <h5 className="font-14 text-secondary font-weight-bold mb-2 pr-4">
                            {skill?.skillType}
                          </h5>
                          <div>
                            {skill?.endorsements?.length > 0 && (
                              <span className="pl-2 d-block  skill-image-text">
                                {lang("SKILLS.TEXT.CONFIRMED_BY")}
                                {skill &&
                                  skill?.endorsements
                                    ?.slice(0, 2)
                                    ?.map((user) => (
                                      <span key={user?.endorsedByUser?.id}>
                                        <img
                                          className="ml-1"
                                          src={
                                            user?.endorsedByUser
                                              ?.profilePicURL ?? ""
                                          }
                                          alt="User"
                                          width="32px"
                                          height="32px"
                                          style={{ borderRadius: "50%" }}
                                          onError={(e) => {
                                            onImageError(
                                              e,
                                              "profile",
                                              `${user?.endorsedByUser?.firstName} ${user?.endorsedByUser?.lastName}`
                                            );
                                          }}
                                        />
                                      </span>
                                    ))}
                                {skill?.endorsements?.length > 2 && (
                                  <span className="ml-1 font-weight-bold">
                                    +{skill?.endorsements?.length - 2}
                                  </span>
                                )}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="d-flex align-items-center flex-wrap mr-3">
                          <span className="font-12 text-secondary mr-2">
                            {lang("SKILLS.TEXT.ORIGIN")}
                          </span>
                          <span className={skillClassHandler(skill?.isProfile)}>
                            {lang("SKILLS.TEXT.USER")}
                          </span>
                          <span
                            className={skillClassHandler(
                              skill?.educationId?.length
                            )}
                          >
                            {lang("SKILLS.TEXT.EDU")}
                          </span>
                          <span
                            className={skillClassHandler(
                              skill?.certificationId?.length
                            )}
                          >
                            {lang("SKILLS.TEXT.CERT")}
                          </span>
                          <span
                            className={skillClassHandler(
                              skill?.experienceId?.length,
                              "experience"
                            )}
                          >
                            {lang("SKILLS.TEXT.EXP")}
                          </span>
                        </div>
                      </div>
                      {skill?.endorsements?.length > 0 && (
                        <img src={greenshield} className="greenshield" />
                      )}
                    </div>
                  </Col>
                ))}
              </Row>
            ) : (
              <h6>No skills added</h6>
            )}
          </>
        )}
      </Card.Body>
      {!loading && skills?.length > 4 && numberOfSkills !== skills.length && (
        <Card.Footer className="bg-white people-tab-view-all-button border-geyser border-top py-2">
          <span
            className="people-tab-view-all-button-text load-more-color"
            onClick={() => setLoadMore({ ...loadMore, [type]: true })}
          >
            {lang("COMMON.LOAD_MORE")}
          </span>
        </Card.Footer>
      )}
    </Card>
  );
};

export default SkillList;
