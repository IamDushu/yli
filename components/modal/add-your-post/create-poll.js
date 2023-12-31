import React, { Fragment, useState } from "react";
import { Button, Card, Form, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { toggleModals, createPoll, posttype } from "store/actions";
import { useFormik } from "formik";
import { CREATE_POLL_SCHEMA } from "utils";
import moment from "moment";
import { useTranslation } from "react-i18next";
let uniqueKey = 2; //To generate unique key for render answers correctly

/*******************   
@purpose : User Set Thankyou
@Author : INIC
******************/
export const CreatePoll = () => {
  const dispatch = useDispatch();
  const [lang] = useTranslation("language");
  const { editCreatePol, createPolls } = useSelector((state) => state.post);
  const initialValue = editCreatePol
    ? createPolls
    : {
        pollQuestion: {
          question: "",
          pollExpiryDate: "",
        },
        pollAnswers: [
          {
            answer: "",
            keyIndex: 0,
          },
          {
            answer: "",
            keyIndex: 1,
          },
        ],
      };

  const formik = useFormik({
    initialValues: initialValue,
    validationSchema: () => CREATE_POLL_SCHEMA(lang),
    onSubmit: (values) => {
      const answers = values.pollAnswers.filter(
        (answer) => answer.answer.trim() !== ""
      );
      dispatch(
        createPoll({ pollQuestion: values.pollQuestion, pollAnswers: answers })
      );
      dispatch(posttype("poll"));
      dispatch(toggleModals({ addpost: true }));
      dispatch(toggleModals({ createpoll: false }));
      formik.resetForm();
    },
  });
  const durationOptions = [
    { value: moment().add(1, "days"), label: lang("DASHBOARD.POLL.ONE_DAY") },
    {
      value: moment().add(3, "days"),
      label: lang("DASHBOARD.POLL.THREE_DAY"),
    },
    {
      value: moment().add(7, "days"),
      label: lang("DASHBOARD.POLL.ONE_WEEK"),
    },
  ];

  const addMoreOption = (e) => {
    e.preventDefault();
    const newOption = [...formik.values.pollAnswers];
    newOption.push({
      answer: "",
      keyIndex: uniqueKey,
    });
    uniqueKey = uniqueKey + 1;
    formik.setFieldValue("pollAnswers", newOption);
  };

  const removeOption = (e, index) => {
    e.preventDefault();
    const deleteOptionValues = [...formik?.values?.pollAnswers];
    deleteOptionValues.splice(index, 1);
    formik.setFieldValue("pollAnswers", deleteOptionValues);
  };

  const handleBackPage = (e) => {
    e.preventDefault();
    dispatch(toggleModals({ createpoll: false }));
    dispatch(posttype(""));
  };

  return (
    <Fragment>
      <Modal.Body>
        {/* <PerfectScrollbar> */}
        <Card className="border-0">
          <Card.Body className="p-0">
            <Form>
              <div>
                <div>
                  <Form.Group>
                    <Form.Label>
                      {lang("DASHBOARD.POLL.YOUR_QUESTION")}
                    </Form.Label>{" "}
                    <sup>*</sup>
                    <Form.Control
                      type="text"
                      placeholder={lang("DASHBOARD.POLL.QUESTION_PLACEHOLDER")}
                      name="pollQuestion.question"
                      onChange={(e) =>
                        formik.setFieldValue(
                          "pollQuestion.question",
                          e.target.value
                        )
                      }
                      defaultValue={
                        editCreatePol
                          ? createPolls.pollQuestion.question
                          : formik.values.pollQuestion.question
                      }
                      autoComplete="off"
                    />
                    {formik?.touched?.pollQuestion?.question &&
                      formik?.errors?.pollQuestion?.question && (
                        <small className="error form-text">
                          {formik?.errors?.pollQuestion?.question}
                        </small>
                      )}
                  </Form.Group>
                </div>
                {formik?.values?.pollAnswers?.map((options, index) => {
                  return (
                    <div key={`poll-${options.keyIndex}`}>
                      <Form.Group className="mb-3">
                        <Form.Label>
                          {lang("DASHBOARD.POLL.OPTION")} {index + 1}
                        </Form.Label>
                        {index <= 1 && <sup>*</sup>}
                        {formik?.values?.pollAnswers.length > 2 ? (
                          <button
                            className="remove-btn"
                            onClick={(data) => removeOption(data, index)}
                          >
                            {lang("DASHBOARD.POLL.REMOVE")}
                          </button>
                        ) : null}
                        <Form.Control
                          maxLength="50"
                          type="text"
                          name="pollAnswers"
                          placeholder={`${lang("DASHBOARD.POLL.OPTION")} ${
                            index + 1
                          }`}
                          defaultValue={
                            editCreatePol
                              ? createPolls.pollAnswers[index]?.answer
                              : formik.values?.pollAnswers[index]?.answer
                          }
                          onChange={(e) => {
                            formik.setFieldValue(
                              `pollAnswers.[${index}].answer`,
                              e.target.value
                            );
                          }}
                        />

                        {formik?.touched?.pollAnswers !== undefined
                          ? formik?.touched?.pollAnswers[index]?.answer &&
                            formik?.errors?.pollAnswers !== undefined
                            ? formik?.errors?.pollAnswers[index]?.answer && (
                                <small className="error form-text">
                                  {formik?.errors?.pollAnswers[index]?.answer}
                                </small>
                              )
                            : null
                          : null}
                      </Form.Group>
                    </div>
                  );
                })}

                {formik?.values?.pollAnswers?.length < 5 ? (
                  <div>
                    <button
                      onClick={addMoreOption}
                      className="btn btn-primary btn-sm shadow-none py-12 addMore-btn ml-0 mb-4"
                    >
                      {lang("DASHBOARD.POLL.ADD_MORE")}
                    </button>
                  </div>
                ) : null}
                <div>
                  <Form.Group>
                    <Form.Label>
                      {lang("DASHBOARD.POLL.POLL_DURATION")}
                    </Form.Label>
                    <sup>*</sup>
                    <div className="custom-selectpicker top-selection position-relative">
                      <Select
                        placeholder={lang("DASHBOARD.POLL.SELECT_TIME")}
                        options={durationOptions}
                        name="pollQuestion.pollExpiryDate"
                        defaultValue={
                          editCreatePol
                            ? createPolls.pollQuestion?.pollExpiry
                            : formik.values?.pollQuestion?.pollExpiry
                        }
                        onChange={(e) => {
                          formik.setFieldValue(
                            "pollQuestion.pollExpiryDate",
                            e.value
                          );
                          formik.setFieldValue("pollQuestion.pollExpiry", e);
                        }}
                      />
                    </div>
                    {formik?.touched?.pollQuestion?.pollExpiryDate &&
                      formik?.errors?.pollQuestion?.pollExpiryDate && (
                        <small className="error form-text">
                          {formik?.errors?.pollQuestion?.pollExpiryDate}
                        </small>
                      )}
                  </Form.Group>
                </div>

                <div>
                  <p className="font-14 mb-0">
                    {lang("DASHBOARD.POLL.DESCRIPTION")}
                  </p>
                </div>
              </div>
            </Form>
          </Card.Body>
        </Card>
        {/* </PerfectScrollbar> */}
      </Modal.Body>
      <Modal.Footer className="text-center d-flex p-4 border-top border-geyser">
        <Button
          onClick={handleBackPage}
          variant="btn btn-outline-info weight-semibold btn-sm text-uppercase py-12 mr-3"
        >
          {lang("DASHBOARD.POLL.BACK")}
        </Button>
        <Button
          type="submit"
          onClick={formik.handleSubmit}
          variant="btn btn-info btn-sm weight-semibold text-uppercase py-12 ml-3"
        >
          {lang("DASHBOARD.POLL.DONE")}
        </Button>
      </Modal.Footer>
    </Fragment>
  );
};
