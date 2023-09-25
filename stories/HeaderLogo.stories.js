import { Logo } from "../components/header/logo";

export default {
  title: "Components/header/header-logo",
  component: Logo,
  argTypes: {
    handleClick: { action: "handleClick" },
  },
};

export const Image = {
  args: {
    logoUrl: "assets/images/brand-logo.svg",
  },
};
