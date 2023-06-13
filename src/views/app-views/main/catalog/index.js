import React, { lazy } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

const Catalog = (props) => {
  const { match } = props;
  return (
    <Switch>
      <Route
        path={`${match.url}/products`}
        component={lazy(() => import(`./products`))}
      />
      <Route
        path={`${match.url}/categories`}
        component={lazy(() => import(`./categories`))}
      />
      <Route
        path={`${match.url}/collections`}
        component={lazy(() => import(`./collections`))}
      />
      <Route
        path={`${match.url}/combo`}
        component={lazy(() => import(`./combo`))}
      />
      <Redirect from={`${match.url}`} to={`${match.url}/products`} />
    </Switch>
  );
};

export default Catalog;
