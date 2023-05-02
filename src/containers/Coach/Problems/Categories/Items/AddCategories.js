import React, { useRef, useState } from "react";
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
import { useTranslation } from "react-i18next";
import { categories } from "modules/coach/actions";
import { useAction } from "utils/hooks";
import { Typography } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

const useStyles = makeStyles((theme) => ({
  dialogFooter: {
    padding: 0,
    marginTop: 30,
    marginBottom: 10,
  },
}));

export default function AddCategories() {
  const classes = useStyles();
  const formRef = useRef();
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const { categoriesList } = useSelector((state) => state.coach);
  const createCategory = useAction(categories.create);

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
        {t("coach.problems.categories.add_category")}
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle disableTypography id="form-dialog-title">
          <Typography variant="h4">
            {t("coach.problems.categories.adding_category")}
          </Typography>
        </DialogTitle>
        <Divider />
        <DialogContent>
          <Formik
            innerRef={formRef}
            enableReinitialize={true}
            initialValues={{
              name: "",
              category: "",
            }}
            validationSchema={Yup.object().shape({
              name: Yup.string()
                .max(255)
                .required(t("coach.problems.categories.category_required")),
            })}
            onSubmit={(values) => {
              createCategory(values);
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
                    label={t("coach.problems.categories.name")}
                    name="name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.name}
                    variant="outlined"
                  />
                </Box>
                <TextField
                  fullWidth
                  label={t("coach.problems.categories.included_category")}
                  name="category"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  select
                  SelectProps={{ native: true }}
                  value={values.category}
                  variant="outlined"
                >
                  <option defaultValue value={null}>
                    {t("coach.problems.categories.no_categories")}
                  </option>
                  {categoriesList.map((category) => (
                    <option
                      key={category.category.id}
                      value={category.category.id}
                    >
                      {category.category.name}
                    </option>
                  ))}
                </TextField>
              </form>
            )}
          </Formik>
          <DialogActions className={classes.dialogFooter} disableSpacing>
            <Button onClick={handleSubmit} variant="contained" color="primary">
              {t("coach.problems.categories.save")}
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </>
  );
}
