import React, { useEffect } from "react";
import moment from "moment";
import {
  Card,
  CardContent,
  CardHeader,
  Grid,
  Container,
  Typography,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Table,
} from "@material-ui/core";
import { useAction } from "utils/hooks";
import { useSelector } from "react-redux";
import { trainings } from "modules/coach/actions";
import Page from "components/Page";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import Loading from "components/Loading";

const TrainingProblems = () => {
  const getTraining = useAction(trainings.get);
  const { t } = useTranslation();
  const { id } = useParams();
  const { currentTraining, isLoaded } = useSelector((state) => state.coach);
  const { difficulty } = useSelector((state) => state.common);

  useEffect(() => {
    if (!Boolean(currentTraining.length)) {
      getTraining(id);
    }
  }, []);

  return isLoaded ? (
    <Page title={t("trainings.problems.training_problems")}>
      <Container maxWidth="xl">
        <Grid item container spacing={3}>
          <Grid item container spacing={3}>
            <Grid item lg={12} md={12} xs={12}>
              <Card>
                <CardHeader
                  title={`${t("trainings.problems.total_problems")} ${
                    currentTraining.problems.length
                  }`}
                  subheaderTypographyProps={{ style: { fontSize: 14 } }}
                />
                <CardContent>
                  <Grid
                    container
                    spacing={3}
                    alignItems="left"
                    justifyContent="left"
                  >
                    <Grid xs={12} item container justifyContent="start">
                      <Grid item md={7}>
                        <Typography
                          color="textPrimary"
                          gutterBottom
                          variant="body2"
                        >
                          {t("trainings.problems.description")}
                        </Typography>
                      </Grid>
                    </Grid>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>{t("trainings.problems.task")}</TableCell>
                          <TableCell>
                            {t("trainings.problems.date_and_time")}
                          </TableCell>
                          <TableCell>{t("trainings.problems.level")}</TableCell>
                          <TableCell>{t("trainings.problems.moves")}</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {currentTraining.problems.map((problem) => (
                          <TableRow hover>
                            <TableCell>Task №{problem.id}</TableCell>
                            <TableCell>
                              {moment(problem.createdAt).format(
                                "MM-DD-YYYY hh:mm"
                              )}
                            </TableCell>
                            <TableCell>
                              {problem.level &&
                                difficulty.find(
                                  (i) => +i.value === problem.level
                                ).label}
                            </TableCell>
                            <TableCell>{problem.moveCount}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Page>
  ) : (
    <Loading />
  );
};

export default TrainingProblems;
