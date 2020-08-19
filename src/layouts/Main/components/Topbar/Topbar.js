import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import clsx from "clsx";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import {
  AppBar,
  Toolbar,
  Badge,
  Hidden,
  IconButton,
  Button,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import NotificationsIcon from "@material-ui/icons/NotificationsOutlined";
import InputIcon from "@material-ui/icons/Input";

const useStyles = makeStyles((theme) => ({
  root: {
    boxShadow: "none",
  },
  flexGrow: {
    flexGrow: 1,
  },
  signOutButton: {
    marginLeft: theme.spacing(1),
  },
}));

const Topbar = (props) => {
  const { className, onSidebarOpen, ...rest } = props;

  const classes = useStyles();

  const [notifications] = useState([]);

  return (
    <AppBar {...rest} className={clsx(classes.root, className)}>
      <Toolbar>
        <RouterLink to="/">
          <img alt="Logo" src="/images/logos/logo--white.svg" />
        </RouterLink>
        <div className={classes.flexGrow} />
        <Hidden mdDown>
          <IconButton color="inherit">
            <Badge
              badgeContent={notifications.length}
              color="primary"
              variant="dot"
            >
              <NotificationsIcon />
            </Badge>
          </IconButton>
          {localStorage.getItem("token") ? (
            <Button
              onClick={() => localStorage.removeItem("token")}
              variant="outlined"
              size="small"
              style={{ color: "white", border: "1px solid gray" }}
            >
              Salir
            </Button>
          ) : (
            <Button
              variant="outlined"
              size="small"
              style={{ color: "white", border: "1px solid gray" }}
            >
              Iniciar sesión
            </Button>
          )}
        </Hidden>
        <Hidden lgUp>
          {localStorage.getItem("token") ? (
            <Button
              onClick={() => localStorage.removeItem("token")}
              variant="outlined"
              size="small"
              style={{ color: "white", border: "1px solid gray" }}
            >
              Salir
            </Button>
          ) : (
            <Button variant="contained" color="primary">
              Iniciar sesión
            </Button>
          )}
          <IconButton color="inherit" onClick={onSidebarOpen}>
            <MenuIcon />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

Topbar.propTypes = {
  className: PropTypes.string,
  onSidebarOpen: PropTypes.func,
};

export default Topbar;
