import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import { Divider, Drawer } from "@material-ui/core";
import PeopleIcon from "@material-ui/icons/People";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import SettingsIcon from "@material-ui/icons/Settings";
import RestaurantIcon from "@material-ui/icons/Restaurant";
import SpaIcon from "@material-ui/icons/Spa";
import EventIcon from "@material-ui/icons/Event";
import VideoLibraryIcon from "@material-ui/icons/VideoLibrary";
import FitnessCenterIcon from "@material-ui/icons/FitnessCenter";

import { Profile, SidebarNav } from "./components";

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: 240,
    [theme.breakpoints.up("lg")]: {
      marginTop: 64,
      height: "calc(100% - 64px)",
    },
  },
  root: {
    backgroundColor: theme.palette.white,
    display: "flex",
    flexDirection: "column",
    height: "100%",
    padding: theme.spacing(2),
  },
  divider: {
    margin: theme.spacing(2, 0),
  },
  nav: {
    marginBottom: theme.spacing(2),
  },
}));

const Sidebar = (props) => {
  const { open, variant, onClose, className, ...rest } = props;

  const classes = useStyles();

  const pages = [
    {
      title: "Huespedes",
      href: "/guests",
      icon: <PeopleIcon />,
    },
    {
      title: "Restaurantes",
      href: "/restaurants",
      icon: <RestaurantIcon />,
    },
    {
      title: "Gimnasios",
      href: "/gyms",
      icon: <FitnessCenterIcon />,
    },
    {
      title: "Spas",
      href: "/spas",
      icon: <SpaIcon />,
    },
    {
      title: "Eventos",
      href: "/events",
      icon: <EventIcon />,
    },
    {
      title: "Videos",
      href: "/videos",
      icon: <VideoLibraryIcon />,
    },
    {
      title: "Cuenta",
      href: "/account",
      icon: <AccountBoxIcon />,
    },
    {
      title: "Configuración",
      href: "/settings",
      icon: <SettingsIcon />,
    },
  ];

  return (
    <Drawer
      anchor="left"
      classes={{ paper: classes.drawer }}
      onClose={onClose}
      open={open}
      variant={variant}
    >
      <div {...rest} className={clsx(classes.root, className)}>
        <Profile />
        <Divider className={classes.divider} />
        <SidebarNav className={classes.nav} pages={pages} />
      </div>
    </Drawer>
  );
};

Sidebar.propTypes = {
  className: PropTypes.string,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired,
  variant: PropTypes.string.isRequired,
};

export default Sidebar;
