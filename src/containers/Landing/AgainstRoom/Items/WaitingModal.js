import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import {
  Divider,
  Grid,
  CircularProgress,
  Button,
  Box,
} from "@material-ui/core";
import { game, matchroom } from "modules/game/actions";
import { useAction } from "utils/hooks";
import { useNavigate } from "react-router";
import { Typography } from "@material-ui/core";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { useTranslation } from "react-i18next";

export default function WaitingModal() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const endGame = useAction(game.endGame);

  const handleQuitGame = () => {
    endGame();
    navigate(-1);
  };

  return (
    <Dialog open={true} aria-labelledby="form-dialog-title">
      <DialogTitle disableTypography id="form-dialog-title">
        <Typography variant="h4" align="center">
          Waiting for opponent
        </Typography>
      </DialogTitle>
      <Divider />
      <DialogContent>
        <Box m={2}>
          <Grid
            container
            spacing={3}
            justifyContent="center"
            alignItems="center"
          >
            <Grid item>
              <CircularProgress />
            </Grid>
            <Grid item xs={12} container justifyContent="center">
              <Box pt={2}>
                <Button
                  variant="outlined"
                  color="primary"
                  startIcon={<ExitToAppIcon />}
                  onClick={handleQuitGame}
                >
                  {t("quit_the_game.quit_the_game")}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
