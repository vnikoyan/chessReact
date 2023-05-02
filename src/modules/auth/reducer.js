import { createReducer } from "deox";

import produce from "immer";

import { signUp, signIn, refreshTokens, logoutAction } from "./actions";

const initialState = {
  loading: false,
  error: null,
  successMessage: null,
  user: false,
};

export const authReducer = createReducer(initialState, (handle) => [
  /** -- SIGN UP / REGISTER -- */
  handle(signUp.request, (state) =>
    produce(state, (draft) => {
      draft.loading = true;
      draft.error = null;
    })
  ),
  handle(signUp.success, (state, { payload }) =>
    produce(state, (draft) => {
      draft.loading = false;
      draft.successMessage =
        "Thank you for registration, the verification link has sent to your email address!";
      draft.user = payload.user;
    })
  ),
  handle(signUp.fail, (state, { payload }) =>
    produce(state, (draft) => {
      draft.loading = false;
      draft.error = payload;
    })
  ),
  /** -- SIGN IN / LOGIN -- */
  handle(signIn.request, (state) =>
    produce(state, (draft) => {
      draft.loading = true;
      draft.error = null;
    })
  ),
  handle(signIn.success, (state, { payload }) =>
    produce(state, (draft) => {
      draft.loading = false;
      draft.error = null;
      draft.user = payload.user;
    })
  ),
  handle(signIn.fail, (state, { payload }) =>
    produce(state, (draft) => {
      draft.loading = false;
      draft.error = payload;
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
