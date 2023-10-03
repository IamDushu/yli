import React, { useMemo, useState } from "react";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import { getLocalStorage, postLastNameHandler } from "utils";
import {
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Collapse,
  Popover,
} from "@mui/material";
import ConnectionGoalsSelector from "./ConnectionGoalsSelector";
import ActivityListTable from "./ActivityListTable";
import UserCard from "components/UserCard";
import Tooltip from "components/Tooltip";
import {
  addRemoveGrowthPartner,
  chatCreateUser,
  chatSignupUser,
  getUserById,
  manageGrowthPartnershipGoals,
} from "store/actions";
import { createMeeting } from "store/actions/yli-meet";
import { getOtherProfileInfo } from "store/actions/aboutUs";
import { useYchat } from "hooks/useYchat";

const getUserName = (userData) => {
  const isLastNameAllowed = postLastNameHandler(userData);
  const { firstName, lastName } = userData;
  return `${firstName || ""} ${isLastNameAllowed ? lastName || "" : ""}`.trim();
};

const ConnectionTableRow = ({ row, getFilteredList }) => {
  const [lang] = useTranslation("language");
  const dispatch = useDispatch();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [isRemovingGC, setIsRemovingGC] = useState(false);
  const { currentChannelHandler } = useYchat();
  const {
    users,
    id,
    goals,
    connectionUserId,
    mutualCount,
    isGrowthConnection,
  } = row;
  const { currentPosition, profileId, profilePicURL, profileBgURL } =
    users || {};
  const userName = useMemo(() => getUserName(users), [users]);

  const handleGoalUpdate = (connectionUserId, goals) => {
    dispatch(
      manageGrowthPartnershipGoals({
        connectionUserId,
        goals,
      })
    ).then((res) => {
      if (res.status == 1) getFilteredList();
    });
  };

  const handleShowPopover = (event) => {
    console.log({ event });
    setAnchorEl(event.currentTarget);
  };

  const handleClosePopover = () => {
    setAnchorEl(null);
  };

  const showPopover = Boolean(anchorEl);
  const popoverId = showPopover ? "simple-popover" : undefined;

  const messageHandler = () => {
    dispatch(getOtherProfileInfo(profileId)).then((res) => {
      if (res?.id) {
        sendDM(res);
      }
    });
  };

  const sendDM = async (otherUserData) => {
    let chatRes;
    let mmLogin = getLocalStorage("mmLogin");
    if (mmLogin && typeof mmLogin === "string") {
      mmLogin = JSON.parse(mmLogin);
    }

    if (otherUserData?.mmRegister) {
      let userMmId = otherUserData?.mmId;
      if (!userMmId) {
        const res = await getUserById(otherUserData?.id);
        userMmId = res?.mmId;
      }
      chatRes = await chatCreateUser({
        ids: [userMmId, mmLogin?.mmId],
      });
    } else {
      let userEmail = otherUserData?.email;
      if (!userEmail || userEmail === "HIDDEN") {
        const user = await getUserById(otherUserData?.id);
        userEmail = user.email;
      }
      const res = await dispatch(
        chatSignupUser(
          {
            email: userEmail,
          },
          "profile"
        )
      );
      chatRes = await chatCreateUser({
        ids: [res?.id, mmLogin?.mmId],
      });
    }
    currentChannelHandler(chatRes);
    router.push("/messages");
  };

  const launchRoom = () => {
    dispatch(createMeeting({ router }));
  };

  const handleRemoveGrowthConnection = async () => {
    try {
      setIsRemovingGC(true);
      setAnchorEl(null);
      const result = await Swal.fire({
        title: lang(
          "GROWTH_CONNECTIONS.GROWTH_CONNECTION_REMOVE_MESSAGE_TITLE",
          { userName }
        ),
        text: lang("GROWTH_CONNECTIONS.GROWTH_CONNECTION_REMOVE_MESSAGE_TEXT", {
          userName,
        }),
        icon: "warning",
        showDenyButton: true,
        confirmButtonText: lang("COMMON.CONFIRM"),
        denyButtonText: lang("COMMON.CANCEL"),
      });
      if (result.isConfirmed) {
        let data = {
          connectionUserId,
          growthConnection: false,
        };
        const res = await dispatch(addRemoveGrowthPartner(data));
        if (res.status === 1) getFilteredList();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsRemovingGC(false);
    }
  };

  const getPopover = () => {
    return (
      <Popover
        id={popoverId}
        open={showPopover}
        anchorEl={anchorEl}
        onClose={handleClosePopover}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <UserCard
          name={userName}
          coverImage={profileBgURL}
          profileImage={profilePicURL}
          position={currentPosition || lang("CONNECTIONS.NO_POSTION")}
          mutualCountText={`${mutualCount} ${lang(
            "CONNECTIONS.MUTUAL_CONTACTS"
          )}`}
          profileurl={`/profile/${profileId}`}
          containerWidth="130px"
          renderFooter={() => (
            <Stack direction="row" justifyContent="space-evenly" width="100%">
              <Image
                height={22}
                width={22}
                style={{ cursor: "pointer" }}
                src="/assets/images/send-icon.svg"
                title={lang("COMMON.SEND_MESSAGE")}
                onClick={messageHandler}
              />
              <Image
                height={22}
                width={22}
                style={{ cursor: "pointer" }}
                src="/assets/images/video-call.svg"
                title={lang("COMMON.LAUNCH_ROOM")}
                onClick={launchRoom}
              />
              <Image
                height={22}
                width={22}
                style={{ cursor: "pointer" }}
                title={lang("CONNECTIONS.REMOVE_FROM_GROWTH_CONNECTIONS")}
                src={"/assets/images/remove-from-gc-icon.svg"}
                onClick={isRemovingGC ? null : handleRemoveGrowthConnection}
              />
            </Stack>
          )}
        />
      </Popover>
    );
  };

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }} key={id}>
        <TableCell sx={{ padding: "0.75rem 0.5rem", borderBottom: 0 }}>
          <Stack direction="row" alignItems="center">
            <Image
              src={
                open
                  ? "/assets/images/keyboard-down-arrow.svg"
                  : "/assets/images/keyboard-right-arrow.svg"
              }
              height={24}
              width={24}
              onClick={() => setOpen(!open)}
              style={{ cursor: "pointer" }}
            />
            <Typography
              color="#6750A4"
              sx={{ cursor: "pointer" }}
              fontSize="0.875rem"
              onMouseOver={handleShowPopover}
              onClick={() => window.open(`/profile/${profileId}`, "_blank")}
            >
              {userName}
            </Typography>
          </Stack>
          {getPopover()}
        </TableCell>
        <TableCell sx={{ padding: "0.75rem 0.5rem", borderBottom: 0 }}>
          {currentPosition || lang("CONNECTIONS.NO_POSTION")}
        </TableCell>
        <TableCell sx={{ padding: "0.75rem 0.5rem", borderBottom: 0 }}>
          <ConnectionGoalsSelector
            goals={goals}
            onChange={(e, newGoals) => {
              e.preventDefault();
              handleGoalUpdate(connectionUserId, newGoals);
            }}
          />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell
          style={{ paddingBottom: 0, paddingTop: 0, borderBottom: 0 }}
          colSpan={3}
        >
          <Collapse in={open} timeout="auto" unmountOnExit mountOnEnter>
            <ActivityListTable open={open} connection={row} key={id} />
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};

const GrowthConnectionsTable = ({
  pagesize,
  setPageSize,
  total,
  growthConnections,
  getFilteredList,
}) => {
  const [lang] = useTranslation("language");

  return (
    <TableContainer
      sx={{ margin: "1rem 0 0", maxHeight: 600 }}
      className="scrollbar-custom"
    >
      <Table stickyHeader aria-label="sticky collapsible table">
        <TableHead sx={{ height: "3.5rem" }}>
          <TableRow>
            <TableCell
              sx={{
                background: "#ffffff",
                borderBottom: "1px solid #E7E0EB",
                fontSize: "1rem",
                padding: 0,
              }}
            >
              <Stack
                direction="row"
                alignItems="center"
                style={{
                  padding: "0.5rem 0.5rem 0.5rem 1rem",
                  background: "rgba(103, 80, 164, 0.12)",
                  height: "3.5rem",
                }}
              >
                {lang("COMMON.CONNECTIONS")}
              </Stack>
            </TableCell>
            <TableCell
              sx={{
                background: "#ffffff",
                borderBottom: "1px solid #E7E0EB",
                fontSize: "1rem",
                padding: 0,
              }}
            >
              <Stack
                direction="row"
                alignItems="center"
                style={{
                  padding: "0.5rem",
                  background: "rgba(103, 80, 164, 0.12)",
                  height: "3.5rem",
                }}
              >
                {lang("GROWTH_CONNECTIONS.FILTER.PROFESSION")}
              </Stack>
            </TableCell>
            <TableCell
              sx={{
                background: "#ffffff",
                borderBottom: "1px solid #E7E0EB",
                fontSize: "1rem",
                padding: 0,
              }}
              width="436px"
            >
              <Stack
                direction="row"
                alignItems="center"
                gap="0.5rem"
                sx={{
                  padding: "0.5rem",
                  background: "rgba(103, 80, 164, 0.12)",
                  height: "3.5rem",
                }}
              >
                {lang("GROWTH_CONNECTIONS.FILTER.CONNECTION_GOALS")}
                <Tooltip
                  title={
                    <span>
                      {lang("GROWTH_CONNECTIONS.CONNECTION_GOALS_TOOLTIP")}
                    </span>
                  }
                >
                  <div style={{ height: "1.5rem" }}>
                    <Image
                      src="/assets/images/info.svg"
                      height={24}
                      width={24}
                    />
                  </div>
                </Tooltip>
              </Stack>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {growthConnections.map((connection) => (
            <ConnectionTableRow
              key={connection.id}
              row={connection}
              getFilteredList={getFilteredList}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default GrowthConnectionsTable;
