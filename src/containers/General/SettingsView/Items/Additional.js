import React, { useRef } from "react";
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
  TextField,
  makeStyles,
} from "@material-ui/core";
import { useAction } from "utils/hooks";
import { useSelector } from "react-redux";
import { settings } from "modules/settings/actions";

const useStyles = makeStyles({
  root: {
    height: "100%",
  },
  content: {
    minHeight: "330px",
  },
});

const Additional = ({ className, ...rest }) => {
  const { t } = useTranslation();
  const { boards, knowledges } = useSelector((state) => state.common);
  const classes = useStyles();
  const setAdditionalSettings = useAction(settings.additionalRequest);
  const formRef = useRef();
  const user = useSelector((state) => state.me);
  const handleSubmit = () => {
    if (formRef.current) {
      formRef.current.handleSubmit();
    }
  };

  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <Card display="grid" className={classes.root}>
        <CardHeader title={t("settings.general_settings")} />
        <Divider />
        <CardContent className={classes.content}>
          <Grid container spacing={3}>
            <Grid item lg={12} md={12} xs={12}>
              <Formik
                innerRef={formRef}
                enableReinitialize={true}
                initialValues={{
                  about: user.about || "",
                  board: user.board || 1,
                  whatsapp: user.whatsapp || "",
                  skype: user.skype || "",
                  level: user.level || 1,
                }}
                validationSchema={Yup.object().shape({
                  board: Yup.string().required(
                    t("validation_error.board_color_required")
                  ),
                  level: Yup.string().required(
                    t("validation_error.knowledge_level_required")
                  ),
                })}
                onSubmit={(values, actions) => {
                  setAdditionalSettings(values);
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
                      <Grid item md={6} xs={12}>
                        <TextField
                          error={Boolean(touched.username && errors.username)}
                          helperText={touched.username && errors.username}
                          fullWidth
                          label={t("form_inputs.about")}
                          name="about"
                          multiline
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.about}
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item md={6} xs={12}>
                        <TextField
                          error={Boolean(touched.username && errors.username)}
                          helperText={touched.username && errors.username}
                          fullWidth
                          label={t("form_inputs.board_color")}
                          name="board"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          select
                          SelectProps={{ native: true }}
                          value={values.board}
                          variant="outlined"
                        >
                          {boards.map((board) => (
                            <option key={board.value} value={board.value}>
                              {board.name}
                            </option>
                          ))}
                        </TextField>
                      </Grid>
                      <Grid item md={6} xs={12}>
                        <TextField
                          error={Boolean(touched.username && errors.username)}
                          helperText={touched.username && errors.username}
                          fullWidth
                          label={t("form_inputs.whatsapp")}
                          name="whatsapp"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.whatsapp}
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item md={6} xs={12}>
                        <TextField
                          error={Boolean(touched.username && errors.username)}
                          helperText={touched.username && errors.username}
                          fullWidth
                          label={t("form_inputs.skype")}
                          name="skype"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.skype}
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item md={6} xs={12}>
                        <TextField
                          error={Boolean(touched.username && errors.username)}
                          helperText={touched.username && errors.username}
                          fullWidth
                          label={t("form_inputs.knowledge_level")}
                          name="level"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          select
                          SelectProps={{ native: true }}
                          value={values.level}
                          variant="outlined"
                        >
                          {knowledges.map((knowledge) => (
                            <option
                              key={knowledge.value}
                              value={knowledge.value}
                            >
                              {knowledge.name}
                            </option>
                          ))}
                        </TextField>
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

Additional.propTypes = {
  className: PropTypes.string,
};

export default Additional;
