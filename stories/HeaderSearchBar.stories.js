import { SearchBar } from "../components/header/search-bar";

export default {
  title: "Components/header/header-search-bar",
  component: SearchBar,
  argTypes: {
    handleInput: { action: "handleInput" },
    handleClick: { action: "handleClick" },
  },
};

export const Search = {
  args: {
    searchLogoUrl: "/assets/images/search-icon.svg",
    placeHolderText: "Search Text",
  },
};
