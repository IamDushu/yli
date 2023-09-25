// EXTERNAL
import React, { useEffect, useState } from "react";
// INTERNAL
import { useTranslation } from "react-i18next";
import { Card, Col, Form, FormControl, FormLabel, Row } from "react-bootstrap";
import SelectField from "components/form-fields/select-field";
import { useFormik } from "formik";
import { TextField } from "components/form-fields";
import {
  contractTypeOptions,
  employmentTypeOptions,
  GOOGLE_PLACE,
  jobTypeOptions,
  JOB_FILTERS,
} from "utils";
import { useSelector } from "react-redux";
import { GOOGLE_MAP_API_KEY } from "config";
import ReactGoogleAutocomplete from "react-google-autocomplete";

const JobFilters = ({ setFilters, filterCount, setFilterCount }) => {
  const [lang] = useTranslation("language");
  const [showFilters, setShowFilters] = useState(false);
  const [searchState,setSearchState] = useState("");
  const jobData = useSelector(
    (state) => state?.learningInstitute?.suggestedJobList
  );
  const initialValues = {
    searchText: "",
    employementType: "",
    jobType: "",
    contractType: "",
    address: "",
    whichJobs: "",
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: () => JOB_FILTERS(lang),
    onSubmit: async (values) => {},
  });

  /******************** 
  @purpose : Used for total filters calculation
  @Parameter : { formik.values }
  @Author : INIC
  ******************/
  useEffect(() => {
    if (formik.values) {
      setFilters({
        searchText: formik.values.searchText,
        employmentType: formik.values.employementType,
        address: formik.values.address,
        jobType: formik.values.jobType,
        contractType: formik.values.contractType,
        whichJobs: formik.values.whichJobs,
      });
    }
  }, [formik.values]);

  /******************** 
  @purpose : Used for clear filter
  @Parameter : {  }
  @Author : INIC
  ******************/
  const handleClearAll = () => {
    setSearchState("");
    formik.resetForm();
    formik.setFieldValue("selected_contractType", "");
    formik.setFieldValue("selected_employementType", "");
    formik.setFieldValue("selected_jobType", "");
    setFilters({
      searchText: "",
      employmentType: "",
      address: "",
      jobType: "",
      contractType: "",
    });
  };
  /******************** 
  @purpose : Used for show/hide filter
  @Parameter : {  }
  @Author : INIC
  ******************/
  const hadleShowFilter = () => {
    setShowFilters((show) => !show);
  };
  const executeSearchText = (value) => {
    setFilters((prev) => ({ ...prev, searchText: value }));
  };

  /*******************
  @purpose : Rander HTML/ React Components
  @Author : INIC
  ******************/
  return (
    <React.Fragment>
      <Card className="mb-3">
        <Card.Header className="pt-1 job-option-overflow pb-0">
          <Form className="" onSubmit={formik.handleSubmit}>
            <Row
              className={`${
                showFilters && "border-dark"
              } pb-1 align-items-center`}
            >
              <Col md={12}>
                <div className="d-md-flex justify-content-between filter-header my-2">
                  <div className="d-flex align-items-center text-placeholder p-1 job-filter-input-box border-radius-8 ">
                    <div className="search-inner-icon mx-2">
                      <em className="bx bx-search text-gray"></em>
                    </div>
                    <FormControl
                      name="searchText"
                      placeholder="Search by job title, skills, or company..."
                      value={searchState}
                      onChange={(e) => {
                        setSearchState(e.target.value);
                        setTimeout(() => {
                          executeSearchText(e.target.value);
                        }, 1000);
                      }}
                      labelClassName="text-muted"
                      className="border-0 p-0 font-14 job-filter-input"
                      autoComplete="off"
                    />
                  </div>
                  <div className="ml-auto d-flex mt-2 mb-1 m-md-0">
                    <div
                      className="d-flex cursor-pointer mr-2 filter-button-job"
                      onClick={hadleShowFilter}
                    >
                      <div>
                        <img src="assets/images/filter-on-svg.svg" />
                      </div>
                      <div className="filter-button-text">Filter</div>
                    </div>
                    <div
                      className="d-flex cursor-pointer clear-button-job"
                      onClick={handleClearAll}
                    >
                      <div>
                        <img src="assets/images/filter-off-svg.svg" />
                      </div>
                      <div className="clear-button-text">Clear</div>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
            {showFilters && (
              <>
                <Row className="mt-3">
                  <Col md={4} lg={3}>
                    <FormLabel className={"text-gray mb-2"}>
                      Employement Type
                    </FormLabel>
                    <SelectField
                      name="employementType"
                      formik={formik}
                      options={employmentTypeOptions}
                      className="custom-selectfield mb-2"
                    />
                  </Col>
                  <Col md={4} lg={3}>
                    <FormLabel className={"text-gray mb-2"}>Job Type</FormLabel>
                    <SelectField
                      name="jobType"
                      formik={formik}
                      options={jobTypeOptions}
                      className="custom-selectfield mb-2"
                    />
                  </Col>
                  <Col md={4} lg={3}>
                    <FormLabel className={"text-gray mb-2"}>Contract Type</FormLabel>
                    <SelectField
                      name="contractType"
                      formik={formik}
                      options={contractTypeOptions}
                      className="custom-selectfield mb-2"
                    />
                  </Col>
                  <Col md={4} lg={3}>
                    <Form.Label className={"text-gray mb-2"}>
                      {lang("EXPERIENCE.FORM.LOCATION")}
                    </Form.Label>
                    <ReactGoogleAutocomplete
                      apiKey={GOOGLE_MAP_API_KEY}
                      type="text"
                      className="floating-input h-50 form-control focus-blue"
                      placeholder={lang("EXPERIENCE.FORM.LOCATION_PLACEHOLDER")}
                      name={`address`}
                      onPlaceSelected={(place) =>
                        formik.setFieldValue(`address`, place.formatted_address)
                      }
                      options={{
                        fields: GOOGLE_PLACE.fields,
                        types: GOOGLE_PLACE.types,
                      }}
                      value={formik?.values?.address}
                      onChange={formik.handleChange}
                      onBlur={formik?.handleBlur}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md={4} lg={3}>
                    <div className="radio-text-job-filter mb-1 mt-2">Type</div>
                    <div className="d-flex justify-content-between mb-1">
                      <div className="d-flex align-items-center">
                        <Form.Check
                          type="radio"
                          name="job-radio"
                          id={`default-radio-1`}
                          onChange={() => {
                            formik.setFieldValue("whichJobs", "");
                          }}
                        />
                        <div className="radio-text-job-filter">All</div>
                      </div>
                      <div className="d-flex align-items-center">
                        <Form.Check
                          type="radio"
                          name="job-radio"
                          id={`default-radio-2`}
                          onChange={() => {
                            formik.setFieldValue("whichJobs", "selected");
                          }}
                        />
                        <div className="radio-text-job-filter">Selected</div>
                      </div>
                      <div className="d-flex align-items-center">
                        <Form.Check
                          type="radio"
                          name="job-radio"
                          id={`default-radio-3`}
                          onChange={() => {
                            formik.setFieldValue("whichJobs", "applied");
                          }}
                        />
                        <div className="radio-text-job-filter">Applied</div>
                      </div>
                    </div>
                  </Col>
                </Row>
              </>
            )}
          </Form>
        </Card.Header>
      </Card>
    </React.Fragment>
  );
};
export default JobFilters;
