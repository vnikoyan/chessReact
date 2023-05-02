import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  Box,
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
} from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import AddIcon from "@material-ui/icons/Add";
import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted";
import Fade from "@material-ui/core/Fade";
import DeleteIcon from "@material-ui/icons/Delete";
import Chessboard from "chessboardjsx";
import MyAlert from "components/Alert";
import Loading from "components/Loading";
import { problems } from "modules/coach/actions";
import { useAction } from "utils/hooks";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import BackupIcon from "@material-ui/icons/Backup";
import { useTranslation } from "react-i18next";

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

const ProblemsList = ({ page, setPage }) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const { problemsList, problemsLoading, problemsTotal } = useSelector(
    (state) => state.coach
  );
  const [problemsState, setProblems] = useState(problemsList);
  const [limit] = useState(50);
  const deleteProblem = useAction(problems.delete);
  const navigate = useNavigate();

  useEffect(() => {
    setProblems(problemsList);
  }, [problemsList]);

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleDeleteProblem = (id) => {
    MyAlert({
      title: t("coach.delete.title"),
      text: t("coach.delete.text"),
      icon: "warning",
      method: () => {
        deleteProblem(id);
        setProblems(problemsState.filter((item, i) => item.id !== id));
      },
      confirmButton: t("coach.delete.confirmButton"),
      cancelButton: t("coach.delete.cancelButton"),
    });
  };

  return (
    <Card>
      <CardHeader
        title={`${t("coach.problems.all_problems")}: ${problemsState.length}`}
        subheaderTypographyProps={{ style: { fontSize: 14 } }}
      />
      <Divider />
      <CardContent>
        <Grid container>
          <Grid xs={12} item container justifyContent="space-around">
            <Grid item md={5}>
              <Typography color="textPrimary" gutterBottom variant="body2">
                {t("coach.problems.problems_description")}
              </Typography>
            </Grid>
            <Grid item md={7} container spacing={2} justifyContent="flex-end">
              <Grid item>
                <Button
                  color="secondary"
                  size="medium"
                  variant="outlined"
                  fullWidth={false}
                  onClick={() => navigate("/coach/problems/categories")}
                  endIcon={<FormatListBulletedIcon fontSize="small" />}
                >
                  {t("coach.problems.category_list")}
                </Button>
              </Grid>
              <Grid item>
                <Button
                  color="secondary"
                  size="medium"
                  variant="outlined"
                  fullWidth={false}
                  onClick={() => navigate("/coach/problems/upload")}
                  endIcon={<BackupIcon fontSize="small" />}
                >
                  {t("coach.problems.upload_problems")}
                </Button>
              </Grid>
              <Grid item>
                <Button
                  color="primary"
                  size="medium"
                  variant="contained"
                  fullWidth={false}
                  onClick={() => navigate("/coach/problems/add")}
                  endIcon={<AddIcon fontSize="small" />}
                >
                  {t("coach.problems.add_problems")}
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid xs={12} item container justifyContent="flex-start">
            <TablePagination
              component="div"
              count={problemsTotal}
              onPageChange={handlePageChange}
              page={page}
              rowsPerPage={limit}
              rowsPerPageOptions={[50]}
            />
          </Grid>
          <Grid xs={12} item>
            {!problemsLoading ? (
              Boolean(problemsList.length) ? (
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>{t("coach.problems.board")}</TableCell>
                        <TableCell>{t("coach.problems.title")}</TableCell>
                        <TableCell>{t("coach.problems.description")}</TableCell>
                        <TableCell>{t("coach.problems.side")}</TableCell>
                        <TableCell>{t("coach.problems.complexity")}</TableCell>
                        <TableCell></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {problemsList.map((problem) => (
                        <Fade
                          key={problem.id}
                          timeout={{ enter: 300, exit: 300 }}
                          unmountOnExit
                          in={Boolean(
                            problemsState.find((item) => item.id === problem.id)
                          )}
                        >
                          <TableRow
                            hover
                            className={classes.row}
                            onClick={() =>
                              navigate(`/coach/problems/${problem.id}`)
                            }
                          >
                            <TableCell>{problem.id}</TableCell>
                            <TableCell>
                              <Box alignItems="center" display="flex">
                                <Chessboard
                                  draggable={false}
                                  position={problem.fen}
                                  orientation={problem.colorOfUser}
                                  width={200}
                                />
                              </Box>
                            </TableCell>
                            <TableCell>{problem.title}</TableCell>
                            <TableCell>{problem.description}</TableCell>
                            <TableCell>{problem.colorOfUser}</TableCell>
                            <TableCell>{problem.level}</TableCell>
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
                                    title={t("coach.delete.delete")}
                                  >
                                    <DeleteIcon
                                      className={classes.icon}
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleDeleteProblem(problem.id);
                                      }}
                                    />
                                  </Tooltip>
                                </Grid>
                                <Grid item>
                                  <Tooltip
                                    arrow
                                    placement="top"
                                    title={t("coach.problems.play_problem")}
                                  >
                                    <PlayCircleFilledIcon
                                      className={classes.icon}
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        navigate(
                                          `/coach/problems/play/${problem.id}`,
                                          { state: { problem } }
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
                        {t("coach.problems.no_problems")}
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

ProblemsList.propTypes = {
  className: PropTypes.string,
};

export default ProblemsList;
