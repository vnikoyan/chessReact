import React from "react";
import PropTypes from "prop-types";
import { Card, CardContent, Grid, Typography } from "@material-ui/core";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

const ProblemInfo = ({ problem }) => {
  const { t } = useTranslation();
  const { difficulty } = useSelector((state) => state.common);
  const difficultyLevel =
    problem && difficulty.find((i) => +i.value === problem.level).label;

  return (
    <Card className="w-100">
      <CardContent>
        <Grid container spacing={3} alignItems="center" justifyContent="center">
          <Grid item xs={12}>
            <Typography display="inline" variant="h4">
              {t("trainings.play.problem")} #{problem.id}
            </Typography>
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
            <Grid item xs={6}>
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
        </Grid>
      </CardContent>
    </Card>
  );
};

ProblemInfo.propTypes = {
  className: PropTypes.string,
};

export default ProblemInfo;
