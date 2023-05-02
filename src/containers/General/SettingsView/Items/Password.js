import React, { useRef } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { Formik } from "formik";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  makeStyles,
  Grid,
} from "@material-ui/core";
import * as Yup from "yup";
import { settings } from "modules/settings/actions";
import { useAction } from "utils/hooks";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles({
  root: {},
  content: {
    minHeight: "330px",
  },
});

const Password = ({ className, ...rest }) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const formRef = useRef();
  const setPasswordSettings = useAction(settings.passwordRequest);
  const handleSubmit = () => {
    if (formRef.current) {
      formRef.current.handleSubmit();
    }
  };

  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <Card>
        <CardHeader title={t("settings.password")} />
        <Divider />
        <CardContent className={classes.content}>
          <Formik
            innerRef={formRef}
            enableReinitialize={true}
            initialValues={{
              oldPassword: "",
              password: "",
              confirm: "",
            }}
            validationSchema={Yup.object().shape({
              oldPassword: Yup.string().required(
                t("validation_error.old_password_required")
              ),
              password: Yup.string()
                .min(6)
                .required(t("validation_error.password_required")),
              confirm: Yup.string()
                .min(6)
                .oneOf(
                  [Yup.ref("password"), null],
                  t("validation_error.passwords_match")
                )
                .required(t("validation_error.confirm_password_required")),
            })}
            onSubmit={(values, actions) => {
              setPasswordSettings(values);
            }}
          >
            {({
              errors,
              handleBlur,
              handleChange,
              handleSubmit,
              isSubmitting,
              touched,
              values,
              setFieldValue,
            }) => (
              <form>
                <Grid container spacing={3}>
                  <Grid item md={12} xs={12}>
                    <TextField
                      error={Boolean(touched.oldPassword && errors.oldPassword)}
                      helperText={touched.oldPassword && errors.oldPassword}
                      fullWidth
                      innerRef={formRef}
                      label={t("form_inputs.old_password")}
                      name="oldPassword"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="password"
                      value={values.oldPassword}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item md={12} xs={12}>
                    <TextField
                      error={Boolean(touched.password && errors.password)}
                      helperText={touched.password && errors.password}
                      fullWidth
                      label={t("form_inputs.new_password")}
                      name="password"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="password"
                      value={values.password}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item md={12} xs={12}>
                    <TextField
                      error={Boolean(touched.confirm && errors.confirm)}
                      helperText={touched.confirm && errors.confirm}
                      fullWidth
                      label={t("form_inputs.confirm_new_password")}
                      name="confirm"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="password"
                      value={values.confirm}
                      variant="outlined"
                    />
                  </Grid>
                </Grid>
              </form>
            )}
          </Formik>
        </CardContent>
        <Divider />
        <Box display="flex" justifyContent="flex-end" p={2}>
          <Button onClick={handleSubmit} color="primary" variant="contained">
            {t("settings.update")}
          </Button>
        </Box>
      </Card>
    </div>
  );
};

Password.propTypes = {
  className: PropTypes.string,
};

export default Password;
