import React, { useEffect, useRef, useState } from "react";
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
  Container,
  Chip,
  FormHelperText,
  TextField,
  Typography,
  makeStyles,
  MenuItem,
  FormControl,
  Select,
  FormControlLabel,
  Checkbox,
  CircularProgress,
} from "@material-ui/core";
import { useAction } from "utils/hooks";
import { useSelector } from "react-redux";
import BootstrapInput from "components/Forms/BootstrapInput";
import {
  trainings,
  student,
  allCategories,
  groups,
} from "modules/coach/actions";
import { useNavigate } from "react-router-dom";
import Page from "components/Page";
import ProblemBlock from "./Items/ProblemBlock";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Loading from "components/Loading";

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
    marginBottom: 20,
    marginTop: 20,
  },
});

const EditTraining = () => {
  const classes = useStyles();
  const getTraining = useAction(trainings.get);
  const getAllStudentsList = useAction(student.allRequest);
  const updateTraining = useAction(trainings.update);
  const getPublicCategories = useAction(allCategories.request);
  const getGroups = useAction(groups.request);
  const { t } = useTranslation();
  const { id } = useParams();
  const formRef = useRef();
  const {
    currentTraining,
    loadingCurrent,
    allStudentsList,
    groupsList,
    allStudentsLoading,
  } = useSelector((state) => state.coach);
  const { decisionTime } = useSelector((state) => state.common);
  const [categories, setCategories] = useState([{}]);
  const [problemsCount, setProblemsCount] = useState(1);
  const [error, setError] = useState(false);
  const [selected, setSelected] = useState([]);
  const isAllSelected =
    allStudentsList.length > 0 && selected.length === allStudentsList.length;
  const navigate = useNavigate();

  useEffect(() => {
    getTraining(id);
    getGroups();
    getAllStudentsList();
    getPublicCategories();
  }, [getTraining, id]);

  useEffect(() => {
    if (Boolean(Object.entries(currentTraining).length)) {
      setCategories(currentTraining.categories);
      setProblemsCount(currentTraining.categories.length);
    }
  }, [currentTraining]);

  const handleSaveProblem = (index, categoryObj) => {
    const arr = [...categories];
    arr[index] = categoryObj;
    setCategories([...arr]);
    setError(false);
  };

  const handleAddProblem = (index, categoryObj) => {
    const arr = [...categories];
    arr[index] = JSON.stringify(categoryObj);
    setCategories([...arr]);
    setProblemsCount(problemsCount + 1);
  };

  const handleSubmit = () => {
    if (formRef.current) {
      formRef.current.handleSubmit();
    }
  };

  const handleSubmitEdit = (values) => {
    values = { ...values, categories };
    updateTraining(values);
    navigate("/coach/trainings");
  };

  const handleChangeStudents = (event, setFieldValue) => {
    const value = event.target.value;
    if (value[value.length - 1] === "all") {
      const studentsList =
        selected.length === allStudentsList.length
          ? []
          : allStudentsList.map((item) => item.userId);
      setFieldValue("students", studentsList);
      setSelected(studentsList);
      return;
    } else if (typeof value[value.length - 1] === "object") {
      const studentsList = value[value.length - 1].students.map(
        (item) => item.student.student.id
      );
      setFieldValue("students", studentsList);
      return;
    }
    setFieldValue("students", value);
    setSelected(value);
  };

  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: 48 * 4.5 + 8,
        width: 250,
      },
    },
  };

  return !loadingCurrent ? (
    <Page title={t("coach.trainings.add_edit.edit_training")}>
      <Container maxWidth="xl">
        <Grid item xs={12}>
          <Card>
            <CardHeader title={t("coach.trainings.add_edit.edit_training")} />
            <Divider />
            <CardContent className={classes.content}>
              <Grid container spacing={3}>
                <Grid item lg={12} md={12} xs={12}>
                  <Formik
                    innerRef={formRef}
                    enableReinitialize={true}
                    initialValues={{
                      id: currentTraining.id,
                      name: currentTraining.name,
                      limitTimeTask: currentTraining.limitTimeTask,
                      limitMistakeTask: currentTraining.limitMistakeTask,
                      limitTimeAll: currentTraining.limitTimeAll,
                      limitMistakeAll: currentTraining.limitMistakeAll,
                      students: currentTraining.students
                        ? currentTraining.students.map((item) => item.id)
                        : [],
                      showHints: Boolean(currentTraining.showHints),
                    }}
                    validationSchema={Yup.object().shape({
                      name: Yup.string().required(
                        t("coach.trainings.add_edit.title_required")
                      ),
                      students: Yup.array().min(
                        1,
                        t("coach.trainings.add_edit.students_required")
                      ),
                    })}
                    onSubmit={(values, actions) => {
                      handleSubmitEdit(values);
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
                        <FormControl fullWidth className={classes.formControl}>
                          <Typography gutterBottom variant="h3">
                            {t("coach.trainings.add_edit.title")}
                          </Typography>
                          <Typography gutterBottom variant="body1">
                            {t("coach.trainings.add_edit.title_description")}
                          </Typography>
                          <TextField
                            error={Boolean(touched.name && errors.name)}
                            helperText={touched.name && errors.name}
                            fullWidth
                            name="name"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.name}
                            variant="outlined"
                          />
                        </FormControl>
                        <div className={classes.form}>
                          <Typography gutterBottom variant="h3">
                            {t("coach.trainings.add_edit.problem_blocks")}
                          </Typography>
                          <Typography gutterBottom variant="body1">
                            {t(
                              "coach.trainings.add_edit.problem_blocks_description"
                            )}
                          </Typography>
                          {Array.from({ length: problemsCount }, (_, index) => (
                            <ProblemBlock
                              currentCategory={categories[index]}
                              key={index}
                              isLast={problemsCount - 1 === index}
                              handleSaveProblem={handleSaveProblem}
                              handleAddProblem={handleAddProblem}
                              index={index}
                            />
                          ))}
                          {Boolean(error) && (
                            <FormHelperText error>{error}</FormHelperText>
                          )}
                        </div>
                        <FormControl fullWidth className={classes.formControl}>
                          <Typography gutterBottom variant="h3">
                            {t("coach.trainings.add_edit.limitations")}
                          </Typography>
                          <Grid container justifyContent="space-between">
                            <Grid
                              xs={6}
                              container
                              item
                              spacing={2}
                              justifyContent="space-between"
                            >
                              <Grid item xs={12}>
                                <Typography gutterBottom variant="body1">
                                  {t(
                                    "coach.trainings.add_edit.limitations_description"
                                  )}
                                </Typography>
                              </Grid>
                              <Grid item>
                                <Grid container spacing={1} alignItems="center">
                                  <Grid item>
                                    <Typography gutterBottom variant="body2">
                                      {t(
                                        "coach.trainings.add_edit.decision_limit"
                                      )}
                                    </Typography>
                                  </Grid>
                                  <Grid item>
                                    <TextField
                                      fullWidth
                                      select
                                      name="limitTimeTask"
                                      onBlur={handleBlur}
                                      value={values.limitTimeTask}
                                      onChange={handleChange}
                                      variant="outlined"
                                    >
                                      {decisionTime.map(
                                        (option, optionIndex) => (
                                          <MenuItem
                                            key={optionIndex}
                                            value={option.value}
                                          >
                                            {option.label}
                                          </MenuItem>
                                        )
                                      )}
                                    </TextField>
                                  </Grid>
                                </Grid>
                              </Grid>
                              <Grid item>
                                <Grid container spacing={1} alignItems="center">
                                  <Grid item>
                                    <Typography gutterBottom variant="body2">
                                      {t(
                                        "coach.trainings.add_edit.max_mistakes_problem"
                                      )}
                                    </Typography>
                                  </Grid>
                                  <Grid item>
                                    <TextField
                                      fullWidth
                                      type="number"
                                      name="limitMistakeTask"
                                      placeholder="No"
                                      onBlur={handleBlur}
                                      onChange={handleChange}
                                      value={values.limitMistakeTask}
                                      variant="outlined"
                                    />
                                  </Grid>
                                </Grid>
                              </Grid>
                            </Grid>
                            <Grid
                              xs={6}
                              container
                              item
                              spacing={2}
                              justifyContent="space-between"
                            >
                              <Grid item xs={12}>
                                <Typography gutterBottom variant="body1">
                                  {t(
                                    "coach.trainings.add_edit.training_restrictions"
                                  )}
                                </Typography>
                              </Grid>
                              <Grid item>
                                <Grid container spacing={1} alignItems="center">
                                  <Grid item>
                                    <Typography gutterBottom variant="body2">
                                      {t(
                                        "coach.trainings.add_edit.decision_limit"
                                      )}
                                    </Typography>
                                  </Grid>
                                  <Grid item>
                                    <TextField
                                      fullWidth
                                      select
                                      name="limitTimeAll"
                                      onBlur={handleBlur}
                                      value={values.limitTimeAll}
                                      onChange={handleChange}
                                      variant="outlined"
                                    >
                                      {decisionTime.map((option) => (
                                        <MenuItem
                                          key={option.value}
                                          value={option.value}
                                        >
                                          {option.label}
                                        </MenuItem>
                                      ))}
                                    </TextField>
                                  </Grid>
                                </Grid>
                              </Grid>
                              <Grid item>
                                <Grid container spacing={1} alignItems="center">
                                  <Grid item>
                                    <Typography gutterBottom variant="body2">
                                      {t(
                                        "coach.trainings.add_edit.max_mistakes_training"
                                      )}
                                    </Typography>
                                  </Grid>
                                  <Grid item>
                                    <TextField
                                      fullWidth
                                      type="number"
                                      name="limitMistakeAll"
                                      onBlur={handleBlur}
                                      placeholder="No"
                                      onChange={handleChange}
                                      value={values.limitMistakeAll}
                                      variant="outlined"
                                    />
                                  </Grid>
                                </Grid>
                              </Grid>
                            </Grid>
                          </Grid>
                        </FormControl>
                        <FormControl fullWidth className={classes.formControl}>
                          <Typography gutterBottom variant="h3">
                            {t("coach.trainings.add_edit.student_selection")}
                          </Typography>
                          <Typography gutterBottom variant="body1">
                            {t(
                              "coach.trainings.add_edit.student_selection_description"
                            )}
                          </Typography>
                          {allStudentsList.length && !allStudentsLoading ? (
                            <Select
                              multiple
                              autoWidth
                              variant="outlined"
                              name="students"
                              value={values.students}
                              onChange={(event) =>
                                handleChangeStudents(event, setFieldValue)
                              }
                              input={
                                <BootstrapInput id="select-multiple-complexity" />
                              }
                              renderValue={(selected) => (
                                <div className={classes.chips}>
                                  {selected.map((value) => (
                                    <>
                                      <Chip
                                        key={value}
                                        label={
                                          allStudentsList.find(
                                            (student) =>
                                              student.userId === value
                                          )
                                            ? allStudentsList.find(
                                                (student) =>
                                                  student.userId === value
                                              ).name
                                            : ""
                                        }
                                        className={classes.chip}
                                      />
                                    </>
                                  ))}
                                </div>
                              )}
                              MenuProps={MenuProps}
                            >
                              <MenuItem
                                value="all"
                                classes={{
                                  root: isAllSelected
                                    ? classes.selectedAll
                                    : "",
                                }}
                              >
                                <Checkbox
                                  classes={{
                                    indeterminate: classes.indeterminateColor,
                                  }}
                                  checked={isAllSelected}
                                  indeterminate={
                                    selected.length > 0 &&
                                    selected.length < allStudentsList.length
                                  }
                                />
                                Select All
                              </MenuItem>
                              {groupsList.map((group, index) => (
                                <MenuItem
                                  sx={{ fontWeight: "bold" }}
                                  value={group}
                                  classes={{
                                    root: isAllSelected
                                      ? classes.selectedAll
                                      : "",
                                  }}
                                >
                                  <Typography variant="block" color="primary">
                                    Group: {group.name}
                                  </Typography>
                                </MenuItem>
                              ))}
                              {allStudentsList.map((student, index) => (
                                <MenuItem key={index} value={student.userId}>
                                  {student.name}
                                </MenuItem>
                              ))}
                            </Select>
                          ) : (
                            <CircularProgress />
                          )}
                          {Boolean(touched.students && errors.students) && (
                            <FormHelperText error>
                              {touched.students && errors.students}
                            </FormHelperText>
                          )}
                        </FormControl>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={values.showHints}
                              onChange={handleChange}
                              color="primary"
                              name="showHints"
                            />
                          }
                          label={t("coach.trainings.add_edit.allow_hint")}
                        />
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
                    onClick={handleSubmit}
                    size="large"
                    color="primary"
                    variant="contained"
                  >
                    {t("coach.trainings.add_edit.save_training")}
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Card>
        </Grid>
      </Container>
    </Page>
  ) : (
    <Loading />
  );
};

export default EditTraining;
