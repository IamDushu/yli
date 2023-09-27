import SidebarWidgetDropdown from "components/sidebar/sidebar-widget-dropdown/sidebar-widget-dropdown";

export default {
  title: "Components/SidebarWidgetDropdown",
  component: SidebarWidgetDropdown,
  argTypes: {
    handleClick: { action: "handleClick" },
  },
};

export const sampleSidebarWidgetDropdown = {
  args: {
    label: "Squads",
    preIcon: "/assets/images/squad-sidebar.svg",
    list: [{
      title: "Create Squad",
      icon: "/assets/images/launch-instance-meeting.svg",
      onClick: () => alert("To be added"),
    }]
  },
};
