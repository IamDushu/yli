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
      {
        icon: "assets/images/profile-icons/person_add.svg",
        text: "My Profile",
      },
      {
        icon: "assets/images/profile-icons/person_search.svg",
        text: "Activities",
      },
      {
        icon: "assets/images/profile-icons/addchart.svg",
        text: "Agreements and Policies",
      },
    ],
  },
};
