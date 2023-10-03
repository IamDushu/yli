import React from "react";
import router from "next/router";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { logout, toggleModal, toggleModals } from "../../store/actions";
import YliModalUI from "./ModalUI";

export function YliModal({
  keyModal,
  redirectUrl = "",
  isOtpDeclined = false,
  ...modalProps
}) {
  const dispatch = useDispatch();
  const closeModal = () => {
    if (isOtpDeclined) {
      dispatch(logout());
    }
    dispatch(toggleModal(false, keyModal));
    dispatch(toggleModals({ isEdit: false }));
    if (redirectUrl !== "") {
      router.push(redirectUrl, undefined, { shallow: true });
    }
  };

  return (
    <YliModalUI
      keyModal={keyModal}
      isOtpDeclined={isOtpDeclined}
      closeModal={closeModal}
      {...modalProps}
    />
  );
}

export default YliModal;

YliModal.propTypes = {
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
  redirectUrl: PropTypes.string,
  isOtpDeclined: PropTypes.bool,
};

YliModal.defaultProps = {
  show: false,
  className: "",
  redirectUrl: "",
  isOtpDeclined: false,
};
