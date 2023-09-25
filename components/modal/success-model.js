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
export const SuccessModel = () => {
  const [lang] = useTranslation("language");
  const router = useRouter();
  const dispatch = useDispatch();

  return (
    <>
    <Modal.Body>
     
        <em className="bx bx-check-circle mb-md-4 mb-3"></em>
        <h5 className="lh-19">
        Your Request has been submitted to Admin Successfully

        </h5>
        <p className="text-body-16 font-weight-normal">We will get in touch with you shortly.</p>
        <div className="mx-lg-4 px-2">
          <Button
            variant="info"
            type="button"
            className="mb-50 md-mb-30 w-100 mt-3 mt-md-3"
          >
            Ok
          </Button>
        </div>
 
    </Modal.Body>
    </>
  );
};
