import React, { useState, useEffect } from "react";

import { makeStyles } from "@material-ui/styles";

import { useHistory } from "react-router-dom";

import { requestReservationDelete, requestReservation } from "./service";

import { ReservationTable } from "../../components/ReservationTable";
import { ReservationToolbar } from "../../components/ReservationToolbar";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
  },
  content: {
    marginTop: theme.spacing(2),
  },
}));

export const Reservations = () => {
  const history = useHistory();
  const classes = useStyles();

  const domainLabel = "Evento";
  const domain = "event";

  const [items, setItems] = useState([]);

  async function getItems() {
    try {
      const { success, data } = await requestReservation();
      if (!success) {
        console.log("some error ocurred!");
        return;
      }
      setItems(data);
    } catch (error) {}
  }

  useEffect(() => {
    getItems();
  }, []);

  const handleAddReservation = () => {
    history.push(`/${domain}s/reservations/create`);
  };

  return (
    <div className={classes.root}>
      <ReservationToolbar handleAddReservation={handleAddReservation} />
      <div className={classes.content}>
        <ReservationTable
          domainLabel={domainLabel}
          domain={domain}
          requestItems={requestReservation}
          requestItemDelete={requestReservationDelete}
          items={items}
          setItems={setItems}
          setRestaurants={setItems}
        />
      </div>
    </div>
  );
};
