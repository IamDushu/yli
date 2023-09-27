import { ListItem } from "../components/list-item";

export default {
  title: "Components/list-item",
  component: ListItem,
  argTypes: {
    handleClick: { action: "handleClick" },
  },
};

export const GrowthProjects = {
  args: {
    icon: "assets/images/chart-progress.svg",
    label: "Growth Projects",
  },
};

export const Courses = {
  args: {
    icon: "assets/images/light-bulb-idea.svg",
    label: "Courses",
  },
};

export const TrainingRooms = {
  args: {
    icon: "assets/images/tr.svg",
    label: "Training Rooms",
  },
};

export const CoachingRooms = {
  args: {
    icon: "assets/images/cr.svg",
    label: "Coaching Rooms",
  },
};

export const Masterclass = {
  args: {
    icon: "assets/images/mc.svg",
    label: "Masterclass",
  },
};

export const Webinars = {
  args: {
    icon: "assets/images/webinar.svg",
    label: "Webinar",
  },
};

export const BusinessNetworkRoom = {
  args: {
    icon: "assets/images/BNR.svg",
    label: "Business Network Room",
  },
};

export const Event = {
  args: {
    icon: "assets/images/event.svg",
    label: "Event",
  },
};
