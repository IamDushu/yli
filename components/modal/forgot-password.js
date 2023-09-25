import React from "react";
import { Form, Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import { TextField } from "../form-fields";
import { forgotPassword } from "../../store/actions";
import { FORGOT_PASSWORD_SCHEMA } from "./../../utils";
/******************* 
@purpose : User Forgot Password Form
@Author : INIC
******************/
export const ForgotPassword = () => {
  const [lang] = useTranslation("language");
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      auth: "",
    },
    validationSchema: FORGOT_PASSWORD_SCHEMA(lang),
    onSubmit: (values) => {
      dispatch(forgotPassword({ auth: values.auth.toLowerCase() }));
    },
  });
  return (
    // Forgot password
    <Form onSubmit={formik.handleSubmit} className="px-3 px-md-4">
      <h6 className="modal-headingtext mb-60 md-mb-30 text-center px-0 font-18 font-sm-16 font-weight-normal lh-font-18-34">
        {lang("FORM.FORGET_PASSWORD_LABEL")}
      </h6>
      <div className="px-0 forgot-input-wrap">
        <Form.Group>
          <TextField
            type="text"
            label={`${lang("FORM.EMAIL")}`}
            placeholder={lang("FORM.ENTER_YOUR_EMAIL")}
            name="auth"
            formik={formik}
          />
        </Form.Group>
        <div className="text-center pt-17">
          <Button
            variant="info"
            type="submit"
            className="mb-50 md-mb-30 w-100 text-uppercase"
            title={lang("COMMON.SUBMIT")}
          >
            {lang("COMMON.SUBMIT")}
          </Button>
        </div>
      </div>
    </Form>
  );
};
