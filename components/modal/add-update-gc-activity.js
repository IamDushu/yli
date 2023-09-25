// external packages
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useFormik } from "formik";
import {
  Button,
  Row,
  Col,
  Form,
  Modal,
  Card,
  FormLabel,
} from "react-bootstrap";
import moment from "moment";
import { useDispatch,useSelector,shallowEqual} from "react-redux";


// internal packages
import { GROWTH_CONNECTIONS_ACTIVITY_SCHEMA } from "utils";
import { TextField } from "components/form-fields";
import DatePickerField from "components/form-fields/date-picker-field";
import { addUpdateGrowthPartnerActivities, toggleModals } from "store/actions";

export const AddUpdateGCactivity = ({connectionActivity,getActivities}) => {
  const [lang] = useTranslation("language");
  const dispatch = useDispatch();
  const {gcActivityData} = useSelector(
    ({ ui }) => ui.modals,
    shallowEqual
  );
  
  /******************** 
  @purpose : To intialize formik
  @Parameter : {}
  @Author : YLIWAY
  ******************/
  const formik = useFormik({
    initialValues: {
      id: gcActivityData?.id || "",
      activity: gcActivityData?.activity || "",
      date: (gcActivityData?.date)?moment(gcActivityData?.date).format("DD/MM/YYYY"):moment().format("DD/MM/YYYY"),
      activityGoal: gcActivityData?.activityGoal || "",
      note: gcActivityData?.note || "",
    },
    enableReinitialize: true,
    validationSchema: GROWTH_CONNECTIONS_ACTIVITY_SCHEMA(lang),
    onSubmit: (values) => {
      const data = {
        ...values,
        connectionUserId: connectionActivity?.connectionUserId,
      };
      if(!(data?.id)){
      delete data.id
      }
      dispatch(addUpdateGrowthPartnerActivities(data)).then((res) => {
        if (res?.status === 1) {
          getActivities();
          dispatch(toggleModals({ addUpdateGCactivity: false }));
          formik.resetForm();
        }
      });
    },
  });
  return (
    <>
      <Modal.Body>
        <Card className="card-md border-0">
          <Card.Body>
            <Row className="mb-4">
              <Col sm={6} lg={6}>
                <TextField
                  type="text"
                  name="activity"
                  label={lang("GROWTH_CONNECTIONS.ACTIVITY.TITLE")}
                  formik={formik}
                  placeholder={lang("GROWTH_CONNECTIONS.ENTER")}
                  className="py-1 br-8 b-dark px-1"
                />
              </Col>
              <Col sm={6} lg={6}>
                <FormLabel>
                  {lang("GROWTH_CONNECTIONS.DATE")}
                  <sup className="text-danger">*</sup>
                </FormLabel>
                <DatePickerField
                  type="date"
                  name="date"
                  formik={formik}
                  placeholder="Select"
                  isValidDate={(current) => {
                    const today = moment().startOf("day");
                    return current.isSameOrAfter(today);
                  }}
                  timeFormat={false}
                  className="br-8  px-1"
                />
              </Col>
            </Row>
            <Row>
              <Col sm={12} lg={12}>
                <TextField
                  type="text"
                  name="activityGoal"
                  label={lang("GROWTH_CONNECTIONS.ACTIVITY.GOAL")}
                  formik={formik}
                  placeholder={lang("GROWTH_CONNECTIONS.ENTER")}
                  className="py-1 br-8 b-dark px-1"
                  as="textarea"
                  count={300}
                  rows={3}
                />
              </Col>
            </Row>
            <Row>
              <Col sm={12} lg={12}>
                <TextField
                  type="text"
                  name="note"
                  label={lang("GROWTH_CONNECTIONS.ACTIVITY.NOTES")}
                  formik={formik}
                  placeholder={lang("GROWTH_CONNECTIONS.WRITE_HERE")}
                  className="py-1 br-8 b-dark px-1 w-100"
                  count={2000}
                  as="textarea"
                  rows={4}
                />
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Modal.Body>
      <Modal.Footer className="custom-footer text-center d-flex">
        <Button
          onClick={formik.handleSubmit}
          variant="btn btn-info font-weight-semibold px-5 ml-auto"
        >
          {lang("COMMON.SAVE")}
        </Button>
      </Modal.Footer>
    </>
  );
};
