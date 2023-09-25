import { useFormik } from "formik";
import React, { useState } from "react";
import { Form, Spinner, Button, FormText, Modal } from "react-bootstrap";
import { FileUploader } from "react-drag-drop-files";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
  // addUpdateLesson,
  toggleModals,
  uploadPostDocument,
} from "store/actions";
import { showMessageNotification, UPLOAD_PDF_COURSES } from "utils";

/*******************   
 @purpose : User Set uploadPDF
 @Author : INIC
 ******************/
export const UploadPdf = () => {
  const [lang] = useTranslation("language");
  const { coursePdf } = useSelector((state) => state.ui);
  let { id, userId, title, pdf } = coursePdf.data;
  let { courseId } = coursePdf;
  const [selectFile, setSelectFile] = useState(pdf || "");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      id,
      userId,
      courseId,
      title,
      pdf: "",
    },

    validationSchema: UPLOAD_PDF_COURSES(lang),
    onSubmit: async (values) => {
      // await dispatch(addUpdateLesson(values));
      await dispatch(toggleModals({ uploadpdf: false }));
      showMessageNotification("PDF added successfully");
    },
  });
  const handleFileChange = async (event) => {
    const documentData = new FormData();
    documentData.append("file", event);
    setLoading(true);
    const response = await dispatch(uploadPostDocument(documentData));
    if (response) {
      formik?.setFieldValue("pdf", response.fileUrl);
      setSelectFile(response.fileUrl);
      setLoading(false);
    }
  };

  const fileTypes = ["PDF"];
  return (
    <>
      <Form onSubmit={formik.handleSubmit}>
        <Modal.Body>
          <div>
            <span className="form-label">
              {" "}
              Upload PDF<sup>*</sup>
            </span>

            <Form.Group className="w-xl-75-100 mb-0">
              <div className="fullwidth-dropzone sm-6 md-6 lg-6 mb-3">
                <FileUploader
                  handleChange={handleFileChange}
                  children={
                    <div className="dropzone-wrap-xl text-center pointer w-100">
                      <em className="icon icon-upload-cloud font-44 pb-0"></em>
                      <p className="m-0 font-16 text-geyser font-medium">
                        Upload your File here
                      </p>
                    </div>
                  }
                  name={"pdf"}
                  types={fileTypes}
                  maxSize={10}
                  style="Width: 100%"
                  formik={formik}
                />
                {formik?.touched["pdf"] && formik?.errors["pdf"] && (
                  <FormText className={"error"}>{formik?.errors["pdf"]}</FormText>
                )}
              </div>

              {loading ? (
                <center>
                  <Spinner as="span" animation="border" variant="primary" />
                </center>
              ) : (
                <div className="fullwidth-dropzone sm-6 md-6 lg-6 mb-3">
                  {selectFile !== "" && (
                    <object
                      data={selectFile}
                      type="application/pdf"
                      className="previewImage w-100"
                    />
                  )}
                </div>
              )}
            </Form.Group>
          </div>
        </Modal.Body>

        <Modal.Footer className="d-flex justify-content-end">
          <Button type="submit" className="w-25">
            Save
          </Button>
        </Modal.Footer>
      </Form>
    </>
  );
};
