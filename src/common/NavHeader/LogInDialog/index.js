import React, { useState } from "react";
import { useSelector } from "react-redux";

import { LimeButton } from "components/Buttons/LimeButton";

import { Link as RouterLink } from "react-router-dom";
import * as Yup from "yup";
import { Formik } from "formik";
import {
  Box,
  Container,
  Link,
  TextField,
  Typography,
  makeStyles,
  FormHelperText,
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import DraftsIcon from "@material-ui/icons/Drafts";
import SendIcon from "@material-ui/icons/Send";
import { useAction } from "utils/hooks";
import { signIn } from "modules/auth/actions";
import { useTranslation } from "react-i18next";
import ForgetPasswordDialog from "./Item/ForgetPasswordDialog";
import StyledMenu from "components/StyledMenu";

const useStyles = makeStyles((theme) => ({
  root: {
    // backgroundColor: theme.palette.background.dark,
    height: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
}));

export const LogInDialog = () => {
  const login = useAction(signIn.request);
  const { error, loading } = useSelector((state) => state.auth);
  const [openForgetPassword, setOpenForgetPassword] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { t } = useTranslation();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const classes = useStyles();
  const handleForgetPassword = () => {
    setOpenForgetPassword(!openForgetPassword);
  };

  return (
    <>
      <Button
        aria-controls="customized-menu"
        aria-haspopup="true"
        variant="text"
        color="primary"
        onClick={handleClick}
      >
        {t("topbar.sign_in")}
      </Button>
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <Container width={500} aligncontent="center" className={classes.root}>
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validationSchema={Yup.object().shape({
              email: Yup.string()
                .max(255)
                .required("Email or username are required"),
              password: Yup.string().min(6).required("Password is required"),
            })}
            onSubmit={(values) => {
              login({ requestData: values });
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
            }) => (
              <form bgcolor="text.secondary" onSubmit={handleSubmit}>
                <Box mb={3}>
                  <Typography color="secondary" variant="h2">
                    {t("topbar.sign_in")}
                  </Typography>
                </Box>
                <TextField
                  error={Boolean(touched.email && errors.email)}
                  fullWidth
                  helperText={touched.email && errors.email}
                  label={t("form_inputs.email_or_username")}
                  margin="normal"
                  name="email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="text"
                  value={values.email}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.password && errors.password)}
                  fullWidth
                  helperText={touched.password && errors.password}
                  label={t("form_inputs.password")}
                  margin="normal"
                  name="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="password"
                  value={values.password}
                  variant="outlined"
                />
                {Boolean(error) && Boolean(error.login) && (
                  <FormHelperText error>{error.login}</FormHelperText>
                )}
                <Box mb={3}>
                  <Typography color="textSecondary" variant="body1">
                    <ForgetPasswordDialog
                      open={openForgetPassword}
                      handleToggle={handleForgetPassword}
                    />
                  </Typography>
                </Box>
                <Box my={2}>
                  <LimeButton className="LimeButton">
                    {t("login.sign_in_now")}
                  </LimeButton>
                </Box>
                <Typography color="textSecondary" variant="body1">
                  {t("login.dont_have_account")}{" "}
                  <Link component={RouterLink} to="/register" variant="h6">
                    {t("login.sign_up")}
                  </Link>
                </Typography>
              </form>
            )}
          </Formik>
        </Container>
      </StyledMenu>
    </>
  );
};
