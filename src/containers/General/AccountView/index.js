import React, { useEffect } from "react";
import { Container, Grid } from "@material-ui/core";
import Page from "components/Page";
import Profile from "./Items/Profile";
import ProfileDetails from "./Items/ProfileDetails";
import StatItem from "./Items/StatItem";
import Awards from "./Items/Awards";
import RatingChart from "./Items/RatingChart";
import { useSelector } from "react-redux";
import { profile } from "modules/user/actions";
import { profile as myProfile } from "modules/me/actions";
import { useAction } from "utils/hooks";
import MyAlert from "components/Alert";
import parse from "html-react-parser";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Loading from "components/Loading";

const Account = () => {
  const { t } = useTranslation();
  const { username } = useParams();
  const isProfile = Boolean(username);
  const user = useSelector(
    isProfile ? (state) => state.user : (state) => state.me
  );
  const getProfile = useAction(profile.request);
  useEffect(() => {
    if (isProfile) {
      getProfile(username);
    }
  }, [getProfile, isProfile, username]);

  return (
    <>
      {user.isLoaded ? (
        <Page title="My Profile">
          <Container maxWidth="xl">
            <Grid container spacing={3}>
              <Grid item lg={3} md={12} xs={12}>
                <Profile isProfile={isProfile} user={user} />
              </Grid>
              <Grid item lg={6} md={12} xs={12}>
                <Grid container spacing={3}>
                  <Grid item lg={12} md={12} xs={12}>
                    <ProfileDetails user={user} />
                  </Grid>
                  <Grid item lg={6} md={6} xs={12}>
                    <StatItem
                      stat={user.solvedTask}
                      statname={t("profile.solved_task")}
                    />
                  </Grid>
                  <Grid item lg={6} md={6} xs={12}>
                    <StatItem
                      stat={user.solvedTaskOnce}
                      statname={t("profile.solved_without_mistake")}
                    />
                  </Grid>
                  <Grid item lg={6} md={6} xs={12}>
                    <StatItem
                      stat={user.solvedTaskMistake}
                      statname={t("profile.solved_with_mistake")}
                    />
                  </Grid>
                  <Grid item lg={6} md={6} xs={12}>
                    <StatItem
                      stat={user.rating}
                      statname={t("profile.rating")}
                    />
                  </Grid>
                  <Grid item lg={12} md={12} xs={12}>
                    <RatingChart user={user} />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item lg={3} md={12} xs={12}>
                <Awards user={user} />
              </Grid>
            </Grid>
          </Container>
        </Page>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default Account;
