import { LinearProgress, linearProgressClasses } from "@mui/material";
import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";
export default function LinearProgressbar(props) {
  const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: props.height ?? "4px",

    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor:
        props.progressBg ?? theme.palette.primary["surface-container-highest"],
    },
    [`& .${linearProgressClasses.bar}`]: {
      backgroundColor: props.barBg ?? theme.palette.primary["light"],
    },
  }));
  return <BorderLinearProgress {...props} />;
}
