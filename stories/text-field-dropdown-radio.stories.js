import { CustomSelectWithRadio } from "components/add-post-ui/custom-select-comment-right";

export default {
  title: "Components/CustomSelectWithRadio",
  component: CustomSelectWithRadio,
  argTypes: {
    handleClick: { action: "handleClick" },
    selectedRadioColor: "color",
    labelBgColor: "color",
    inputValueColor: "color",
    menuTextColor: "color",
  },
};

export const sampleCustomSelectWithRadio = {
  args: {
    options: [
        { label: "checking 1", value: 1 },
        { label: "checking 2", value: 2 },
        { label: "checking 3", value: 3 },
    ],
    defaultValue: "default ans",
    label: "Comment Rights",
    selectedRadioColor: "#6750A4",
    labelBgColor: "#FDF8FD",
    labelPadding: "0px 4px 0px 4px",
    inputValueColor: "#49454E",
    menuTextColor: "#1C1B1E",
  },
};

export const sampleCustomSelectWithRadio2 = {
    args: {
      options: [
        { label: "checking 1", value: 1 },
        { label: "checking 2", value: 2 },
        { label: "checking 3", value: 3 },
      ],
      defaultValue: "default ans",
      label: "Comment Rights",
      selectedRadioColor: "red",
      labelBgColor: "#FDF8FD",
      labelPadding: "0px 4px 0px 4px",
      inputValueColor: "#49454E",
      menuTextColor: "#1C1B1E",
    },
  };
