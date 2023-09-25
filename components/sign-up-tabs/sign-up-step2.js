import React, { Fragment, useEffect, useState } from "react";
import { Button, Row, Col, Form, FormText } from "react-bootstrap";
import { FieldArray, FormikProvider, useFormik } from "formik";
import { REGISTRATION_STEP_TWO_SCHEMA } from "./../../utils";
import { SelectField } from "../form-fields";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { signUpDetails } from "../../store/actions";
import { LanguageList } from "store/actions/room";
/******************** 
  @purpose :Registration Step 2
  @Parameter : {changeStep}
  @Author : INIC
  ******************/
const SignUpStep2 = ({ changeStep }) => {
  const [lang] = useTranslation("language");
  const [langOptions, setLangOptions] = useState([]);
  const { languageList } = useSelector((state) => state.room);
  const dispatch = useDispatch();
  /******************** 
  @purpose :Language List
  @Parameter : {}
  @Author : INIC
  ******************/
  useEffect(() => {
    dispatch(LanguageList());
  }, []);
  /******************** 
  @purpose :Language List options
  @Parameter : {}
  @Author : INIC
  ******************/
  const optionsLevel = [
    { value: "Elementary", label: "Elementary" },
    { value: "Intermediate", label: "Intermediate" },
    { value: "Advanced", label: "Advanced" },
    { value: "Mother Tongue", label: "Mother Tongue" },
  ];
  /******************** 
  @purpose :Registration Step 2
  @Parameter : {changeStep}
  @Author : INIC
  ******************/
  const formik = useFormik({
    initialValues: {
      languageSkills: [
        {
          name: "",
          level: "",
        },
      ],
    },
    validationSchema: REGISTRATION_STEP_TWO_SCHEMA(lang),
    onSubmit: (values) => {
      const { languageSkills, ...rest } = values;
      dispatch(
        signUpDetails({ languageSkills: checkArrayEmpty(languageSkills) })
      );
      changeStep(3);
    },
  });

  const checkArrayEmpty = (arr) => {
    let x = [];
    arr.forEach((element) => {
      if (element.name !== "" || element.level !== "") {
        x.push(element);
      }
    });
    return x;
  };
  /******************** 
@purpose : Used for get Languages
@Parameter : {  }
@Author : INIC
******************/
  const getLanguages = () => {
    let selectedLang = formik.values.languageSkills.map((value) => {
      return value["name"];
    });
    const languages = [];
    languageList.map((langData) => {
      if (!selectedLang.includes(langData.name)) {
        languages.push({ label: langData.name, value: langData.name });
      }
    });
    setLangOptions(languages);
  };

  return (
    <Fragment>
      <Form onSubmit={formik.handleSubmit}>
        <div className="sign-up-step2 mt-md-4 pt-md-2">
          <FormikProvider value={formik}>
            <FieldArray
              name="languageSkills"
              validateOnChange={true}
              render={(arrayHelpers) => {
                const languageSkills = formik.values.languageSkills;
                return (
                  <div>
                    {languageSkills && languageSkills.length > 0
                      ? languageSkills.map((languageSkill, index) => (
                          <div key={languageSkill.id}>
                            <h2 className="font-28 font-md-22 mb-3 pb-1">
                              {lang("SIGN_UP.LANGUAGES_SKILLS")} {index + 1}
                              {languageSkills.length > 1 && (
                                <em
                                  className="bx custom-bx bx-x pointer pl-5 float-right"
                                  onClick={() => arrayHelpers.remove(index)} // remove a friend from the list
                                ></em>
                              )}
                            </h2>
                            <p className="font-medium font-18 font-md-16 font-sm-14">
                              {lang("SIGN_UP.CAN_YOU_TELL")}
                            </p>

                            <Row>
                              <Col sm={6}>
                                <Form.Group controlId="signuplanguages">
                                  <Form.Label>
                                    {lang("SIGN_UP.SPOKEN_LANGUAGES")}
                                  </Form.Label>
                                  <div className="custom-selectpicker">
                                    <SelectField
                                      options={langOptions}
                                      onMenuOpen={getLanguages}
                                      name={`languageSkills.${index}.name`}
                                      formik={formik}
                                    />
                                  </div>
                                  {formik?.touched["languageSkills"]?.[index]
                                    ?.name &&
                                    formik?.errors["languageSkills"]?.[index]
                                      ?.name && (
                                      <FormText className={"error"}>
                                        {
                                          formik?.errors["languageSkills"]?.[
                                            index
                                          ]?.name
                                        }
                                      </FormText>
                                    )}
                                </Form.Group>
                              </Col>
                              <Col sm={6}>
                                <Form.Group controlId="signupLevel">
                                  <Form.Label>
                                    {lang("ROOMS_FILTER.LEVEL")}
                                  </Form.Label>
                                  <div className="custom-selectpicker">
                                    <SelectField
                                      options={optionsLevel}
                                      name={`languageSkills.${index}.level`}
                                      formik={formik}
                                    />
                                  </div>
                                  {formik?.touched["languageSkills"]?.[index]
                                    ?.level &&
                                    formik?.errors["languageSkills"]?.[index]
                                      ?.level && (
                                      <FormText className={"error"}>
                                        {
                                          formik?.errors["languageSkills"]?.[
                                            index
                                          ]?.level
                                        }
                                      </FormText>
                                    )}
                                </Form.Group>
                              </Col>
                            </Row>
                          </div>
                        ))
                      : null}

                    {languageSkills.length < 3 && (
                      <div className="text-right mt-2">
                        <Button
                          size="sm"
                          variant="outline-info text-uppercase py-12 px-4"
                          type="button"
                          onClick={() =>
                            arrayHelpers.push({
                              name: "",
                              level: "",
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

          <div className="text-center mt-md-5 pt-4">
            <Button variant="info text-uppercase btn-xxl" type="submit">
              {lang("GROWTH_MODEL.GM_NEXT_BUTTON")}
            </Button>
            <span
              className="float-right mt-14 text-info pointer"
              onClick={() => {
                changeStep(3);
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
export default SignUpStep2;
