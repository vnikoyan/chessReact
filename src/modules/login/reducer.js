import { createReducer } from "deox";
import produce from "immer";

import {
  businessLogin,
  customerLogin,
  logoutAction,
  refreshTokens,
} from "./actions";

const initialState = {
  loading: false,
  error: null,
  access: "",
  refresh: "",
  type: null,
};

export const loginReducer = createReducer(initialState, (handle) => [
  handle(businessLogin.request, (state) =>
    produce(state, (draft) => {
      draft.loading = true;
      draft.error = null;
    })
  ),
  handle(businessLogin.success, (state, { payload }) =>
    produce(state, (draft) => {
      draft.loading = false;
      draft.error = null;
      draft.access = payload.access;
      draft.refresh = payload.refresh;
      draft.type = payload.type;
    })
  ),
  handle(businessLogin.fail, (state, { payload }) =>
    produce(state, (draft) => {
      draft.loading = false;
      draft.error = payload;
    })
  ),
  handle(customerLogin.request, (state) =>
    produce(state, (draft) => {
      draft.loading = true;
      draft.error = null;
    })
  ),
  handle(customerLogin.success, (state, { payload }) =>
    produce(state, (draft) => {
      draft.loading = false;
      draft.error = null;
      draft.access = payload.access;
      draft.refresh = payload.refresh;
      draft.type = payload.type;
    })
  ),
  handle(customerLogin.fail, (state, { payload }) =>
    produce(state, (draft) => {
      draft.loading = false;
      draft.error = payload;
    })
  ),
  handle(customerLogin.clearError, (state) =>
    produce(state, (draft) => {
      draft.loading = false;
      draft.error = null;
    })
  ),
  handle(refreshTokens, (state, { payload }) =>
    produce(state, (draft) => {
      draft.access = payload.access;
      draft.refresh = payload.refresh;
    })
  ),
  handle(logoutAction, () => initialState),
]);
