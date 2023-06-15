import React, { lazy } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

const OfflineSpots = (props) => {
  const { match } = props;
  return (
    <Switch>
      <Route
        path={`${match.url}/addresses`}
        component={lazy(() => import(`./addresses`))}
      />
      <Route
        path={`${match.url}/geofences`}
        component={lazy(() => import(`./geofences`))}
      />
      <Redirect from={`${match.url}`} to={`${match.url}/addresses`} />
    </Switch>
  );
};

export default OfflineSpots;
