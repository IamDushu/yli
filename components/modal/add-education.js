import React from "react";
import { Button, Card, Modal } from "react-bootstrap";
import { useFormik, FormikProvider, FieldArray } from "formik";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import PerfectScrollbar from "react-perfect-scrollbar";
import { getUserProfileData, getSkillsData, toggleModals } from "store/actions";
import EducationDetails from "components/sign-up-tabs/education-details";
import { EDIT_EDUCATION_SCHEMA } from "utils";
import { addEducation } from "store/actions/education";

export const AddEducation = () => {
  const [lang] = useTranslation("language");
  const dispatch = useDispatch();

  const initialValues = {
    educationDetails: [
      {
        institute: "",
        education: "",
        fieldOfStudy: "",
        startDate: "",
        endDate: "",
        grade: "",
        activities: "",
        description: "",
      },
    ],
  };
  const formik = useFormik({
    initialValues: initialValues,

    validationSchema: () => EDIT_EDUCATION_SCHEMA(lang),
    onSubmit: async (values) => {
      await dispatch(addEducation(values.educationDetails));
      await dispatch(getSkillsData());
      await dispatch(toggleModals({ addeducation: false }));
      await dispatch(getUserProfileData());
    },
  });

  return (
    <>
      <Modal.Body>
        <Card className="card-md">
          <PerfectScrollbar>
            <Card.Body className="p-4">
              <FormikProvider value={formik}>
                <FieldArray
                  name="educationDetails"
                  validateOnChange={true}
                  render={(arrayHelpers) => {
                    const educationDetails = formik.values.educationDetails;

                    return (
                      <div>
                        {educationDetails && educationDetails.length > 0
                          ? educationDetails.map((educationDetail, index) => (
                              <div key={educationDetail.id}>
                                <h2 className="font-20 font-md-18 mb-4 pb-1">
                                  Educational Details {index + 1}
                                  {educationDetails.length > 1 && (
                                    <em
                                      className="bx custom-bx bx-x pointer pl-5 float-right"
                                      onClick={() => arrayHelpers.remove(index)} // remove a friend from the list
                                    ></em>
                                  )}
                                </h2>
                                <EducationDetails
                                  formik={formik}
                                  i={index}
                                  type="profile"
                                />
                              </div>
                            ))
                          : null}

                        {educationDetails.length < 3 && (
                          <div className="text-right mt-2 d-flex justify-content-end">
                            <Button
                              size="sm"
                              variant="outline-info py-12 px-4 w-100 d-flex align-items-center justify-content-center"
                              type="button"
                              onClick={() => {
                                arrayHelpers.push({
                                  institute: "",
                                  education: "",
                                  fieldOfStudy: "",
                                  startDate: "",
                                  endDate: "",
                                  grade: "",
                                  activities: "",
                                  description: "",
                                });
                              }}
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
