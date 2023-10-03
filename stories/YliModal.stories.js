import YliModalUI from "components/yli-modal/ModalUI";
import ModalBody from "components/yli-modal/modalBody";
import ModalFooter from "components/yli-modal/modalFooter";

export default {
  title: "Components/YliModalUI",
  component: YliModalUI,
  argTypes: {
    body: "Body Text/Component",
    show: true,
  },
};

export const TextModal = {
  args: {
    body: (
      <ModalBody>
        <div>Body Text/Component</div>
      </ModalBody>
    ),
    show: true,
    header: "Header Text",
    keyModal: "deleteMessage",
  },
};

export const TextModalWithFooter = {
  args: {
    body: (
      <ModalBody>
        <div>Body Text/Component</div>
        <ModalFooter
          showCanel
          cancleHandleClick={() => {}}
          performButtonTitle={"Save"}
          performHandleClick={() => {}}
        />
      </ModalBody>
    ),
    show: true,
    header: "Header Text",
    keyModal: "deleteMessage",
  },
};
