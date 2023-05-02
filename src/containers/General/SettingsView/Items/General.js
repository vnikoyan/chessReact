import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import * as Yup from "yup";
import { Formik } from "formik";
import { useTranslation } from "react-i18next";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  FormHelperText,
  TextField,
  makeStyles,
  FormControl,
  CircularProgress,
} from "@material-ui/core";
import { getCities } from "modules/common/actions";
import { settings } from "modules/settings/actions";
import { useAction } from "utils/hooks";
import { useSelector } from "react-redux";
import { getCountries } from "modules/common/actions";
import { Autocomplete } from "@mui/material";

const useStyles = makeStyles({
  root: {},
  content: {
    minHeight: "330px",
  },
});

const General = ({ className, ...rest }) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const loadCities = useAction(getCities.request);
  const setGeneralSettings = useAction(settings.generalRequest);
  const { countries, cities, loading } = useSelector((state) => state.common);
  const [citiesArray, setCitiesArray] = useState(cities);
  const loadCountries = useAction(getCountries.request);
  const user = useSelector((state) => state.me);
  const [country, setCountry] = useState(user.country ? user.country.id : 1);
  const [open, setOpen] = useState(false);
  const formRef = useRef();

  useEffect(() => {
    loadCountries();
    handleOnChangeCitySelect(user.city);
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

  const handleSubmit = () => {
    if (formRef.current) {
      formRef.current.handleSubmit();
    }
  };

  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <Card>
        <CardHeader title={t("settings.general_settings")} />
        <Divider />
        <CardContent className={classes.content}>
          <Grid container spacing={3}>
            <Grid item lg={12} md={12} xs={12}>
              <Formik
                innerRef={formRef}
                enableReinitialize={true}
                initialValues={{
                  name: user.name,
                  username: user.username,
                  email: user.email,
                  country: user.country ? user.country.id : 1,
                  city: user.city ? user.city : "",
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
                })}
                onSubmit={(values, actions) => {
                  setGeneralSettings(values);
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
                    <TextField
                      error={Boolean(touched.username && errors.username)}
                      helperText={touched.username && errors.username}
                      fullWidth
                      label={t("form_inputs.username")}
                      name="username"
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
                    <Grid mt={1} container spacing={3} className="mt-2">
                      <Grid item md={6} xs={12}>
                        <TextField
                          fullWidth
                          label={t("form_inputs.country")}
                          name="country"
                          onChange={(event) => {
                            handleChange(event);
                            setCountry(event.target.value);
                            setFieldValue("city", 0);
                          }}
                          select
                          SelectProps={{ native: true }}
                          value={values.country}
                          variant="outlined"
                        >
                          <option value={0} disabled>
                            {t("form_inputs.select_country")}
                          </option>
                          {countries.map((country) => (
                            <option key={country.id} value={country.id}>
                              {country.name}
                            </option>
                          ))}
                        </TextField>
                      </Grid>
                      <Grid item md={6} xs={12}>
                        <FormControl
                          error={Boolean(touched.city && errors.city)}
                          variant="outlined"
                          value={values.city}
                          className="col-12"
                          disabled={values.country === 0}
                        >
                          {console.log(values.city)}
                          <Autocomplete
                            freeSolo
                            labelid="city-select-label"
                            id="city-select"
                            disabled={!country}
                            value={values.city}
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
                            getOptionLabel={(option) =>
                              option.name ? option.name : option
                            }
                            options={citiesArray}
                            loading={loading}
                            endadornment={{ color: "inherit" }}
                            onChange={(e, value) => {
                              value && setFieldValue("city", value.name);
                            }}
                            onInputChange={(event, value) => {
                              value &&
                                setFieldValue("city", value) &&
                                handleOnChangeCitySelect(value);
                            }}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                variant="outlined"
                                name="city"
                                labelid="city-select-label"
                                label={t("form_inputs.city")}
                                color="primary"
                                value={values.city}
                                InputProps={{
                                  ...params.InputProps,
                                  endAdornment: (
                                    <>
                                      {loading ? (
                                        <CircularProgress
                                          color="primary"
                                          size={20}
                                        />
                                      ) : null}
                                      {params.InputProps.endAdornment}
                                    </>
                                  ),
                                }}
                              />
                            )}
                          />
                          {/* <Select
                            labelid="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            value={values.city}
                            name="city"
                            onChange={handleChange}
                            label={t("form_inputs.city")}
                          >
                            <MenuItem value={0} disabled>
                              <em>{t("form_inputs.select_city")}</em>
                            </MenuItem>
                            {loading ? (
                              <MenuItem className="row justify-content-center">
                                <CircularProgress />
                              </MenuItem>
                            ) : (
                              cities.map((city) => (
                                <MenuItem key={city.id} value={city.id}>
                                  {city.name}
                                </MenuItem>
                              ))
                            )}
                          </Select> */}
                          {Boolean(touched.city && errors.city) && (
                            <FormHelperText error>{errors.city}</FormHelperText>
                          )}
                        </FormControl>
                      </Grid>
                    </Grid>
                  </form>
                )}
              </Formik>
            </Grid>
          </Grid>
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

General.propTypes = {
  className: PropTypes.string,
};

export default General;
