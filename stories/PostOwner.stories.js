import { PostOwner } from "components/post-owner";

export default {
  title: "Components/PostOwner",
  component: PostOwner,
  argTypes: {
    handleClick: { action: "handleClick" },
  },
};

export const SamplePostOwner = {
    args: {
      photoLink:"https://d39ubr28bcomsg.cloudfront.net/2023/9/19/ben-sweet-2LowviVHZ-E-unsplash.1695106775974.jpg",
      name:"John Smith"
    },
  };

  export const SamplePostOwner2 = {
    args: {
      photoLink:"https://d39ubr28bcomsg.cloudfront.net/2023/9/19/ben-sweet-2LowviVHZ-E-unsplash.1695106775974.jpg",
      name:"Jack Daniel"
    },
  };

