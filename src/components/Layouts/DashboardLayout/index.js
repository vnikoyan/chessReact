import "./index.scss";
import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { makeStyles } from "@material-ui/core";
import { Footer } from "common/Footer";
import NavBar from "./Items/NavBar";
import TopBar from "./Items/TopBar";
import Breadcrumb from "./Items/Breadcrumb";
import { useSelector } from "react-redux";
import { profile } from "modules/me/actions";
import { useAction } from "utils/hooks";
import Loading from "components/Loading";
import { list } from "modules/pages/actions";
import { request } from "modules/messages/actions";
import MyAlert from "components/Alert";
import { Capitalize } from "utils/helpers";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    display: "flex",
    height: "100%",
    overflow: "hidden",
    width: "100%",
  },
  wrapper: {
    display: "flex",
    flex: "1 1 auto",
    overflow: "hidden",
    paddingTop: 64,
    [theme.breakpoints.up("lg")]: {
      paddingLeft: 256,
    },
  },
  contentContainer: {
    display: "flex",
    flex: "1 1 auto",
    overflow: "hidden",
  },
  content: {
    flex: "1 1 auto",
    height: "100%",
    overflow: "auto",
  },
}));

const DashboardLayout = () => {
  const classes = useStyles();
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const currentUser = useSelector((state) => state.me);
  const settings = useSelector((state) => state.settings);
  const getPagesList = useAction(list.request);

  const { successMessage, errorMessage } = useSelector(
    (state) => state.messages
  );
  const clearMessages = useAction(request.clear);

  useEffect(() => {
    getPagesList("left");
  }, []);

  useEffect(() => {
    if (successMessage) {
      MyAlert({
        text: Capitalize(successMessage),
        icon: "success",
        confirmButton: "Ok",
        method: clearMessages,
      });
    }
  }, [clearMessages, successMessage]);

  useEffect(() => {
    if (errorMessage) {
      MyAlert({
        text: Capitalize(errorMessage),
        icon: "error",
        confirmButton: "Ok",
        method: clearMessages,
      });
    }
  }, [clearMessages, errorMessage]);

  return (
    <>
      <div className={classes.root}>
        <TopBar onMobileNavOpen={() => setMobileNavOpen(true)} />
        <NavBar
          onMobileClose={() => setMobileNavOpen(false)}
          openMobile={isMobileNavOpen}
        />
        <div className={classes.wrapper}>
          <div className={classes.contentContainer}>
            <div className={classes.content}>
              <Breadcrumb />
              <div className="outlet py-4">
                {!currentUser.isLoaded || settings.loading ? (
                  <Loading />
                ) : (
                  <Outlet />
                )}
              </div>
              <Footer />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
