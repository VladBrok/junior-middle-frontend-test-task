import React, { lazy } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

const System = (props) => {
  const { match } = props;
  return (
    <Switch>
      <Route
        path={`${match.url}/settings`}
        component={lazy(() => import(`./settings`))}
      />
      <Route
        path={`${match.url}/mobile-app`}
        component={lazy(() => import(`./mobile-app`))}
      />
      <Route
        path={`${match.url}/logs`}
        component={lazy(() => import(`./logs`))}
      />
      <Redirect from={`${match.url}`} to={`${match.url}/settings`} />
    </Switch>
  );
};

export default System;
