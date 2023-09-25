import React from "react";
import { Button, Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { Form } from "react-bootstrap";
import { CHANGE_PASSWORD_SCHEMA } from "../../utils";
import { useFormik } from "formik";
import { TextFieldPassword } from "../form-fields";
import { changePassword } from "../../store/actions/my-account";
import { getUserProfileData, toggleModals } from "../../store/actions";

/*******************   
@purpose : User Set Thankyou
@Author : INIC
******************/
export const AccountChangePassword = () => {
  const [lang] = useTranslation("language");
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      oldPassword: "",
      password: "",
      confirmPassword: "",
      type: "front",
    },
    validationSchema: () => CHANGE_PASSWORD_SCHEMA(lang),
    onSubmit: async (values) => {
      await dispatch(
        changePassword(values, () =>
          dispatch(toggleModals({ accountChangePassword: false }))
        )
      );
      await dispatch(getUserProfileData());
    },
  });

  return (
    <>
      {/* <Form> */}
      <Modal.Body className="p-4">
        <Form>
          <Form.Group controlId="formBasicOldPassword">
            <TextFieldPassword
              label={lang("MY_ACCOUNTS.FORM.CHANGE_PASSWORD.OLD_PASSWORD")}
              placeholder={lang(
                "MY_ACCOUNTS.FORM.CHANGE_PASSWORD.OLD_PASSWORD_PLACEHOLDER"
              )}
              name="oldPassword"
              formik={formik}
            />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <TextFieldPassword
              label={lang("MY_ACCOUNTS.FORM.CHANGE_PASSWORD.NEW_PASSWORD")}
              placeholder={lang(
                "MY_ACCOUNTS.FORM.CHANGE_PASSWORD.NEW_PASSWORD_PLACEHOLDER"
              )}
              name="password"
              formik={formik}
            />
          </Form.Group>
          <Form.Group className="mb-0" controlId="formBasicConfirmPassword">
            <TextFieldPassword
              label={lang("MY_ACCOUNTS.FORM.CHANGE_PASSWORD.CONFIRM_PASSWORD")}
              placeholder={lang(
                "MY_ACCOUNTS.FORM.CHANGE_PASSWORD.CONFIRM_PASSWORD_PLACEHOLDER"
              )}
              name="confirmPassword"
              formik={formik}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer className="custom-footer text-center d-flex border-top border-geyser justify-content-between">
        <Button
          variant="btn btn-btn btn-dark font-weight-semibold"
          onClick={() =>
            dispatch(toggleModals({ accountChangePassword: false }))
          }
        >
          {lang("COMMON.CANCEL")}
        </Button>
        <Button
          variant="btn btn-btn btn-info font-weight-semibold px-30"
          onClick={formik.handleSubmit}
        >
          {" "}
          {lang("COMMON.UPDATE")}
        </Button>
      </Modal.Footer>
      {/* </Form> */}
    </>
  );
};
