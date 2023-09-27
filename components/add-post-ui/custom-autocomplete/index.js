import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Chip from "@mui/material/Chip";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { fetchTags } from "store/actions";
import customAutocompleteStyles from "./custom-autocomplete.module.scss"

export const CustomAutocomplete = ({
  formik,
  formikKey,
  label = "",
  required = false,
  labelBgColor = "#FDF8FD",
  labelPadding = "0px 4px 0px 4px",
  placeholder = "",
}) => {
  const [options, setOptions] = useState([]);
  const [searchText, setSearchText] = useState("");

  const theme = createTheme({
    palette: {
      primary: {
        main: "#7A757F",
      },
    },
  });

  /******************* 
  @Purpose : Used for get tags
  @Parameter : {}
  @Author : YLIWAY
  ******************/
  const getTags = async (searchText) => {
    let body = {
      searchText,
    };
    const response = await fetchTags(body);
    let x = [];
    const alreadySelected = formik.values[formikKey] || [];
    response?.data &&
      response.data.forEach((e, i) => {
        if (!alreadySelected.includes(e.title))
          x.push({ id: i + 1, label: e.title });
      });
    setOptions(x);
  };

  useEffect(() => {
    getTags(searchText);
  }, [searchText]);
  return (
    <ThemeProvider theme={theme}>
      <div className={customAutocompleteStyles["custom-autocomplete"]}>
        <Autocomplete
          multiple
          fullWidth
          // disableCloseOnSelect
          // clearIcon={false}
          disablePortal
          id="combo-box-demo"
          options={options}
          onInputChange={(event, newInputValue) => {
            setSearchText(newInputValue);
          }}
          onChange={(event, newValues) => {
            const values = (newValues || []).map((value) => value?.label);
            formik.setFieldTouched(formikKey, true);
            formik.setFieldValue(formikKey, values);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label={label}
              placeholder={
                formik.values[formikKey]?.length >= 3 ? "" : placeholder
              }
              InputLabelProps={{
                style: {
                  backgroundColor: labelBgColor,
                  padding: labelPadding,
                },
                shrink: true,
              }}
              required={required}
            />
          )}
          renderTags={(value, getTagProps) =>
            value.map((option, index) => (
              <Chip
                variant="outlined"
                label={option.label}
                {...getTagProps({ index })}
              />
            ))
          }
        />

        <div className={customAutocompleteStyles["info-container"]}>
          <div className={customAutocompleteStyles["formik-validation-error"]}>
            {formik?.touched[formikKey] && formik?.errors[formikKey]
              ? formik?.errors[formikKey]
              : ""}
          </div>

          <div className="text-counter">{`${
            formik.values[formikKey]?.length || 0
          } / ${3}`}</div>
        </div>
      </div>
    </ThemeProvider>
  );
};
