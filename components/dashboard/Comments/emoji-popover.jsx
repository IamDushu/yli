import * as React from "react";
import Popover from "@mui/material/Popover";
import AddReactionOutlinedIcon from "@mui/icons-material/AddReactionOutlined";
import Picker from "@emoji-mart/react";
import { IconButton } from "@mui/material";

export default function EmojiPopover({ handleEmoji, commentRef }) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "emoji-popover" : undefined;

  return (
    <div>
      <IconButton
        aria-describedby={id}
        variant="contained"
        onClick={handleClick}
        size="small"
      >
        <AddReactionOutlinedIcon />
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Picker
          onEmojiSelect={(e) => handleEmoji(e, commentRef)}
          theme="light"
          previewPosition="none"
        />
      </Popover>
    </div>
  );
}
