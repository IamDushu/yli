import { ADMIN_API_URL } from "config";
import { IMAGE_URL } from "config";
import React from "react";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { downloadDocument } from "store/actions";
/******************** 
@purpose : Post Document
@Parameter : { listData, type }
@Author : INIC
******************/
const PostDocument = ({ listData, type }) => {
  /**
   * Download post file
   */
  const downloadFile = () => {
    let fileUrl = type
      ? listData?.postShareDetails?.documentURL !== null
        ? `${listData?.postShareDetails?.documentURL}`
        : ""
      : listData?.postDetails?.documentURL === null
        ? ""
        : `${listData?.postDetails?.documentURL}`;
    let newFileUrl = fileUrl.replace(
      IMAGE_URL,
      `${ADMIN_API_URL}/download?fileName=`
    );
    window.open(newFileUrl, "_blank");
  };
  return (
    <div className="col-sm-12 col-md-12 col-lg-12 p-0">
      <object
        width="100%"
        height="100%"
        className="ml-0 mr-0"
        data={
          type
            ? listData?.postShareDetails?.documentURL !== null
              ? `${listData?.postShareDetails?.documentURL}`
              : ""
            : listData?.postDetails?.documentURL === null
              ? ""
              : `${listData?.postDetails?.documentURL}`
        }
        type="application/pdf"
      />
      <Button
        className="bg-secondary-purple border-radius-0"
        variant="primary"
        size="md"
        block
        onClick={downloadFile}
      >
        <i className="bx bxs-download cursor-pointer"></i> Download
      </Button>
    </div>
  );
};

export default PostDocument;
