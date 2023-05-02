import { createReducer } from "deox";
import produce from "immer";

import {
  state,
  allCategories,
  categories,
  student,
  problems,
  trainings,
  groups,
} from "./actions";

const iniritalState = {
  allStudentsList: [],
  allStudentsLoading: false,
  studentsActivity: [],
  studentList: [],
  studentStatisticsList: [],
  studentsTotal: 0,
  studentsLoading: false,

  groupsList: [],
  groupsLoading: false,

  currentProblem: {},
  problemsList: [],
  problemsTotal: 0,
  problemsPage: 1,
  problemsLoading: false,

  categoriesList: [],
  categoriesLoading: false,
  categoriesData: "",
  categoriesDataLoading: "",
  allCategoriesList: [],
  allCategoriesLoading: false,

  currentTraining: {},
  currentTrainingStatistics: {},
  trainingsList: [],
  lastTrainingsList: [],
  trainingsTotal: 0,
  trainingsLoading: false,

  loading: false,
  isLoaded: false,
};

export const coachReducer = createReducer(iniritalState, (handle) => [
  handle(state.clear, (state) =>
    produce(state, (draft) => {
      draft.isLoaded = false;
      draft.currentProblem = {};
      draft.currentTraining = {};
      draft.categoriesData = "";
    })
  ),
  /** -- STUDENTS -- */
  handle(student.request, (state) =>
    produce(state, (draft) => {
      draft.studentsLoading = true;
    })
  ),
  handle(student.success, (state, { payload }) =>
    produce(state, (draft) => {
      draft.studentList = payload.data;
      draft.studentsTotal = payload.total;
      draft.studentsLoading = false;
    })
  ),
  handle(student.requestStatistics, (state) =>
    produce(state, (draft) => {
      draft.studentsLoading = true;
    })
  ),
  handle(student.statisticsSuccess, (state, { payload }) =>
    produce(state, (draft) => {
      draft.studentStatisticsList = payload.data;
      draft.studentsTotal = payload.total;
      draft.studentsLoading = false;
    })
  ),
  handle(student.allRequest, (state) =>
    produce(state, (draft) => {
      draft.allStudentsLoading = true;
    })
  ),
  handle(student.allSuccess, (state, { payload }) =>
    produce(state, (draft) => {
      draft.allStudentsList = payload.data;
      draft.allStudentsLoading = false;
    })
  ),
  handle(student.add, (state) =>
    produce(state, (draft) => {
      draft.loading = true;
    })
  ),
  handle(student.edit, (state) =>
    produce(state, (draft) => {
      draft.loading = true;
    })
  ),
  handle(student.getActivity, (state) =>
    produce(state, (draft) => {
      draft.loading = true;
    })
  ),
  handle(student.setActivity, (state, { payload }) =>
    produce(state, (draft) => {
      draft.studentsActivity = payload.reverse();
    })
  ),
  handle(student.getResponse, (state) =>
    produce(state, (draft) => {
      draft.loading = false;
    })
  ),
  handle(student.setGroup, (state) =>
    produce(state, (draft) => {
      draft.loading = true;
    })
  ),
  /** -- GROUPS -- */
  handle(groups.request, (state) =>
    produce(state, (draft) => {
      draft.groupsLoading = true;
    })
  ),
  handle(groups.success, (state, { payload }) =>
    produce(state, (draft) => {
      draft.groupsList = payload;
      draft.groupsLoading = false;
    })
  ),
  handle(groups.create, (state) =>
    produce(state, (draft) => {
      draft.loading = true;
    })
  ),
  handle(groups.delete, (state) =>
    produce(state, (draft) => {
      draft.loading = true;
    })
  ),
  handle(groups.edit, (state) =>
    produce(state, (draft) => {
      draft.loading = true;
    })
  ),
  /** -- PROBLEMS -- */
  handle(problems.request, (state) =>
    produce(state, (draft) => {
      draft.problemsLoading = true;
    })
  ),
  handle(problems.success, (state, { payload }) =>
    produce(state, (draft) => {
      draft.problemsList = payload.data;
      draft.problemsTotal = payload.total;
      draft.problemsPage = payload.page;
      draft.problemsLoading = false;
    })
  ),
  handle(problems.create, (state) =>
    produce(state, (draft) => {
      draft.loading = true;
    })
  ),
  handle(problems.insert, (state) =>
    produce(state, (draft) => {
      draft.loading = true;
    })
  ),
  handle(problems.get, (state) =>
    produce(state, (draft) => {
      draft.loadingCurrent = true;
    })
  ),
  handle(problems.set, (state, { payload }) =>
    produce(state, (draft) => {
      draft.currentProblem = payload;
      draft.loadingCurrent = false;
      draft.isLoaded = true;
    })
  ),
  handle(problems.update, (state) =>
    produce(state, (draft) => {
      draft.loading = true;
    })
  ),
  /** -- CATEGORIES -- */
  handle(categories.request, (state) =>
    produce(state, (draft) => {
      draft.categoriesLoading = true;
    })
  ),
  handle(categories.data, (state) =>
    produce(state, (draft) => {
      draft.categoriesDataLoading = true;
    })
  ),
  handle(categories.dataSuccess, (state, { payload }) =>
    produce(state, (draft) => {
      draft.categoriesData = payload;
      draft.categoriesDataLoading = false;
    })
  ),
  handle(categories.import, (state) =>
    produce(state, (draft) => {
      draft.categoriesImportLoading = true;
    })
  ),
  handle(categories.importSuccess, (state) =>
    produce(state, (draft) => {
      draft.categoriesImportLoading = false;
    })
  ),
  handle(categories.success, (state, { payload }) =>
    produce(state, (draft) => {
      draft.categoriesList = payload;
      draft.categoriesLoading = false;
    })
  ),
  handle(allCategories.request, (state) =>
    produce(state, (draft) => {
      draft.allCategoriesLoading = true;
    })
  ),
  handle(allCategories.success, (state, { payload }) =>
    produce(state, (draft) => {
      draft.allCategoriesList = payload;
      draft.allCategoriesLoading = false;
    })
  ),
  handle(categories.create, (state) =>
    produce(state, (draft) => {
      draft.loading = true;
    })
  ),
  handle(categories.delete, (state) =>
    produce(state, (draft) => {
      draft.loading = true;
    })
  ),
  handle(categories.edit, (state) =>
    produce(state, (draft) => {
      draft.loading = true;
    })
  ),
  /** -- TRAININGS -- */
  handle(trainings.request, (state) =>
    produce(state, (draft) => {
      draft.trainingsLoading = true;
    })
  ),
  handle(trainings.success, (state, { payload }) =>
    produce(state, (draft) => {
      draft.trainingsList = payload.data;
      draft.trainingsTotal = payload.total;
      draft.trainingsLoading = false;
    })
  ),
  handle(trainings.lastRequest, (state) =>
    produce(state, (draft) => {
      draft.loading = true;
    })
  ),
  handle(trainings.lastSuccess, (state, { payload }) =>
    produce(state, (draft) => {
      draft.lastTrainingsList = payload;
      draft.loading = false;
    })
  ),
  handle(trainings.create, (state) =>
    produce(state, (draft) => {
      draft.loading = true;
    })
  ),
  handle(trainings.get, (state) =>
    produce(state, (draft) => {
      draft.loadingCurrent = true;
    })
  ),
  handle(trainings.set, (state, { payload }) =>
    produce(state, (draft) => {
      draft.currentTraining = payload;
      draft.loadingCurrent = false;
      draft.isLoaded = true;
    })
  ),
  handle(trainings.getStatistics, (state) =>
    produce(state, (draft) => {
      draft.loadingCurrent = true;
    })
  ),
  handle(trainings.setStatistics, (state, { payload }) =>
    produce(state, (draft) => {
      draft.currentTrainingStatistics = payload;
      draft.loadingCurrent = false;
      draft.isLoaded = true;
    })
  ),
  handle(trainings.update, (state) =>
    produce(state, (draft) => {
      draft.loading = true;
    })
  ),
]);
