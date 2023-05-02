import "./index.scss";
import React, { useState, useEffect, useRef } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Logo } from "components/Logo";
import { LogInDialog } from "./LogInDialog";
import { useTranslation } from "react-i18next";
import LanguageSelect from "components/LanguageSelect";
import CreateMatchroomModal from "components/GameModal/CreateMatchroomModal";
import { useSelector } from "react-redux";
import { Capitalize } from "utils/helpers";
import { useNavigate } from "react-router";
import { logoutAction } from "modules/auth/actions";
import { useAction } from "utils/hooks";
import {
  AppBar,
  Box,
  Hidden,
  Typography,
  Toolbar,
  makeStyles,
  IconButton,
  MenuItem,
  Avatar,
  Grid,
  Button,
  Popper,
  Grow,
  ClickAwayListener,
  Paper,
  MenuList,
} from "@material-ui/core";
import ButtonGroup from "@mui/material/ButtonGroup";
import SettingsOutlinedIcon from "@material-ui/icons/SettingsOutlined";
import InputIcon from "@material-ui/icons/Input";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import MenuIcon from "@material-ui/icons/Menu";
import StyledMenu from "components/StyledMenu";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import PlayCircleFilledWhiteIcon from "@material-ui/icons/PlayCircleFilledWhite";
import ArrowDropDown from "@material-ui/icons/ArrowDropDown";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import DraftsIcon from "@mui/icons-material/Drafts";
import SendIcon from "@mui/icons-material/Send";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import StarBorder from "@mui/icons-material/StarBorder";
import ExtensionIcon from "@mui/icons-material/Extension";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import PersonIcon from "@mui/icons-material/Person";
import SettingsInputComponentIcon from "@mui/icons-material/SettingsInputComponent";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import BoltIcon from "@mui/icons-material/Bolt";
import GroupIcon from "@mui/icons-material/Group";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
  },
  toolbar: {
    height: 120,
  },
  logo: {
    width: 200,
    height: "70%",
  },
  navItem: {
    cursor: "pointer",
    "&:hover": {
      color: theme.palette.primary.main,
    },
  },
  avatar: {
    cursor: "pointer",
    width: 32,
    height: 32,
  },
  profileMenu: {
    width: 200,
  },
}));

const options = [
  "Create a merge commit",
  "Squash and merge",
  "Rebase and merge",
];

export const NavHeader = ({ onMobileNavOpen }) => {
  const classes = useStyles();
  const anchorRef = useRef(null);
  const { t } = useTranslation();
  const { topPagesList } = useSelector((state) => state.pages);
  const { myMatchroom } = useSelector((state) => state.game);
  const { user } = useSelector((state) => state.auth);
  const thisUser = useSelector((state) => state.me);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = React.useState(false);
  const [openSubMenu, setOpenSubMenu] = React.useState(false);
  const navigate = useNavigate();
  const logOutUser = useAction(logoutAction);
  const isMenuOpen = Boolean(anchorEl);
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const [createMatchroom, setCreateMatchroom] = useState(false);

  const handleClick = () => {
    setOpenSubMenu(!openSubMenu);
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  useEffect(() => {
    setIsLoggedIn(Boolean(user.id));
  }, [user]);

  useEffect(() => {
    if (myMatchroom) {
      navigate(`/play/match/${myMatchroom.token}`);
    }
  }, [myMatchroom]);

  const logout = () => {
    logOutUser();
    handleMenuClose();
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const startRandomProblems = () => {
    navigate("/problems", { state: "fromLanding" });
  };

  const creataMatchWithFriend = () => {};

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setOpen(false);
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

  const renderMenu = (
    <StyledMenu
      className={classes.profileMenu}
      anchorEl={anchorEl}
      keepMounted
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={() => navigate("profile", { replace: true })}>
        <Grid container spacing={1}>
          <Grid item>
            <AccountCircleIcon />
          </Grid>
          <Grid item>
            <span>{t("topbar.profile")}</span>
          </Grid>
        </Grid>
      </MenuItem>
      <MenuItem onClick={() => navigate("profile/settings", { replace: true })}>
        <Grid container spacing={1}>
          <Grid item>
            <SettingsOutlinedIcon />
          </Grid>
          <Grid item>
            <span>{t("topbar.settings")}</span>
          </Grid>
        </Grid>
      </MenuItem>
      <MenuItem onClick={() => navigate("chat", { replace: true })}>
        <Grid container spacing={1}>
          <Grid item>
            <ChatBubbleOutlineIcon />
          </Grid>
          <Grid item>
            <span>{t("topbar.chat")}</span>
          </Grid>
        </Grid>
      </MenuItem>
      <MenuItem onClick={logout}>
        <Grid container spacing={1}>
          <Grid item>
            <InputIcon />
          </Grid>
          <Grid item>
            <span>{t("topbar.logout")}</span>
          </Grid>
        </Grid>
      </MenuItem>
    </StyledMenu>
  );

  return (
    <AppBar className={classes.root} elevation={0}>
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
              {isLoggedIn ? (
                <Grid item>
                  <Avatar
                    className={classes.avatar}
                    src={thisUser.avatar}
                    onClick={handleProfileMenuOpen}
                  />
                </Grid>
              ) : (
                <>
                  <Grid item>
                    <LogInDialog />
                  </Grid>
                </>
              )}
            </Grid>
          </Grid>
        </Hidden>
        <Hidden mdDown>
          <Grid
            container
            className="h-100"
            justifyContent="space-between"
            alignItems="center"
          >
            <Grid xs={4} item container className="h-100" alignItems="center">
              {topPagesList.map((page, pageIndex) => (
                <Box key={pageIndex} mr={1}>
                  <Typography
                    onClick={() => navigate(`/page${page.path}`)}
                    variant="h6"
                    className={classes.navItem}
                  >
                    {Capitalize(page.name)}
                  </Typography>
                </Box>
              ))}
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
                <LanguageSelect />
              </Grid>
              <Grid item>
                <Button
                  ref={anchorRef}
                  id="composition-button"
                  aria-controls={open ? "composition-menu" : undefined}
                  aria-expanded={open ? "true" : undefined}
                  variant="contained"
                  color="primary"
                  aria-haspopup="true"
                  endIcon={<PlayCircleFilledWhiteIcon />}
                  onClick={handleToggle}
                >
                  {t("buttons.play")}
                </Button>
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
                          placement === "bottom-start"
                            ? "left top"
                            : "left bottom",
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
                              <ListItemText
                                primary={t("topbar.solve_problem")}
                              />
                            </ListItemButton>
                            <ListItemButton
                              onClick={() =>
                                navigate("play/computer", { replace: true })
                              }
                            >
                              <ListItemIcon>
                                <SmartToyIcon />
                              </ListItemIcon>
                              <ListItemText
                                primary={t("topbar.play_against")}
                              />
                            </ListItemButton>
                            <ListItemButton onClick={handleClick}>
                              <ListItemIcon>
                                <PersonIcon />
                              </ListItemIcon>
                              <ListItemText
                                primary={t("topbar.play_against_player")}
                              />
                              {openSubMenu ? <ExpandLess /> : <ExpandMore />}
                            </ListItemButton>

                            <Collapse
                              in={openSubMenu}
                              timeout="auto"
                              unmountOnExit
                            >
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
                                  <ListItemText
                                    primary={t("topbar.quick_game")}
                                  />
                                </ListItemButton>
                                <ListItemButton
                                  sx={{ pl: 4 }}
                                  onClick={() => setCreateMatchroom(true)}
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
                            <ListItemButton
                              onClick={() =>
                                navigate("play/lobby", { replace: true })
                              }
                            >
                              <ListItemIcon>
                                <SettingsInputComponentIcon />
                              </ListItemIcon>
                              <ListItemText primary={t("topbar.lobby")} />
                            </ListItemButton>
                          </List>
                        </ClickAwayListener>
                      </Paper>
                    </Grow>
                  )}
                </Popper>
              </Grid>
              {isLoggedIn ? (
                <Grid item>
                  <Avatar
                    className={classes.avatar}
                    src={thisUser.avatar}
                    onClick={handleProfileMenuOpen}
                  />
                </Grid>
              ) : (
                <>
                  <Grid item>
                    {/* <Button
                      color="primary"
                      fullWidth
                      size="large"
                      type="submit"
                      variant="contained"
                      onClick={startRandomProblems}
                    >
                    </Button> */}
                  </Grid>
                  <Grid item>
                    {/* <Button
                      color="primary"
                      fullWidth
                      size="large"
                      type="submit"
                      variant="contained"
                      endIcon={<PlayCircleFilledWhiteIcon />}
                    >
                    </Button> */}
                  </Grid>
                  <Grid item>
                    <LogInDialog />
                  </Grid>
                </>
              )}
              {/* <Nav.Link href="/play" className="ml-2">
                    <LimeButton className="LimeButton">
                      {t("topbar.start_game")}
                    </LimeButton>
                  </Nav.Link> */}
              {/* <Nav.Link href="registration" onClick={toggleLogInDialog}>Вход</Nav.Link> */}
            </Grid>
          </Grid>
        </Hidden>
        {createMatchroom && (
          <CreateMatchroomModal closeModal={() => setCreateMatchroom(false)} />
        )}
        {renderMenu}
      </Toolbar>
    </AppBar>
  );
};
