import { Icon } from "components/icons";
import modalCss from "./modal.module.scss";

export function ModalHeader({
  closeIcon = true,
  hideHeader = false,
  header,
  closeModal,
}) {
  return (
    <div className={`${modalCss["yli-modal-header-container"]}`}>
      {!hideHeader && (
        <div className={`${modalCss["yli-modal-header"]}`}>
          <span className={`${modalCss["yli-model-header-content"]}`}>{header}</span>
          {closeIcon && (
            <div className="pointer">
              <Icon iconName="closeIcon" handleClick={() => closeModal()} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default ModalHeader;
