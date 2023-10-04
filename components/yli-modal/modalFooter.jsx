import { useTranslation } from "react-i18next";
import modalCss from "./modal.module.scss";
import { YliwayButton } from "components/button";

export function ModalFooter({
  footerClassName,
  showOk = true,
  showCanel = false,
  footer = true,
  cancleHandleClick,
  performButtonTitle,
  performHandleClick
}) {
  const [lang] = useTranslation("language");

  return (
    <div className={`${modalCss["yli-modal-border"]}`}>
      {footer && (
        <div className={`${footerClassName} ${modalCss["yli-modal-footer"]}`}>
          {showCanel && <YliwayButton
            primaryOutlined
            backgroundColor="white"
            label={lang("COMMON.CANCEL")}
            handleClick={cancleHandleClick}
          />}
          {showOk && <YliwayButton
            primary
            backgroundColor="#6750A4"
            color="white"
            label={performButtonTitle}
            handleClick={performHandleClick}
          />}
        </div>
      )}
    </div>
  );
}

export default ModalFooter;
