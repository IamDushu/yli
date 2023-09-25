import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { Form, Row, Col, Button } from "react-bootstrap";
import { useFormik } from "formik";
import { TextField, TextFieldPassword } from "../form-fields";
import {
  LOGIN_SCHEMA,
  getRememberMeCookie,
  setRememberMeCookie,
  removeCookie,
} from "./../../utils";
import { login, toggleModals } from "../../store/actions";
import SocialLoginBtns from "components/layout/socialLoginBtns";

/******************* 
  @purpose : User Login form
  @Author : INIC
  ******************/
export const Login = () => {
  const [lang] = useTranslation("language");
  const dispatch = useDispatch();
  const [rememberedData, setRememberedData] = useState({});
  useEffect(() => {
    let data = getRememberMeCookie();
    setRememberedData(data);
  }, []);

  const formik = useFormik({
    initialValues: rememberedData,
    validationSchema: LOGIN_SCHEMA(lang),
    enableReinitialize: true,
    onSubmit: (values) => {
      let data = { auth: values.auth, password: values.password };
      dispatch(login(data));
      if (values.remember_me) {
        setRememberMeCookie(values);
      } else {
        removeCookie("remember_me");
      }
    },
  });

  return (
    <>
      <h4 className="modal-headingtext mb-15 text-center font-medium">
        Please Sign In to continue
      </h4>

      <Form onSubmit={formik.handleSubmit} className="mx-sm-3 mx-xl-5 px-xl-4">
        <SocialLoginBtns />

        <div className="d-flex align-items-center">
          <span className="border-left"></span>
          <span className="or-text px-3">or</span>
          <span className="border-right"></span>
        </div>
        <Row className="mt-4">
          <Col xl={12}>
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
          </Col>
          <Col xl={12}>
            <Form.Group>
              <TextFieldPassword
                label={lang("FORM.PASSWORD")}
                placeholder={lang("FORM.PASSWORD")}
                name="password"
                formik={formik}
              />
            </Form.Group>
          </Col>
        </Row>

        <div className="d-flex justify-content-between mb-20 align-items-center flex-wrap">
          <div className="custom-checkbox">
            <label htmlFor="Rememberme" className="mb-0">
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
              <span></span>
              Remember me
            </label>
          </div>
          <a
            role="link"
            onClick={() =>
              dispatch(toggleModals({ login: false, forgetPassword: true }))
            }
            className="btn link-btn forgot-link text-butterfly-blue font-14 p-0 mt-2 mt-sm-0"
          >
            {lang("FORM.FORGOT_YOUR_PASSWORD")}
          </a>
        </div>

        <div className="text-center">
          <Button
            variant="info"
            type="submit"
            className="mb-50 md-mb-30 w-100 text-uppercase"
            title={lang("COMMON.SIGN_IN")}
          >
            {lang("COMMON.SIGN_IN")}
          </Button>
          <div className="account-linkwrap font-14 mt-4 pt-1">
            {lang("COMMON.NEW_USER")}?{" "}
            <a
              onClick={() =>
                dispatch(toggleModals({ login: false, register: true }))
              }
              role="button"
              className="btn link-btn forgot-link font-14 p-0 text-butterfly-blue"
            >
              {lang("COMMON.CREATE_NEW_ACCOUNT")}
            </a>
          </div>
        </div>
      </Form>
    </>
  );
};
