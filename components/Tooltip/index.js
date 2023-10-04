import TooltipComp, { tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";

const Tooltip = styled(({ className, ...props }) => (
  <TooltipComp {...props} classes={{ popper: className }} />
))(() => ({
  [`& .${tooltipClasses.tooltip}`]: {
    background: "#D1EF5E",
    color: "#6750A4",
    maxWidth: 220,
    fontSize: "0.75rem",
    fontWeight: 400,
    lineHeight: "1rem",
    padding: "0.5rem",
    borderRadius: "4px",
    opacity: "0.7",
  },
}));

export default Tooltip;
