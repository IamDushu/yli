import React, { Fragment } from "react";
import { Button, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { toggleModals } from "store/actions";

export const DeleteChat = ({ id, deleteChat, lang }) => {
  const dispatch = useDispatch();
  return (
    <Fragment>
      <Modal.Body className="text-center">
        <em className="bx bx-info-circle text-info bg-icon-modal"></em>
        <div className="mx-lg-5 px-sm-2">
          <h2 className="h-1 font-md-20 font-medium mt-md-5 mt-2 mb-4">
            {lang("MESSAGE.DELETE_MESSAGE")}
          </h2>
          <div className="d-flex w-100 aling-items-center justify-content-center">
            <Button
              variant="outline-info"
              type="submit"
              className="mb-50 md-mb-30 font-weight-semibold text-uppercase mt-4 w-50 w-sm-100 mx-sm-3"
              onClick={() => dispatch(toggleModals({ deletechat: false }))}
            >
              {lang("COMMON.BACK")}
            </Button>
            <Button
              variant="info"
              type="submit"
              className="mb-50 md-mb-30 font-weight-semibold text-uppercase mt-4 w-50 w-sm-100 mx-sm-3"
              onClick={() => deleteChat(id)}
            >
              {lang("COMMON.YES")}
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Fragment>
  );
};
