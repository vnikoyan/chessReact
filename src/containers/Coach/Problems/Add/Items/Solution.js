import React, { useEffect, useState, createRef } from "react";
import {
  Grid,
  Card,
  CardHeader,
  Divider,
  CardContent,
  Button,
  makeStyles,
  TextField,
} from "@material-ui/core";
import Chessboard from "chessboardjsx";
import Chess from "chess.js";
import { calcWidthChess, getPgn } from "utils/chessHelpers";
import clsx from "clsx";
import ReplayIcon from "@material-ui/icons/Replay";
import RotateLeftIcon from "@material-ui/icons/RotateLeft";
import AddToPhotosIcon from "@material-ui/icons/AddToPhotos";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import MyAlert from "components/Alert";
import { useTranslation } from "react-i18next";

const boardStyle = {
  borderRadius: "5px",
  boxShadow: `0 5px 15px rgba(0, 0, 0, 0.5)`,
};

const useStyles = makeStyles(() => ({
  mySelect: {
    textAlign: "center",
    padding: 0,
    "& div": {
      fontSize: "0.9375rem",
    },
  },
  shape: {
    backgroundColor: "black",
    width: 40,
    height: 40,
  },
  shapeCircle: {
    borderRadius: "50%",
  },
}));

const Solution = ({
  startingPosition,
  handleBack,
  applySolution,
  addOneMoreSolution,
  solutionindex,
  isLast,
  saveSolution,
  colorOfUser,
}) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const [position, setPosition] = useState(startingPosition);
  const [solution, setSolution] = useState("");
  const [moves, setMoves] = useState("");
  const [turn, setTurn] = useState("");
  const chessboard = createRef();
  const [chess] = useState(new Chess(startingPosition));

  useEffect(() => {
    setTurn(chess.turn() === "w" ? "white" : "black");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chess.turn()]);

  useEffect(() => {
    if (getPgn(chess.pgn()) !== false) {
      setMoves(getPgn(chess.pgn()));
    } else {
      setMoves(chess.pgn());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chess.pgn()]);

  const handleMove = (move) => {
    chess.move(move);
    setPosition(chess.fen());
  };

  const handleUndo = () => {
    chess.undo();
    setPosition(chess.fen());
  };

  const handleReset = () => {
    chess.load(startingPosition);
    setPosition(chess.fen());
  };

  const handleSaveSolution = (index, moves) => {
    if (!Boolean(moves)) {
      MyAlert({
        text: t("coach.problems.add_edit.solution_cant_empty"),
        icon: "error",
        confirmButton: t("coach.problems.add_edit.ok_button"),
      });
    } else {
      setSolution(moves);
      saveSolution(index, chess.history());
    }
  };

  const handleAddOneMoreSolution = () => {
    if (!Boolean(solution)) {
      MyAlert({
        text: t("coach.problems.add_edit.solution_cant_empty"),
        icon: "error",
        confirmButton: t("coach.problems.add_edit.ok_button"),
      });
    } else {
      addOneMoreSolution();
    }
  };

  const handleApplySolution = () => {
    if (!Boolean(solution)) {
      MyAlert({
        text: t("coach.problems.add_edit.solution_cant_empty"),
        icon: "error",
        confirmButton: t("coach.problems.add_edit.ok_button"),
      });
    } else {
      applySolution();
    }
  };

  return (
    <>
      <Grid item xs={12}>
        <Card>
          {solutionindex === 0 && (
            <CardHeader
              title={`2. ${t("coach.problems.add_edit.solution")}`}
              subheaderTypographyProps={{ style: { fontSize: 14 } }}
            />
          )}
          <Divider />
          <CardContent>
            <Grid item container spacing={3}>
              <Grid md={6} container item justifyContent="center">
                <Chessboard
                  calcWidth={calcWidthChess}
                  onDrop={(move) =>
                    handleMove({
                      from: move.sourceSquare,
                      to: move.targetSquare,
                      promotion: "q",
                    })
                  }
                  ref={chessboard}
                  draggable={true}
                  position={position}
                  boardStyle={boardStyle}
                  orientation={colorOfUser}
                  transitionDuration={300}
                />
              </Grid>
              <Grid md={6} item>
                <Grid xs={12} container item spacing={3}>
                  <Grid
                    xs={12}
                    item
                    container
                    spacing={1}
                    justifyContent="flex-start"
                  >
                    <Grid item md={4}>
                      <Button
                        color="secondary"
                        size="large"
                        variant="outlined"
                        fullWidth
                        onClick={handleUndo}
                        startIcon={<ReplayIcon fontSize="small" />}
                      >
                        {t("coach.problems.add_edit.undo_move")}
                      </Button>
                    </Grid>
                    <Grid item md={4}>
                      <Button
                        color="secondary"
                        size="large"
                        variant="outlined"
                        fullWidth
                        onClick={handleReset}
                        startIcon={<RotateLeftIcon fontSize="small" />}
                      >
                        {t("coach.problems.add_edit.reset_moves")}
                      </Button>
                    </Grid>
                    <Grid
                      item
                      container
                      spacing={3}
                      justifyContent="center"
                      alignItems="center"
                      md={4}
                    >
                      <Grid item>{t("coach.problems.add_edit.moves")}</Grid>
                      <Grid item>
                        <div
                          style={{ backgroundColor: turn }}
                          className={clsx(classes.shape, classes.shapeCircle)}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item container justifyContent="flex-start">
                    <Grid xs={12} item>
                      <TextField
                        fullWidth
                        value={moves}
                        label={t("coach.problems.add_edit.sequence_moves")}
                        variant="outlined"
                      />
                    </Grid>
                  </Grid>
                  <Grid item container justifyContent="flex-start">
                    <Grid xs={12} item>
                      <Button
                        size="large"
                        color="primary"
                        variant="contained"
                        fullWidth={false}
                        onClick={() => handleSaveSolution(solutionindex, moves)}
                        endIcon={<ArrowDownwardIcon />}
                      >
                        {t("coach.problems.add_edit.save")}
                      </Button>
                    </Grid>
                  </Grid>
                  <Grid item container justifyContent="flex-start">
                    <Grid xs={12} item>
                      <TextField
                        fullWidth
                        value={solution}
                        label={t("coach.problems.add_edit.correct_moves")}
                        variant="outlined"
                      />
                    </Grid>
                  </Grid>
                  <Divider />
                  {isLast && (
                    <Grid
                      xs={12}
                      item
                      container
                      spacing={1}
                      justifyContent="flex-start"
                    >
                      <Grid item>
                        <Button
                          size="large"
                          color="primary"
                          variant="outlined"
                          fullWidth={false}
                          onClick={handleBack}
                        >
                          {t("coach.problems.add_edit.back")}
                        </Button>
                      </Grid>
                      <>
                        <Grid item>
                          <Button
                            size="large"
                            color="primary"
                            variant="contained"
                            fullWidth={false}
                            onClick={handleAddOneMoreSolution}
                            endIcon={<AddToPhotosIcon />}
                          >
                            {t("coach.problems.add_edit.add_one_more")}
                          </Button>
                        </Grid>
                        <Grid item>
                          <Button
                            size="large"
                            color="primary"
                            variant="contained"
                            fullWidth={false}
                            onClick={handleApplySolution}
                          >
                            {t("coach.problems.add_edit.apply")}
                          </Button>
                        </Grid>
                      </>
                    </Grid>
                  )}
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </>
  );
};

export default Solution;
