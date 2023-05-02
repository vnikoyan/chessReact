import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/styles";
import {
  Box,
  Divider,
  FormHelperText,
  Typography,
  Chip,
} from "@material-ui/core";
import * as Yup from "yup";
import { useSelector } from "react-redux";
import { request, groups, student } from "modules/coach/actions";
import { useAction } from "utils/hooks";
import { Capitalize } from "utils/helpers";
import MyAlert from "components/Alert";
import SendIcon from "@material-ui/icons/Send";
import { send } from "modules/chat/actions";
import { useTranslation } from "react-i18next";
import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import BootstrapInput from "components/Forms/BootstrapInput";
import AddIcon from "@material-ui/icons/Add";

const useStyles = makeStyles((theme) => ({
  dialogFooter: {
    padding: 0,
    marginTop: 30,
    marginBottom: 10,
  },
  icon: {
    cursor: "pointer",
    "&:hover": {
      color: theme.palette.primary.main,
    },
  },
}));

function getStyles(name, category, theme) {
  return {
    fontWeight:
      category.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: 48 * 4.5 + 8,
      width: 250,
    },
  },
};

export default function AddToGroup({
  currentStudent,
  userName,
  handleClickOpen,
  handleClose,
}) {
  const { t } = useTranslation();
  const theme = useTheme();
  const [group, setGroup] = useState([]);
  const [error, setError] = useState(false);
  const classes = useStyles();
  const setStudentsGroup = useAction(student.setGroup);
  const { groupsList } = useSelector((state) => state.coach);
  const getGroups = useAction(groups.request);

  useEffect(() => {
    getGroups();
  }, [getGroups]);

  useEffect(() => {
    if (currentStudent.group) {
      setGroup(currentStudent.group.map((i) => i.id));
    }
  }, [currentStudent]);

  const handleAddToGroup = () => {
    setStudentsGroup({
      student_id: currentStudent.id,
      group_id: group,
    });
    setGroup([]);
  };

  const handleSubmit = () => {
    let schema = Yup.array().required();
    schema
      .validate(group)
      .then(function (valid) {
        handleAddToGroup();
        setError(false);
        handleClose(false);
      })
      .catch((err) => {
        setError(err.errors[0]);
      });
  };

  return (
    <>
      <Dialog
        open
        fullWidth
        maxWidth="xs"
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle disableTypography id="form-dialog-title">
          <Typography variant="h4">
            {t("coach.students.add")} {userName} {t("coach.students.to_group")}
          </Typography>
        </DialogTitle>
        <Divider />
        <DialogContent>
          <Box my={3}>
            <FormControl sx={{ width: "100%" }}>
              <InputLabel id="demo-multiple-name-label">Group</InputLabel>
              <Select
                labelid="demo-multiple-name-label"
                id="demo-multiple-name"
                fullWidth
                multiple
                value={group}
                onChange={(event) => setGroup(event.target.value)}
                input={<OutlinedInput label="Group" />}
                MenuProps={MenuProps}
              >
                {groupsList.map((group) => (
                  <MenuItem
                    key={group.id}
                    value={group.id}
                    style={getStyles(group, groupsList, theme)}
                  >
                    {group.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {Boolean(error) && (
              <FormHelperText error>{Capitalize(error)}</FormHelperText>
            )}
          </Box>
          <DialogActions className={classes.dialogFooter} disableSpacing>
            <Button
              onClick={handleSubmit}
              variant="contained"
              color="primary"
              endIcon={<AddIcon fontSize="small" />}
            >
              {t("coach.students.add")}
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </>
  );
}
