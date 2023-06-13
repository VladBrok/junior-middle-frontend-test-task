import React, { lazy } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

const Main = (props) => {
  const { match } = props;
  return (
    <Switch>
      <Route
        path={`${match.url}/dashboard`}
        component={lazy(() => import(`./dashboard`))}
      />
      <Route
        path={`${match.url}/catalog`}
        component={lazy(() => import(`./catalog`))}
      />
      <Redirect from={`${match.url}`} to={`${match.url}/dashboard`} />
    </Switch>
  );
};

export default Main;
