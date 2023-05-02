import React from "react";
import { Container, Grid } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import Page from "components/Page";
import TrainingsList from "./Items/TrainingsList";

const CoachProblems = () => {
  const { t } = useTranslation();
  return (
    <Page title={t("coach.trainings.trainings")}>
      <Container maxWidth="xl">
        <Grid container spacing={3}>
          <Grid item container spacing={3}>
            <Grid item lg={12} md={12} xs={12}>
              <TrainingsList />
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default CoachProblems;
