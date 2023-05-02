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
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { awards } from "modules/user/actions";
import { useAction } from "utils/hooks";
import Tooltip from "@material-ui/core/Tooltip";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100%",
  },
  award: {
    height: 100,
    width: 100,
  },
  awardImage: {
    height: 90,
  },
  awardsSection: {
    width: "100%",
    height: "100%",
  },
  earned: {
    fontSize: 62,
  },
}));

const AwardsView = () => {
  const { t } = useTranslation();
  const classes = useStyles();
  const { username } = useParams();
  const { name, allAwards } = useSelector((state) => state.user);
  const getAwards = useAction(awards.request);

  useEffect(() => {
    if (Boolean(username)) {
      getAwards(username);
    }
  }, [getAwards, username]);

  const getAllAwards = () => {
    let awardsCount = 0;
    allAwards.map((awardsGroup) =>
      awardsGroup.awards.map((award) => awardsCount++)
    );
    return awardsCount;
  };
  const getActiveAwards = () => {
    let activeAwardsCount = 0;
    allAwards.map((awardsGroup) =>
      awardsGroup.awards.map((award) =>
        award.active ? activeAwardsCount++ : ""
      )
    );
    return activeAwardsCount;
  };
  useEffect(() => {}, []);
  return (
    <>
      <Page className={classes.root} title="Awards">
        <Container maxWidth="xl">
          <Grid component={Card} container className={classes.awardsSection}>
            <Grid item lg={12}>
              <CardContent className={classes.content}>
                <Typography variant="h3" gutterBottom>
                  {t("awards.achievements")} {name}
                </Typography>
                <Divider mb={2} />
                <Grid container spacing={2}>
                  <Grid item lg={12}>
                    <Typography
                      color="primary"
                      display="inline"
                      className={classes.earned}
                    >
                      {getActiveAwards()}
                    </Typography>
                    <Typography display="inline" className={classes.earned}>
                      /{getAllAwards()}
                    </Typography>{" "}
                    <Typography display="inline" variant="h5">
                      {t("awards.achievements_earned")}
                    </Typography>
                  </Grid>
                  <Grid item lg={12}>
                    <Typography variant="body1" gutterBottom>
                      {t("awards.description")}
                    </Typography>
                  </Grid>
                </Grid>
                <Divider mb={2} />
                <br />
                <Grid container spacing={5}>
                  {allAwards.map((awardsGroup) => (
                    <Grid container key={awardsGroup.id} item lg={12}>
                      <Grid item lg={12} md={12} xs={12}>
                        <Typography variant="h3" gutterBottom>
                          {awardsGroup.name}
                        </Typography>
                      </Grid>
                      {awardsGroup.awards.map((award, awardIndex) => (
                        <Grid
                          key={awardIndex}
                          justifyContent="center"
                          container
                          item
                          xl={1}
                          lg={2}
                          md={2}
                          sm={3}
                          xs={4}
                        >
                          <Grid item xs={12} justifyContent="center" container>
                            <Tooltip placement="top" arrow title={award.title}>
                              <Avatar
                                style={
                                  !award.active
                                    ? { filter: "grayscale(100%)" }
                                    : {}
                                }
                                imgProps={{ className: classes.awardImage }}
                                className={classes.award}
                                src={`https://chess.nar.am/storage/awards/${award.award}`}
                              />
                            </Tooltip>
                          </Grid>
                          <Grid item xs={12}>
                            <Typography
                              color="textPrimary"
                              gutterBottom
                              variant="h5"
                              align="center"
                            >
                              {award.name}
                            </Typography>
                          </Grid>
                        </Grid>
                      ))}
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

export default AwardsView;
