import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { makeStyles } from "@material-ui/core";
import { Footer } from "common/Footer";
import { useAction } from "utils/hooks";
import { list } from "modules/pages/actions";
import TopBar from "./TopBar";
import { NavHeader } from "common/NavHeader";
import NavBar from "./Items/NavBar";

const useStyles = makeStyles((theme) => ({
  root: {
    // backgroundColor: theme.palette.background.dark,
    display: "flex",
    height: "100%",
    overflow: "hidden",
    width: "100%",
  },
  wrapper: {
    display: "flex",
    flex: "1 1 auto",
    overflow: "hidden",
  },
  contentContainer: {
    display: "flex",
    flex: "1 1 auto",
    overflow: "hidden",
  },
  content: {
    flex: "1 1 auto",
    marginTop: "120px",
  },
}));

const MainLayout = () => {
  const classes = useStyles();
  const getPagesList = useAction(list.request);
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);

  useEffect(() => {
    getPagesList("top");
  }, []);

  return (
    <>
      <div className={classes.root}>
        <NavHeader onMobileNavOpen={() => setMobileNavOpen(true)} />
        {isMobileNavOpen && (
          <NavBar
            onMobileClose={() => setMobileNavOpen(false)}
            openMobile={isMobileNavOpen}
          />
        )}
        <div className={classes.wrapper}>
          <div className={classes.contentContainer}>
            <div className={classes.content}>
              <div className="outlet">
                <Outlet />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MainLayout;
