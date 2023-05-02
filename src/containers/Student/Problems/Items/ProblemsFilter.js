import React, { useState } from "react";
import clsx from "clsx";
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
  useTheme,
  Chip,
  CardActions,
  Button,
} from "@material-ui/core";
import BootstrapInput from "components/Forms/BootstrapInput";
import { problems } from "modules/student/actions";
import { useAction } from "utils/hooks";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

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

const movesList = [1, 2, 3, 4, 5];

const ProblemsFilter = ({ className, ...rest }) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const [moves, setMoves] = useState([]);
  const [complexity, setComplexity] = useState([]);
  const theme = useTheme();
  const getPublicProblems = useAction(problems.request);
  const level = [
    { value: "junior", label: t("student.problems.low") },
    { value: "middle", label: t("student.problems.middle") },
    { value: "senior", label: t("student.problems.high") },
  ];
  const { publicProblems } = useSelector((state) => state.student);
  const handleChangeMoves = (event) => {
    setMoves(event.target.value);
  };

  const handleChangeComplexity = (event) => {
    setComplexity(event.target.value);
  };

  const handleApplyFilters = () => {
    const levelArray = complexity.map((item) => item.value);
    getPublicProblems({
      page: publicProblems.currentPage,
      level: levelArray,
      moves: moves,
    });
  };

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardHeader
        title={t("student.problems.search_problems")}
        subheaderTypographyProps={{ style: { fontSize: 14 } }}
      />
      <Divider />
      <CardContent>
        <Box mb={1}>
          <FormControl fullWidth className={classes.formControl}>
            <Typography gutterBottom variant="body2">
              {t("student.problems.number_moves")}
            </Typography>
            <Select
              multiple
              autoWidth
              variant="outlined"
              value={moves}
              onChange={handleChangeMoves}
              input={<BootstrapInput id="select-multiple-category" />}
              renderValue={(selected) => (
                <div className={classes.chips}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} className={classes.chip} />
                  ))}
                </div>
              )}
              MenuProps={MenuProps}
            >
              {movesList.map((name) => (
                <MenuItem
                  key={name}
                  value={name}
                  style={getStyles(name, moves, theme)}
                >
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Box mb={1}>
          <FormControl fullWidth className={classes.formControl}>
            <Typography gutterBottom variant="body2">
              {t("student.problems.complexity")}
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
                  {selected.map((value, index) => (
                    <Chip
                      key={index}
                      label={value.label}
                      className={classes.chip}
                    />
                  ))}
                </div>
              )}
              MenuProps={MenuProps}
            >
              {level.map((lvl) => (
                <MenuItem
                  key={lvl.value}
                  value={lvl}
                  style={getStyles(lvl, complexity, theme)}
                >
                  {lvl.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </CardContent>
      <CardActions className="p-3">
        <Button
          color="primary"
          size="large"
          variant="contained"
          fullWidth={false}
          onClick={handleApplyFilters}
        >
          {t("student.problems.filter_problems")}
        </Button>
      </CardActions>
    </Card>
  );
};

ProblemsFilter.propTypes = {
  className: PropTypes.string,
};

export default ProblemsFilter;
