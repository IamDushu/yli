import * as React from "react";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import Typography from "@mui/material/Typography";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import { IconButton, Menu, Tooltip } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import NotificationImportantOutlinedIcon from "@mui/icons-material/NotificationImportantOutlined";
import { useTranslation } from "react-i18next";

export default function CommentMenu({
  deleteLabel,
  editLabel,
  handleDelete,
  handleEdit,
}) {
  const [lang] = useTranslation("language");
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const menus = [
    {
      name: editLabel,
      icon: <EditOutlinedIcon />,
      onClick: handleEdit,
    },
    {
      name: deleteLabel,
      icon: <ClearOutlinedIcon />,
      onClick: handleDelete,
    },
    {
      name: lang("DASHBOARD.POSTS.COMMENT.REPORT_COMMENT"),
      icon: <NotificationImportantOutlinedIcon />,
    },
  ];
  return (
    <div>
      <Tooltip title="More">
        <IconButton onClick={handleClick} id="comment-action-menu" size="small">
          <MoreHorizIcon />
        </IconButton>
      </Tooltip>
      <Menu
        id="comment-action-menu"
        aria-labelledby="comment-action-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {menus.map(({ icon, name, onClick }) => (
          <MenuItem onClick={onClick}>
            <ListItemIcon>{icon}</ListItemIcon>
            <ListItemText>{name}</ListItemText>
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
