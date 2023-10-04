import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Popover,
  Stack,
  Typography,
} from "@mui/material";
import Link from "next/link";

import { useState } from "react";

export default function ProfileCard({
  profileRoute,
  src,
  firstName,
  lastName,
  currentPosition,
}) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const id = "profile-popover";

  const open = Boolean(anchorEl);
  return (
    <>
      <Typography
        component={"span"}
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
        aria-describedby={id}
        fontWeight={500}
        fontSize={"16px"}
        lineHeight={"24px"}
        color={"#1C1B1E"}
      >
        {firstName} {lastName}
      </Typography>

      <Popover
        id={id}
        sx={{
          pointerEvents: "none",
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <Card sx={{ width: "150px" }}>
          <Box position={"relative"}>
            <CardMedia
              component={"img"}
              src="assets/images/my-profile/profile-bg.jpg"
              alt="Background"
              height={"60px"}
            />
            <Box
              position={"absolute"}
              left={"50%"}
              sx={{ transform: "translate(-50%,0)" }}
              bottom={-20}
            >
              <Avatar width={34} height={34} src={src} />
            </Box>
          </Box>
          <CardContent sx={{ paddingTop: 3 }}>
            <Stack alignItems={"center"}>
              <Typography
                fontWeight={500}
                fontSize={"14px"}
                lineHeight={"20px"}
              >
                Andera Altro
              </Typography>
              <Typography
                textAlign={"center"}
                fontWeight={400}
                fontSize={"12px"}
                lineHeight={"16px"}
              >
                {currentPosition}
              </Typography>
            </Stack>
            <Typography
              fontSize={"11px"}
              lineHeight={"16px"}
              color="#938F94"
              fontWeight={500}
              textAlign={"center"}
              mt={1}
            >
              10 mutual contacts
            </Typography>
          </CardContent>
          <CardActions sx={{ padding: 0.5, paddingBottom: 1 }}>
            <Button
              color="primary"
              variant="contained"
              sx={{
                borderRadius: "100px",
                fontSize: "11px",
                lineHeight: "16px",
              }}
              size="small"
            >
              Connect
            </Button>
            <Button
              size="small"
              color="primary"
              sx={{
                borderRadius: "100px",
                fontSize: "11px",
                lineHeight: "16px",
              }}
            >
              Follow
            </Button>
          </CardActions>
        </Card>
      </Popover>
    </>
  );
}
