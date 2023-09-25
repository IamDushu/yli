import Datetime from "react-datetime";
import moment from "moment";
import Select from "react-select";
import { useTranslation } from "react-i18next";

import { useEffect, useState } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { LanguageList } from "store/actions/room";
import { getFacultyList } from "store/actions/room";
import { useRouter } from "next/router";

const CourseListFilter = ({ formik, props, clearFilter, executeFilter }) => {
  const [options, setOptions] = useState([]);
  const [langOptions, setLangOptions] = useState([]);
  const dispatch = useDispatch();
  const router = useRouter();
  const { instituteId } = router.query;
  const [lang] = useTranslation("language");
  const { languageList } = useSelector((state) => state.room);

  const getLanguages = () => {
    const languages = [];
    languageList.map((langData) => {
      languages.push({ label: langData.name, value: langData.name });
      setLangOptions(languages);
    });
  };
  const customStyles = {
    control: (provided) => ({
      ...provided,
      borderRadius: "5px",
      // add any other styles you need for the control here
    }),
  };
  const ratings = [
    { value: 0, label: "non rated" },
    { value: 1, label: 1 },
    { value: 2, label: 2 },
    { value: 3, label: 3 },
    { value: 4, label: 4 },
    { value: 5, label: 5 },
  ];

  const activityOptions = [
    {
      label: "Training Room",
      value: "training-room",
    },
    {
      label: "Coaching Room",
      value: "coaching-room",
    },
    { label: "Webinar", value: "webinar" },
    { label: "Master Class", value: "master-class" },
    { label: "Online Course", value: "online" },
    { label: "Offline Course", value: "offline" },
  ];

  useEffect(() => {
    if (props.activeTab === "courses") {
      dispatch(LanguageList());
      dispatch(
        getFacultyList({
          instituteId: instituteId,
        })
      ).then((data) => {
        const transformedOptions = data.map((option) => ({
          value: option.id,
          label: option.name,
        }));
        setOptions(transformedOptions);
      });
    }
  }, [props.activeTab]);
  return (
    <>
      <Row className="mt-2">
        <Col lg={4} xl={3} md={6}>
          <Form.Group controlId="uploadTrainingApplicableFor" className="mb-4">
            <Form.Label className="text-secondary">Language</Form.Label>
            <div className="custom-selectpicker">
              <Select
                name="language"
                className="font-16-px"
                value={
                  formik?.values?.language?.length > 0
                    ? {
                        label: formik.values.language,
                        value: formik.values.language,
                      }
                    : null
                }
                placeholder="Select.."
                options={langOptions}
                onMenuOpen={getLanguages}
                onChange={(selected) => {
                  formik?.setFieldValue("language", selected.value);
                }}
                styles={customStyles}
              />
            </div>
          </Form.Group>
        </Col>

        <Col lg={4} xl={3} md={6}>
          <Form.Group controlId="uploadTrainingApplicableFor" className="mb-4">
            <Form.Label className="text-secondary">Activity Type</Form.Label>
            <div className="custom-selectpicker">
              <Select
                name="activityType"
                className="font-16-px"
                placeholder="Select.."
                value={
                  formik?.values?.activityType
                    ? {
                        label: formik?.values?.activityType?.label,
                        value: formik?.values?.activityType?.value,
                      }
                    : null
                }
                options={activityOptions}
                onChange={(selected) => {
                  formik?.setFieldValue("activityType", selected);
                }}
                styles={customStyles}
              />
            </div>
          </Form.Group>
        </Col>

        <Col lg={4} xl={3} md={6}>
          <Form.Group controlId="uploadTrainingApplicableFor" className="mb-4">
            <Form.Label className="text-secondary">Price</Form.Label>
            <div className="custom-selectpicker">
              <Select
                name="price"
                className="font-16-px"
                placeholder="Select.."
                value={
                  formik?.values?.price
                    ? {
                        label:
                          formik?.values?.price == "asc"
                            ? "Low to High"
                            : "High to Low",
                      }
                    : null
                }
                options={[
                  { label: "Low to High", value: "asc" },
                  { label: "High to Low", value: "desc" },
                ]}
                onChange={(selected) => {
                  formik?.setFieldValue("price", selected.value.toLowerCase());
                }}
                styles={customStyles}
              />
            </div>
          </Form.Group>
        </Col>

        <Col lg={4} xl={3} md={6}>
          <Form.Group controlId="uploadTrainingApplicableFor" className="mb-4">
            <Form.Label className="text-secondary">Rating</Form.Label>
            <div className="custom-selectpicker">
              <Select
                type="number"
                options={ratings}
                value={
                  formik?.values?.rating
                    ? {
                        label: formik?.values?.rating?.label,
                        value: formik?.values?.rating?.value,
                      }
                    : null
                }
                name="rating"
                onChange={(selected) => {
                  formik?.setFieldValue("rating", selected);
                }}
                styles={customStyles}
              />
            </div>
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col lg={4} xl={3} md={6}>
          <Form.Group controlId="uploadTrainingDates" className="mb-4">
            <Form.Label className="text-secondary">Date</Form.Label>
            <div className="calendar-wrap">
              <Datetime
                closeOnSelect
                className="font-16-px"
                inputProps={{
                  placeholder: "Select",
                  readOnly: true,
                }}
                timeFormat={false}
                dateFormat={"DD/MM/YYYY"}
                name="startDate"
                // isValidDate={disablePastDt}
                onChange={(value) => {
                  formik?.setFieldValue("startDate", moment(value).format());
                }}
                value={
                  formik?.values?.startDate
                    ? moment(formik.values.startDate).format("DD/MM/YYYY")
                    : null
                }
              />

              {formik?.touched.startDate && formik?.errors.startDate && (
                <small className="error form-text">
                  {formik?.errors.startDate}
                </small>
              )}
              <em className="icon icon-calendar"></em>
            </div>
          </Form.Group>
        </Col>
        <Col lg={4} xl={3} md={6}>
          <Form.Group controlId="uploadTrainingApplicableFor" className="mb-4">
            <Form.Label className="text-secondary">Faculty</Form.Label>
            <div className="custom-selectpicker">
              <Select
                name="faculty"
                className="font-16-px"
                options={options}
                value={formik?.values?.faculty ? formik?.values?.faculty : null}
                placeholder="Select.."
                onChange={(selected) => {
                  formik?.setFieldValue("faculty", selected);
                }}
                styles={customStyles}
              />
            </div>
          </Form.Group>
        </Col>
        <Col>
          <div className="d-flex flex-wrap justify-content-between mt-4">
            <div className="clear-filter" onClick={clearFilter}>
              Clear filters
            </div>
            <Button
              variant="btn btn-outline-primary align-items-center justify-content-end d-flex py-12 btn-hover-icon-white btn-sm border-radius-eight no-outline"
              onClick={() => executeFilter(formik?.values?.searchText)}
            >
              Execute
            </Button>
          </div>
        </Col>
      </Row>
    </>
  );
};
export default CourseListFilter;
