import { createReducer } from "deox";
import produce from "immer";

import { profile, awards } from "./actions";

const initialState = {
  id: undefined,
  email: undefined,
  avatar: undefined,
  updatedAt: undefined,
  createdAt: undefined,
  solvedTask: undefined,
  allAwards: [],
  settingsError: null,
  settingsSuccessMessage: null,
  loading: false,
  isLoaded: false,
  error: null,
};

export const userReducer = createReducer(initialState, (handle) => [
  handle(profile.request, (state) =>
    produce(state, (draft) => {
      draft.loading = true;
      draft.error = null;
    })
  ),
  handle(profile.success, (state, { payload }) => ({
    ...state,
    ...payload,
    isLoaded: true,
    loading: false,
    error: null,
  })),
  handle(profile.fail, (state, { payload }) =>
    produce(state, (draft) => {
      draft.loading = false;
      draft.error = payload;
    })
  ),
  handle(awards.request, (state) =>
    produce(state, (draft) => {
      draft.loading = true;
      draft.error = null;
    })
  ),
  handle(awards.success, (state, { payload }) =>
    produce(state, (draft) => {
      draft.allAwards = payload;
      draft.loading = false;
      draft.error = null;
    })
  ),
  handle(awards.fail, (state, { payload }) =>
    produce(state, (draft) => {
      draft.loading = false;
      draft.error = payload;
    })
  ),
]);
