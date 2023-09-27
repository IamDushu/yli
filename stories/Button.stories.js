import { YliwayButton } from "../components/button";

export default {
  title: "Components/Button",
  component: YliwayButton,
  argTypes: {
    handleClick: { action: "handleClick" },
    backgroundColor: { control: "color" },
  
    },
};

export const primary = {
  args: {
    primary: true,
    label: "Primary",
    backgroundColor:"color",
    
  },
};


export const primaryOutlined = {
  args: {
    primaryOutlined: true,
    label: "PrimaryOutlined",
    backgroundColor:"color",
  },
};

export const textButton = {
  args: {
    textbutton: true,
    label: "Text Button",
    backgroundColor:"color",
  },
};

