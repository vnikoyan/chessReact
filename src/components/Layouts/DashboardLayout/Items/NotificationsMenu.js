import React, { useState, useEffect } from "react";
import {
  makeStyles,
  Menu,
  Avatar,
  Grid,
  Typography,
  Card,
  CardContent,
  Divider,
  CardHeader,
  Button,
} from "@material-ui/core";
import { useAction } from "utils/hooks";
import NotificationsIcon from "@material-ui/icons/NotificationsOutlined";
import { useSelector } from "react-redux";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import { notifications as notificationsAction } from "modules/me/actions";
import { TransitionGroup } from "react-transition-group";
import { FadeTransition } from "components/Animation";

const useStyles = makeStyles((theme) => ({
  notificationsMenu: {
    marginTop: 48,
    "& ul": {
      width: 350,
      paddingTop: "0px",
    },
  },
  notificationsMenuContent: {
    padding: 10,
  },
  notificationsBlock: {
    paddingBottom: 10,
    paddingTop: 10,
    position: "relative",
    // filter: "grayscale(100%)",
  },
  notificationsBlockNew: {
    paddingBottom: 10,
    paddingTop: 10,
    position: "relative",
    background: "blue",
  },
  deleteButton: {
    position: "absolute",
    cursor: "pointer",
    left: "95%",
    top: "0",
    color: "gray",
    "&:hover": {
      color: theme.palette.primary.main,
      textDecoration: "none",
    },
  },
  deleteButtonForAll: {
    position: "absolute",
    cursor: "pointer",
    left: "95%",
    top: "15px",
    color: "gray",
    "&:hover": {
      color: theme.palette.primary.main,
      textDecoration: "none",
    },
  },
}));

export default function NotificationsMenu({
  notificationsMenu,
  handleMenuClose,
}) {
  const classes = useStyles();
  const deleteNotifications = useAction(notificationsAction.delete);
  const sendActionNotification = useAction(notificationsAction.action);
  const { notifications } = useSelector((state) => state.me);
  const [notificationsState, setNotifications] = useState(notifications);

  const handleDelete = (notificationID) => {
    setNotifications(
      notificationsState.filter((item) => item.id !== notificationID)
    );
    deleteNotifications(notificationID);
  };

  useEffect(() => {
    setNotifications(notifications);
  }, [notifications]);

  const handleAction = (actionUrl, notificationID) => {
    sendActionNotification(actionUrl);
    handleDelete(notificationID);
    handleMenuClose();
  };

  return (
    <Menu
      variant="selectedMenu"
      className={classes.notificationsMenu}
      anchorEl={notificationsMenu}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={Boolean(notificationsMenu)}
      onClose={handleMenuClose}
      padding={0}
    >
      <Card>
        <CardHeader
          titleTypographyProps={{ style: { fontSize: 18 } }}
          avatar={<NotificationsIcon />}
          title="Notifications"
        />
        <Divider />
        <CardContent className={classes.notificationsMenuContent}>
          <Grid container>
            <TransitionGroup>
              {notificationsState.map((notification, index) => (
                <FadeTransition key={index}>
                  <Grid
                    xs={12}
                    item
                    container
                    spacing={1}
                    alignItems="center"
                    className={classes.notificationsBlock}
                  >
                    <Grid item xs={2}>
                      <Avatar src={notification.from.avatar} />
                    </Grid>
                    <Grid item xs={9}>
                      <Typography variant="body1">
                        {notification.notification}
                      </Typography>
                    </Grid>
                    <Grid item container xs={12}>
                      <Grid item xs={6}>
                        <Button
                          onClick={() =>
                            handleAction(
                              notification.declareUrl,
                              notification.id
                            )
                          }
                          fullWidth
                        >
                          Declare
                        </Button>
                      </Grid>
                      <Grid item xs={6}>
                        <Button
                          onClick={() =>
                            handleAction(
                              notification.approveUrl,
                              notification.id
                            )
                          }
                          fullWidth
                          color="primary"
                          variant="contained"
                        >
                          Approve
                        </Button>
                      </Grid>
                    </Grid>
                    <HighlightOffIcon
                      onClick={() => handleDelete(notification.id)}
                      className={
                        index === 0
                          ? classes.deleteButton
                          : classes.deleteButtonForAll
                      }
                    />
                    <Divider absolute />
                  </Grid>
                </FadeTransition>
              ))}
            </TransitionGroup>
          </Grid>
        </CardContent>
      </Card>
    </Menu>
  );
}
