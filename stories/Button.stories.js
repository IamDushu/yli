import { Button } from "../components/button";

export default {
  title: "Components/Button",
  component: Button,
  argTypes: {
    handleClick: { action: "handleClick" },
    backgroundColor: { control: "color" },
  },
};

export const Primary = {
  args: {
    primary: true,
    label: "Primary",
    backgroundColor:"color"
  },
};

export const PrimaryOutlined = {
  args: {
    PrimaryOutlined: true,
    label: "PrimaryOutlined",
    backgroundColor:"color",
  },
};

export const Secondary = {
  args: {
    Secondary: true,
    label: "Secondary",
    backgroundColor:"color",
  },
};

export const PostAddButton = {
  args: {
    primary: false,
    backgroundColor:"#6750A4",
    label: "Post",
    size: "add-post-dashboard",
  },
};
