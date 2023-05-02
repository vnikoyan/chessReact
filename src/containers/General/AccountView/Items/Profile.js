import React, { useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
  makeStyles,
} from "@material-ui/core";
import SendMessage from "components/Forms/SendMessage";
import SettingsIcon from "@material-ui/icons/Settings";
import EmailIcon from "@material-ui/icons/Email";

const useStyles = makeStyles(() => ({
  root: {},
  avatar: {
    height: 100,
    width: 100,
  },
}));

const Profile = ({ user, isProfile }) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const navigate = useNavigate();
  const [openMessageBox, setOpenMessageBox] = useState(false);

  const handleClickOpen = () => {
    setOpenMessageBox(true);
  };

  const handleClose = () => {
    setOpenMessageBox(false);
  };

  return (
    <Card className={clsx(classes.root)}>
      <CardContent>
        <Box alignItems="center" display="flex" flexDirection="column">
          <Avatar className={classes.avatar} src={user.avatar} />
          <Typography color="textPrimary" gutterBottom variant="h3">
            {user.name}
          </Typography>
          <Typography
            className={classes.dateText}
            color="textSecondary"
            variant="body1"
          >
            {`${user.kind}`}
          </Typography>
          <Typography color="textSecondary" gutterBottom variant="body1">
            {t("profile.online")}
          </Typography>
        </Box>
      </CardContent>
      <Divider />
      <CardActions>
        {isProfile ? (
          <Button
            onClick={handleClickOpen}
            color="primary"
            fullWidth
            variant="text"
            endIcon={<EmailIcon fontSize="small" />}
          >
            {t("profile.message")}
          </Button>
        ) : (
          <Button
            onClick={() => navigate("/profile/settings")}
            color="primary"
            fullWidth
            variant="text"
            // endIcon={<SettingsOutlinedIcon fontSize="small" />}
            endIcon={<SettingsIcon fontSize="small" />}
          >
            {t("profile.settings")}
          </Button>
        )}
      </CardActions>
      {openMessageBox && (
        <SendMessage
          icon
          handleClickOpen={handleClickOpen}
          handleClose={handleClose}
          userId={user.id}
          userName={user.name}
        />
      )}
    </Card>
  );
};

Profile.propTypes = {
  className: PropTypes.string,
};

export default Profile;
