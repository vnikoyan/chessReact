import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/styles";
import { Box, Divider, FormHelperText } from "@material-ui/core";
import * as Yup from "yup";
import { useSelector } from "react-redux";
import { student } from "modules/coach/actions";
import { useAction } from "utils/hooks";
import AddIcon from "@material-ui/icons/Add";
import { Capitalize } from "utils/helpers";
import MyAlert from "components/Alert";
import { Typography } from "@material-ui/core";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles((theme) => ({
  dialogFooter: {
    padding: 0,
    marginTop: 30,
    marginBottom: 10,
  },
}));

export default function AddStudent() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);
  const classes = useStyles();
  const addStudent = useAction(student.add);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    let schema = Yup.string().required().email();
    schema
      .validate(email)
      .then(function (valid) {
        addStudent(valid);
        setError(false);
        handleClose(false);
      })
      .catch((err) => {
        setError(err.errors[0]);
      });
  };

  return (
    <>
      <Button
        color="primary"
        endIcon={<AddIcon fontSize="small" />}
        variant="contained"
        onClick={handleClickOpen}
      >
        {t("coach.students.invite_student")}
      </Button>
      <Dialog
        fullWidth
        maxWidth="xs"
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle disableTypography id="form-dialog-title">
          <Typography variant="h4">
            {t("coach.students.invite_student")}
          </Typography>
        </DialogTitle>
        <Divider />
        <DialogContent>
          <Box my={3}>
            <TextField
              // error={Boolean(touched.name && errors.name)}
              // helperText={touched.name && errors.name}
              required
              fullWidth
              label={t("form_inputs.email")}
              name="name"
              onChange={(event) => setEmail(event.target.value)}
              value={email}
              variant="outlined"
            />
            {Boolean(error) && (
              <FormHelperText error>{Capitalize(error)}</FormHelperText>
            )}
          </Box>
          <DialogActions className={classes.dialogFooter} disableSpacing>
            <Button onClick={handleSubmit} variant="contained" color="primary">
              {t("coach.students.send_invitation")}
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </>
  );
}
