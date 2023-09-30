import { ProfileOptionsList } from "../components/header/profile-options";

export default {
  title: "Components/header/headerProfileOptions",
  component: ProfileOptionsList,
  argTypes: {
    handleClick: { action: "handleClick" },
  },
};

export const profileOptions = {
  args: {
    options: [
      { icon: "assets/images/profile-icons/my-profile-ico.svg", text: "My Profile" },
      {
        icon: "assets/images/profile-icons/my-activties-ico.svg",
        text: "My Activities",
      },
      {
        icon: "assets/images/profile-icons/agreement-policy-ico.svg",
        text: "Agreements and Policies",
      },
      {
        icon: "assets/images/profile-icons/setting-ico.svg",
        text: "Settings",
      },
      {
        icon: "assets/images/profile-icons/disconnect-ico.svg",
        text: "Disconnect",
      },
    ],
  },
};
