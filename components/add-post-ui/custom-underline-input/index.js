import * as React from "react";
import TextField from "@mui/material/TextField";

export const BasicTextFields = ({ placeholder,handleClick }) => {
  return (
    <div>
      <TextField
        fullWidth
        id="filled-basic"
        //label={label}
        placeholder={placeholder}
        variant="filled"
        inputProps={{
          readOnly: true,
        }}
        onClick={handleClick}
        sx={{
          "&&": {
            height: "56px",
            backgroundColor: "#ECE7EB",
            borderRadius: "4px 4px 0px 0px",
          },
          "& .MuiInputLabel-filled": {
            color: "#49454E",
          },
          "& .MuiFilledInput-underline:after": {
            borderBottomColor: "#49454E",
          },
          "& .MuiFilledInput-root": {
            backgroundColor: "#ECE7EB",
            height: "100%",
            borderRadius: "4px 4px 0px 0px",
          },
          "& .MuiFilledInput-input": {
            height: "100%", // Ensure the input field takes the full height of the TextField
            padding: "0px", // Adjust the padding here to vertically center the placeholder
            marginLeft: "10px",
          },
        }}
      />
    </div>
  );
};
