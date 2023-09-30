import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import PropTypes from "prop-types";
export default function Share({ handleClick }) {
  return (
    <Tooltip title="Share">
      <IconButton color="inherit" onClick={handleClick}>
        <ShareOutlinedIcon />
      </IconButton>
    </Tooltip>
  );
}

Share.propTypes = {
  handleClick: PropTypes.func,
};
