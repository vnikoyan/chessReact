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
import AddCategories from "./Items/AddCategories";
import CategoriesList from "./CategoriesList";
import { useAction } from "utils/hooks";
import { categories } from "modules/coach/actions";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import Loading from "components/Loading";
import ImportCategories from "./Items/ImportCategories";
import ExportCategories from "./Items/ExportCategories";

const CoachProblemCategories = () => {
  const { t } = useTranslation();
  const { categoriesLoading } = useSelector((state) => state.coach);
  const getCategories = useAction(categories.request);

  useEffect(() => {
    getCategories();
  }, [getCategories]);

  return (
    <>
      <Page title={t("coach.problems.categories.problems_categories")}>
        <Container maxWidth="xl">
          <Grid container spacing={3}>
            <Grid item container spacing={3}>
              <Grid item lg={12} md={12} xs={12}>
                <Card>
                  <CardHeader
                    title={t("coach.problems.categories.categories")}
                    subheaderTypographyProps={{ style: { fontSize: 14 } }}
                  />
                  <Divider />
                  <CardContent>
                    <Grid container spacing={3}>
                      <Grid xs={12} item container>
                        <Grid item md={6}>
                          <Typography
                            color="textPrimary"
                            gutterBottom
                            variant="body2"
                          >
                            {t(
                              "coach.problems.categories.categories_description"
                            )}
                          </Typography>
                        </Grid>
                        <Grid
                          item
                          md={6}
                          spacing={2}
                          container
                          justifyContent="flex-end"
                        >
                          <Grid item>
                            <ImportCategories />
                          </Grid>
                          <Grid item>
                            <ExportCategories />
                          </Grid>
                          <Grid item>
                            <AddCategories />
                          </Grid>
                          <Divider />
                        </Grid>
                      </Grid>
                      <Grid item lg={12} md={12} xs={12}>
                        {!categoriesLoading ? <CategoriesList /> : <Loading />}
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

export default CoachProblemCategories;
