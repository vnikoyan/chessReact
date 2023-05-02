import React from "react";
import { Box, Container } from "@material-ui/core";
import Page from "components/Page";
import Results from "./Items/Results";
import Toolbar from "./Items/Toolbar";
import { useTranslation } from "react-i18next";

const Students = () => {
  const { t } = useTranslation();
  return (
    <Page title={t("coach.students.my_students")}>
      <Container maxWidth={false}>
        <Toolbar />
        <Box mt={3}>
          <Results />
        </Box>
      </Container>
    </Page>
  );
};

export default Students;
