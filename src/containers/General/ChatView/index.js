import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Grid, Card, CardContent, Divider } from "@material-ui/core";
import Page from "components/Page";
import DialogList from "./Items/DialogList";
import Chat from "./Items/Chat";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100%",
  },
  chatSection: {
    width: "100%",
    height: "100%",
  },
  borderRight500: {
    borderRight: "1px solid rgba(255, 255, 255, 0.12)",
  },
}));

const ChatView = () => {
  const classes = useStyles();

  const [selectedDialog, setSelectedDialog] = useState(0);

  const selectDialog = (dialog) => {
    setSelectedDialog(dialog);
  };

  return (
    <Page className={classes.root} title="Chat">
      <Container maxWidth="xl">
        <Card>
          <CardContent>
            <Grid container className={classes.chatSection} spacing={3}>
              <Grid item md={3} xs={12} className={classes.borderRight500}>
                <DialogList selectDialog={selectDialog} />
              </Grid>
              <Grid item md={9} xs={12}>
                <Chat selectedDialog={selectedDialog} />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Container>
    </Page>
  );
};

export default ChatView;
