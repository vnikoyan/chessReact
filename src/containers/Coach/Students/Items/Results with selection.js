import React, { useState } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import moment from "moment";
import PerfectScrollbar from "react-perfect-scrollbar";
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  makeStyles,
  Tooltip,
  Fab,
  Grid,
  CardContent,
  Divider,
} from "@material-ui/core";
import getInitials from "utils/getInitials";
import { useSelector } from "react-redux";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import MyAlert from "components/Alert";
import { useAction } from "utils/hooks";
import { student, request } from "modules/coach/actions";
import { useLocation, useNavigate } from "react-router-dom";
import SendMessage from "containers/General/AccountView/Items/SendMessage";
import MailOutlineIcon from "@material-ui/icons/MailOutline";

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

const Results = ({ className, customers, ...rest }) => {
  const classes = useStyles();
  const [selectedStudentIds, setSelectedStudentIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const { studentList } = useSelector((state) => state.coach);
  const deleteStudent = useAction(student.delete);
  const navigate = useNavigate();

  const handleSelectAll = (event) => {
    let newSelectedCustomerIds;

    if (event.target.checked) {
      newSelectedCustomerIds = customers.map((customer) => customer.id);
    } else {
      newSelectedCustomerIds = [];
    }

    setSelectedStudentIds(newSelectedCustomerIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedStudentIds.indexOf(id);
    let newSelectedStudentIds = [];

    if (selectedIndex === -1) {
      newSelectedStudentIds = newSelectedStudentIds.concat(
        selectedStudentIds,
        id
      );
    } else if (selectedIndex === 0) {
      newSelectedStudentIds = newSelectedStudentIds.concat(
        selectedStudentIds.slice(1)
      );
    } else if (selectedIndex === selectedStudentIds.length - 1) {
      newSelectedStudentIds = newSelectedStudentIds.concat(
        selectedStudentIds.slice(0, -1)
      );
    } else if (selectedIndex > 0) {
      newSelectedStudentIds = newSelectedStudentIds.concat(
        selectedStudentIds.slice(0, selectedIndex),
        selectedStudentIds.slice(selectedIndex + 1)
      );
    }

    setSelectedStudentIds(newSelectedStudentIds);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleDeleteStudent = (id) => {
    MyAlert({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      method: () => deleteStudent(id),
      confirmButton: "Yes, delete it!",
      cancelButton: true,
    });
  };

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <PerfectScrollbar>
        <Box minWidth={1050}>
          <CardContent>
            <Grid container spacing={3}>
              <Grid item>
                <Typography variant="body1">
                  List of students. By inviting students to Your Cabinet, you
                  get the opportunity to assign them Trainings and view their
                  statistics.
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
          <Divider />
          {Boolean(studentList.length) ? (
            <Table>
              <TableHead>
                <TableRow>
                  {/* <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedCustomerIds.length === customers.length}
                    color="primary"
                    indeterminate={
                      selectedCustomerIds.length > 0
                      && selectedCustomerIds.length < customers.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell> */}
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Username</TableCell>
                  <TableCell>Registration date</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {studentList.slice(0, limit).map((student) => (
                  <TableRow
                    hover
                    key={student.id}
                    className={classes.row}
                    onClick={() =>
                      navigate(`/coach/students/${student.username}`)
                    }
                    selected={selectedStudentIds.indexOf(student.id) !== -1}
                  >
                    {/* <TableCell padding="checkbox">
                      <Checkbox
                        checked={selectedCustomerIds.indexOf(customer.id) !== -1}
                        onChange={(event) => handleSelectOne(event, customer.id)}
                        value="true"
                      />
                    </TableCell> */}
                    <TableCell>
                      <Box alignItems="center" display="flex">
                        <Avatar className={classes.avatar} src={student.avatar}>
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
                      <Tooltip arrow placement="top" title="Delete">
                        <DeleteIcon
                          className={classes.icon}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteStudent(student.id);
                          }}
                        />
                      </Tooltip>
                      <Tooltip
                        arrow
                        placement="top"
                        className="ml-2"
                        title="Send Message"
                      >
                        <MailOutlineIcon
                          className={classes.icon}
                          onClick={(e) => {
                            e.stopPropagation();
                          }}
                        />
                      </Tooltip>
                      <SendMessage icon user={student} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <>
              <CardContent>
                <Grid container spacing={3} justifyContent="center">
                  <Grid item>
                    <Typography variant="h4">
                      You don't have students now
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </>
          )}
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={customers.length}
        onPageChange={handlePageChange}
        onChangeRowsPerPage={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

Results.propTypes = {
  className: PropTypes.string,
  customers: PropTypes.array.isRequired,
};

export default Results;
