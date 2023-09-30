import { GMIcon } from "icons/index";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import PropTypes from "prop-types";
export default function AddToGM({ handleClick }) {
  return (
    <Tooltip title="GM">
      <IconButton color="primary" onClick={handleClick}>
        <GMIcon />
      </IconButton>
    </Tooltip>
  );
}

AddToGM.propTypes = {
  handleClick: PropTypes.func,
};
