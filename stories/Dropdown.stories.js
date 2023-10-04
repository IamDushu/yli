import { Dropdown } from "components/dropdown";

export default {
  title: "Components/Dropdown",
  component: (args) => (
    <div style={{ position: "relative" }}>
      <em
        className="like-tsp pointer icon icon-ellipsis-h font-24 d-flex justify-content-end"
      ></em>
      <Dropdown {...args}/>
    </div>
  ),
  argTypes: {
    options: [
      {
        title: "Reply",
        imageHeight: 20,
        imageWidth: 20,
        imagePath: "/assets/images/share_icon.svg",
        handleClick: () => {},
      }
    ]
  },
};

export const DropdownList = {
  args: {
    options: [
      {
        title: "Reply",
        imageHeight: 20,
        imageWidth: 20,
        imagePath: "/assets/images/share_icon.svg",
        handleClick: () => {},
      },
      {
        title: "Edit",
        imageHeight: 20,
        imageWidth: 20,
        imagePath: "/assets/images/edit_icon.svg",
        handleClick: () => {},
      },
      {
        title: "Delete",
        imageHeight: 20,
        imageWidth: 20,
        imagePath: "/assets/images/delete_icon.svg",
        handleClick: () => {}
      },
    ]
    
  },
};