import React, { useState, useEffect } from "react";

import { makeStyles } from "@material-ui/styles";

import { useHistory } from "react-router-dom";

import { requestItems } from "./service";

import { EventsTable } from "./components/EventsTable";
import { EventsToolbar } from "./components/EventsToolbar";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
  },
  content: {
    marginTop: theme.spacing(2),
  },
}));

export const Events = () => {
  const history = useHistory();
  const classes = useStyles();

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

  const handleAddItem = () => {
    history.push("/events/create");
  };

  return (
    <div className={classes.root}>
      <EventsToolbar handleAddItem={handleAddItem} />
      <div className={classes.content}>
        <EventsTable items={items} setItems={setItems} />
      </div>
    </div>
  );
};
