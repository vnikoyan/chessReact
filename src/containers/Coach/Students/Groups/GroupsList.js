import React, { useState } from "react";
import { useSelector } from "react-redux";
import DeleteIcon from "@material-ui/icons/Delete";
import { groups } from "modules/coach/actions";
import { useAction } from "utils/hooks";
import { useTranslation } from "react-i18next";
import EditGroup from "./Items/EditGroup";
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
    type,
    handleEdit,
    parentId,
    group,
    labelText,
    labelIcon: LabelIcon,
    labelInfo,
    color,
    bgColor,
    ...other
  } = props;

  const deleteGroup = useAction(groups.delete);

  const handleDeleteGroup = (event) => {
    event.stopPropagation();
    MyAlert({
      title: t("coach.delete.title"),
      text: t("coach.delete.text"),
      icon: "warning",
      method: () => deleteGroup({ group_id: group.id }),
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
          {type === "group" && (
            <div className="col-6 row justify-content-end">
              <Tooltip arrow placement="top" title={t("coach.delete.delete")}>
                <DeleteIcon
                  className={classes.icon}
                  onClick={(event) => handleDeleteGroup(event)}
                />
              </Tooltip>
              <Tooltip
                arrow
                placement="top"
                title={t("coach.problems.categories.edit")}
              >
                <EditIcon
                  className={classes.icon}
                  onClick={(event) => handleEdit(event, group, parentId)}
                />
              </Tooltip>
            </div>
          )}
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

function GroupsList() {
  const { groupsList } = useSelector((state) => state.coach);
  // const [categories, setCategories] = useState(groupsList.categories);
  const [openEditGroup, setOpenEditCategory] = useState(false);
  const [editGroup, setEditCategory] = useState(null);

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
        {groupsList.length ? (
          groupsList.map((group, index) => (
            <StyledTreeItem
              type="group"
              key={index}
              parentId=""
              handleEdit={handleEdit}
              group={group}
              nodeId={`${group.id}`}
              labelText={group.name}
              labelIcon={Label}
              color="#3c8039"
              bgColor="#e6f4ea"
            >
              {group.students.map((student, i) => (
                <StyledTreeItem
                  type="student"
                  key={i}
                  parentId={student.id}
                  handleEdit={handleEdit}
                  category={student}
                  nodeId={student.id}
                  labelText={student.student.student.name}
                  labelIcon={Label}
                  labelInfo="3,566"
                  color="#3c8039"
                  bgColor="#e6f4ea"
                />
              ))}
            </StyledTreeItem>
          ))
        ) : (
          <Typography variant="h4" align="center">
            You have no groups
          </Typography>
        )}
      </TreeView>
      {openEditGroup && (
        <EditGroup
          group={editGroup}
          handleClickOpen={handleClickOpen}
          handleClose={handleClose}
        />
      )}
    </>
  );
}

export default GroupsList;
