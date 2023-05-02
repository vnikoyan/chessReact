import { createTheme } from "@material-ui/core";
import shadows from "./shadows";
import typography from "./typography";
import { green, red } from "@material-ui/core/colors";

const darkTheme = createTheme({
  palette: {
    type: "light",
    background: {
      dark: "#f5e4d3", // brown
      default: "#e4f0e2", //black
      primary: "#424242", // grey
      error: red[500], // grey
    },
    primary: {
      contrastText: "#424242",
      main: "#f57c00", // orange
    },
    secondary: {
      main: "#424242", // white
    },
    success: {
      main: green[500],
    },
    error: {
      main: red[500],
    },
    black: "#e4f0e2",
    text: {
      primary: "#424242",
      secondary: "#424242",
      succes: green[500],
      error: red[500], // grey
    },
  },
  shadows,
  typography,
});

export default darkTheme;
