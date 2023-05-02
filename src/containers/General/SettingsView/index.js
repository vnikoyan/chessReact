import React, { useEffect } from "react";
import { Container, makeStyles, Grid } from "@material-ui/core";
import Page from "components/Page";
import Password from "./Items/Password";
import General from "./Items/General";
import Additional from "./Items/Additional";
import Avatar from "./Items/Avatar";
import { useAction } from "utils/hooks";
import { useSelector } from "react-redux";
import { settings } from "modules/settings/actions";
import MyAlert from "components/Alert";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: "100%",
  },
}));

const SettingsView = () => {
  const classes = useStyles();
  return (
    <Page className={classes.root} title="Settings">
      <Container maxWidth="xl">
        {/* <Notifications /> */}
        <Grid alignItems="stretch" container spacing={3}>
          <Grid item lg={6} md={12} xs={12}>
            <General />
          </Grid>
          <Grid item lg={6} md={12} xs={12}>
            <Avatar />
          </Grid>
          <Grid item lg={6} md={12} xs={12}>
            <Additional />
          </Grid>
          <Grid item lg={6} md={12} xs={12}>
            <Password />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default SettingsView;
