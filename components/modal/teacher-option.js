import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { getCompanyDetails, getInstituteDetails } from "store/actions";
import {
  selectCompanyDetails,
  selectInstituteDetails,
  selectUserInfo,
} from "store/selectors/user";

import { Modal } from "react-bootstrap";
import {
  BECOME_BN_HOST,
  COACH_INTRODUCTION,
  TEACHER_INTRODUCTION,
} from "routes/urls";
/*******************
@purpose : User Set Thankyou
@Author : INIC
******************/

const CreatePageButton = ({ label, onClick, condition }) => (
  <>
    {condition ? (
      <button
        className="btn btn-link btn-link-primary d-flex align-items-start btn-link-hover mb-2"
        onClick={onClick}
      >
        <span className="link-text text-left">{label}</span>
      </button>
    ) : (
      <span
        style={{ cursor: "pointer" }}
        className="text-muted text-body-14 mb-2 d-flex "
      >
        {label}
      </span>
    )}
  </>
);

export const TeacherOption = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector(selectUserInfo);
  const instituteDetails = useSelector(selectInstituteDetails);
  const companyDetails = useSelector(selectCompanyDetails);
  const [lang] = useTranslation("language");

  const router = useRouter();
  useEffect(() => {
    dispatch(getInstituteDetails());
    dispatch(getCompanyDetails());
  }, []);

  const handleInstitute = () => {
    instituteDetails?.instituteDetails?.id
      ? ""
      : window.open("/institute/institute-introduction", "_self");
  };

  /*******************
  @purpose : To handle click on create company
  @Author : YLIWAY
  ******************/
  const handleCompany = () => {
    companyDetails?.companyDetails?.id
      ? ""
      : window.open("/company/company-introduction", "_self");
  };

  return (
    <>
      <Modal.Body>
        <div className="custom-body-with-scroll" tabIndex={1}>
          <div className="bussness-top-block mb-3 rounded-0">
            <div className="card mb-3">
              <div className="card-header bg-transparent">
                <h5 className="text-body-14 mb-0">
                  {lang("BUSINESS.KNOWLEDGE_BUILDERS.TITLE")}
                </h5>
              </div>
              <div className="card-body">
                <CreatePageButton
                  label={lang("BUSINESS.KNOWLEDGE_BUILDERS.TEACHER")}
                  onClick={() => router.push(TEACHER_INTRODUCTION)}
                  condition={
                    userInfo.role === null ||
                    (userInfo.role && !userInfo.role.includes("Teacher"))
                  }
                />
                <CreatePageButton
                  label={lang("BUSINESS.KNOWLEDGE_BUILDERS.COACH")}
                  onClick={() => router.push(COACH_INTRODUCTION)}
                  condition={
                    userInfo.role === null ||
                    (userInfo.role && !userInfo.role.includes("Coach"))
                  }
                />
                <CreatePageButton
                  label={lang("BUSINESS.KNOWLEDGE_BUILDERS.LEARNING_INSTITUTE")}
                  onClick={handleInstitute}
                  condition={!instituteDetails?.instituteDetails?.id}
                />
              </div>
            </div>
            <div className="card mb-3">
              <div className="card-header bg-transparent">
                <h5 className="text-body-14 mb-0">
                  {lang("BUSINESS.RELATIONSHIP_BUILDERS.TITLE")}
                </h5>
              </div>
              <div className="card-body">
                <CreatePageButton
                  label={lang("BUSINESS.RELATIONSHIP_BUILDERS.ROOM_MANAGER")}
                  onClick={() => window.open(BECOME_BN_HOST, "_self")}
                  condition={
                    userInfo.role === null ||
                    (userInfo.role && !userInfo.role.includes("Host"))
                  }
                />
              </div>
            </div>
            <div className="card mb-3">
              <div className="card-header bg-transparent">
                <h5 className="text-body-14 mb-0">
                  {lang("BUSINESS.COMPANY.TITLE")}
                </h5>
              </div>
              <div className="card-body">
                <CreatePageButton
                  label={lang("BUSINESS.COMPANY.COMPANY")}
                  onClick={handleCompany}
                  condition={!companyDetails?.companyDetails?.id}
                />
              </div>
            </div>
          </div>
        </div>
      </Modal.Body>
    </>
  );
};
