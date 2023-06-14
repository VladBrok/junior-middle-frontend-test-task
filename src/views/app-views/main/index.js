import React, { lazy } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

const Main = (props) => {
  const { match } = props;
  return (
    <Switch>
      <Route
        path={`${match.url}/planner`}
        component={lazy(() => import(`./planner`))}
      />
      <Route
        path={`${match.url}/dashboard`}
        component={lazy(() => import(`./dashboard`))}
      />
      <Route
        path={`${match.url}/catalog`}
        component={lazy(() => import(`./catalog`))}
      />
      <Route
        path={`${match.url}/orders`}
        component={lazy(() => import(`./orders`))}
      />
      <Route
        path={`${match.url}/users`}
        component={lazy(() => import(`./users`))}
      />
      <Route
        path={`${match.url}/banners`}
        component={lazy(() => import(`./banners`))}
      />
      <Route
        path={`${match.url}/promo-codes`}
        component={lazy(() => import(`./promo-codes`))}
      />
      <Route
        path={`${match.url}/offline-spots`}
        component={lazy(() => import(`./offline-spots`))}
      />
      <Route
        path={`${match.url}/employees`}
        component={lazy(() => import(`./employees`))}
      />
      <Route
        path={`${match.url}/mailings`}
        component={lazy(() => import(`./mailings`))}
      />
      <Redirect from={`${match.url}`} to={`${match.url}/dashboard`} />
    </Switch>
  );
};

export default Main;
