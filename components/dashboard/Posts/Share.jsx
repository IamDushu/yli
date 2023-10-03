import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import { Box } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import PropTypes from "prop-types";
export default function Share({ handleClick }) {
  return (
    <Box>
      <IconButton onClick={handleClick}>
        <ShareOutlinedIcon />
      </IconButton>
    </Box>
  );
}

Share.propTypes = {
  handleClick: PropTypes.func,
};
