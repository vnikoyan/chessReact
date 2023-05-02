import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import {
  Card,
  CardContent,
  Grid,
  Typography,
  makeStyles,
  Box,
  Button,
} from "@material-ui/core";
import { grey, red, green, cyan, blueGrey } from "@material-ui/core/colors";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import FlagIcon from "@mui/icons-material/Flag";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles((theme) => ({
  root: {},
  turnButton: {
    cursor: "default !important",
  },
  shape: {
    backgroundColor: "black",
    width: 40,
    height: 40,
  },
  shapeCircle: {
    borderRadius: "50%",
  },
  quitButton: {
    background: blueGrey[900],
    color: "white",
  },
}));

const GameInfo = ({
  turn,
  minPerGame,
  secPerStep,
  setTimeLimit,
  surrenderGame,
  history,
  side,
}) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const { difficulty } = useSelector((state) => state.common);
  const [turnColor, setTurnColor] = useState("");
  const [movesArray, setMovesArray] = useState([]);
  const { moves } = useSelector((state) => state.game);

  useEffect(() => {
    setTurnColor(turn === "w" ? "white" : "black");
  }, [turn]);

  useEffect(() => {
    const movesPair = moves.filter(
      (value, index) => index === 0 || index % 2 === 0
    );
    const movesArray = [];
    movesPair.forEach((move, i) => {
      const currIndex = i === 0 ? i : i * 2;
      const movePair = [move, moves[currIndex + 1] || ""];
      movesArray.push(movePair);
    });
    setMovesArray(movesArray);
  }, [moves]);

  return (
    <Card className="w-100">
      <CardContent>
        <Grid container item xs={12}>
          <Button
            fullWidth
            variant="contained"
            size="large"
            // startIcon={}
            style={{
              backgroundColor: turnColor,
              color: turnColor === "white" ? "black" : "white",
            }}
            className={classes.turnButton}
          >
            {turnColor === side ? "Your Turn" : `Opponent's turn`}
          </Button>
        </Grid>
        <Grid container item xs={12}>
          <Button
            fullWidth
            variant="contained"
            size="large"
            className={classes.quitButton}
            endIcon={<FlagIcon />}
            onClick={surrenderGame}
          >
            Surrender
          </Button>
        </Grid>
        <Grid container spacing={3} alignItems="center" justifyContent="center">
          <Grid container item xs={12}>
            <Box mt={2} mb={2}>
              <Grid
                item
                container
                spacing={2}
                justifyContent="center"
                alignItems="center"
              >
                <Grid item>{t("trainings.play.moves")}</Grid>
                <Grid item>
                  <div
                    style={{ backgroundColor: turnColor }}
                    className={clsx(classes.shape, classes.shapeCircle)}
                  />
                </Grid>
              </Grid>
            </Box>
          </Grid>
          <TableContainer>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>#</TableCell>
                  <TableCell>{side === "white" ? "You" : "Opponent"}</TableCell>
                  <TableCell>{side === "white" ? "Opponent" : "You"}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {movesArray.map((move, moveIndex) => (
                  <TableRow
                    key={moveIndex}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {moveIndex + 1}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {move[0].from} <DoubleArrowIcon /> {move[0].to}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {move[1].from && (
                        <>
                          {move[1].from} <DoubleArrowIcon /> {move[1].to}
                        </>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </CardContent>
    </Card>
  );
};

GameInfo.propTypes = {
  className: PropTypes.string,
};

export default GameInfo;
