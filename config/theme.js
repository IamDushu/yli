import { createTheme } from "@mui/material/styles";
// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: "#6750A4",
      light: "#6750A4",
      "surface-container-highest": "#E6E1E6",
    },
    neutral: {
      50: "#79767A",
    },
  },
  components: {},
  typography: {
    fontFamily: ['"Inter", sans-serif'],
    button: {
      textTransform: "none",
    },

    // labels variants

    labelSmall: {
      fontSize: "11px",
      fontWeight: 500,
      lineHeight: "16px",
    },
    labelLarge: {
      fontSize: "14px",
      fontWeight: 500,
      lineHeight: "20px",
    },

    // title variants

    titleSmall: {
      fontSize: "14px",
      fontWeight: 500,
      lineHeight: "20px",
    },
    titleMedium: {
      fontSize: "16px",
      fontWeight: 500,
      lineHeight: "24px",
    },

    // body variants

    bodySmall: {
      fontSize: "12px",
      fontWeight: 400,
      lineHeight: "16px",
    },
    bodyMedium: {
      fontSize: "14px",
      fontWeight: 400,
      lineHeight: "20px",
    },
  },
});

export default theme;
