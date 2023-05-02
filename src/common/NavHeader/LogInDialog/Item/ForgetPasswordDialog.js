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
import { findEmail, checkCode, setPassword } from "modules/recovery/actions";
import { useAction } from "utils/hooks";
import { Capitalize } from "utils/helpers";
import MyAlert from "components/Alert";
import { Typography, Link } from "@material-ui/core";
import ReCAPTCHA from "react-google-recaptcha";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles((theme) => ({
  dialogFooter: {
    padding: 0,
    marginTop: 30,
    marginBottom: 10,
  },
}));

export default function AddStudent() {
  const {
    t,
    i18n: { language },
  } = useTranslation();
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [password, setSassword] = useState("");
  const [captcha, setCaptcha] = useState("");
  const [error, setError] = useState(false);
  const classes = useStyles();
  const recoveryFindEmail = useAction(findEmail.request);
  const recoveryCheckCode = useAction(checkCode.request);
  const recoverySetPassword = useAction(setPassword.request);

  const {
    successMessage,
    loading,
    errorMessage,
    doneMessage,
    apiToken,
  } = useSelector((state) => state.recovery);

  useEffect(() => {
    if (doneMessage) {
      MyAlert({
        text: doneMessage,
        icon: "success",
        confirmButton: "Ok",
        method: handleClose,
      });
    }
  }, [doneMessage]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleFindEmail = () => {
    let schema = Yup.object().shape({
      email: Yup.string()
        .required(t("validation_error.email_required"))
        .email(t("validation_error.email_valid")),
      captcha: Yup.string(t("validation_error.captcha")).required(
        t("validation_error.captcha")
      ),
    });
    schema
      .validate({ email, captcha })
      .then(function (valid) {
        recoveryFindEmail(valid);
        setError(false);
      })
      .catch((err) => {
        setError(err.errors[0]);
      });
  };

  const handleSendCode = () => {
    let schema = Yup.object().shape({
      code: Yup.string()
        .required()
        .test(
          "len",
          t("validation_error.verification_code"),
          (val) => val && val.toString().length === 4
        ),
    });
    schema
      .validate({ code })
      .then(function (valid) {
        recoveryCheckCode(valid);
        setError(false);
      })
      .catch((err) => {
        setError(err.errors[0]);
      });
  };

  const handleSetNewPass = () => {
    let schema = Yup.object().shape({
      password: Yup.string()
        .min(6)
        .required(t("validation_error.password_required")),
    });
    schema
      .validate({ password })
      .then(function (valid) {
        recoverySetPassword(valid);
        setError(false);
        handleClose();
      })
      .catch((err) => {
        setError(err.errors[0]);
      });
  };

  const onChangeCaptcha = (value) => {
    setCaptcha(value);
  };

  return (
    <>
      <Link color="primary" variant="h6" onClick={handleClickOpen}>
        {t("password_recovery.forgot_your_password")}
      </Link>
      <Dialog
        fullWidth
        maxWidth="xs"
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle disableTypography id="form-dialog-title">
          <Typography variant="h4">
            {t("password_recovery.password_recovery")}
          </Typography>
        </DialogTitle>
        <Divider />
        <DialogContent>
          {!Boolean(successMessage) ? (
            <>
              <Box my={3}>
                <TextField
                  required
                  fullWidth
                  label={t("password_recovery.your_email")}
                  name="email"
                  onChange={(event) => setEmail(event.target.value)}
                  value={email}
                  variant="outlined"
                />
                <ReCAPTCHA
                  hl={language}
                  sitekey="6Lc8fJoaAAAAADa8zg2wsVMO_5giBunvvK6P8rTq"
                  onChange={onChangeCaptcha}
                  className="mt-3"
                  theme="dark"
                />
                {Boolean(error) && (
                  <FormHelperText error>{Capitalize(error)}</FormHelperText>
                )}
                {Boolean(errorMessage) && (
                  <FormHelperText error>
                    {Capitalize(errorMessage)}
                  </FormHelperText>
                )}
              </Box>
              <DialogActions className={classes.dialogFooter} disableSpacing>
                <Button
                  disabled={loading}
                  onClick={handleFindEmail}
                  variant="contained"
                  color="primary"
                >
                  {t("password_recovery.send_verification_code")}
                </Button>
              </DialogActions>
            </>
          ) : !Boolean(apiToken) ? (
            <>
              {Boolean(successMessage) && (
                <Typography>{Capitalize(successMessage)}</Typography>
              )}
              <Box my={3}>
                <TextField
                  required
                  fullWidth
                  label={t("password_recovery.verification_code")}
                  name="code"
                  onChange={(event) => setCode(event.target.value)}
                  value={code}
                  variant="outlined"
                />
                {Boolean(error) && (
                  <FormHelperText error>{Capitalize(error)}</FormHelperText>
                )}
                {Boolean(errorMessage) && (
                  <FormHelperText error>
                    {Capitalize(errorMessage)}
                  </FormHelperText>
                )}
              </Box>
              <DialogActions className={classes.dialogFooter} disableSpacing>
                <Button
                  disabled={loading}
                  onClick={handleSendCode}
                  variant="contained"
                  color="primary"
                >
                  {t("password_recovery.confirm_verification_code")}
                </Button>
              </DialogActions>
            </>
          ) : (
            <>
              <Box my={3}>
                <TextField
                  required
                  fullWidth
                  label={t("password_recovery.new_password")}
                  name="password"
                  type="password"
                  onChange={(event) => setSassword(event.target.value)}
                  value={password}
                  variant="outlined"
                />
                {Boolean(error) && (
                  <FormHelperText error>{Capitalize(error)}</FormHelperText>
                )}
                {Boolean(errorMessage) && (
                  <FormHelperText error>
                    {Capitalize(errorMessage)}
                  </FormHelperText>
                )}
              </Box>
              <DialogActions className={classes.dialogFooter} disableSpacing>
                <Button
                  disabled={loading}
                  onClick={handleSetNewPass}
                  variant="contained"
                  color="primary"
                >
                  {t("password_recovery.set_new_password")}
                </Button>
              </DialogActions>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
