import router from "next/router";
import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { logout, toggleModal, toggleModals } from "../../store/actions";

export function MainModal({
  keyModal,
  className = "",
  show,
  size,
  body,
  closeIcon = true,
  animation = true,
  hideHeader = false,
  centered = true,
  headerClassName = "pb-0",
  backdrop = true,
  redirectUrl = "",
  header,
  handleClose,
  isOtpDeclined=false,
  noScroll = false,
}) {
  const [classNameModal, setClassNameModal] = useState("modal-block");

  const dispatch = useDispatch();
  const closeModal = () => {
    if(isOtpDeclined){
      dispatch(logout())
    }
    dispatch(toggleModal(false, keyModal));
    dispatch(toggleModals({ isEdit: false }));
    if (redirectUrl !== "") {
      router.push(redirectUrl, undefined, { shallow: true });
    }
  };

  useEffect(() => {
    if (
      keyModal === "register" ||
      keyModal === "otpVerification" ||
      keyModal === "forgetPassword" ||
      keyModal === "requesttoadmin" ||
      keyModal === "reportpost" ||
      keyModal === "setNewPassword"
    ) {
      setClassNameModal("header-logins-modal");
    } else if (keyModal === "teacheroption") {
      setClassNameModal("bussness-option");
    } else if (keyModal === "quizmodal") {
      setClassNameModal("quiz-modal");
    } else {
      setClassNameModal("modal-block");
    }
  }, [keyModal]);
  return (
    <Modal
      className={`${classNameModal} ${className !== "" && className}`}
      show={show}
      onHide={handleClose || closeModal}
      bsSize={size != "large" ? size : null}
      size={size != null ? size : "lg"}
      dialogClassName={noScroll ? "" : "modal-dialog-scrollable"}
      centered={centered}
      backdrop={backdrop}
      animation={animation}
      onExited={() =>
        setTimeout(() => {
          document.body.style["overflow-x"] = "hidden";
        })
      }
    >
      <Modal.Header
        className={headerClassName}
        closeButton={closeIcon}
        onHide={() => closeModal()}
      >
        {!hideHeader && header}

        <button
          type="button"
          className="close close-header-none mt-1"
          data-dismiss="modal"
          aria-label="Close"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </Modal.Header>
      {body}
    </Modal>
  );
}

export default MainModal;
