import React, { useState } from "react";

import { makeStyles } from "@material-ui/styles";

import { useHistory } from "react-router-dom";

import { RestaurantsTable } from "./components/RestaurantsTable";
import { RestaurantsToolbar } from "./components/RestaurantsToolbar";
import mockData from "./data";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
  },
  content: {
    marginTop: theme.spacing(2),
  },
}));

export const Restaurants = () => {
  let history = useHistory();
  const classes = useStyles();

  const [restaurants] = useState(mockData);

  const handleAddRestaurant = () => {
    history.push("/restaurants/create");
  };

  return (
    <div className={classes.root}>
      <RestaurantsToolbar handleAddRestaurant={handleAddRestaurant} />
      <div className={classes.content}>
        <RestaurantsTable restaurants={restaurants} />
      </div>
    </div>
  );
};
