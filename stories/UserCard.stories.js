import UserCard from "components/UserCard";

export default {
  title: "Components/UserCard",
  component: UserCard,
  argTypes: {
    coverImage: { control: "text" },
    profileImage: { control: "text" },
    name: { control: "text" },
    position: { control: "text" },
    mutualCount: { control: "number" },
  },
};

export const UsereCardSample = {
  args: {
    profileImage: "assets/images/homepage/user-1.png",
    name: "Anonymous",
    position: "Project Manager at ABC Company",
    mutualCountText: "2 mututal contacts",
  },
};
