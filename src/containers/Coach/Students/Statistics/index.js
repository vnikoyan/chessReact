import React, { useEffect, useState } from "react";
import {
  Container,
  Card,
  CardHeader,
  Avatar,
  Divider,
  CardContent,
  Grid,
  Typography,
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Button,
  makeStyles,
} from "@material-ui/core";
import Page from "components/Page";
import AddGroup from "./Items/AddGroup";
import getInitials from "utils/getInitials";
import CategoriesList from "./GroupsList";
import { useAction } from "utils/hooks";
import { groups, student } from "modules/coach/actions";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import SearchIcon from "@mui/icons-material/Search";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Loading from "components/Loading";
import moment from "moment";
import TextField from "@mui/material/TextField";
import DateRangePicker from "@mui/lab/DateRangePicker";
import Fade from "@material-ui/core/Fade";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import Box from "@mui/material/Box";

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

const CoachStudentStatistics = () => {
  const { t } = useTranslation();
  const classes = useStyles();
  const [group, setGroup] = useState(null);
  const [dateInterval, setDateInterval] = useState([null, null]);
  const { studentStatisticsList, studentsTotal, studentsLoading } = useSelector(
    (state) => state.coach
  );
  const { groupsLoading } = useSelector((state) => state.coach);
  const { groupsList } = useSelector((state) => state.coach);
  const [limit, setLimit] = useState(50);
  const [page, setPage] = useState(0);
  const getGroups = useAction(groups.request);
  const getStudentStatistics = useAction(student.requestStatistics);

  useEffect(() => {
    getGroups();
    getStudentStatistics({ page: 1 });
  }, [getGroups]);

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
    getStudentStatistics({ page: newPage + 1 });
  };

  const handleSearch = () => {
    getStudentStatistics({
      page,
      startDate: dateInterval[0]
        ? moment(dateInterval[0]).format("YYYY-MM-DD")
        : null,
      endDate: dateInterval[1]
        ? moment(dateInterval[1]).format("YYYY-MM-DD")
        : null,
      groupId: group,
    });
  };

  return (
    <>
      <Page title="Student Statistics">
        <Container maxWidth="xl">
          <Grid container spacing={3}>
            <Grid item container spacing={3}>
              <Grid item lg={12} md={12} xs={12}>
                <Card>
                  <CardHeader
                    title={t("statistics.student_statistics")}
                    subheaderTypographyProps={{ style: { fontSize: 14 } }}
                  />
                  <Divider />
                  <CardContent>
                    <Grid container spacing={3}>
                      <Grid
                        xs={12}
                        item
                        container
                        justifyContent="space-between"
                      >
                        <Grid
                          xs={12}
                          spacing={3}
                          item
                          container
                          alignItems="center"
                        >
                          <Grid item>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                              <DateRangePicker
                                startText={t("statistics.from")}
                                endText={t("statistics.to")}
                                value={dateInterval}
                                onChange={(newValue) => {
                                  setDateInterval(newValue);
                                }}
                                renderInput={(startProps, endProps) => (
                                  <React.Fragment>
                                    <TextField {...startProps} />
                                    <Box sx={{ mx: 2 }}>
                                      {" "}
                                      {t("statistics.to")}{" "}
                                    </Box>
                                    <TextField {...endProps} />
                                  </React.Fragment>
                                )}
                              />
                            </LocalizationProvider>
                          </Grid>
                          <Grid item xs={2}>
                            <FormControl fullWidth>
                              <InputLabel id="demo-simple-select-label">
                                {t("statistics.groups")}
                              </InputLabel>
                              <Select
                                variant="outlined"
                                labelid="demo-simple-select-label"
                                id="demo-simple-select"
                                value={group}
                                label="Groups"
                                onChange={(event) =>
                                  setGroup(event.target.value)
                                }
                              >
                                <MenuItem value="">
                                  <em>None</em>
                                </MenuItem>
                                {groupsList.map((group) => (
                                  <MenuItem key={group.id} value={group.id}>
                                    {group.name}
                                  </MenuItem>
                                ))}
                              </Select>
                            </FormControl>
                          </Grid>
                          <Grid item>
                            <Button
                              color="primary"
                              variant="contained"
                              onClick={handleSearch}
                              endIcon={<SearchIcon fontSize="small" />}
                            >
                              {t("statistics.filter")}
                            </Button>
                          </Grid>
                        </Grid>
                      </Grid>
                      <TablePagination
                        component="div"
                        count={studentsTotal}
                        onPageChange={handlePageChange}
                        page={page}
                        rowsPerPage={limit}
                        rowsPerPageOptions={[50]}
                      />
                      <Grid item lg={12} md={12} xs={12}>
                        {studentsLoading ? (
                          <Loading />
                        ) : Boolean(studentStatisticsList.length) ? (
                          <TableContainer>
                            <Table>
                              <TableHead>
                                <TableRow>
                                  <TableCell>
                                    {t("coach.students.name")}
                                  </TableCell>
                                  <TableCell>
                                    {t("coach.students.username")}
                                  </TableCell>
                                  <TableCell>
                                    {t("coach.students.email")}
                                  </TableCell>
                                  <TableCell>
                                    {t("statistics.solved_tasks")}
                                  </TableCell>
                                  <TableCell>
                                    {t("statistics.solved_tasks_with_mistakes")}
                                  </TableCell>
                                  <TableCell>
                                    {t("statistics.average_time_for_task")}
                                  </TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {studentStatisticsList.map((student) => (
                                  <TableRow key={student.userId} hover>
                                    <TableCell>
                                      <Box alignItems="center" display="flex">
                                        <Avatar
                                          className={classes.avatar}
                                          src={student.avatar}
                                        >
                                          {getInitials(student.name)}
                                        </Avatar>
                                        <Typography
                                          color="textPrimary"
                                          variant="body1"
                                        >
                                          {student.name}
                                        </Typography>
                                      </Box>
                                    </TableCell>
                                    <TableCell>{student.name}</TableCell>
                                    <TableCell>{student.email}</TableCell>
                                    <TableCell>{student.solvedTasks}</TableCell>
                                    <TableCell>
                                      {student.solvedTasksMistakes}
                                    </TableCell>
                                    <TableCell>
                                      {student.differents} {t("statistics.sec")}
                                    </TableCell>
                                  </TableRow>
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
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Page>
    </>
  );
};

export default CoachStudentStatistics;
