import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/styles";
import { Divider } from "@material-ui/core";
import {
  Typography,
  Select,
  MenuItem,
  useTheme,
  Chip,
} from "@material-ui/core";
import { useSelector } from "react-redux";
import { categories as categoriesActions } from "modules/coach/actions";
import { useAction } from "utils/hooks";
import CloudDownloadIcon from "@material-ui/icons/CloudDownload";
import BootstrapInput from "components/Forms/BootstrapInput";
import { generateFileURI } from "utils/helpers";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles((theme) => ({
  dialogFooter: {
    padding: 0,
    marginTop: 30,
    marginBottom: 10,
  },
  exportDialog: {
    minWidth: 300,
    paddingTop: 24,
  },
  chip: {
    margin: 2,
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

export default function ExportCategories() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  const { categoriesList, categoriesData } = useSelector(
    (state) => state.coach
  );
  const getCategoriesData = useAction(categoriesActions.data);
  const [categories, setCategories] = useState([]);
  const theme = useTheme();

  useEffect(() => {
    if (categoriesData) {
      const data = new Date().toLocaleString();
      generateFileURI(`${data}.proxoft`, categoriesData);
    }
  }, [categoriesData]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCategories([]);
  };

  const handleChangeCategory = (event) => {
    setCategories(event.target.value);
  };

  const handleExport = () => {
    if (categories.length) {
      getCategoriesData(categories);
      handleClose();
    }
  };

  return (
    <>
      <Button
        color="primary"
        size="medium"
        variant="outlined"
        onClick={handleClickOpen}
        endIcon={<CloudDownloadIcon fontSize="small" />}
      >
        {t("coach.problems.categories.export")}
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle disableTypography id="form-dialog-title">
          <Typography component="span" variant="h4">
            {t("coach.problems.categories.export")}{" "}
            <Typography component="span" color="primary" variant="h4">
              proxoft{" "}
            </Typography>
            {t("coach.problems.categories.file")}
          </Typography>
        </DialogTitle>
        <Divider />
        <DialogContent className={classes.exportDialog}>
          <Select
            multiple
            fullWidth
            variant="outlined"
            value={categories}
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
            {categoriesList.map((categoryItem, index) => (
              <MenuItem
                key={index}
                value={categoryItem.category}
                style={getStyles(categoryItem.category, categories, theme)}
              >
                {categoryItem.category.name}
              </MenuItem>
            ))}
            {categoriesList.map((categoryItem) =>
              categoryItem.subcategories.map((subcategoryItem) => (
                <MenuItem
                  key={subcategoryItem.id}
                  value={subcategoryItem}
                  style={getStyles(subcategoryItem, categories, theme)}
                >
                  {subcategoryItem.name}
                </MenuItem>
              ))
            )}
          </Select>
          <DialogActions className={classes.dialogFooter} disableSpacing>
            <Button onClick={handleExport} variant="contained" color="primary">
              {t("coach.problems.categories.export")}
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </>
  );
}
