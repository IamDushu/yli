import React, { useEffect, useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { login, toggleModal, toggleModals } from "../../store/actions";
import { TextField, TextFieldPassword } from "components/form-fields";
import { useTranslation } from "react-i18next";
import { useFormik } from "formik";
import {
  getRememberMeCookie,
  LOGIN_SCHEMA,
  removeCookie,
  setRememberMeCookie,
} from "utils";
import SocialLoginBtns from "components/layout/socialLoginBtns";
import { useRouter } from "next/router";

export function LoginNew({
  keyModal,
  className = "modal-block header-logins-modal",
  show,
  size,
  body,
  header,
  closeIcon = true,
  animation = true,
  hideHeader = false,
  centered = true,
  headerClassName = "pb-0",
  backdrop = true,
  redirectUrl = "",
}) {
  const [lang] = useTranslation("language");
  const dispatch = useDispatch();
  const showSignup = useSelector((state) => state.user.allowSignup);
  const [rememberedData, setRememberedData] = useState({});
  const router = useRouter();
  const inviteToken = router.query.invite;
  useEffect(() => {
    let data = getRememberMeCookie();
    setRememberedData(data);
  }, []);

  const formik = useFormik({
    initialValues: rememberedData,
    validationSchema: LOGIN_SCHEMA(lang),
    enableReinitialize: true,
    onSubmit: (values) => {
      let data = {
        auth: values.auth,
        password: values.password,
        type: "front",
      };
      dispatch(login(data));
      if (values.remember_me) {
        setRememberMeCookie(values);
      } else {
        removeCookie("remember_me");
      }
    },
  });

  const closeModal = () => {
    dispatch(toggleModal(false, keyModal));
    if (redirectUrl !== "") {
      router.push(redirectUrl, undefined, { shallow: true });
    }
  };

  return (
    <Modal
      className={className}
      show={show}
      onHide={closeModal}
      bsSize={size != "large" ? size : null}
      // size="lg"
      centered={centered}
      animation={animation}
      onExited={() =>
        setTimeout(() => {
          document.body.style["overflow-x"] = "hidden";
        })
      }
      backdrop={backdrop}
    >
      <Modal.Header
        // className={headerClassName}
        closeButton={closeIcon}
        className="login-modal-header"
        onHide={() => closeModal()}
      >
        <div className="header-title">
          <h5>{lang("LOGIN.LOGIN_TO_YLIWAY")}</h5>
          <span>{lang("LOGIN.ACCELERATE_YOUR_SUCCESS")}</span>
        </div>
        {!hideHeader && header}
      </Modal.Header>
      <Modal.Body className="login-modal-body">
        <SocialLoginBtns inviteToken={inviteToken} />
        <div className="option-block">
          <span>{lang("LOGIN.OR")}</span>
        </div>
        <div className="form-block-outer">
          <Form onSubmit={formik.handleSubmit}>
            <Form.Group>
              <TextField
                type="text"
                label={`${lang("FORM.EMAIL")} or ${lang("FORM.MOBILE_NUMBER")}`}
                placeholder={`${lang("FORM.EMAIL")} or ${lang(
                  "FORM.MOBILE_NUMBER"
                ).toLocaleLowerCase()}`}
                name="auth"
                formik={formik}
              />
            </Form.Group>
            <Form.Group>
              <div className="field-has-icon">
                <TextFieldPassword
                  label={lang("FORM.PASSWORD")}
                  placeholder={lang("FORM.PASSWORD")}
                  name="password"
                  formik={formik}
                />
              </div>
            </Form.Group>
            <div className="remember-block">
              <div className="custom-checkbox">
                <label className="custom-label">
                  {lang("FORM.REMEMBER_ME")}
                  <input
                    type="checkbox"
                    name="csscheckbox"
                    id="Rememberme"
                    autoComplete="off"
                    defaultChecked={rememberedData.remember_me}
                    onChange={(e) =>
                      formik.setFieldValue("remember_me", e.target.checked)
                    }
                  />
                  <span className="checkmark"></span>
                </label>
              </div>
              <a
                href="#"
                role="link"
                title="Forgot Password?"
                onClick={() =>
                  dispatch(toggleModals({ login: false, forgetPassword: true }))
                }
              >
                {lang("FORM.FORGOT_YOUR_PASSWORD")}
              </a>
            </div>
            <Button
              type="submit"
              variant="primary"
              className="w-100"
              title={lang("LOGIN.LOGIN")}
            >
              {lang("LOGIN.LOGIN")}
            </Button>
            {showSignup && (
              <p className="signup-block">
                {lang("LOGIN.NOT_A_MEMBER_YET")}
                <a
                  href="#"
                  title={lang("SIGN_UP.SIGN_UP")}
                  onClick={() =>
                    dispatch(toggleModals({ login: false, register: true }))
                  }
                >
                  {lang("SIGN_UP.SIGN_UP")}
                </a>
              </p>
            )}
          </Form>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default LoginNew;
