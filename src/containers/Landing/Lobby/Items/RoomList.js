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
import AllInclusiveIcon from "@mui/icons-material/AllInclusive";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import LockIcon from "@mui/icons-material/Lock";
import { studentReducer } from "modules/student/reducer";
import Loading from "components/Loading";
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
  row: {
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "rgba(244, 122, 33, 0.25) !important",
    },
  },
  mineRow: {
    cursor: "pointer",
    backgroundColor: "rgba(244, 122, 33, 0.25) !important",
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
  const { t } = useTranslation();
  const [difficultyLevel, setDifficultyLevel] = useState(1);
  const [side, setSide] = useState("random");
  const [minPerGame, setMinPerGame] = useState(10);
  const [secPerStep, setSecPerStep] = useState(5);
  const [timeLimit, setTimeLimit] = useState(false);
  const [limit, setLimit] = useState(50);
  const [page, setPage] = useState(0);

  const { roomList, roomTotal, loading } = useSelector((state) => state.game);

  const getRoomList = useAction(room.getList);

  const navigate = useNavigate();

  useEffect(() => {
    getRoomList({ page: 1 });
  }, [0]);

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
    getRoomList({ page: newPage + 1 });
  };

  return (
    <Card>
      <CardContent>
        <TablePagination
          component="div"
          count={roomTotal}
          onPageChange={handlePageChange}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[50]}
        />
        {loading ? (
          <Loading />
        ) : Boolean(roomList.length) ? (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Room ID</TableCell>
                  <TableCell>Player</TableCell>
                  <TableCell>Time</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {roomList.map((room) => (
                  <TableRow
                    hover
                    onClick={() => navigate(`/play/room/${room.token}`)}
                    key={room.id}
                    className={room.isMine ? classes.mineRow : classes.row}
                  >
                    <TableCell>#{room.id}</TableCell>
                    <TableCell>{room.name}</TableCell>
                    <TableCell>
                      {room.timeControl ? (
                        `${room.timeLimit / 60}+${room.secPerMove}`
                      ) : (
                        <AllInclusiveIcon />
                      )}
                    </TableCell>
                    <TableCell>
                      {room.accessibility === "private" ? (
                        <LockIcon />
                      ) : (
                        <LockOpenIcon />
                      )}
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
                  {t("room.there_are_no_active_matchrooms_now")}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        )}
      </CardContent>
    </Card>
  );
}
