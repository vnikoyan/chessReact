import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  Box,
  Card,
  CardHeader,
  Divider,
  makeStyles,
  CardContent,
  Typography,
  FormControl,
  Select,
  MenuItem,
  Checkbox,
  useTheme,
  Chip,
  FormControlLabel,
  Button,
  AppBar,
  Tab,
  Tabs,
  Grid,
  TextField,
} from "@material-ui/core";
import BootstrapInput from "components/Forms/BootstrapInput";
import SearchIcon from "@material-ui/icons/Search";
import { useTranslation } from "react-i18next";
import { categories } from "modules/coach/actions";
import { useAction } from "utils/hooks";

import { useSelector } from "react-redux";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: 120,
    // width: '100%',
  },
  chips: {
    display: "flex",
    flexWrap: "wrap",
  },
  chip: {
    margin: 2,
  },
  noLabel: {
    marginTop: theme.spacing(3),
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

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const ProblemsFilter = ({
  category,
  setCategory,
  complexity,
  setComplexity,
  favorite,
  setFavorite,
  problemId,
  setproblemId,
  handleSearchByID,
}) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const { categoriesList, categoriesLoading } = useSelector(
    (state) => state.coach
  );
  const getCategories = useAction(categories.request);
  const { difficulty } = useSelector((state) => state.common);
  const [value, setValue] = useState(0);
  const theme = useTheme();

  useEffect(() => {
    getCategories();
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    // setCategory([]);
    // setComplexity([]);
    // setFavorite(false);
  };

  const handleChangeCategory = (event) => {
    setCategory(event.target.value);
  };

  const handleChangeComplexity = (event) => {
    setComplexity(event.target.value);
  };

  const handleChangeFavorite = (event) => {
    setFavorite(!favorite);
  };

  return (
    <Card>
      <CardHeader
        title={t("coach.problems.search_problems")}
        subheaderTypographyProps={{ style: { fontSize: 14 } }}
      />
      <Divider />
      <CardContent>
        <AppBar position="static" color="primary">
          <Tabs
            value={value}
            onChange={handleChange}
            variant="fullWidth"
            aria-label="simple tabs example"
          >
            <Tab
              label={t("coach.problems.search_by_filters")}
              {...a11yProps(0)}
            />
            <Tab
              label={t("coach.problems.search_by_problem")}
              {...a11yProps(1)}
            />
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
          {/* <Box mb={1}>
            <FormControl fullWidth className={classes.formControl}>
              <Typography gutterBottom variant="body2">
                {t("form_inputs.category")}
              </Typography>
              <Select
                multiple
                autoWidth
                variant="outlined"
                value={category}
                onChange={handleChangeCategory}
                input={<BootstrapInput id="select-multiple-category" />}
                renderValue={(selected) => (
                  <div className={classes.chips}>
                    {selected.map((value) => (
                      <Chip
                        key={value.id}
                        label={value.name}
                        className={classes.chip}
                      />
                    ))}
                  </div>
                )}
                MenuProps={MenuProps}
              >
                {categoriesLoading && categoriesList.length === 0 ? (
                  <option>Loading...</option>
                ) : (
                  <>
                    {categoriesList.map((categoryItem, index) => (
                      <MenuItem
                        key={index}
                        value={categoryItem.category}
                        style={getStyles(
                          categoryItem.category,
                          complexity,
                          theme
                        )}
                      >
                        {categoryItem.category.name}
                      </MenuItem>
                    ))}
                    {categoriesList.map((categoryItem) =>
                      categoryItem.subcategories.map((subcategoryItem) => (
                        <MenuItem
                          key={subcategoryItem.id}
                          value={subcategoryItem}
                          style={getStyles(subcategoryItem, category, theme)}
                        >
                          {subcategoryItem.name}
                        </MenuItem>
                      ))
                    )}
                  </>
                )}
              </Select>
            </FormControl>
          </Box> */}
          <Box>
            <FormControl fullWidth className={classes.formControl}>
              <Typography gutterBottom variant="body2">
                {t("form_inputs.complexity")}
              </Typography>
              <Select
                multiple
                autoWidth
                variant="outlined"
                value={complexity}
                onChange={handleChangeComplexity}
                input={<BootstrapInput id="select-multiple-complexity" />}
                renderValue={(selected) => (
                  <div className={classes.chips}>
                    {selected.map((value) => (
                      <Chip
                        key={value.value}
                        label={value.label}
                        className={classes.chip}
                      />
                    ))}
                  </div>
                )}
                MenuProps={MenuProps}
              >
                {difficulty.map((level) => (
                  <MenuItem
                    key={level.value}
                    value={level}
                    style={getStyles(level, complexity, theme)}
                  >
                    {level.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box>
            <FormControlLabel
              control={
                <Checkbox
                  checked={favorite}
                  onChange={handleChangeFavorite}
                  name="checkedB"
                  color="primary"
                />
              }
              label={t("coach.problems.favorites_problems")}
            />
          </Box>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={6}>
              <TextField
                fullWidth
                label={t("form_inputs.problem_id")}
                type="number"
                name="code"
                onChange={(event) => setproblemId(event.target.value)}
                value={problemId}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={6}>
              <Button
                onClick={handleSearchByID}
                disabled={!problemId}
                endIcon={<SearchIcon />}
                size="large"
                variant="contained"
                color="primary"
                fullWidth
              >
                {t("coach.problems.search")}
              </Button>
            </Grid>
          </Grid>
        </TabPanel>
      </CardContent>
    </Card>
  );
};

ProblemsFilter.propTypes = {
  className: PropTypes.string,
};

export default ProblemsFilter;
