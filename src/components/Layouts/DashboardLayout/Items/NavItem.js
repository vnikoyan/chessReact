import React from "react";
import { NavLink as RouterLink } from "react-router-dom";
import clsx from "clsx";
import PropTypes from "prop-types";
import { Button, ListItem, makeStyles } from "@material-ui/core";
import Icon from "@material-ui/core/Icon";

const useStyles = makeStyles((theme) => {
  return {
    item: {
      display: "flex",
      paddingTop: 0,
      paddingBottom: 0,
      "& > span": {
        margin: theme.spacing(2),
      },
    },
    button: {
      color: theme.palette.text.secondary,
      fontWeight: theme.typography.fontWeightMedium,
      justifyContent: "flex-start",
      letterSpacing: 0,
      padding: "10px 8px",
      textTransform: "none",
      width: "100%",
      "&:hover": {
        color: theme.palette.primary.main,
      },
    },
    icon: {
      marginRight: theme.spacing(1),
    },
    title: {
      marginRight: "auto",
    },
    active: {
      color: theme.palette.primary.main,
      "& $title": {
        fontWeight: theme.typography.fontWeightMedium,
      },
      "& $icon": {
        color: theme.palette.primary.main,
      },
    },
  };
});

const NavItem = ({ className, href, icon, title, ...rest }) => {
  const classes = useStyles();

  return (
    <ListItem
      className={clsx(classes.item, className)}
      disableGutters
      {...rest}
    >
      <Button
        activeClassName={classes.active}
        className={classes.button}
        component={RouterLink}
        to={href}
        startIcon={Icon && <Icon>{icon}</Icon>}
      >
        <span className={classes.title}>{title}</span>
      </Button>
    </ListItem>
  );
};

NavItem.propTypes = {
  className: PropTypes.string,
  href: PropTypes.string,
  icon: PropTypes.elementType,
  title: PropTypes.string,
};

export default NavItem;
