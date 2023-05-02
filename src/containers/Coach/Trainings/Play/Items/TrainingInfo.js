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
import InfoBlock from "components/Play/InfoBlock";

const useStyles = makeStyles((theme) => ({
  root: {},
  icon: {
    cursor: "pointer",
    "&:hover": {
      color: theme.palette.primary.main,
    },
  },
  row: {
    cursor: "pointer",
  },
}));

const TrainingInfo = ({ startTraining, locationType }) => {
  const navigate = useNavigate();
  const classes = useStyles();
  const { currentTraining } = useSelector((state) => state.coach);
  const { t } = useTranslation();

  return (
    <Card>
      <CardContent className={classes.content}>
        <Grid container spacing={3} alignItems="center" justifyContent="center">
          <Grid item xs={12}>
            <Typography variant="h1" align="center">
              {t("trainings.play.training")} #{currentTraining.id}
            </Typography>
            <Typography variant="body1" align="center">
              {t("trainings.play.in_progress")}
            </Typography>
          </Grid>
          <InfoBlock
            title={t("trainings.play.title")}
            content={currentTraining.name}
          />
          <InfoBlock
            title={t("trainings.play.coach")}
            content={currentTraining.coach.name}
          />
          <InfoBlock
            title={t("trainings.play.problems_topics")}
            content={currentTraining.categories.map(
              (category, index) =>
                `${category.name} (${category.tasks})${
                  index !== currentTraining.categories.length - 1 ? ", " : ""
                }`
            )}
          />
          <InfoBlock
            title={t("trainings.play.solved")}
            content={`
              ${
                currentTraining.problems.filter((problem) => problem.solved)
                  .length || 0
              } / ${currentTraining.problems.length}
            `}
          />
          <Grid item container justifyContent="center" xs={12}>
            <Grid item xs={4}>
              <Button
                onClick={startTraining}
                fullWidth
                color="primary"
                variant="contained"
              >
                {t("trainings.play.start_training")}
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

TrainingInfo.propTypes = {
  className: PropTypes.string,
};

export default TrainingInfo;
