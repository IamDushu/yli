import { Icon } from "../components/icons";

export default {
  title: "Components/icons",
  component: Icon,
  argTypes: {
    handleClick: { action: "handleClick" },
  },
};

export const addConnectionIcon = {
  args: {
    iconName: "addConnectionIcon",
  },
};

export const viewProfileIcon = {
  args: {
    iconName: "viewProfileIcon",
  },
};

export const growthConnectionIcon = {
  args: {
    iconName: "growthConnectionIcon",
  },
};
