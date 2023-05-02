import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/styles";
import { Avatar, Box, Divider, Grid, Checkbox } from "@material-ui/core";
import { useAction } from "utils/hooks";
import { Typography } from "@material-ui/core";
import { grey } from "@material-ui/core/colors";
import { Switch, FormControlLabel } from "@material-ui/core";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import { useNavigate } from "react-router";
import { problems } from "modules/student/actions";
import AccessAlarmsIcon from "@material-ui/icons/AccessAlarms";
import TimerOffIcon from "@material-ui/icons/TimerOff";
import AlarmIcon from "@material-ui/icons/Alarm";
import { SERVER_URL } from "configs";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles((theme) => ({
  dialogFooter: {
    padding: 0,
    marginTop: 30,
    marginBottom: 10,
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
  timerItem: {
    border: "3px solid white",
    borderRadius: "50%",
    justifyContent: "center",
    padding: 15,
    margin: 10,
    cursor: "pointer",
    "&:hover": {
      borderColor: grey[500],
      color: grey[500],
    },
  },
  timerItemActive: {
    border: "3px solid white",
    borderRadius: "50%",
    justifyContent: "center",
    padding: 15,
    margin: 10,
    cursor: "pointer",
    borderColor: theme.palette.primary.main,
    color: theme.palette.primary.main,
  },
  timerIcon: {
    fontSize: 40,
  },
}));

export default function SelectTraining({ setTrainingTimer }) {
  const [open, setOpen] = useState(true);
  const [useSpecific, setuseSpecific] = useState(false);
  const [useCommon, setUseCommon] = useState(false);
  const [useTrainers, setUseTrainers] = useState(false);
  const [useVIP, setUseVIP] = useState(false);
  const [timer, setTimer] = useState(3);
  const { t } = useTranslation();
  const classes = useStyles();
  const navigate = useNavigate();
  const getAcceleratorProblems = useAction(problems.requestAccelerator);

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    if (!useSpecific) {
      getAcceleratorProblems({
        commonProblems: true,
        trainerProblems: true,
        vipBaseProblems: true,
      });
    } else {
      getAcceleratorProblems({
        commonProblems: useCommon,
        trainerProblems: useTrainers,
        vipBaseProblems: useVIP,
      });
    }
    setTrainingTimer(timer);
    handleClose();
  };

  return (
    <>
      <Dialog open={open} aria-labelledby="form-dialog-title">
        <DialogTitle disableTypography id="form-dialog-title">
          <Typography variant="h4" align="center">
            {t("trainings.play.start_training")}
          </Typography>
        </DialogTitle>
        <Divider />
        <DialogContent>
          <Box py={3}>
            <Grid spacing={1} alignItems="center" container direction="column">
              <Grid xs={12} md={8} justifyContent="center" item container>
                <Avatar
                  className={classes.avatar}
                  src={`${SERVER_URL}storage/sprint.png`}
                />
              </Grid>
              <Grid xs={12} md={8} item>
                <Typography variant="h4" align="center">
                  {t("student.accelerator.chess_accelerator")}
                </Typography>
              </Grid>
              <Grid xs={12} md={8} item container>
                <Typography variant="body1" align="left">
                  {t("student.accelerator.description")}
                </Typography>
              </Grid>
              <Grid xs={12} md={8} item align="left" container>
                <Grid item container direction="column">
                  <Box my={2}>
                    <Divider />
                  </Box>
                </Grid>
                <FormControlLabel
                  control={
                    <Switch
                      checked={useSpecific}
                      onChange={() => setuseSpecific(!useSpecific)}
                      color="primary"
                      name="checkedA"
                      inputProps={{ "aria-label": "primary checkbox" }}
                    />
                  }
                  label={t("student.accelerator.use_specific")}
                  style={{ margin: 0 }}
                />
              </Grid>
              {useSpecific && (
                <Grid xs={12} md={8} item align="left" container>
                  <Grid xs={12} md={8} item container direction="column">
                    <FormControlLabel
                      className={classes.categoryItem}
                      control={
                        <Checkbox
                          checked={useCommon}
                          onChange={() => setUseCommon(!useCommon)}
                          color="primary"
                          name="showHints"
                        />
                      }
                      label={t("student.accelerator.use_common")}
                    />
                  </Grid>
                  <Grid xs={12} md={8} item container direction="column">
                    <FormControlLabel
                      className={classes.categoryItem}
                      control={
                        <Checkbox
                          checked={useTrainers}
                          onChange={() => setUseTrainers(!useTrainers)}
                          color="primary"
                          name="showHints"
                        />
                      }
                      label={t("student.accelerator.use_trainers")}
                    />
                  </Grid>
                  <Grid xs={12} md={8} item container direction="column">
                    <FormControlLabel
                      className={classes.categoryItem}
                      control={
                        <Checkbox
                          checked={useVIP}
                          onChange={() => setUseVIP(!useVIP)}
                          color="primary"
                          name="showHints"
                        />
                      }
                      label={t("student.accelerator.use_vip")}
                    />
                  </Grid>
                  <Grid item container direction="column">
                    <Box my={2}>
                      <Divider />
                    </Box>
                  </Grid>
                </Grid>
              )}
              <Grid xs={12} md={8} justifyContent="center" item container>
                <Grid item>
                  <Grid
                    item
                    className={
                      timer === 3 ? classes.timerItemActive : classes.timerItem
                    }
                    onClick={() => setTimer(3)}
                  >
                    <AccessAlarmsIcon className={classes.timerIcon} />
                  </Grid>
                  <Typography variant="h5" align="center">
                    3 {t("student.accelerator.minutes")}
                  </Typography>
                </Grid>
                <Grid item>
                  <Grid
                    item
                    className={
                      timer === 5 ? classes.timerItemActive : classes.timerItem
                    }
                    onClick={() => setTimer(5)}
                  >
                    <AlarmIcon className={classes.timerIcon} />
                  </Grid>
                  <Typography variant="h5" align="center">
                    5 {t("student.accelerator.minutes")}
                  </Typography>
                </Grid>
                <Grid item>
                  <Grid
                    item
                    className={
                      timer === 0 ? classes.timerItemActive : classes.timerItem
                    }
                    onClick={() => setTimer(0)}
                  >
                    <TimerOffIcon className={classes.timerIcon} />
                  </Grid>
                  <Typography variant="h5" align="center">
                    {t("student.accelerator.no_timer")}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Box>
          <DialogActions className={classes.dialogFooter} disableSpacing>
            <Grid
              container
              justifyContent="center"
              alignItems="center"
              direction="column"
              spacing={2}
            >
              <Grid item container xs={12} md={6} justifyContent="center">
                <Button
                  endIcon={<PlayCircleFilledIcon />}
                  onClick={handleSubmit}
                  variant="contained"
                  color="primary"
                >
                  {t("trainings.play.start_training")}
                </Button>
              </Grid>
              <Grid item container xs={12} md={6} justifyContent="center">
                <Button
                  onClick={() => navigate(`/student/dashboard`)}
                  startIcon={<KeyboardBackspaceIcon />}
                  variant="outlined"
                  color="primary"
                >
                  {t("trainings.play.back_to_cabinet")}
                </Button>
              </Grid>
            </Grid>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </>
  );
}
