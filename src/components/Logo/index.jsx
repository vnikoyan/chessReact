import React from 'react';
import { makeStyles } from "@material-ui/core";
import logoLight from 'assets/images/logo/logo_small_green.png';
import logoDark from 'assets/images/logo/logo_small_green.png';
import logo from 'assets/images/logo/new_logo.png';

const useStyles = makeStyles((theme) => ({
  logo: {
    height: '100%',
    // width: '100%',
  },
}));

export const Logo = ({ className, dark, clickable = true }) => {
  const classes = useStyles();
  const LogoIcon = () => <img className={classes.logo} src={dark ? logo : logo} alt="logo" />;
  if (!clickable) {
    return <LogoIcon />;
  }
  return (
    <LogoIcon className={classes.logo} />
  );
};