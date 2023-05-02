import React, { useRef } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/styles";
import { Box, Divider } from "@material-ui/core";
import { Formik } from "formik";
import * as Yup from "yup";
import { useSelector } from "react-redux";
import { groups } from "modules/coach/actions";
import { useAction } from "utils/hooks";
import { useTranslation } from "react-i18next";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  dialogFooter: {
    padding: 0,
    marginTop: 30,
    marginBottom: 10,
  },
}));

export default function EditGroup({ group, handleClose }) {
  const { t } = useTranslation();
  const classes = useStyles();
  const formRef = useRef();
  const { categoriesList } = useSelector((state) => state.coach);
  const editGroup = useAction(groups.edit);

  const handleSubmit = () => {
    if (formRef.current) {
      formRef.current.handleSubmit();
      handleClose();
    }
  };

  return (
    <>
      <Dialog open onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle disableTypography id="form-dialog-title">
          <Typography variant="h4">
            {t("coach.students.groups.edit_group")}
          </Typography>
        </DialogTitle>
        <Divider />
        <DialogContent>
          <Formik
            innerRef={formRef}
            enableReinitialize={true}
            initialValues={{
              group_id: group.id,
              name: group.name,
            }}
            validationSchema={Yup.object().shape({
              name: Yup.string()
                .max(255)
                .required(t("coach.students.groups.group_required")),
            })}
            onSubmit={(values) => {
              editGroup(values);
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
              Edit
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </>
  );
}
