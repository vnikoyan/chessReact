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
  Container,
} from "@material-ui/core";
import Page from "components/Page";
import getInitials from "utils/getInitials";
import { useSelector } from "react-redux";
import DeleteIcon from "@material-ui/icons/Delete";
import MyAlert from "components/Alert";
import { useAction } from "utils/hooks";
import { room } from "modules/game/actions";
import { useNavigate } from "react-router-dom";
import SendMessage from "components/Forms/SendMessage";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import StackedLineChartIcon from "@mui/icons-material/StackedLineChart";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import Fade from "@material-ui/core/Fade";
import HourglassEmptyIcon from "@material-ui/icons/HourglassEmpty";
import { studentReducer } from "modules/student/reducer";
import Loading from "components/Loading";
import { useTranslation } from "react-i18next";
import RoomList from "./Items/RoomList";
import CreateGameActions from "./Items/CreateGameActions";

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
  const { myMatchroom, myRoom } = useSelector((state) => state.game);
  const [openStatisticsBox, setOpenStatisticsBox] = useState(false);

  const [statisticsBoxStudent, setStatisticsBoxStudent] = useState(null);
  const [addToGroupStudent, setAddToGroupStudent] = useState(null);
  const [messageBoxStudent, setMessageBoxStudent] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (myMatchroom) {
      navigate(`/play/match/${myMatchroom.token}`);
    }
  }, [myMatchroom]);

  useEffect(() => {
    if (myRoom && myRoom.matchRoomToken) {
      navigate(`/play/room/${myRoom.matchRoomToken}`);
    }
  }, [myRoom]);

  // const handleDeleteStudent = (id) => {
  //   MyAlert({
  //     title: t("coach.delete.title"),
  //     text: t("coach.delete.text"),
  //     icon: "warning",
  //     method: () => {
  //       deleteStudent(id);
  //       setStudents(studentsState.filter((item, i) => item.id !== id));
  //     },
  //     confirmButton: t("coach.delete.confirmButton"),
  //     cancelButton: t("coach.delete.cancelButton"),
  //   });
  // };

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
    <Page title={t("coach.students.my_students")}>
      <Container maxWidth={false}>
        <Grid container spacing={3}>
          <Grid item xs={8}>
            <RoomList />
          </Grid>
          <Grid item xs={4}>
            <CreateGameActions />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

Results.propTypes = {
  className: PropTypes.string,
};

export default Results;
