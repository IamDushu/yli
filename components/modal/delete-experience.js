import React, { useContext, useState } from "react";
import { Modal } from "react-bootstrap";
import { toggleModals } from "store/actions";
import { useDispatch, useSelector } from "react-redux";

const DeleteExperience = ({ deleteExperienceHandler }) => {
  const [submitting, setSubmitting] = useState(false);
  const dispatch = useDispatch();

  return (
    <div>
      <Modal.Body>
        <span>Are you sure you want to delete this Experience?</span>
      </Modal.Body>
      <Modal.Footer className="custom-footer text-center d-flex border-top border-geyser justify-content-between">
        <button
          className="btn btn-btn btn-dark font-weight-semibold"
          onClick={() => dispatch(toggleModals({ deleteExperience: false }))}
        >
          Cancel
        </button>
        <button
          className="btn btn-btn btn-info font-weight-semibold"
          onClick={() => {
            setSubmitting(true);
            deleteExperienceHandler();
            setSubmitting(false);
          }}
        >
          {submitting ? "Deleting..." : "Delete"}
        </button>
      </Modal.Footer>
    </div>
  );
};

export default DeleteExperience;
