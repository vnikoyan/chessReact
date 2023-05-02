import { createTheme } from "@material-ui/core";
import shadows from "./shadows";
import typography from "./typography";
import { green, red } from "@material-ui/core/colors";

const darkTheme = createTheme({
  palette: {
    type: "dark",
    background: {
      dark: "#312E2B", // brown
      default: "#000000", //black
      primary: "#424242", // grey
      error: red[500], // grey
    },
    primary: {
      contrastText: "#FFFFFF",
      main: "#f57c00", // orange
    },
    secondary: {
      main: "#FFFFFF", // white
    },
    success: {
      main: green[500],
    },
    error: {
      main: red[500],
    },
    black: "#FFFFFF",
    text: {
      primary: "#FFFFFF",
      secondary: "#FFFFFF",
      succes: green[500],
      error: red[500], // grey
    },
  },
  shadows,
  typography,
});

export default darkTheme;
