import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Divider, Grid, CircularProgress } from "@material-ui/core";
import { Typography } from "@material-ui/core";

export default function WaitingModal() {
  return (
    <Dialog open={true} aria-labelledby="form-dialog-title">
      <DialogTitle disableTypography id="form-dialog-title">
        <Typography variant="h4" align="center">
          Waiting for opponent
        </Typography>
      </DialogTitle>
      <Divider />
      <DialogContent>
        <Grid container justifyContent="center" alignItems="center">
          <Grid item>
            <CircularProgress />
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}
