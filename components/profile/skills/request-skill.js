import React from "react";
import { Button, Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { toggleModals } from "store/actions";
import { useDispatch } from "react-redux";

/*******************   
@purpose : Skill request popup
@Author : INIC
******************/
export const RequestSkills = () => {
  const [lang] = useTranslation("language");
  const dispatch = useDispatch();

  return (
    <>
      <Modal.Body>
        <div className="text-center">
          <em className="bx bx-check-circle font-72 text-primary pb-4"></em>
        </div>
        <h4 className="modal-headingtext mb-15 text-center font-medium font-18 text-charcoal-grey">
          {lang("SKILLS.TEXT.REQUEST_SUBMITTED")}
        </h4>
        <p className="modal-headingtext mb-15 text-center font-medium font-14">
          {lang("SKILLS.TEXT.REQUEST_SUBMITTED_DESCRIPTION")}
        </p>
        <div className="mx-lg-4 px-2">
          <Button
            variant="info"
            type="button"
            className="mb-50 md-mb-30 w-100 text-uppercase mt-3 mt-md-5"
            onClick={() => {
              dispatch(toggleModals({ requestskills: false }));
            }}
          >
            {lang("COMMON.OK")}
          </Button>
        </div>
      </Modal.Body>
    </>
  );
};
