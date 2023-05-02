import React, { useEffect, useState, useRef } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import {
  Avatar,
  Box,
  Divider,
  Drawer,
  Hidden,
  List,
  Typography,
  Button,
  Grow,
  Popper,
  Paper,
  ClickAwayListener,
  makeStyles,
  Grid,
} from "@material-ui/core";
import NavItem from "../../DashboardLayout/Items/NavItem";
import { useSelector } from "react-redux";
import { Capitalize } from "utils/helpers";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import AnnouncementIcon from "@material-ui/icons/Announcement";
import { useAction } from "utils/hooks";
import { game, matchroom } from "modules/game/actions";
import PlayCircleFilledWhiteIcon from "@material-ui/icons/PlayCircleFilledWhite";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ExtensionIcon from "@mui/icons-material/Extension";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import PersonIcon from "@mui/icons-material/Person";
import BoltIcon from "@mui/icons-material/Bolt";
import GroupIcon from "@mui/icons-material/Group";
import Collapse from "@mui/material/Collapse";

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
  navbar: {
    backgroundColor: "black",
  },
}));

const NavBar = ({ onMobileClose, openMobile }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const location = useLocation();
  const anchorRef = useRef(null);
  const { user } = useSelector((state) => state.auth);
  const { topPagesList } = useSelector((state) => state.pages);
  const createMatchroom = useAction(matchroom.createMatchroom);
  const [open, setOpen] = useState(false);
  const [openSubMenu, setOpenSubMenu] = React.useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const thisUser = useSelector((state) => state.me);

  useEffect(() => {
    setIsLoggedIn(Boolean(user.id));
  }, [user, thisUser]);

  const startRandomProblems = () => {
    navigate("/problems", { state: "fromLanding" });
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  const handleClick = () => {
    setOpenSubMenu(!openSubMenu);
  };

  const creataMatchWithFriend = () => {
    createMatchroom();
  };

  const content = (
    <Box
      className={classes.navbar}
      height="100%"
      display="flex"
      flexDirection="column"
    >
      {isLoggedIn && (
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
      )}
      <Divider />
      <Box p={2} pt={0}>
        <List>
          <Button
            ref={anchorRef}
            id="composition-button"
            className="mb-3"
            aria-controls={open ? "composition-menu" : undefined}
            aria-expanded={open ? "true" : undefined}
            variant="contained"
            color="primary"
            aria-haspopup="true"
            endIcon={<PlayCircleFilledWhiteIcon />}
            onClick={handleToggle}
          >
            Play
          </Button>
          {isLoggedIn ? (
            <>
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
            </>
          ) : (
            <Button
              color="primary"
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              onClick={startRandomProblems}
              endIcon={<PlayCircleFilledWhiteIcon />}
            >
              {t("topbar.solve_problem")}
            </Button>
          )}
          {topPagesList.map((page) => (
            <NavItem
              href={`page/${page.path}`}
              key={page.path}
              title={Capitalize(page.name)}
              icon={page.icon}
            />
          ))}
          <Divider />
        </List>
        <Popper
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          placement="bottom-start"
          transition
          disablePortal
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === "bottom-start" ? "left top" : "left bottom",
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <List
                    sx={{
                      width: "100%",
                      maxWidth: 360,
                      bgcolor: "background.paper",
                    }}
                    component="nav"
                    aria-labelledby="nested-list-subheader"
                  >
                    <ListItemButton onClick={startRandomProblems}>
                      <ListItemIcon>
                        <ExtensionIcon />
                      </ListItemIcon>
                      <ListItemText primary={t("topbar.solve_problem")} />
                    </ListItemButton>
                    <ListItemButton
                      onClick={() =>
                        navigate("play/computer", { replace: true })
                      }
                    >
                      <ListItemIcon>
                        <SmartToyIcon />
                      </ListItemIcon>
                      <ListItemText primary={t("topbar.play_against")} />
                    </ListItemButton>
                    <ListItemButton onClick={handleClick}>
                      <ListItemIcon>
                        <PersonIcon />
                      </ListItemIcon>
                      <ListItemText primary={t("topbar.play_against_player")} />
                      {openSubMenu ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={openSubMenu} timeout="auto" unmountOnExit>
                      <List component="div" disablePadding>
                        <ListItemButton
                          sx={{ pl: 4 }}
                          onClick={() =>
                            navigate("play/game", { replace: true })
                          }
                        >
                          <ListItemIcon>
                            <BoltIcon />
                          </ListItemIcon>
                          <ListItemText primary={t("topbar.quick_game")} />
                        </ListItemButton>
                        <ListItemButton
                          sx={{ pl: 4 }}
                          onClick={creataMatchWithFriend}
                        >
                          <ListItemIcon>
                            <GroupIcon />
                          </ListItemIcon>
                          <ListItemText
                            primary={t("topbar.play_with_friend")}
                          />
                        </ListItemButton>
                      </List>
                    </Collapse>
                  </List>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
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
