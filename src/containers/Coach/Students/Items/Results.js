import React, { useState, useEffect } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import moment from "moment";
import {
  Avatar,
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  makeStyles,
  Tooltip,
  Grid,
  CardContent,
  Divider,
  TableContainer,
} from "@material-ui/core";
import getInitials from "utils/getInitials";
import { useSelector } from "react-redux";
import DeleteIcon from "@material-ui/icons/Delete";
import MyAlert from "components/Alert";
import { useAction } from "utils/hooks";
import { student } from "modules/coach/actions";
import { useNavigate } from "react-router-dom";
import SendMessage from "components/Forms/SendMessage";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import StackedLineChartIcon from "@mui/icons-material/StackedLineChart";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import Fade from "@material-ui/core/Fade";
import HourglassEmptyIcon from "@material-ui/icons/HourglassEmpty";
import { studentReducer } from "modules/student/reducer";
import Loading from "components/Loading";
import AddToGroup from "./AddToGroup";
import StudentStatistics from "./StudentStatistics";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles((theme) => ({
  root: {},
  avatar: {
    marginRight: theme.spacing(2),
  },
  row: {
    cursor: "pointer",
  },
  icon: {
    cursor: "pointer",
    "&:hover": {
      color: theme.palette.primary.main,
    },
  },
}));

const Results = ({ className, ...rest }) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const [openMessageBox, setOpenMessageBox] = useState(false);
  const [openAddToGroup, setOpenAddToGroup] = useState(false);
  const [openStatisticsBox, setOpenStatisticsBox] = useState(false);

  const [statisticsBoxStudent, setStatisticsBoxStudent] = useState(null);
  const [addToGroupStudent, setAddToGroupStudent] = useState(null);
  const [messageBoxStudent, setMessageBoxStudent] = useState(null);
  const [limit, setLimit] = useState(50);
  const [page, setPage] = useState(0);
  const { studentList, studentsTotal, studentsLoading } = useSelector(
    (state) => state.coach
  );
  const [studentsState, setStudents] = useState(studentList);
  const deleteStudent = useAction(student.delete);
  const navigate = useNavigate();
  const getStudentList = useAction(student.request);

  useEffect(() => {
    setStudents(studentList);
  }, [studentList]);

  useEffect(() => {
    getStudentList({ page: 1 });
  }, []);

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
    getStudentList({ page: newPage + 1 });
  };

  const handleDeleteStudent = (id) => {
    MyAlert({
      title: t("coach.delete.title"),
      text: t("coach.delete.text"),
      icon: "warning",
      method: () => {
        deleteStudent(id);
        setStudents(studentsState.filter((item, i) => item.id !== id));
      },
      confirmButton: t("coach.delete.confirmButton"),
      cancelButton: t("coach.delete.cancelButton"),
    });
  };

  const handleOpenSendMessageBox = (event, student) => {
    event.stopPropagation();
    setMessageBoxStudent(student);
    setOpenMessageBox(true);
  };

  const handleClickOpenMessageBox = () => {
    setOpenMessageBox(true);
  };

  const handleCloseMessageBox = () => {
    setOpenMessageBox(false);
  };

  const handleOpenStatisticsBox = (event, student) => {
    event.stopPropagation();
    setStatisticsBoxStudent(student);
    setOpenStatisticsBox(true);
  };

  const handleClickOpenStatisticsBox = () => {
    setOpenStatisticsBox(true);
  };

  const handleCloseStatisticsBox = () => {
    setOpenStatisticsBox(false);
  };

  const handleOpenAddToGroup = (event, student) => {
    event.stopPropagation();
    setAddToGroupStudent(student);
    setOpenAddToGroup(true);
  };

  const handleClickOpenAddToGroup = () => {
    setOpenAddToGroup(true);
  };

  const handleCloseAddToGroup = () => {
    setOpenAddToGroup(false);
  };

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardContent>
        <Grid container spacing={3}>
          <Grid item>
            <Box mb={1}>
              <Typography variant="body1">
                {t("coach.students.students_description")}
              </Typography>
            </Box>
          </Grid>
        </Grid>
        <Divider />
        <TablePagination
          component="div"
          count={studentsTotal}
          onPageChange={handlePageChange}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[50]}
        />
        {studentsLoading ? (
          <Loading />
        ) : Boolean(studentList.length) ? (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>{t("coach.students.name")}</TableCell>
                  <TableCell>{t("coach.students.email")}</TableCell>
                  <TableCell>{t("coach.students.username")}</TableCell>
                  <TableCell>{t("coach.students.registration_date")}</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {studentList.map((student) => (
                  <Fade
                    key={student.id}
                    timeout={{ enter: 300, exit: 300 }}
                    unmountOnExit
                    in={Boolean(
                      studentsState.find((item) => item.id === student.id)
                    )}
                  >
                    <TableRow
                      hover
                      className={classes.row}
                      onClick={() =>
                        student.in &&
                        navigate(`/coach/students/${student.username}`)
                      }
                    >
                      <TableCell>
                        <Box alignItems="center" display="flex">
                          <Avatar
                            className={classes.avatar}
                            src={student.avatar}
                          >
                            {getInitials(student.name)}
                          </Avatar>
                          <Typography color="textPrimary" variant="body1">
                            {student.name}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>{student.email}</TableCell>
                      <TableCell>{student.username}</TableCell>
                      <TableCell>
                        {moment(student.createdAt).format("DD/MM/YYYY")}
                      </TableCell>
                      <TableCell>
                        <Grid container spacing={1} justifyContent="flex-end">
                          {student.in ? (
                            <>
                              <Grid item>
                                <Tooltip
                                  arrow
                                  placement="top"
                                  title="Statistics"
                                >
                                  <StackedLineChartIcon
                                    className={classes.icon}
                                    onClick={(event) =>
                                      handleOpenStatisticsBox(event, student)
                                    }
                                  />
                                </Tooltip>
                              </Grid>
                              <Grid item>
                                <Tooltip
                                  arrow
                                  placement="top"
                                  title={t("coach.students.send_message")}
                                >
                                  <MailOutlineIcon
                                    className={classes.icon}
                                    onClick={(event) =>
                                      handleOpenSendMessageBox(event, student)
                                    }
                                  />
                                </Tooltip>
                              </Grid>
                              <Grid item>
                                <Tooltip
                                  arrow
                                  placement="top"
                                  title={t("coach.students.add_to_group")}
                                >
                                  <GroupAddIcon
                                    className={classes.icon}
                                    onClick={(event) => {
                                      handleOpenAddToGroup(event, student);
                                    }}
                                  />
                                </Tooltip>
                              </Grid>
                            </>
                          ) : (
                            <Grid item>
                              <Tooltip
                                arrow
                                placement="top"
                                title={t("coach.students.pending")}
                              >
                                <HourglassEmptyIcon className={classes.icon} />
                              </Tooltip>
                            </Grid>
                          )}
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
                                  handleDeleteStudent(student.id);
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
                  {t("coach.students.no_students")}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        )}
      </CardContent>
      {openStatisticsBox && (
        <StudentStatistics
          icon
          handleClickOpen={handleClickOpenStatisticsBox}
          handleClose={handleCloseStatisticsBox}
          currentStudent={statisticsBoxStudent}
          userId={statisticsBoxStudent.userId}
          userName={statisticsBoxStudent.name}
        />
      )}
      {openMessageBox && (
        <SendMessage
          icon
          handleClickOpen={handleClickOpenMessageBox}
          handleClose={handleCloseMessageBox}
          userId={messageBoxStudent.userId}
          userName={messageBoxStudent.name}
        />
      )}
      {openAddToGroup && (
        <AddToGroup
          icon
          handleClickOpen={handleClickOpenAddToGroup}
          handleClose={handleCloseAddToGroup}
          currentStudent={addToGroupStudent}
          userName={addToGroupStudent.name}
        />
      )}
    </Card>
  );
};

Results.propTypes = {
  className: PropTypes.string,
};

export default Results;
