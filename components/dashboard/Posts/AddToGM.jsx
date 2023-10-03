import { GMIcon } from "icons/index";
import IconButton from "@mui/material/IconButton";
import PropTypes from "prop-types";
import { Box } from "@mui/material";
export default function AddToGM({ handleClick }) {
  return (
    <Box>
      <IconButton color="primary" onClick={handleClick}>
        <GMIcon />
      </IconButton>
    </Box>
  );
}

AddToGM.propTypes = {
  handleClick: PropTypes.func,
};
