import React from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import {  TextFieldPassword } from "../form-fields";
import { SET_NEW_PASSWORD_SCHEMA } from "../../utils";
import { resetPassword } from "../../store/actions";
import { Link } from "./../../routes";

/******************* 
@purpose : User Set New Password Form
@Author : INIC
******************/
export const SetNewPassword = () => {
  const [lang] = useTranslation("language");
  const dispatch = useDispatch();
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
      type: "front",
    },
    validationSchema: SET_NEW_PASSWORD_SCHEMA(lang),
    onSubmit: (values) => {
      dispatch(resetPassword({ ...values }));
    },
  });
  return (
    <Form onSubmit={formik.handleSubmit} className="px-3 px-sm-4">
      <h6 className="modal-headingtext font-18 font-sm-16 font-weight-normal text-center">
        {lang("FORM.SET_PASSWORD_LABEL")}
      </h6>
      <div className="pt-4 forms-blockwrap">
        <Row>
          <Col xs={12}>
            <Form.Group>
              <TextFieldPassword
                label={lang("FORM.PASSWORD")}
                placeholder={lang("FORM.ENTER_YOUR_PASSWORD")}
                name="password"
                formik={formik}
              />
            </Form.Group>
          </Col>
          <Col xs={12}>
            <Form.Group>
              <TextFieldPassword
                label={lang("FORM.CONFIRM_PASSWORD")}
                placeholder={lang("FORM.CONFIRM_YOUR_PASSWORD")}
                name="confirmPassword"
                formik={formik}
              />
            </Form.Group>
          </Col>
        </Row>
      </div>

      <div className="text-center mt-2">
        <Button
          variant="info"
          type="submit"
          className="w-100 text-uppercase mt-2"
          title={lang("COMMON.CHANGE_PASSWORD")}
        >
          {lang("COMMON.CHANGE_PASSWORD")}
        </Button>
        <p className="mt-4 mb-0">
          Didn’t get OTP?{" "}
          <Link route="/">
            <a className="text-primary ml-2 font-medium">Resend</a>
          </Link>
        </p>
      </div>
    </Form>
  );
};
