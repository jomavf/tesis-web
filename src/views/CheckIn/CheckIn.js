import React, { useState, useEffect } from "react";

import { makeStyles } from "@material-ui/styles";

import { useHistory } from "react-router-dom";

import { requestReservationDelete, requestItems } from "./service";

import { CheckInTable } from "./components/CheckInTable";
import { CheckInToolbar } from "./components/CheckInToolbar";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
  },
  content: {
    marginTop: theme.spacing(2),
  },
}));

export const CheckIn = () => {
  const history = useHistory();
  const classes = useStyles();

  const domainLabel = "Habitacion";
  const domain = "room";

  const [items, setItems] = useState([]);

  async function getItems() {
    try {
      const { ok, data } = await requestItems();
      if (!ok) {
        console.log("some error ocurred!");
      }
      setItems(data);
    } catch (error) {}
  }

  useEffect(() => {
    getItems();
  }, []);

  const handleAdd = () => {
    history.push("/check-in/create");
  };

  return (
    <div className={classes.root}>
      <CheckInToolbar handleAdd={handleAdd} />
      <div className={classes.content}>
        <CheckInTable
          domainLabel={domainLabel}
          domain={domain}
          requestItems={requestItems}
          requestItemDelete={requestReservationDelete}
          items={items}
          setItems={setItems}
          setRestaurants={setItems}
        />
      </div>
    </div>
  );
};
