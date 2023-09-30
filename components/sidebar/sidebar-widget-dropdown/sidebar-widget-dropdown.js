import React, { useState } from "react";
import {
  Popover,
  List,
  ListItemButton,
  ListItem,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import PropTypes from "prop-types";
// import "./sidebar-widget-dropdown.scss";

const SidebarWidgetDropdown = (props) => {
  const { label, preIcon, list } = props;

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div className="sidebar-widget-dropdown-wrapper">
      <div
        onClick={handleClick}
        aria-describedby={id}
        className="sidebar-widget-dropdown"
      >
        <div className="d-flex align-items-center justify-content-center">
          <img src={preIcon} />
          <span className="sidebar-widget-title">{label}</span>
        </div>
        <img src="/assets/images/sidebar-icon.svg" />
      </div>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "center",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "center",
          horizontal: "left",
        }}
      >
        <List>
          {(list || []).map((li) => (
            <ListItem key={li.title} onClick={li.onClick} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <img src={li.icon} />
                </ListItemIcon>
                <ListItemText classes="sidebar-list-item" primary={li.title} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Popover>
    </div>
  );
};

SidebarWidgetDropdown.propTypes = {
  label: PropTypes.string,
  preIcon: PropTypes.string,
  list: PropTypes.array,
};

export default SidebarWidgetDropdown;
