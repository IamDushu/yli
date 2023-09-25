import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Row, Col, Form, Button } from "react-bootstrap";
import { Card } from "react-bootstrap";
import { useDispatch } from "react-redux";
import AsyncSelect from "react-select/async";
import Datetime from "react-datetime";
import moment from "moment";
import { Country, State, City } from "country-state-city";
import { getCurrentPostionList } from "store/actions/learningInstitute";
import SelectField from "components/form-fields/select-field";

const FollowerFilters = ({ isFilter = true, formik, clearFilters }) => {
  const dispatch = useDispatch();
  const [lang] = useTranslation("language");

  const [isCollapse, setIsCollapse] = useState(true);
  const [stateList, setStateList] = useState([]);
  const [cityList, setCityList] = useState([]);

  const countryOptions = Country.getAllCountries().map((item) => ({
    value: item.isoCode,
    label: item.name,
  }));

  const customStyles = {
    control: (provided) => ({
      ...provided,
      borderRadius: "5px",
      // add any other styles you need for the control here
    }),
  };

  /*******************
  @purpose : Loads option for async select
  @param   : {inputValue, callback}
  @Author : INIC
  ******************/
  const loadOptionsProfession = (inputValue, callback) => {
    if (!inputValue) {
      callback([]);
    } else {
      setTimeout(() => {
        getCurrentPostionList({ currentPosition: inputValue }).then((res) => {
          const list = [];
          res?.map((data) => {
            list.push({
              label: data?.currentPosition,
              value: data?.id,
            });
          });

          callback(list);
        });
      }, 500);
    }
  };

  /*******************
  @purpose : People Listing 
  @param   : {formik.values.selected_country}
  @Author : INIC
  ******************/
  useEffect(() => {
    const { selected_country } = formik?.values;
    if (selected_country) {
      setStateList(
        State.getStatesOfCountry(selected_country?.value).map((item) => ({
          value: item.isoCode,
          label: item.name,
        }))
      );
    }
  }, [formik?.values?.selected_country]);

  /*******************
  @purpose : People Listing 
  @param   : {formik.values.selected_state}
  @Author : INIC
  ******************/
  useEffect(() => {
    const { selected_state } = formik?.values;
    if (selected_state) {
      setCityList(
        City.getCitiesOfState(
          formik?.values?.selected_country?.value,
          selected_state.value
        ).map((item) => ({
          value: item.isoCode,
          label: item.name,
        }))
      );
    }
  }, [formik?.values?.selected_state]);

  /*******************
  @purpose : Date component
  @param   : {name, title}
  @Author : INIC
  ******************/
  const selectComponentDate = ({ name, title }) => {
    return (
      // <Col >
        <Form.Group controlId="uploadTrainingDates" className="mb-4">
          <Form.Label className="text-secondary">{title}</Form.Label>
          <div className="calendar-wrap">
            <Datetime
              closeOnSelect
              className="font-16-px"
              inputProps={{
                placeholder: "Select",
              }}
              timeFormat={false}
              dateFormat={"DD/MM/YYYY"}
              name={name}
              onChange={(value) => {
                formik?.setFieldValue(name, moment(value).utc().format());
              }}
              value={
                formik?.values?.[name] !== ""
                  ? moment(formik?.values?.[name]).format("DD/MM/YYYY")
                  : null
              }
            />
            <em
              className="icon icon-calendar"
              style={{ color: "#77838F" }}
            ></em>
          </div>
        </Form.Group>
        // </Col>
    );
  };

  /*******************
  @purpose : Select component
  @param   : {title, name, options, isDisabled}
  @Author : INIC
  ******************/
  const selectComponent = ({ title, name, options, isDisabled = false }) => {
    const res = (
      // <Col md={6}>
      <Form.Group controlId="uploadTrainingApplicableFor" className="mb-4">
        <Form.Label className="text-secondary">{title}</Form.Label>
        <div className="custom-selectpicker">
          <SelectField
            name={name}
            className="font-16-px"
            options={options}
            value={
              formik?.values?.[name] == "" ? null : formik?.values?.[name]
            }
            isDisabled={isDisabled}
            placeholder="Select.."
            styles={customStyles}
            formik={formik}
          />
        </div>
      </Form.Group>
      // </Col>
    );
    return res;
  };

  const asyncSelectComponent = ({ title, name, loadOptions }) => {
    return (
      // <Col>
        <Form.Group controlId="uploadTrainingApplicableFor" className="mb-4">
          <Form.Label className="text-secondary">{title}</Form.Label>
          <div className="custom-selectpicker">
            <AsyncSelect
              name={name}
              className="font-16-px"
              styles={customStyles}
              cacheOptions
              value={formik?.values?.selected_currentPosition}
              loadOptions={loadOptions}
              defaultOptions
              placeholder="Search.."
              onChange={(selected) => {
                formik.setFieldValue(name, selected?.value);
                formik.setFieldValue(`selected_${name}`, selected);
              }}
            />
          </div>
        </Form.Group>
      // </Col>
    );
  };

  /*******************
  @purpose : Rander HTML React Component for followers filter
  @Author : INIC
  ******************/
  return (
    <Card className="mt-4 border-0 card-bg-no-border border-radius-zero">
      {isFilter && (
        <Card className="p-3 border-radius-zero">
          <h6 className="heading-followers">Followers</h6>
          {isFilter && (
            <div className="d-flex">
              <div className="flex-grow-1 mr-3">
                <div className="tab-searchbar">
                  <Form.Group
                    controlId="formSearch"
                    className="position-relative mb-0 common-searchbar"
                  >
                    <Form.Control
                      type="text"
                      placeholder="Search..."
                      name="searchText"
                      value={formik.values.searchText}
                      onChange={(e) =>
                        formik.setFieldValue("searchText", e.target.value)
                      }
                      style={{ borderRadius: "5px", background: "#EFF0F6" }}
                      autoComplete="off"
                    />
                    <div className="search-inner-icon">
                      <em className="bx bx-search"></em>
                    </div>
                  </Form.Group>
                </div>
              </div>
              <div>
                <Button
                  variant="btn btn-outline-primary align-items-center justify-content-center d-flex btn-hover-icon-white btn-sm border-radius-eight no-outline"
                  style={{
                    width: "101px",
                  }}
                  onClick={() => {
                    setIsCollapse(!isCollapse);
                    clearFilters();
                  }}
                >
                  <span className="material-icons font-18 align-self-center">
                    filter_alt
                  </span>
                  <div className="ml-1  align-self-center">Filters</div>
                </Button>
              </div>
            </div>
          )}
          {isFilter && !isCollapse && (
            <React.Fragment>
              <Row className="mt-2">
                <Col md={6} lg={4}>
                  {selectComponent({
                    title: "Entity Type",
                    name: "isFollowers",
                    options: [
                      { label: "My People", value: false },
                      { label: "My followers", value: true },
                    ],
                  })}
                </Col>
                <Col md={6} lg={4}>
                  {asyncSelectComponent({
                    title: "Current position",
                    name: "currentPosition",
                    loadOptions: loadOptionsProfession,
                  })}
                </Col>

                {/* {selectComponent({ title: "Activity Title", name: "" })} */}
                <Col md={6} lg={4}>
                  {selectComponent({
                    title: "Country",
                    name: "country",
                    options: countryOptions,
                  })}
                </Col>
              </Row>

              <Row>
                <Col md={6} lg={6}>
                  {selectComponent({
                    title: "State",
                    name: "state",
                    options: stateList,
                    isDisabled: formik?.values?.country == "",
                  })}
                </Col>
                <Col md={6} lg={6}>
                  {selectComponent({
                    title: "City",
                    name: "city",
                    options: cityList,
                    isDisabled: formik?.values?.state == "",
                  })}
                </Col>
              </Row>

              <Row>
                <Col md={6} lg={4}>
                  {selectComponentDate({
                    name: "startDate",
                    title: "From Date",
                  })}
                </Col>
                <Col md={6} lg={4}>
                  {selectComponentDate({ name: "endDate", title: "To Date" })}
                </Col>
                <Col>
                  <div className="d-flex flex-wrap justify-content-between mt-4">
                    <div
                      className="clear-filter-text-css"
                      onClick={clearFilters}
                    >
                      Clear filters
                    </div>
                    <div
                      className="mt-1 p-2 ml-1 execute-filter"
                      onClick={formik.handleSubmit}
                    >
                      Execute
                    </div>
                  </div>
                </Col>
              </Row>
            </React.Fragment>
          )}
        </Card>
      )}
    </Card>
  );
};
export default FollowerFilters;
