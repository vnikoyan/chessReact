import { createReducer } from "deox";
import produce from "immer";

import { findEmail, checkCode, setPassword } from "./actions";

const initialState = {
  loading: false,
  errorMessage: null,
  successMessage: null,
  apiToken: null,
  doneMessage: null,
  email: "",
};

export const recoveryReducer = createReducer(initialState, (handle) => [
  handle(findEmail.request, (state) =>
    produce(state, (draft) => {
      draft.loading = true;
      draft.errorMessage = null;
    })
  ),
  handle(findEmail.success, (state, { payload }) =>
    produce(state, (draft) => {
      draft.loading = false;
      draft.successMessage = payload;
    })
  ),
  handle(findEmail.fail, (state, { payload }) =>
    produce(state, (draft) => {
      draft.loading = false;
      draft.errorMessage = payload;
    })
  ),

  handle(checkCode.request, (state) =>
    produce(state, (draft) => {
      draft.loading = true;
      draft.errorMessage = null;
    })
  ),
  handle(checkCode.success, (state, { payload }) =>
    produce(state, (draft) => {
      draft.loading = false;
      draft.errorMessage = null;
      draft.apiToken = payload.api_token;
    })
  ),
  handle(checkCode.fail, (state, { payload }) =>
    produce(state, (draft) => {
      draft.loading = false;
      draft.errorMessage = payload;
    })
  ),
  handle(setPassword.request, (state) =>
    produce(state, (draft) => {
      draft.loading = true;
      draft.errorMessage = null;
    })
  ),
  handle(setPassword.success, (state, { payload }) =>
    produce(state, (draft) => {
      draft.loading = false;
      draft.doneMessage = payload;
    })
  ),
  handle(setPassword.fail, (state, { payload }) =>
    produce(state, (draft) => {
      draft.loading = false;
      draft.doneMessage = payload;
    })
  ),
]);
