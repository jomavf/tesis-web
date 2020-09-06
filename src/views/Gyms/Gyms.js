import React, { useState, useEffect } from "react";

import { makeStyles } from "@material-ui/styles";

import { useHistory } from "react-router-dom";

import { requestItems } from "./service";

import { GymsTable } from "./components/GymsTable";
import { GymsToolbar } from "./components/GymsToolbar";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
  },
  content: {
    marginTop: theme.spacing(2),
  },
}));

export const Gyms = () => {
  const history = useHistory();
  const classes = useStyles();

  const [gyms, setGyms] = useState([]);

  async function getGyms() {
    try {
      const { ok, data } = await requestItems();
      if (!ok) {
        console.log("some error ocurred!");
      }
      setGyms(data);
    } catch (error) {}
  }

  useEffect(() => {
    getGyms();
  }, []);

  const handleAddGym = () => {
    history.push("/gyms/create");
  };

  return (
    <div className={classes.root}>
      <GymsToolbar handleAddGym={handleAddGym} />
      <div className={classes.content}>
        <GymsTable gyms={gyms} setGyms={setGyms} />
      </div>
    </div>
  );
};
