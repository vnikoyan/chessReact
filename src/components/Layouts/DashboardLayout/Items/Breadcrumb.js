import React from "react";
import {
  Breadcrumbs,
  Box,
  Typography,
  makeStyles,
  Grid,
} from "@material-ui/core";
import Link from "@material-ui/core/Link";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import RouteIcon from "./RouteIcon";
import Icon from "@material-ui/core/Icon";

const useStyles = makeStyles((theme) => ({
  mobileDrawer: {
    width: 256,
  },
  desktopDrawer: {
    width: 256,
    top: 64,
    height: "calc(100% - 64px)",
  },
  breadcrumbsItem: {
    "&:hover": {
      color: theme.palette.primary.main,
      textDecoration: "none",
    },
  },
}));

export default function AppBreadcrumbs() {
  const navigate = useNavigate();
  const location = useLocation();
  const classes = useStyles();
  const { t } = useTranslation();

  const isSomeId = (route) => {
    return Number.isInteger(+route);
  };

  let currentRoutes = [];
  currentRoutes = location.pathname !== "/" ? location.pathname.split("/") : [];
  if (currentRoutes.length > 0 && currentRoutes[1] !== "page") {
    currentRoutes.shift();

    return (
      <Box ml={3} pt={3}>
        <Breadcrumbs aria-label="breadcrumb">
          {currentRoutes.length === 1 ? (
            <Grid container spacing={1}>
              <Grid item>
                <Typography color="textPrimary">
                  {isSomeId(currentRoutes[0])
                    ? currentRoutes[0]
                    : t(`breadcrumb.${currentRoutes[0]}`)}
                </Typography>
              </Grid>
              <Grid item>
                <Icon style={{ fontSize: 16, marginTop: 5 }}>
                  {RouteIcon(currentRoutes[0])}
                </Icon>
              </Grid>
            </Grid>
          ) : (
            currentRoutes.map((route, index) => {
              return index !== currentRoutes.length - 1 ? (
                <Link
                  className={classes.breadcrumbsItem}
                  key={index}
                  color="secondary"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    navigate(
                      currentRoutes
                        .map((route, i) => (i <= index ? route : null))
                        .filter((el) => el != null)
                        .join("/")
                    );
                  }}
                >
                  <Grid container spacing={1}>
                    <Grid item>
                      {isSomeId(route) ? route : t(`breadcrumb.${route}`)}
                    </Grid>
                    <Grid item>
                      <Icon style={{ fontSize: 16, marginTop: 5 }}>
                        {RouteIcon(route)}
                      </Icon>
                    </Grid>
                  </Grid>
                </Link>
              ) : (
                <Grid container key={index} spacing={1}>
                  <Grid item>
                    <Typography color="primary">
                      {isSomeId(route) ? route : t(`breadcrumb.${route}`)}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Icon
                      color="primary"
                      style={{ fontSize: 16, marginTop: 5 }}
                    >
                      {RouteIcon(route)}
                    </Icon>
                  </Grid>
                </Grid>
              );
            })
          )}
        </Breadcrumbs>
      </Box>
    );
  } else return <></>;
}
