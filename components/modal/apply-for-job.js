import { useFormik } from "formik";
import React, { useState } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import { Form, Spinner, Button, FormText, Card } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { TextAreaField, TextField } from "components/form-fields";
import {
  toggleModals,
  uploadPostDocument,
  getJobDetail,
  getSuggestedJobList,
} from "store/actions";

import { APPLY_FOR_JOB, showMessageNotification } from "utils";
import { applyForJob } from "store/actions/learningInstitute";
import Dropzone from "react-dropzone";
import { useEffect } from "react";
import { trackEvent } from "@components/segment-analytics";

/*******************   
 @purpose : User Set uploadPDF
 @Author : INIC
 ******************/
export const ApplyJob = ({
  jobId,
  instituteId,
  companyId,
  candidateId,
  getJobListParams,
  jobData,
}) => {
  const [lang] = useTranslation("language");
  const [selectFile, setSelectFile] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      reason: "",
      resume: "",
      candidateId,
      jobId,
      instituteId,
      ...(companyId !== undefined &&
        companyId !== null &&
        companyId !== "" && { companyId }),
    },
    enableReinitialize: true,
    validationSchema: APPLY_FOR_JOB(lang),
    onSubmit: async (values) => {
      dispatch(applyForJob(values)).then((res) => {
        if (res) {
          formik.resetForm();
          setSelectFile("");
          trackEvent("job_application_submitted"); // track segment event
          showMessageNotification(res?.message);
          dispatch(toggleModals({ applyforjob: false }));
          dispatch(getJobDetail(jobId));
          const dataParams = getJobListParams();
          dispatch(getSuggestedJobList(dataParams));
        }
      });
    },
  });

  const handleFileChange = async (event) => {
    const documentData = new FormData();
    documentData.append("file", event);
    setLoading(true);
    const response = await dispatch(uploadPostDocument(documentData));
    if (response) {
      formik?.setFieldValue("resume", response.fileUrl);
      setSelectFile(response.fileUrl);
      setLoading(false);
    }
  };

  useEffect(() => {
    setSelectFile("");
  }, [jobId]);

  return (
    <div>
      <Form onSubmit={formik.handleSubmit}>
        <Card>
          <div className="modal-body p-0">
            <div className="px-4 pt-4 pb-0">
              <h6 className="mb-0">
                {lang("JOBS.JOB_OFFERS.PROVIDE_BASIC_INFO")}
              </h6>
            </div>
            <div className="p-4">
              <div className="mb-3">
                <span className="form-label">
                  {lang("JOBS.JOB_OFFERS.WHY_SUITABLE_FOR_JOB")}*
                </span>
                <Form.Group>
                  <TextField
                    as="textarea"
                    name="reason"
                    placeholder={lang("JOBS.JOB_OFFERS.WRITE_HERE")}
                    rows={4}
                    formik={formik}
                    className="border-radius-8"
                    resizeable={true}
                  />
                  <div className="input-notes mt-2 text-body-14 font-weight-normal text-gray d-flex align-items-center">
                    <span class="bx bxs-info-circle mr-2 font-20"></span>
                    <span>{lang("JOBS.JOB_OFFERS.MAX_3000")}</span>
                  </div>
                </Form.Group>
              </div>
              <Form.Group className="w-xl-75-100 mb-0">
                <p className="mb-2 text-body-14 font-weight-normal">
                  {lang("JOBS.JOB_OFFERS.UPLOAD_RESUME")}*
                </p>
                <div className="fullwidth-dropzone sm-6 md-6 lg-6">
                  <Dropzone
                    onDrop={(acceptedFiles) =>
                      handleFileChange(acceptedFiles[0])
                    }
                    multiple={false}
                    accept={"application/pdf"}
                    name={"resume"}
                    maxSize={10485760}
                    style="Width: 100%"
                    formik={formik}
                  >
                    {({ getRootProps, getInputProps }) => (
                      <section>
                        <div
                          className="dropzone-wrap-xl text-center pointer w-100 border-radius-8"
                          {...getRootProps()}
                        >
                          <input {...getInputProps()} />
                          <em className="icon icon-upload-cloud font-44"></em>
                          <p className="m-0 text-body-14 text-gray font-weight-normal">
                            {lang("DASHBOARD.UPLOAD_TITLE")}
                          </p>
                        </div>
                      </section>
                    )}
                  </Dropzone>
                  {formik?.touched["resume"] && formik?.errors["resume"] && (
                    <FormText className={"error"}>
                      {formik?.errors["resume"]}
                    </FormText>
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
          </div>
          <div className="custom-footer text-center d-flex border-top border-geyser justify-content-between">
            <div className="border-top border-geyser w-100">
              <div className="d-flex justify-content-between w-100 py-3 px-4 bg-white">
                <div
                  className="cancel-button-jobsection"
                  onClick={() => {
                    formik.resetForm();
                    setSelectFile("");
                    dispatch(toggleModals({ applyforjob: false }));
                  }}
                >
                  {lang("JOBS.JOB_OFFERS.CANCEL")}
                </div>
                <div
                  className="appy-button-jobsection"
                  onClick={
                    jobData?.jobCandidateDetails?.length
                      ? null
                      : () => {
                          formik.handleSubmit();
                        }
                  }
                >
                  {jobData?.jobCandidateDetails?.length
                    ? lang("JOBS.JOB_OFFERS.APPLIED")
                    : lang("JOBS.JOB_OFFERS.APPLY_NOW")}
                </div>
              </div>
            </div>
          </div>
        </Card>
      </Form>
    </div>
  );
};
