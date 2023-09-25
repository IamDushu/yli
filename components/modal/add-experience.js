import React from "react";
import { Button, Card, Modal } from "react-bootstrap";
import { FieldArray, FormikProvider, useFormik } from "formik";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import PerfectScrollbar from "react-perfect-scrollbar";
import { getUserProfileData, getSkillsData, toggleModals } from "store/actions";
import Experience from "components/sign-up-tabs/experience";
import { EDIT_EXPERIENCE_SCHEMA } from "utils";
import { addExperience } from "store/actions/experience";

export const AddExperience = () => {
  const [lang] = useTranslation("language");
  const dispatch = useDispatch();

  const initialValues = {
    experience: [
      {
        role: "",
        employmentType: "",
        companyName: "",
        location: "",
        startDate: "",
        endDate: "",
        headline: "",
        industry: "",
        description: "",
      },
    ],
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: () => EDIT_EXPERIENCE_SCHEMA(lang),
    onSubmit: async (values) => {
      await dispatch(addExperience(values.experience));
      await dispatch(toggleModals({ addexperience: false }));
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
                  name="experience"
                  validateOnChange={true}
                  render={(arrayHelpers) => {
                    const experience = formik.values.experience;
                    return (
                      <div>
                        {experience && experience.length > 0
                          ? experience.map((exp, index) => (
                              <div key={exp.id}>
                                <h2 className="font-28 font-md-22 mb-3 pb-1">
                                  Experience {index + 1}
                                  {experience.length > 1 && (
                                    <em
                                      className="bx custom-bx bx-x pointer pl-5 float-right"
                                      onClick={() => arrayHelpers.remove(index)} // remove a friend from the list
                                    ></em>
                                  )}
                                </h2>

                                <Experience
                                  i={index}
                                  formik={formik}
                                  type="profile"
                                />
                              </div>
                            ))
                          : null}

                        {experience.length < 3 && (
                          <div className="text-right mt-2">
                            <Button
                              size="sm"
                              variant="outline-info py-12 px-4 w-100 d-flex align-items-center justify-content-center"
                              type="button"
                              onClick={() =>
                                arrayHelpers.push({
                                  role: "",
                                  employmentType: "",
                                  companyName: "",
                                  location: "",
                                  startDate: "",
                                  endDate: "",
                                  headline: "",
                                  industry: "",
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
