import React from "react";
import { Link } from "@routes";
import { Card } from "react-bootstrap";
import { timeAgo } from "utils";
import Tooltip from "@mui/material/Tooltip";
import {
  Avatar,
  Box,
  CardHeader,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import MoreHoriz from "@mui/icons-material/MoreHoriz";
import { useRouter } from "next/router";

const PostHeader = ({ listData, userInfo, type, imagePreference }) => {
  const firstName =
    type === "share"
      ? listData?.postShareDetails?.companyId ??
        listData?.postShareDetails?.instituteId
        ? listData?.postShareDetails?.companyDetails?.companyName ??
          listData?.postShareDetails?.instituteDetails?.name
        : listData?.postShareDetails?.userDetails?.firstName
      : listData?.postDetails?.companyId ?? listData?.postDetails?.instituteId
      ? listData?.postDetails?.companyDetails?.companyName ??
        listData?.postDetails?.instituteDetails?.name
      : listData?.postDetails?.userDetails?.firstName;

  const lastName =
    type === "share"
      ? listData?.postShareDetails?.companyId ??
        listData?.postShareDetails?.instituteId
        ? ""
        : listData?.postShareDetails?.userDetails?.lastName
      : listData?.postDetails?.companyId ?? listData?.postDetails?.instituteId
      ? ""
      : listData?.postDetails?.userDetails?.lastName;

  const profileRoute = listData?.postDetails?.instituteId
    ? "/profile/institute-profile?instituteId=" +
      listData?.postDetails?.instituteDetails?.id +
      "&name=" +
      firstName +
      "+" +
      lastName +
      "&userId=" +
      userInfo?.id
    : listData?.postDetails?.companyId
    ? "/profile/company-profile?companyId=" +
      listData?.postDetails?.companyDetails?.id +
      "&name=" +
      firstName +
      "+" +
      lastName +
      "&userId=" +
      userInfo?.id
    : type === "share"
    ? listData.postShareDetails?.instituteDetails
      ? "/profile/institute-profile?instituteId=" +
        listData.postShareDetails?.instituteDetails?.id
      : listData.postShareDetails?.companyDetails
      ? "/profile/company-profile?companyId=" +
        listData.postShareDetails?.companyDetails?.id
      : `/profile/${listData?.postShareDetails?.userDetails?.profileId}`
    : `/profile/${listData?.postDetails?.userDetails?.profileId}`;

  const dashboardHeaderPhoto = imagePreference
    ? type == "share"
      ? listData?.postShareDetails?.instituteDetails ??
        listData?.postShareDetails?.companyDetails
        ? listData?.postShareDetails?.instituteDetails?.logo ??
          listData?.postShareDetails?.companyDetails?.logo ??
          ""
        : listData?.postShareDetails?.userDetails?.profilePicURL
      : listData?.postDetails?.instituteDetails ??
        listData?.postDetails?.companyDetails
      ? listData?.postDetails?.instituteDetails?.logo ??
        listData?.postDetails?.companyDetails?.logo ??
        ""
      : listData?.postDetails?.userDetails?.profilePicURL
    : "";

  const taggedUserDetails = listData?.postDetails?.postTaggedUsers || [];
  const router = useRouter();
  return (
    <CardHeader
      avatar={
        <Avatar
          onClick={(e) => router.push(profileRoute)}
          sx={{ width: 56, height: 56, cursor: "pointer" }}
          src={dashboardHeaderPhoto}
        />
      }
      title={
        <Typography
          sx={{ cursor: "pointer" }}
          onClick={(e) => router.push(profileRoute)}
          variant="titleMedium"
        >
          {firstName} {lastName}
        </Typography>
      }
      subheader={
        <Box
          sx={{ cursor: "pointer" }}
          onClick={(e) => router.push(profileRoute)}
        >
          <Typography variant="bodyMedium">
            {type == "share"
              ? listData.postShareDetails?.userDetails?.currentPosition || ""
              : listData.postDetails?.userDetails?.currentPosition || ""}
          </Typography>
        </Box>
      }
      action={
        <Stack direction={"row"} alignItems={"center"} gap={1}>
          <Typography variant="labelSmall">
            {timeAgo(
              type
                ? listData.postShareDetails !== null
                  ? listData?.postShareDetails?.createdAt
                  : ""
                : listData?.postDetails?.createdAt
            )}
          </Typography>
        </Stack>
      }
    >
      <div className="w-h-54 position-relative flex-shrink-0 mr-3">
        <div className="overflow-hidden flex-shrink-0 border border-geyser w-h-54 rounded-pill"></div>
        {((listData?.postDetails?.userDetails?.visibilityDetails?.settings
          ?.myConnection &&
          listData?.postDetails?.userDetails?.connectionData[0]
            ?.isConnection) ||
          (listData?.postDetails?.userDetails?.visibilityDetails?.settings
            ?.followers &&
            listData?.postDetails?.userDetails?.followData[0]?.isFollow) ||
          (listData?.postDetails?.userDetails?.visibilityDetails?.settings
            ?.myGrowthConnection &&
            listData?.postDetails?.userDetails?.isGrwothConnection
              ?.isGrowthConnection)) &&
          listData?.postDetails?.userDetails?.isUserOnline === true && (
            <span className="chat-blue-icon w-h-8 mr-2 flex-shrink-0 bg-success rounded-circle"></span>
          )}
      </div>

      <div>
        <Card.Title className="mb-1">
          {taggedUserDetails?.length > 0 && (
            <React.Fragment>
              &nbsp;
              <span className="font-12 font-weight-light">
                is with
                <Link
                  route={`/profile/${taggedUserDetails[0]?.user.profileId}`}
                >
                  <span className="ml-1 cursor-pointer font-12 font-weight-bold">
                    {taggedUserDetails[0]?.user.firstName}{" "}
                    {taggedUserDetails[0]?.user.lastName || ""}
                  </span>
                </Link>
              </span>
            </React.Fragment>
          )}
          {taggedUserDetails?.length > 1 && (
            <React.Fragment>
              &nbsp;
              <span className="font-12 font-weight-light">and other</span>
              <Tooltip
                placement="bottom"
                title={taggedUserDetails?.map((taggedUser, index) =>
                  index != 0 ? (
                    <div>
                      {taggedUser.user.firstName}{" "}
                      {taggedUser.user.lastName || ""}
                    </div>
                  ) : (
                    ""
                  )
                )}
              >
                <span className="ml-1 font-12 font-weight-light">
                  {taggedUserDetails?.length - 1} people
                </span>
              </Tooltip>
            </React.Fragment>
          )}
        </Card.Title>
      </div>
    </CardHeader>
  );
};

export default PostHeader;
