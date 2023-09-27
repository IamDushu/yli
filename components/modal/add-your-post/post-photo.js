import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { setPostImage, toggleModals } from "../../../store/actions";
import CropImages from "components/CropImages/CropImages";
import { useTranslation } from "react-i18next";
import { YliwayButton } from "components/button";

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
      <Modal.Body className="pb-0">
        <CropImages
          handleChange={handleChange}
          imgSizeError={imgSizeError}
          setImgSizeError={setImgSizeError}
          setError={setError}
          type="post"
          isNewUi={true}
          //setLoading={setLoading}
        />
        <small className="error form-text">
          {error ? lang("DASHBOARD.PLEASE_SELECT_IMAGE") : ""}
        </small>
      </Modal.Body>
      <Modal.Footer className="d-flex pt-0">
        <div>
          <YliwayButton
            label={lang("COMMON.BACK")}
            size={"medium"}
            fontWeight={500}
            primaryOutlined={true}
            handleClick={() => {
              dispatch(toggleModals({ photopost: false }));
            }}
          />
        </div>
        <div>
          <YliwayButton
            size="medium"
            primary={true}
            fontWeight={500}
            label={lang("COMMON.NEXT")}
            handleClick={handlePostImage}
          />
        </div>
      </Modal.Footer>
    </>
  );
};
