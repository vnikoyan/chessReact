import React, { useState, useEffect } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import {
  Box,
  Card,
  Divider,
  makeStyles,
  CardContent,
  Grid,
  Typography,
  Button,
} from "@material-ui/core";
import { grey, red, green, cyan, blueGrey } from "@material-ui/core/colors";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import TimerIcon from "@material-ui/icons/Timer";
import ReplayIcon from "@material-ui/icons/Replay";
import DoneAllIcon from "@material-ui/icons/DoneAll";
import ErrorIcon from "@material-ui/icons/Error";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import EmojiObjectsIcon from "@material-ui/icons/EmojiObjects";
import Timer from "react-timer-wrapper";
import Timecode from "react-timecode";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles((theme) => ({
  root: {},
  turnButton: {
    cursor: "default !important",
  },
  rotateButton: {
    background: grey[600],
    color: "white",
  },
  passButton: {
    background: cyan[800],
    color: "white",
  },
  nextButton: {
    background: green[500],
    color: "white",
  },
  promptButton: {
    background: grey[100],
    color: grey[600],
  },
  quitButton: {
    background: blueGrey[900],
    color: "white",
  },
  content: {
    padding: "0px !important",
  },
  repeatButton: {
    background: red[800],
    color: "white",
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

const TrainingBoardActions = ({
  skipProblem,
  repeatMove,
  boardStatus,
  chessTurn,
  quitGame,
  moves,
  index,
  trainingIndex,
  trainingTimerActive,
  problemTimerActive,
  trainingTime,
  setTrainingTime,
  onTimerFinish,
  trainingTimeLimit,
  showHint,
}) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const [turn, setTurn] = useState("");

  useEffect(() => {
    setTurn(chessTurn === "w" ? "white" : "black");
  }, [chessTurn]);

  return (
    <Card>
      <CardContent className={classes.content}>
        <Grid container alignItems="center" justifyContent="center">
          <Grid container item xs={12}>
            <Button
              fullWidth
              color="primary"
              variant="contained"
              size="large"
              startIcon={
                boardStatus === "solved" ? (
                  <DoneAllIcon />
                ) : boardStatus === "wrong" ? (
                  <ErrorIcon />
                ) : (
                  false
                )
              }
              className={classes.turnButton}
            >
              {t(`trainings.play.${boardStatus}`)}
            </Button>
          </Grid>
          {boardStatus === "wrong" && (
            <>
              <Button
                fullWidth
                variant="contained"
                size="large"
                className={classes.repeatButton}
                startIcon={<ReplayIcon />}
                onClick={() => repeatMove("undo")}
              >
                {t("trainings.play.repeat")}
              </Button>
              <Button
                fullWidth
                variant="contained"
                size="large"
                className={classes.promptButton}
                startIcon={<EmojiObjectsIcon />}
                onClick={showHint}
              >
                {t("trainings.play.prompt")}
              </Button>
            </>
          )}
          {boardStatus === "solved" && (
            <>
              <Button
                fullWidth
                variant="contained"
                size="large"
                startIcon={<ReplayIcon />}
                onClick={() => repeatMove("reset")}
              >
                {t("trainings.play.solve_again")}
              </Button>
              <Grid container item xs={12}>
                <Button
                  fullWidth
                  variant="contained"
                  size="large"
                  startIcon={<PlayArrowIcon />}
                  className={classes.nextButton}
                  onClick={skipProblem}
                >
                  {t("trainings.play.next_problem")}
                </Button>
              </Grid>
            </>
          )}
          {boardStatus !== "solved" && (
            <Grid container item xs={12}>
              <Button
                fullWidth
                variant="outlined"
                size="large"
                className={classes.passButton}
                startIcon={<PlayArrowIcon />}
                onClick={skipProblem}
              >
                {t("trainings.play.skip")}
              </Button>
            </Grid>
          )}
          <Grid container item xs={12}>
            <Button
              fullWidth
              variant="contained"
              size="large"
              className={classes.quitButton}
              startIcon={<ExitToAppIcon />}
              onClick={quitGame}
            >
              {t("trainings.play.quitting_the_game")}
            </Button>
          </Grid>
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
                  style={{ backgroundColor: turn }}
                  className={clsx(classes.shape, classes.shapeCircle)}
                />
              </Grid>
            </Grid>
          </Box>
        </Grid>
        {moves !== "" && (
          <>
            <Divider />
            <Grid container item xs={12}>
              <Box p={2}>
                <Typography variant="body1" align="center">
                  {moves}
                </Typography>
              </Box>
            </Grid>
          </>
        )}
        <Divider />
        <Box p={2}>
          <Grid container item xs={12}>
            <Grid container item xs={6} alignItems="center">
              <Box mr={1}>
                <Typography variant="body1">
                  {t("trainings.play.time_problem")}
                </Typography>
              </Box>
              <Timer key={index} active={problemTimerActive} duration={null}>
                <Timecode />
              </Timer>
              <Box ml={1}>
                <TimerIcon />
              </Box>
            </Grid>
            <Grid container item xs={6}>
              <Box mr={1}>
                <Typography variant="body1">
                  {t("trainings.play.time_training")}
                </Typography>
              </Box>
              {trainingTimeLimit !== 0 ? (
                <>
                  <Timer
                    key={trainingIndex}
                    active={trainingTimerActive}
                    duration={trainingTimeLimit}
                    onTimeUpdate={({ time }) => {
                      setTrainingTime(time);
                    }}
                    onFinish={onTimerFinish}
                  />
                  <Timecode time={trainingTimeLimit - trainingTime} />
                </>
              ) : (
                <Timer
                  key={trainingIndex}
                  active={trainingTimerActive}
                  duration={null}
                  onTimeUpdate={({ time }) => {
                    setTrainingTime(time);
                  }}
                >
                  <Timecode />
                </Timer>
              )}
              <Box ml={1}>
                <TimerIcon />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </CardContent>
    </Card>
  );
};

TrainingBoardActions.propTypes = {
  className: PropTypes.string,
};

export default TrainingBoardActions;
