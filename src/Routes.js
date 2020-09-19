import React from "react";
import { Switch, Redirect, useHistory } from "react-router-dom";

import { RouteWithLayout } from "./components/RouteWithLayout";
import { Main as MainLayout } from "./layouts/Main/Main";
import { Minimal as MinimalLayout } from "./layouts/Minimal/Minimal";

import { Events } from "./views/Events/Events";
import { CreateEvent } from "./views/Events/CreateEvent";
import { Reservations as EventReservations } from "./views/Events/Reservations";
import { CreateReservation as CreateEventsReservation } from "./views/Events/CreateReservation";

import { Gyms } from "./views/Gyms/Gyms";
import { CreateGym } from "./views/Gyms/CreateGym";
import { Reservations as GymReservations } from "./views/Gyms/Reservations";
import { CreateReservation as CreateGymsReservation } from "./views/Gyms/CreateReservation";

import { Locals } from "./views/Locals/Locals";
import { CreateLocal } from "./views/Locals/CreateLocal";
import { Reservations as LocalReservations } from "./views/Locals/Reservations";
import { CreateReservation as CreateLocalsReservation } from "./views/Locals/CreateReservation";

import { Restaurants } from "./views/Restaurants/Restaurants";
import { Reservations as RestaurantReservations } from "./views/Restaurants/Reservations";
import { CreateRestaurant } from "./views/Restaurants/CreateRestaurant";
import { CreateReservation as CreateRestaurantReservation } from "./views/Restaurants/CreateReservation";

import { Spas } from "./views/Spas/Spas";
import { CreateSpa } from "./views/Spas/CreateSpa";
import { Reservations as SpaReservations } from "./views/Spas/Reservations";
import { CreateReservation as CreateSpaReservation } from "./views/Spas/CreateReservation";

import { Account } from "./views/Account/Account";
import { Settings } from "./views/Settings/Settings";

import SignIn from "./views/SignIn/SignIn";
import SignUp from "./views/SignUp";

import { NotFound as NotFoundView } from "./views/NotFound";
import { CreateReservation } from "./components/CreateReservation";

import { CheckIn } from "./views/CheckIn/CheckIn";
import { CreateCheckIn } from "./views/CheckIn/CreateCheckIn";

import { Products } from "./views/Products/Products";
import { CreateProduct } from "./views/Products/CreateProduct";

import { InternetRequest } from "./views/InternetRequest/InternetRequest";

const Routes = () => {
  const history = useHistory();
  if (localStorage.getItem("token") == null) {
    history.push("/sign-in");
  }

  return (
    <Switch>
      <Redirect exact from="/" to="/check-in" />
      <RouteWithLayout
        component={InternetRequest}
        exact
        layout={MainLayout}
        path="/internet-request"
      />
      <RouteWithLayout
        component={CheckIn}
        exact
        layout={MainLayout}
        path="/check-in"
      />
      <RouteWithLayout
        component={CreateCheckIn}
        exact
        layout={MainLayout}
        path="/check-in/create"
      />
      <RouteWithLayout
        component={Events}
        exact
        layout={MainLayout}
        path="/events"
      />
      <RouteWithLayout
        component={EventReservations}
        exact
        layout={MainLayout}
        path="/events/reservations"
      />
      <RouteWithLayout
        component={CreateEvent}
        exact
        layout={MainLayout}
        path="/events/create"
      />

      <RouteWithLayout
        component={CreateEventsReservation}
        exact
        layout={MainLayout}
        path="/events/reservations/create"
      />

      <RouteWithLayout
        component={Restaurants}
        exact
        layout={MainLayout}
        path="/restaurants"
      />
      <RouteWithLayout
        component={RestaurantReservations}
        exact
        layout={MainLayout}
        path="/restaurants/reservations"
      />
      <RouteWithLayout
        component={CreateRestaurantReservation}
        exact
        layout={MainLayout}
        path="/restaurants/reservations/create"
      />
      <RouteWithLayout
        component={CreateRestaurant}
        exact
        layout={MainLayout}
        path="/restaurants/create"
      />

      <RouteWithLayout
        component={CreateGymsReservation}
        exact
        layout={MainLayout}
        path="/gyms/reservations/create"
      />
      <RouteWithLayout
        component={Gyms}
        exact
        layout={MainLayout}
        path="/gyms"
      />
      <RouteWithLayout
        component={GymReservations}
        exact
        layout={MainLayout}
        path="/gyms/reservations"
      />
      <RouteWithLayout
        component={CreateGym}
        exact
        layout={MainLayout}
        path="/gyms/create"
      />
      <RouteWithLayout
        component={CreateLocalsReservation}
        exact
        layout={MainLayout}
        path="/locals/reservations/create"
      />
      <RouteWithLayout
        component={Locals}
        exact
        layout={MainLayout}
        path="/locals"
      />
      <RouteWithLayout
        component={LocalReservations}
        exact
        layout={MainLayout}
        path="/locals/reservations"
      />
      <RouteWithLayout
        component={CreateLocal}
        exact
        layout={MainLayout}
        path="/locals/create"
      />
      <RouteWithLayout
        component={Spas}
        exact
        layout={MainLayout}
        path="/spas"
      />
      <RouteWithLayout
        component={SpaReservations}
        exact
        layout={MainLayout}
        path="/spas/reservations"
      />
      <RouteWithLayout
        component={CreateProduct}
        exact
        layout={MainLayout}
        path="/products/create"
      />
      <RouteWithLayout
        component={Products}
        exact
        layout={MainLayout}
        path="/products"
      />
      <RouteWithLayout
        component={CreateSpaReservation}
        exact
        layout={MainLayout}
        path="/spas/reservations/create"
      />
      <RouteWithLayout
        component={CreateSpa}
        exact
        layout={MainLayout}
        path="/spas/create"
      />
      <RouteWithLayout
        component={Gyms}
        exact
        layout={MainLayout}
        path="/gyms"
      />
      <RouteWithLayout
        component={Gyms}
        exact
        layout={MainLayout}
        path="/gyms/reservations"
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
      <RouteWithLayout
        component={SignUp}
        exact
        layout={MinimalLayout}
        path="/sign-up"
      />
      <RouteWithLayout
        component={SignIn}
        exact
        layout={MinimalLayout}
        path="/sign-in"
      />
      <Redirect to="/not-found" />
    </Switch>
  );
};

export default Routes;
