import React, { useState, useEffect } from "react";

import { makeStyles } from "@material-ui/styles";

import { useHistory } from "react-router-dom";

import { requestRestaurants } from "./service";

import { RestaurantsTable } from "./components/RestaurantsTable";
import { RestaurantsToolbar } from "./components/RestaurantsToolbar";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
  },
  content: {
    marginTop: theme.spacing(2),
  },
}));

export const Restaurants = () => {
  const history = useHistory();
  const classes = useStyles();

  const [restaurants, setRestaurants] = useState([]);

  async function getRestaurants() {
    try {
      const { ok, data } = await requestRestaurants();
      if (!ok) {
        console.log("some error ocurred!");
      }
      setRestaurants(data);
    } catch (error) {}
  }

  useEffect(() => {
    getRestaurants();
  }, []);

  const handleAddRestaurant = () => {
    history.push("/restaurants/create");
  };

  return (
    <div className={classes.root}>
      <RestaurantsToolbar handleAddRestaurant={handleAddRestaurant} />
      <div className={classes.content}>
        <RestaurantsTable
          restaurants={restaurants}
          setRestaurants={setRestaurants}
        />
      </div>
    </div>
  );
};
