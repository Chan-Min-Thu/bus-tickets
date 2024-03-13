import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#332941",
    },
    secondary: {
      main: "#3B3486",
    },
    info: {
      main: "#864AF9",
    },
    success: {
      main: "#F8E559",
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
});
