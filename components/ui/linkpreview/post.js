import React from "react";

const PostLinkPreview = ({ previewData, title }) => {
  return (
    <div className="box border-top p-3 border-geyser text-center">
      {(!previewData?.images ||
        previewData?.images?.length === 0 ||
        (previewData?.images?.length > 0 &&
          previewData?.images?.[0] &&
          !previewData?.images?.[0]?.includes(null))) && (
          <img
            id="myimage"
            src={
              previewData?.images?.[0] || previewData?.url || "/assets/images/broken-link-chain.svg"
            }
            className="img-fluid w-75 m-auto mb-2"
          />
        )}
      <div className="is-clipped">
        <div id="mytitle" className="font-weight-semibold">
          {previewData?.title}
        </div>
        <div id="mydescription" className="mt-2 text-gray">
          {previewData?.description}
        </div>
        <a href="">
          <a
            id="myurl"
            className="mt-2 is-size-7 text-primary pointer"
            href={previewData?.url}
            target="_blank"
          >
            {title ? title : previewData?.url}
          </a>
        </a>
      </div>
    </div>
  );
};

export default PostLinkPreview;
