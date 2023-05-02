import React, { useRef, useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/styles";
import {
  Box,
  Divider,
  FormControl,
  Select,
  Chip,
  MenuItem,
  useTheme,
} from "@material-ui/core";
import { Formik } from "formik";
import * as Yup from "yup";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { groups, student } from "modules/coach/actions";
import { useAction } from "utils/hooks";
import { Typography } from "@material-ui/core";
import BootstrapInput from "components/Forms/BootstrapInput";
import AddIcon from "@material-ui/icons/Add";

const useStyles = makeStyles((theme) => ({
  dialogFooter: {
    padding: 0,
    marginTop: 30,
    marginBottom: 10,
  },
}));

export default function AddGroup() {
  const classes = useStyles();
  const formRef = useRef();
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const createGroup = useAction(groups.create);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    if (formRef.current) {
      formRef.current.handleSubmit();
      handleClose();
    }
  };

  return (
    <>
      <Button
        color="primary"
        size="medium"
        variant="contained"
        onClick={handleClickOpen}
        endIcon={<AddIcon fontSize="small" />}
      >
        {t("coach.students.groups.add_group")}
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle disableTypography id="form-dialog-title">
          <Typography variant="h4">
            {t("coach.students.groups.adding_group")}
          </Typography>
        </DialogTitle>
        <Divider />
        <DialogContent>
          <Formik
            innerRef={formRef}
            enableReinitialize={true}
            initialValues={{
              name: "",
            }}
            validationSchema={Yup.object().shape({
              name: Yup.string()
                .max(255)
                .required(t("coach.students.groups.group_required")),
            })}
            onSubmit={(values) => {
              createGroup(values);
            }}
          >
            {({
              errors,
              handleBlur,
              handleChange,
              handleSubmit,
              touched,
              values,
            }) => (
              <form onSubmit={handleSubmit}>
                <Box my={3}>
                  <TextField
                    error={Boolean(touched.name && errors.name)}
                    helperText={touched.name && errors.name}
                    fullWidth
                    label={t("coach.students.groups.name")}
                    name="name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.name}
                    variant="outlined"
                  />
                </Box>
              </form>
            )}
          </Formik>
          <DialogActions className={classes.dialogFooter} disableSpacing>
            <Button onClick={handleSubmit} variant="contained" color="primary">
              {t("coach.students.groups.save")}
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </>
  );
}
