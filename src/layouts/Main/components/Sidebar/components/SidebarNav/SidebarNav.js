/* eslint-disable react/no-multi-comp */
/* eslint-disable react/display-name */
import React, { forwardRef } from "react";
import { NavLink as RouterLink, useHistory } from "react-router-dom";
import clsx from "clsx";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import { List, ListItem, Button, colors } from "@material-ui/core";
import Icon from "@material-ui/core/Icon";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import { useState } from "react";

const useStyles = makeStyles((theme) => ({
  root: {},
  item: {
    display: "flex",
    paddingTop: 0,
    paddingBottom: 0,
  },
  button: {
    color: colors.blueGrey[800],
    padding: "10px 8px",
    justifyContent: "flex-start",
    textTransform: "none",
    letterSpacing: 0,
    width: "100%",
    fontWeight: theme.typography.fontWeightMedium,
  },
  childButton: {
    color: colors.blueGrey[800],
    // padding: "10px 8px",
    justifyContent: "flex-start",
    textTransform: "none",
    letterSpacing: 0,
    width: "100%",
    fontWeight: theme.typography.fontWeightMedium,
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  icon: {
    color: theme.palette.icon,
    width: 24,
    height: 24,
    display: "flex",
    alignItems: "center",
    marginRight: theme.spacing(1),
  },
  active: {
    color: theme.palette.primary.main,
    fontWeight: theme.typography.fontWeightMedium,
    "& $icon": {
      color: theme.palette.primary.main,
    },
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

const CustomRouterLink = forwardRef((props, ref) => (
  <div ref={ref} style={{ flexGrow: 1 }}>
    <RouterLink {...props} />
  </div>
));

const SidebarNav = (props) => {
  const { pages, className, ...rest } = props;
  const [open, setOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(-1);
  const classes = useStyles();
  const history = useHistory();

  const handleClick = (index) => {
    setCurrentItem(index);
    setOpen(!open);
  };

  return (
    <List {...rest} className={clsx(classes.root, className)}>
      {pages.map((page, index) => (
        <div key={index}>
          <ListItem
            className={classes.item}
            disableGutters
            key={page.title}
            button
            onClick={() => {
              if (page.children != null) {
                handleClick(index);
              }
            }}
          >
            <Button
              activeClassName={page.children == null ? null : classes.active}
              className={classes.button}
              component={CustomRouterLink}
              to={page.children == null && page.href}
            >
              <div className={classes.icon}>{page.icon}</div>
              <ListItemText primary={page.title} />
              {page.children != null ? (
                open && currentItem === index ? (
                  <ExpandLess />
                ) : (
                  <ExpandMore />
                )
              ) : (
                <></>
              )}
            </Button>
          </ListItem>
          <Collapse
            in={open && currentItem === index}
            timeout="auto"
            unmountOnExit
          >
            {page.children != null &&
              page.children.map((childPage, index) => {
                return (
                  <Button
                    key={index}
                    // activeClassName={classes.active}
                    className={classes.childButton}
                    component={CustomRouterLink}
                    to={childPage.href}
                  >
                    <ListItem button className={classes.nested}>
                      <div className={classes.icon}>{childPage.icon}</div>
                      <ListItemText primary={childPage.title} />
                    </ListItem>
                  </Button>
                );
              })}
          </Collapse>
        </div>
      ))}
    </List>
  );
};

SidebarNav.propTypes = {
  className: PropTypes.string,
  pages: PropTypes.array.isRequired,
};

export default SidebarNav;
