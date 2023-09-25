import { IconButton } from "components/icon-button";

export default {
  title: "Components/IconButton",
  component: IconButton,
  argTypes: {
    handleClick: { action: "handleClick" },
  },
};

export const sampleIconButton = {
  args: {
    circular: true,
    size: "regular",
    iconName : "postPhoto",
    title:"post"
  },
};

export const pollPostIconButton = {
  args: {
    circular: true,
    size: "regular",
    iconName : "postPoll",
    title:"post"
  },
};

