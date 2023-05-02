import { createAction } from "deox";

export const studentRequest = {
  getResponse: createAction("coach/END_REQUEST"),
};

export const state = {
  clear: createAction("student/CLEAR_STUDENT_STATE"),
};

export const trainings = {
  request: createAction("student/GET_TRAININGS_LIST", (res) => (data) =>
    res(data)
  ),
  success: createAction("student/GET_TRAININGS_LIST_SUCCESS", (res) => (data) =>
    res(data)
  ),
  get: createAction("student/GET_TRAINING_BY_ID", (res) => (data) => res(data)),
  set: createAction("student/SET_TRAINING", (res) => (data) => res(data)),
};

export const problems = {
  request: createAction("student/GET_PUBLIC_PROBLEMS_LIST", (res) => (data) =>
    res(data)
  ),
  success: createAction(
    "student/GET_PUBLIC_PROBLEMS_LIST_SUCCESS",
    (res) => (data) => res(data)
  ),
  requestSelf: createAction("student/GET_SELF_PROBLEMS_LIST", (res) => (data) =>
    res(data)
  ),
  successSelf: createAction(
    "student/GET_SELF_PROBLEMS_LIST_SUCCESS",
    (res) => (data) => res(data)
  ),
  requestAccelerator: createAction(
    "student/GET_ACCELERATOR_PROBLEMS_LIST",
    (res) => (data) => res(data)
  ),
  successAccelerator: createAction(
    "student/GET_ACCELERATOR_PROBLEMS_LIST_SUCCESS",
    (res) => (data) => res(data)
  ),
  requestRandom: createAction("student/GET_RANDOM_PROBLEMS_LIST"),
  successRandom: createAction(
    "student/GET_RANDOM_PROBLEMS_LIST_SUCCESS",
    (res) => (data) => res(data)
  ),
  get: createAction("student/GET_PROBLEM_BY_ID", (res) => (data) => res(data)),
  set: createAction("student/SET_PROBLEM", (res) => (data) => res(data)),
  setFavorite: createAction("student/SET_PROBLEM_FAVORITE", (res) => (data) =>
    res(data)
  ),
  setSolved: createAction("student/SET_PROBLEM_SOLVED", (res) => (data) =>
    res(data)
  ),
  setStart: createAction("student/SET_PROBLEM_START", (res) => (data) =>
    res(data)
  ),
  setEnd: createAction("student/SET_PROBLEM_END", (res) => (data) => res(data)),
  setFailed: createAction("student/SET_PROBLEM_FAILED", (res) => (data) =>
    res(data)
  ),
};

export const categories = {
  request: createAction("student/GET_SELF_CATEGORIES_LIST"),
  success: createAction(
    "student/GET_SELF_CATEGORIES_LIST_SUCCESS",
    (res) => (data) => res(data)
  ),
};
