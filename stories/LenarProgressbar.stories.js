import { colors } from "@mui/material";
import LinearProgressbar from "components/linear-progressbar";

export default {
  title: "Components/LinearProgressbar",
  component: LinearProgressbar,
};

export const Primary = {
  args: {
    variant: "determinate",
    height: "8px",
    value: 50,
  },
};

export const RedProgressbar = {
  args: {
    variant: "determinate",
    height: "8px",
    value: 50,
    barBg: colors.red[700],
    progressBg: colors.red[200],
  },
};
