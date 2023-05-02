import React, { useState, useEffect } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import moment from "moment";
import {
  Card,
  Table,
  CardHeader,
  Divider,
  TableRow,
  TableCell,
  TableBody,
  makeStyles,
  CardContent,
  Grid,
  Typography,
  Button,
  Tooltip,
  TableContainer,
  TableHead,
  TablePagination,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import AddIcon from "@material-ui/icons/Add";
import Fade from "@material-ui/core/Fade";
import DeleteIcon from "@material-ui/icons/Delete";
import MyAlert from "components/Alert";
import { trainings } from "modules/coach/actions";
import { useAction } from "utils/hooks";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import StackedLineChartIcon from "@mui/icons-material/StackedLineChart";
import Loading from "components/Loading";

const useStyles = makeStyles((theme) => ({
  root: {},
  icon: {
    cursor: "pointer",
    "&:hover": {
      color: theme.palette.primary.main,
    },
  },
  row: {
    cursor: "pointer",
  },
}));

const TrainingsList = ({ className, ...rest }) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const { trainingsList, trainingsTotal, trainingsLoading } = useSelector(
    (state) => state.coach
  );
  const [trainingsState, setTrainings] = useState(trainingsList);
  const [limit] = useState(50);
  const [page, setPage] = useState(0);
  const getTrainings = useAction(trainings.request);
  const deleteTraining = useAction(trainings.delete);
  const navigate = useNavigate();

  useEffect(() => {
    getTrainings({ page: page + 1 });
  }, []);

  useEffect(() => {
    setTrainings(trainingsList);
  }, [trainingsList]);

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
    getTrainings({ page: newPage + 1 });
  };

  const handleDeleteTraining = (id) => {
    MyAlert({
      title: t("coach.delete.title"),
      text: t("coach.delete.text"),
      icon: "warning",
      method: () => {
        deleteTraining(id);
        setTrainings(trainingsState.filter((item) => item.id !== id));
      },
      confirmButton: t("coach.delete.confirmButton"),
      cancelButton: t("coach.delete.cancelButton"),
    });
  };

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardHeader
        title={t("coach.trainings.all_trainings")}
        subheaderTypographyProps={{ style: { fontSize: 14 } }}
      />
      <Divider />
      <CardContent>
        <Grid container>
          <Grid xs={12} item container justifyContent="space-around">
            <Grid item md={7}>
              <Typography color="textPrimary" gutterBottom variant="body2">
                {t("coach.trainings.trainings_title")}
              </Typography>
              <Typography color="textPrimary" gutterBottom variant="body2">
                {t("coach.trainings.trainings_description")}
              </Typography>
            </Grid>
            <Grid item md={5} container spacing={2} justifyContent="flex-end">
              <Grid item>
                <Button
                  color="primary"
                  size="medium"
                  variant="contained"
                  fullWidth={false}
                  onClick={() => navigate("/coach/trainings/add")}
                  endIcon={<AddIcon fontSize="small" />}
                >
                  {t("coach.trainings.create_training")}
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <TablePagination
            component="div"
            count={trainingsTotal}
            onPageChange={handlePageChange}
            page={page}
            rowsPerPage={limit}
            rowsPerPageOptions={[50]}
          />
          <Grid xs={12} item>
            {trainingsLoading ? (
              <Loading />
            ) : Boolean(trainingsList.length) ? (
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>ID</TableCell>
                      <TableCell>{t("coach.trainings.title")}</TableCell>
                      <TableCell>{t("coach.trainings.create_date")}</TableCell>
                      <TableCell>{t("coach.trainings.categories")}</TableCell>
                      <TableCell>{t("coach.trainings.students")}</TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {trainingsList.map((training) => (
                      <Fade
                        key={training.id}
                        timeout={{ enter: 300, exit: 300 }}
                        unmountOnExit
                        in={Boolean(
                          trainingsState.find((item) => item.id === training.id)
                        )}
                      >
                        <TableRow
                          hover
                          className={classes.row}
                          onClick={() =>
                            navigate(`/coach/trainings/${training.id}`)
                          }
                        >
                          <TableCell>{training.id}</TableCell>
                          <TableCell>{training.name}</TableCell>
                          <TableCell>
                            {moment(training.createdAt).format(
                              "YYYY-MM-DD hh:mm A"
                            )}
                          </TableCell>
                          <TableCell>
                            <List
                              component="nav"
                              aria-label="secondary mailbox folders"
                            >
                              {training.categories.map((category, index) => (
                                <ListItem dense key={index}>
                                  <ListItemText primary={category.name} />
                                </ListItem>
                              ))}
                            </List>
                          </TableCell>
                          <TableCell>{training.students.length}</TableCell>
                          <TableCell>
                            <Grid
                              container
                              spacing={1}
                              justifyContent="flex-end"
                            >
                              <Grid item>
                                <Tooltip
                                  arrow
                                  placement="top"
                                  title="Statistics"
                                >
                                  <StackedLineChartIcon
                                    className={classes.icon}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      navigate(
                                        `/coach/trainings/statistics/${training.id}`
                                      );
                                    }}
                                  />
                                </Tooltip>
                              </Grid>
                              <Grid item>
                                <Tooltip
                                  arrow
                                  placement="top"
                                  title={t("coach.delete.delete")}
                                >
                                  <DeleteIcon
                                    className={classes.icon}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleDeleteTraining(training.id);
                                    }}
                                  />
                                </Tooltip>
                              </Grid>
                              <Grid item>
                                <Tooltip
                                  arrow
                                  placement="top"
                                  title={t("coach.play.start_training")}
                                >
                                  <PlayCircleFilledIcon
                                    className={classes.icon}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      navigate(
                                        `/coach/trainings/play/${training.id}`
                                      );
                                    }}
                                  />
                                </Tooltip>
                              </Grid>
                            </Grid>
                          </TableCell>
                        </TableRow>
                      </Fade>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            ) : (
              <CardContent>
                <Grid container spacing={3} justifyContent="center">
                  <Grid item>
                    <Typography variant="h4">
                      {t("coach.delete.no_trainings")}
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            )}
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

TrainingsList.propTypes = {
  className: PropTypes.string,
};

export default TrainingsList;
