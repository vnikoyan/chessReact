import React from "react";
import PropTypes from "prop-types";
import {
  Box,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  makeStyles,
  Grid,
  Button,
} from "@material-ui/core";
import { Search as SearchIcon } from "react-feather";
import { useNavigate } from "react-router-dom";
import AddStudent from "./AddStudent";
import { useTranslation } from "react-i18next";
import GroupIcon from "@mui/icons-material/Group";
import BarChartIcon from "@mui/icons-material/BarChart";

const useStyles = makeStyles((theme) => ({
  content: {
    paddingBottom: "16px !important",
  },
}));

const Toolbar = ({ className, ...rest }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const classes = useStyles();

  return (
    <Card>
      <CardContent className={classes.content}>
        <Grid
          container
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
        >
          <Grid item>
            <Box>
              <Grid container spacing={3}>
                <Grid item>
                  <Button
                    color="secondary"
                    size="medium"
                    variant="outlined"
                    fullWidth={false}
                    onClick={() => navigate("/coach/students/groups")}
                    endIcon={<GroupIcon fontSize="small" />}
                  >
                    {t("coach.students.student_groups")}
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    color="secondary"
                    size="medium"
                    variant="outlined"
                    fullWidth={false}
                    onClick={() => navigate("/coach/students/statistics")}
                    endIcon={<BarChartIcon fontSize="small" />}
                  >
                    Student Statistics
                  </Button>
                </Grid>
              </Grid>
              {/* <TextField
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SvgIcon fontSize="small" color="action">
                        <SearchIcon />
                      </SvgIcon>
                    </InputAdornment>
                  ),
                }}
                placeholder={t("coach.students.search_student")}
                variant="outlined"
              /> */}
            </Box>
          </Grid>
          <Grid item>
            <Box display="flex" justifyContent="flex-end">
              <AddStudent />
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

Toolbar.propTypes = {
  className: PropTypes.string,
};

export default Toolbar;
