import React, { useContext, useState } from "react";
import {
  deleteMessageListing,
  getMessageListing,
  getThreadMessages,
  toggleModals,
} from "store/actions";
import { useDispatch, useSelector } from "react-redux";
import { ChatContext } from "context/ChatContext";
import { useTranslation } from "react-i18next";
import ModalFooter from "components/yli-modal/modalFooter";
import ModalBody from "components/yli-modal/modalBody";

const DeleteMessage = () => {
  const [submitting, setSubmitting] = useState(false);
  const [lang] = useTranslation("language");
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
      <ModalBody>
        <span>{lang("MESSAGE.DELETE_CHAT")}</span>
      </ModalBody>
      <ModalFooter
        showCanel
        cancleHandleClick={() => dispatch(toggleModals({ deleteMessage: false }))}
        performButtonTitle={submitting ? "Deleting..." : lang("CONNECTIONS.DELETE")}
        performHandleClick={() => !submitting && deleteMessageHandler()}
      />
    </div>
  );
};

export default DeleteMessage;
