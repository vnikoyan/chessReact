import React from "react";
import { makeStyles, CircularProgress } from "@material-ui/core";
import Page from "components/Page";

const useStyles = makeStyles((theme) => ({
  page: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
  },
}));

const Loading = () => {
  const classes = useStyles();
  return (
    <Page className={classes.page}>
      <CircularProgress />
    </Page>
  );
};

export default Loading;
