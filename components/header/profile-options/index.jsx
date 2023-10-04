import React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import { spacing } from '@mui/system';
import PropTypes from "prop-types";
import profileOptionStyle from "./profile-options.module.scss";

export const ProfileOptionsList = ({ options, handleClick }) => {
  return (
    <Box sx={{ width: "100%", maxWidth: 240, bgcolor: "background.paper" }} className={[
      profileOptionStyle["yliway-profile-dropdown-box"],
    ]}>
      <List className={[
        profileOptionStyle["yliway-profile-dropdown-list"],
      ]}>
        {options.map((option, index) => (
          <ListItem disablePadding key={index}>
            <ListItemButton onClick={() => handleClick}>
              <ListItemIcon className="" sx={{ mr: '8px', minWidth: 'auto' }}>
                <img src={option.icon} className="display" />
              </ListItemIcon>
              <ListItemText primary={option.text} className={[
                profileOptionStyle["yliway-list-item-text"],
              ]} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

ProfileOptionsList.propTypes = {
  options: PropTypes.array,
  handleClick: PropTypes.func,
};

ProfileOptionsList.defaultProps = {
  options: [
    { icon: "assets/images/profile-icons/my-profile-ico.svg", text: "My Profile" },
    {
      icon: "assets/images/profile-icons/my-activties-ico.svg",
      text: "My Activities",
    },
    {
      icon: "assets/images/profile-icons/agreement-policy-ico.svg",
      text: "Agreements and Policies",
    },
    {
      icon: "assets/images/profile-icons/setting-ico.svg",
      text: "Settings",
    },
    {
      icon: "assets/images/profile-icons/disconnect-ico.svg",
      text: "Disconnect",
    },
  ],
};
