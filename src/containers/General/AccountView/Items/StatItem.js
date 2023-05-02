import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import {
  Box,
  Card,
  CardContent,
  Divider,
  Typography,
  makeStyles,
} from "@material-ui/core";

const useStyles = makeStyles(() => ({
  root: {},
  avatar: {
    height: 100,
    width: 100,
  },
}));

const StatItem = ({ className, ...rest }) => {
  const classes = useStyles();
  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardContent>
        <Box alignItems="center" display="flex" flexDirection="column">
          <Typography color="textPrimary" gutterBottom variant="h1">
            {rest.stat}
          </Typography>
          <Typography color="textSecondary" gutterBottom variant="body1">
            {rest.statname}
          </Typography>
        </Box>
      </CardContent>
      <Divider />
    </Card>
  );
};

StatItem.propTypes = {
  className: PropTypes.string,
};

export default StatItem;
