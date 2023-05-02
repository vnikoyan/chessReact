import React, { useState } from "react";
import { useSelector } from "react-redux";
import DeleteIcon from "@material-ui/icons/Delete";
import { categories } from "modules/coach/actions";
import { useAction } from "utils/hooks";
import { useTranslation } from "react-i18next";
import EditCategories from "./Items/EditCategories";
import MyAlert from "components/Alert";
import TreeItem from "@material-ui/lab/TreeItem";
import TreeView from "@material-ui/lab/TreeView";
import { Typography, makeStyles, Tooltip } from "@material-ui/core";
import Label from "@material-ui/icons/Label";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import EditIcon from "@material-ui/icons/Edit";

const useTreeItemStyles = makeStyles((theme) => ({
  root: {
    color: theme.palette.text.secondary,
    "&:hover > $content": {
      backgroundColor: theme.palette.primary,
    },
    "&:focus > $content, &$selected > $content": {
      backgroundColor: `var(--tree-view-bg-color, ${theme.palette.primary})`,
      color: "var(--tree-view-color)",
    },
    "&:focus > $content $label, &:hover > $content $label, &$selected > $content $label": {
      backgroundColor: "transparent",
    },
  },
  content: {
    color: theme.palette.text.secondary,
    borderTopRightRadius: theme.spacing(2),
    borderBottomRightRadius: theme.spacing(2),
    paddingRight: theme.spacing(1),
    fontWeight: theme.typography.fontWeightMedium,
    "$expanded > &": {
      fontWeight: theme.typography.fontWeightRegular,
    },
  },
  group: {
    marginLeft: 0,
    "& $content": {
      paddingLeft: theme.spacing(2),
    },
  },
  expanded: {},
  selected: {},
  label: {
    fontWeight: "inherit",
    color: "inherit",
  },
  labelRoot: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0.5, 0),
  },
  labelIcon: {
    marginRight: theme.spacing(1),
  },
  labelText: {
    fontWeight: "inherit",
    flexGrow: 1,
  },
  icon: {
    cursor: "pointer",
    "&:hover": {
      color: theme.palette.primary.main,
    },
  },
}));

function StyledTreeItem(props) {
  const { t } = useTranslation();
  const {
    handleEdit,
    parentId,
    category,
    labelText,
    labelIcon: LabelIcon,
    labelInfo,
    color,
    bgColor,
    ...other
  } = props;

  const deleteCategory = useAction(categories.delete);

  const handleDeleteCategory = (event) => {
    event.stopPropagation();
    MyAlert({
      title: t("coach.delete.title"),
      text: t("coach.delete.text"),
      icon: "warning",
      method: () => deleteCategory(category.id),
      confirmButton: t("coach.delete.confirmButton"),
      cancelButton: t("coach.delete.cancelButton"),
    });
  };

  const classes = useTreeItemStyles();

  return (
    <TreeItem
      label={
        <div className={classes.labelRoot}>
          <Typography variant="body2" className={classes.labelText}>
            {labelText}
          </Typography>
          <div className="col-6 row justify-content-end">
            <Tooltip arrow placement="top" title={t("coach.delete.delete")}>
              <DeleteIcon
                className={classes.icon}
                onClick={(event) => handleDeleteCategory(event)}
              />
            </Tooltip>
            <Tooltip
              arrow
              placement="top"
              title={t("coach.problems.categories.edit")}
            >
              <EditIcon
                className={classes.icon}
                onClick={(event) => handleEdit(event, category, parentId)}
              />
            </Tooltip>
          </div>
        </div>
      }
      classes={{
        root: classes.root,
        content: classes.content,
        expanded: classes.expanded,
        selected: classes.selected,
        group: classes.group,
        label: classes.label,
      }}
      {...other}
    />
  );
}

function CategoriesList() {
  const { categoriesList } = useSelector((state) => state.coach);
  // const [categories, setCategories] = useState(categoriesList.categories);
  const [openEditCategory, setOpenEditCategory] = useState(false);
  const [editCategory, setEditCategory] = useState(null);

  const handleClickOpen = () => {
    setOpenEditCategory(true);
  };

  const handleClose = () => {
    setOpenEditCategory(false);
  };

  const handleEdit = (event, category, parentId) => {
    event.stopPropagation();
    setOpenEditCategory(true);
    var obj = { ...category };
    obj.parentId = parentId;
    setEditCategory(obj);
  };

  return (
    <>
      <TreeView
        defaultCollapseIcon={<ArrowDropDownIcon />}
        defaultExpandIcon={<ArrowRightIcon />}
        defaultEndIcon={<div style={{ width: 24 }} />}
      >
        {categoriesList.map((category, index) => (
          <StyledTreeItem
            key={index}
            parentId=""
            handleEdit={handleEdit}
            category={category.category}
            nodeId={`${category.category.id}`}
            labelText={category.category.name}
            labelIcon={Label}
            labelInfo="3,566"
            color="#3c8039"
            bgColor="#e6f4ea"
          >
            {category.subcategories.map((subCategory, i) => (
              <StyledTreeItem
                key={i}
                parentId={category.category.id}
                handleEdit={handleEdit}
                category={subCategory}
                nodeId={subCategory.id}
                labelText={subCategory.name}
                labelIcon={Label}
                labelInfo="3,566"
                color="#3c8039"
                bgColor="#e6f4ea"
              />
            ))}
          </StyledTreeItem>
        ))}
      </TreeView>
      {openEditCategory && (
        <EditCategories
          category={editCategory}
          handleClickOpen={handleClickOpen}
          handleClose={handleClose}
          userId={editCategory.userId}
          userName={editCategory.name}
        />
      )}
    </>
  );
}

export default CategoriesList;
