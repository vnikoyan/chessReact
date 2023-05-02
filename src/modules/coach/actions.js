import { createAction } from "deox";

export const state = {
  clear: createAction("student/CLEAR_COACH_STATE"),
};

export const categories = {
  request: createAction("coach/GET_CATEGORIES_LIST"),
  data: createAction("coach/GET_CATEGORIES_DATA", (res) => (data) => res(data)),
  dataSuccess: createAction(
    "coach/GET_CATEGORIES_DATA_SUCCESS",
    (res) => (data) => res(data)
  ),
  import: createAction("coach/IMPORT_CATEGORIES", (res) => (data) => res(data)),
  importSuccess: createAction(
    "coach/IMPORT_CATEGORIES_SUCCESS",
    (res) => (data) => res(data)
  ),
  success: createAction("coach/GET_CATEGORIES_LIST_SUCCESS", (res) => (data) =>
    res(data)
  ),
  create: createAction("coach/CREATE_CATEGORY", (res) => (data) => res(data)),
  delete: createAction("coach/DELETE_CATEGORY", (res) => (data) => res(data)),
  edit: createAction("coach/EDIT_CATEGORY", (res) => (data) => res(data)),
};

export const groups = {
  request: createAction("coach/GET_GROUPS_LIST"),
  success: createAction("coach/GET_GROUPS_LIST_SUCCESS", (res) => (data) =>
    res(data)
  ),
  create: createAction("coach/CREATE_GROUP", (res) => (data) => res(data)),
  delete: createAction("coach/DELETE_GROUP", (res) => (data) => res(data)),
  edit: createAction("coach/EDIT_GROUP", (res) => (data) => res(data)),
};

export const allCategories = {
  request: createAction("coach/GET_ALL_CATEGORIES_LIST"),
  success: createAction(
    "coach/GET_ALL_CATEGORIES_LIST_SUCCESS",
    (res) => (data) => res(data)
  ),
};

export const problems = {
  request: createAction("coach/GET_PROBLEMS_LIST", (res) => (data) =>
    res(data)
  ),
  success: createAction("coach/GET_PROBLEMS_LIST_SUCCESS", (res) => (data) =>
    res(data)
  ),
  insert: createAction("coach/INSERT_PROBLEMS", (res) => (data) => res(data)),
  create: createAction("coach/CREATE_PROBLEM", (res) => (data) => res(data)),
  get: createAction("coach/GET_PROBLEM_BY_ID", (res) => (data) => res(data)),
  set: createAction("coach/SET_PROBLEM", (res) => (data) => res(data)),
  delete: createAction("coach/DELETE_PROBLEM", (res) => (data) => res(data)),
  setFavorite: createAction("coach/SET_PROBLEM_FAVORITE", (res) => (data) =>
    res(data)
  ),
  update: createAction("coach/UPDATE_PROBLEM", (res) => (data) => res(data)),
};

export const student = {
  request: createAction("coach/GET_STUDENTS_LIST", (res) => (data) =>
    res(data)
  ),
  success: createAction("coach/GET_STUDENTS_LIST_SUCCESS", (res) => (data) =>
    res(data)
  ),
  requestStatistics: createAction(
    "coach/GET_STUDENTS_STATISTICS_LIST",
    (res) => (data) => res(data)
  ),
  statisticsSuccess: createAction(
    "coach/GET_STUDENTS_STATISTICS_LIST_SUCCESS",
    (res) => (data) => res(data)
  ),
  allRequest: createAction("coach/GET_ALL_STUDENTS_LIST", (res) => (data) =>
    res(data)
  ),
  allSuccess: createAction(
    "coach/GET_ALL_STUDENTS_LIST_SUCCESS",
    (res) => (data) => res(data)
  ),
  add: createAction("coach/ADD_STUDENT", (res) => (data) => res(data)),
  delete: createAction("coach/DELETE_STUDENT", (res) => (data) => res(data)),
  edit: createAction("coach/EDIT_STUDENT", (res) => (data) => res(data)),
  getActivity: createAction("coach/GET_STUDENTS_ACTIVITY", (res) => (data) =>
    res(data)
  ),
  setActivity: createAction("coach/SET_STUDENTS_ACTIVITY", (res) => (data) =>
    res(data)
  ),
  setGroup: createAction("coach/SET_STUDENT_GROUP", (res) => (data) =>
    res(data)
  ),
  getResponse: createAction("coach/END_REQUEST"),
};

export const trainings = {
  request: createAction("coach/GET_TRAININGS_LIST", (res) => (data) =>
    res(data)
  ),
  success: createAction("coach/GET_TRAININGS_LIST_SUCCESS", (res) => (data) =>
    res(data)
  ),
  lastRequest: createAction("coach/GET_LAST_TRAININGS_LIST", (res) => (data) =>
    res(data)
  ),
  lastSuccess: createAction(
    "coach/GET_LAST_TRAININGS_LIST_SUCCESS",
    (res) => (data) => res(data)
  ),
  create: createAction("coach/CREATE_TRAINING", (res) => (data) => res(data)),
  get: createAction("coach/GET_TRAINING_BY_ID", (res) => (data) => res(data)),
  set: createAction("coach/SET_TRAINING", (res) => (data) => res(data)),
  getStatistics: createAction(
    "coach/GET_TRAINING_STATISTICS_BY_ID",
    (res) => (data) => res(data)
  ),
  setStatistics: createAction(
    "coach/SET_TRAINING_STATISTICS",
    (res) => (data) => res(data)
  ),
  delete: createAction("coach/DELETE_TRAINING", (res) => (data) => res(data)),
  update: createAction("coach/UPDATE_TRAINING", (res) => (data) => res(data)),
};
