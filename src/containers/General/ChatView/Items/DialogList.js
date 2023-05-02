import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import {
  Grid,
  Divider,
  TextField,
  List,
  ListItem,
  ListItemIcon,
  InputAdornment,
  SvgIcon,
  ListItemText,
  Avatar,
} from "@material-ui/core";
import { useAction } from "utils/hooks";
import { dialogs } from "modules/chat/actions";
import { Search as SearchIcon } from "react-feather";

const DialogList = ({ className, selectDialog }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const getDialogList = useAction(dialogs.request);
  const user = useSelector((state) => state.me);
  const { dialogList } = useSelector((state) => state.chat);
  const [searchTerm, setSearchTerm] = React.useState("");

  useEffect(() => {
    getDialogList(searchTerm);
  }, [searchTerm]);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <>
      <List>
        <ListItem
          button
          key={user.name}
          onClick={() => navigate("profile", { replace: true })}
        >
          <ListItemIcon>
            <Avatar alt={user.name} src={user.avatar} />
          </ListItemIcon>
          <ListItemText primary={user.name}></ListItemText>
        </ListItem>
      </List>
      {/* <Divider /> */}
      <Grid item xs={12}>
        <TextField
          placeholder={t("chat.search_dialog")}
          variant="outlined"
          onChange={handleChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SvgIcon fontSize="small" color="action">
                  <SearchIcon />
                </SvgIcon>
              </InputAdornment>
            ),
          }}
          fullWidth
        />
      </Grid>
      {/* <Divider /> */}
      <List p={0}>
        {dialogList.map((dialog) => (
          <ListItem
            p={0}
            button
            key={dialog.id}
            onClick={() => selectDialog(dialog)}
          >
            <ListItemIcon>
              <Avatar alt={dialog.name} src={dialog.photo} />
            </ListItemIcon>
            <ListItemText primary={dialog.name}>{dialog.name}</ListItemText>
            {/* <ListItemText secondary="online" align="right"></ListItemText> */}
          </ListItem>
        ))}
      </List>
    </>
  );
};

DialogList.propTypes = {
  className: PropTypes.string,
};

export default DialogList;
