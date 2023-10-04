import React from "react";
import { Box } from "@mui/material";
import Image from "next/image";
import DropdownStyle from "./dropdown.module.scss";

export const Dropdown = ({ options }) => {
  return (
    <>
      <Box className={[DropdownStyle["dropdown-content-messages"]]}>
        {options.map((option, index) => (
          <Box
            key={index}
            className={[DropdownStyle["p-m-option"]]}
            onClick={option?.handleClick}
          >
            <Image
              width={option?.imageWidth ? option.imageWidth : 20}
              height={option?.imageHeight ? option.imageHeight : 20}
              src={option?.imagePath}
            />
            <span>{option?.title}</span>
          </Box>
        ))}
      </Box>
    </>
  );
};
