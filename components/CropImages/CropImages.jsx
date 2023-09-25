import React, { useEffect, useState } from "react";
import "react-image-crop/dist/ReactCrop.css";
import { image } from "../../api"; // Used for api call
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { Modal } from "react-bootstrap";
import { IMAGE_UPLOAD } from "api/routes";
import { ADMIN_API_URL } from "config";
import WithPopup from "components/with-popup/with-popup";
import { FileUploader } from "react-drag-drop-files";
import { getBase64 } from "@utils";
import { getImageDimensions, showMessageNotification } from "utils";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useTranslation } from "react-i18next";
import { uploadPostDocument } from "store/actions";
import { useDispatch } from "react-redux";
import noop from "lodash/noop";

/******************* 
@Purpose : Used for custome modal desgin
@Author : INIC
******************/

const CropImagesProfile = ({
  groupImage,
  editImage,
  setImgSizeError = noop,
  type: type1,
  isEdit,
  name,
  setError = noop,
  imgSizeError,
  handleChange,
  closePopupHandler,
  withDelete = false,
  logoSize = false,
  bannerSize = false,
  formik,
  setLoading,
  setSelectFile,
  selectFile,
}) => {
  const [lang] = useTranslation("language");
  const dispatch = useDispatch();
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  const [state, setState] = useState({
    src: groupImage !== undefined ? groupImage : "" || editImage || null,
    crop: {
      unit: "%",
      width: 30,
      aspect: 16 / 9,
    },
    photo: groupImage !== undefined ? groupImage : "" || editImage || null,
    open: false,
    isUploading: false,
    Cropper,
    imgSizeError: "",
  });
  const [initialAspectRatio, setInitialAspectRatio] = useState("");

  useEffect(() => {
    if (groupImage !== undefined) {
      setState((stateValue) => ({ ...stateValue, src: groupImage }));
    }
  }, [groupImage]);

  /******************* 
  @Purpose : Used for close modal
  @Parameter : {}
  @Author : INIC
  ******************/
  const closeLoginModal = (imgSize) => {
    setState((stateValue) => ({ ...stateValue, open: false, src: null }));
    if (imgSize) {
      setImgSizeError();
    }
  };

  /******************* 
  @Purpose : Used for file upload
  @Parameter : {}
  @Author : INIC
  ******************/
  const fileUploadSubmit = async () => {
    setState((stateValue) => ({ ...stateValue, isUploading: true }));
    let formData = new FormData();
    let b64Data =
      state.Cropper && state.Cropper.getCroppedCanvas()?.toDataURL();

    if (b64Data) {
      let type = "image/png";
      var byteString = atob(b64Data.split(",")[1]);
      var ab = new ArrayBuffer(byteString.length);
      var ia = new Uint8Array(ab);
      for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      var bb = new Blob([ab], { type: type });
    }

    formData.append("file", bb);
    try {
      const response = await image(
        { serviceURL: ADMIN_API_URL },
        IMAGE_UPLOAD,
        false,
        formData,
        true
      );
      setState((stateValue) => ({
        ...stateValue,
        isUploading: false,
        imgSizeEror: "",
      }));
      if (response.status === 1) {
        const xi = response.data.fileUrl;
        setState((stateValue) => ({
          ...stateValue,
          open: false,
          src: xi,
          photo: xi,
        }));
        handleChange(xi);
      }
    } catch (error) {
      setState((stateValue) => ({
        ...stateValue,
        isUploading: false,
        imgSizeEror: "",
      }));
      showMessageNotification(error, "error");
      throw error;
    }
  };

  /******************* 
  @Purpose : Used to check dimensions
  @Parameter : w, h, result
  @Author : YLIWAY
  ******************/

  const dimensionsCheck = (w, h, result) => {
    if (
      logoSize
        ? (w === 200 && h === 200) || (w === 400 && h === 400)
        : bannerSize
        ? (w >= 728 && h >= 410) ||
          (w >= 854 && h >= 480) ||
          (w >= 1280 && h >= 720) ||
          (w >= 1920 && h >= 1080)
        : (w >= 870 && h >= 344) ||
          (w >= 1244 && h >= 492) ||
          (w >= 1617 && h >= 640)
    ) {
      setState((stateValue) => ({
        ...stateValue,
        src: result,
        open: true,
      }));
    } else {
      setState((stateValue) => ({
        ...stateValue,
        open: false,
        src: null,
      }));
      showMessageNotification(
        logoSize
          ? "Image should be  200 X 200 or 400 x 400"
          : bannerSize
          ? "Image should not be less than 728 X 410 or 854 X 480 or 1280 x 720 or 1920 x 1080"
          : "Image should not be less than  870 X 344 or 1244 X 492 or 1617 X 640",
        "error"
      );
    }
  };

  /******************* 
  @Purpose : Used for file selection
  @Parameter : e
  @Author : INIC
  ******************/
  const onSelectFile = async (event, type) => {
    closePopupHandler();
    let resultData;
    if (event.type === "application/pdf" && type1 === "coach") {
      const documentData = new FormData();
      documentData.append("file", event);
      setLoading(true);
      const response = await dispatch(uploadPostDocument(documentData));
      if (response) {
        formik?.setFieldValue("coachCertificateURL", response.fileUrl);
        setSelectFile(response.fileUrl);
        setLoading(false);
      }
    } else if (type === "input") {
      if (event && event.target.files.length > 0) {
        const reader = new FileReader();
        reader.addEventListener("load", async () => {
          await getImageDimensions(reader.result).then((res) => {
            resultData = res;
            setInitialAspectRatio(res.w / res.h);
          });
          const { w, h } = resultData;
          dimensionsCheck(w, h, reader.result);
        });
        reader.readAsDataURL(event.target.files[0]);
      }
    } else {
      getBase64(event).then(async (result) => {
        await getImageDimensions(result).then((res) => {
          resultData = res;
        });
        const { w, h } = resultData;
        dimensionsCheck(w, h, result);
      });
    }
  };

  let { src, open, photo, isUploading } = state;

  const fileTypes =
    type1 === "coach"
      ? [
          "PDF",
          "JPEG",
          "JPG",
          "PNG",
          "GIF",
          "TIFF",
          "PSD",
          "EPS",
          "AI",
          "INDD",
          "RAW",
        ]
      : [
          "JPEG",
          "JPG",
          "PNG",
          "GIF",
          "TIFF",
          "PSD",
          "EPS",
          "AI",
          "INDD",
          "RAW",
        ];

  return (
    <React.Fragment>
      <div>
        <Modal
          centered
          show={open}
          onHide={() => {
            closeLoginModal(true);
            setInitialAspectRatio("");
          }}
          style={customStyles}
          contentLabel="Example Modal"
          backdrop="static"
        >
          <Modal.Body>
            {state.src && (
              <div>
                <i
                  onClick={() =>
                    setState((stateValue) => ({
                      ...stateValue,
                      src: "",
                      open: false,
                    }))
                  }
                />
                <Cropper
                  style={{ height: 400, width: "100%" }}
                  initialAspectRatio={initialAspectRatio}
                  preview=".img-preview"
                  src={src}
                  viewMode={1}
                  guides={true}
                  minCropBoxHeight={10}
                  minCropBoxWidth={10}
                  background={false}
                  responsive={true}
                  autoCropArea={1}
                  checkOrientation={false}
                  onInitialized={(instance) => {
                    setState((stateValue) => ({
                      ...stateValue,
                      Cropper: instance,
                    }));
                  }}
                />
                <div className="d-flex align-items-center justify-content-between flex-wrap mt-2">
                  <button
                    className="btn btn-primary"
                    type="button"
                    onClick={() => {
                      fileUploadSubmit();
                    }}
                  >
                    {isUploading
                      ? lang("DASHBOARD.UPLOADING")
                      : lang("DASHBOARD.UPLOAD")}
                  </button>

                  <button
                    disabled={isUploading && true}
                    className="btn btn-dark"
                    type="button"
                    onClick={() => {
                      setInitialAspectRatio("");
                      setState((stateValue) => ({
                        ...stateValue,
                        src: src !== null ? photo : null,
                        open: false,
                      }));
                      if (type1 === "post" || type1 === "articles")
                        if (typeof setImgSizeError === "function") {
                          setImgSizeError();
                        }
                    }}
                  >
                    {lang("COMMON.CANCEL")}
                  </button>
                </div>
              </div>
            )}
          </Modal.Body>
        </Modal>

        <div
          className={`fullwidth-dropzone overflow-hidden mb-3 ${
            type1 === "groups" && "groupFixedWidth"
          }`}
        >
          {(type1 === "groups" || type1 === "articles" || type1 === "coach") &&
            state?.src !== null && (
              <div className="crop-group-box">
                {withDelete ? (
                  <div className="label-bg-new">
                    <label htmlfor="attach-file" className="m-0">
                      <div
                        className={"label-inside-img icon-delete"}
                        onClick={() => {
                          setState((stateValue) => ({
                            ...stateValue,
                            src: null,
                          }));
                          handleChange("");
                        }}
                      ></div>
                    </label>
                    <label htmlfor="attach-file" className="ml-3">
                      <span className={"label-inside-img bx bx-camera"}>
                        {/* For logo bx camera icon */}
                        <input
                          type="file"
                          className="custom-file-input-banner font-28 position-absolute profile-img-center"
                          name={name}
                          accept="image/*"
                          data-title="Drag and drop a file"
                          onChange={(e) => onSelectFile(e, "input")}
                          style={{ bottom: 0, right: 0 }}
                        />
                      </span>
                    </label>
                  </div>
                ) : (
                  state?.src && (
                    <label htmlfor="attach-file" className="m-0">
                      <span className={"custom-file-input-box bx bx-camera"}>
                        <input
                          type="file"
                          className="custom-file-input-banner font-28 position-absolute profile-img-center"
                          name={name}
                          accept="image/*"
                          data-title="Drag and drop a file"
                          onChange={(e) => onSelectFile(e, "input")}
                          style={{ bottom: 0, right: 0 }}
                        />
                      </span>
                    </label>
                  )
                )}
                {state.src && (
                  <picture className={!logoSize && "w-100 h-100"}>
                    <source srcSet={state?.src} type="image/jpg" />
                    <img
                      className={
                        type1 === "groups"
                          ? "w-100"
                          : !logoSize
                          ? "object-cover w-100"
                          : "object-cover"
                      }
                      src={state?.src}
                      alt="postImage"
                      {...(type1 === "groups"
                        ? { width: "100" }
                        : logoSize
                        ? { width: "100", height: "100" }
                        : {})}
                    />
                  </picture>
                )}
              </div>
            )}

          {src !== null && src !== "" && type1 === "post" && !isEdit && (
            <LazyLoadImage
              alt="Loading..."
              effect="blur"
              src={state.src}
              wrapperClassName="dropzone-wrap-xxl previewImage object-cover"
            />
          )}
          {!state.src && (
            <FileUploader
              handleChange={onSelectFile}
              children={
                <div className="dropzone-wrap-xxl text-center pointer w-100">
                  <em className="icon icon-upload-cloud font-44 pb-0"></em>
                  <p className="m-0 font-16 text-geyser font-medium">
                    {lang("DASHBOARD.UPLOAD_TITLE")}
                  </p>
                  <small className="m-0 body-text-14 text-geyser font-normal">
                    {logoSize
                      ? `(Size 200 x 200 or 400 x 400 / JPG, PNG)`
                      : bannerSize
                      ? `( Size 728 X 410 or 854 X 480 or 1280 x 720 or 1920 x 1080 / JPG, PNG)`
                      : `( Size 870 X 344 or 1244 X 492 or 1617 X 640 / JPG, PNG)`}
                  </small>
                </div>
              }
              maxSize={5}
              onSizeError={() => {
                setImgSizeError(lang("DASHBOARD.IMAGE_SIZE_ERROR"));
                setError("");
              }}
              name="file"
              types={fileTypes}
            />
          )}
          <div className="fullwidth-dropzone sm-6 md-6 lg-6 mb-3">
            {formik?.values &&
              formik?.values?.coachCertificateURL?.includes("pdf") &&
              selectFile !== "" && (
                <object
                  data={selectFile}
                  type="application/pdf"
                  className="previewImage w-100"
                />
              )}
          </div>
          <small className="error form-text">
            {imgSizeError ? imgSizeError : ""}
          </small>
        </div>
      </div>
    </React.Fragment>
  );
};

/******************* 
@Purpose : Used for customize theme and connect redux
@Parameter : {}
@Author : INIC
******************/
export default WithPopup(CropImagesProfile);
