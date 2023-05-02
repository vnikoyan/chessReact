import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import {
  Grid,
  FormHelperText,
  TextField,
  Typography,
  makeStyles,
  MenuItem,
  NativeSelect,
  FormControlLabel,
  Switch,
  Fab,
  Tooltip,
} from "@material-ui/core";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import BootstrapInput from "components/Forms/BootstrapInput";
import AddIcon from "@material-ui/icons/Add";
import { Capitalize } from "utils/helpers";

const useStyles = makeStyles({
  root: {},
  option: {
    fontWeight: "bold",
  },
});

const ProblemBlock = ({
  handleSaveProblem,
  isLast,
  index,
  handleAddProblem,
  currentCategory,
}) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const {
    allCategoriesList,
    categoriesList,
    allCategoriesLoading,
    categoriesLoading,
  } = useSelector((state) => state.coach);
  const { difficulty } = useSelector((state) => state.common);
  const [category, setCategory] = useState(0);
  const [count, setCount] = useState("");
  const [range, setRange] = useState(null);
  const [rangeTo, setRangeTo] = useState("");
  const [rangeFrom, setRangeFrom] = useState("");
  const [random, setRandom] = useState(false);
  const [level, setLevel] = useState(1);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (currentCategory && Object.keys(currentCategory).length) {
      setCategory(currentCategory.id);
      setCount(currentCategory.count);
      range === null &&
        setRange(Boolean(currentCategory.rangeTo || currentCategory.rangeFrom));
      setRangeTo(currentCategory.rangeTo);
      setRangeFrom(currentCategory.rangeFrom);
      setRandom(Boolean(currentCategory.random));
      setLevel(currentCategory.level);
    }
  }, [currentCategory]);

  const handleChange = (key, value) => {
    console.log(range);
    let categoryObj = {
      id: category,
      count,
      rangeFrom,
      range,
      rangeTo,
      random,
      level,
    };
    categoryObj[key] = value;
    handleSaveProblem(index, categoryObj);
  };

  const handleSubmit = () => {
    let schemaWithoutRange = Yup.object().shape({
      category: Yup.number()
        .required()
        .min(1, t("coach.trainings.add_edit.category_required")),
      level: Yup.number().required(),
    });
    let schemaWithRange = Yup.object().shape({
      category: Yup.number()
        .required()
        .min(1, t("coach.trainings.add_edit.category_required")),
      rangeFrom: Yup.string().required(
        t("coach.trainings.add_edit.range_from_required")
      ),
      rangeTo: Yup.string().required(
        t("coach.trainings.add_edit.range_to_required")
      ),
      level: Yup.number().required(),
    });
    let schema = range ? schemaWithRange : schemaWithoutRange;
    schema
      .validate({ category, count, rangeTo, rangeFrom, level })
      .then(function (valid) {
        let categoryObj = {
          id: category,
          count,
          rangeFrom,
          rangeTo,
          random,
          level,
        };
        handleAddProblem(index, categoryObj);
        setError(false);
      })
      .catch((err) => {
        setError(err.errors[0]);
      });
  };

  return (
    <Grid container spacing={3} justifyContent="space-between">
      <Grid item container sm={4} spacing={0}>
        <Grid container item xs={6}>
          <Typography gutterBottom variant="body2">
            {t("coach.trainings.add_edit.category")}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <NativeSelect
            value={category}
            onChange={(event) => {
              setCategory(event.target.value);
              handleChange("id", event.target.value);
            }}
            variant="outlined"
            fullWidth
            name="category"
            input={<BootstrapInput />}
            inputProps={{
              id: "name-native-error",
            }}
          >
            <option value={0} disabled>
              {t("coach.trainings.add_edit.select_category")}
            </option>
            {categoriesLoading && categoriesList.length === 0 ? (
              <option>{t("coach.trainings.add_edit.loading")}</option>
            ) : (
              categoriesList.map((category, index) => (
                <React.Fragment key={index}>
                  {category.subcategories.length ? (
                    <optgroup
                      key={category.category.id}
                      label={category.category.name}
                    >
                      {category.subcategories.map((subCategory) => (
                        <option
                          key={subCategory.id}
                          value={subCategory.id}
                          disabled={!Boolean(subCategory.tasks)}
                        >
                          {subCategory.name} ({subCategory.tasks})
                        </option>
                      ))}
                    </optgroup>
                  ) : (
                    <option
                      className={classes.option}
                      key={category.category.id}
                      value={category.category.id}
                      disabled={!Boolean(category.category.tasks)}
                    >
                      {category.category.name} ({category.category.tasks})
                    </option>
                  )}
                </React.Fragment>
              ))
            )}
            <optgroup label="VIP Base">
              {allCategoriesLoading && allCategoriesList.length === 0 ? (
                <option>Loading...</option>
              ) : (
                allCategoriesList.map((category, index) => (
                  <React.Fragment key={index}>
                    <option
                      className={classes.option}
                      key={category.category.id}
                      value={category.category.id}
                      disabled={!Boolean(category.category.tasks)}
                    >
                      {category.category.name} ({category.category.tasks})
                    </option>
                    {category.subcategories.map((subCategory) => (
                      <option
                        key={subCategory.id}
                        value={subCategory.id}
                        disabled={!Boolean(subCategory.tasks)}
                      >
                        {subCategory.name} ({subCategory.tasks})
                      </option>
                    ))}
                  </React.Fragment>
                ))
              )}
            </optgroup>
          </NativeSelect>
        </Grid>
      </Grid>
      <Grid item container sm={4} spacing={0}>
        <Grid container item xs={6}>
          <Typography gutterBottom variant="body2">
            {t("coach.trainings.add_edit.number_problems")}
          </Typography>
        </Grid>
        <Grid container item xs={6} justifyContent="flex-end">
          <FormControlLabel
            control={
              <Switch
                checked={range}
                onChange={() => setRange(!range)}
                color="primary"
                name="checkedA"
                size="small"
                inputProps={{ "aria-label": "primary checkbox" }}
              />
            }
            label={t("coach.trainings.add_edit.range")}
            style={{ margin: 0 }}
          />
        </Grid>
        <Grid item xs={12}>
          {range ? (
            <Grid container justifyContent="space-between" spacing={3}>
              <Grid item xs={6}>
                <TextField
                  type="number"
                  fullWidth
                  name="moves"
                  placeholder={t("coach.trainings.add_edit.from")}
                  onChange={(event) => {
                    setRangeFrom(event.target.value);
                    handleChange("rangeFrom", event.target.value);
                  }}
                  value={rangeFrom}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  type="number"
                  name="moves"
                  placeholder={t("coach.trainings.add_edit.to")}
                  onChange={(event) => {
                    setRangeTo(event.target.value);
                    handleChange("rangeTo", event.target.value);
                  }}
                  value={rangeTo}
                  variant="outlined"
                />
              </Grid>
            </Grid>
          ) : (
            <TextField
              fullWidth
              type="number"
              name="moves"
              placeholder={t("coach.trainings.add_edit.all")}
              onChange={(event) => {
                setCount(event.target.value);
                handleChange("count", event.target.value);
              }}
              value={count}
              variant="outlined"
            />
          )}
        </Grid>
      </Grid>
      <Grid item container sm={3} spacing={0}>
        <Grid container item xs={6}>
          <Typography gutterBottom variant="body2">
            {t("coach.trainings.add_edit.difficulty_level")}
          </Typography>
        </Grid>
        <Grid container item xs={6} justifyContent="flex-end">
          <FormControlLabel
            control={
              <Switch
                checked={random}
                onChange={() => {
                  setRandom(!random);
                  handleChange("random", !random);
                }}
                color="primary"
                name="checkedA"
                size="small"
                inputProps={{ "aria-label": "primary checkbox" }}
              />
            }
            label={t("coach.trainings.add_edit.mix_problems")}
            style={{ margin: 0 }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            select
            name="level"
            value={level}
            onChange={(event) => {
              setLevel(event.target.value);
              handleChange("level", event.target.value);
            }}
            variant="outlined"
          >
            {difficulty.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
      </Grid>
      <Grid
        item
        container
        sm={1}
        spacing={0}
        justifyContent="center"
        alignItems="flex-end"
      >
        {isLast && (
          <Tooltip
            arrow
            placement="top"
            title={t("coach.trainings.add_edit.add_another_block")}
          >
            <Fab onClick={handleSubmit} color="primary" aria-label="add">
              <AddIcon />
            </Fab>
          </Tooltip>
        )}
      </Grid>
      <Grid item xs={12}>
        {Boolean(error) && (
          <FormHelperText error>{Capitalize(error)}</FormHelperText>
        )}
      </Grid>
    </Grid>
  );
};

export default ProblemBlock;
