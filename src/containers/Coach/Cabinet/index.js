import React, { useEffect } from "react";
import { Container, Grid } from "@material-ui/core";
import Page from "components/Page";
import LastTrainings from "./Items/LastTrainings";
import MenuItem from "./Items/MenuItem";
import StudentActivity from "./Items/StudentActivity";
import { SERVER_URL } from "configs";
import { useAction } from "utils/hooks";
import { student, trainings } from "modules/coach/actions";
import Loading from "components/Loading";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

const CoachCabinet = () => {
  const { t } = useTranslation();
  const getStudentsActivity = useAction(student.getActivity);
  const getLastTrainings = useAction(trainings.lastRequest);
  const { loading } = useSelector((state) => state.coach);

  useEffect(() => {
    getStudentsActivity();
    getLastTrainings();
  }, []);

  return !loading ? (
    <Page title={t("coach.cabinet.coach_cabinet")}>
      <Container maxWidth="xl">
        <Grid container spacing={3}>
          <Grid item container spacing={3}>
            <Grid item lg={4} md={12} xs={12}>
              <MenuItem
                imageURL={`${SERVER_URL}storage/bg-train.png`}
                path="/coach/trainings"
                title={t("coach.cabinet.trainings_description")}
                name={t("coach.cabinet.trainings")}
              />
            </Grid>
            <Grid item lg={4} md={12} xs={12}>
              <MenuItem
                imageURL={`${SERVER_URL}storage/bg-tasks.png`}
                path="/coach/problems"
                title={t("coach.cabinet.problems_description")}
                name={t("coach.cabinet.problems")}
              />
            </Grid>
            <Grid item lg={4} md={12} xs={12}>
              <MenuItem
                imageURL={`${SERVER_URL}storage/bg-users.png`}
                path="/coach/students"
                title={t("coach.cabinet.students_description")}
                name={t("coach.cabinet.students")}
              />
            </Grid>
          </Grid>
          <Grid item container spacing={3}>
            <Grid item lg={6} md={12} xs={12}>
              <LastTrainings />
            </Grid>
            <Grid item lg={6} md={12} xs={12}>
              <StudentActivity />
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Page>
  ) : (
    <Loading />
  );
};

export default CoachCabinet;
