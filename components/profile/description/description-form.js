import React from "react";
import { Button, Form, Card } from "react-bootstrap";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { EDIT_USER_DESCRIPTION_SCHEMA, setCookie } from "../../../utils";
import { TextAreaField } from "../../form-fields";
import { updateUserInfo } from "../../../store/actions";
import {
  addDescription,
  updateDescription,
} from "../../../store/actions/description";
import CkEditorField from "components/form-fields/ck-editor-field";
/******************** 
  @purpose :Description Form 
  @Parameter : { }
  @Author : INIC
  ******************/
const DescriptionForm = ({
  closePopupHandler,
  popupInfo: { data, isEdit },
}) => {
  const [lang] = useTranslation("language");
  const dispatch = useDispatch();
  /******************** 
  @purpose :Add/Edit Delete Brief Description Form 
  @Parameter : { }
  @Author : INIC
  ******************/
  const formik = useFormik({
    initialValues: {
      briefDescription: data?.briefDescription || "",
    },
    validationSchema: EDIT_USER_DESCRIPTION_SCHEMA(lang),
    onSubmit: (values) => {
      if (isEdit) {
        dispatch(updateDescription(values, () => closePopupHandler()));
      } else {
        dispatch(addDescription(values, () => closePopupHandler()));
      }
      setCookie("description", values.briefDescription);
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      <div className="p-3 card-scroll form-desc-editor">
        <Form.Label>
          {lang("USER_DESCRIPTION.POPUP.DESCRIPTION")}
          <sup>*</sup>
        </Form.Label>
        <Form.Group className="mb-2" controlId="formEditDesc">
          {/* <TextAreaField
            as="textarea"
            name="briefDescription"
            rows={6}
            formik={formik}
            count={2000}
          /> */}
          <CkEditorField
            formik={formik}
            count={2000}
            countName="briefDescriptionCount"
            name="briefDescription"
          />
        </Form.Group>
      </div>
      <div className="custom-footer text-center d-flex border-top border-geyser justify-content-end">
        {data?.briefDescription && (
          <Button
            variant="btn border-divider-color font-weight-semibold mr-3 rounded-0"
            // onClick={() => {
            //   dispatch(
            //     deleteDescription({ briefDescription: "" }, () =>
            //       closePopupHandler()
            //     )
            //   );
            // }}
            onClick={() => closePopupHandler()}
          >
            {lang("USER_DESCRIPTION.POPUP.CANCEL")}
          </Button>
        )}
        <Button type="submit" variant="btn btn-info font-weight-semibold px-24 rounded-0">
          {lang("USER_DESCRIPTION.POPUP.UPDATE")}
        </Button>
      </div>
    </Form>
  );
};

export default DescriptionForm;
