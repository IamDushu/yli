import React from "react";
import PropTypes from "prop-types";
import { ProfileImage } from "components/profile-image";
import { styled } from "@mui/material/styles";
import Badge from "@mui/material/Badge";
import Stack from "@mui/material/Stack";

export const HeaderProfile = ({
  handleClick,
  imageUrl,
  firstName,
  lastName,
  onContextMenu,
  size,
  onError,
}) => {
  const StyledBadge = styled(Badge)((theme) => ({
    "& .MuiBadge-badge": {
      backgroundImage: "url('/assets/images/settings-icon.svg')",
      backgroundSize: "cover", // You can adjust the background image properties as needed
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundColor: "#6750A4",
      boxShadow: `0 0 0 2px #6750A4`,
      "&::after": {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        borderRadius: "50%",
        content: '""',
      },
    },
  }));

  return (
    // <>
    //   <div>
    //     <ProfileImage
    //       imageUrl={imageUrl}
    //       handleClick={handleClick}
    //       size="small"
    //     />
    //   </div>
    //   <i src="assets/images/settings.svg" />
    // </>
    <Stack direction="row" spacing={2}>
      <StyledBadge
        overlap="circular"
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        variant="dot"
      >
        <ProfileImage
          imageUrl={imageUrl}
          firstName={firstName}
          lastName={lastName}
          handleClick={handleClick}
          size={size}
          onContextMenu={onContextMenu}
          onError={onError}
        />
      </StyledBadge>
    </Stack>
  );
};

HeaderProfile.propTypes = {
  imageUrl: PropTypes.string,
  handleClick: PropTypes.func,
  onContextMenu: PropTypes.func,
  onError: PropTypes.func,
};

HeaderProfile.defaultProps = {
  imageUrl: "/assets/images/homepage/user-1.png",
};
