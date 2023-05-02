import React, { useState, useEffect } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
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
  Tooltip,
  TableContainer,
  TablePagination,
} from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import Fade from "@material-ui/core/Fade";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import { useAction } from "utils/hooks";
import { trainings } from "modules/student/actions";
import Lottie from "lottie-react-web";
import * as EmojiAnimation from "./../../../../animations/emoji1";
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
  const classes = useStyles();
  const { t } = useTranslation();
  const { trainingsList, trainingsLoading, trainingsCount } = useSelector(
    (state) => state.student
  );
  const getTrainings = useAction(trainings.request);
  const [trainingsState, setTrainings] = useState(trainingsList);
  const [limit, setLimit] = useState(15);
  const [page, setPage] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    getTrainings({ page: page + 1 });
  }, [getTrainings]);

  useEffect(() => {
    setTrainings(trainingsList);
  }, [trainingsList]);

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
    getTrainings({ page: newPage + 1 });
  };

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardHeader
        title={t("student.trainings.all_trainings")}
        subheaderTypographyProps={{ style: { fontSize: 14 } }}
      />
      <Divider />
      <CardContent>
        <Grid container>
          <Grid xs={12} item container>
            <Grid item>
              <Typography color="textPrimary" gutterBottom variant="body2">
                {t("student.trainings.trainings_title")}
              </Typography>
              <Typography color="textPrimary" gutterBottom variant="body2">
                {t("student.trainings.trainings_description")}
              </Typography>
            </Grid>
          </Grid>
          <Grid xs={12} item>
            <TablePagination
              component="div"
              count={trainingsCount}
              onPageChange={handlePageChange}
              onChangeRowsPerPage={handleLimitChange}
              page={page}
              rowsPerPage={limit}
              rowsPerPageOptions={[15]}
            />
            {!trainingsLoading ? (
              Boolean(trainingsList.length) ? (
                <TableContainer>
                  <Table>
                    <TableBody>
                      {trainingsList.map((training) => (
                        <Fade
                          key={training.id}
                          timeout={{ enter: 300, exit: 300 }}
                          unmountOnExit
                          in={Boolean(
                            trainingsState.find(
                              (item) => item.id === training.id
                            )
                          )}
                        >
                          <TableRow hover className={classes.row}>
                            <TableCell>
                              <Typography variant="h5">
                                {training.name ||
                                  `${t("student.trainings.training")} #${
                                    training.id
                                  }`}
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Grid
                                container
                                spacing={1}
                                justifyContent="flex-end"
                              >
                                <Grid item>
                                  <Typography variant="h6" color="initial">
                                    Author` {training.creatorName}
                                  </Typography>
                                </Grid>
                                <Grid item>
                                  <Tooltip
                                    arrow
                                    placement="top"
                                    title={t("trainings.play.start_training")}
                                  >
                                    <PlayCircleFilledIcon
                                      className={classes.icon}
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        navigate(
                                          `/student/trainings/play/${training.id}`
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
                      <Lottie
                        height={"12rem"}
                        width={"12rem"}
                        options={{
                          autoplay: true,
                          loop: true,
                          animationData: EmojiAnimation.default,
                        }}
                      />
                      <Typography variant="h4">
                        Your coach has no assigned you to any training!
                      </Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              )
            ) : (
              <Loading />
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
