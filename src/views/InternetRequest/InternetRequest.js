import React, { useState, useEffect } from "react";

import { makeStyles } from "@material-ui/styles";

import { useHistory } from "react-router-dom";

import { requestItems } from "./service";

import { InternetRequestTable } from "./components/InternetRequestTable";
import { InternetRequestToolbar } from "./components/InternetRequestToolbar";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
  },
  content: {
    marginTop: theme.spacing(2),
  },
}));

export const InternetRequest = () => {
  const history = useHistory();
  const classes = useStyles();

  const domainLabel = "Solicitud de internet";
  const domain = "hsia_package";

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
      <InternetRequestToolbar handleAdd={handleAdd} />
      <div className={classes.content}>
        <InternetRequestTable
          domainLabel={domainLabel}
          domain={domain}
          requestItems={requestItems}
          requestItemDelete={() => {}}
          items={items}
          setItems={setItems}
          setRestaurants={setItems}
          getItems={getItems}
        />
      </div>
    </div>
  );
};
