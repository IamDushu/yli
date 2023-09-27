import { ProfileImage } from "../components/profile-image";

export default {
  title: "Components/profileImage",
  component: ProfileImage,
  argTypes: {
    handleClick: { action: "handleClick" },
  },
};

export const Image = {
  args: {
    imageUrl: "assets/images/homepage/user-1.png",
    size: "24px",
  },
};
