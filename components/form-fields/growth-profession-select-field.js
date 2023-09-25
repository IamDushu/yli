import React from "react";
import WithFormikField from "../with-formik-field/with-formik-field";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import AsyncSelect from "react-select/async";
import { getGrowthProfessionList } from "store/actions";

const GrowthProfessionnSelectField = ({
  name,
  isMulti = true,
  placeholder,
  caching = true,
  formik,
  ...otherProps
}) => {
  const dispatch = useDispatch();
  const [lang] = useTranslation("language");
  /******************** 
  @purpose : Used for custom options with dp
  @Parameter : {}
  @Author : INIC
  ******************/
  function capitalizeFirstLetter(str) {
    const arr = str.split(" ");

    for (var i = 0; i < arr.length; i++) {
      arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
    }
    return arr.join(" ");
  }

  const loadOptions = (inputValue, callback) => {
    if (!inputValue) {
      callback([]);
    } else {
      setTimeout(() => {
        dispatch(
          getGrowthProfessionList({
            searchText: inputValue,
            page: 1,
            pagesize: 20,
          })
        ).then((res) => {
          const professionList = res?.data?.map((data) => ({
            label: capitalizeFirstLetter(data),
            value: data,
          }));

          callback(professionList);
        });
      }, 500);
    }
  };

  return (
    <div className="growth-profession-custom-select">
      <AsyncSelect
        isMulti
        type="multi"
        menuPortalTarget={document?.querySelector("body")}
        value={formik?.values[`selected_${name}`]}
        classNamePrefix={"custom-select"}
        onChange={(selected) => {
          if (isMulti) {
            formik?.setFieldValue(
              name,
              selected?.map((data) => data.value)
            );
          } else {
            formik?.setFieldValue(name, selected?.value);
          }
          formik?.setFieldValue(`selected_${name}`, selected);
        }}
        loadOptions={loadOptions}
        noOptionsMessage={() => lang("COMMON.SEARCH_FOR_PROFESSION")}
        placeholder={lang("COMMON.SELECT")}
      />
      </div>
  );
};

export default WithFormikField(GrowthProfessionnSelectField);
