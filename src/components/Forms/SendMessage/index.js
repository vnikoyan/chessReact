import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/styles";
import { Box, Divider, FormHelperText, Typography } from "@material-ui/core";
import * as Yup from "yup";
import { useSelector } from "react-redux";
import { request } from "modules/coach/actions";
import { useAction } from "utils/hooks";
import { Capitalize } from "utils/helpers";
import MyAlert from "components/Alert";
import SendIcon from "@material-ui/icons/Send";
import { send } from "modules/chat/actions";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles((theme) => ({
  dialogFooter: {
    padding: 0,
    marginTop: 30,
    marginBottom: 10,
  },
  icon: {
    cursor: "pointer",
    "&:hover": {
      color: theme.palette.primary.main,
    },
  },
}));

export default function SendMessage({
  userId,
  userName,
  handleClickOpen,
  handleClose,
}) {
  const { t } = useTranslation();
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const classes = useStyles();
  const sendMessages = useAction(send.request);

  const handleSendMessage = () => {
    const data = {
      ids: [userId],
      name: "name",
      message: message,
      attachments: {},
    };
    sendMessages(data);
    setMessage("");
  };

  const handleSubmit = () => {
    let schema = Yup.string().required();
    schema
      .validate(message)
      .then(function (valid) {
        handleSendMessage();
        setError(false);
        handleClose(false);
      })
      .catch((err) => {
        setError(err.errors[0]);
      });
  };

  return (
    <>
      <Dialog
        open
        fullWidth
        maxWidth="xs"
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle disableTypography id="form-dialog-title">
          <Typography variant="h4">
            {t("coach.students.send_message_to")} {userName}
          </Typography>
        </DialogTitle>
        <Divider />
        <DialogContent>
          <Box my={3}>
            <TextField
              fullWidth
              multiline
              label={t("form_inputs.type_something")}
              name="name"
              onChange={(event) => setMessage(event.target.value)}
              value={message}
              variant="outlined"
              onKeyPress={(ev) => {
                if (ev.key === "Enter") {
                  handleSubmit();
                  ev.preventDefault();
                }
              }}
            />
            {Boolean(error) && (
              <FormHelperText error>{Capitalize(error)}</FormHelperText>
            )}
          </Box>
          <DialogActions className={classes.dialogFooter} disableSpacing>
            <Button
              onClick={handleSubmit}
              variant="contained"
              color="primary"
              endIcon={<SendIcon fontSize="small" />}
            >
              {t("coach.students.send")}
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </>
  );
}
