import React from "react";
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
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import ReplayIcon from "@material-ui/icons/Replay";

const useStyles = makeStyles((theme) => ({
  root: {},
  icon: {
    fontSize: 128,
  },
  row: {
    cursor: "pointer",
  },
}));

const DoneTrainingInfo = ({ locationType, restartTraining }) => {
  const navigate = useNavigate();
  const classes = useStyles();
  const { currentTraining } = useSelector((state) => state.coach);
  const { t } = useTranslation();

  return (
    <Card>
      <CardContent className={classes.content}>
        <Grid container spacing={5} alignItems="center" justifyContent="center">
          <Grid item>
            <CheckCircleIcon className={classes.icon} />
          </Grid>
          <Grid item xs={12}>
            <Box my={2}>
              <Typography variant="h1" align="center">
                {t("trainings.play.training_completed")}
              </Typography>
            </Box>
            <Typography variant="body1" align="center">
              {t("trainings.play.training_completed_description")}
            </Typography>
          </Grid>
          <Grid item container justifyContent="center" xs={12}>
            <Grid item>
              <Button
                onClick={restartTraining}
                startIcon={<ReplayIcon />}
                color="primary"
                variant="contained"
              >
                {t("trainings.play.restart")}
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
      <Divider />
      <Box display="flex" justifyContent="flex-end" p={2}>
        <Grid container justifyContent="space-between" spacing={2}>
          <Grid item>
            <Button
              color="secondary"
              size="medium"
              variant="outlined"
              fullWidth={false}
              onClick={() => navigate(`/${locationType}/trainings/`)}
              startIcon={<ArrowBackIosIcon fontSize="small" />}
            >
              {t("trainings.play.back_to_cabinet")}
            </Button>
          </Grid>
          <Grid item>
            <Button
              color="secondary"
              size="medium"
              variant="outlined"
              fullWidth={false}
              onClick={() =>
                navigate(
                  `/${locationType}/trainings/problems/${currentTraining.id}`
                )
              }
              endIcon={<FormatListBulletedIcon fontSize="small" />}
            >
              {t("trainings.play.view_problems")}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Card>
  );
};

DoneTrainingInfo.propTypes = {
  className: PropTypes.string,
};

export default DoneTrainingInfo;
