import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
  Box,
} from "@material-ui/core";
import ErrorIcon from "@material-ui/icons/Error";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";

const AlertIcon = ({ type }) => {
  switch (type) {
    case "info":
      return <CheckCircleIcon fontSize="large" />;
    case "success":
      return <CheckCircleIcon fontSize="large" />;
    case "error":
      return <ErrorIcon fontSize="large" />;
    default:
      return <CheckCircleIcon fontSize="large" />;
  }
};

const AlertTemplate = ({ style, options, message, close }) => (
  <Dialog
    open={true}
    onClose={close}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
  >
    <DialogTitle id="alert-dialog-title">
      <Box display="flex" justifyContent="center">
        <AlertIcon type={options.type} />
      </Box>
    </DialogTitle>
    <DialogContent textAlign="center">
      <DialogContentText textAlign="center">
        <Typography align="center" variant="body1">
          {message}
        </Typography>
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={close} color="primary">
        Ok
      </Button>
    </DialogActions>
  </Dialog>
);

export default AlertTemplate;
