import React from "react";
import TextField from "@mui/material/TextField";
import { Stack, Typography } from "@mui/material";
import { get } from "lodash";

const Input = ({ name, formik, maxLength, ...restProps }) => {
  const value = get(formik, `values.${name}`, "");
  const error = get(formik, `errors.${name}`, "");
  const isTouched = get(formik, `touched.${name}`, false);
  const showError = Boolean(error) && isTouched;
  return (
    <Stack>
      <TextField
        id="outlined-basic"
        variant="outlined"
        className="fixed-label"
        name={name}
        {...(formik?.getFieldProps(name) || {})}
        {...restProps}
        error={showError}
      />
      {(showError || Boolean(maxLength)) && (
        <Stack
          direction="row"
          justifyContent={
            showError && maxLength
              ? "space-between"
              : maxLength
              ? "flex-end"
              : "flex-start"
          }
          gap="1rem"
          marginTop="4px"
        >
          {showError && (
            <Typography
              whiteSpace="pre-wrap"
              color="#ff0000"
              fontSize="0.75rem"
            >
              {error}
            </Typography>
          )}
          {!!maxLength && (
            <Typography whiteSpace="nowrap" color="#49454E" fontSize="0.75rem">
              <span
                style={{ color: value.length > maxLength ? "#ff0000" : null }}
              >
                {value.length}
              </span>
              /{maxLength}
            </Typography>
          )}
        </Stack>
      )}
    </Stack>
  );
};

export default Input;
