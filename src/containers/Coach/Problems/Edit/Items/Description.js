import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import * as Yup from "yup";
import { Formik } from "formik";
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
  Typography,
  makeStyles,
  MenuItem,
  FormControl,
  NativeSelect,
} from "@material-ui/core";
import { useAction } from "utils/hooks";
import { useSelector } from "react-redux";
import BootstrapInput from "components/Forms/BootstrapInput";
import { problems, categories } from "modules/coach/actions";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles({
  root: {},
  content: {
    minHeight: "330px",
  },
  chips: {
    display: "flex",
    flexWrap: "wrap",
  },
  chip: {
    margin: 2,
  },
  select: {
    padding: 10,
  },
  formControl: {
    marginBottom: 10,
  },
  option: {
    fontWeight: "bold",
  },
});

const Description = ({ problem, handleBack, fen, solution, colorOfUser }) => {
  const classes = useStyles();
  const formRef = useRef();
  const updateProblem = useAction(problems.update);
  const getCategories = useAction(categories.request);
  const { t } = useTranslation();
  const { categoriesList, categoriesLoading } = useSelector(
    (state) => state.coach
  );
  const { difficulty } = useSelector((state) => state.common);
  const navigate = useNavigate();

  useEffect(() => {
    getCategories();
  }, []);

  const handleSubmit = () => {
    if (formRef.current) {
      formRef.current.handleSubmit();
    }
  };

  return (
    <Grid item xs={12}>
      <Card>
        <CardHeader title={`3. ${t("coach.problems.add_edit.description")}`} />
        <Divider />
        <CardContent className={classes.content}>
          <Grid container spacing={3}>
            <Grid item lg={12} md={12} xs={12}>
              <Formik
                innerRef={formRef}
                enableReinitialize={true}
                initialValues={{
                  id: problem.id,
                  fen: fen,
                  solution: solution,
                  colorOfUser: colorOfUser,
                  moves: solution[0].length,
                  level: problem.level,
                  priceComplete: problem.priceComplete,
                  priceMistake: problem.priceMistake,
                  category: problem.categoryId,
                  title: problem.title,
                  description: problem.description,
                }}
                validationSchema={Yup.object().shape({
                  category: Yup.number()
                    .positive()
                    .min(1, t("coach.problems.add_edit.category_required")),
                  title: Yup.string().required(
                    t("coach.problems.add_edit.title_required")
                  ),
                  description: Yup.string().required(
                    t("coach.problems.add_edit.description_required")
                  ),
                  priceComplete: Yup.number()
                    .required(
                      t("coach.problems.add_edit.price_complete_required")
                    )
                    .max(13, t("coach.problems.add_edit.price_complete_max")),
                  priceMistake: Yup.number().required(
                    t("coach.problems.add_edit.price_mistake_required")
                  ),
                })}
                onSubmit={(values, actions) => {
                  updateProblem(values);
                  navigate("/coach/problems");
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
                    <Grid container justifyContent="space-between" spacing={4}>
                      <Grid item xs={4}>
                        <FormControl fullWidth className={classes.formControl}>
                          <Typography gutterBottom variant="body2">
                            {t("coach.problems.add_edit.number_of_moves")}
                          </Typography>
                          <TextField
                            error={Boolean(touched.moves && errors.moves)}
                            helperText={touched.moves && errors.moves}
                            fullWidth
                            type="number"
                            name="moves"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.moves}
                            variant="outlined"
                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={4}>
                        <FormControl fullWidth className={classes.formControl}>
                          <Typography gutterBottom variant="body2">
                            {t("coach.problems.add_edit.price_of_complete")}
                          </Typography>
                          <TextField
                            error={Boolean(
                              touched.priceComplete && errors.priceComplete
                            )}
                            helperText={
                              touched.priceComplete && errors.priceComplete
                            }
                            fullWidth
                            type="number"
                            name="priceComplete"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.priceComplete}
                            variant="outlined"
                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={4}>
                        <FormControl fullWidth className={classes.formControl}>
                          <Typography gutterBottom variant="body2">
                            {t("coach.problems.add_edit.mistake_price")}
                          </Typography>
                          <TextField
                            error={Boolean(
                              touched.priceMistake && errors.priceMistake
                            )}
                            helperText={
                              touched.priceMistake && errors.priceMistake
                            }
                            fullWidth
                            type="number"
                            name="priceMistake"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.priceMistake}
                            variant="outlined"
                          />
                        </FormControl>
                      </Grid>
                    </Grid>
                    <FormControl fullWidth className={classes.formControl}>
                      <Typography gutterBottom variant="body2">
                        {t("coach.problems.add_edit.difficulty_level")}
                      </Typography>
                      <TextField
                        fullWidth
                        helperText={touched.level && errors.level}
                        select
                        name="level"
                        onBlur={handleBlur}
                        value={values.level}
                        onChange={handleChange}
                        variant="outlined"
                      >
                        {difficulty.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </TextField>
                    </FormControl>
                    <FormControl
                      fullWidth
                      className={classes.formControl}
                      error
                    >
                      <Typography gutterBottom variant="body2">
                        {t("coach.problems.add_edit.category")}
                      </Typography>
                      <NativeSelect
                        value={values.category}
                        onChange={handleChange}
                        variant="outlined"
                        fullWidth
                        name="category"
                        input={<BootstrapInput />}
                        inputProps={{
                          id: "name-native-error",
                        }}
                      >
                        <option value={0} disabled>
                          {t("coach.problems.add_edit.select_category")}
                        </option>
                        {categoriesLoading && categoriesList.length === 0 ? (
                          <option>
                            {t("coach.problems.add_edit.loading")}
                          </option>
                        ) : (
                          categoriesList.map((category, index) => (
                            <React.Fragment key={index}>
                              <option
                                className={classes.option}
                                key={category.category.id}
                                value={category.category.id}
                              >
                                {category.category.name} (
                                {category.category.tasks})
                              </option>
                              {category.subcategories.map((subCategory) => (
                                <option
                                  key={subCategory.id}
                                  value={subCategory.id}
                                >
                                  {subCategory.name} ({subCategory.tasks})
                                </option>
                              ))}
                            </React.Fragment>
                          ))
                        )}
                      </NativeSelect>
                      {Boolean(touched.category && errors.category) && (
                        <FormHelperText error>{errors.category}</FormHelperText>
                      )}
                    </FormControl>
                    <FormControl fullWidth className={classes.formControl}>
                      <Typography gutterBottom variant="body2">
                        {t("coach.problems.add_edit.title_problems")}
                      </Typography>
                      <TextField
                        helperText={t(
                          "coach.problems.add_edit.title_problems_description"
                        )}
                        fullWidth
                        name="title"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.title}
                        variant="outlined"
                      />
                      {Boolean(touched.title && errors.title) && (
                        <FormHelperText error>{errors.title}</FormHelperText>
                      )}
                    </FormControl>
                    <FormControl fullWidth className={classes.formControl}>
                      <Typography gutterBottom variant="body2">
                        {t("coach.problems.add_edit.description")}
                      </Typography>
                      <TextField
                        fullWidth
                        multiline
                        helperText={t(
                          "coach.problems.add_edit.description_description"
                        )}
                        name="description"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.description}
                        variant="outlined"
                      />
                      {Boolean(touched.description && errors.description) && (
                        <FormHelperText error>
                          {errors.description}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </form>
                )}
              </Formik>
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box display="flex" justifyContent="flex-end" p={2}>
          <Grid container justifyContent="flex-end" spacing={2}>
            <Grid item>
              <Button
                onClick={handleBack}
                size="large"
                variant="outlined"
                color="primary"
              >
                {t("coach.problems.add_edit.back")}
              </Button>
            </Grid>
            <Grid item>
              <Button
                onClick={handleSubmit}
                size="large"
                color="primary"
                variant="contained"
              >
                {t("coach.problems.add_edit.save_and_close")}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Card>
    </Grid>
  );
};

Description.propTypes = {
  className: PropTypes.string,
};

export default Description;
