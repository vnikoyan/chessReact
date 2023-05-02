import React, { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Divider,
  Grid,
  CircularProgress,
  useTheme,
  makeStyles,
  Box,
  Tooltip,
  Button,
} from "@material-ui/core";
import { game, matchroom } from "modules/game/actions";
import { Typography } from "@material-ui/core";
import { useAction } from "utils/hooks";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { useTranslation } from "react-i18next";

export default function WaitingModal() {
  const { t } = useTranslation();
  const theme = useTheme();
  const location = useLocation();
  const [copiedText, setCopiedText] = useState();
  const endGame = useAction(game.endGame);
  const navigate = useNavigate();

  const Url = window.location.href;
  const handleQuitGame = () => {
    endGame();
    navigate(-1);
  };

  return (
    <Dialog open={true} aria-labelledby="form-dialog-title">
      <DialogTitle disableTypography id="form-dialog-title">
        <Typography variant="h4" align="center">
          To invite someone to play, give this URL
        </Typography>
      </DialogTitle>
      <Divider />
      <DialogContent>
        <Box py={2}>
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            spacing={2}
          >
            {/* <Grid item>
              <CircularProgress />
            </Grid> */}
            {/* <Grid item xs={12}>
              <Typography variant='h5' align='center'>
                To invite someone to play, give this URL
              </Typography>
            </Grid> */}
            <Grid
              item
              xs={12}
              component={Box}
              paddingLeft="15px"
              paddingRight="15px"
            >
              <CopyToClipboard text={Url} onCopy={() => setCopiedText(Url)}>
                <Tooltip
                  title={
                    copiedText === Url
                      ? "This was Copied!"
                      : "Copy To Clipboard"
                  }
                  placement="top"
                >
                  <Button
                    style={{ textTransform: "lowercase" }}
                    variant="outlined"
                    color="primary"
                    size="large"
                    fullWidth
                  >
                    <div>{Url}</div>
                  </Button>
                </Tooltip>
              </CopyToClipboard>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h5" align="center">
                The first person to come to this URL will play with you.
              </Typography>
            </Grid>
            <Grid item xs={12} container justifyContent="center">
              <Button
                variant="outlined"
                color="primary"
                startIcon={<ExitToAppIcon />}
                onClick={handleQuitGame}
              >
                {t("quit_the_game.quit_the_game")}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
