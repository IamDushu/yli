import React, { useEffect, useMemo, useRef, useState } from "react";
import TextField from "@mui/material/TextField";
import AutocompleteComponent from "@mui/material/Autocomplete";
import { debounce } from "lodash";

const Autocomplete = ({
  defaultOptions = [],
  loadOptions,
  name,
  formik,
  label,
  width = "100%",
  height,
  multiple = false,
  filterSelectedOptions = true,
  ...restProps
}) => {
  const { placeholder } = restProps;
  const [value, setValue] = useState(multiple ? [] : null);
  const [inputValue, setInputValue] = useState("");
  const [searchedOptions, setSearchedOptions] = useState([]);

  const debouncedSetValue = debounce((val) => setInputValue(val), 300);

  useEffect(() => {
    if (inputValue && typeof loadOptions === "function") {
      loadOptions(inputValue).then((res = []) => setSearchedOptions(res));
    }
  }, [inputValue]);

  return (
    <AutocompleteComponent
      id={name}
      sx={{ width }}
      multiple={multiple}
      getOptionLabel={(option) =>
        typeof option === "string" ? option : option.label
      }
      options={inputValue ? searchedOptions : defaultOptions}
      autoComplete
      includeInputInList
      filterSelectedOptions={filterSelectedOptions}
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
        let _value = newValue?.value;
        if (multiple) {
          _value = newValue.map((v) => v?.value);
        }
        formik?.setFieldValue(name, _value);
        formik?.setFieldValue(`selected_${name}`, newValue);
      }}
      onInputChange={(event, newInputValue) => {
        if (typeof loadOptions === "function") debouncedSetValue(newInputValue);
      }}
      isOptionEqualToValue={(option, val) => option?.value === val?.value}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          className="fixed-label"
          fullWidth
          sx={{ height }}
          placeholder={placeholder}
        />
      )}
      {...restProps}
    />
  );
};

export default Autocomplete;
