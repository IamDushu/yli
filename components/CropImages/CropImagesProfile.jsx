import React, { Component } from "react";
import "react-image-crop/dist/ReactCrop.css";
import { image } from "../../api"; // Used for api call
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { getImageDimensions, showMessageNotification } from "utils";
import { IMAGE_UPLOAD } from "api/routes";
import { ADMIN_API_URL } from "config";
import WithPopup from "components/with-popup/with-popup";
import { Form, Modal } from "react-bootstrap";
import { onImageError } from "utils";

class CropImagesProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      src: null,
      crop: {
        unit: "%",
        width: 30,
        aspect: 16 / 9,
      },
      photo: this?.props?.formik
        ? this?.props?.formik?.initialValues?.logo ||
          this?.props?.formik?.values?.companyLogo ||
          null
        : this.props.name,
      open: false,
      isUploading: false,
      Cropper,
      initialAspectRatio: 1,
    };
  }

  componentDidUpdate() {
    if (
      this.state.src !== this.props.initialValues?.logo &&
      this.props.initialValues?.logo
    ) {
      this.setState({ src: this.props.initialValues?.logo });
    }
  }

  /******************* 
  @Purpose : Used for open modal
  @Parameter : {}
  @Author : INIC
  ******************/
  openModel = () => {
    this.setState({ open: true });
  };
  /******************* 
  @Purpose : Used for close modal
  @Parameter : {}
  @Author : INIC
  ******************/
  closeLoginModal = () => {
    this.setState({ open: false, src: null });
  };
  /******************* 
  @Purpose : Used convert base64 to blob data
  @Parameter : b64Data, contentType, sliceSize
  @Author : INIC
  ******************/
  b64toBlob(b64Data, contentType, sliceSize) {
    contentType = contentType || "";
    sliceSize = sliceSize || 512;
    let byteCharacters = atob(b64Data);
    let byteArrays = [];
    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      let slice = byteCharacters.slice(offset, offset + sliceSize);
      let byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      let byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
    return new Blob(byteArrays, { type: contentType });
  }
  /******************* 
  @Purpose : Used for file upload
  @Parameter : {}
  @Author : INIC
  ******************/
  fileUploadSubmit = async () => {
    if (this.state.imageError) return;
    this.setState({ isUploading: true });
    let formData = new FormData();
    let b64Data =
      this.state.Cropper && this.state.Cropper.getCroppedCanvas().toDataURL();

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
      this.setState({ isUploading: false });
      if (response.status === 1) {
        this.setState({
          open: false,
          photo: response.data.fileUrl,
          src: null,
        });
        this.props.handleChange(this.state.photo);
      }
    } catch (error) {
      this.setState({ isUploading: false });
      showMessageNotification(error, "error");
      throw error;
    }
  };
  /******************* 
  @Purpose : Used for file selection
  @Parameter : e
  @Author : INIC
  ******************/
  onSelectFile = async (e) => {
    const fileSizeInKB = e.target.files[0].size / 1000;
    const fileSizeInMB = fileSizeInKB / 1000;
    this.props.closePopupHandler();
    if (e.target.files && e.target.files.length > 0) {
      if (fileSizeInMB > 2) {
        showMessageNotification("Maximum upload size is 2 MB", "error", 3000);
        return;
      }
      const reader = new FileReader();
      reader.addEventListener("load", async () => {
        await getImageDimensions(reader.result).then((res) => {
          this.setState({ initialAspectRatio: res.w / res.h });
          this.setState({ src: reader.result });
          this.setState({ open: true });
        });
      });
      reader.readAsDataURL(e.target.files[0]);
    }
  };
  /******************* 
  @Purpose : Used for image load
  @Parameter : image
  @Author : INIC
  ******************/
  onImageLoaded = (loadedImage) => {
    this.imageRef = loadedImage;
  };
  /******************* 
  @Purpose : Used for action perform after crop image 
  @Parameter : crop
  @Author : INIC
  ******************/
  onCropComplete = (crop) => {
    this.makeClientCrop(crop);
  };
  /******************* 
  @Purpose : Used for change crop image
  @Parameter : crop, percentCrop
  @Author : INIC
  ******************/
  onCropChange = (crop, percentCrop) => {
    this.setState({ crop });
  };
  /******************* 
  @Purpose : Used for default image crop
  @Parameter : crop
  @Author : INIC
  ******************/
  async makeClientCrop(crop) {
    if (this.imageRef && crop.width && crop.height) {
      const croppedImageUrl = await this.getCroppedImg(
        this.imageRef,
        crop,
        "newFile.jpeg"
      );
      this.setState({ croppedImageUrl });
    }
  }
  /******************* 
  @Purpose : Used for get croped images
  @Parameter : image, crop, fileName
  @Author : INIC
  ******************/
  getCroppedImg(croppedImage, crop, fileName) {
    const canvas = document.createElement("canvas");
    const scaleX = croppedImage.naturalWidth / croppedImage.width;
    const scaleY = croppedImage.naturalHeight / croppedImage.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext("2d");

    ctx.drawImage(
      croppedImage,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    return new Promise((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (!blob) {
          return;
        }
        blob.name = fileName;
        window.URL.revokeObjectURL(this.fileUrl);
        this.fileUrl = canvas.toDataURL("image/jpeg");
        let item_image = this.fileUrl.replace(
          /^data:image\/(png|jpg);base64,/,
          ""
        );
        this.setState({ b64Img: item_image });
        resolve(this.fileUrl);
      }, "image/jpeg");
    });
  }

  /******************* 
  @Purpose : Used for render HTML in our components
  @Parameter : {}
  @Author : INIC
  ******************/
  render() {
    let { src, open, isUploading } = this.state;

    return (
      <React.Fragment>
        <div>
          <Modal
            centered
            show={open}
            contentLabel="Example Modal"
            size="lg"
            onHide={() => {
              this.setState({ open: false, src: null });
            }}
          >
            <Modal.Header>
              <h2 className="h6 m-0 Heading">Profile Image</h2>
            </Modal.Header>
            {src && (
              <>
                <Modal.Body>
                  <i onClick={() => this.setState({ src: "", open: false })} />
                  <Cropper
                    style={{ height: 400, width: "100%" }}
                    initialAspectRatio={this.state.initialAspectRatio}
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
                      this.setState({ Cropper: instance });
                    }}
                  />
                </Modal.Body>
                <Modal.Footer className="d-flex align-items-center justify-content-between flex-wrap border-top border-geyser t">
                  <button
                    disabled={isUploading && true}
                    className="btn btn-dark font-weight-semibold"
                    type="button"
                    onClick={() => this.setState({ open: false, src: null })}
                  >
                    Cancel
                  </button>
                  <button
                    className="btn btn-primary"
                    type="button"
                    onClick={this.fileUploadSubmit}
                  >
                    {" "}
                    {isUploading ? "Uploading..." : "Upload"}
                  </button>
                </Modal.Footer>
              </>
            )}
          </Modal>
          <div id="addDiv">
            <label htmlfor="attach-file" className="m-0">
              <div
                className={
                  this.props.type === "myProfile"
                    ? "position-relative d-inline-block cursor-pointer rounded-pill"
                    : "overflow-hidden rounded-pill"
                }
              >
                {this.props.type === "myProfile" ? (
                  <img
                    src={
                      this.state.photo
                        ? this.state.photo
                        : "../assets/images/user-noimg.jpg"
                    }
                    alt="Profile Picture"
                    width="72"
                    height="72"
                    style={{ borderRadius: "180px" }}
                    onError={(e) => {
                      onImageError(e, "profile", this.props.fullname);
                    }}
                  />
                ) : (
                  <picture>
                    <img
                      src={
                        this.state.photo
                          ? this.state.photo
                          : "../assets/images/onboarding/user-profile.jpg"
                      }
                      alt="Profile Picture"
                      width="160"
                      height="160"
                      onError={(e) => {
                        onImageError(e);
                      }}
                    />
                  </picture>
                )}
                {this.props.type === "myProfile"
                  ? src === null &&
                    this.props.isSelfProfile &&
                    !this.props.viewmode && (
                      <span
                        className={"custom-file-input-box profile-upload-icon"}
                      >
                        <i className="material-icons font-16">photo_camera</i>
                        <input
                          type="file"
                          accept="image/png, image/jpg, image/jpeg"
                          className="custom-file-input-banner font-28 position-absolute profile-img-center"
                          name={this.props.name}
                          data-title="Drag and drop a file"
                          onChange={this.onSelectFile}
                          style={{ bottom: 0, right: 0 }}
                        />
                      </span>
                    )
                  : src === null && (
                      <Form.Group
                        controlId="formFile"
                        className="position-absolute custom-inputwrap-center m-0"
                      >
                        <label className="custom-file-input-banner bx bx-camera font-28">
                          <Form.Control
                            type="file"
                            accept="image/png, image/jpg, image/jpeg"
                            className=" font-28"
                            name={this.props.name}
                            onChange={this.onSelectFile}
                          />
                        </label>
                      </Form.Group>
                    )}
              </div>
            </label>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

/******************* 
@Purpose : Used for customize theme and connect redux
@Parameter : {}
@Author : INIC
******************/
export default WithPopup(CropImagesProfile);
