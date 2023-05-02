import "./styles/global.scss";
import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./store";
import { ThemeProvider } from "@material-ui/core";
import { ThemeProvider as NewThemeProvider } from "@mui/material/styles";
import GlobalStyles from "./themes/GlobalStyles";
import darkTheme from "./themes/darkTheme";
import lightTheme from "./themes/lightTheme";
import Routes from "./routes/Routes";
import { positions, transitions, Provider as AlertProvider } from "react-alert";
// import AlertMUITemplate from "react-alert-template-mui";
import AlertTemplate from "components/Alert";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-languages-select/scss/react-languages-select.scss";
import "react-chat-elements/dist/main.css";
import "@sweetalert2/theme-dark/dark.scss";

const options = {
  position: positions.MIDDLE,
  transition: transitions.SCALE,
};

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={darkTheme}>
          <NewThemeProvider theme={darkTheme}>
            <AlertProvider template={AlertTemplate} {...options}>
              <GlobalStyles />
              <Routes />
            </AlertProvider>
          </NewThemeProvider>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
