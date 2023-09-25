import { HeaderLabel } from "../components/header/main-menu-label";

export default {
  title: "Components/header/header-label",
  component: HeaderLabel,
  argTypes: {
    handleClick: { action: "handleClick" },
  },
};

export const Label = {
  args: {
    labelText: "Home",
  },
};
