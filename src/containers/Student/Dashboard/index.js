import React from "react";
import { Container, Grid } from "@material-ui/core";
import Page from "components/Page";
import LastTrainings from "./Items/LastTrainings";
import MenuItem from "./Items/MenuItem";
import MyActivity from "./Items/MyActivity";
import { useTranslation } from "react-i18next";

const StudentDashboard = () => {
  const { t } = useTranslation();
  return (
    <Page title={t("student.dashboard.students_dashboard")}>
      <Container maxWidth="xl">
        <Grid container spacing={3}>
          <Grid item container spacing={3}>
            <Grid item lg={6} md={12} xs={12}>
              <MenuItem
                icon="quiz"
                path="/student/trainings"
                description={t("student.dashboard.trainings_description")}
                name={t("student.dashboard.trainings")}
              />
            </Grid>
            <Grid item lg={6} md={12} xs={12}>
              <MenuItem
                icon="model_training"
                path="/student/self"
                description={t("student.dashboard.self_description")}
                name={t("student.dashboard.self")}
              />
            </Grid>
            <Grid item lg={6} md={12} xs={12}>
              <MenuItem
                icon="view_in_ar"
                path="/student/accelerator"
                description={t("student.dashboard.accelerator_description")}
                name={t("student.dashboard.accelerator")}
              />
            </Grid>
            <Grid item lg={6} md={12} xs={12}>
              <MenuItem
                icon="extension"
                path="/student/problems"
                description={t("student.dashboard.public_description")}
                name={t("student.dashboard.public")}
              />
            </Grid>
          </Grid>
          <Grid item container spacing={3}>
            <Grid item lg={6} md={12} xs={12}>
              <LastTrainings />
            </Grid>
            <Grid item lg={6} md={12} xs={12}>
              <MyActivity />
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default StudentDashboard;
