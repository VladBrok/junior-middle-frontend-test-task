import React, { lazy } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

const Users = (props) => {
  const { match } = props;
  return (
    <Switch>
      <Route
        path={`${match.url}/list`}
        component={lazy(() => import(`./list`))}
      />
      <Route
        path={`${match.url}/groups`}
        component={lazy(() => import(`./groups`))}
      />
      <Redirect from={`${match.url}`} to={`${match.url}/list`} />
    </Switch>
  );
};

export default Users;
