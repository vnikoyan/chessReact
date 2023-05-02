import React, { useState, useEffect } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import clsx from "clsx";
import PropTypes from "prop-types";
import {
  AppBar,
  Badge,
  Box,
  Hidden,
  IconButton,
  Toolbar,
  makeStyles,
  MenuItem,
  Menu,
  Avatar,
  Grid,
} from "@material-ui/core";
import { useAction } from "utils/hooks";
import { Logo } from "components/Logo";
import { logoutAction } from "modules/auth/actions";
import MenuIcon from "@material-ui/icons/Menu";
import InputIcon from "@material-ui/icons/Input";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import NotificationsIcon from "@material-ui/icons/NotificationsOutlined";
import SettingsOutlinedIcon from "@material-ui/icons/SettingsOutlined";
import { useSelector } from "react-redux";
import NotificationsMenu from "./NotificationsMenu";
import { notifications as notificationsAction } from "modules/me/actions";
import LanguageSelect from "components/LanguageSelect";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
  },
  logo: {
    paddingRight: 10,
    paddingLeft: 10,
    width: 150,
    height: "80%",
  },
  toolbar: {
    height: 64,
  },
  avatar: {
    cursor: "pointer",
    width: 32,
    height: 32,
  },
  profileMenu: {
    marginTop: 48,
  },
  notificationsMenu: {
    marginTop: 48,
  },
}));

const TopBar = ({ className, onMobileNavOpen, ...rest }) => {
  const classes = useStyles();
  const { notifications } = useSelector((state) => state.me);
  const [anchorEl, setAnchorEl] = useState(null);
  const [notificationsMenu, setNotificationsMenu] = useState(null);
  const [viewedNotifications, setViewedNotifications] = useState(
    notifications.filter((value) => value.viewed)
  );
  const logOutUser = useAction(logoutAction);
  const isMenuOpen = Boolean(anchorEl);
  const navigate = useNavigate();
  const user = useSelector((state) => state.me);
  const viewedNotificationsList = useAction(notificationsAction.viewed);

  useEffect(() => {
    setViewedNotifications(notifications.filter((value) => value.viewed));
  }, [notifications]);

  const logout = () => {
    logOutUser();
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleNotificationsMenuOpen = (event) => {
    setNotificationsMenu(event.currentTarget);
    viewedNotificationsList(notifications);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setNotificationsMenu(null);
  };

  const redirectChat = () => {
    navigate("chat", { replace: true });
  };

  const redirectSettings = () => {
    navigate("profile/settings", { replace: true });
  };

  const renderMenu = (
    <Menu
      className={classes.profileMenu}
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={redirectSettings}>
        <Grid container spacing={1}>
          <Grid item>
            <SettingsOutlinedIcon />
          </Grid>
          <Grid item>
            <span>Settings</span>
          </Grid>
        </Grid>
      </MenuItem>
      <MenuItem onClick={redirectChat}>
        <Grid container spacing={1}>
          <Grid item>
            <ChatBubbleOutlineIcon />
          </Grid>
          <Grid item>
            <span>Chat</span>
          </Grid>
        </Grid>
      </MenuItem>
      <MenuItem onClick={logout}>
        <Grid container spacing={1}>
          <Grid item>
            <InputIcon />
          </Grid>
          <Grid item>
            <span>Logout</span>
          </Grid>
        </Grid>
      </MenuItem>
    </Menu>
  );

  return (
    <AppBar className={clsx(classes.root, className)} elevation={0} {...rest}>
      <Toolbar className={classes.toolbar}>
        <Hidden lgUp>
          <Grid
            container
            className="h-100"
            justifyContent="space-between"
            alignItems="center"
          >
            <Grid xs={4} item container className="h-100" alignItems="center">
              <IconButton
                className="p-0"
                color="secondary"
                onClick={onMobileNavOpen}
              >
                <MenuIcon />
              </IconButton>
            </Grid>
            <Grid
              xs={4}
              item
              container
              className="h-100"
              justifyContent="center"
              alignItems="center"
            >
              <RouterLink className={classes.logo} to="/">
                <Logo />
              </RouterLink>
            </Grid>
            <Grid
              xs={4}
              container
              item
              spacing={1}
              alignItems="center"
              justifyContent="flex-end"
              className="h-100"
            >
              <Grid item>
                <IconButton
                  onClick={handleNotificationsMenuOpen}
                  color="secondary"
                >
                  <Badge
                    invisible={!Boolean(notifications.length)}
                    badgeContent={
                      viewedNotifications.length === notifications.length
                        ? 1
                        : notifications.length - viewedNotifications.length
                    }
                    color="primary"
                    variant={
                      viewedNotifications.length === notifications.length
                        ? "dot"
                        : "standard"
                    }
                  >
                    <NotificationsIcon />
                  </Badge>
                </IconButton>
              </Grid>
              <Grid item>
                <Avatar
                  className={classes.avatar}
                  src={user.avatar}
                  onClick={handleProfileMenuOpen}
                />
              </Grid>
            </Grid>
          </Grid>
        </Hidden>
        <Hidden mdDown>
          <RouterLink className={classes.logo} to="/">
            <Logo />
          </RouterLink>
          <Box flexGrow={1} />
          <LanguageSelect />
          <IconButton onClick={redirectSettings} color="secondary">
            <SettingsOutlinedIcon />
          </IconButton>
          <IconButton onClick={redirectChat} color="secondary">
            <ChatBubbleOutlineIcon />
          </IconButton>
          <IconButton onClick={handleNotificationsMenuOpen} color="secondary">
            <Badge
              invisible={!Boolean(notifications.length)}
              badgeContent={
                viewedNotifications.length === notifications.length
                  ? 1
                  : notifications.length - viewedNotifications.length
              }
              color="primary"
              variant={
                viewedNotifications.length === notifications.length
                  ? "dot"
                  : "standard"
              }
            >
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <IconButton onClick={logout} color="secondary">
            <InputIcon />
          </IconButton>
        </Hidden>
      </Toolbar>
      {renderMenu}
      <NotificationsMenu
        notificationsMenu={notificationsMenu}
        handleMenuClose={handleMenuClose}
      />
    </AppBar>
  );
};

TopBar.propTypes = {
  className: PropTypes.string,
  onMobileNavOpen: PropTypes.func,
};

export default TopBar;
