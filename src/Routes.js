import React from "react";
import { Switch, Redirect } from "react-router-dom";

import { RouteWithLayout } from "./components/RouteWithLayout/RouteWithLayout";
import { Main as MainLayout } from "./layouts/Main/Main";

import { Guests } from "./views/Guests/Guests";

const Routes = () => {
  return (
    <Switch>
      <Redirect exact from="/" to="/guests" />
      <RouteWithLayout
        component={Guests}
        exact
        layout={MainLayout}
        path="/guests"
      />
      <Redirect to="/not-found" />
    </Switch>
  );
};

export default Routes;
