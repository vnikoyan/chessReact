import React, { useEffect, useMemo, useRef } from "react";
import { useSelector } from "react-redux";
import {
  renderRoutes,
  RouteConfig,
  RouteConfigComponentProps,
} from "react-router-config";
import { BrowserRouter as Router, Redirect, Switch } from "react-router-dom";

import { Api } from "api";

import { UserTypes } from "consts";

import {
  getStates,
  getRegions,
  getWineTypes,
  getVarietals,
  getBusiness,
} from "modules/common/actions";
import { store } from "store";

import { useAction } from "utils/hooks";

import BaseScreen from "containers/Landing";
import { RouteNames } from "./routeNames";

export const Routes = () => {
  const { access, type } = useSelector((state) => state.login);
  const isTokenWatcherSet = useRef(false);

  const loadStates = useAction(getStates.request);
  const loadRegions = useAction(getRegions.request);
  const loadWineTypes = useAction(getWineTypes.request);
  const loadVarietals = useAction(getVarietals.request);
  const loadBusiness = useAction(getBusiness.request);

  if (access) {
    if (!isTokenWatcherSet.current) {
      Api.setAuthToken(access);
      Api.watchTokenExpire(store);
      isTokenWatcherSet.current = true;
    }
  } else {
    Api.clearAuthToken();
  }

  useEffect(() => {
    loadStates();
    loadRegions();
    loadWineTypes();
    loadVarietals();
    loadBusiness();
  }, []);

  const isLoggedIn = !!access;

  const isUserType = type;

  const appRoutes = [
    {
      path: "/",
      loggedIn: false,
      userType: null,
      component: ({ route }) => <>{renderRoutes(route?.routes)}</>,
      routes: [
        {
          path: "**",
          exact: true,
          component: BaseScreen,
        },
      ],
    },
    {
      path: "/",
      loggedIn: true,
      userType: UserTypes.business,
      component: BaseScreen,
      routes: [
        {
          path: "**",
          exact: true,
          component: () => <Redirect to={RouteNames.customer.explore} />,
        },
      ],
    },
    {
      path: "/",
      loggedIn: true,
      userType: UserTypes.customer,
      component: BaseScreen,
      routes: [
        {
          path: "**",
          exact: true,
          component: () => <Redirect to={RouteNames.customer.explore} />,
        },
      ],
    },
  ];

  const renderedRoutes = useMemo(() => {
    return renderRoutes(
      appRoutes.filter(
        ({ loggedIn, userType }) =>
          isLoggedIn === loggedIn && isUserType === userType
      )
    );
  }, [isLoggedIn, isUserType]);

  return (
    <Router>
      <Switch>{renderedRoutes}</Switch>
    </Router>
  );
};
