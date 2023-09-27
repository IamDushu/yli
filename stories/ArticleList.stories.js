import { Article } from "../components/article";

export default {
  title: "Components/article",
  component: Article,
  argTypes: {
    handleClick: { action: "handleClick" },
  },
};

export const ArtcleList = {
  args: {
    imgSrc: "assets/images/video-Thumbnail.svg",
    name: "Eleanor Rigby",
    date: "18/09/23 3 PM",
    heading: "An article with at least two lines of text",
    text: "Supporting line text lorem ipsum dolor sit amet, consect and more content more than 2 lines if entere third line",
  },
};
