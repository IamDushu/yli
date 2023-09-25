import React, { Fragment, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getPreviewUrl } from "store/actions";
import MessagePreview from "./linkpreview/messages";
import PostLinkPreview from "./linkpreview/post";

export const LinkPreviewGenerator = ({
  url,
  type,
  currentChannel,
  image,
  title,
}) => {
  const dispatch = useDispatch();
  const [previewData, setPreviewData] = useState({});
  useEffect(async () => {
    dispatch(
      getPreviewUrl({
        url,
        image: image ? image : undefined,
      })
    ).then((res) => {
      if (res) {
        setPreviewData(res);
      }
    });
  }, [url]);

  return url ? (
    <section className="section mt-3">
      {type === "messages" ? (
        <MessagePreview
          previewData={previewData}
          currentChannel={currentChannel}
        />
      ) : (
        <PostLinkPreview previewData={previewData} title={title} />
      )}
    </section>
  ) : (
    ""
  );
};
