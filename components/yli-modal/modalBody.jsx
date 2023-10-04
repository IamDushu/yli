import modalCss from "./modal.module.scss";

export function ModalBody(props) {

  return (
    <div className={`${modalCss["yli-modal-body"]}`}>
        {props.children}
    </div>
  );
}

export default ModalBody;
