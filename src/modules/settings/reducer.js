import { createReducer } from "deox";

import produce from "immer";

import { settings } from "./actions";

const initialState = {
  loading: false,
  errorMessage: false,
  successMessage: false,
};

export const settingsReducer = createReducer(initialState, (handle) => [
  /** -- SETTINGS -- */
  handle(settings.generalRequest, (state) =>
    produce(state, (draft) => {
      draft.loading = true;
    })
  ),
  handle(settings.avatarRequest, (state) =>
    produce(state, (draft) => {
      draft.loading = true;
    })
  ),
  handle(settings.additionalRequest, (state) =>
    produce(state, (draft) => {
      draft.loading = true;
      draft.errorMessage = false;
      draft.successMessage = false;
    })
  ),
  handle(settings.passwordRequest, (state) =>
    produce(state, (draft) => {
      draft.loading = true;
      draft.errorMessage = false;
      draft.successMessage = false;
    })
  ),
  handle(settings.getResponse, (state) =>
    produce(state, (draft) => {
      draft.loading = false;
    })
  ),
]);
