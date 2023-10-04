import SearchBar from "components/SearchBar";

export default {
  title: "Components/SearchBar",
  component: SearchBar,
  argTypes: {
    onChange: { table: { disable: true } },
    placeholder: { control: "text" },
    width: { control: "text" },
  },
};

export const SampleSearchBar = {
  args: {
    onChange: () => null,
    placeholder: "Search any words...",
  },
};
