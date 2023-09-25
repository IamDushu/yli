import { SelectField, TextAreaField } from "components/form-fields";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { Col, Form, Modal, Row, FormText } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import AsyncSelect from "react-select/async";
import { useDispatch, useSelector } from "react-redux";
import {
  endorseRequest,
  getMyConnectionsList,
  toggleModals,
  userSkillsList,
} from "store/actions";
import { REQUEST_FOR_RECOMMENDATION, onImageError } from "utils";

/***************************************************
  @Purpose :Request for recommendation for the user 
  @Parameter : {}
  @Author : INIC
  ***************************************************/
const RequestForRecommendation = () => {
  const [lang] = useTranslation("language");
  const dispatch = useDispatch();
  const { skillArea } = useSelector((state) => state.ui);

  /***************************************************
  @Purpose :Formik for the request for recommendation 
  @Parameter : {}
  @Author : INIC
  ***************************************************/
  const formik = useFormik({
    initialValues: {
      userSkillIds: [],
      connectionUserIds: [],
      message: "",
    },
    validationSchema: REQUEST_FOR_RECOMMENDATION(lang),
    onSubmit: async (values) => {
      const data = {
        userSkillIds: values?.userSkillIds?.map(({ value }) => value) ?? [],
        connectionUserIds:
          values?.connectionUserIds?.map(({ value }) => value) ?? [],
        message: values.message,
      };
      await dispatch(endorseRequest(data));
      await dispatch(toggleModals({ requestforrecommendation: false }));
      await dispatch(toggleModals({ requestskills: true }));
    },
  });
  /***************************************************
  @Purpose :loading options for async select (connections,skills)
  @Parameter : {}
  @Author : YLIWAY
  ***************************************************/

  const loadConnectionOptions = (inputValue, callback) => {
    if (!inputValue) {
      callback([]);
    } else {
      setTimeout(() => {
        dispatch(
          getMyConnectionsList({
            page: 1,
            pagesize: 20,
            search: inputValue || "",
          })
        ).then((res) => {
          const connectionList = [];
          res?.payload?.map((data) => {
            connectionList.push({
              label: `${data?.firstName || ""} ${data?.lastName || ""}`,
              value: data?.userId,
              profilePicURL: data?.profilePicURL,
            });
          });
          callback(connectionList);
        });
      }, 500);
    }
  };
  const loadSkillOptions = (inputValue, callback) => {
    if (!inputValue) {
      callback([]);
    } else {
      setTimeout(() => {
        dispatch(
          userSkillsList(skillArea, {
            page: 1,
            pagesize: 50,
            searchText: inputValue || "",
          })
        ).then((res) => {
          const skillList = [];
          res?.data?.map((data) => {
            skillList.push({
              label: data.name,
              value: data.userSkillId,
            });
          });

          callback(skillList);
        });
      }, 500);
    }
  };

  /************************************** 
  @Purpose : Render Html Components
  @Parameter : {}
  @Author : INIC
  *************************************/
  return (
    <Form onSubmit={formik.handleSubmit}>
      <Modal.Body>
        <Row>
          <Col md={12}>
            <Form.Group>
              <Form.Label>
                {lang("SKILLS.TEXT.SKILLS")}
                <sup>*</sup>
              </Form.Label>
              <AsyncSelect
                loadingMessage={() => lang("COMMON.LOADING")}
                placeholder={lang("COMMON.SELECT")}
                isMulti
                name="userSkillIds"
                type="multi"
                menuPortalTarget={document?.querySelector("body")}
                classNamePrefix={"custom-select"}
                onChange={(selected) => {
                  formik?.setFieldValue("userSkillIds", selected);
                }}
                loadOptions={loadSkillOptions}
                noOptionsMessage={({ inputValue }) =>
                  inputValue
                    ? lang("COMMON.NO_OPTIONS")
                    : lang("SKILLS.SEARCH_FOR_SKILLS")
                }
              />
              {formik?.touched["userSkillIds"] &&
                formik?.errors["userSkillIds"] && (
                  <FormText className="text-danger">
                    {formik?.errors["userSkillIds"]}
                  </FormText>
                )}
            </Form.Group>
          </Col>

          <Col md={12}>
            <Form.Group>
              <Form.Label>
                {lang("SKILLS.TEXT.CONNECTION")}
                <sup>*</sup>
              </Form.Label>
              <AsyncSelect
                loadingMessage={() => lang("COMMON.LOADING")}
                placeholder={lang("COMMON.SELECT")}
                isMulti
                name="connectionUserIds"
                menuPortalTarget={document?.querySelector("body")}
                classNamePrefix={"custom-select"}
                onChange={(selected) => {
                  formik?.setFieldValue("connectionUserIds", selected);
                }}
                type="multi"
                loadOptions={loadConnectionOptions}
                noOptionsMessage={({ inputValue }) =>
                  inputValue
                    ? lang("COMMON.NO_OPTIONS")
                    : lang("SKILLS.SEARCH_FOR_CONNECTIONS")
                }
                getOptionLabel={(options) => (
                  <div className="d-flex align-items-center" key={options?.id}>
                    <div>
                      <img
                        src={options?.profilePicURL ?? ""}
                        width="40"
                        height="40"
                        className="rounded-circle"
                        onError={(e) =>
                          onImageError(e, "profile", options?.label)
                        }
                      />
                    </div>
                    <div className="ml-2">{options?.label}</div>
                  </div>
                )}
              />
              {formik?.touched["connectionUserIds"] &&
                formik?.errors["connectionUserIds"] && (
                  <FormText className="text-danger">
                    {formik?.errors["connectionUserIds"]}
                  </FormText>
                )}
            </Form.Group>
          </Col>

          <Col md={12}>
            <Form.Group>
              <TextAreaField
                name="message"
                placeHolder={lang("JOBS.JOB_OFFERS.WRITE_HERE")}
                formik={formik}
                required={false}
                label={lang("COMMON.MESSAGE")}
              />
            </Form.Group>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer className="custom-footer text-center d-flex border-top border-geyser justify-content-between">
        <button
          type="button"
          className="btn btn-btn btn-dark font-weight-semibold"
          onClick={() => {
            dispatch(toggleModals({ requestforrecommendation: false }));
          }}
        >
          {lang("COMMON.CANCEL")}
        </button>
        <button
          type="submit"
          className="btn btn-btn btn-info font-weight-semibold px-30"
        >
          {lang("COMMON.SUBMIT")}
        </button>
      </Modal.Footer>
    </Form>
  );
};

export default RequestForRecommendation;
