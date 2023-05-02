import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import {
  Box,
  Card,
  Table,
  CardHeader,
  Divider,
  TableRow,
  TableCell,
  TableBody,
  makeStyles,
  Chip,
  Icon,
  ListItem,
  Grid,
  List,
  TableContainer,
  TableHead,
  Typography,
} from "@material-ui/core";
import PerfectScrollbar from "react-perfect-scrollbar";
import { useTranslation } from "react-i18next";

import { useSelector } from "react-redux";

const useStyles = makeStyles(() => ({
  root: {},
}));

const LastTrainings = ({ className, ...rest }) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const { lastTrainingsList } = useSelector((state) => state.coach);
  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardHeader title={t("coach.cabinet.last_trainings")} />
      <Divider />
      <Box>
        <Table>
          <TableBody>
            {lastTrainingsList &&
              lastTrainingsList.map((training) => (
                <TableRow key={training.id} hover className={classes.row}>
                  <TableCell>
                    <Grid container spacing={1}>
                      <Grid item>
                        <Typography variant="h3">
                          {t("coach.cabinet.training")} #{training.id}
                        </Typography>
                      </Grid>
                      <Grid item container spacing={2}>
                        <Grid item>
                          <Typography variant="body2">
                            {training.students.length}{" "}
                            {t("coach.cabinet.student")}
                          </Typography>
                        </Grid>
                        <Grid item>
                          {training.problemsCount} {t("coach.cabinet.problems")}
                        </Grid>
                        <Grid item>
                          {training.categories.length}{" "}
                          {t("coach.cabinet.topic")}
                        </Grid>
                      </Grid>
                    </Grid>
                  </TableCell>
                  <TableCell align="right">
                    <Chip
                      icon={<Icon> lightbulb </Icon>}
                      color="primary"
                      label={t("coach.cabinet.in_progress")}
                      variant="outlined"
                    />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </Box>
    </Card>
  );
};

LastTrainings.propTypes = {
  className: PropTypes.string,
};

export default LastTrainings;
