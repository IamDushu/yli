import React from "react";
import { Button, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { toggleModals } from "store/actions";
/*******************   
 @purpose : User Set NoSufficientCreadit
 @Author : INIC
 ******************/
export const NoSufficientCreadit = () => {
  const dispatch = useDispatch();
  return (
    <>
      <Modal.Body className="text-center">
        <em className="bx bx-error-circle text-info"></em>
        <div className="mx-lg-4 px-2">
          <h2 className="h-1 font-medium mt-md-5 mt-2 mb-4">Oops!</h2>
          <h6 className="font-medium font-18 font-md-16 lh-font-18-34 text-charcoal-grey">
            You don't have sufficient credit to join this course. please, add
            credit to your wallet to proceeding further.
          </h6>
          <h6 className="font-weight-semibold my-4">1 Euro = 1 Credit</h6>
          <Button
            variant="outline-info"
            type="submit"
            className="mb-50 md-mb-30 mt-4 px-4 mx-2"
            onClick={() =>
              dispatch(toggleModals({ nosufficientcreadit: false }))
            }
          >
            Back
          </Button>
          <Button
            variant="info"
            type="submit"
            className="mb-50 md-mb-30 mt-4 px-4 mx-2"
            onClick={() => dispatch(toggleModals({ addcredit: true }))}
          >
            Add Credit
          </Button>
        </div>
      </Modal.Body>
    </>
  );
};
