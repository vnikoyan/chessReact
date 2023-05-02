import React, { useState, useEffect } from "react";
import clsx from "clsx";
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
  Tooltip,
  TableContainer,
  TableHead,
  TablePagination,
} from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Chessboard from "chessboardjsx";
import { useAction } from "utils/hooks";
import { useTranslation } from "react-i18next";
import { problems } from "modules/student/actions";
import Loading from "components/Loading";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";

const useStyles = makeStyles((theme) => ({
  root: {},
  clickablePart: {
    cursor: "pointer",
  },
  icon: {
    fontSize: 24,
    cursor: "pointer",
    "&:hover": {
      color: theme.palette.primary.main,
    },
  },
}));

const ProblemsList = ({ className, ...rest }) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const { publicProblemsList, publicProblems, problemsLoading } = useSelector(
    (state) => state.student
  );
  const getPublicProblems = useAction(problems.request);
  const [limit] = useState(50);
  const [page, setPage] = useState(1);
  const { difficulty } = useSelector((state) => state.common);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(problemsLoading);
  }, [problemsLoading]);

  const handlePageChange = (event, newPage) => {
    setLoading(true);
    setPage(newPage);
    getPublicProblems({ page: newPage });
  };

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardHeader
        title={`${t("student.problems.total_problems")}: 90 000`}
        subheaderTypographyProps={{ style: { fontSize: 14 } }}
      />
      <Divider />
      <CardContent>
        <Grid container>
          <Grid xs={12} item container justifyContent="flex-start">
            <Grid item>
              <Typography color="textPrimary" gutterBottom variant="body2">
                {t("student.problems.description1")}
                <br />
                {t("student.problems.description2")}
                <br />
                {t("student.problems.description3")}
              </Typography>
            </Grid>
          </Grid>
          <Grid xs={12} item>
            <TablePagination
              component="div"
              count={publicProblems.total}
              onPageChange={handlePageChange}
              page={page}
              rowsPerPage={limit}
              rowsPerPageOptions={[50]}
            />
            {Boolean(publicProblemsList.length) ? (
              loading ? (
                <Loading />
              ) : (
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>#</TableCell>
                        <TableCell>{t("student.problems.problem")}</TableCell>
                        <TableCell>{t("student.problems.side")}</TableCell>
                        <TableCell>{t("student.problems.move")}</TableCell>
                        <TableCell>{t("student.problems.level")}</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {publicProblemsList.map((problem, problemIndex) => (
                        <TableRow
                          hover
                          key={problemIndex}
                          className={classes.row}
                        >
                          <TableCell>#{problem.displayId}</TableCell>
                          <TableCell>
                            <Grid item className={classes.clickablePart}>
                              <Box alignItems="center" display="flex">
                                <Chessboard
                                  className={classes.clickablePart}
                                  draggable={false}
                                  position={problem.fen}
                                  orientation={problem.colorOfUser}
                                  width={200}
                                />
                              </Box>
                            </Grid>
                          </TableCell>
                          <TableCell>{problem.colorOfUser}</TableCell>
                          <TableCell>{problem.moveCount}</TableCell>
                          <TableCell>
                            {
                              difficulty.find(
                                (level) => +level.value === problem.level
                              ).label
                            }
                          </TableCell>
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
                                  title={t("student.problems.play_problem")}
                                >
                                  <PlayCircleFilledIcon
                                    className={classes.icon}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      navigate(
                                        `/student/problems/play/${problem.id}`,
                                        { state: { problem } }
                                      );
                                    }}
                                  />
                                </Tooltip>
                              </Grid>
                            </Grid>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )
            ) : (
              <CardContent>
                <Grid container spacing={3} justifyContent="center">
                  <Grid item>
                    <Typography variant="h4">
                      {t("student.problems.no_problems")}
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

ProblemsList.propTypes = {
  className: PropTypes.string,
};

export default ProblemsList;
