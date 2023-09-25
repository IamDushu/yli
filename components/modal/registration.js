import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Form, Row, Col, Button } from "react-bootstrap";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import { TextField, CheckBox, TextFieldPassword } from "../form-fields";
import { REGISTRATION_SCHEMA } from "./../../utils";
import { registration, toggleModals } from "../../store/actions";
import SocialLoginBtns from "components/layout/socialLoginBtns";
import Link from "next/link";
import { useRouter } from "next/router";
/******************* 
@purpose : User Registration form
@Author : INIC
******************/
export const Registration = () => {
  const [lang] = useTranslation("language");
  const dispatch = useDispatch();
  const router = useRouter();
  const inviteToken = router.query.invite;
  const formik = useFormik({
    initialValues: {
      auth: "",
      password: "",
      rememberMe: false,
      invite: inviteToken,
    },
    validationSchema: REGISTRATION_SCHEMA(lang),
    onSubmit: (values) => {
      const data = values;
      dispatch(registration(data));
    },
  });

  return (
    <>
      <h4 className="modal-headingtext mb-15 text-center font-medium">
        {lang("SIGN_UP.PLEASE_SIGN_UP_TO_CONTINUE")}
      </h4>
      <Form onSubmit={formik.handleSubmit} className="mx-sm-3 mx-xl-5 px-xl-4">
        <SocialLoginBtns inviteToken={inviteToken} />
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
                label={`${lang("FORM.EMAIL")}`}
                placeholder={`${lang("FORM.EMAIL")}`}
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
              <div className="remember-block mt-3">
                <span className="custom-label">
                  <input
                    type="checkbox"
                    className="mr-2"
                    onClick={(e) =>
                      formik.setFieldValue("rememberMe", e.target.checked)
                    }
                  />
                  By clicking Agree & Join, you agree to the{" "}
                  <Link href="/term-and-conditions">Yliway User Agreement</Link>
                  , <Link href="/privacy-policy">Privacy Policy</Link>, and{" "}
                  <Link href="/cookies-policy">Cookies Policy</Link>.
                </span>
              </div>
            </Form.Group>
          </Col>
        </Row>

        <div className="text-center">
          <Button
            variant="info"
            type="submit"
            disabled={!formik.values.rememberMe}
            className="mb-50 md-mb-30 w-100 text-uppercase"
            title={lang("COMMON.SIGN_UP")}
          >
            {lang("COMMON.SIGN_UP")}
          </Button>
          <div className="account-linkwrap font-14 mt-4 pt-1">
            {lang("COMMON.ALREADY_HAVE_ACCOUNT")} ?{" "}
            <a
              onClick={() =>
                dispatch(toggleModals({ login: true, register: false }))
              }
              role="button"
              className="btn link-btn forgot-link font-14 p-0 text-butterfly-blue"
            >
              {lang("COMMON.SIGN_IN_YOUR_ACCOUNT")}
            </a>
          </div>
        </div>
      </Form>
    </>
  );
};
