import React, { useEffect } from "react";
import {
  Container,
  Grid,
  makeStyles,
  CardContent,
  Card,
} from "@material-ui/core";
import Page from "components/Page";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { view } from "modules/pages/actions";
import { useAction } from "utils/hooks";
import parse from "html-react-parser";
import Loading from "components/Loading";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100%",
    width: "100vw",
  },
  avatar: {
    width: 100,
    height: 100,
  },
  pageSection: {
    width: "100%",
    height: "100%",
  },
  earned: {
    fontSize: 62,
  },
  content: {
    width: "100%",
    color: "white !important",
    "&  h1, p, b, i, u": {
      // filter: 'invert(1)',
    },
  },
}));

const StaticPage = () => {
  const classes = useStyles();
  const { path } = useParams();
  const getPageView = useAction(view.request);
  const { pageView } = useSelector((state) => state.pages);
  useEffect(() => {
    getPageView(`/${path}`);
    // getPageView(path);
  }, [getPageView, path]);
  return (
    <>
      {Boolean(pageView.content) ? (
        <Page className={classes.root} title={pageView.name}>
          <Container maxWidth="xl">
            <Grid component={Card} container className={classes.pageSection}>
              <CardContent className={classes.content}>
                {parse(pageView.content)}
              </CardContent>
            </Grid>
          </Container>
        </Page>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default StaticPage;
