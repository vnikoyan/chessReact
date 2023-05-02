import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/styles";
import { Avatar, Box, Divider, Grid } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import { useNavigate } from "react-router";
import InfoBlock from "components/Play/InfoBlock";
import RepeatIcon from "@material-ui/icons/Repeat";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles(() => ({
  dialogFooter: {
    padding: 0,
    marginTop: 30,
    marginBottom: 10,
    justifyContent: "center",
  },
  avatar: {
    width: 150,
    height: 150,
  },
  icon: {
    fontSize: 158,
  },
  categoryItem: {
    marginBottom: -5,
    marginLeft: 0,
  },
}));

export default function SelectTraining({
  trainingTime,
  solvedProblemsCount,
  problemsCount,
  restartTraining,
  fromLanding,
}) {
  const classes = useStyles();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const millisToMinutesAndSeconds = (millis) => {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  };

  return (
    <>
      <Dialog open aria-labelledby="form-dialog-title">
        <DialogTitle disableTypography id="form-dialog-title">
          <Typography variant="h4" align="center">
            {t("trainings.done.training_over")}!
          </Typography>
          <Typography variant="h5" align="center">
            —
            {solvedProblemsCount === problemsCount
              ? t("trainings.done.all_solved")
              : solvedProblemsCount === 0
              ? t("trainings.done.no_solved")
              : t("trainings.done.some_solved")}{" "}
            —
          </Typography>
        </DialogTitle>
        <Divider />
        <DialogContent>
          <Box py={3}>
            <Grid spacing={1} alignItems="center" container direction="column">
              <Grid xs={12} justifyContent="center" item container>
                <Box mb={3}>
                  {solvedProblemsCount === problemsCount ? (
                    <Avatar
                      variant="rounded"
                      className={classes.avatar}
                      src="https://chess.nar.am/storage/cup_w_star.svg"
                    />
                  ) : solvedProblemsCount === 0 ? (
                    <CancelIcon className={classes.icon} />
                  ) : (
                    <CheckCircleIcon className={classes.icon} />
                  )}
                </Box>
              </Grid>
              <Grid xs={12} spacing={2} item container>
                <InfoBlock
                  title={t("trainings.done.solved")}
                  content={`${solvedProblemsCount} / ${problemsCount}`}
                />
                <InfoBlock
                  title={t("trainings.done.elapsed_time")}
                  content={millisToMinutesAndSeconds(trainingTime)}
                />
                <InfoBlock
                  title={t("trainings.done.average_per_task")}
                  content={millisToMinutesAndSeconds(
                    solvedProblemsCount ? trainingTime / solvedProblemsCount : 0
                  )}
                />
              </Grid>
            </Grid>
          </Box>
          <DialogActions className={classes.dialogFooter} disableSpacing>
            <Grid
              container
              justifyContent="center"
              alignItems="center"
              spacing={2}
            >
              <Grid item container xs={8}>
                {!fromLanding && (
                  <Grid item container xs={6}>
                    <Button
                      startIcon={<RepeatIcon />}
                      onClick={restartTraining}
                      variant="contained"
                      color="primary"
                    >
                      {t("trainings.done.repeat")}
                    </Button>
                  </Grid>
                )}
              </Grid>
              <Grid item container xs={8}>
                {fromLanding ? (
                  <Button
                    onClick={() => navigate(`/register`)}
                    variant="contained"
                    color="primary"
                  >
                    {t("trainings.done.register_and_solve")}
                  </Button>
                ) : (
                  <Button
                    onClick={() => navigate(`/student/dashboard`)}
                    startIcon={<KeyboardBackspaceIcon />}
                    variant="outlined"
                    color="primary"
                  >
                    {t("trainings.play.back_to_cabinet")}
                  </Button>
                )}
              </Grid>
            </Grid>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </>
  );
}
