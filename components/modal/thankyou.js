import React from "react";
import { useRouter } from "next/router";
import { Button, Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { toggleModals } from "store/actions";
import { useDispatch } from "react-redux";

/*******************   
@purpose : User Set Thankyou
@Author : INIC
******************/
export const Thankyou = () => {
  const [lang] = useTranslation("language");
  const router = useRouter();
  const dispatch = useDispatch();

  return (
    <>
      <Modal.Body>
        <div className="text-center">
          <em className="bx bx-check-circle font-72 text-success pb-4"></em>
        </div>
        <h4 className="modal-headingtext mb-15 text-center font-medium font-18 text-charcoal-grey">
          {lang("FORM.SET_THANKYOU_LABEL")}
        </h4>
        <div className="mx-lg-4 px-2">
          <Button
            variant="info"
            type="button"
            className="mb-50 md-mb-30 w-100 text-uppercase mt-3 mt-md-5"
            onClick={() => {
              dispatch(toggleModals({ thankyou: false }));
              router.push("/dashboard", undefined, { shallow: true });
            }}
          >
            Go to Dashboard
          </Button>
        </div>
      </Modal.Body>
    </>
  );
};
