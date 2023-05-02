import React, { useEffect } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import {
  Avatar,
  Box,
  Divider,
  Drawer,
  Hidden,
  List,
  Typography,
  makeStyles,
} from "@material-ui/core";
import NavItem from "./NavItem";
import { useSelector } from "react-redux";
import { Capitalize } from "utils/helpers";
import { useTranslation } from "react-i18next";
import AnnouncementIcon from "@material-ui/icons/Announcement";

const useStyles = makeStyles(() => ({
  mobileDrawer: {
    width: 256,
  },
  desktopDrawer: {
    width: 256,
    top: 64,
    height: "calc(100% - 64px)",
  },
  avatar: {
    cursor: "pointer",
    width: 64,
    height: 64,
  },
}));

const NavBar = ({ onMobileClose, openMobile }) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const location = useLocation();
  const user = useSelector((state) => state.me);
  const { leftPagesList } = useSelector((state) => state.pages);

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const content = (
    <Box height="100%" display="flex" flexDirection="column">
      <Box alignItems="center" display="flex" flexDirection="column" p={2}>
        <Avatar
          className={classes.avatar}
          component={RouterLink}
          src={user.avatar}
          to="/profile"
        />
        <Typography className={classes.name} color="textPrimary" variant="h5">
          {user.name}
        </Typography>
        <Typography color="textSecondary" variant="body2">
          {user.jobTitle}
        </Typography>
      </Box>
      <Divider />
      <Box p={2} pt={0}>
        <List>
          <NavItem href={"play/lobby"} title="Play chess" icon="play_circle" />
          <Divider />
          <NavItem
            href={"updates"}
            title={t("navbar.updates")}
            icon="announcement"
          />
          <Divider />
          {user.kind === "coach" ? (
            <>
              <NavItem
                href={`coach/cabinet`}
                title={t("navbar.coaches_office")}
                icon="school"
              />
              <NavItem
                href={`student/dashboard`}
                title={t("navbar.students_dashboard")}
                icon="school"
              />
            </>
          ) : (
            <NavItem
              href={`student/dashboard`}
              title={t("navbar.students_dashboard")}
              icon="school"
            />
          )}
          <Divider />
          {leftPagesList.map((page) => (
            <NavItem
              href={`page/${page.path}`}
              key={page.path}
              title={Capitalize(page.name)}
              icon={page.icon}
            />
          ))}
          <Divider />
        </List>
      </Box>
    </Box>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          classes={{ paper: classes.mobileDrawer }}
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden mdDown>
        <Drawer
          anchor="left"
          classes={{ paper: classes.desktopDrawer }}
          open
          variant="persistent"
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

NavBar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool,
};

NavBar.defaultProps = {
  onMobileClose: () => {},
  openMobile: false,
};

export default NavBar;
