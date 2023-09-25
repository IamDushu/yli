import React from "react";
import { useDispatch } from "react-redux";
import { Form, Row, Col, Button } from "react-bootstrap";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import { TextField, TextFieldPassword } from "../form-fields";
import { REGISTRATION_SCHEMA, getCookie } from "./../../utils";
import { registration } from "../../store/actions";
import SocialLoginBtns from "components/layout/socialLoginBtns";
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
  const language = getCookie("language");
  const formik = useFormik({
    initialValues: {
      auth: "",
      password: "",
      rememberMe: false,
      invite: inviteToken,
    },
    validationSchema: REGISTRATION_SCHEMA(lang),
    onSubmit: (values) => {
      const data = { 
        ...values,
        auth: values.auth.toLowerCase(),
        language
      };
      dispatch(registration(data));
    },
  });

  return (
    <>
      <Form onSubmit={formik.handleSubmit} className="">
        <SocialLoginBtns inviteToken={inviteToken} />
        <div className="d-flex align-items-center">
          <span className="border-left"></span>
          <span className="or-text px-3 font-14">or</span>
          <span className="border-right"></span>
        </div>
        <Row className="mt-3">
          <Col xl={12}>
            <Form.Group>
              <TextField
                type="email"
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
                <span className="custom-label font-14">
                  <input
                    type="checkbox"
                    className="mr-2"
                    onClick={(e) =>
                      formik.setFieldValue("rememberMe", e.target.checked)
                    }
                  />
                  By clicking Agree & Join, you agree to the{" "}
                  <Button
                    href="/term-and-conditions"
                    variant="link"
                    className="text-primary p-0"
                  >
                    Yliway User Agreement
                  </Button>
                  ,{" "}
                  <Button
                    href="/privacy-policy"
                    variant="link"
                    className="text-primary p-0"
                  >
                    Privacy Policy
                  </Button>
                  , and{" "}
                  <Button
                    href="/cookies-policy"
                    variant="link"
                    className="text-primary p-0"
                  >
                    Cookies Policy
                  </Button>
                  .
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
        </div>
      </Form>
    </>
  );
};
