import React, { Fragment, useState } from "react";
import { Button, Form } from "react-bootstrap";
import Experience from "components/sign-up-tabs/experience";
import Certifications from "components/sign-up-tabs/certifications";
import { REGISTRATION_STEP_THREE_SCHEMA, setCookie } from "utils";
import { useTranslation } from "react-i18next";
import { FieldArray, FormikProvider, useFormik } from "formik";
import { useDispatch } from "react-redux";
import { signUpDetails } from "../../store/actions";
import { toggleModals } from "store/actions";
/******************** 
  @purpose :Signup Step 2
  @Parameter : {changeStep}
  @Author : INIC
  ******************/
const SignUpStep3 = () => {
  const [lang] = useTranslation("language");
  const [index, setIndex] = useState("");
  const dispatch = useDispatch();
  /******************** 
  @purpose :Registration Step 3
  @Parameter : {changeStep}
  @Author : INIC
  ******************/
  const formik = useFormik({
    initialValues: {
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
          currentlyWorking: "",
          instituteId: "",
        },
      ],
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
    },
    validationSchema: REGISTRATION_STEP_THREE_SCHEMA(lang),
    onSubmit: (values) => {
      values.experience[index].endDate = values.experience[index]
        .currentlyWorking
        ? ""
        : values.experience[index].endDate;
      let rest = {
        experience: checkArrayEmptyExperience(values.experience),
        certificate: checkArrayEmptyCertificate(values.certificate),
      };
      dispatch(signUpDetails({ ...rest }));
      setCookie("sortBy", "Growth");
      localStorage.setItem("groupTab", "groups");
      dispatch(toggleModals({ thankyou: true }));
    },
  });

  const checkArrayEmptyExperience = (arr) => {
    let x = [];
    arr.forEach((element) => {
      if (
        element.role !== "" ||
        element.location !== "" ||
        element.description !== ""
      ) {
        x.push(element);
      }
    });
    return x;
  };

  const checkArrayEmptyCertificate = (arr) => {
    let x = [];
    arr.forEach((element) => {
      if (
        element.title !== "" ||
        element.uploadURL !== "" ||
        element.description !== "" ||
        element.url !== ""
      ) {
        x.push(element);
      }
    });
    return x;
  };

  return (
    <Fragment>
      <Form onSubmit={formik.handleSubmit}>
        <div className="sign-up-step3 mt-md-4 pt-2">
          <div className="experience mb-5">
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
                                {lang("EXPERIENCE.TEXT.EXPERIENCE")} {index + 1}
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
                                type="signUp"
                              />
                            </div>
                          ))
                        : null}

                      {experience.length < 3 && (
                        <div className="text-right mt-2">
                          <Button
                            size="sm"
                            variant="outline-info text-uppercase py-12 px-4"
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
                                currentlyWorking: "",
                                instituteId: "",
                              })
                            }
                          >
                            <em className="icon icon-plus-circle font-20 pr-2"></em>
                            {lang("COMMON.ADD_MORE")}
                          </Button>
                        </div>
                      )}
                    </div>
                  );
                }}
              />
            </FormikProvider>
          </div>
          <div className="certifications mt-5 mt-xl-0">
            <FormikProvider value={formik}>
              <FieldArray
                name="certificate"
                validateOnChange={true}
                render={(arrayHelpers) => {
                  const certificate = formik.values.certificate;
                  return (
                    <div>
                      {certificate && certificate.length > 0
                        ? certificate.map((cer, index) => {
                            setIndex(index);
                            return (
                              <div key={cer.id}>
                                <h2 className="font-28 font-md-22 mb-3 pb-1">
                                  {lang("MY_ACCOUNTS.COMMON.CERTIFICATE")}{" "}
                                  {index + 1}
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
                                  type="signUp"
                                />
                              </div>
                            );
                          })
                        : null}

                      {certificate.length < 3 && (
                        <div className="text-right mt-2">
                          <Button
                            size="sm"
                            variant="outline-info text-uppercase py-12 px-4"
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
                            <em className="icon icon-plus-circle font-20 pr-2"></em>
                            {lang("COMMON.ADD_MORE")}
                          </Button>
                        </div>
                      )}
                    </div>
                  );
                }}
              />
            </FormikProvider>
          </div>

          <div className="text-center mt-sm-5 pt-4">
            <Button variant="info text-uppercase btn-xxl" type="submit">
              {lang("COMMON.SAVE")}
            </Button>
            <span
              className="float-right mt-14 text-info pointer"
              onClick={() => {
                dispatch(toggleModals({ thankyou: true }));
              }}
            >
              {lang("SIGN_UP.SKIP")}
            </span>
          </div>
        </div>
      </Form>
    </Fragment>
  );
};
export default SignUpStep3;
