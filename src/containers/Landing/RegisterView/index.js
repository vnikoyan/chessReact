import React, { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import * as Yup from "yup";
import { Formik } from "formik";
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormHelperText,
  Link,
  TextField,
  Typography,
  makeStyles,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  CircularProgress,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@material-ui/core";
// import Select from 'react-select';
import Page from "components/Page";
import TermsDialog from "./Item/TermsDialog";
import { getCities } from "modules/common/actions";
import { useAction } from "utils/hooks";
import { useSelector } from "react-redux";
import { signUp } from "modules/auth/actions";
import { useParams } from "react-router-dom";
import { getCountries } from "modules/common/actions";
import { useTranslation } from "react-i18next";
import { Autocomplete } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
}));

const RegisterView = () => {
  const { t } = useTranslation();
  const classes = useStyles();
  const { refer } = useParams();
  const [openTerms, setOpenTerms] = useState(false);
  const createAccount = useAction(signUp.request);
  const [country, setCountry] = useState("");
  const loadCities = useAction(getCities.request);
  const { countries, cities, loading } = useSelector((state) => state.common);
  const loadCountries = useAction(getCountries.request);
  const { error, successMessage } = useSelector((state) => state.auth);
  const [open, setOpen] = useState(false);
  const [citiesArray, setCitiesArray] = useState(cities);

  useEffect(() => {
    loadCountries();
  }, [loadCountries]);

  useEffect(() => {
    setCitiesArray(cities);
  }, [cities]);

  useEffect(() => {
    if (!open) {
      setCitiesArray([]);
    }
  }, [open]);

  const handleOnChangeCitySelect = (name) => {
    setCitiesArray([]);
    loadCities({ country, page: 1, name });
  };

  const handleTermsToggle = () => {
    setOpenTerms(!openTerms);
  };

  return (
    <Page className={classes.root} title="Register">
      <Box
        mb={5}
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="center"
      >
        <Container maxWidth="sm">
          <Formik
            enableReinitialize={true}
            initialValues={{
              name: "",
              username: "",
              email: "",
              country: "",
              city: "",
              kind: "student",
              password: "",
              policy: false,
              refer: refer,
            }}
            validationSchema={Yup.object().shape({
              username: Yup.string()
                .max(255)
                .required(t("validation_error.username_required")),
              name: Yup.string()
                .max(255)
                .required(t("validation_error.name_required")),
              email: Yup.string()
                .email(t("validation_error.email_valid"))
                .max(255)
                .required(t("validation_error.email_required")),
              city: Yup.string().required(
                t("validation_error.location_required")
              ),
              kind: Yup.string().required(t("validation_error.kind_required")),
              password: Yup.string()
                .min(6)
                .required(t("validation_error.password_required")),
              policy: Yup.boolean().oneOf(
                [true],
                t("validation_error.policy_required")
              ),
            })}
            onSubmit={(values, actions) => {
              createAccount({ requestData: values });
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
              <form onSubmit={handleSubmit}>
                <Box mb={3}>
                  <Typography color="textPrimary" variant="h2">
                    {t("register.create_new_account")}
                  </Typography>
                  <Typography
                    color="textSecondary"
                    gutterBottom
                    variant="body2"
                  >
                    {t("register.use_your_email")}
                  </Typography>
                </Box>
                <TextField
                  error={Boolean(touched.username && errors.username)}
                  fullWidth
                  helperText={touched.username && errors.username}
                  label={t("form_inputs.username")}
                  margin="normal"
                  name="username"
                  autoComplete="off"
                  input={{ autoComplete: "off" }}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.username}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.name && errors.name)}
                  fullWidth
                  helperText={touched.name && errors.name}
                  label={t("form_inputs.name")}
                  margin="normal"
                  name="name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.name}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.email && errors.email)}
                  fullWidth
                  helperText={touched.email && errors.email}
                  label={t("form_inputs.email")}
                  margin="normal"
                  name="email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="email"
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
                  autoComplete="off"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="password"
                  value={values.password}
                  variant="outlined"
                />
                <Box
                  justifyContent="space-between"
                  alignItems="center"
                  display="flex"
                  my={2}
                >
                  <FormControl
                    error={Boolean(touched.city && errors.city)}
                    variant="outlined"
                    className="col-6 pr-3"
                  >
                    <InputLabel id="country-select-label">
                      {t("form_inputs.country")}
                    </InputLabel>
                    <Select
                      error={Boolean(touched.city && errors.city)}
                      labelid="country-select-label"
                      id="country-select"
                      name="country"
                      value={values.country}
                      onChange={(event) => {
                        handleChange(event);
                        setCitiesArray([]);
                        setCountry(event.target.value);
                      }}
                      label={t("form_inputs.country")}
                    >
                      <MenuItem value={0} disabled>
                        <em>{t("form_inputs.select_country")}</em>
                      </MenuItem>
                      {countries.map((country) => (
                        <MenuItem key={country.id} value={country.id}>
                          {country.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl
                    error={Boolean(touched.city && errors.city)}
                    variant="outlined"
                    value={values.city}
                    className="col-6"
                    disabled={values.country === 0}
                  >
                    <TextField
                      fullWidth
                      label={t("form_inputs.city")}
                      name="city"
                      autoComplete="off"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="city"
                      value={values.city}
                      variant="outlined"
                    />
                    {/* <Autocomplete
                      freeSolo
                      labelid="city-select-label"
                      id="city-select"
                      disabled={!country}
                      fullWidth
                      open={open}
                      onOpen={() => {
                        setOpen(true);
                      }}
                      onClose={() => {
                        setOpen(false);
                      }}
                      isOptionEqualToValue={(option, value) =>
                        option.name === value.name
                      }
                      getOptionLabel={(option) => option.name}
                      options={citiesArray}
                      loading={loading}
                      endadornment={{ color: "inherit" }}
                      onChange={(e, value) =>
                        setFieldValue("city", value ? value.name : "")
                      }
                      onInputChange={(event) =>
                        event && handleOnChangeCitySelect(event.target.value)
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          variant="outlined"
                          name="city"
                          labelid="city-select-label"
                          label={t("form_inputs.city")}
                          color="primary"
                          InputProps={{
                            ...params.InputProps,
                            endAdornment: (
                              <>
                                {loading ? (
                                  <CircularProgress color="primary" size={20} />
                                ) : null}
                                {params.InputProps.endAdornment}
                              </>
                            ),
                          }}
                        />
                      )}
                    /> */}
                  </FormControl>
                </Box>
                {Boolean(touched.city && errors.city) && (
                  <FormHelperText error>{errors.city}</FormHelperText>
                )}
                <Box alignItems="center" display="flex" ml={0}>
                  <RadioGroup
                    row
                    aria-label="kind"
                    name="kind"
                    value={values.kind}
                    onChange={handleChange}
                  >
                    <FormControlLabel
                      color="textSecondary"
                      value="student"
                      control={<Radio />}
                      label={t("register.student")}
                    />
                    <FormControlLabel
                      color="textSecondary"
                      value="coach"
                      control={<Radio />}
                      label={t("register.trainer")}
                    />
                  </RadioGroup>
                </Box>
                {Boolean(touched.kind && errors.kind) && (
                  <FormHelperText error>{errors.kind}</FormHelperText>
                )}
                <Box alignItems="center" display="flex" ml={-1}>
                  <Checkbox
                    checked={values.policy}
                    name="policy"
                    onChange={handleChange}
                  />
                  <Typography color="textSecondary" variant="body1">
                    {t("register.i_read")}{" "}
                    <Link
                      color="primary"
                      variant="h6"
                      onClick={handleTermsToggle}
                    >
                      {t("register.terms_and_conditions")}
                    </Link>
                    <TermsDialog
                      open={openTerms}
                      handleToggle={handleTermsToggle}
                    />
                  </Typography>
                </Box>
                {Boolean(touched.policy && errors.policy) && (
                  <FormHelperText error>{errors.policy}</FormHelperText>
                )}
                {Boolean(error) && Boolean(error.email) && (
                  <FormHelperText error>
                    {t("validation_error.email_unique")}
                  </FormHelperText>
                )}
                {Boolean(error) && Boolean(error.username) && (
                  <FormHelperText error>
                    {t("validation_error.username_unique")}
                  </FormHelperText>
                )}
                {Boolean(successMessage) && (
                  <FormHelperText success>{successMessage}</FormHelperText>
                )}
                <Box my={2}>
                  <Button
                    color="primary"
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    {t("register.sign_up_now")}
                  </Button>
                </Box>
                <Typography color="textSecondary" variant="body1">
                  {t("register.have_account")}{" "}
                  <Link component={RouterLink} to="/login" variant="h6">
                    {t("topbar.sign_in")}
                  </Link>
                </Typography>
              </form>
            )}
          </Formik>
        </Container>
      </Box>
    </Page>
  );
};

export default RegisterView;
