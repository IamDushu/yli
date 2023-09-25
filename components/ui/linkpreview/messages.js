import React from "react";

const MessagePreview = ({ previewData, currentChannel }) => {
  return (
    <div
      className={`box border p-3 border-geyser text-center w-100 h-100 ${
        currentChannel !== "sidebar" && Object.keys(previewData).length > 0
          ? "d-flex align-items-center"
          : ""
      }`}
    >
      <img
        id="myimage"
        src={previewData?.images?.[0] || "/assets/images/broken-link-chain.svg"}
        className="img-fluid m-auto mb-2"
        height="100px"
        width="100px"
      />
      <div
        className={`is-clipped ${
          currentChannel === "sidebar" ? "mt-2" : ""
        } text-left pl-3 w-75`}
      >
        {currentChannel !== "sidebar" && (
          <>
            <div id="mytitle" className="font-weight-semibold">
              {previewData?.title}
            </div>
            <div
              id="mydescription "
              className="mt-2 text-gray text-ellipsis w-100"
            >
              {previewData?.description}
            </div>
          </>
        )}
        <a href="">
          <a
            id="myurl"
            className="mt-2 is-size-7 text-primary pointer"
            href={previewData?.url}
            target="_blank"
          >
            {previewData?.url}
          </a>
        </a>
      </div>
    </div>
  );
};

export default MessagePreview;
