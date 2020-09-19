import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import { Divider, Drawer } from "@material-ui/core";
import PeopleIcon from "@material-ui/icons/People";
import RestaurantIcon from "@material-ui/icons/Restaurant";
import ListIcon from "@material-ui/icons/List";
import EventAvailableIcon from "@material-ui/icons/EventAvailable";
import SpaIcon from "@material-ui/icons/Spa";
import LocalActivityIcon from "@material-ui/icons/LocalActivity";
import EventIcon from "@material-ui/icons/Event";
import FitnessCenterIcon from "@material-ui/icons/FitnessCenter";
import InternetIcon from "@material-ui/icons/PermScanWifi";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import PlaceIcon from "@material-ui/icons/Place";

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
      index: 0,
      title: "Check-in",
      href: "/check-in",
      icon: <PeopleIcon />,
    },
    {
      index: 0,
      title: "Solicitud Internet",
      href: "/internet-request",
      icon: <InternetIcon />,
    },
    {
      index: 1,
      title: "Restaurantes",
      icon: <RestaurantIcon />,
      children: [
        { title: "Listado", icon: <ListIcon />, href: "/restaurants" },
        {
          title: "Reservas",
          icon: <EventAvailableIcon />,
          href: "/restaurants/reservations",
        },
      ],
    },
    {
      index: 2,
      title: "Gimnasios",

      icon: <FitnessCenterIcon />,
      children: [
        { title: "Listado", icon: <ListIcon />, href: "/gyms" },
        {
          title: "Reservas",
          icon: <EventAvailableIcon />,
          href: "/gyms/reservations",
        },
      ],
    },
    {
      index: 3,
      title: "Spas",
      icon: <SpaIcon />,
      children: [
        { title: "Listado", icon: <ListIcon />, href: "/spas" },
        {
          title: "Reservas",
          icon: <EventAvailableIcon />,
          href: "/spas/reservations",
        },
      ],
    },
    {
      index: 4,
      title: "Eventos",
      icon: <EventIcon />,
      children: [
        { title: "Listado", icon: <ListIcon />, href: "/events" },
        {
          title: "Reservas",
          icon: <EventAvailableIcon />,
          href: "/events/reservations",
        },
      ],
    },
    {
      index: 4,
      title: "Locales",
      icon: <LocalActivityIcon />,
      children: [
        { title: "Listado", icon: <ListIcon />, href: "/locals" },
        {
          title: "Reservas",
          icon: <EventAvailableIcon />,
          href: "/locals/reservations",
        },
      ],
    },

    {
      index: 5,
      title: "Lugares Turisticos",
      icon: <PlaceIcon />,
      href: "/locals/reservations",
    },
    {
      index: 6,
      title: "Productos",
      icon: <AddShoppingCartIcon />,
      href: "/locals/reservations",
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
