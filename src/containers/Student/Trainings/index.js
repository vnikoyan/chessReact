import React from "react";
import { Container, Grid } from "@material-ui/core";
import Page from "components/Page";
import TrainingsList from "./Items/TrainingsList";
import { useTranslation } from "react-i18next";

const StudentTrainings = () => {
  const { t } = useTranslation();
  return (
    <Page title={t("student.trainings.trainings")}>
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

export default StudentTrainings;
