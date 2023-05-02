import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/styles";
import { Avatar, Box, Divider, Grid, Checkbox } from "@material-ui/core";
import { useSelector } from "react-redux";
import { useAction } from "utils/hooks";
import { Typography } from "@material-ui/core";
import { Switch, FormControlLabel } from "@material-ui/core";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import { useNavigate } from "react-router";
import { problems } from "modules/student/actions";
import { SERVER_URL } from "configs";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles((theme) => ({
  dialogFooter: {
    padding: 0,
    marginTop: 30,
    marginBottom: 10,
    justifyContent: "center",
  },
  avatar: {
    width: 200,
    height: 200,
  },
  categoryItem: {
    marginBottom: -5,
    marginLeft: 0,
  },
}));

export default function SelectTraining({ setProblems }) {
  const [open, setOpen] = useState(true);
  const classes = useStyles();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { categoriesList } = useSelector((state) => state.student);
  const getSelfProblems = useAction(problems.requestSelf);
  const getRandomProblems = useAction(problems.requestRandom);
  const [shuffle, setShuffle] = useState(false);
  const [chooseTopic, setChooseTopic] = useState(false);
  const [useVip, setUseVip] = useState(false);
  const [topicsArray, setTopicsArray] = useState([]);
  const [state] = useState();

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    if (chooseTopic) {
      getSelfProblems(topicsArray);
    } else {
      getRandomProblems();
    }
    handleClose();
  };

  const handleAddTopic = (id) => {
    setTopicsArray([...topicsArray, id]);
  };

  return (
    <Dialog open={open} aria-labelledby="form-dialog-title">
      <DialogTitle disableTypography id="form-dialog-title">
        <Typography variant="h4" align="center">
          <Button
            endIcon={<PlayCircleFilledIcon />}
            onClick={handleSubmit}
            variant="contained"
            color="primary"
          >
            {t("trainings.play.start_training")}
          </Button>
        </Typography>
      </DialogTitle>
      <Divider />
      <DialogContent>
        <Box py={3}>
          <Grid spacing={1} alignItems="center" container direction="column">
            <Grid xs={8} justifyContent="center" item container>
              <Avatar
                className={classes.avatar}
                src={`${SERVER_URL}storage/planchette.png`}
              />
            </Grid>
            <Grid xs={8} item>
              <Typography variant="h4" align="center">
                {t("student.self.education")}
              </Typography>
            </Grid>
            <Grid xs={8} item container>
              <Typography variant="body1" align="left">
                {t("student.self.description")}
              </Typography>
            </Grid>
            <Grid xs={8} item align="left" container>
              <FormControlLabel
                control={
                  <Switch
                    checked={shuffle}
                    onChange={() => setShuffle(!shuffle)}
                    color="primary"
                    name="checkedA"
                    inputProps={{ "aria-label": "primary checkbox" }}
                  />
                }
                label={t("student.self.shuffle")}
                style={{ margin: 0 }}
              />
            </Grid>
            <Grid xs={8} item container>
              <FormControlLabel
                control={
                  <Switch
                    checked={chooseTopic}
                    onChange={() => setChooseTopic(!chooseTopic)}
                    color="primary"
                    name="checkedA"
                    inputProps={{ "aria-label": "primary checkbox" }}
                  />
                }
                label={t("student.self.choose_topic")}
                style={{ margin: 0 }}
              />
            </Grid>
            {chooseTopic && (
              <Grid xs={8} item container>
                <Grid item container direction="column">
                  <Divider />
                  <Box mt={1}>
                    {categoriesList.myCategories.map(
                      (category, categoryIndex) => (
                        <Grid item key={categoryIndex}>
                          <FormControlLabel
                            className={classes.categoryItem}
                            control={
                              <Checkbox
                                checked={state}
                                onChange={() => handleAddTopic(category.id)}
                                color="primary"
                                name={`category_${category.name}`}
                                size="small"
                              />
                            }
                            label={category.name}
                          />
                        </Grid>
                      )
                    )}
                  </Box>
                </Grid>
                <Grid xs={12} item container>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={useVip}
                        onChange={() => setUseVip(!useVip)}
                        color="primary"
                        name="checkedA"
                        inputProps={{ "aria-label": "primary checkbox" }}
                      />
                    }
                    label={t("student.self.use_vip")}
                    style={{ margin: 0 }}
                  />
                </Grid>
                {useVip && (
                  <Grid xs={12} item container direction="column">
                    {categoriesList.publicCategories.map(
                      (category, categoryIndex) => (
                        <Grid item key={categoryIndex}>
                          <FormControlLabel
                            className={classes.categoryItem}
                            control={
                              <Checkbox
                                checked={state}
                                onChange={() => handleAddTopic(category.id)}
                                color="primary"
                                name="showHints"
                                size="small"
                              />
                            }
                            label={category.name}
                          />
                        </Grid>
                      )
                    )}
                  </Grid>
                )}
                <Grid item container direction="column">
                  <Box mt={2}>
                    <Divider />
                  </Box>
                </Grid>
              </Grid>
            )}
          </Grid>
        </Box>
        <DialogActions className={classes.dialogFooter} disableSpacing>
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            direction="column"
            spacing={2}
          >
            <Grid item container xs={6}>
              <Button
                onClick={() => navigate(`/student/dashboard`)}
                startIcon={<KeyboardBackspaceIcon />}
                variant="outlined"
                color="primary"
              >
                {t("trainings.play.back_to_cabinet")}
              </Button>
            </Grid>
          </Grid>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
}
