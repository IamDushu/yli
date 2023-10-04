import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import PostFooter from "components/dashboard/Posts/PostFooter";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { toggleModals } from "store/actions";
import { postImageHandler, timeAgo } from "utils";
import PostVideo from "components/dashboard/Posts/PostVideo";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
  // width:500,
};

// videoURL
export default function ReportPostModal({
  keyModal,
  open,
  onClose,
  body
}) {
  const [shareopen, setShareopen] = useState(false);
  return (
    <>
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
        >
        <Box
          sx={{ ...style }}
        >
            {body}
         </Box>
      </Modal>
    </>
  );
}
