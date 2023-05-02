import React, { useEffect } from "react";
import {
  Container,
  Card,
  CardHeader,
  Divider,
  CardContent,
  Grid,
  Typography,
} from "@material-ui/core";
import Page from "components/Page";
import AddGroup from "./Items/AddGroup";
import CategoriesList from "./GroupsList";
import { useAction } from "utils/hooks";
import { groups } from "modules/coach/actions";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import Loading from "components/Loading";

const CoachStudentGroups = () => {
  const { t } = useTranslation();
  const { groupsLoading } = useSelector((state) => state.coach);
  const getGroups = useAction(groups.request);

  useEffect(() => {
    getGroups();
  }, [getGroups]);

  return (
    <>
      <Page title={t("coach.students.student_groups")}>
        <Container maxWidth="xl">
          <Grid container spacing={3}>
            <Grid item container spacing={3}>
              <Grid item lg={12} md={12} xs={12}>
                <Card>
                  <CardHeader
                    title="Student Groups"
                    subheaderTypographyProps={{ style: { fontSize: 14 } }}
                  />
                  <Divider />
                  <CardContent>
                    <Grid container spacing={3}>
                      <Grid xs={12} item container>
                        <Grid item md={6}>
                          {/* <Typography
                            color="textPrimary"
                            gutterBottom
                            variant="body2"
                          >
                            {t(
                              "coach.problems.categories.categories_description"
                            )}
                          </Typography> */}
                        </Grid>
                        <Grid
                          item
                          md={6}
                          spacing={2}
                          container
                          justifyContent="flex-end"
                        >
                          <Grid item>
                            <AddGroup />
                          </Grid>
                          <Divider />
                        </Grid>
                      </Grid>
                      <Grid item lg={12} md={12} xs={12}>
                        {!groupsLoading ? <CategoriesList /> : <Loading />}
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Page>
    </>
  );
};

export default CoachStudentGroups;
