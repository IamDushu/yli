import React from "react";
import { Button, Form, Card } from "react-bootstrap";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { EDIT_USER_SHORT_DESCRIPTION_SCHEMA } from "../../../utils";
import { TextAreaField } from "../../form-fields";

import {
  addDescription,
  deleteDescription,
  updateDescription,
} from "../../../store/actions/description";
import CkEditorField from "components/form-fields/ck-editor-field";
/******************** 
  @purpose :Short Description Form
  @Parameter : { }
  @Author : INIC
  ******************/
const ShortDescriptionForm = ({
  closePopupHandler,
  popupInfo: { data, isEdit },
}) => {
  const [lang] = useTranslation("language");
  const dispatch = useDispatch();
  /******************** 
  @purpose :Add/Edit Delete Short Description
  @Parameter : { }
  @Author : INIC
  ******************/
  const formik = useFormik({
    initialValues: {
      shortDescription: data?.shortDescription || "",
    },
    validationSchema: EDIT_USER_SHORT_DESCRIPTION_SCHEMA(lang, 500),
    onSubmit: (values) => {
      if (isEdit) {
        dispatch(updateDescription(values, () => closePopupHandler()));
      } else {
        dispatch(addDescription(values, () => closePopupHandler()));
      }
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      <div className="p-3 card-scroll form-desc-editor">
        <Form.Label>
          {" "}
          {lang("USER_DESCRIPTION.POPUP.OVERVIEW")} <sup>*</sup>
        </Form.Label>
        <Form.Group className="mb-2" controlId="formEditDesc">
          {/*  <TextAreaField
            as="textarea"
            name="shortDescription"
            rows={6}
            formik={formik}
            count={500}
          /> */}
          <CkEditorField
            formik={formik}
            name="shortDescription"
            count={2000}
            countName="shortDescriptionCount"
          />
        </Form.Group>
      </div>

      <div className="custom-footer text-center d-flex border-top border-geyser justify-content-end ">
        {data?.shortDescription && (
          <Button
            variant="btn border-divider-color font-weight-semibold mr-3 rounded-0"
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

export default ShortDescriptionForm;
