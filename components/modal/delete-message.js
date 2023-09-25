import React, { useContext, useState } from "react";
import { Modal } from "react-bootstrap";
import {
  deleteMessageListing,
  getMessageListing,
  getThreadMessages,
  toggleModals,
} from "store/actions";
import { useDispatch, useSelector } from "react-redux";
import { ChatContext } from "context/ChatContext";

const DeleteMessage = () => {
  const [submitting, setSubmitting] = useState(false);
  const { activeThread } = useContext(ChatContext);
  const dispatch = useDispatch();
  const { singleMessage } = useSelector((state) => state.ui);

  const deleteMessageHandler = async () => {
    setSubmitting(true);
    await dispatch(deleteMessageListing(singleMessage?.message?.id));
    if (singleMessage?.isThread) {
      await dispatch(getThreadMessages(activeThread.id));
    }
    await dispatch(getMessageListing(singleMessage?.message?.channel_id));
    await dispatch(toggleModals({ deleteMessage: false }));
    setSubmitting(false);
  };
  return (
    <div>
      <Modal.Body>
        <span>Are you sure you want to delete this Message?</span>
      </Modal.Body>
      <Modal.Footer className="custom-footer text-center d-flex border-top border-geyser justify-content-between">
        <button
          className="btn btn-btn btn-dark font-weight-semibold"
          onClick={() => dispatch(toggleModals({ deleteMessage: false }))}
        >
          Cancel
        </button>
        <button
          className="btn btn-btn btn-info font-weight-semibold"
          onClick={() => !submitting && deleteMessageHandler()}
        >
          {submitting ? "Deleting..." : "Delete"}
        </button>
      </Modal.Footer>
    </div>
  );
};

export default DeleteMessage;
