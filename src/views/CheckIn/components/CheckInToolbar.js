import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { makeStyles } from "@material-ui/styles";
import { Button } from "@material-ui/core";

import { SearchInput } from "../../../components/SearchInput";

const useStyles = makeStyles((theme) => ({
  root: {},
  row: {
    height: "42px",
    display: "flex",
    alignItems: "center",
    marginTop: theme.spacing(1),
  },
  spacer: {
    flexGrow: 1,
  },
  importButton: {
    marginRight: theme.spacing(1),
  },
  exportButton: {
    marginRight: theme.spacing(1),
  },
  searchInput: {
    marginRight: theme.spacing(1),
  },
}));

export const CheckInToolbar = (props) => {
  const { className, handleAdd, ...rest } = props;

  const classes = useStyles();

  return (
    <div {...rest} className={clsx(classes.root, className)}>
      <div className={classes.row}>
        <span className={classes.spacer} />
        <Button color="primary" variant="contained" onClick={handleAdd}>
          Añadir Check-In
        </Button>
      </div>
      <div className={classes.row}>
        <SearchInput
          className={classes.searchInput}
          placeholder="Buscar check-in"
        />
      </div>
    </div>
  );
};

CheckInToolbar.propTypes = {
  className: PropTypes.string,
};
