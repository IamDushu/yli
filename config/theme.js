import { createTheme } from "@mui/material/styles";
// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: "#6750A4",
    },
  },
  components: {},
  typography: {
    fontFamily: ["Inter"],
    button: {
      textTransform: "none",
    },
  },
});

export default theme;
