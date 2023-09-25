import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import greenshield from "../../../public/assets/images/green-shield.svg";
import { Col, Modal, Row } from "react-bootstrap";
import { onImageError } from "utils";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { toggleModals } from "store/actions";

const EndorsePopup = ({ skillList, endorseDetail }) => {
  const [lang] = useTranslation("language");
  const [skillByUser, setSkillByUser] = useState([]);
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    const skillData = [];
    skillList?.length > 0 &&
      skillList?.forEach((endorseSkill) => {
        endorseSkill?.endorsements?.forEach((user) => {
          if (user?.endorsedByUserId === endorseDetail?.endorsedByUserId) {
            skillData.push(endorseSkill);
          }
          setSkillByUser(skillData);
        });
      });
  }, [skillList]);

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
    <Modal.Body>
      <label>{lang("SKILLS.TEXT.USER")}</label>
      <div
        className="d-flex align-items-center top-header flex-grow-1 cursor-pointer"
        onClick={() => {
          router.push(`/profile/${endorseDetail?.endorsedByUser?.profileId}`);
          dispatch(toggleModals({ endorsepopup: false }));
        }}
      >
        <div className="w-h-32 position-relative rounded-pill mr-2">
          <div className="w-h-32 rounded-pill overflow-hidden">
            <picture className="w-100 h-100 d-block">
              <source
                srcSet={endorseDetail?.endorsedByUser?.profilePicURL}
                type="image/jpg"
              />
              <img
                src={endorseDetail?.endorsedByUser?.profilePicURL || ""}
                className="img-fluid h-100 w-100"
                alt={"/assets/images/user-noimg.jpg"}
                onError={(e) =>
                  onImageError(
                    e,
                    "profile",
                    `${endorseDetail?.endorsedByUser?.firstName} ${endorseDetail?.endorsedByUser?.lastName}`
                  )
                }
              />
            </picture>
          </div>
        </div>
        <div className="position-relative mr-sm-2 w-140 notification-listing text-ellipsis">
          <span className="text-body-14">
            {endorseDetail?.endorsedByUser?.firstName}{" "}
            {endorseDetail?.endorsedByUser?.lastName}
          </span>
        </div>
      </div>

      <label className="mt-4">{lang("SKILLS.TEXT.SKILLS")}</label>
      <Row>
        {skillByUser?.map((skill) => (
          <Col md={6} className="mb-3" key={skill?.id}>
            <div className="skill-card border border-dark p-2 pl-3 br-8 h-100">
              <h5 className="font-14 text-secondary font-weight-bold mb-2 pr-4">
                {skill?.skillType}
              </h5>
              {skill?.endorsements?.length > 0 && (
                <img src={greenshield} className="greenshield" />
              )}
              <div className="d-flex align-items-center flex-wrap">
                <span className="font-12 text-secondary mr-2">
                  {lang("SKILLS.TEXT.ORIGIN")}
                </span>
                <span
                  className={skillClassHandler(
                    !skill?.educationId?.length &&
                      !skill?.certificationId?.length &&
                      !skill?.experienceId?.length
                  )}
                >
                  {lang("SKILLS.TEXT.USER")}
                </span>
                <span className={skillClassHandler(skill?.educationId?.length)}>
                  {lang("SKILLS.TEXT.EDU")}
                </span>
                <span
                  className={skillClassHandler(skill?.certificationId?.length)}
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
          </Col>
        ))}
      </Row>
    </Modal.Body>
  );
};

export default EndorsePopup;
