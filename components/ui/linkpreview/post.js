import { Box, Link, Stack, Typography } from "@mui/material";
import React from "react";

const PostLinkPreview = ({ previewData, title }) => {
  return (
    <Box>
      {(!previewData?.images ||
        previewData?.images?.length === 0 ||
        (previewData?.images?.length > 0 &&
          previewData?.images?.[0] &&
          !previewData?.images?.[0]?.includes(null))) && (
        <img
          id="myimage"
          src={
            previewData?.images?.[0] ||
            previewData?.url ||
            "/assets/images/broken-link-chain.svg"
          }
        />
      )}
      <Stack mt={1} gap={1}>
        <Typography color={"inherit"} variant="titleSmall">
          {previewData?.title}
        </Typography>
        <Box>
          <Link
            variant="bodySmall"
            color="inherit"
            id="myurl"
            href={previewData?.url}
            target="_blank"
            underline="hover"
          >
            {title ? title : previewData?.url}
          </Link>
        </Box>
      </Stack>
    </Box>
  );
};

export default PostLinkPreview;
