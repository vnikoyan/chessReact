import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Box,
  Avatar as AvatarBlock,
  CardContent,
  CardHeader,
  Divider,
  Card,
  makeStyles,
  Button,
} from "@material-ui/core";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { settings } from "modules/settings/actions";
import { settings as UserSettings } from "modules/me/actions";
import { useAction } from "utils/hooks";

const useStyles = makeStyles(() => ({
  root: {},
  avatar: {
    height: 200,
    width: 200,
  },
  content: {
    minHeight: "330px",
  },
}));

const Avatar = ({ className, ...rest }) => {
  const { t } = useTranslation();
  const user = useSelector((state) => state.me);
  const setAvatarRequest = useAction(settings.avatarRequest);
  const setNewAvatar = useAction(UserSettings.setNewAvatar);
  const [avatar, setAvatar] = useState(false);
  const [avatarSrc, setAvatarSrc] = useState(user.avatar);
  const classes = useStyles();

  const handleChange = (event) => {
    const newAvatar = event.target.files[0];
    setAvatar(newAvatar);
    setAvatarSrc(URL.createObjectURL(newAvatar));
  };

  const changeAvatar = (event) => {
    if (avatar) {
      setAvatarRequest(avatar);
      setNewAvatar(avatarSrc);
    }
  };

  return (
    <Card>
      <CardHeader title={t("settings.avatar")} />
      <Divider />
      <CardContent className={classes.content}>
        <form>
          <Box m={2} alignItems="center" display="flex" flexDirection="column">
            <AvatarBlock className={classes.avatar} src={avatarSrc} />
          </Box>
          <Box m={2} alignItems="center" display="flex" flexDirection="column">
            <input
              accept="image/*"
              className={classes.input}
              style={{ display: "none" }}
              id="raised-button-file"
              multiple
              type="file"
              onChange={handleChange}
            />
            <label htmlFor="raised-button-file">
              <Button
                variant="outlined"
                component="span"
                className={classes.button}
              >
                {t("settings.upload")}
              </Button>
            </label>
          </Box>
        </form>
      </CardContent>
      <Divider />
      <Box display="flex" justifyContent="flex-end" p={2}>
        <Button onClick={changeAvatar} color="primary" variant="contained">
          {t("settings.update")}
        </Button>
      </Box>
    </Card>
  );
};

Avatar.propTypes = {
  className: PropTypes.string,
};

export default Avatar;
