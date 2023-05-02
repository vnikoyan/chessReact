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
import { problems } from "modules/coach/actions";
import { useAction } from "utils/hooks";
import Rotate90DegreesCcwIcon from "@material-ui/icons/Rotate90DegreesCcw";
import { grey, red, green, amber, cyan } from "@material-ui/core/colors";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import StarIcon from "@material-ui/icons/Star";
import TimerIcon from "@material-ui/icons/Timer";
import ReplayIcon from "@material-ui/icons/Replay";
import DoneAllIcon from "@material-ui/icons/DoneAll";
import ErrorIcon from "@material-ui/icons/Error";
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
  favoriteButton: {
    background: amber[500],
    color: "white",
  },
  addToFavoriteButton: {
    background: grey[300],
    color: "black",
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
  problem,
  orientation,
  setOrientation,
  moves,
  showHint,
  problemTimerActive,
  setProblemTime,
}) => {
  const classes = useStyles();
  const setFavoriteProblem = useAction(problems.setFavorite);
  const { t } = useTranslation();
  const [turn, setTurn] = useState("");
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    setIsFavorite(problem.favorite);
  }, [problem]);

  useEffect(() => {
    setTurn(chessTurn === "w" ? "white" : "black");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chessTurn]);

  const handleAddToFavorites = () => {
    setFavoriteProblem(problem.id);
    setIsFavorite(!isFavorite);
  };

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
          <Grid container item xs={12}>
            <Button
              fullWidth
              variant="contained"
              size="large"
              startIcon={<Rotate90DegreesCcwIcon />}
              className={classes.rotateButton}
              onClick={() =>
                setOrientation(orientation === "black" ? "white" : "black")
              }
            >
              {t("trainings.play.rotate_board")}
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
                {t("trainings.play.pass")}
              </Button>
            </Grid>
          )}
          <Grid container item xs={12}>
            <Button
              fullWidth
              variant="contained"
              size="large"
              className={
                isFavorite
                  ? classes.favoriteButton
                  : classes.addToFavoriteButton
              }
              startIcon={<StarIcon />}
              onClick={handleAddToFavorites}
            >
              {isFavorite
                ? t("trainings.play.favorites")
                : t("trainings.play.add_to_favorites")}
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
              <Timer active={problemTimerActive} duration={null}>
                <Timecode />
              </Timer>
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
