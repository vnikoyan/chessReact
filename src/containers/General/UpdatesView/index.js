import React, { useEffect } from "react";
import {
  Container,
  Grid,
  makeStyles,
  CardContent,
  Card,
  Typography,
  Divider,
  Box,
  Avatar,
} from "@material-ui/core";
import Page from "components/Page";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { awards } from "modules/user/actions";
import { useAction } from "utils/hooks";
import moment from "moment";
import parse from "html-react-parser";
import { getAlerts } from "modules/common/actions";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100%",
  },
  avatar: {
    width: 100,
    height: 100,
  },
  awardsSection: {
    width: "100%",
    height: "100%",
  },
  earned: {
    fontSize: 62,
  },
}));

const UpdatesView = () => {
  const { t } = useTranslation();
  const classes = useStyles();
  const { username } = useParams();
  const { name, allAwards } = useSelector((state) => state.user);
  const getAwards = useAction(awards.request);
  const { alerts } = useSelector((state) => state.common);
  const getAlertsList = useAction(getAlerts.request);

  useEffect(() => {
    getAlertsList();
  }, []);

  return (
    <>
      <Page className={classes.root} title="Updates">
        <Container maxWidth="xl">
          <Grid component={Card} container className={classes.awardsSection}>
            <Grid item xs={12}>
              <CardContent className={classes.content}>
                <Typography variant="h3" gutterBottom>
                  {t("updates.system_updates")}
                </Typography>
                <Divider mb={2} />
                <Grid container spacing={2}>
                  {alerts.map((alert) => (
                    <Grid key={alert.id} item xs={12}>
                      <Box p={2} pl={0}>
                        <Typography variant="h1" gutterBottom>
                          {moment(alert.createdAt).format("YYYY")}
                        </Typography>
                        <Typography variant="h4" gutterBottom>
                          {moment(alert.createdAt).format("MMMM D HH:mm")}
                        </Typography>
                      </Box>
                      <Box margin="normal">{parse(alert.message)}</Box>
                      <Divider />
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Grid>
          </Grid>
        </Container>
      </Page>
    </>
  );
};

export default UpdatesView;
