import { Autocomplete } from "components/form-fields";

export default {
  title: "Components/Autocomplete",
  component: Autocomplete,
  argTypes: {
    placeholder: { control: "text" },
    width: { control: "text" },
    label: { control: "text" },
  },
};

export const single = {
  args: {
    label: "Single Select",
    defaultOptions: [
      { label: "Label 1", value: 1 },
      { label: "Label 2", value: 2 },
      { label: "Label 3", value: 3 },
    ],
    placeholder: "Single Select",
    value: { label: "Label 2", value: 2 },
    autoComplete: false,
  },
};

export const multiple = {
  args: {
    label: "Multi Select",
    defaultOptions: [
      { label: "Label 1", value: 1 },
      { label: "Label 2", value: 2 },
      { label: "Label 3", value: 3 },
      { label: "Label 4", value: 4 },
    ],
    placeholder: "Multiple select",
    value: [
      { label: "Label 2", value: 2 },
      { label: "Label 4", value: 4 },
    ],
    autoComplete: false,
  },
};
