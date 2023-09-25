import { Modal } from "react-bootstrap";
import { FileUploader } from "react-drag-drop-files";

/*******************   
@purpose : User Set Thankyou
@Author : INIC
******************/

export const WriteAnArticle = () => {
  const [lang] = useTranslation("language");
  const dispatch = useDispatch();

  const handlePickImage = (event) => {
    setSelectFile(event);
    getBase64(event).then((result) => {
      setSelectedFileBase64(result);
    });
  };

  return (
    <>
      <Editor
        toolbarClassName="toolbarClassName"
        wrapperClassName="wrapperClassName"
        editorClassName="editorClassName"
      />
      <Modal.Body className="text-center">
        <div className="mx-lg-5 px-sm-2">
          <textarea
            className="form-control mb-4"
            rows="10"
            placeholder="Heading"
          ></textarea>
          <div className="fullwidth-dropzone">
            <FileUploader
              handleChange={handlePickImage}
              children={
                <div className="dropzone-wrap-xl text-center pointer">
                  <em className="icon icon-upload-cloud"></em>
                  <p className="m-0 font-16 font-medium">
                    No Cover image uploaded
                  </p>
                </div>
              }
              name="file"
            />
          </div>

          <div className="reaction-icons-sections mt-3 d-flex justify-content-between">
            <div className="reaction-icons-box">
              <div>
                <label className="d-xl-flex align-items-center justify-content-center mb-0">
                  <em className="icon icon-add-gallery reaction-icons"></em>
                  <h5 className="font-14 reaction-icon-text">Images</h5>
                </label>
              </div>
            </div>

            <div className="reaction-icons-box">
              <div>
                <label className="d-xl-flex align-items-center justify-content-center mb-0">
                  <em className="icon icon-add-video reaction-icons"></em>
                  <h5 className="font-14 reaction-icon-text">Videos</h5>
                </label>
              </div>
            </div>

            <div className="reaction-icons-box">
              <div>
                <label className="d-xl-flex align-items-center justify-content-center mb-0">
                  <em className="icon icon-slides reaction-icons"></em>
                  <h5 className="font-14 reaction-icon-text">Slides</h5>
                </label>
              </div>
            </div>

            <div className="reaction-icons-box">
              <div>
                <label className="d-xl-flex align-items-center justify-content-center mb-0">
                  <em className="icon icon-icon-links reaction-icons"></em>
                  <h5 className="font-14 reaction-icon-text">Links</h5>
                </label>
              </div>
            </div>
          </div>
        </div>
      </Modal.Body>
    </>
  );
};
