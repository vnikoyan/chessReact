import React from "react";
import PropTypes from "prop-types";
import { Divider, Grid, Typography } from "@material-ui/core";

const InfoBlock = ({ title, content }) => {
  return (
    <Grid item container justifyContent="center" xs={12}>
      <Grid item xs={10} md={4}>
        <Typography variant="subtitle2" color="primary">
          {title}
        </Typography>
        <Divider />
        <Typography variant="body1">{content}</Typography>
      </Grid>
    </Grid>
  );
};

InfoBlock.propTypes = {
  className: PropTypes.string,
};

export default InfoBlock;
