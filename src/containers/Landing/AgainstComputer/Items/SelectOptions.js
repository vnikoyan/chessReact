import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/styles";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Avatar,
  Box,
  Divider,
  Grid,
  Select,
  MenuItem,
} from "@material-ui/core";
import Slider from "@mui/material/Slider";
import ButtonGroup from "@mui/material/ButtonGroup";
import { Typography } from "@material-ui/core";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import { SERVER_URL } from "configs";
import { useTranslation } from "react-i18next";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

const useStyles = makeStyles((theme) => ({
  dialogFooter: {
    padding: 0,
    marginTop: 30,
    marginBottom: 16,
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

export default function SelectOptions({ startGame }) {
  const [open, setOpen] = useState(true);
  const classes = useStyles();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [difficultyLevel, setDifficultyLevel] = useState(1);
  const [side, setSide] = useState("random");
  const [minPerGame, setMinPerGame] = useState(10);
  const [secPerStep, setSecPerStep] = useState(5);
  const [timeLimit, setTimeLimit] = useState(false);

  const handleSubmit = () => {
    setOpen(false);
    let currSide = side;
    if (side === "random") {
      currSide = ["white", "black"][Math.floor(Math.random() * 2)];
    }
    startGame({
      difficultyLevel,
      side: currSide,
      minPerGame,
      secPerStep,
      timeLimit,
    });
  };

  return (
    <Dialog open={open} aria-labelledby="form-dialog-title">
      <DialogTitle disableTypography id="form-dialog-title">
        <Typography variant="h4" align="center">
          {t("play.with_computer.play_with_computer")}
        </Typography>
      </DialogTitle>
      <Divider />
      <DialogContent>
        <Box py={3}>
          <Grid spacing={5} alignItems="center" container direction="column">
            <Grid xs={12} spacing={5} justifyContent="center" item container>
              <Grid item>
                <Typography variant="h4" align="center">
                  {t("play.with_computer.level_of_difficulty")}
                </Typography>
              </Grid>
              <Grid item>
                <ButtonGroup
                  variant="outlined"
                  aria-label="outlined primary button group"
                >
                  {levels.map((level) => (
                    <Button
                      key={level}
                      variant={
                        difficultyLevel === level ? "contained" : "outlined"
                      }
                      onClick={() => setDifficultyLevel(level)}
                    >
                      {level}
                    </Button>
                  ))}
                </ButtonGroup>
              </Grid>
            </Grid>
            <Grid
              xs={12}
              spacing={5}
              item
              container
              justifyContent="center"
              alignItems="center"
            >
              <Grid item>
                <Typography variant="h4" align="center">
                  {t("play.details.time_control")}
                </Typography>
              </Grid>
              <Grid item>
                <Select
                  labelid="demo-simple-select-label"
                  id="demo-simple-select"
                  variant="outlined"
                  value={timeLimit}
                  label={t("play.details.time_control")}
                  onChange={(event) => setTimeLimit(event.target.value)}
                >
                  <MenuItem value={false}>
                    {" "}
                    {t("play.select.disabled")}{" "}
                  </MenuItem>
                  <MenuItem value={true}>
                    {" "}
                    {t("play.select.by_the_hour")}{" "}
                  </MenuItem>
                </Select>
              </Grid>
            </Grid>
            {timeLimit && (
              <Grid
                xs={12}
                spacing={5}
                item
                container
                justifyContent="center"
                alignItems="center"
              >
                <Grid
                  xs={12}
                  spacing={5}
                  item
                  container
                  justifyContent="center"
                  alignItems="center"
                >
                  <Typography id="non-linear-slider" gutterBottom>
                    {t("play.details.minutes_per_batch")}: {minPerGame}
                  </Typography>
                  <Slider
                    value={minPerGame}
                    min={0.5}
                    step={0.5}
                    max={60}
                    onChange={(event, newValue) => setMinPerGame(newValue)}
                    valueLabelDisplay="auto"
                    aria-label="Default"
                    aria-labelledby="non-linear-slider"
                  />
                </Grid>
                <Grid
                  xs={12}
                  spacing={5}
                  item
                  container
                  justifyContent="center"
                  alignItems="center"
                >
                  <Typography id="non-linear-slider" gutterBottom>
                    {t("play.details.adding_seconds_per_move")}: {secPerStep}
                  </Typography>
                  <Slider
                    value={secPerStep}
                    min={0}
                    step={1}
                    max={120}
                    onChange={(event, newValue) => setSecPerStep(newValue)}
                    valueLabelDisplay="auto"
                    aria-label="Default"
                    aria-labelledby="non-linear-slider"
                  />
                </Grid>
              </Grid>
            )}
            <Grid xs={12} spacing={5} justifyContent="center" item container>
              <Grid item>
                <Typography variant="h4" align="center">
                  {t("play.with_computer.side")}
                </Typography>
              </Grid>
              <Grid item container xs={12} justifyContent="center">
                <ButtonGroup
                  variant="text"
                  aria-label="primary button group"
                  className="align-items-center"
                >
                  <Button
                    variant={side === "black" ? "contained" : "outlined"}
                    onClick={() => setSide("black")}
                    className={classes.sidePickButton}
                  >
                    <Avatar
                      className={classes.sidePickButtonImage}
                      src={`${SERVER_URL}storage/pieces/bK.png`}
                    />
                  </Button>
                  <Button
                    variant={side === "random" ? "contained" : "outlined"}
                    onClick={() => setSide("random")}
                    className={classes.sidePickButtonCenter}
                  >
                    <Avatar
                      className={classes.sidePickButtonImageCenter}
                      src={`${SERVER_URL}storage/pieces/wbK.svg`}
                    />
                  </Button>
                  <Button
                    variant={side === "white" ? "contained" : "outlined"}
                    onClick={() => setSide("white")}
                    className={classes.sidePickButton}
                  >
                    <Avatar
                      className={classes.sidePickButtonImage}
                      src={`${SERVER_URL}storage/pieces/wK.png`}
                    />
                  </Button>
                </ButtonGroup>
              </Grid>
            </Grid>
          </Grid>
        </Box>
        <DialogActions className={classes.dialogFooter} disableSpacing>
          <Grid
            container
            justifyContent="space-between"
            alignItems="center"
            direction="row"
            spacing={2}
          >
            <Grid item>
              <Button
                variant="outlined"
                color="primary"
                startIcon={<ExitToAppIcon />}
                onClick={() => navigate(-1)}
              >
                {t("quit_the_game.quit_the_game")}
              </Button>
            </Grid>
            <Grid item>
              <Button
                endIcon={<PlayCircleFilledIcon />}
                onClick={handleSubmit}
                variant="contained"
                color="primary"
              >
                {t("trainings.play.start_training")}
              </Button>
            </Grid>
          </Grid>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
}
