import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { AppBar, makeStyles } from "@material-ui/core";
import { NavHeader } from "common/NavHeader";

const useStyles = makeStyles({
  root: {
    background: "black",
  },
  toolbar: {
    height: "auto",
  },
});

const TopBar = ({ className, ...rest }) => {
  const classes = useStyles();

  return (
    <AppBar
      bgcolor="secondary"
      className={clsx(classes.root, className)}
      elevation={0}
      {...rest}
    ></AppBar>
  );
};

TopBar.propTypes = {
  className: PropTypes.string,
};

export default TopBar;
