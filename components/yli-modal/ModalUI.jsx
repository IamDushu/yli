import React, { useEffect, useState } from "react";
import { Box, Modal } from "@mui/material";
import PropTypes from "prop-types";
import ModalHeader from "./modalHeader";
import modalCss from "./modal.module.scss";

function YliModalUI({
  keyModal,
  className = "",
  show,
  body,
  header,
  handleClose,
  closeModal,
  closeIcon,
  hideHeader,
  width="40%",
  headerContentStyle="yli-model-header-content",
  ...modalProps
}) {
  const [classNameModal, setClassNameModal] = useState("modal-block");

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
      className={`basic-model-layout ${classNameModal} ${className !== "" && className}`}
      open={show}
      onClose={handleClose || closeModal}
      disableEnforceFocus
      disableAutoFocus
      {...modalProps}
    >
      <Box className={`${modalCss["yli-modal"]}`} sx={width=="none"?{}:{width}}>
        <div>
          <ModalHeader headerContentStyle={headerContentStyle} header={header} closeModal={closeModal} hideHeader={hideHeader} closeIcon={closeIcon} />
          <div>{body}</div>
        </div>
      </Box>
    </Modal>
  );
}

export default YliModalUI;

YliModalUI.propTypes = {
  keyModal: PropTypes.oneOf([
    "register",
    "otpVerification",
    "forgetPassword",
    "requesttoadmin",
    "reportpost",
    "setNewPassword",
    "teacheroption",
    "quizmodal",
  ]),
  className: PropTypes.string,
  show: PropTypes.bool,
  body: PropTypes.any.isRequired,
  header: PropTypes.any,
  handleClose: PropTypes.func,
  closeModal: PropTypes.func,
  hideHeader: PropTypes.bool,
  closeIcon: PropTypes.bool,
};

YliModalUI.defaultProps = {
  show: false,
  className: "",
  hideHeader: false,
  closeIcon: true,
};
