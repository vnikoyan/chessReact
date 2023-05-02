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
  Button,
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
import CreateMatchroomModal from "components/GameModal/CreateMatchroomModal";
import CreateRoomModal from "components/GameModal/CreateRoomModal";
import { studentReducer } from "modules/student/reducer";
import Loading from "components/Loading";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import GroupIcon from "@mui/icons-material/Group";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles((theme) => ({
  dialogFooter: {
    padding: 0,
    marginTop: 30,
    marginBottom: 30,
    justifyContent: "center",
  },
  avatar: {
    width: 200,
    height: 200,
  },
  categoryItem: {
    marginBottom: -5,
    marginLeft: 0,
  },
  sidePickButton: {
    width: 80,
    height: 80,
    margin: 10,
    padding: 10,
    "& img": {
      width: "100%",
    },
  },
  sidePickButtonImage: {
    width: 60,
    height: 60,
  },
  sidePickButtonCenter: {
    width: 100,
    height: 100,
    padding: 10,
    "& img": {
      width: "100%",
    },
  },
  sidePickButtonImageCenter: {
    width: 80,
    height: 80,
  },
}));

const levels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export default function RoomList({ startGame }) {
  const [open, setOpen] = useState(true);
  const classes = useStyles();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [difficultyLevel, setDifficultyLevel] = useState(1);
  const [side, setSide] = useState("random");
  const [minPerGame, setMinPerGame] = useState(10);
  const [secPerStep, setSecPerStep] = useState(5);
  const [timeLimit, setTimeLimit] = useState(false);
  const [limit, setLimit] = useState(50);
  const [page, setPage] = useState(0);
  const [createMatchroom, setCreateMatchroom] = useState(false);
  const [createRoom, setCreateRoom] = useState(false);
  const { roomList, roomTotal, loading } = useSelector((state) => state.game);

  const getRoomList = useAction(room.getList);

  useEffect(() => {
    getRoomList({ page: 1 });
  }, []);

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
    getRoomList({ page: newPage + 1 });
  };

  return (
    <Card>
      <CardContent>
        <Grid
          container
          spacing={3}
          direction="column"
          justifyContent="center"
          alignItems="center"
          alignContent="center"
          wrap="nowrap"
        >
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              endIcon={<SportsEsportsIcon />}
              onClick={() => setCreateRoom(true)}
            >
              {t("room.create_a_matchroom")}
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              endIcon={<GroupIcon />}
              onClick={() => setCreateMatchroom(true)}
            >
              {t("topbar.play_with_friend")}
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              endIcon={<SmartToyIcon />}
              onClick={() => navigate("/play/computer", { replace: true })}
            >
              {t("topbar.play_against")}
            </Button>
          </Grid>
        </Grid>
      </CardContent>
      {createMatchroom && (
        <CreateMatchroomModal closeModal={() => setCreateMatchroom(false)} />
      )}
      {createRoom && (
        <CreateRoomModal closeModal={() => setCreateRoom(false)} />
      )}
    </Card>
  );
}
