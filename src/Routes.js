import React from "react";
import { Switch, Redirect } from "react-router-dom";

import { RouteWithLayout } from "./components/RouteWithLayout";
import { Main as MainLayout } from "./layouts/Main/Main";
import { Minimal as MinimalLayout } from "./layouts/Minimal/Minimal";

import { Guests } from "./views/Guests/Guests";

import { Events } from "./views/Events/Events";
import { Restaurants } from "./views/Restaurants/Restaurants";
import { CreateRestaurant } from "./views/Restaurants/CreateRestaurant";
import { Spas } from "./views/Spas/Spas";
import { Gyms } from "./views/Gyms/Gyms";

import { Videos } from "./views/Videos/Videos";

import { Account } from "./views/Account/Account";
import { Settings } from "./views/Settings/Settings";

import { NotFound as NotFoundView } from "./views/NotFound";

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
      <RouteWithLayout
        component={Events}
        exact
        layout={MainLayout}
        path="/events"
      />
      <RouteWithLayout
        component={Restaurants}
        exact
        layout={MainLayout}
        path="/restaurants"
      />
      <RouteWithLayout
        component={CreateRestaurant}
        exact
        layout={MainLayout}
        path="/restaurants/create"
      />
      <RouteWithLayout
        component={Spas}
        exact
        layout={MainLayout}
        path="/spas"
      />
      <RouteWithLayout
        component={Gyms}
        exact
        layout={MainLayout}
        path="/gyms"
      />
      <RouteWithLayout
        component={Videos}
        exact
        layout={MainLayout}
        path="/videos"
      />
      <RouteWithLayout
        component={Account}
        exact
        layout={MainLayout}
        path="/account"
      />
      <RouteWithLayout
        component={Settings}
        exact
        layout={MainLayout}
        path="/settings"
      />
      <RouteWithLayout
        component={NotFoundView}
        exact
        layout={MinimalLayout}
        path="/not-found"
      />
      <Redirect to="/not-found" />
    </Switch>
  );
};

export default Routes;
