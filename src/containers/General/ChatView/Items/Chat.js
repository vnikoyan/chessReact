import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { useTranslation } from "react-i18next";
import {
  Grid,
  Divider,
  TextField,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  Fab,
  Button,
  InputAdornment,
} from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import { messages, send } from "modules/chat/actions";
import { useAction } from "utils/hooks";
import Picker from "emoji-picker-react";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import parse from "html-react-parser";
import { MessageBox } from "react-chat-elements";

const useStyles = makeStyles((theme) => ({
  root: {},
  messageArea: {
    height: "60vh",
    overflowY: "auto",
  },
  emptyMessageArea: {
    height: "100%",
  },
  emptyMessageMessage: {
    color: "white !important",
  },
  emojiPickerBlock: {
    position: "relative",
  },
  emojiPicker: {
    position: "absolute",
    bottom: 55,
    right: 0,
    zIndex: 1,
  },
  emojiToggler: {
    cursor: "pointer",
    alignItems: "center",
    display: "flex",
    "&:hover": {
      color: theme.palette.primary.main,
    },
  },
  myMessageBox: {
    "& *": {
      color: "white",
    },
    "& div": {
      backgroundColor: "#595959",
      boxShadow: "none",
    },
    "& svg": {
      filter:
        "invert(66%) saturate(1710%) hue-rotate(331deg) brightness(95%) contrast(86%)",
    },
  },
  messageBox: {
    "& *": {
      color: "white",
    },
    "& div": {
      backgroundColor: "#F57C00",
      boxShadow: "none",
    },
    "& .rce-mbox-left-notch": {
      filter:
        "invert(40%) sepia(74%) saturate(4435%) hue-rotate(7deg) brightness(102%) contrast(104%)",
    },
  },
}));

const Chat = ({ selectedDialog }) => {
  const { t } = useTranslation();
  const chatContainer = useRef();
  const classes = useStyles();
  const getMessages = useAction(messages.request);
  const sendMessages = useAction(send.request);
  const [message, setMessage] = useState("");
  const { user } = useSelector((state) => state.auth);
  const { chatMessages } = useSelector((state) => state.chat);
  const [pickerVisible, setPickerVisible] = useState(false);

  useEffect(() => {
    scrollToMyRef();
  }, [chatMessages]);

  useEffect(() => {
    if (Boolean(selectedDialog)) {
      getMessages(selectedDialog.id);
    }
  }, [selectedDialog, getMessages]);

  const handleSendMessage = () => {
    const data = {
      ids: [selectedDialog.userId],
      name: "name",
      message: message,
      attachments: {},
      dialogID: selectedDialog.id,
    };
    sendMessages(data);
    setMessage("");
    scrollToMyRef();
  };

  const onEmojiClick = (event, emojiObject) => {
    setMessage(message + emojiObject.emoji);
  };

  const scrollToMyRef = () => {
    if (chatContainer.current) {
      const scroll =
        chatContainer.current.scrollHeight - chatContainer.current.clientHeight;
      chatContainer.current.scrollTo(0, scroll);
    }
  };

  return (
    <>
      {!Boolean(selectedDialog) ? (
        <>
          <List className={classes.messageArea}>
            <Grid
              className={classes.emptyMessageArea}
              container
              alignItems="center"
              justifyContent="center"
            >
              <Grid item>
                <Button
                  className={classes.emptyMessageMessage}
                  variant="contained"
                  disabled
                >
                  {t("chat.select_chat")}
                </Button>
              </Grid>
            </Grid>
          </List>
        </>
      ) : (
        <>
          <List>
            <ListItem button key={selectedDialog.name}>
              <ListItemIcon>
                <Avatar alt={selectedDialog.name} src={selectedDialog.photo} />
              </ListItemIcon>
              <ListItemText primary={selectedDialog.name}></ListItemText>
            </ListItem>
          </List>
          <Divider />
          <List ref={chatContainer} className={classes.messageArea}>
            {chatMessages.map((message) => (
              <ListItem key={message.id}>
                <Grid container>
                  <Grid item xs={12}>
                    {message.owner.id === user.id ? (
                      <MessageBox
                        position={"right"}
                        type={"text"}
                        titleColor="black"
                        text={parse(message.message)}
                        date={new Date(message.createdAt)}
                        className={classes.myMessageBox}
                      />
                    ) : (
                      <MessageBox
                        position={"legt"}
                        type={"text"}
                        text={parse(message.message)}
                        date={new Date(message.createdAt)}
                        className={classes.messageBox}
                        status="read"
                      />
                    )}
                  </Grid>
                </Grid>
              </ListItem>
            ))}
          </List>
          <Divider />
          <Grid container style={{ padding: "20px" }}>
            <Grid
              className={classes.emojiPickerBlock}
              item
              container
              md={11}
              xs={10}
            >
              <TextField
                variant="outlined"
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                autoFocus
                label={t("form_inputs.type_something")}
                fullWidth
                onKeyPress={(ev) => {
                  if (ev.key === "Enter") {
                    handleSendMessage();
                    ev.preventDefault();
                  }
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="start">
                      <div
                        onClick={() => {
                          setPickerVisible(!pickerVisible);
                        }}
                        className={classes.emojiToggler}
                      >
                        <InsertEmoticonIcon />
                      </div>
                      {pickerVisible ? (
                        <div className={classes.emojiPicker}>
                          <Picker
                            disableSearchBar
                            disableSkinTonePicker
                            onEmojiClick={onEmojiClick}
                          />
                        </div>
                      ) : null}
                    </InputAdornment>
                  ),
                }}
              ></TextField>
            </Grid>
            <Grid item md={1} xs={2} align="right">
              <Fab onClick={handleSendMessage} color="primary" aria-label="add">
                <SendIcon />
              </Fab>
            </Grid>
          </Grid>
        </>
      )}
    </>
  );
};

Chat.propTypes = {
  className: PropTypes.string,
};

export default Chat;
