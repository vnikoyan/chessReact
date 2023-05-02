import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  Box,
  Card,
  CardContent,
  Typography,
  makeStyles,
  Grid,
  Button,
  Icon,
} from "@material-ui/core";

const useStyles = makeStyles(() => ({
  root: {},
  avatar: {
    height: 100,
    width: 100,
  },
  textBlock: {
    minHeight: 100,
  },
}));

const MenuItem = ({ path, description, name, icon }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const classes = useStyles();
  return (
    <Card>
      <CardContent>
        <Grid container spacing={3}>
          <Grid item lg={7} md={7} xs={7}>
            <Box
              className={classes.textBlock}
              mb={4}
              display="flex"
              flexDirection="column"
            >
              <Typography color="textSecondary" gutterBottom variant="h2">
                {name}
              </Typography>
              <Typography color="textPrimary" gutterBottom variant="body1">
                {description}
              </Typography>
            </Box>
            <Button
              color="primary"
              size="medium"
              variant="contained"
              fullWidth={false}
              onClick={() => navigate(path, { state: "fromStudentCabinet" })}
            >
              {t("student.dashboard.open")}
            </Button>
          </Grid>
          <Grid item lg={5} md={5} xs={5}>
            <Icon style={{ fontSize: "7rem", marginTop: "2rem" }}>{icon}</Icon>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

MenuItem.propTypes = {
  className: PropTypes.string,
};

export default MenuItem;
