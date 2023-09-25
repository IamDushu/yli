// EXTERNAL
import React, { useEffect, useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Form, Row, Col, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Country, State, City } from "country-state-city";

// INTERNAL
import { connectionGoals } from "utils";
import GrowthProfessionnSelectField from "components/form-fields/growth-profession-select-field";
import SelectField from "components/form-fields/select-field";
import ReactMultiSelectCheckboxes from "react-multiselect-checkboxes";

function GrowthConnectionFilters({
  page,
  pagesize,
  showFilters,
  formik,
  getFilteredList,
}) {
  const dispatch = useDispatch();
  const [lang] = useTranslation("language");

  const [stateOptions, setStateOptions] = useState([]);
  const [cityOptions, setCityOptions] = useState([]);

  /*******************
  @purpose : Country Listing 
  @param   : {formik.values.selected_country}
  @Author : INIC
  ******************/
  const countryOptions = Country.getAllCountries().map((item) => ({
    value: item.isoCode,
    label: item.name,
  }));

  /*******************
  @purpose : State Listing 
  @param   : {formik.values.selected_country}
  @Author : INIC
  ******************/
  useEffect(() => {
    const { country } = formik?.values;
    if (country) {
      setStateOptions(
        State.getStatesOfCountry(country).map((item) => ({
          value: item.isoCode,
          label: item.name,
        }))
      );
      formik.setValues({
        ...formik.values,
        province: "",
        city: "",
        selected_province: null,
        selected_city: null,
      });
    }
  }, [formik?.values?.country]);

  /*******************
  @purpose : City Listing 
  @param   : {formik?.values?.province}
  @Author : INIC
  ******************/
  useEffect(() => {
    const { province } = formik?.values;
    if (province) {
      setCityOptions(
        City.getCitiesOfState(formik?.values?.country, province).map(
          (item) => ({
            value: item.name,
            label: item.name,
          })
        )
      );
      formik.setValues({
        ...formik.values,
        city: "",
        selected_city: null,
      });
    }
  }, [formik?.values?.province]);

  /*******************
  @purpose : To reset the filters
  @param   : {}
  @Author : INIC
  ******************/
  const resetForm = () => {
    formik.resetForm();
    formik.setFieldValue("selected_name", "");
    formik.setFieldValue("selected_profession", "");
    formik.setFieldValue("selected_connectionGoals", "");
    formik.setFieldValue("selected_country", "");
    formik.setFieldValue("selected_region", "");
    formik.setFieldValue("selected_province", "");
    formik.setFieldValue("selected_city", "");
    formik.setFieldValue("searchText", "");
    getFilteredList(true);
  };

  // CONNECTION GOALS TRANSLATION
  const goalTranslation = {
    "Visibility Partner": lang("GROWTH_CONNECTIONS.VISIBILITY_PARTNER"),
    "Channel Partner": lang("GROWTH_CONNECTIONS.CHANNEL_PARTNER"),
    "Business Partner": lang("GROWTH_CONNECTIONS.BUSINESS_PARTNER"),
    "Know-how exchange": lang("GROWTH_CONNECTIONS.KNOW_HOW_EXCHANGE"),
  };

  return (
    <React.Fragment>
      {showFilters && (
        <div className="video-search-list border-0 w-100 p-0 df">
          <Form className="courses-filter">
            <Row>
              <Col md={3} lg={4}>
                <Form.Group className="w-100">
                  <Form.Label htmlFor="profession">
                    {lang("GROWTH_CONNECTIONS.FILTER.PROFESSION")}
                  </Form.Label>
                  <GrowthProfessionnSelectField
                    name="profession"
                    id="profession"
                    placeholder={lang("COMMON.SELECT")}
                    formik={formik}
                  />
                </Form.Group>
              </Col>
              <Col md={3} lg={4}>
                <Form.Group className="w-100">
                  <Form.Label htmlFor="connectionGoals">
                    {lang("GROWTH_CONNECTIONS.FILTER.CONNECTION_GOALS")}
                  </Form.Label>
                  <div className="custom-multiselectcheck-courses">
                    <ReactMultiSelectCheckboxes
                      placeholderButtonLabel={lang("COMMON.SELECT")}
                      options={connectionGoals.map((goal)=>{
                        return ({label:goalTranslation[goal.value],value:goal.value})
                      })}
                      value={formik.values.connectionGoals}
                      defaultValue={formik.values.connectionGoals}
                      onChange={(e) => {
                        const values = e.map((data) => data?.value);
                        formik.setFieldValue(
                          "connectionGoals",
                          values.map((value) => {
                            return {
                              value: value,
                              label: goalTranslation[value],
                            };
                          })
                        );
                      }}
                      placeholder={lang("COMMON.SELECT")}
                    />
                  </div>
                </Form.Group>
              </Col>
              <Col md={3} lg={4}>
                <Form.Group className="w-100">
                  <Form.Label htmlFor="country">
                    {lang("GROWTH_CONNECTIONS.FILTER.COUNTRY")}
                  </Form.Label>
                  <div className="custom-selectpicker-xs">
                    <SelectField
                      name="country"
                      id="country"
                      placeholder={lang("COMMON.SELECT")}
                      options={countryOptions}
                      formik={formik}
                    />
                  </div>
                </Form.Group>
              </Col>
              <Col md={3} lg={4}>
                <Form.Group className="w-100">
                  <Form.Label htmlFor="province">
                    {lang("GROWTH_CONNECTIONS.FILTER.PROVINCE")}
                  </Form.Label>
                  <div className="custom-selectpicker-xs">
                    <SelectField
                      name="province"
                      id="province"
                      placeholder={lang("COMMON.SELECT")}
                      formik={formik}
                      options={stateOptions}
                      isDisabled={!formik?.values?.country}
                    />
                  </div>
                </Form.Group>
              </Col>
              <Col md={3} lg={4}>
                <Form.Group className="w-100">
                  <Form.Label htmlFor="city">
                    {lang("GROWTH_CONNECTIONS.FILTER.CITY")}
                  </Form.Label>
                  <div className="custom-selectpicker-xs">
                    <SelectField
                      name="city"
                      id="city"
                      placeholder={lang("COMMON.SELECT")}
                      formik={formik}
                      options={cityOptions}
                      isDisabled={!formik?.values?.province}
                    />
                  </div>
                </Form.Group>
              </Col>
              <Col
                md={3}
                lg={4}
                className="my-auto"
                style={{ marginLeft: "auto" }}
              >
                <Button
                  variant="link"
                  className="pl-0 text-info "
                  onClick={() => {
                    formik.handleSubmit();
                  }}
                >
                  {lang("COMMON.APPLY")}
                </Button>
                <Button
                  variant="link"
                  className="pl-0 text-info "
                  onClick={resetForm}
                >
                  {lang("COMMON.CLEAR_FILTERS")}
                </Button>
              </Col>
            </Row>
          </Form>
        </div>
      )}
    </React.Fragment>
  );
}

export default GrowthConnectionFilters;
