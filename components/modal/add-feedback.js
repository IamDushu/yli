import { TextAreaField } from "components/form-fields";
import { useFormik } from "formik";
import React from "react";
import { Modal, Button, Col, Form, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import {
  addStudentFeedback,
  fetchMyLearningPaginationData,
  toggleModals,
} from "store/actions";
import { Rating } from "react-simple-star-rating";
import { ADD_RATING_FORM } from "utils";
import { useTranslation } from "react-i18next";

const AddFeedback = ({ data }) => {
  const [lang] = useTranslation("language");
  const dispatch = useDispatch();
  const initialValues = {
    sourceId: data?.sourceId,
    sourceType: data?.sourceType,
    review: "",
    rating: 0,
  };
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: ADD_RATING_FORM(lang),
    onSubmit: async (values) => {
      await dispatch(addStudentFeedback(values)).then((res) => {
        const payload = {
          page: 1,
          pagesize: 4,
          type: "course",
        };
        if (
          values?.sourceType !== "online" &&
          values?.sourceType !== "offline"
        ) {
          payload.type = values?.sourceType;
        }
        dispatch(fetchMyLearningPaginationData(payload));
      });
      await dispatch(toggleModals({ mylearning: false }));
    },
  });

  return (
    <Modal.Body>
      <Form onSubmit={formik.handleSubmit}>
        <Row>
          <Col md={12} >
            <Form.Label className="w-100">Ratings</Form.Label>
            <Rating onClick={(e) => formik.setFieldValue("rating", e / 20)} />
          </Col>
          <Col md={12} className="mt-4">
            <Form.Label>
              Review <sup>*</sup>
            </Form.Label>
            <TextAreaField formik={formik} name="review" required={true} />
          </Col>
        </Row>
        <Modal.Footer className="custom-footer text-center d-flex border-top border-geyser justify-content-between">
        <button
          type="button"
          className="btn btn-btn btn-dark font-weight-semibold"
          onClick={() => dispatch(toggleModals({ mylearning: false }))}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="btn btn-btn btn-info font-weight-semibold px-30"
        >
         Save
        </button>
      </Modal.Footer>
      </Form>
    </Modal.Body>
  );
};

export default AddFeedback;
