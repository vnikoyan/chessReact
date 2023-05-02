import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  Avatar,
  Box,
  Grid,
  Card,
  CardHeader,
  CardContent,
  Divider,
  Typography,
  makeStyles,
  CardActions,
  Button,
} from "@material-ui/core";
import Tooltip from "@material-ui/core/Tooltip";

const useStyles = makeStyles(() => ({
  root: {},
  award: {
    height: 100,
    width: 100,
  },
  awardImage: {
    height: 90,
  },
}));

const Awards = ({ user }) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const navigate = useNavigate();

  // console.log('user', user)
  return (
    <Card className={clsx(classes.root)}>
      <CardHeader title={t("profile.awards")} />
      <Divider />
      <CardContent>
        <Grid p={2} container justifyContent="center" spacing={3}>
          {user.awards.length > 0 ? (
            user.awards.map((award, index) => (
              <Grid key={index} item lg={6}>
                <Box alignItems="center" display="flex" flexDirection="column">
                  <Tooltip placement="top" arrow title={award.title}>
                    <Avatar
                      imgProps={{ className: classes.awardImage }}
                      className={classes.award}
                      variant="rounded"
                      src={`https://chess.nar.am/storage/awards/${award.award}`}
                    />
                  </Tooltip>
                  <Typography
                    align="center"
                    color="textPrimary"
                    gutterBottom
                    variant="h5"
                  >
                    {award.name}
                  </Typography>
                </Box>
              </Grid>
            ))
          ) : (
            <Grid item lg={6}>
              {t("profile.not_awards")}
            </Grid>
          )}
        </Grid>
      </CardContent>
      <Divider />
      <CardActions>
        <Button
          onClick={() => navigate(`/awards`)}
          color="primary"
          fullWidth
          variant="text"
        >
          {t("profile.all_awards")}
        </Button>
      </CardActions>
    </Card>
  );
};

Awards.propTypes = {
  className: PropTypes.string,
};

export default Awards;
