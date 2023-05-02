import React from "react";
import PropTypes from "prop-types";
import { Box, Card, CardContent, Grid, Typography } from "@material-ui/core";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

const ProblemInfo = ({ problem, problemIndex }) => {
  const { t } = useTranslation();
  const { difficulty } = useSelector((state) => state.common);
  const { currentTraining } = useSelector((state) => state.coach);
  const difficultyLevel =
    problem && difficulty.find((i) => +i.value === problem.level)
      ? difficulty.find((i) => +i.value === problem.level).label
      : difficulty[1].label;

  return (
    <Card className="w-100">
      <CardContent>
        <Grid container spacing={3} alignItems="center" justifyContent="center">
          <Grid item xs={12}>
            <Typography display="inline" variant="h4">
              {t("trainings.play.training")} #{currentTraining.id}.{" "}
              {t("trainings.play.problem")} #{problem.id}
            </Typography>
            <Box component={"span"} ml={2}>
              <Typography display="inline" variant="h6">
                ({problemIndex + 1} of {currentTraining.problems.length})
              </Typography>
            </Box>
          </Grid>
          <Grid container item xs={12}>
            <Grid item xs={6}>
              <Typography variant="body1">
                {t("trainings.play.complexity_of_task")}: {difficultyLevel}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1">
                {t("trainings.play.price_of_victory")}: {problem.price_complete}{" "}
                {problem.priceComplete}
              </Typography>
            </Grid>
            <Grid item xs={6}></Grid>
            <Typography variant="body1">
              {t("trainings.play.moves")}: {problem.moveCount}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1">
              {t("trainings.play.mistake_cost")}: {problem.price_mistake}{" "}
              {problem.priceMistake}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

ProblemInfo.propTypes = {
  className: PropTypes.string,
};

export default ProblemInfo;
