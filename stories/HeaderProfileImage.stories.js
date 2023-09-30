import { HeaderProfile } from "../components/header/header-profile-section";

export default {
  title: "Components/header/headerProfileImage",
  component: HeaderProfile,
  argTypes: {
    handleClick: { action: "handleClick" },
  },
};

export const Image = {
  args: {
    imageUrl: "/assets/images/homepage/user-1.png",
  },
};
