import { AssistChips } from "components/assist-chips";

export default {
  title: "Components/AssistChips",
  component: AssistChips,
  argTypes: {
    handleClick: { action: "handleClick" },
  },
};

export const sampleAssistChips = {
  args: {
    backgroundColor: "white",
    color: "#6750A4",
    border: "1px solid #6750A4",
    iconName: "",
    paddingX: "8px",
    label:"checking",
    paddingY: "6px",
    arrow:"assets/images/assist-chip-down-arrow.svg"
  },
};

export const postTypeAssistChips = {
  args: {
    backgroundColor: "white",
    color: "#48464A",
    border: "none",
    iconName: "postPhoto",
    paddingX: "10px",
    label:"checking",
    paddingY: "16px",
    arrow:""
  },
};
