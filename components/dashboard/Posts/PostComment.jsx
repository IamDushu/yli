import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import Button from "@mui/material/Button";

export default function PostComment({
  showCounter,
  totalCount,
  handleUserComments,
  postDetails,
  currentUserInfo,
}) {
  function handleComment() {
    postDetails?.whoCanComment === "No one" ||
    (postDetails?.whoCanComment === "Connections only" &&
      postDetails?.userDetails?.id !== currentUserInfo?.id &&
      !postDetails?.userDetails?.connectionData?.length) ||
    (postDetails?.whoCanComment === "Growth connections only" &&
      postDetails?.userDetails?.id !== currentUserInfo?.id &&
      !postDetails?.userDetails?.growthConnectionData?.isGrowthConnection)
      ? null
      : handleUserComments();
  }

  return (
    <Button
      color="inherit"
      onClick={handleComment}
      startIcon={<ChatBubbleOutlineIcon />}
    >
      {showCounter && totalCount}
    </Button>
  );
}
