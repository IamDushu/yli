import PostComment from "../components/dashboard/Posts/PostComment";
export default {
  title: "Components/Post/Comment",
  component: PostComment,
  argTypes: {
    handleClick: { action: "handleClick" },
  },
};

export const Comment = {
  args: {
    showCounter: true,
    totalCount: 30,
  },
};
