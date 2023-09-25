import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Button, Row, Col, Form, Modal } from "react-bootstrap";
import { toggleModals } from "store/actions";
import {
  addGrowthModelActivities,
  getGrowthModelActivities,
  getGrowthModelActivitiesStatus,
} from "store/actions/growth";
import {
  growthModelResourceFilterOptions,
  growthModelTypeFilterOptionschange,
  ADD_MORE_GM_SCHEMA,
  showMessageNotification,
} from "utils";
import { TextField, SelectField } from "components/form-fields";
import { useFormik } from "formik";

/*******************   
@purpose : User Set AddMoreActivity
@Author : INIC
******************/
export const AddMoreActivity = () => {
  const [lang] = useTranslation("language");

  const [optionsSkill, setOptionsSkill] = useState([]);

  const setTypeOptions = (value) => {
    switch (value) {
      case "Hard Skills":
        setOptionsSkill(growthModelTypeFilterOptionschange);
        break;
      case "Soft Skills":
        setOptionsSkill(growthModelTypeFilterOptionschange);
        break;
      case "Mindset":
        setOptionsSkill(growthModelTypeFilterOptionschange);
        break;
      case "Traction":
        setOptionsSkill(growthModelTypeFilterOptionschange);
        break;
      case "Distribution":
        setOptionsSkill(growthModelTypeFilterOptionschange);
        break;
      case "Support":
        setOptionsSkill(growthModelTypeFilterOptionschange);
        break;
      case "Content":
        setOptionsSkill(growthModelTypeFilterOptionschange);
        break;
      default:
        setOptionsSkill([]);
        break;
    }
  };

  const formik = useFormik({
    initialValues: {
      skillArea: "",
      skillType: "",
      title: "",
      link: "",
    },
    validationSchema: ADD_MORE_GM_SCHEMA(lang),
    onSubmit: (values) => {
      let data = {
        growthModelId: growthModelDetail?.id,
        activities: [
          {
            skillArea: values?.skillArea,
            skillTypes: [
              {
                typeName: values?.skillType,
                data: [
                  { activityLink: values?.link, activityTitle: values?.title },
                ],
              },
            ],
          },
        ],
      };

      dispatch(addGrowthModelActivities(data)).then(() => {
        const payload = {
          resource: "",
          acitivityType: "",
          status: "",
          keyword: "",
          page: 1,
          limit: 5,
        };
        setTimeout(() => {
          dispatch(getGrowthModelActivities(growthModelDetail?.id, payload));
          dispatch(getGrowthModelActivitiesStatus(growthModelDetail?.id));

          showMessageNotification("Details added successfully");
        }, 1000);
      });
      dispatch(toggleModals({ addmoreactivity: false }));
    },
  });

  useEffect(() => {
    if (formik?.values?.skillArea !== "") {
      setTypeOptions(formik?.values?.skillArea);
    }
  }, [formik?.values?.skillArea]);

  const dispatch = useDispatch();
  const { growthModelDetail } = useSelector(({ growth }) => growth);

  return (
    <>
      <Form onSubmit={formik?.handleSubmit}>
        <Modal.Body className="px-4 pt-4">
          <Row>
            <Col xs={12} sm={6}>
              <Form.Group controlId="addActivitySelectBlock">
                <Form.Label>Select Skill Area *</Form.Label>
                <div className="custom-selectpicker">
                  <SelectField
                    menuPortalTarget={document?.querySelector("body")}
                    classNamePrefix={"custom-select"}
                    name="skillArea"
                    options={growthModelResourceFilterOptions}
                    formik={formik}
                    placeholder="Select Skill Area"
                  />
                </div>
              </Form.Group>
            </Col>
            <Col xs={12} sm={6}>
              <Form.Group controlId="addActivityType">
                <Form.Label>Select Activity Type *</Form.Label>
                <div className="custom-selectpicker">
                  <SelectField
                    menuPortalTarget={document?.querySelector("body")}
                    classNamePrefix={"custom-select"}
                    name="skillType"
                    options={optionsSkill}
                    formik={formik}
                    placeholder="Select Activity Type"
                  />
                </div>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <Form.Group controlId="addActivityLink">
                <TextField
                  type="url"
                  label="Enter Activity Link"
                  placeholder="Enter Activity Link"
                  name="link"
                  formik={formik}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <Form.Group controlId="addActivityTitle">
                <TextField
                  type="text"
                  label="Enter Activity Title"
                  placeholder="Enter Activity Title"
                  name="title"
                  formik={formik}
                />
              </Form.Group>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer className="footer border-top border-geyser p-4 pt-3">
          <div className="text-center d-flex flex-wrap justify-content-center flex-sm-nowrap activity-submit mt-0 w-100">
            <Button
              variant="outline-info px-4 btn-md mx-sm-3 mb-3 mb-sm-0"
              onClick={() => dispatch(toggleModals({ addmoreactivity: false }))}
            >
              Back
            </Button>
            <Button variant="info px-4 btn-md mx-sm-3" type="submit">
              Submit
            </Button>
          </div>
        </Modal.Footer>
      </Form>
    </>
  );
};
