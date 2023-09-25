import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { setPostImage, toggleModals } from "../../../store/actions";
import CropImages from "components/CropImages/CropImages";
import { useTranslation } from "react-i18next";

export const PhotoPost = () => {
  const [lang] = useTranslation("language");
  const dispatch = useDispatch();
  const [selectFile, setSelectFile] = useState("");
  const [error, setError] = useState(false);
  const [imgSizeError, setImgSizeError] = useState();
  const handleChange = (src) => {
    if (src !== " ") {
      setSelectFile(src);
      setError(false);
      setImgSizeError();
    }
  };

  const handlePostImage = () => {
    if (selectFile !== "") {
      dispatch(setPostImage(selectFile));
      dispatch(toggleModals({ addpost: true }));
      dispatch(toggleModals({ photopost: false }));
      setError(false);
      setImgSizeError();
    } else {
      setError(true);
      setImgSizeError();
    }
  };

  return (
    <>
      <Modal.Body>
        <CropImages
          handleChange={handleChange}
          imgSizeError={imgSizeError}
          setImgSizeError={setImgSizeError}
          setError={setError}
          type="post"
          //setLoading={setLoading}
        />
        <small className="error form-text">
          {error ? lang("DASHBOARD.PLEASE_SELECT_IMAGE") : ""}
        </small>
      </Modal.Body>
      <Modal.Footer className="d-flex">
        <Button
          variant="btn btn-info btn-sm px-xl-4 px-5 mt-xl-0 mt-2 py-3 w-lg-100 mb-0"
          onClick={handlePostImage}
        >
          {lang("DASHBOARD.ADD_PHOTO")}
        </Button>
      </Modal.Footer>
    </>
  );
};
