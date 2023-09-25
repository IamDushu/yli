import React from "react";
import { Button, Card, Modal } from "react-bootstrap";
import { FieldArray, FormikProvider, useFormik } from "formik";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import PerfectScrollbar from "react-perfect-scrollbar";
import { EDIT_CERTIFICATE_SCHEMA } from "utils";
import { addCertification } from "store/actions/certification";
import Certifications from "components/sign-up-tabs/certifications";
import { getUserProfileData, getSkillsData, toggleModals } from "store/actions";

export const AddCertificateForm = () => {
  const [lang] = useTranslation("language");
  const dispatch = useDispatch();

  const initialValues = {
    certificate: [
      {
        title: "",
        issuingOrganization: "",
        uploadURL: "",
        startDate: "",
        endDate: "",
        credentialId: "",
        url: "",
        description: "",
      },
    ],
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: () => EDIT_CERTIFICATE_SCHEMA(lang),
    onSubmit: async (values) => {
      await dispatch(addCertification(values.certificate));
      await dispatch(getSkillsData());
      await dispatch(toggleModals({ addcertificate: false }));
      await dispatch(getUserProfileData());
    },
  });

  return (
    <>
      <Modal.Body>
        <Card className="card-md">
          <PerfectScrollbar>
            <Card.Body>
              <FormikProvider value={formik}>
                <FieldArray
                  name="certificate"
                  validateOnChange={true}
                  render={(arrayHelpers) => {
                    const certificate = formik.values.certificate;
                    return (
                      <div>
                        {certificate && certificate.length > 0
                          ? certificate.map((cer, index) => (
                              <div key={cer.id}>
                                <h2 className="font-28 font-md-22 mb-3 pb-1">
                                  Certifications {index + 1}
                                  {certificate.length > 1 && (
                                    <em
                                      className="bx custom-bx bx-x pointer pl-5 float-right"
                                      onClick={() => arrayHelpers.remove(index)} // remove a friend from the list
                                    ></em>
                                  )}
                                </h2>

                                <Certifications
                                  i={index}
                                  formik={formik}
                                  type="profile"
                                  data={data}
                                />
                              </div>
                            ))
                          : null}

                        {certificate.length < 3 && (
                          <div className="text-right mt-2">
                            <Button
                              size="sm"
                              variant="outline-info py-12 px-4 w-100 d-flex align-items-center justify-content-center"
                              type="button"
                              onClick={() =>
                                arrayHelpers.push({
                                  title: "",
                                  issuingOrganization: "",
                                  uploadURL: "",
                                  startDate: "",
                                  endDate: "",
                                  credentialId: "",
                                  url: "",
                                  description: "",
                                })
                              }
                            >
                              <em className="icon icon-plus-primary font-14 pr-2"></em>
                              Add More
                            </Button>
                          </div>
                        )}
                      </div>
                    );
                  }}
                />
              </FormikProvider>
            </Card.Body>
          </PerfectScrollbar>
        </Card>
      </Modal.Body>
      <Modal.Footer className="custom-footer text-center d-flex justify-content-between">
        <Button
          onClick={formik.handleSubmit}
          variant="btn btn-info font-weight-semibold px-5"
          type="submit"
        >
          Save
        </Button>
      </Modal.Footer>
    </>
  );
};
