// external packages
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useFormik } from "formik";
import {
  Button,
  Row,
  Col,
  Form,
  Modal,
  Card,
  FormLabel,
} from "react-bootstrap";
import { useDispatch, useSelector, shallowEqual } from "react-redux";

// internal packages
// import { GROWTH_CONNECTIONS_ACTIVITY_SCHEMA } from "utils";
import { TextField, TextFieldPassword } from "components/form-fields";
import { LOGIN_SCHEMA } from "utils";
import { selectUserInfo } from "store/selectors/user";
import { passwordVerification, toggleModals } from "store/actions";
// toggleModals
export const VerfiyPasswordModal = () => {
  const [lang] = useTranslation("language");
  const dispatch = useDispatch();
  const userInfo = useSelector(selectUserInfo);
  const { recoverType } = useSelector(({ ui }) => ui.modals, shallowEqual);

  /******************** 
  @purpose : To intialize formik
  @Parameter : {}
  @Author : YLIWAY
  ******************/
  const formik = useFormik({
    initialValues: {
      auth: userInfo?.email || "",
      password: "",
    },
    enableReinitialize: true,
    validationSchema: LOGIN_SCHEMA(lang),
    onSubmit: (values) => {
      passwordVerification(values).then((res) => {
        if (res.status) {
          dispatch(toggleModals({ verifyPassword: false }));
          dispatch(
            toggleModals({
              recoveryFieldEdit: true,
              recoveryDetails: {
                recoveryEmail: userInfo?.recoveryEmail || "",
                recoveryPhone: userInfo?.recoveryPhone || "",
                countryCode: userInfo?.countryCode || "",
                recoverType,
              },
            })
          );
        }
      });
    },
  });
  return (
    <>
      {userInfo && (
        <Modal.Body>
          <Card className="card-md border-0">
            <Card.Body>
              <Row className="mb-4">
                <Col xl={12}>
                  <Form.Group>
                    <TextField
                      type="text"
                      label={`${lang("FORM.EMAIL")}`}
                      placeholder={`${lang("FORM.EMAIL")}`}
                      name="auth"
                      formik={formik}
                      disabled={true}
                      readOnly={true}
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
            </Card.Body>
          </Card>
        </Modal.Body>
      )}
      {userInfo && (
        <Modal.Footer className="custom-footer text-center d-flex">
          <Button
            onClick={formik.handleSubmit}
            variant="btn btn-info font-weight-semibold px-5 ml-auto"
          >
            {lang("COMMON.VERIFY")}
          </Button>
        </Modal.Footer>
      )}
    </>
  );
};
