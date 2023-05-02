import { createReducer } from "deox";
import produce from "immer";

import { state, categories, problems, trainings } from "./actions";

const iniritalState = {
  categoriesList: {
    publicCategories: [],
    myCategories: [],
  },

  currentProblem: {},
  publicProblems: { total: 3000 },
  publicProblemsList: [],
  aceleratorProblemsList: [],
  selfProblemsList: [],
  problemsLoading: false,

  trainingsList: [],
  currentTraining: {},
  trainingsLoading: false,
  trainingsCount: 0,
  lastTrainingsList: [],

  loading: false,
  isLoaded: false,
};

export const studentReducer = createReducer(iniritalState, (handle) => [
  handle(state.clear, (state) =>
    produce(state, (draft) => {
      draft.isLoaded = false;
      draft.selfProblemsList = [];
      draft.aceleratorProblemsList = [];
      draft.currentProblem = {};
      draft.currentTraining = {};
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
      draft.trainingsCount = payload.total;
      draft.trainingsLoading = false;
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
  /** -- PROBLEMS -- */
  handle(problems.request, (state) =>
    produce(state, (draft) => {
      draft.problemsLoading = true;
    })
  ),
  handle(problems.success, (state, { payload }) =>
    produce(state, (draft) => {
      draft.publicProblems = payload;
      draft.publicProblemsList = payload.data;
      draft.problemsLoading = false;
    })
  ),
  handle(problems.requestSelf, (state) =>
    produce(state, (draft) => {
      draft.problemsLoading = true;
    })
  ),
  handle(problems.successSelf, (state, { payload }) =>
    produce(state, (draft) => {
      draft.selfProblemsList = payload;
      draft.problemsLoading = false;
    })
  ),
  handle(problems.successRandom, (state, { payload }) =>
    produce(state, (draft) => {
      draft.selfProblemsList = payload;
      draft.problemsLoading = false;
    })
  ),
  handle(problems.successAccelerator, (state, { payload }) =>
    produce(state, (draft) => {
      draft.aceleratorProblemsList = payload;
      draft.problemsLoading = false;
    })
  ),
  handle(problems.get, (state) =>
    produce(state, (draft) => {
      draft.loading = true;
    })
  ),
  handle(problems.set, (state, { payload }) =>
    produce(state, (draft) => {
      draft.currentProblem = payload;
      draft.loading = false;
    })
  ),
  /** -- CATEGORIES -- */
  handle(categories.request, (state) =>
    produce(state, (draft) => {
      draft.loading = true;
    })
  ),
  handle(categories.success, (state, { payload }) =>
    produce(state, (draft) => {
      draft.categoriesList = payload;
      draft.loading = false;
    })
  ),
]);
