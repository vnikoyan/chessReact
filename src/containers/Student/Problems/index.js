import React from "react";
import { Container, Grid } from "@material-ui/core";
import Page from "components/Page";
import ProblemsList from "./Items/ProblemsList";
import ProblemsFilter from "./Items/ProblemsFilter";
import { useTranslation } from "react-i18next";

const PublicProblems = () => {
  const { t } = useTranslation();
  return (
    <Page title={t("student.problems.public_problems")}>
      <Container maxWidth="xl">
        <Grid container spacing={3}>
          <Grid item container spacing={3}>
            <Grid item lg={8} md={12} xs={12}>
              <ProblemsList />
            </Grid>
            <Grid item lg={4} md={12} xs={12}>
              <ProblemsFilter />
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default PublicProblems;
