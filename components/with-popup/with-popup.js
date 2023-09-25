import React from "react";
import { Modal } from "react-bootstrap";
import { usePopup } from "./../../hooks/index";
/******************** 
  @purpose :With Popup
  @Parameter : {}
  @Author : INIC
  ******************/
const WithPopup = (Component) => (props) => {
  const [popupInfo, togglePopup] = usePopup();
  /******************** 
  @purpose :Open popup handler
  @Parameter : {}
  @Author : INIC
  ******************/
  const openPopupHandler = (e) => {
    togglePopup(true);
  };
  /******************** 
  @purpose :Edit popup handler
  @Parameter : {}
  @Author : INIC
  ******************/
  const editPopupHandler = (data) => {
    togglePopup(true, true, data);
  };
  /******************** 
  @purpose :Close popup handler
  @Parameter : {}
  @Author : INIC
  ******************/
  const closePopupHandler = (e) => {
    togglePopup(false, false, null);
  };

  const componentProps = {
    openPopupHandler,
    editPopupHandler,
    closePopupHandler,
    popupInfo,
  };
  const renderPopup = (title, renderPopupBodyComponent) => (
    <Modal
      centered
      size="lg"
      backdrop="static"
      show={popupInfo.show}
      contentClassName=""
      // profile-edit-modal
      dialogClassName="custom-modal-footer"
      // className="modal-md"
      onHide={closePopupHandler}
      enforceFocus={false}
      focus={false}
      animation={false}
      // enforceFocus="false"
    >
      <Modal.Header closeButton>
        <h2 className="h4 m-0 font-20">{title}</h2>
      </Modal.Header>
      <Modal.Body className="p-0 rounded-b-16" closeButton>
        {renderPopupBodyComponent(componentProps)}
      </Modal.Body>
    </Modal>
  );

  return <Component {...componentProps} {...props} renderPopup={renderPopup} />;
};
export default WithPopup;
