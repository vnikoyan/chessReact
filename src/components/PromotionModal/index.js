import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/styles";
import { Avatar, Divider, Grid } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import { SERVER_URL } from "configs";

const useStyles = makeStyles((theme) => ({
  pieceItem: {
    cursor: "pointer",
    transition: "transform .1s",
    "&:hover": {
      borderColor: theme.palette.primary.main,
      transform: "scale(1.2)",
    },
  },
  avatar: {
    width: 75,
    height: 75,
  },
}));

export default function PromotionModal({ color, handleSelectPiece }) {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <Dialog open={true}>
      <DialogTitle disableTypography>
        <Typography variant="h3" align="center">
          {t("trainings.promotion.pawn_promotion")}
        </Typography>
        <Typography variant="h4" align="center">
          {t("trainings.promotion.select_piece")}
        </Typography>
      </DialogTitle>
      <Divider />
      <DialogContent>
        <Grid container>
          {color === "w" ? (
            <Grid item container>
              <Grid
                item
                xs={3}
                container
                justifyContent="center"
                className={classes.pieceItem}
                onClick={() => handleSelectPiece("q")}
              >
                <Avatar
                  className={classes.avatar}
                  src={`${SERVER_URL}storage/pieces/wQ.png`}
                />
              </Grid>
              <Grid
                item
                xs={3}
                container
                justifyContent="center"
                className={classes.pieceItem}
                onClick={() => handleSelectPiece("r")}
              >
                <Avatar
                  className={classes.avatar}
                  src={`${SERVER_URL}storage/pieces/wR.png`}
                />
              </Grid>
              <Grid
                item
                xs={3}
                container
                justifyContent="center"
                className={classes.pieceItem}
                onClick={() => handleSelectPiece("b")}
              >
                <Avatar
                  className={classes.avatar}
                  src={`${SERVER_URL}storage/pieces/wB.png`}
                />
              </Grid>
              <Grid
                item
                xs={3}
                container
                justifyContent="center"
                className={classes.pieceItem}
                onClick={() => handleSelectPiece("n")}
              >
                <Avatar
                  className={classes.avatar}
                  src={`${SERVER_URL}storage/pieces/wN.png`}
                />
              </Grid>
            </Grid>
          ) : (
            <Grid item container justifyContent="center">
              <Grid
                item
                xs={3}
                container
                justifyContent="center"
                className={classes.pieceItem}
                onClick={() => handleSelectPiece("q")}
              >
                <Avatar
                  className={classes.avatar}
                  src={`${SERVER_URL}storage/pieces/bQ.png`}
                />
              </Grid>
              <Grid
                item
                xs={3}
                container
                justifyContent="center"
                className={classes.pieceItem}
                onClick={() => handleSelectPiece("r")}
              >
                <Avatar
                  className={classes.avatar}
                  src={`${SERVER_URL}storage/pieces/bR.png`}
                />
              </Grid>
              <Grid
                item
                xs={3}
                container
                justifyContent="center"
                className={classes.pieceItem}
                onClick={() => handleSelectPiece("b")}
              >
                <Avatar
                  className={classes.avatar}
                  src={`${SERVER_URL}storage/pieces/bB.png`}
                />
              </Grid>
              <Grid
                item
                xs={3}
                container
                justifyContent="center"
                className={classes.pieceItem}
                onClick={() => handleSelectPiece("n")}
              >
                <Avatar
                  className={classes.avatar}
                  src={`${SERVER_URL}storage/pieces/bN.png`}
                />
              </Grid>
            </Grid>
          )}
        </Grid>
      </DialogContent>
    </Dialog>
  );
}
