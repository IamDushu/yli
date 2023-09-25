import React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import PropTypes from "prop-types";

export const ProfileOptionsList = ({ options, handleClick }) => {
  return (
    <Box sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      <nav>
        {options.map((option, index) => (
          <List key={index}>
            <ListItem disablePadding>
              <ListItemButton onClick={() => handleClick}>
                <ListItemIcon>
                  <img src={option.icon} />
                </ListItemIcon>
                <ListItemText primary={option.text} />
              </ListItemButton>
            </ListItem>
            <Divider />
          </List>
        ))}
      </nav>
    </Box>
  );
};

ProfileOptionsList.propTypes = {
  options: PropTypes.array,
  handleClick: PropTypes.func,
};

ProfileOptionsList.defaultProps = {
  options: [
    { icon: "assets/images/profile-icons/person_add.svg", text: "My Profile" },
    {
      icon: "assets/images/profile-icons/person_search.svg",
      text: "Activities",
    },
    {
      icon: "assets/images/profile-icons/addchart.svg",
      text: "Agreements and Policies",
    },
  ],
};
