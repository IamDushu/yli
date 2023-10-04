// EXTERNAL
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Country, State, City } from "country-state-city";
import { Checkbox, Stack } from "@mui/material";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

// INTERNAL
import { connectionGoals, makeFirstLetterCapital } from "utils";
import { Autocomplete } from "components/form-fields";
import { getGrowthProfessionList } from "store/actions";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

function GrowthConnectionFilters({ showFilters, formik, getFilteredList }) {
  const dispatch = useDispatch();
  const [lang] = useTranslation("language");
  const [defaultProfessionOptions, setDefaultProfessionOptions] = useState([]);
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

  useEffect(() => {
    loadProfessionOptions("").then((res) => setDefaultProfessionOptions(res));
  }, []);

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

  const loadProfessionOptions = async (inputValue) => {
    try {
      const res = await dispatch(
        getGrowthProfessionList({
          searchText: inputValue,
          page: 1,
          pagesize: 20,
        })
      );
      const professionList = (res?.data || []).map((data) => ({
        label: makeFirstLetterCapital(data),
        value: data,
      }));
      return professionList;
    } catch (err) {
      console.error(err);
      return [];
    }
  };

  const connectionGoalOptions = connectionGoals.map((goal) => {
    return {
      label: goalTranslation[goal.value],
      value: goal.value,
    };
  });

  return (
    <React.Fragment>
      {showFilters && (
        <div className="video-search-list border-0 w-100 p-0 df">
          <Stack direction="row" flexWrap="wrap" gap="1rem" margin="1.5rem 0 0">
            <Autocomplete
              width="calc(33% - 10.6px)"
              limitTags={1}
              multiple
              label={lang("GROWTH_CONNECTIONS.FILTER.PROFESSION")}
              noOptionsText={lang("COMMON.SEARCH_FOR_PROFESSION")}
              name="profession"
              placeholder={lang("COMMON.SELECT")}
              formik={formik}
              defaultOptions={defaultProfessionOptions}
              loadOptions={loadProfessionOptions}
              value={formik?.values?.selected_profession || []}
            />

            <Autocomplete
              width="calc(33% - 10.6px)"
              limitTags={1}
              label={lang("GROWTH_CONNECTIONS.FILTER.CONNECTION_GOALS")}
              name="connectionGoals"
              placeholder={lang("COMMON.SELECT")}
              formik={formik}
              loadOptions={null}
              value={formik?.values?.selected_connectionGoals || []}
              defaultOptions={connectionGoalOptions}
              disableCloseOnSelect
              multiple
              autoComplete={false}
              includeInputInList={false}
              filterSelectedOptions={false}
              renderOption={(props, option, third) => (
                <li {...props}>
                  <Checkbox
                    icon={icon}
                    checkedIcon={checkedIcon}
                    style={{ marginRight: 8 }}
                    checked={third.selected}
                  />
                  {option.label}
                </li>
              )}
            />

            <Autocomplete
              width="calc(33% - 10.6px)"
              label={lang("GROWTH_CONNECTIONS.FILTER.COUNTRY")}
              name="country"
              placeholder={lang("COMMON.SELECT")}
              formik={formik}
              loadOptions={null}
              value={formik?.values?.selected_country || null}
              defaultOptions={countryOptions}
            />
            <Autocomplete
              width="calc(33% - 10.6px)"
              label={lang("GROWTH_CONNECTIONS.FILTER.PROVINCE")}
              name="province"
              placeholder={lang("COMMON.SELECT")}
              formik={formik}
              loadOptions={null}
              value={formik?.values?.selected_province || null}
              defaultOptions={stateOptions}
              disabled={!formik?.values?.country}
            />
            <Autocomplete
              width="calc(33% - 10.6px)"
              label={lang("GROWTH_CONNECTIONS.FILTER.CITY")}
              name="city"
              placeholder={lang("COMMON.SELECT")}
              formik={formik}
              loadOptions={null}
              value={formik?.values?.selected_city || null}
              defaultOptions={cityOptions}
              disabled={!formik?.values?.province}
            />
            <div className="my-auto" style={{ marginLeft: "auto" }}>
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
            </div>
          </Stack>
        </div>
      )}
    </React.Fragment>
  );
}

export default GrowthConnectionFilters;
