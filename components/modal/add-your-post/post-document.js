import React, { useState } from "react";
import { Button, Spinner, Modal } from "react-bootstrap";
import { FileUploader } from "react-drag-drop-files";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { toggleModals, uploadPostDocument } from "../../../store/actions";

export const DocumentPost = () => {
  const [lang] = useTranslation("language");
  const dispatch = useDispatch();
  const [selectFile, setSelectFile] = useState("");
  const [docError, setDocError] = useState(false);
  const [docSizeError, setDocSizeError] = useState("");
  const [loading, setLoading] = useState(false);
  const fileTypes = ["PDF", "DOC", "DOCX", "HTML", "HTM", "XLS", "XLSX", "TXT"];

  const handlePickDocument = async (event) => {
    const documentData = new FormData();
    documentData.append("file", event);
    setLoading(true);
    const response = await dispatch(uploadPostDocument(documentData));
    if (response) {
      setSelectFile(response.fileUrl);
      setDocSizeError("");
      setLoading(false);
      setDocError(false);
    }
  };

  const handlePostDocument = async () => {
    if (selectFile !== "") {
      dispatch(toggleModals({ addpost: true }));
      dispatch(toggleModals({ documentpost: false }));
      setDocError(false);
      setDocSizeError("");
    } else {
      setDocError(true);
    }
  };

  return (
    <>
      {loading ? (
        <center>
          <Spinner as="span" animation="border" variant="primary" />
        </center>
      ) : (
        <Modal.Body>
          <div className="fullwidth-dropzone sm-6 md-6 lg-6 mb-3">
            {selectFile !== "" ? (
              <object
                data={selectFile}
                type="application/pdf"
                className="previewImage w-100 dropzone-wrap-xxl"
              />
            ) : (
              <FileUploader
                handleChange={handlePickDocument}
                children={
                  <div className="dropzone-wrap-xxl text-center pointer w-100">
                    <em className="icon icon-upload-cloud font-44 pb-0"></em>
                    <p className="m-0 font-16 text-geyser font-medium">
                      {lang("DASHBOARD.UPLOAD_FILE_HERE")}
                    </p>
                  </div>
                }
                name="file"
                types={fileTypes}
                maxSize={5}
                onSizeError={() =>
                  setDocSizeError(lang("DASHBOARD.DOC_LENGTH_ERROR"))
                }
                style="Width: 100%"
              />
            )}
          </div>
        </Modal.Body>
      )}

      <small className="error form-text">
        {docError
          ? lang("DASHBOARD.PLEASE_SELECT_DOCUMENT")
          : docSizeError
          ? docSizeError
          : ""}
      </small>

      <Modal.Footer className="d-flex">
        <Button
          variant="btn btn-info btn-sm px-xl-4 px-5 mt-xl-0 mt-2 py-3 w-lg-100 mb-0"
          onClick={handlePostDocument}
        >
          {lang("DASHBOARD.UPLOAD_DOCUMENT")}
        </Button>
      </Modal.Footer>
    </>
  );
};
