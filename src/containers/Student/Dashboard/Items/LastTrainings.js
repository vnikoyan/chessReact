import React, { useEffect } from "react";
import PropTypes from "prop-types";
import {
  Chip,
  Icon,
  Box,
  Card,
  Table,
  CardHeader,
  Divider,
  TableRow,
  TableCell,
  TableBody,
  Grid,
  Typography,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import PerfectScrollbar from "react-perfect-scrollbar";
import { trainings } from "modules/student/actions";
import { useAction } from "utils/hooks";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

const LastTrainings = ({ className, ...rest }) => {
  const { t } = useTranslation();
  const { trainingsList } = useSelector((state) => state.student);
  const getTrainings = useAction(trainings.request);
  const lastTrainingList =
    trainingsList.length > 5
      ? trainingsList.slice(Math.max(trainingsList.length - 5, 1))
      : trainingsList;

  useEffect(() => {
    getTrainings({ page: 1 });
  }, [0]);

  return (
    <Card {...rest}>
      <CardHeader title={t("student.dashboard.last_trainings")} />
      <Divider />
      <PerfectScrollbar>
        <Box>
          {!Boolean(lastTrainingList.length) ? (
            <Alert severity="warning">
              {t("student.dashboard.no_trainings")}
            </Alert>
          ) : (
            <Table>
              <TableBody>
                {lastTrainingList.map((training) => (
                  <TableRow hover key={training.id}>
                    <TableCell>
                      <Grid container spacing={1}>
                        <Grid item>
                          <Typography variant="h3">{training.name}</Typography>
                        </Grid>
                        <Grid item container spacing={2}>
                          <Grid item>
                            {training.problemsCount}{" "}
                            {t("student.dashboard.problems")}
                          </Grid>
                          <Grid item>
                            {training.categories.length}{" "}
                            {t("student.dashboard.topic")}
                          </Grid>
                        </Grid>
                      </Grid>
                    </TableCell>
                    <TableCell align="right">
                      <Chip
                        icon={<Icon> lightbulb </Icon>}
                        color="primary"
                        label={t("student.dashboard.in_progress")}
                        variant="outlined"
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </Box>
      </PerfectScrollbar>
    </Card>
  );
};

LastTrainings.propTypes = {
  className: PropTypes.string,
};

export default LastTrainings;
